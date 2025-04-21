import { useEffect, useRef, useState } from "react";
import toast from "react-hot-toast";

import styles from "./Card.module.scss";
import editLogo from "../../assets/edit.png";
import camera from "../../assets/cameraIcon.svg";
import trashLogo from "../../assets/trash.svg";
import checkMarkLogo from "../../assets/check-mark.svg";
import cross from "../../assets/closeIcon.svg";
import {
  uploadCompanyImage,
  removeCompanyImage,
} from "../../api/AuthenticationService/photoService";
import CustomInput from "../CustomInput/CustomInput";
import MultipleSelectCheckmarks from "../CustomSelectMulti/CustomSelectMulti";
import CustomSelect from "../CustomSelect/CustomSelect";
import { updateCompany } from "../../api/AuthenticationService/organizationService ";
import { updateContactById } from "../../api/AuthenticationService/userContactService ";
import { Company, Contact, Photo } from "../../types";

//interface  -s
interface CardProps {
  company: Company | null;
  type?: "contact" | "company" | "photos";
  title: string;
  contact?: Contact | null;
}

const Card2: React.FC<CardProps> = ({
  company,
  type = "company",
  title,
  contact = null,
}) => {
  // State variables for managing editable form values and updates

  const [isModalOpen, setModalOpen] = useState(false);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const [photos, setPhotos] = useState<Photo[]>([]);
  const [localCompany, setLocalCompany] = useState<Company | null>(company);
  const [localContact, setLocalContact] = useState<Contact | null>(contact);

  useEffect(() => {
    setLocalCompany(company);
  }, [company]);

  useEffect(() => {
    setLocalContact(contact);
  }, [contact]);

  // Flags for enabling edit modes

  const [editableModeCompany, setEditableModeCompany] =
    useState<boolean>(false);

  const [editableModeContact, setEditableModeContact] =
    useState<boolean>(false);
  // Inputs for company fields

  const [inputValueAgreement, setInputValueAgreement] = useState("");
  const [inputValueAgreementDate, setInputValueAgreementDate] = useState("");
  const [selectedValueBusinessEntity, setSelectedValueBusinessEntity] =
    useState<string>("");
  const [selectedValueCompanyType, setSelectedValueCompanyType] = useState<
    string[]
  >([]);

  // Inputs for contact fields
  // Inputs for contact fields

  const [inputValueResponsiblePerson, setInputValueResponsiblePerson] =
    useState("");

  const [inputValuePhoneNumber, setInputValuePhoneNumber] = useState("");
  const [inputValueEmail, setInputValueEmail] = useState("");

  //-----------------

  // Handlers for controlled input values
  const handleChangeResponsiblePerson = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setInputValueResponsiblePerson(e.target.value);
  };

  const handleChangePhoneNumber = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValuePhoneNumber(e.target.value);
  };

  const handleChangeEmail = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValueEmail(e.target.value);
  };

  // Auto-fill contact fields when `contact` changes

  useEffect(() => {
    if (contact) {
      setInputValueResponsiblePerson(
        `${contact.firstname} ${contact.lastname}`
      );
      setInputValuePhoneNumber(`+${contact.phone}`);
      setInputValueEmail(`${contact.email}`);
    }
  }, [contact]);

  // Auto-fill company dropdowns when `company` changes

  useEffect(() => {
    if (localCompany) {
      setSelectedValueBusinessEntity(localCompany.businessEntity);
      setSelectedValueCompanyType([localCompany.type.join(", ")]);
    }
  }, [localCompany]);

  //Modal Toggle and Button Handler

  const toggleModal = () => {
    setModalOpen(!isModalOpen);
  };

  const companyId: number = 12;
  // Delete image logic

  const deleteImageHandler = (imageName: string) => {
    removeCompanyImage(companyId, imageName)
      .then(() => {
        toast.success("Успешно удалено");

        setPhotos((prev) => prev.filter((item) => !(item.name === imageName)));
      })
      .catch((err) => {
        console.error("Не получилось удалить:", err);
      });
  };
  // Upload file logic

  const handleFileChange = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files?.[0];
    if (file) {
      try {
        const companyId = 12;
        const response = await uploadCompanyImage(companyId, file);
        console.log("Image uploaded successfully:", response);

        setPhotos((prev) => [...prev, response]);
      } catch (error) {
        console.error("Error uploading image:", error);
      }
    }
  };

  // /  const handleButtonClick = () => {

  const handleButtonClick = () => {
    if (type === "photos") {
      fileInputRef.current?.click();
    }

    if (type === "company") {
      setEditableModeCompany(true);

      if (localCompany) {
        setInputValueAgreement(localCompany.contract.no);
        setInputValueAgreementDate(
          new Date(localCompany.contract.issue_date).toISOString().split("T")[0]
        );
        setSelectedValueBusinessEntity(localCompany.businessEntity);
      }
    }

    if (type === "contact") {
      setEditableModeContact(true);
    }

    toggleModal();
  };

  //  setPhotos(localCompany.photos)
  useEffect(() => {
    if (localCompany && localCompany.photos) {
      setPhotos(localCompany.photos);
    }
  }, [company, localCompany]);

  // Controlled Input Handlers for Company Info

  const handleChangeAgreement = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValueAgreement(e.target.value);
  };

  const handleChangeAgreementDate = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setInputValueAgreementDate(e.target.value);
  };

  const handleChangeBusinessEntity = (value: string) => {
    setSelectedValueBusinessEntity(value);
  };

  const handleChangeCompanyType = (value: string[]) => {
    setSelectedValueCompanyType(value);
  };

  //// Main update function based on the type
  const handleUpdate = async () => {
    if (type === "company") {
      const updatedData: Omit<
        Company,
        "id" | "contactId" | "status" | "photos" | "createdAt" | "updatedAt"
      > = {
        name: "Eternal Sun Funeral Home",
        shortName: "ESFH",
        businessEntity: selectedValueBusinessEntity,
        contract: {
          no: "12345",
          issue_date: inputValueAgreementDate,
        },
        type: [],
      };

      try {
        const updatedCompany = await updateCompany("12", updatedData);
        console.log(updatedCompany);
        toast.success("Успешно отредактировано");

        setLocalCompany((prev) => ({
          ...prev,
          ...updatedData,
          id: prev?.id || "",
          contactId: prev?.contactId || "",
          status: prev?.status || "",
          photos: prev?.photos || [],
          createdAt: prev?.createdAt || new Date().toISOString(),
          updatedAt: new Date().toISOString(),
          type: selectedValueCompanyType,
          contract: {
            ...prev?.contract,
            no: inputValueAgreement,
            issue_date: inputValueAgreementDate,
          },
        }));

        setEditableModeCompany(false);
      } catch (error) {
        console.error("Не удалось обновить компанию:", error);
        toast.error("Не удалось обновить компанию:");
      }
    }

    // contact

    if (type === "contact") {
      const contactId = "16";
      const updatedData = {
        lastname: inputValueResponsiblePerson.split(" ")[1],
        firstname: inputValueResponsiblePerson.split(" ")[0],
        phone: inputValuePhoneNumber.slice(1),
        email: inputValueEmail,
      };

      const generateNewId = () => {
        return `${Date.now()}-${Math.floor(Math.random() * 1000)}`;
      };

      updateContactById(contactId, updatedData)
        .then((updatedContact) => {
          setLocalContact((prev) => ({
            ...prev,
            ...updatedData,
            createdAt: prev?.createdAt || new Date().toISOString(),
            id: prev?.id || generateNewId(),
            firstname: updatedData.firstname || "",
            lastname: updatedData.lastname || "",
            phone: updatedData.phone || "",
            updatedAt: new Date().toISOString(),
            email: updatedData.email,
          }));

          setEditableModeContact(false);

          console.log("Contact updated successfully:", updatedContact);
        })
        .catch((error) => {
          console.error("Failed to update contact:", error);
          toast.error(error.response.data.error);
        });
    } 
  };

  // Starts rendering the UI with buttons and fields

  return (
    <section className={styles.container}>
      <div>
        <header className={styles.header}>
          <h3 className={styles.title}>{title}</h3>

          {/* editableModeCompany */}
          {editableModeCompany || editableModeContact ? (
            <div className={styles["editable-buttons"]}>
              <button className={styles.button} onClick={handleUpdate}>
                <img src={checkMarkLogo} alt="checkMarkLogo" /> Save changes
              </button>
              <button
                className={styles.button}
                onClick={() => {
                  setEditableModeCompany(false);
                  setEditableModeContact(false);
                }}
              >
                <img src={cross} alt="crossLogo" /> Cancel
              </button>
            </div>
          ) : (
            <button className={styles.button} onClick={handleButtonClick}>
              {(type === "company" || type === "contact") && (
                <>
                  <img
                    className={styles["logo-edit"]}
                    src={editLogo}
                    alt="editLogo"
                  />
                  <span>Edit</span>
                </>
              )}
              {/*  add  photos */}
              {type === "photos" && (
                <>
                  <img src={camera} alt="cameraLogo" />
                  <span>Add</span>
                  <input
                    type="file"
                    ref={fileInputRef}
                    style={{ display: "none" }}
                    accept="image/*"
                    onChange={handleFileChange}
                  />
                </>
              )}
            </button>
          )}
        </header>
      </div>

      {/* // foto ,company,contact */}

      {/* company */}



      <div className={styles["line-container"]}>
        {type === "company" && (
          <>
            <div className={styles.line}>
              <div className={styles.property}>
                {editableModeCompany ? "Agreement number:" : "Agreement:"}
              </div>


              {/* CustomInput */}


              {editableModeCompany ? (
                <>
                  <CustomInput
                    value={inputValueAgreement}
                    onChange={handleChangeAgreement}
                  />
                  <div
                    className={`${styles.property} ${styles["property-date-edit"]}`}
                  >
                    Date
                  </div>

                  <CustomInput
                    type="date"
                    value={inputValueAgreementDate}
                    onChange={handleChangeAgreementDate}
                  />
                </>
              ) : (
                <>
                  {localCompany && localCompany.contract && (
                    <div className={styles.value}>
                      <span>{localCompany.contract.no}</span>
                      <span className={styles.separator}>/</span>
                      <span>
                        {new Date(
                          localCompany.contract.issue_date
                        ).toLocaleDateString()}
                      </span>
                    </div>
                  )}
                </>
              )}
            </div>



            {/* editableModeCompany   ,CustomSelect*/}
            {editableModeCompany ? (
              <div className={styles.line}>
                <div className={styles.property}>Business entity:</div>
                <CustomSelect
                  onChange={handleChangeBusinessEntity}
                  options={
                    localCompany
                      ? [
                          {
                            value: 1,
                            label: localCompany.businessEntity,
                          },
                          { value: 2, label: "Option 2" },
                          { value: 3, label: "Option 3" },
                        ]
                      : []
                  }
                  value={selectedValueBusinessEntity}
                />
              </div>
            ) : (
              <>
                {localCompany && localCompany.businessEntity && (
                  <div className={styles.line}>
                    <div className={styles.property}>Business entity:</div>
                    <div className={styles.value}>
                      <span>{localCompany.businessEntity}</span>
                    </div>
                  </div>
                )}
              </>
            )}

            
            {/* editableModeCompany  ,MultipleSelectCheckmarks */}

            {editableModeCompany ? (
              <div className={styles.line}>
                <div className={styles.property}>Company type:</div>
                <MultipleSelectCheckmarks
                  onChange={handleChangeCompanyType}
                  defaultValue={
                    localCompany ? localCompany.type.join(", ") : ""
                  }
                  options={
                    localCompany
                      ? [
                          {
                            id: 1,
                            name: localCompany.type.join(", "),
                          },
                          { id: 2, name: "Option 2" },
                          { id: 3, name: "Option 3" },
                        ]
                      : []
                  }
                />
              </div>
            ) : (
              <>
                {localCompany && localCompany.type && (
                  <div className={styles.line}>
                    <div className={styles.property}>Company type:</div>
                    <div className={styles.value}>
                      <span>{localCompany.type.join(", ")}</span>{" "}
                    </div>
                  </div>
                )}
              </>
            )}
          </>
        )}



        {/* contact */}
        {type === "contact" && (
          <>
            {editableModeContact ? (
              <div className={styles.line}>
                <div className={styles.property}>Responsible person:</div>

                <CustomInput
                  value={inputValueResponsiblePerson}
                  onChange={handleChangeResponsiblePerson}
                />
              </div>
            ) : (
              <div className={styles.line}>
                <div className={styles.property}>Responsible person:</div>

                {localContact &&
                  localContact.firstname &&
                  localContact.lastname && (
                    <div className={styles.value}>
                      {localContact.firstname} {localContact.lastname}
                    </div>
                  )}
              </div>
            )}
            {/* editableModeContact */}

            {editableModeContact ? (
              <>
                <div className={styles.line}>
                  <div className={styles.property}>Phone number:</div>
                  <CustomInput
                    value={inputValuePhoneNumber}
                    onChange={handleChangePhoneNumber}
                  />
                </div>
              </>
            ) : (
              <>
                {localContact && localContact.phone && (
                  <div className={styles.line}>
                    <div className={styles.property}>Phone number:</div>
                    <div className={styles.value}>+{localContact.phone}</div>
                  </div>
                )}
              </>
            )}

            {/* editableModeContact */}

            {editableModeContact ? (
              <>
                {localContact && localContact.email && (
                  <div className={styles.line}>
                    <div className={styles.property}>E-mail:</div>
                    <CustomInput
                      value={inputValueEmail}
                      onChange={handleChangeEmail}
                    />
                  </div>
                )}
              </>
            ) : (
              <>
                {localContact && localContact.email && (
                  <div className={styles.line}>
                    <div className={styles.property}>E-mail:</div>
                    <div className={styles.value}>{localContact.email}</div>
                  </div>
                )}
              </>
            )}
          </>
        )}

        {/* //show  photos */}
        {type === "photos" && (
          <>
            {localCompany && localCompany.photos && photos && (
              <div className={styles.line}>
                <div className={`${styles.value} ${styles.photos}`}>
                  {photos.map((photo, index) => (
                    <div className={styles["photo-container"]} key={index}>
                      <img
                        key={photo.name}
                        src={photo.thumbpath}
                        alt={photo.name}
                        className={styles.photo}
                      />

                      <button
                        className={styles["photo-button"]}
                        onClick={() => deleteImageHandler(photo.name)}
                      >
                        <img src={trashLogo} alt="trashLogo" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </>
        )}
      </div>
      {/* // foto ,company,contact */}



    </section>
  );
};

export default Card2;

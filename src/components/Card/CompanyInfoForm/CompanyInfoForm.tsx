import { useState, useEffect } from "react";
import toast from "react-hot-toast";

import styles from "./CompanyInfoForm.module.scss";
import editLogo from "../../../assets/edit.png";
import checkMarkLogo from "../../../assets/check-mark.svg";
import cross from "../../../assets/closeIcon.svg";
import { updateCompany } from "../../../api/AuthenticationService/organizationService ";
import CustomInput from "../../CustomInput/CustomInput";
import MultipleSelectCheckmarks from "../../CustomSelectMulti/CustomSelectMulti";
import CustomSelect from "../../CustomSelect/CustomSelect";
import { Organization  } from "../../../types";

// Interface definitions
interface CompanyCardProps {
  company: Organization  | null;
  title: string;
}

const CompanyCard = ({ company, title }: CompanyCardProps) => {
  // State variables
  const [localCompany, setLocalCompany] = useState<Organization  | null>(company);
  const [editableModeCompany, setEditableModeCompany] = useState<boolean>(false);

  // Form field states
  const [inputValueAgreement, setInputValueAgreement] = useState("");
  const [inputValueAgreementDate, setInputValueAgreementDate] = useState("");
  const [selectedValueBusinessEntity, setSelectedValueBusinessEntity] = useState<string>("");
  const [selectedValueCompanyType, setSelectedValueCompanyType] = useState<string[]>([]);

  // Update local company when company prop changes
  useEffect(() => {
    setLocalCompany(company);
  }, [company]);

  // Auto-fill company dropdowns when company changes
  useEffect(() => {
    if (localCompany) {
      setSelectedValueBusinessEntity(localCompany.businessEntity);
      setSelectedValueCompanyType([localCompany.type.join(", ")]);
    }
  }, [localCompany]);

  // Edit mode handler
  const handleButtonClick = () => {
    setEditableModeCompany(true);

    if (localCompany) {
      setInputValueAgreement(localCompany.contract.no);
      setInputValueAgreementDate(
        new Date(localCompany.contract.issue_date).toISOString().split("T")[0]
      );
      setSelectedValueBusinessEntity(localCompany.businessEntity);
    }
  };

  // Form input handlers
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

  // Update company data
  const handleUpdate = async () => {
    const updatedData: Omit<
    Organization ,
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
  };

  // Cancel edit mode
  const handleCancel = () => {
    setEditableModeCompany(false);
  };

  return (
    <div>
      <header className={styles.header}>
        <h3 className={styles.title}>{title}</h3>

        {editableModeCompany ? (
          <div className={styles["editable-buttons"]}>
            <button className={styles.button} onClick={handleUpdate}>
              <img src={checkMarkLogo} alt="checkMarkLogo" /> Save changes
            </button>
            <button
              className={styles.button}
              onClick={handleCancel}
            >
              <img src={cross} alt="crossLogo" /> Cancel
            </button>
          </div>
        ) : (
          <button className={styles.button} onClick={handleButtonClick}>
            <img
              className={styles["logo-edit"]}
              src={editLogo}
              alt="editLogo"
            />
            <span>Edit</span>
          </button>
        )}
      </header>

      <div className={styles["line-container"]}>
        <div className={styles.line}>
          <div className={styles.property}>
            {editableModeCompany ? "Agreement number:" : "Agreement:"}
          </div>

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
              value={selectedValueCompanyType}
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
      </div>
    </div>
  );
};

export default CompanyCard;

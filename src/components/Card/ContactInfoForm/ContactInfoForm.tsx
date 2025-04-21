import { useState, useEffect } from "react";
import toast from "react-hot-toast";

import styles from "./ContactCard.module.scss";
import editLogo from "../../../assets/edit.png";
import checkMarkLogo from "../../../assets/check-mark.svg";
import cross from "../../../assets/closeIcon.svg";
import CustomInput from "../../CustomInput/CustomInput";
import { updateContactById } from "../../../api/AuthenticationService/userContactService ";
import { OrganizationContact  } from "../../../types";

interface ContactCardProps {
  contact?: OrganizationContact  | null;
  title: string;
}

const ContactCard = ({ contact = null, title }: ContactCardProps) => {
  const [localContact, setLocalContact] = useState<OrganizationContact  | null>(contact);
  const [isEditMode, setIsEditMode] = useState<boolean>(false);

  const [responsiblePerson, setResponsiblePerson] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [email, setEmail] = useState("");

  useEffect(() => {
    setLocalContact(contact);
    if (contact) {
      setResponsiblePerson(`${contact.firstname} ${contact.lastname}`);
      setPhoneNumber(`+${contact.phone}`);
      setEmail(contact.email);
    }
  }, [contact]);

  const handleChangeResponsiblePerson = (e: React.ChangeEvent<HTMLInputElement>) => {
    setResponsiblePerson(e.target.value);
  };

  const handleChangePhoneNumber = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPhoneNumber(e.target.value);
  };

  const handleChangeEmail = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  const handleEditClick = () => {
    setIsEditMode(true);
  };

  const handleCancel = () => {
    setIsEditMode(false);
    if (localContact) {
      setResponsiblePerson(`${localContact.firstname} ${localContact.lastname}`);
      setPhoneNumber(`+${localContact.phone}`);
      setEmail(localContact.email);
    }
  };

  const handleUpdate = async () => {
    if (!localContact) return;

    const [firstname, ...rest] = responsiblePerson.trim().split(" ");
    const lastname = rest.join(" ") || "";

    const updatedData = {
      firstname,
      lastname,
      phone: phoneNumber.replace("+", ""),
      email,
    };

    try {
    await updateContactById(localContact.id, updatedData);
      setLocalContact((prev) => ({
        ...prev!,
        ...updatedData,
        updatedAt: new Date().toISOString(),
      }));
      toast.success("Контакт успешно обновлен");
      setIsEditMode(false);
    } catch (error: unknown) {
      console.error("Failed to update contact:", error);
    
      if (error instanceof Error) {
        // If error is an Axios error, it may have a `response` field
        const axiosError = error as { response?: { data?: { error?: string } } };
        toast.error(axiosError.response?.data?.error || error.message || "Ошибка при обновлении контакта");
      } else {
        toast.error("Неизвестная ошибка");
      }
    }
  };

  return (
    <div>
      <header className={styles.header}>
        <h3 className={styles.title}>{title}</h3>
        {isEditMode ? (
          <div className={styles["editable-buttons"]}>
            <button className={styles.button} onClick={handleUpdate}>
              <img src={checkMarkLogo} alt="check" /> Save changes
            </button>
            <button className={styles.button} onClick={handleCancel}>
              <img src={cross} alt="cancel" /> Cancel
            </button>
          </div>
        ) : (
          <button className={styles.button} onClick={handleEditClick}>
            <img className={styles["logo-edit"]} src={editLogo} alt="edit" />
            <span>Edit</span>
          </button>
        )}
      </header>

      <div className={styles["line-container"]}>
        <div className={styles.line}>
          <div className={styles.property}>Responsible person:</div>
          {isEditMode ? (
            <CustomInput value={responsiblePerson} onChange={handleChangeResponsiblePerson} />
          ) : (
            <div className={styles.value}>
              {localContact ? `${localContact.firstname} ${localContact.lastname}` : "—"}
            </div>
          )}
        </div>

        <div className={styles.line}>
          <div className={styles.property}>Phone number:</div>
          {isEditMode ? (
            <CustomInput value={phoneNumber} onChange={handleChangePhoneNumber} />
          ) : (
            <div className={styles.value}>
              {localContact ? `+${localContact.phone}` : "—"}
            </div>
          )}
        </div>

        <div className={styles.line}>
          <div className={styles.property}>Email:</div>
          {isEditMode ? (
            <CustomInput value={email} onChange={handleChangeEmail} />
          ) : (
            <div className={styles.value}>
              {localContact?.email || "—"}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ContactCard;

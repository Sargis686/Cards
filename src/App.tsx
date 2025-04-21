import { useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";

import MainLayout from "./containers/AppLayout";
import styles from "./App.module.scss";

import editLogo from "./assets/edit.png";
import deleteLogo from "./assets/delete.png";
import BackArrow from "./assets/backArrow.svg?react";

import Card from "./components/Card/Card";
import Modal from "./components/Modal/Modal";
import CustomInput from "./components/CustomInput/CustomInput";

import useAuth from "./hook/useAuth";
import { deleteCompany, getCompanyById } from "./api/AuthenticationService/organizationService ";
import { getContactById } from "./api/AuthenticationService/userContactService ";

import { Organization , OrganizationContact } from "./types";

const companyId = "12";
const contactId = "16";

const CompanyApp = () => {
  const [company, setCompany] = useState<Organization | null>(null);
  const [contact, setContact] = useState<OrganizationContact | null>(null);
  const [loading, setLoading] = useState(true);

  const [modal, setModal] = useState(false);
  const [deleteModal, setDeleteModal] = useState(false);
  const [title, setTitle] = useState("Eternal Rest Funeral Home");
  const [input, setInput] = useState("");
  const [showBack, setShowBack] = useState(false);

  useAuth("USERNAME");

  useEffect(() => {
    (async () => {
      const companyData = await getCompanyById(companyId);
      setCompany(companyData);
      const contactData = await getContactById(contactId);
      setContact(contactData);
      setLoading(false);
    })();
  }, []);

  const toggle = {
    modal: () => setModal((p) => !p),
    deleteModal: () => setDeleteModal((p) => !p),
    backBtn: () => setShowBack((p) => !p),
  };

  const handle = {
    inputChange: (e: React.ChangeEvent<HTMLInputElement>) => setInput(e.target.value),
    saveTitle: () => {
      setTitle(input);
      setModal(false);
    },
    deleteCompany: () => {
      deleteCompany(companyId)
        .then(() => {
          toast.success("Успешно удалено");
          setDeleteModal(false);
        })
        .catch((err) => console.error("Удаление не удалось", err));
    },
  };

  return (
    <>
      <MainLayout>
        <header className={styles.container}>
          <button
            className={`${styles.back} ${showBack ? styles["back-active"] : ""}`}
            onClick={toggle.backBtn}
          >
            <BackArrow />
          </button>

          <h1 className={styles["header-name"]}>{title}</h1>

          <div>
            <button className={styles.editLogo} onClick={toggle.modal}>
              <img src={editLogo} alt="edit" />
            </button>
            <button className={styles.deleteLogo} onClick={toggle.deleteModal}>
              <img src={deleteLogo} alt="delete" />
            </button>
          </div>
        </header>

        <Modal
          isOpen={modal}
          onClose={toggle.modal}
          title="Specify the Organization's name"
          backText="Cancel"
          nextText="Save changes"
          nextModal={handle.saveTitle}
        >
          <div className={styles.modal}>
            <CustomInput
              value={input}
              onChange={handle.inputChange}
              placeholder={title}
            />
          </div>
        </Modal>

        <Modal
          isOpen={deleteModal}
          onClose={toggle.deleteModal}
          title="Remove the Organization?"
          backText="No"
          nextText="Yes, remove"
          nextModal={handle.deleteCompany}
        >
          <p className={styles["modal-text"]}>
            Are you sure you want to remove this Organization?
          </p>
        </Modal>

        {loading ? (
          <div className={styles.loading}>Загрузка...</div>
        ) : (
          <>
            <Card company={company} title="Company Details" />
            <Card type="contact" company={company} contact={contact} title="Contacts" />
            <Card type="photos" company={company} title="Photos" />
          </>
        )}
      </MainLayout>

      <Toaster containerClassName={styles.toast} position="top-right" />
    </>
  );
};

export default CompanyApp;

import { useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import MainLayout from "./layouts/MainLayout";
import styles from "./App.module.scss";

import editLogo from "./assets/edit.png";
import deleteLogo from "./assets/delete.png";
import Card from "./components/Card/Card";
import Modal from "./components/Modal/Modal";
import CustomInput from "./components/CustomInput/CustomInput";

import BackArrowLogo from "./assets/back-arrow.svg?react";
import useAuth from "./hooks/useAuth";
import { deleteCompany, getCompanyById } from "./api/services/companyService";
import { getContactById } from "./api/services/contactService";

const companyId = "12";

function App() {
  const [isModalOpen, setModalOpen] = useState(false);
  const [isModalOpenDelete, setModalOpenDelete] = useState(false);
  const [inputValue, setInputValue] = useState("");

  const [backButton, setBackButton] = useState(false);

  const [title, setTitle] = useState<string>("Eternal Rest Funeral Home");

  const toggleModal = () => {
    setModalOpen(!isModalOpen);
  };

  const toggleModalDelete = () => {
    setModalOpenDelete(!isModalOpenDelete);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  const deleteCompanyHandler = () => {
    deleteCompany(companyId)
      .then((data) => {
        console.log("Данные ответа:", data);
        toast.success("Успешно удалено");
        setModalOpenDelete(false);
      })
      .catch((error) => {
        console.error("Не удалось удалить компанию:", error);
      });
  };

  const username = "USERNAME";
  useAuth(username);

  const [company, setCompany] = useState<Company | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchCompany = async () => {
      const companyData = await getCompanyById(companyId);
      setCompany(companyData);
      setLoading(false);
    };

    fetchCompany();
  }, [companyId]);

  const [contact, setContact] = useState<Contact | null>(null);

  useEffect(() => {
    const contactId = "16";
    const fetchContact = async () => {
      try {
        const data = await getContactById(contactId);
        setContact(data);
      } catch (err) {
        console.error("Ошибка получения контактов", err);
      } finally {
        setLoading(false);
      }
    };

    fetchContact();
  }, []);

  const nextModalHandler = () => {
    setTitle(inputValue);
    setModalOpen(false);
  };

  return (
    <>
      <MainLayout>
        <header className={styles.container}>
          <button
            className={`${styles.back} ${
              backButton ? styles["back-active"] : null
            }`}
            onClick={() => setBackButton((prev) => !prev)}
          >
            <BackArrowLogo />
          </button>
          <h1 className={styles["header-name"]}>{title}</h1>
          <div>
            <button className={styles.editLogo} onClick={toggleModal}>
              <img src={editLogo} alt="editLogo" />
            </button>
            <button className={styles.deleteLogo} onClick={toggleModalDelete}>
              <img src={deleteLogo} alt="deleteLogo" />
            </button>
          </div>
        </header>

        <Modal
          isOpen={isModalOpen}
          onClose={toggleModal}
          title="Specify the Organization's name"
          backText={"Cancel"}
          nextText={"Save changes"}
          nextModal={nextModalHandler}
        >
          <div className={styles.modal}>
            <CustomInput
              value={inputValue}
              onChange={handleChange}
              placeholder={title}
            />
          </div>
        </Modal>

        <Modal
          isOpen={isModalOpenDelete}
          onClose={toggleModalDelete}
          title="Remove the Organization?"
          backText={"No"}
          nextText={"Yes, remove"}
          nextModal={deleteCompanyHandler}
        >
          <p className={styles["modal-text"]}>
            Are you sure you want to remove this Organization?
          </p>
        </Modal>

        {loading && <div className={styles.loading}>Загрузка...</div>}

        {!loading && <Card company={company} title={"Company Details"} />}
        {!loading && (
          <Card
            type="contact"
            company={company}
            title={"Contacts"}
            contact={contact}
          />
        )}
        {!loading && <Card type="photos" company={company} title={"Photos"} />}
      </MainLayout>

      <Toaster
        containerClassName={styles.toast}
        position="top-right"
        reverseOrder={false}
      />
    </>
  );
}

export default App;

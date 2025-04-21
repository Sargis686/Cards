import { useState, useEffect, useRef } from "react";
import toast from "react-hot-toast";

import styles from "./PhotoCard.module.scss";
import camera from "../../../assets/cameraIcon.svg";
import trashLogo from "../../../assets/trash.svg";
import {
  uploadCompanyImage,
  removeCompanyImage,
} from "../../../api/AuthenticationService/photoService";
import { Organization, CompanyPhoto  } from "../../../types";

// Interface definitions
interface PhotoCardProps {
  company: Organization | null;
  title: string;
}

const PhotoCard = ({ company, title }: PhotoCardProps) => {
  // State variables
  const [photos, setPhotos] = useState<CompanyPhoto []>([]);
  const [isModalOpen, setModalOpen] = useState(false);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  // Update photos when company changes
  useEffect(() => {
    if (company && company.photos) {
      setPhotos(company.photos);
    }
  }, [company]);

  // Toggle modal
  const toggleModal = () => {
    setModalOpen(!isModalOpen);
  };

  // Handle button click to open file selector
  const handleButtonClick = () => {
    fileInputRef.current?.click();
    toggleModal();
  };

  // Handle file change and upload
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
        toast.success("Изображение успешно загружено");
      } catch (error) {
        console.error("Error uploading image:", error);
        toast.error("Ошибка при загрузке изображения");
      }
    }
  };

  // Delete image handler
  const deleteImageHandler = (imageName: string) => {
    const companyId = 12;
    removeCompanyImage(companyId, imageName)
      .then(() => {
        toast.success("Успешно удалено");
        setPhotos((prev) => prev.filter((item) => !(item.name === imageName)));
      })
      .catch((err) => {
        console.error("Не получилось удалить:", err);
        toast.error("Не удалось удалить изображение");
      });
  };

  return (
    <div>
      <header className={styles.header}>
        <h3 className={styles.title}>{title}</h3>
        <button className={styles.button} onClick={handleButtonClick}>
          <img src={camera} alt="cameraLogo" />
          <span>Add</span>
          <input
            type="file"
            ref={fileInputRef}
            style={{ display: "none" }}
            accept="image/*"
            onChange={handleFileChange}
          />
        </button>
      </header>

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
    </div>
  );
};

export default PhotoCard;

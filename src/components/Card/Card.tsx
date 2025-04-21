import { FC } from "react";
import styles from "./Card.module.scss";

import PhotoCard from "./PhotoManager/PhotoManager";
import { Organization , OrganizationContact } from "../../types";
import CompanyCard from "./CompanyInfoForm/CompanyInfoForm";
import ContactCard from "./ContactInfoForm/ContactInfoForm";


// Interface definitions
interface CardProps {
  company: Organization | null;
  type?: "contact" | "company" | "photos"
  title: string;
  contact?: OrganizationContact | null;
}

const Card: FC<CardProps> = ({
  company,
  type = "company",
  title,
  contact = null,
}) => {
  return (
    <section className={styles.container}>
      {type === "company" && <CompanyCard company={company} title={title} />}

      {type === "contact" && <ContactCard contact={contact} title={title} />}

      {type === "photos" && <PhotoCard company={company} title={title} />}
    </section>
  );
};

export default Card;

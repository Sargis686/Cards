import { useState } from "react";
import styles from "./CustomSelect.module.scss";
import selectArrowLogo from "../../assets/select-arrow.svg";

interface CustomSelectProps {
  value: string;
  onChange: (value: string) => void;
  options: { value: number; label: string }[];
}

const CustomSelect: React.FC<CustomSelectProps> = ({
  value,
  onChange,
  options,
}) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleToggle = () => {
    setIsOpen((prev) => !prev);
  };

  const handleOptionClick = (optionValue: string) => {
    onChange(optionValue);
    console.log("optionValue", optionValue);
    setIsOpen(false);
  };

  return (
    <div className={styles.customSelectContainer}>
      <div className={styles.customSelect} onClick={handleToggle} tabIndex={0}>
        <span>
          {options.find((option) => option.value.toString() === value)?.label}
          {value}
        </span>
        <span
          className={`${styles.arrow} ${isOpen ? styles["arrow-active"] : ""}`}
        >
          <img src={selectArrowLogo} alt="selectArrowLogo" />
        </span>
      </div>
      {isOpen && (
        <div className={styles.optionsContainer}>
          {options.map((option) => (
            <div
              key={option.value}
              className={styles.option}
              onClick={() => handleOptionClick(option.label)}
            >
              {option.label}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default CustomSelect;

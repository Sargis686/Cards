import { useState } from "react";
import styles from "./CustomSelect.module.scss";
import selectArrowLogo from "../../assets/select-arrow.svg";

interface Option {
  value: number;
  label: string;
}

interface CustomSelectProps {
  value: string;
  onChange: (value: string) => void;
  options?: Option[];
  label?:string
  editable?:boolean
}

const CustomSelect: React.FC<CustomSelectProps> = ({
  value,
  onChange,
  options = [], // Default to empty array
}) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleToggle = () => {
    setIsOpen((prev) => !prev);
  };

  const handleOptionClick = (optionValue: string) => {
    onChange(optionValue);
    setIsOpen(false);
  };

  const selectedLabel =
    options?.find((option) => option.value.toString() === value)?.label || "Select option";

  return (
    <div className={styles.customSelectContainer}>
      <div
        className={styles.customSelect}
        onClick={handleToggle}
        tabIndex={0}
      >
        <span>{selectedLabel}</span>
        <span
          className={`${styles.arrow} ${isOpen ? styles["arrow-active"] : ""}`}
        >
          <img src={selectArrowLogo} alt="select arrow" />
        </span>
      </div>

      {isOpen && (
        <div className={styles.optionsContainer}>
          {options.length === 0 ? (
            <div className={styles.option}>No options available</div>
          ) : (
            options.map((option) => (
              <div
                key={option.value}
                className={styles.option}
                onClick={() => handleOptionClick(option.value.toString())}
              >
                {option.label}
              </div>
            ))
          )}
        </div>
      )}
    </div>
  );
};

export default CustomSelect;

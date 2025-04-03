import React from "react";
import styles from "./CustomInput.module.scss";

interface CustomInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
}

const CustomInput: React.FC<CustomInputProps> = ({
  value,
  onChange,
  placeholder,
  ...rest
}) => {
  return (
    <input
      type="text"
      className={styles.customInput}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      {...rest}
    />
  );
};

export default CustomInput;

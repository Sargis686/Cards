import React, { forwardRef } from "react";
import s from "./CustomInput.module.scss";

interface CustomInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  error?: string;
  editable?: boolean;
}

const CustomInput = forwardRef<HTMLInputElement,CustomInputProps>(
  ({ label, value, onChange, placeholder, error, ...rest }, ref)=> {
  return (
    <div className={s.inputWrapper}>
    {label && <label className={s.label}>{label}</label>}
    <input
      ref={ref}
      type="text"
      className={`${s.inputField} ${error ? s.inputError : ""}`}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      {...rest}
    />
fefererererer

    {error && <span className={s.errorText}>{error}</span>}
  </div>
  )
}
)
export default CustomInput;

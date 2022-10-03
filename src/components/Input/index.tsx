import React, { FC, ChangeEvent, HTMLInputTypeAttribute } from "react";
import { ReactComponent as InputErrorIcon } from "../../assets/images/input-error-icon.svg";
import InputStyles from "./Input.module.scss";

export interface IInputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  error?: string | boolean;
  icon?: any;
  name?: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
  type?: HTMLInputTypeAttribute;
  value: string | number;
  disabled?: boolean;
  autoComplete?: string;
  title?: string;
  required?: boolean;
  inputClass?: string;
  containerClass?: string;
  pattern?: string;
}

const Input: FC<IInputProps> = ({
  error,
  icon,
  name,
  onChange,
  placeholder,
  type,
  value,
  disabled,
  autoComplete,
  title,
  required,
  inputClass,
  containerClass,
  pattern,
  ...props
}) => {
  return (
    <>
      <div
        className={
          !error
            ? `${InputStyles.input} ${containerClass}`
            : `${InputStyles.input} ${containerClass} ${InputStyles.errored}`
        }
      >
        <div className={InputStyles.input_content}>
          {icon && <div className={InputStyles.input_content_icon}>{icon}</div>}
          <input
            data-testid="input"
            type={type}
            required={required}
            name={name}
            title={title}
            placeholder={placeholder}
            autoComplete={autoComplete}
            value={value}
            onChange={onChange}
            className={`${InputStyles.input_content_field} ${inputClass}`}
            pattern={pattern}
            {...props}
          />
          {error && type !== "password" && (
            <div className={InputStyles.input_content_erroricon}>
              <InputErrorIcon />
            </div>
          )}
        </div>
      </div>
      <div className={InputStyles.error}>{error && `*${error}`}</div>
    </>
  );
};

export default Input;

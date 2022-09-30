import React, { FC } from "react";
import { ReactComponent as InputErrorIcon } from "../../assets/images/input-error-icon.svg";
import InputStyles from "./Input.module.scss";

export interface IInputProps {
  error?: string | boolean;
  icon?: any;
  moneyFormat?: boolean;
  label?: string;
  name?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onFocus?: () => void;
  onBlur?: () => void;
  placeholder?: string;
  type?: any;
  value?: any;
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
  moneyFormat,
  label,
  name,
  onChange,
  onFocus,
  onBlur,
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
      {/* <div className={`${InputStyles.input} ${containerClass}`}> */}
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
            type={type}
            required={required}
            name={name}
            title={title}
            placeholder={placeholder}
            autoComplete={autoComplete}
            value={value}
            onChange={onChange}
            onBlur={onBlur}
            onFocus={onFocus}
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

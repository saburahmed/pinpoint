import { FC, HTMLProps } from "react";
import ButtonStyle from "./Button.module.scss";

export interface IButtonProps extends HTMLProps<HTMLButtonElement> {
  className?: string;
  onPress?: React.MouseEventHandler<HTMLButtonElement>;
  title: string;
  isLoading?: boolean;
  disabled?: boolean;
  type?: "button" | "submit" | "reset" | undefined;
  width?: string;
  borderRadius?: string;
  fontSize?: string;
  height?: string;
  textAlign?: any;
  padding?: string;
  fontWeight?: number;
  cursor?: string;
}

const Button: FC<IButtonProps> = ({
  className,
  onPress,
  title,
  isLoading,
  disabled,
  type,
  width,
  borderRadius,
  fontSize,
  height,
  textAlign,
  padding,
  fontWeight,
  cursor,
  ...props
}) => {
  return (
    <button
      type={type}
      onClick={onPress}
      disabled={isLoading || disabled}
      className={`${ButtonStyle.button} ${className}`}
      {...props}
      style={{
        width,
        borderRadius,
        fontSize,
        height,
        textAlign,
        padding,
        fontWeight,
        cursor,
      }}
    >
      {isLoading ? "Loading..." : title}
    </button>
  );
};

export default Button;

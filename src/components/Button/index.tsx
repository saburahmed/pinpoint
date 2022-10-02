import { FC } from "react";
import ButtonStyle from "./Button.module.scss";

type buttonProps = {
  className?: string;
  onPress?: () => void;
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
  icon?: any;
  cursor?: string;
};

const Button: FC<buttonProps> = ({
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
  icon,
  cursor,
  ...props
}) => {
  return (
    <button
      // eslint-disable-next-line react/button-has-type
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
      {icon && <span>{icon}</span>}
    </button>
  );
};

export default Button;

import React from "react";
import { buttonSizes, buttonVariants, disabledVariants, iconContainer, baseStyle, textStyle } from "./Button.css";
import Icon from "../icon/Icon";

interface ButtonProps {
  variant?: keyof typeof buttonVariants;
  type?: "primary" | "secondary" | "assistive";
  size?: "sm" | "md" | "lg";
  disabled?: boolean;
  icon?: string;
  iconPosition?: "left" | "right";
  onClick?: () => void;
  children: React.ReactNode;
  fullWidth?: boolean;
  width?: string;
  bgColor?: string;
  textColor?: string;
  className?: string; 
}

export default function Button({
  variant = "solid",
  type = "primary",
  size = "md",
  disabled = false,
  icon,
  iconPosition = "left",
  onClick,
  children,
  fullWidth = false,
  width,
  bgColor,
  textColor,
  className,
}: ButtonProps) {
  // type as keyof typeof buttonVariants[typeof variant] => type 이 buttonVariants[variant] 객체의 키임을 명시
  const variantStyle =
    buttonVariants[variant][
      type as keyof (typeof buttonVariants)[typeof variant]
    ];
  const sizeStyle = buttonSizes[size];
  const disabledStyle = disabled
    ? disabledVariants[variant][
        type as keyof (typeof disabledVariants)[typeof variant]
      ]
    : "";
    const computedWidth = fullWidth ? "100%" : width || "auto";
    const widthStyle = { width: computedWidth };
  
  const isIconLeft = iconPosition === "left";

  const buttonStyle: React.CSSProperties = {
    ...widthStyle,
    ...(bgColor && { backgroundColor: bgColor }),
    ...(textColor && { color: textColor }),
  };
  return (
    <button
      className={`${baseStyle} ${variantStyle} ${sizeStyle} ${disabledStyle} ${
        className || ""
      }`}
      onClick={onClick}
      style={buttonStyle}
      disabled={disabled}
    >
      {icon ? (
        <div className={iconContainer}>
          {isIconLeft && <Icon name={icon} size={18} alt={icon} />}
          <span className={textStyle}>{children}</span>
          {!isIconLeft && <Icon name={icon} size={18} alt={icon} />}
        </div>
      ) : (
        <span className={textStyle}>{children}</span>
      )}
    </button>
  );
}

import React from "react";
import { buttonStyles, buttonVariants, disabledVariants } from "./Button.css";
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
  className?: string; // 추가 커스텀 스타일
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
  fullWidth = true,
  width,
  className,
}: ButtonProps) {
  // type as keyof typeof buttonVariants[typeof variant] => type 이 buttonVariants[variant] 객체의 키임을 명시
  const variantStyle =
    buttonVariants[variant][
      type as keyof (typeof buttonVariants)[typeof variant]
    ];
  const sizeStyle = buttonStyles[size];
  const disabledStyle = disabled
    ? disabledVariants[variant][
        type as keyof (typeof disabledVariants)[typeof variant]
      ]
    : "";
  const widthStyle = fullWidth
    ? { width: "100%" }
    : width
    ? { width }
    : { width: "auto" };
  const isIconLeft = iconPosition === "left";

  return (
    <button
      className={`${variantStyle} ${sizeStyle} ${disabledStyle} ${
        className || ""
      }`}
      onClick={onClick}
      style={widthStyle}
      disabled={disabled}
    >
      {icon ? (
        <div className={buttonStyles.content}>
          {isIconLeft && <Icon name={icon} size={18} alt={icon} />}
          <span>{children}</span>
          {!isIconLeft && <Icon name={icon} size={18} alt={icon} />}
        </div>
      ) : (
        children
      )}
    </button>
  );
}

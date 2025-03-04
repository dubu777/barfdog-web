import React from "react";
import {
  buttonSizes,
  buttonVariants,
  disabledVariants,
  iconContainer,
} from "./Button.css";
import Icon from "../icon/Icon";
import DefaultText from "../defaultText/DefaultText";

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

  const isIconLeft = iconPosition === "left";

  // 버튼 사이즈에 따른 텍스트 타입을 매핑하는 객체 생성
  const textTypeMap: Record<
    NonNullable<ButtonProps["size"]>,
    "headline3" | "headline4"
  > = {
    sm: "headline4",
    md: "headline3",
    lg: "headline3",
  };

  const textType = textTypeMap[size];

  const computedWidth = fullWidth ? "100%" : width || "auto";
  const widthStyle = { width: computedWidth };

  const buttonStyle: React.CSSProperties = {
    ...widthStyle,
    ...(bgColor && { backgroundColor: bgColor }),
  };
  return (
    <button
      className={`${variantStyle} ${sizeStyle} ${disabledStyle} ${
        className || ""
      }`}
      onClick={onClick}
      style={buttonStyle}
      disabled={disabled}
    >
      {icon ? (
        <div className={iconContainer}>
          {isIconLeft && <Icon name={icon} size={18} alt={icon} />}
          <DefaultText
            type={textType}
            align="center"
            style={textColor ? { color: textColor } : undefined}
          >
            {children}
          </DefaultText>
          {!isIconLeft && <Icon name={icon} size={18} alt={icon} />}
        </div>
      ) : (
        <DefaultText
          type={textType}
          align="center"
          style={textColor ? { color: textColor } : undefined}
        >
          {children}
        </DefaultText>
      )}
    </button>
  );
}

import {
  buttonSizes,
  buttonVariants,
  disabledVariants,
  iconContainer,
  baseStyle,
  textStyle,
} from "./Button.css";
import SvgIcon from "../svgIcon/SvgIcon";
import { COLORS } from "@/constants/style";

interface ButtonProps {
  variant?: keyof typeof buttonVariants;
  type?: "primary" | "secondary" | "assistive";
  size?: "sm" | "md" | "lg";
  disabled?: boolean;
  iconSrc?: React.ComponentType<React.SVGProps<SVGSVGElement>>;
  iconPosition?: "left" | "right";
  onClick?: () => void;
  children: React.ReactNode;
  fullWidth?: boolean;
  width?: string;
  buttonColor?: keyof typeof COLORS;
  textColor?: keyof typeof COLORS;
  buttonType?: "submit" | "button" | "reset";
  style?: React.CSSProperties;
  className?: string;
}

export default function Button({
  variant = "solid",
  type = "primary",
  size = "md",
  disabled = false,
  iconSrc,
  iconPosition = "left",
  onClick,
  children,
  fullWidth = false,
  width,
  buttonColor,
  textColor,
  buttonType = "button",
  style,
  className,
}: ButtonProps) {
  // type as keyof typeof buttonVariants[typeof variant] => type 이 buttonVariants[variant] 객체의 키임을 명시
  const variantStyle =
    buttonVariants[variant][
      type as keyof (typeof buttonVariants)[typeof variant]
    ];
  const sizeStyle = variant !== "text" ? buttonSizes[size] : "";
  const disabledStyle = disabled
    ? disabledVariants[variant][
        type as keyof (typeof disabledVariants)[typeof variant]
      ]
    : "";
  const computedWidth = fullWidth ? "100%" : width || "auto";

  const isIconLeft = iconPosition === "left";

  const iconSize = size === "sm" ? 20 : 24;

  // buttonColor와 textColor가 있을 경우 오버라이드 스타일 적용
  const overrideStyles: React.CSSProperties = {
    ...(buttonColor && {
      backgroundColor: COLORS[buttonColor],
      ...(variant === "outline" && {
        border: `1px solid ${COLORS[buttonColor]}`,
      }),
    }),
    ...(textColor && { color: COLORS[textColor] }),
  };

  const computedStyle: React.CSSProperties = {
    width: computedWidth,
    ...style,
    ...overrideStyles,
  };

  return (
    <button
      type={buttonType}
      className={`${baseStyle} ${variantStyle} ${sizeStyle} ${disabledStyle} ${
        className || ""
      }`}
      onClick={onClick}
      style={computedStyle}
      disabled={disabled}
    >
      {iconSrc ? (
        <div className={iconContainer}>
          {isIconLeft && iconSrc && <SvgIcon src={iconSrc} size={iconSize} />}
          <span className={textStyle}>{children}</span>
          {!isIconLeft && iconSrc && <SvgIcon src={iconSrc} size={iconSize} />}
        </div>
      ) : (
        <span
          className={textStyle}
          style={textColor ? { color: COLORS[textColor] } : undefined}
        >
          {children}
        </span>
      )}
    </button>
  );
}

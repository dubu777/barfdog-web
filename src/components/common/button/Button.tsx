import {
  buttonSizes,
  buttonVariants,
  disabledVariants,
  iconContainer,
  baseStyle,
  textStyle,
} from "./Button.css";
import SvgIcon from "../svgIcon/SvgIcon";

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
  const widthStyle = { width: computedWidth };

  const isIconLeft = iconPosition === "left";

  const iconSize = size === "sm" ? 20 : 24;

  const buttonStyle: React.CSSProperties = {
    ...widthStyle,
    ...style,
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
      {iconSrc ? (
        <div className={iconContainer}>
          {isIconLeft && iconSrc && <SvgIcon src={iconSrc} size={iconSize} />}
          <span className={textStyle}>{children}</span>
          {!isIconLeft && iconSrc && <SvgIcon src={iconSrc} size={iconSize} />}
        </div>
      ) : (
        <span className={textStyle}>{children}</span>
      )}
    </button>
  );
}

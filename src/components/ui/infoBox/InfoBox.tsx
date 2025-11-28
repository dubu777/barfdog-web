import HelpIcon from "/public/images/icons/help.svg";
import InfoIcon from "/public/images/icons/info.svg";
import ArrowRightIcon from "/public/images/icons/chevron-right-blue.svg";
import Text from "@/components/ui/text/Text";
import {
  infoBoxBase,
  infoBoxClickEvent,
  infoBoxColor,
  infoBoxStyle,
  infoTextStyle,
} from "@/components/ui/infoBox/InfoBox.css";
import SvgIcon from "@/components/ui/svgIcon/SvgIcon";
import { COLORS } from "@/constants/style";
import { ReactNode } from "react";

interface InfoBoxProps {
  type?: "help" | "info";
  color?: "red" | "blue" | "gray";
  align?: "start" | "center";
  showRightArrowButton?: boolean;
  text?: string | ReactNode;
  fullWidth?: boolean;
  onClick?: () => void;
  children?: ReactNode;
  style?: React.CSSProperties;
  className?: string;
}

export default function InfoBox({
  type = "info",
  color = "gray",
  align = "center",
  showRightArrowButton = false,
  text,
  fullWidth = false,
  onClick,
  children,
  style,
  className = "",
}: InfoBoxProps) {
  const iconColor: keyof typeof COLORS =
    color === "gray"
      ? "gray700"
      : color === "red"
      ? "pastelRed"
      : color === "blue"
      ? "blue500"
      : "gray700";

  return (
    <div
      className={`${infoBoxBase({ fullWidth })} ${infoBoxColor[color]} ${
        infoBoxClickEvent[!!onClick ? "true" : "false"]
      } ${className}`}
      onClick={onClick || undefined}
      style={style}
    >
      <div className={infoBoxStyle({ align })}>
        {text && (
          <>
            <SvgIcon
              src={type === "help" ? HelpIcon : InfoIcon}
              color={iconColor}
            />
            <Text type="label4" color={iconColor} className={infoTextStyle}>
              {text}
            </Text>
          </>
        )}
        {children}
      </div>
      {showRightArrowButton && (
        <button>
          <SvgIcon src={ArrowRightIcon} color={iconColor} />
        </button>
      )}
    </div>
  );
}

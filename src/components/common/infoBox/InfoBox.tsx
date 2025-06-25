import HelpIcon from "/public/images/icons/help.svg";
import InfoIcon from "/public/images/icons/info.svg";
import ArrowRightIcon from "/public/images/icons/chevron-right-blue.svg";
import DefaultText from "@/components/common/defaultText/DefaultText";
import {
  infoBoxBase,
  infoBoxClickEvent,
  infoBoxColor,
  infoBoxStyle,
  infoTextStyle,
  infoBoxFullWidth,
} from "@/components/common/infoBox/InfoBox.css";
import SvgIcon from "@/components/common/svgIcon/SvgIcon";
import { COLORS } from "@/constants/style";

interface InfoBoxProps {
  type?: "help" | "info";
  color?: "red" | "blue" | "gray";
  showRightArrowButton?: boolean;
  text: string;
  fullWidth?: boolean;
  onClick?: () => void;
  style?: React.CSSProperties;
  className?: string;
}

const InfoBox = ({
  type = "info",
  color = "gray",
  showRightArrowButton = false,
  text,
  fullWidth = false,
  onClick,
  style,
  className,
}: InfoBoxProps) => {
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
      className={`${infoBoxBase} ${infoBoxColor[color]} ${
        infoBoxClickEvent[!!onClick ? "true" : "false"]
      } ${fullWidth ? infoBoxFullWidth : ""} ${className || ""}`}
      onClick={onClick || undefined}
      style={style}
    >
      <div className={infoBoxStyle}>
        <SvgIcon
          src={type === "help" ? HelpIcon : InfoIcon}
          color={iconColor}
        />
        <DefaultText type="label4" color={iconColor} className={infoTextStyle}>
          {text}
        </DefaultText>
      </div>
      {showRightArrowButton && (
        <button>
          <SvgIcon src={ArrowRightIcon} color={iconColor} />
        </button>
      )}
    </div>
  );
};

export default InfoBox;

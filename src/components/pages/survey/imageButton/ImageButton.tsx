import * as styles from "./ImageButton.css";
import DefaultText from "@/components/common/defaultText/DefaultText";
import SvgIcon from "@/components/common/svgIcon/SvgIcon";
import Image from "next/image";
import CheckedBox from "public/images/option/checked_selection.svg";
import UnCheckedBox from "public/images/option/unchecked_radio.svg";

interface ImageButtonProps<T> {
  label: string;
  value: T;
  isChecked: boolean;
  // imageSrc: React.ComponentType<React.SVGProps<SVGSVGElement>>;
  imageSrc?: string;
  imageWidth?: number;
  imageHeight?: number;
  defaultSvg?: React.ComponentType<React.SVGProps<SVGSVGElement>>;
  selectedSvg?: React.ComponentType<React.SVGProps<SVGSVGElement>>;
  inputType?: "radio" | "checkbox" | "rank";
  onToggle: (value: T) => void;
  display?: "flex" | "grid";
  disabled?: boolean; 
  rank?: number;
}

export default function ImageButton<T>({
  label,
  isChecked,
  inputType = "radio",
  imageSrc,
  imageWidth,
  imageHeight,
  defaultSvg,
  selectedSvg,
  value,
  display = "flex",
  onToggle,
  disabled = false,
  rank,
}: ImageButtonProps<T>) {
  return (
    <button
      className={styles.imageButtonBox({ isChecked, display, disabled })}
      onClick={() => !disabled && onToggle(value)}
      disabled={disabled}
    >
      {inputType === "rank" && rank != null && (
        <div className={styles.rankChip}>
          <DefaultText type="caption" color="gray0">
            {rank}위
          </DefaultText>
        </div>
      )}
      {inputType === "checkbox" && (
        <div className={styles.checkBoxWrapper}>
          <SvgIcon src={isChecked ? CheckedBox : UnCheckedBox} />
        </div>
      )}
      {imageSrc && (
        <Image
          src={imageSrc}
          alt={label}
          height={imageHeight}
          width={imageWidth}
        />
      )}
      {(defaultSvg || selectedSvg) && (
        <SvgIcon src={isChecked && selectedSvg ? selectedSvg : defaultSvg!} size={64}/>
      )}
      <DefaultText type="headline4" color={isChecked ? "red" : "gray900"}>
        {label}
      </DefaultText>
    </button>
  );
}

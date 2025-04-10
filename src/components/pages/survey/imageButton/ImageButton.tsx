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
  imageSrc: string;
  imageWidth: number;
  imageHeight: number;
  inputType?: "radio" | "checkbox" | "rank";
  onToggle: (value: T) => void;
}

export default function ImageButton<T>({
  label,
  isChecked,
  inputType = "radio",
  imageSrc,
  imageWidth,
  imageHeight,
  value,
  onToggle,
}: ImageButtonProps<T>) {
  return (
    <button className={styles.imageButtonContainer({ isChecked })} onClick={() => onToggle(value)} >
      {inputType === "rank" && (
        <div className={styles.rankChip}>
          <DefaultText type="caption" color="gray0">
            1위
          </DefaultText>
        </div>
      )}
      {inputType === "checkbox" && (
        <div className={styles.checkBoxWrapper}>
          <SvgIcon src={isChecked ? CheckedBox : UnCheckedBox} />
        </div>
      )}
      {/* <SvgIcon src={imageSrc} height={imageHeight} width={imageWidth} /> */}
      <Image src={imageSrc} alt={label} height={imageHeight} width={imageWidth} />
      <DefaultText type="headline3" color={isChecked ? "red" : "gray900"}>
        {label}
      </DefaultText>
    </button>
  );
}

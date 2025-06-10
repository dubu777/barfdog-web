import * as styles from "./DogImageButton.css";
import DefaultText from "@/components/common/defaultText/DefaultText";

import Image from "next/image";
import { colStartWrapper } from "../../checkout/common/deliveryAddress/DeliveryAddress.css";

interface DogImageButtonProps<T> {
  label: string;
  value: T;
  isChecked: boolean;
  imageSrc: string;
  subLabel: string[];
  onToggle: (value: T) => void;
}

export default function DogImageButton<T>({
  label,
  isChecked,
  imageSrc,
  value,
  subLabel,
  onToggle,
}: DogImageButtonProps<T>) {
  return (
    <button className={styles.dogImageButtonContainer({ isChecked })} onClick={() => onToggle(value)} >
      <Image src={imageSrc} alt={label} height={114} width={114} priority/>
      <div className={styles.dogImageButtonContentWrapper}>
        <DefaultText type="headline3" color={isChecked ? "red" : "gray900"}>{label}</DefaultText>
        <div className={colStartWrapper({ gap: 0 })}>
          {subLabel.map((text, index) => (
            <DefaultText key={index} type="body3" color="gray700">
              {text}
            </DefaultText>
          ))}
        </div>
      </div>
    </button>
  );
}

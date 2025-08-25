import { ReactNode } from "react";
import DefaultText from "@/components/common/defaultText/DefaultText";
import * as styles from "./InfoText.css";
import { TextColor, TextType } from "@/types/typography";

interface InfoTextProps {
  color?: TextColor;
  type?: TextType;
  children: ReactNode;
}

export default function InfoText({
  color = "gray700",
  type = "body3",
  children,
}: InfoTextProps) {
  return (
    <li className={styles.infoTextBox}>
      <DefaultText type={type} color={color}>
        •
      </DefaultText>
      <div>{children}</div>
    </li>
  );
}

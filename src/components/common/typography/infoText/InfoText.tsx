import { ReactNode } from "react";
import Text from "@/components/common/text/Text";
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
      <Text type={type} color={color}>
        •
      </Text>
      <div>{children}</div>
    </li>
  );
}

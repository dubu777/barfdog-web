import { ReactNode } from "react";
import Text from "@/components/common/text/Text";
import * as styles from "./InfoText.css";
import { TextColor, TextType } from "@/types/typography";

interface InfoTextProps {
  color?: TextColor;
  type?: TextType;
  children?: ReactNode;
  text?: string;
}

export default function InfoText({
  color = "gray700",
  type = "body3",
  children,
  text,
}: InfoTextProps) {
  return (
    <li className={styles.infoTextBox}>
      <Text type={type} color={color}>
        •
      </Text>
      {children
        ? <div>{children}</div>
        : text
          ? <Text type={type} color={color}>{text}</Text>
          : undefined
      }
    </li>
  );
}

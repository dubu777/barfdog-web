import { ReactNode } from "react";
import * as styles from "./CompletedBox.css";
import CheckCircle from "public/images/icons/check_circle.svg";
import SvgIcon from "@/components/ui/svgIcon/SvgIcon";

interface CompletedBoxProps {
  children: ReactNode;
  padding?: 0 | '60/20';
}

export default function CompletedBox({ 
  children,
  padding = '60/20',
}: CompletedBoxProps) {
  return (
    <div className={styles.completedBox({ padding })}>
      <SvgIcon src={CheckCircle} size={48} color="red" />
      <div className={styles.completedBoxInfo}>{children}</div>
    </div>
  );
};

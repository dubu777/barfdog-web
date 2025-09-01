import * as styles from "./InputLabel.css";
import Text from "@/components/common/text/Text";
import { pointColor } from "@/styles/common.css";

interface InputLabelProps {
  label: string;
  labelColor: "gray600" | "gray700" | "gray800";
  labelType?: "label4" | "headline4";
  isRequired?: boolean;
}

const InputLabel = ({
  labelType = "label4",
  label,
  labelColor,
  isRequired = false,
}: InputLabelProps) => {
  return (
    <Text
      type={labelType}
      color={labelColor}
      className={styles.labelStyle}
    >
      {label} {isRequired && <span className={pointColor}>*</span>}
    </Text>
  );
};

export default InputLabel;

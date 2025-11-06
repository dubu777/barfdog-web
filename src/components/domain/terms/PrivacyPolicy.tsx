import { commonWrapper } from "@/styles/common.css";
import Card from "@/components/ui/card/Card";
import Text from "@/components/ui/text/Text";
import { PRIVACY_POLICY_INFO } from "@/constants/terms";

interface PrivacyPolicyProps {
  backgroundColor?: "gray0" | "gray50";
  className?: string;
}

export default function PrivacyPolicy({
  backgroundColor = "gray50",
  className,
}: PrivacyPolicyProps) {
  return (
    <Card
      shadow="none"
      direction="col"
      align="start"
      justify="start"
      padding={20}
      gap={26}
      backgroundColor={backgroundColor}
      borderRadius={8}
      border='gray200'
      className={className}
    >
      {PRIVACY_POLICY_INFO.map((info, index) => (
        <div
          key={index}
          className={commonWrapper({
            direction: "col",
            align: "start",
            justify: "start",
            gap: 8,
          })}
        >
          {info.title && <Text type="label4">{info.title}</Text>}
          <Text type="caption" preLine>
            {info.description}
          </Text>
        </div>
      ))}
    </Card>
  );
}

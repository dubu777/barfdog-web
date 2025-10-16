import { commonWrapper } from "@/styles/common.css";
import { termsCard } from "./Terms.css";
import Card from "../card/Card";
import Text from "../text/Text";
import { PRIVACY_POLICY_INFO } from "@/constants/terms";

export default function PrivacyPolicyCard() {
  return (
    <Card
      shadow='none'
      direction='col'
      align='start'
      justify='start'
      padding={20}
      gap={26}
      backgroundColor='gray50'
      borderRadius={8}
      className={termsCard}
    >
      {PRIVACY_POLICY_INFO.map((info, index) => (
        <div 
          key={index} 
          className={commonWrapper({
            direction: 'col',
            align: 'start',
            justify: 'start',
            gap: 8,
          })}
        >
          {info.title && 
            <Text type='label4'>{info.title}</Text>
          }
          <Text type='caption' preLine>{info.description}</Text>
        </div>
      ))}
    </Card>	
  );
}
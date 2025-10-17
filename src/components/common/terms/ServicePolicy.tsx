import { commonWrapper } from "@/styles/common.css";
import Card from "../card/Card";
import Text from "../text/Text";
import { SERVICE_POLICY_INFO } from "@/constants/terms";

interface ServicePolicyProps {
  className?: string;
  backgroundColor?: "gray0" | "gray50";
}

export default function ServicePolicy({ 
  className,
  backgroundColor = 'gray0',
}: ServicePolicyProps) {
  return (
    <Card
      shadow='none'
      direction='col'
      align='start'
      justify='start'
      padding={20}
      gap={26}
      backgroundColor={backgroundColor}
      borderRadius={8}
      className={className}
    >
      {SERVICE_POLICY_INFO.map((info, index) => (
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
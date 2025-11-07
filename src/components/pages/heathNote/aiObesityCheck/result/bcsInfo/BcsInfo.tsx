import { commonWrapper } from "@/styles/common.css";
import { bcsCard, bcsCardCategory, bcsSvgIcon } from "./BcsInfo.css";
import Text from "@/components/ui/text/Text";
import Card from "@/components/ui/card/Card";
import SvgIcon from "@/components/ui/svgIcon/SvgIcon";
import Chips from "@/components/ui/chips/Chips";
import { getNameWithSubjectSuffix } from "@/utils";
import { CHIPS_COLORS, Colors } from "@/constants/style";
import { getObesityStepInfo, getObesityStepRange } from "@/utils/healthNote/aiObesityCheck/getObesityStepInfo";
import { OBESITY_BCS, OBESITY_DEFAULT_COLOR } from "@/constants/healthNote/aiObesityCheck";

interface BcsInfoProps {
  bcs: number;
  petName: string;
}

export default function BcsInfo({ bcs, petName }: BcsInfoProps) {
  const bcsSteps = [bcs, ...getObesityStepRange(bcs)].sort();

  return (
    <article className={commonWrapper({
      direction: 'col',
      gap: 24,
      paddingX: 20,
      paddingY: 40,
      backgroundColors: 'gray0',
    })}>
      <Text type='title3' align='center'>
        {getNameWithSubjectSuffix(petName)} 속한 BCS<br/>
        {bcs}단계 체형의 대표적 특징이에요
      </Text>
      <div className={commonWrapper({ direction: 'col', gap: 12 })}>
        {bcsSteps.map((step) => {
          const isActive = step === bcs;
          const { label, category, chipsColor, imageColor } = getObesityStepInfo(step);
          console.log(chipsColor);
          
          return (
            <Card
              key={step}
              shadow='light'
              direction='row'
              justify='start'
              gap={12}
              padding={12}
              borderRadius={16}
              className={`${bcsCard} ${isActive ? bcsCardCategory[category] : ''}`}
            >
              <SvgIcon 
                src={OBESITY_BCS[step].image} 
                size={120}
                color={isActive 
                  ? imageColor as Colors
                  : OBESITY_DEFAULT_COLOR.imageColor
                }
                className={bcsSvgIcon({ isActive })}
              />
              <div className={commonWrapper({ direction: 'col', align: 'start', gap: 2 })}>
                <div>
                  <Text type='label4' color='gray600'>BCS {step}단계</Text>
                  <div className={commonWrapper({ gap: 4, justify: 'start' })}>
                    <Text type='headline1'>{OBESITY_BCS[step].title}</Text>
                    {isActive && 
                      <Chips 
                        variant='solid' 
                        color={chipsColor as keyof typeof CHIPS_COLORS} 
                        borderRadius='lg'
                      >
                        {label}
                      </Chips>
                    }
                  </div>
                </div>
                <Text type='body3'>{OBESITY_BCS[step].description}</Text>
              </div>
            </Card>
          )
        })}
      </div>
    </article>
  );
}
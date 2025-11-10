import { commonWrapper, imageWrapper } from "@/styles/common.css";
import Image from "next/image";
import TipsImage from "/public/images/healthNote/aiObesityCheck/tips.jpg";
import TimerIcon from "/public/images/healthNote/aiObesityCheck/timer.svg";
import SquaredotIcon from "/public/images/healthNote/aiObesityCheck/squaredot.svg";
import Text from "@/components/ui/text/Text";
import Chips from "@/components/ui/chips/Chips";
import Card from "@/components/ui/card/Card";
import SvgIcon from "@/components/ui/svgIcon/SvgIcon";
import { getObesityGroupInfo } from "@/utils/healthNote/aiObesityCheck/getObesityStepInfo";

interface TipsProps {
  bcs: number;
}

export default function Tips({ bcs }: TipsProps) {
  const { tips, tags, title, description } = getObesityGroupInfo(bcs);

  return (
    <article className={commonWrapper({
      direction: 'col',
      gap: 20,
      paddingX: 20,
      paddingY: 40,
      backgroundColors: 'gray0',
    })}>
      <Text type='title3' align='center'>
				체형에 따라 달라지는 건강 관리 꿀팁
			</Text>
      <Image
        src={TipsImage} 
        alt='tipsImage' 
        width={335}
        height={200}
        className={imageWrapper({ objectFit: 'contain', borderRadius: 8 })}
      />
      <div className={commonWrapper({ gap: 6 })}>
        {tags.map((tag, index) => (
          <Chips key={index} color="blue50" variant='outlined'># {tag}</Chips>
        ))}
      </div>
      <Card 
        backgroundColor='gray100'
        shadow='none'
        padding={16}
        gap={12}
        borderRadius={12}
      >
        <div className={commonWrapper({ gap: 6, justify: 'start' })}>
          <SvgIcon src={TimerIcon} width={16} height={20} />
          <Text type='label2' color='gray800' applyLineHeight={false}>
            {title}
          </Text>
        </div>
        <Text type='body3' color='gray700'>
          {description}
        </Text>
        <ul className={commonWrapper({ direction: 'col', gap: 8 })}>
          {tips.map((tip, index) => (
            <li key={index} className={commonWrapper({ justify: 'start', gap: 4, align: 'start' })}>
              <SvgIcon src={SquaredotIcon} size={24} color='gray800' />
              <Text type='body3' color='gray700'>{tip}</Text>
            </li>
          ))}
        </ul>
      </Card>
    </article>
  );
}
import { commonWrapper, imageWrapper } from "@/styles/common.css";
import { useRouter } from "next/navigation";
import Image from "next/image";
import SurveyImage from '/public/images/healthNote/full-check/diet-analysis-survey.png'
import LifetLogo from '/public/images/healthNote/aiObesityCheck/lifet.svg';
import Text from "@/components/ui/text/Text";
import Button from "@/components/ui/button/Button";
import SvgIcon from "@/components/ui/svgIcon/SvgIcon";

export default function SurveyInfo() {
  const router = useRouter();

  return (
    <article className={commonWrapper({
      direction: 'col',
      gap: 40,
      paddingX: 20,
      paddingY: 40,
      backgroundColors: 'gray0',
    })}>
      <div className={commonWrapper({
        direction: 'col',
        gap: 20,
      })}>
        <div className={commonWrapper({ direction: 'col', gap: 4, align: 'center' })}>
          <Text type='title3' align='center'> 
            체중 관리가 고민이라면<br />맞춤형 식단으로 관리해 보세요
          </Text>
          <Text type='body3' align='center' color='gray600'>
            AI를 통해 활동량과 나이, 몸무게, 알러지, 건강 고민에 따른<br/>맞춤 식단을 추천해 드려요
          </Text>
        </div>
        <Image 
          src={SurveyImage} 
          alt='SurveyImage'
          width={560} 
          height={560}
          className={imageWrapper({ height: 'auto', objectFit: 'contain' })}
        />
        <Button 
          onClick={() => router.push('/diet-analysis')}
          fullWidth
        >
          식단 추천 받으러 가기
        </Button>
      </div>
      <SvgIcon src={LifetLogo} width={100} height={14} />
    </article>
  );
}
import * as styles from './main.css';
import Link from "next/link";
import SurveyImageSlider from "@/components/pages/main/slider/SurveyImageSlider";

const images = [
  '/images/main/survey-1.png',
  '/images/main/survey-2.png',
  '/images/main/survey-3.png',
];

const MainSurvey = () => {
  return (
    <article className={styles.mainSurveyWrapper}>
      <h2 className={styles.mainTitle({ size: 'titleLg' })} style={{ marginBottom: '28px' }}>
        75만건의 빅데이터로 만드는<br/>나만의 AI 맞춤 식단
      </h2>
      <SurveyImageSlider images={images} />
      <p className={styles.mainDescription({ size: 'sm' })} style={{ marginBottom: '39px' }}>
        바프독 AI 맞춤 설문을 통해 우리 아이의<br/>평소 모습을 알려주세요<br/>(설문 소요시간 5분 내외)
      </p>
      <Link href='/survey' className={styles.mainLink({ type: 'button' })}>
        AI 추천 문진 START!
      </Link>
    </article>
  );
};

export default MainSurvey;
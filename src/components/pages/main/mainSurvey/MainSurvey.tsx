import * as styles from './MainSurvey.css';
import MainSurveyImageSlider from "@/components/pages/main/mainSurvey/MainSurveyImageSlider";
import DefaultButton from "@/components/common/defaultButton/DefaultButton";
import Text from '@/components/common/text/Text';

const images = [
  '/images/main/survey-1.png',
  '/images/main/survey-2.png',
  '/images/main/survey-3.png',
];

const MainSurvey = () => {
  return (
    <article className={styles.mainSurveyWrapper}>
      <div style={{ marginBottom: '28px' }}>
        <Text type='title' size='titleLg' weight='bold'>
          75만건의 빅데이터로 만드는<br/>나만의 AI 맞춤 식단
        </Text>
      </div>
      <MainSurveyImageSlider images={images} />
      <div style={{ marginBottom: '39px' }}>
        <Text type='description' size='sm' color='grey'>
          바프독 AI 맞춤 설문을 통해 우리 아이의<br/>평소 모습을 알려주세요<br/>(설문 소요시간 5분 내외)
        </Text>
      </div>
      <div className={styles.mainSurveyButton}>
        <DefaultButton
          type="mainBorder"
          size="lg"
          borderRadius="lg"
          isBold={true}
          linkUrl={'/survey'}
        >
          AI 추천 문진 START!
        </DefaultButton>
      </div>
    </article>
  );
};

export default MainSurvey;
import * as styles from './MainReview.css';
import MainReviewSlider from "@/components/pages/main/mainReview/MainReviewSlider";
import MainText from "@/components/pages/main/mainText/MainText";
import DefaultButton from "@/components/common/defaultButton/DefaultButton";
import { useGetMainInfo } from "@/api/main/queries/useGetMainInfo";
import { MainBestReviewsDto } from "@/types";

const MainReview = () => {
  const { data: mainInfoData } = useGetMainInfo();
  const { queryBestReviewsDtoList: mainReviewData }: MainBestReviewsDto[] = mainInfoData;

  return (
    <article className={styles.mainReviewWrapper}>
      <MainText type='title' size='titleLg'>
        160,000마리<br/>
        보호자 리얼 리뷰!
      </MainText>
      <MainReviewSlider reviewData={mainReviewData} />
      <div className={styles.mainReviewButton}>
        <DefaultButton
          type="mainBorder"
          size="lg"
          borderRadius="lg"
          isBold={true}
          linkUrl={'/review'}
        >
          최근 리뷰 더 보기
        </DefaultButton>
      </div>
    </article>
  );
};

export default MainReview;
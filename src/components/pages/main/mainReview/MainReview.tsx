import * as styles from './MainReview.css';
import MainReviewSlider from "@/components/pages/main/mainReview/MainReviewSlider";
import MainText from "@/components/pages/main/mainText/MainText";
import DefaultButton from "@/components/common/defaultButton/DefaultButton";

export interface ReviewDataProps {
  id: number;
  titleByAdmin: string | null;
  contents: string;
  imageUrl: string;
  orderType: string;
  username: string;
  leakedOrder: number;
}

const MainReview = ({ reviewData }: { reviewData: ReviewDataProps[] }) => {
  return (
    <article className={styles.mainReviewWrapper}>
      <MainText type='title' size='titleLg'>
        160,000마리<br/>
        보호자 리얼 리뷰!
      </MainText>
      <MainReviewSlider reviewData={reviewData} />
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
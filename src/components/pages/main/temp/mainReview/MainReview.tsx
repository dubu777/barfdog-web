import * as styles from './MainReview.css';
import MainReviewSlider from "@/components/pages/main/temp/mainReview/MainReviewSlider";
import DefaultButton from "@/components/common/defaultButton/DefaultButton";
import Text from '@/components/common/text/Text';
import { useGetMainInfo } from "@/api/main/queries/useGetMainInfo";
import { MainBestReviewsDto } from "@/types";

const MainReview = () => {
  const { data: mainInfoData } = useGetMainInfo();
  const mainReviewData: MainBestReviewsDto[] = mainInfoData?.queryBestReviewsDtoList ?? [];

  return (
    <article className={styles.mainReviewWrapper}>
      <Text type='title' size='titleLg' weight='bold'>
        160,000마리<br/>
        보호자 리얼 리뷰!
      </Text>
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
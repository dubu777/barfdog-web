import * as styles from './ReviewList.css';
import ReviewItemList from "@/components/pages/reivew/reviewList/reviewItemList/ReviewItemList";
import BestReviewList from "@/components/pages/reivew/reviewList/bestReviewList/BestReviewList";
import ReviewBanner from "@/components/pages/reivew/reviewList/reviewBanner/ReviewBanner";
const ReviewList = () => {
  return (
    <section className={styles.reviewListContainer}>
      <BestReviewList />
      <ReviewBanner />
      <ReviewItemList />
    </section>
  );
};

export default ReviewList;
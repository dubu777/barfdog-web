'use client';
import * as styles from './ReviewSection.css';
import ReviewList from "@/components/pages/review/list/reviewList/ReviewList";
import BestReview from "@/components/pages/review/list/bestReview/BestReview";

export default function ReviewSection () {
  return (
    <section className={styles.reviewListContainer}>
      <BestReview />
      <ReviewList />
    </section>
  );
};
'use client';
import * as styles from './ReviewSection.css';
import ReviewList from "@/components/pages/review/list/reviewList/ReviewList";
import BestReview from "@/components/pages/review/list/bestReview/BestReview";
import Header from '@/components/layout/header/Header';

export default function ReviewSection () {
  return (
    <>
      <Header
        showBackButton
        centerTitle='리뷰'
      />
      <section className={styles.reviewListContainer}>
        <BestReview />
        <ReviewList />
      </section>
    </>
  );
};
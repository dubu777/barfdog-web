import * as styles from './ReviewItem.css';
import { ellipsis } from "@/styles/common.css";
import { reviewItem } from "@/components/pages/reivew/reviewList/reviewItemList/ReviewItemList.css";
import Image from "next/image";
import NoImage from "/public/images/icons/noImage.png";
import PictureIcon from '/public/images/icons/picture-icon.png';
import Accordion from "@/components/common/accordion/Accordion";
import Text from "@/components/common/text/Text";
import RateStar from "@/components/common/rateStar/RateStar";
import { ReviewImage, ReviewListItem } from "@/types";

interface ReviewItemProps {
  review: ReviewListItem;
  reviewImageList: ReviewImage[];
}

const ReviewDetailItem = ({ review, reviewImageList }: ReviewItemProps) => {
  return (
    <li>
      <Accordion
        buttonClassName={reviewItem({})}
        contentClassName={styles.reviewAccordionBox}
        title={
          <>
            <Text type='description' size='sm' color='grey'>
              {review.id}
            </Text>
            <p>
              <Image src={review.thumbnailUrl ? review.thumbnailUrl : NoImage} alt={`reviewImage-${review.id}`} width={50} height={50} />
            </p>
            <p>
              <RateStar rateLength={review.star} color='yellow' />
            </p>
            <Text type='description' size='sm' color='grey' align='left' className={styles.reviewTitle}>
              {reviewImageList.length > 0 &&
                <Image src={PictureIcon} alt='picture icon' width={16} height={16} />
              }
              <span className={ellipsis({ lineSize: 'line1', align: 'left' })}>{review.contents}</span>
            </Text>
            <Text type='description' size='sm' color='black' className={ellipsis({ lineSize: 'line1' })}>
              {review.username}
            </Text>
            <Text type='description' size='sm' color='grey'>
              {review.writtenDate}
            </Text>
          </>
        }
        showArrow={false}
      >
        <div className={styles.reviewContent}>
          <Text type='description' size='sm' align='left' color='grey'>
            {review.contents}
          </Text>
          {reviewImageList.length > 0 &&
            reviewImageList.map(image => (
              <Image key={image.filename} src={image.url} alt={image.filename} objectFit='contain' layout='fill' className={styles.reviewImage} />
            ))
          }
        </div>
      </Accordion>
    </li>
  );
};

export default ReviewDetailItem;
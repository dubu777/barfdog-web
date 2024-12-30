import * as styles from './ReviewBanner.css';
import Text from "@/components/common/text/Text";
import bannerLeft from "/public/images/review/banner_left.png";
import bannerRight from "/public/images/review/banner_right.png";
import Image from "next/image";
import Link from "next/link";
const ReviewBanner = () => {
  return (
    <Link href='/mypage/review' className={styles.reviewBannerContainer}>
      <Image src={bannerLeft} alt='bannerLeft' width={90} height={83} />
      <Text type='title' size='titleMd' color='white'>
        리뷰 작성시 적립금 <span className={styles.yellowPoint}>+3000원!</span>
      </Text>
      <Image src={bannerRight} alt='bannerRight' width={47} height={58} />
    </Link>
  );
};

export default ReviewBanner;
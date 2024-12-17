'use client';
import * as styles from "./MyPageHeader.css";
import BackButton from "/public/images/icons/left-arrow.svg";
import {useBackNavigation} from "@/utils";
import {usePathname} from "next/navigation";

const MyPageHeader = () => {
  const goBack = useBackNavigation();
  const pathname = usePathname();


  const pathTitles: { [key: string]: string } = {
    '/mypage/orderHistory': '주문내역',
    '/mypage/coupon': '쿠폰',
    '/mypage/reward': '적립금',
    '/mypage/manageCard': '카드관리',
    '/mypage/inviteFriends': '친구초대',
    '/mypage/review': '리뷰',
    '/mypage/subscribe': '구독 관리',
  };

  const getTitle = () => {
    if (pathTitles[pathname]) {
      return pathTitles[pathname];
    }
    if (pathname.includes('/mypage/orderHistory/')) {
      return '주문 상세';
    }
    if (pathname.includes('/mypage/subscribe/skipDelivery/')) {
      return '배송 미루기';
    }
    if (pathname.includes('/mypage/subscribe/address/')) {
      return '구독 배송지 관리';
    }
    if (pathname.includes('/mypage/subscribe/benefits/')) {
      return '패키지 혜택';
    }
    return '';
  };

  return (
    pathname !== '/mypage' &&
    <nav className={styles.myPageHeader}>
      <button className={styles.goBackButton} onClick={goBack}>
        <BackButton />
      </button>
      <h2 className={styles.title}>
        {getTitle()}
      </h2>
    </nav>
  );
};

export default MyPageHeader;
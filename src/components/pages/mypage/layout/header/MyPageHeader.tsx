'use client';
import * as styles from "./MyPageHeader.css";
import { commonLayoutStyle } from "@/styles/common.css";
import { useParams, usePathname } from "next/navigation";
import BackButton from "/public/images/icons/left-arrow.svg";
import Link from "next/link";
import Cart from "/public/images/icons/cart.svg";
import DefaultText from "@/components/common/defaultText/DefaultText";
import { useBackNavigation } from "@/utils";
import { useCartStore } from "@/store/useCartStore";

const MyPageHeader = () => {
  const goBack = useBackNavigation();
  const pathname = usePathname();
  const params = useParams();
  const { count } = useCartStore();

  const pathTitles: { [key: string]: string } = {
    '/mypage': '마이페이지',
    '/mypage/order-history': '주문내역',
    '/mypage/coupon': '쿠폰내역',
    '/mypage/reward': '적립금내역',
    '/mypage/manage-card': '카드관리',
    '/mypage/invite-friends': '친구초대',
    '/mypage/review': '리뷰작성내역',
    '/mypage/subscribe': '구독 관리',
    '/mypage/account': '계정 정보',
  };

  const getTitle = () => {
    if (pathTitles[pathname]) {
      return pathTitles[pathname];
    }
    if (pathname.includes('/mypage/order-history/')) {
      return '주문 상세';
    }
    if (pathname.includes('/mypage/subscription/delay-shipping/')) {
      return '배송 미루기';
    }
    if (pathname.includes('/mypage/subscribe/address/')) {
      return '구독 배송지 관리';
    }
    if (pathname.includes('/mypage/subscribe/benefits/')) {
      return '패키지 혜택';
    }
    if (pathname.includes('/mypage/review/create')) {
      return '리뷰 작성';
    }
    if (pathname.includes(`/mypage/review/${params.reviewId}`)) {
      return '리뷰 상세';
    }
    if (pathname.includes('/mypage/account/set-password')) {
      return '비밀번호 생성';
    }
    if (pathname.includes('/mypage/account/change-password')) {
      return '비밀번호 변경';
    }
    if (pathname.includes('/mypage/account/connected-sns')) {
      return '연동 SNS';
    }
    if (pathname.includes('/mypage/account/user-info')) {
      return '회원 정보 변경';
    }
    if (pathname.includes('/mypage/account/notification')) {
      return '알림 설정';
    }
    return '';
  };

  return (
    <nav className={`${commonLayoutStyle} ${styles.myPageHeader}`}>
      {pathname !== '/mypage' &&
        <button className={styles.goBackButton} onClick={goBack}>
          <BackButton />
        </button>
      }
      <DefaultText type='title4'>
        {getTitle()}
      </DefaultText>
      <Link href="/cart" className={styles.cartButton}>
        {count !== 0 && <div className={styles.cartCount}>{count}</div>}
        <Cart />
      </Link>
    </nav>
  );
};

export default MyPageHeader;
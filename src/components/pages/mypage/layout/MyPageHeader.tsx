'use client';
import { useMemo } from "react";
import {useParams, usePathname, useSearchParams} from "next/navigation";
import { useBackNavigation } from "@/utils";
import Header from "@/components/layout/header/Header";
import { getHeaderProps } from "@/utils/getHeaderProps";
import { useVerifyPassword } from "@/api/mypage/account/queries/useVerifyPassword";

type MypageParams = {
  reviewId?: string;
  subscriptionId?: string;
  authentication?: string;
};

export default function MyPageHeader() {
  const pathname = usePathname();
  const rawParams = useParams();
  const params = Object.fromEntries(
		Object.entries(rawParams).map(([key, value]) => [key, Array.isArray(value) ? value[0] : value])
	) as Record<string, string>;
  const searchParams = useSearchParams();
  const goBackToMypageMain = useBackNavigation('/mypage');

  const { data: needToInitialize } = useVerifyPassword();

  const headerConfigs: Record<
    string,
    {
      centerTitle?: string;
      leftTitle?: string;
      showCloseButton?: boolean;
      showBackButton?: boolean;
      showCartButton?: boolean;
      onClose?: () => void;
      onBack?: () => void
    }
    > = {
    '/mypage': { leftTitle: '마이페이지', showCartButton: true },
    '/mypage/promotion': { centerTitle: '프로모션', showBackButton: true },
    '/mypage/coupon': { centerTitle: '쿠폰내역', showBackButton: true },
    '/mypage/reward': { centerTitle: '적립금내역', showBackButton: true },
    '/mypage/invite-friends': { centerTitle: '친구 초대', showBackButton: true },
    '/mypage/account': { centerTitle: !needToInitialize ? '계정 정보' : '비밀번호 설정', showBackButton: true },
    '/mypage/account/user-info': { centerTitle: '회원정보 변경', showBackButton: true },
    '/mypage/account/change-password': { centerTitle: '비밀번호 변경', showBackButton: true },
    '/mypage/account/connected-sns': { centerTitle: 'SNS 연동정보', showBackButton: true },
    '/mypage/account/withdrawal-account': { centerTitle: '회원탈퇴안내', showBackButton: true },
    '/mypage/subscription': { centerTitle: '구독상품관리', showBackButton: true },
    '/mypage/review': { centerTitle: '나의 리뷰', showBackButton: true, onBack: goBackToMypageMain },
    '/mypage/review/create': { centerTitle: '리뷰 작성', showBackButton: true },
    '/mypage/orders': { centerTitle: '주문 및 배송조회', showBackButton: true, onBack: goBackToMypageMain },
  };

  const dynamicHeaderConfigs: Record<
    string,
    (params: MypageParams, searchParams: URLSearchParams) => {
      centerTitle?: string;
      leftTitle?: string;
      showBackButton?: boolean;
      showCartButton?: boolean;
      showCloseButton?: boolean;
      onClose?: () => void;
      onBack?: () => void
    }
    > = {
    '/mypage/review/': () => {
      return ({ 
        centerTitle: '리뷰 상세', 
        showBackButton: true,
      })
    },
    '/mypage/orders/': () => {
      return {
        centerTitle: '주문 상세',
        showBackButton: true,
      }
    },
    '/mypage/subscription/': () => {
      return {
        centerTitle: '구독 상세',
        showBackButton: true,
      };
    },
  };

  const headerProps = useMemo(() =>
    getHeaderProps({ pathname, params, searchParams, headerConfigs, dynamicHeaderConfigs })
    , [pathname, params, searchParams]);

  return (
    <Header
      {...headerProps}
    />
  );
};
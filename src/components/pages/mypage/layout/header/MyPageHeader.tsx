'use client';
import { useMemo } from "react";
import { useParams, usePathname, useSearchParams } from "next/navigation";
import { useBackNavigation } from "@/utils";
import { useDynamicQueryPush } from "@/hooks/useDynamicQueryPush";
import { ORDER_ISSUE_TYPE } from "@/constants/mypage";
import NewHeader from "@/components/layout/newHeader/NewHeader";

type MypageParams = {
  reviewId?: string;
  subscriptionId?: string;
  authentication?: string;
};

const MyPageHeader = () => {
  const pathname = usePathname();
  const params = useParams();
  const searchParams = useSearchParams();
  const { pushWithQuery } = useDynamicQueryPush();
  const goBack = useBackNavigation();
  const goBackToMain = useBackNavigation('/');

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
    '/mypage/coupon': { centerTitle: '쿠폰내역', showCartButton: true, showBackButton: true, onBack: goBack },
    '/mypage/reward': { centerTitle: '적립금내역', showCartButton: true, showBackButton: true, onBack: goBack },
    '/mypage/manage-card': { centerTitle: '카드관리' },
    '/mypage/invite-friends': { centerTitle: '친구초대' },
    '/mypage/subscription': { centerTitle: '구독상품관리', showCartButton: true, showBackButton: true, onBack: goBack },
    '/mypage/account': { centerTitle: '계정 정보', showCartButton: true, showBackButton: true, onBack: goBack },
    '/mypage/account/change-password': { centerTitle: '비밀번호 변경', showCartButton: true, showBackButton: true, onBack: goBack },
    '/mypage/account/user-info': { centerTitle: '회원 정보 변경', showCartButton: true, showBackButton: true, onBack: goBack },
    '/mypage/account/notification': { centerTitle: '알림 설정', showCartButton: true, showBackButton: true, onBack: goBack },
    '/mypage/review': { centerTitle: '리뷰작성내역', showCartButton: true, showBackButton: true, onBack: goBack },
    '/mypage/review/create': { leftTitle: '리뷰 작성', showBackButton: true, onBack: goBack },
    '/mypage/order-delivery-inquiry': { centerTitle: '주문 및 배송조회', showCartButton: true, showBackButton: true, onBack: goBack },
    '/mypage/order-issue-inquiry': { centerTitle: '취소/교환/반품 내역', showCartButton: true, showBackButton: true, onBack: goBack },
    // ------------------------------------------------------------------------
    '/mypage/subscribe/address/list': { centerTitle: '구독 배송지 관리', showBackButton: true, onBack: goBack },
    '/mypage/subscribe/benefits': { centerTitle: '패키지 혜택', showBackButton: true, onBack: goBack },
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
    '/mypage/review/': () => ({ leftTitle: '리뷰 상세', showBackButton: true, onBack: goBack }),
    '/mypage/order-delivery-inquiry/': (_, searchParams) => {
      const showReceipt = searchParams.get('showReceipt');
      return {
        centerTitle: !showReceipt ? '주문 상세' : '카드영수증',
        showBackButton: !showReceipt,
        onBack: goBack,
        showCloseButton: !!showReceipt,
        onClose: () => pushWithQuery(pathname, {}, ['showReceipt']),
      }
    },
    '/mypage/order-issue-inquiry/': (_, searchParams) => {
      const issueType = searchParams.get('issueType');
      const issueTypeName = ORDER_ISSUE_TYPE[issueType as keyof typeof ORDER_ISSUE_TYPE];

      return {
        centerTitle: `${issueTypeName} 상세보기`,
        showBackButton: true,
        onBack: goBack,
      }
    },
    '/mypage/account/connect-sns': (params) => ({
      centerTitle: params.authentication === 'authentication' ? '회원인증' : 'SNS 연동정보',
      showCartButton: params.authentication !== 'authentication',
      showBackButton: true,
      onBack: goBack,
    }),
    '/mypage/account/withdrawal-account': (_, searchParams) => {
      const step = searchParams.get('step');
      return {
        centerTitle: { reason: '회원탈퇴 사유입력', confirmation: '회원인증' }[step || ''] || '회원탈퇴안내',
        showBackButton: true,
        onBack: goBackToMain,
      };
    },
    '/mypage/subscription/': (_, searchParams) => {
      const lastSection = pathname.split('/').pop();
      const completedLastSection = lastSection === 'delay-shipping' && searchParams.get('status') === 'completed';
      return {
        centerTitle: {
          'delay-shipping': !completedLastSection ? '배송미루기' : ' ',
          'schedule': '전체구독일정',
          'cancel-subscription': '구독 해지 사유입력',
        }[lastSection as string] || '구독상세',
        showBackButton: (!completedLastSection && lastSection !== 'schedule'),
        showCloseButton: completedLastSection || lastSection === 'schedule',
        onBack: goBack,
        onClose: goBack,
      };
    },
  };

  const getHeaderProps = () => {
    if (headerConfigs[pathname]) return headerConfigs[pathname];

    for (const key in dynamicHeaderConfigs) {
      if (pathname.includes(key)) {
        return dynamicHeaderConfigs[key](params, searchParams);
      }
    }

    return { centerTitle: '' };
  };

  const headerProps = useMemo(getHeaderProps, [pathname, params, searchParams]);

  return (
    <NewHeader
      {...headerProps}
    />
  );
};

export default MyPageHeader;
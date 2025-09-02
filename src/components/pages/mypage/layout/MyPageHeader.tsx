'use client';
import { useMemo } from "react";
import { useParams, usePathname, useSearchParams } from "next/navigation";
import { useBackNavigation } from "@/utils";
import { useDynamicQueryPush } from "@/hooks/useDynamicQueryPush";
import { ORDER_ISSUE_TYPE } from "@/constants/mypage";
import Header from "@/components/layout/header/Header";
import AlertModal from "@/components/common/modal/alertModal/AlertModal";
import useModal from "@/hooks/useModal";
import { getHeaderProps } from "@/utils/getHeaderProps";

type MypageParams = {
  reviewId?: string;
  subscriptionId?: string;
  authentication?: string;
};

const MyPageHeader = () => {
  const pathname = usePathname();
  const rawParams = useParams();
  const params = Object.fromEntries(
		Object.entries(rawParams).map(([key, value]) => [key, Array.isArray(value) ? value[0] : value])
	) as Record<string, string>;
  const searchParams = useSearchParams();
  const { pushWithQuery } = useDynamicQueryPush();
  const goBack = useBackNavigation();
  const goBackToMain = useBackNavigation('/');
  const goBackToPreviousPage = useBackNavigation(undefined, true);
  const { isOpen: cancelChangeNoticeOpen, onClose: onCloseCancelChangeNoticeOpen, onToggle: onToggleCancelChangeNoticeOpen } = useModal();

  const lastSection = pathname.split('/').pop();

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
    '/mypage/reward': { centerTitle: '적립금내역', showBackButton: true, onBack: goBack },
    '/mypage/manage-card': { centerTitle: '카드관리' },
    '/mypage/invite-friends': { centerTitle: '친구 초대', showBackButton: true },
    '/mypage/subscription': { centerTitle: '구독상품관리', showCartButton: true, showBackButton: true, onBack: goBack },
    '/mypage/account': { centerTitle: '계정 정보', showCartButton: true, showBackButton: true, onBack: goBack },
    '/mypage/account/change-password': { centerTitle: '비밀번호 변경', showCartButton: true, showBackButton: true, onBack: goBack },
    '/mypage/account/user-info': { centerTitle: '회원 정보 변경', showCartButton: true, showBackButton: true, onBack: goBack },
    '/mypage/account/notification': { centerTitle: '알림 설정', showCartButton: true, showBackButton: true, onBack: goBack },
    '/mypage/review': { centerTitle: '리뷰작성내역', showCartButton: true, showBackButton: true, onBack: useBackNavigation('/mypage') },
    '/mypage/review/create': { centerTitle: '리뷰 작성', showBackButton: true, onBack: goBack },
    '/mypage/order-delivery-inquiry': { centerTitle: '주문 및 배송조회', showCartButton: true, showBackButton: true, onBack: goBack },
    '/mypage/order-issue-inquiry': { centerTitle: '취소/교환/반품 내역', showCartButton: true, showBackButton: true, onBack: goBack },
    '/mypage/billing-preferences': { centerTitle: '결제 수단/자동 적립금', showCartButton: true, showBackButton: true, onBack: goBack },
    '/mypage/auto-reward': { centerTitle: '자동 적립금 사용 관리', showCartButton: true, showBackButton: true, onBack: goBack },
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
    '/mypage/review/': () => ({ centerTitle: '리뷰 상세', showBackButton: true, onBack: goBackToPreviousPage }),
    '/mypage/order-delivery-inquiry/': (_, searchParams) => {
      const showReceipt = searchParams.get('showReceipt');
      return {
        centerTitle: !showReceipt ? '주문 상세' : '카드영수증',
        showBackButton: !showReceipt,
        onBack: goBackToPreviousPage,
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
      const step = lastSection === 'change-recipe' && searchParams.get('step') !== null;
      return {
        centerTitle: {
          'cancel-subscription': '구독 해지',
          'change-recipe': step ? ' ' :'식단 변경',
        }[lastSection as string] || '구독 상세',
        showBackButton: true,
        onBack: lastSection === 'change-recipe' && !step ? onToggleCancelChangeNoticeOpen : goBackToPreviousPage,
      };
    },
  };

  const headerProps = useMemo(() =>
    getHeaderProps({ pathname, params, searchParams, headerConfigs, dynamicHeaderConfigs })
    , [pathname, params, searchParams]);

  return (
    <>
    <Header
      {...headerProps}
    />
    {cancelChangeNoticeOpen &&
      <AlertModal
        title='구독 수정을 중단하시겠어요?'
        content='나가시면 수정해주신 정보는 저장되지 않아요.'
        isOpen={cancelChangeNoticeOpen}
        onClose={onCloseCancelChangeNoticeOpen}
        onCancel={onCloseCancelChangeNoticeOpen}
        onConfirm={goBackToPreviousPage}
        confirmText='나가기'
        cancelText='취소'
      />
    }
    </>
  );
};

export default MyPageHeader;
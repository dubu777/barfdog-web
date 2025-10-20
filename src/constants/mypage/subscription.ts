import { useRouter } from "next/navigation";

const VISIBLE_SUBSCRIPTION_STATUS = {
  SUBSCRIBING: "구독중",
  SUBSCRIBE_PENDING: "결제실패",
  SUBSCRIBE_CANCEL: "구독해지",
  SUBSCRIBE_WILL_CANCEL: "해지예정",
} as const;

const HIDDEN_SUBSCRIPTION_STATUS = {
  BEFORE_PAYMENT: "결제 전",
  SURVEY_COMPLETED: "설문 완료",
} as const;

const VISIBLE_SUBSCRIPTION_STATUS_LIST = Object.keys(VISIBLE_SUBSCRIPTION_STATUS);

const VISIBLE_SUBSCRIPTION_STATUS_CHIPS_COLOR = {
  SUBSCRIBING: "blue50",
  SUBSCRIBE_PENDING: "lightPink",
  SUBSCRIBE_CANCEL: "gray100",
  SUBSCRIBE_WILL_CANCEL: "gray100",
} as const;


const VISIBLE_SUBSCRIPTION_STATUS_ACTIONS = {
  SUBSCRIBING: {
    actions: [
      {
        label: "상세 정보 확인/변경",
        variants: "outline",
        intent:"assistive",
        onClick: (router: ReturnType<typeof useRouter>, subscriptionId: number) => {
          console.log("상세 정보 확인/변경", subscriptionId);
          router.push(`/mypage/subscription/${subscriptionId}`);
        },
      },
    ],
  },
  SUBSCRIBE_PENDING: {
    actions: [
      {
        label: "상세 정보 확인/변경",
        variants: "outline",
        intent:"assistive",
        onClick: (router: ReturnType<typeof useRouter>, subscriptionId: number) => {
          console.log("상세 정보 확인/변경", subscriptionId);
          router.push(`/mypage/subscription/${subscriptionId}`);
        },
      },
      {
        label: "다시 결제하기",
        variants: "solid",
        intent:"primary",
      },
    ],
  },
  SUBSCRIBE_CANCEL: {
    actions: [
      {
        label: "재구독하기",
        variants: "outline",
        intent:"primary",
      },
    ],
  },
  SUBSCRIBE_WILL_CANCEL: {
    actions: [
      {
        label: "구독 유지하기",
        variants: "outline",
        intent:"primary",
      },
    ],
  },
} as const;

export { 
  VISIBLE_SUBSCRIPTION_STATUS, 
  HIDDEN_SUBSCRIPTION_STATUS,
  VISIBLE_SUBSCRIPTION_STATUS_LIST,
  VISIBLE_SUBSCRIPTION_STATUS_CHIPS_COLOR,
  VISIBLE_SUBSCRIPTION_STATUS_ACTIONS,
};
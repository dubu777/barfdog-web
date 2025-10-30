import { toLabelValueList } from "@/utils/toLabelValueList";

const VISIBLE_SUBSCRIPTION_STATUS = {
  SUBSCRIBING: "구독중",
  SUBSCRIBE_PENDING: "결제실패",
  SUBSCRIBE_WILL_CANCEL: "해지예정",
  SUBSCRIBE_CANCEL: "구독해지",
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
      },
    ],
  },
  SUBSCRIBE_PENDING: {
    actions: [
      {
        label: "상세 정보 확인/변경",
        variants: "outline",
        intent:"assistive",
      },
      {
        label: "결제 수단 변경/재시도",
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

const SUBSCRIPTION_STATUS_STEPS = {
  SUBSCRIBING: 1,
  SUBSCRIBE_PENDING: 2,
  SUBSCRIBE_WILL_CANCEL: 3,
  SUBSCRIBE_CANCEL: 4,
} as const;

const FEEDBACK_REASON_MAP = {
  FEEDING_ISSUE: '아이가 잘 먹지 않아요',
  COMPLEX_FEEDING_METHOD: '급여 방식이 너무 번거로워요',
  WANT_SMALL_SAMPLE: '더 작은 용량의 샘플을 구매하고 싶어요',
  PACKAGE_INCONVENIENCE: '제품 패키징이 불편해요',
  UNKNOWN_FEEDING_METHOD: '급여 방법을 잘 모르겠어요',
  ETC: '기타',
} as const;

const FEEDBACK_REASON_LIST = toLabelValueList(FEEDBACK_REASON_MAP);

const CARD_COLORS: Record<string, string> = {
  삼성카드: "#1428A0",
  신한카드: "#342BFF",
  우리카드: "#0067AC",
  현대카드: "#000000",
  KB국민카드: "#ED9F17",
  롯데카드: "#272522",
  비씨카드: "#EA2844",
  하나카드: "#28876C",
  IBK기업은행카드: "#234899",
  농협은행카드: "#2E61B0",
  케이뱅크카드: "#0114A7",
  토스뱅크카드: "#0064FF",
  KG모빌리언스: "#3D186E",
  MG새마을금고: "#3D186E",
  네이버페이: "#3ADD4B",
  카카오페이: "#F4D643",
  우체국: "#DE2429",
  페이코: "#F11835",
  default: "#7C7C7C",
};

export { 
  VISIBLE_SUBSCRIPTION_STATUS, 
  HIDDEN_SUBSCRIPTION_STATUS,
  VISIBLE_SUBSCRIPTION_STATUS_LIST,
  VISIBLE_SUBSCRIPTION_STATUS_CHIPS_COLOR,
  VISIBLE_SUBSCRIPTION_STATUS_ACTIONS,
  SUBSCRIPTION_STATUS_STEPS,
  FEEDBACK_REASON_MAP,
  FEEDBACK_REASON_LIST,
  CARD_COLORS,
};
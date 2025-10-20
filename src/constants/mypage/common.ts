import {
  MenuList,
} from "@/types";
import { openChatChannelIO } from "@/utils/channelTalk";

const MENU_LIST: MenuList[] = [
  {
    category: "나의 쇼핑정보",
    menus: [
      { label: "구독 상품 관리", url: "/mypage/subscription" },
      { label: "주문 및 배송조회", url: "/mypage/orders" },
      { label: "자동 적립금 관리", url: "/mypage/auto-reward" },
      { label: "나의 리뷰", url: "/mypage/review" },
      { label: "프로모션", url: "/mypage/promotion" },
    ],
  },
  {
    category: "나의 회원정보",
    menus: [
      { label: "계정 정보", url: "/mypage/account" },
      { label: "반려견 정보", url: "/diet-analysis" },
      { label: "배송지 관리", url: "/mypage/delivery-address" },
      { label: "친구 초대", url: "/mypage/invite-friends" },
    ],
  },
  {
    category: "고객센터",
    menus: [
      { label: "공지사항", url: "/community/notice" },
      { label: "자주 묻는 질문", url: "/community/faq" },
      { label: "채팅 상담하기", action: () => openChatChannelIO() },
    ],
  },
  {
    category: "바프독",
    menus: [
      { label: "ABOUT US", url: "/about" },
      { label: "아티클", url: "/community/article" },
      { label: "전 성분 보기", url: "/recipes" },
    ],
  },
];

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
  "네이버페이 머니": "#3ADD4B",
  "카카오페이 머니": "#F4D643",
  우체국: "#DE2429",
  페이코: "#F11835",
  default: "#7C7C7C",
};

export {
  MENU_LIST,
  CARD_COLORS,
};

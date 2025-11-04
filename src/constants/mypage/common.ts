import { openChatChannelIO } from "@/utils/channelTalk";

const MENU_LIST = [
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

export {
  MENU_LIST,
};

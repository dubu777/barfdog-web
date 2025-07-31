"use client";

import Button from "@/components/common/button/Button";
import { usePersistOrderStore } from "@/store/order/usePersistOrderStore";
import { useRouter } from "next/navigation";
import * as styles from "./Test.css";
import { deleteCookie, getCookie } from "@/utils/auth/cookie";
import { AUTH_CONFIG } from "@/constants/auth";
import { useLogout } from "@/api/auth/mutations/useLogout";
import { ALLIANCE_COOKIE } from "@/constants/cookie";
import { isAuthenticated } from "@/utils/auth/isAuthenticated";

export default function GeneralShopTest() {
  const router = useRouter();
  const { setOrderItemDtoList } = usePersistOrderStore();
  const { mutate: logout } = useLogout();
  const token = getCookie(AUTH_CONFIG.ACCESS_TOKEN_COOKIE);
  const isLogin = isAuthenticated(token);
  console.log("isLogin", isLogin);

  const orderItemListData = [
    {
      itemId: 10,
      amount: 1,
      selectOptionDtoList: [
        // { itemOptionId: 18, amount: 1 },
        // { itemOptionId: 19, amount: 1 },
      ],
    },
  ];

  const generalPaymentTest = () => {
    console.log("일반상점테스트");
    setOrderItemDtoList(orderItemListData);
    window.location.href = "/order/checkout/general";
  };

  const handleLogout = () => {
    logout(undefined, {
      onSuccess: () => {
        deleteCookie(AUTH_CONFIG.ACCESS_TOKEN_COOKIE);
        deleteCookie(AUTH_CONFIG.REFRESH_TOKEN_COOKIE);
        deleteCookie(ALLIANCE_COOKIE);
        window.location.reload();
      },
      onError: (error) => {
        console.error("Logout error", error);
      },
    });
  };

  const handleSubscriptionOptions = async () => {
    router.push("/diet-analysis/subscribe?reportId=3769");
  };

  return (
    <div className={styles.testContainer}>
      <Button onClick={generalPaymentTest}>일반 상품 구매 테스트 버튼</Button>
      <Button onClick={handleSubscriptionOptions}>주문서 이동 버튼</Button>
      <Button onClick={handleLogout}>로그아웃 테스트</Button>
    </div>
  );
}

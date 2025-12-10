"use client";

import Button from "@/components/ui/button/Button";
import { usePersistOrderStore } from "@/store/checkout/usePersistOrderStore";
import { useRouter } from "next/navigation";
import * as styles from "./Test.css";
import { getCookie } from "@/utils/auth/cookie";
import { AUTH_CONFIG } from "@/constants/auth";
import { isAuthenticated } from "@/utils/auth/isAuthenticated";
import { authAxios } from "@/api/axiosInstance";
import { useGetAddressList } from "@/api/address/queries/useGetAddressList";
import { useGetGeneralCheckout } from "@/api/checkout/queries/useGetGeneralCheckout";

export default function GeneralShopTest() {
  const router = useRouter();
  const { setItemList } = usePersistOrderStore();
  const token = getCookie(AUTH_CONFIG.ACCESS_TOKEN_COOKIE);
  const { data } = useGetAddressList();
  const isLogin = isAuthenticated(token);
  console.log("isLogin", isLogin);
  console.log("address data", data);

  const itemList = [
    {
      itemId: 12,
      itemAmount: 1,
      itemOptionList: [{ optionId: 18, optionAmount: 1 }],
    },
  ];
  const { data: generalOrderData } = useGetGeneralCheckout({ itemList });
  console.log("generalOrderData", generalOrderData);

  const generalPaymentTest = () => {
    console.log("일반상점테스트");
    setItemList(itemList);
    window.location.href = "/checkout/general/order";
  };

  const handleSubscriptionOptions = async () => {
    router.push("/diet-analysis/subscribe?reportId=3769");
  };

  const handleRefresh = () => {
    authAxios.post("/api/v2/public/accounts/refresh").then((res) => {
      console.log("refresh res", res);
    });
  };
  return (
    <div className={styles.testContainer}>
      <Button onClick={generalPaymentTest}>일반 상품 구매 테스트 버튼</Button>
      <Button onClick={handleSubscriptionOptions}>주문서 이동 버튼</Button>
      <Button onClick={handleRefresh}>리프레시 버튼</Button>
    </div>
  );
}

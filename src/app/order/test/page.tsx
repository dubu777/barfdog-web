"use client";

import Button from "@/components/common/button/Button";
import { usePersistOrderStore } from "@/store/order/usePersistOrderStore";
import { useRouter } from "next/navigation";
import * as styles from "./Test.css";
import { deleteCookie, getCookie, setCookie } from "@/utils/cookie";
import { AUTH_CONFIG } from "@/constants/auth";
import axiosInstance, { authAxios } from "@/api/axiosInstance";

export default function GeneralShopTest() {
  const router = useRouter();
  const { setOrderItemDtoList, clearOrderItemDtoList } = usePersistOrderStore();

  const baseURL = process.env.NEXT_PUBLIC_API_URL_DEV;

  const orderItemListData = [
    {
      itemDto: {
        itemId: 10,
        amount: 2,
      },
      itemOptionDtoList: [],
    },
  ];

  const generalPaymentTest = () => {
    console.log("일반상점테스트");
    setOrderItemDtoList(orderItemListData);
    router.push("/order/order-sheet/general");
  };

  const handleGetCookie = () => {
    console.log(getCookie(AUTH_CONFIG.ACCESS_TOKEN_COOKIE));
  };
  const handleDeleteCookie = () => {
    deleteCookie(AUTH_CONFIG.ACCESS_TOKEN_COOKIE);
    console.log(getCookie(AUTH_CONFIG.ACCESS_TOKEN_COOKIE));
  };

  const handleRequest = async () => {
    // const response = await axiosInstance.get("/api/planDiscount");
    // console.log("API 응답:", response);
  };

  const handleTest = async () => {
    // 테스트용: 임의의 잘못된 토큰 설정
    const accessToken2 = getCookie(AUTH_CONFIG.ACCESS_TOKEN_COOKIE);
    setCookie(AUTH_CONFIG.ACCESS_TOKEN_COOKIE, 'wrongToken');
    console.log("현재 토큰:", accessToken2);

    try {
      // const accessToken1 = getCookie(AUTH_CONFIG.ACCESS_TOKEN_COOKIE);
      // console.log("현재 토큰:", accessToken1);
      // const { data } = await authAxios.get(`${baseURL}/api/refresh`);
      // setCookie(AUTH_CONFIG.ACCESS_TOKEN_COOKIE, data.accessToken);
      // console.log("토큰 재발급 결과:", data);

      const response = await axiosInstance.get('/api/planDiscount');
      const accessToken2 = getCookie(AUTH_CONFIG.ACCESS_TOKEN_COOKIE);
      console.log("변경 토큰:", accessToken2);
      console.log("API 응답:", response);
    } catch (error) {
      console.error("API 호출 중 에러 발생:", error);
    }
  };
  return (
    <div className={styles.testContainer}>
      <Button onClick={generalPaymentTest}>일반 상품 구매 테스트 버튼</Button>
      <Button onClick={handleGetCookie}>토큰 값 가져오기</Button>
      <Button onClick={handleDeleteCookie}>토큰 지우기</Button>
      <Button onClick={handleTest}>토큰 만료 후 재발급 테스트</Button>
      <Button onClick={handleRequest}>서버 요청 테스트</Button>
    </div>
  );
}

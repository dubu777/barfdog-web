"use client";

import Button from "@/components/common/button/Button";
import { usePersistOrderStore } from "@/store/order/usePersistOrderStore";
import { useRouter } from "next/navigation";
import * as styles from "./Test.css";
import { deleteCookie, getCookie, setCookie } from "@/utils/auth/cookie";
import { AUTH_CONFIG } from "@/constants/auth";
import axiosInstance, { authAxios } from "@/api/axiosInstance";
import { useLogout } from "@/api/auth/mutations/useLogout";
import useModal from "@/hooks/useModal";
import BottomSheet from "@/components/common/bottomSheet/BottomSheet";
import DefaultText from "@/components/common/defaultText/DefaultText";
import Modal from "@/components/common/modal/Modal";
import NextPaymentBottomSheet from "@/components/pages/order/common/bottomSheet/nextPaymentBottomSheet/NextPaymentBottomSheet";
import DeliveryScheduleBottomSheet from "@/components/pages/order/common/bottomSheet/deliveryScheduleBottomSheet/DeliveryScheduleBottomSheet";
import { ALLIANCE_COOKIE } from "@/constants/cookie";
import { useGetPlanDiscount } from "@/api/subscription/queries/useGetPlanDiscount";
import { isAuthenticated } from "@/utils/auth/isAuthenticated";

export default function GeneralShopTest() {
  const router = useRouter();
  const { setOrderItemDtoList, clearOrderItemDtoList } = usePersistOrderStore();
  const { mutate: logout } = useLogout();
  const {data: planData} = useGetPlanDiscount()
  const token = getCookie(AUTH_CONFIG.ACCESS_TOKEN_COOKIE)
  const isLogin = isAuthenticated(token)
  console.log('isLogin', isLogin);
  
  console.log(planData);
  
  const orderItemListData = [
    {
      itemId: 10,
      amount: 1,
      optionDtoList: [
        // { itemOptionId: 18, amount: 1 },
        // { itemOptionId: 19, amount: 1 },
      ],
    },
    // {
    //   itemDto: {
    //     itemId: 9,
    //     amount: 1,
    //   },
    //   itemOptionDtoList: [{ itemOptionId: 19, amount: 1 }],
    // },
  ];

  const generalPaymentTest = () => {
    console.log("일반상점테스트");
    setOrderItemDtoList(orderItemListData);
    // setOrderItemsCookie(orderItemListData);
    router.push("/order/checkout/general");
  };

  const handleRequest = async () => {
    try {
      const response = await axiosInstance.get("/api/planDiscount");
      console.log("API 응답:", response);
    } catch (err) {
      console.error(err);
    }
  };

  const handleWrongTokenRefreshTest = async () => {
    // 테스트용: 임의의 잘못된 토큰 설정
    const accessToken2 = getCookie(AUTH_CONFIG.ACCESS_TOKEN_COOKIE);
    setCookie(AUTH_CONFIG.ACCESS_TOKEN_COOKIE, "wrongToken");
    console.log("현재 토큰:", accessToken2);

    try {
      const response = await axiosInstance.get("/api/planDiscount");
      const accessToken2 = getCookie(AUTH_CONFIG.ACCESS_TOKEN_COOKIE);
      console.log("변경 토큰:", accessToken2);
      console.log("API 응답:", response);
    } catch (error) {
      console.error("API 호출 중 에러 발생:", error);
    }
  };

  const handleOldTokenRefreshTest = async () => {
    // 테스트용: 임의의 잘못된 토큰 설정
    const accessToken2 = getCookie(AUTH_CONFIG.ACCESS_TOKEN_COOKIE);
    setCookie(
      AUTH_CONFIG.ACCESS_TOKEN_COOKIE,
      "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzUxMiJ9.eyJzdWIiOiIxMCIsImlzcyI6ImJhcmZkb2ciLCJleHAiOjE3NDI0MzY4NzcsImVtYWlsIjoiZnJlc2hvdXJAbmF2ZXIuY29tIn0.7LS_2mJAm-8zAewwRWd71kxqrJ-vIXwvSyHoDAeZRRCCaOgc1IvofyUvPTCVW0ilG4nHbmQ5x38_vDDaUeNwrQ"
    );
    console.log("현재 토큰:", accessToken2);

    try {
      const response = await axiosInstance.get("/api/planDiscount");
      const accessToken2 = getCookie(AUTH_CONFIG.ACCESS_TOKEN_COOKIE);
      console.log("변경 토큰:", accessToken2);
      console.log("API 응답:", response);
    } catch (error) {
      console.error("API 호출 중 에러 발생:", error);
    }
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

  const handleRefresh = async () => {
    const { data } = await authAxios.get(`/api/refresh`);
    console.log("재발급 요청", data);
  };
  const {
    isOpen: isSheetOpen,
    onClose: onSheetClose,
    onToggle: onSheetToggle,
  } = useModal();
  const {
    isOpen: isModalOpen,
    onClose: onModalClose,
    onToggle: onModalToggle,
  } = useModal();
  const {
    isOpen: isNextPaymentBottomSheetOpen,
    onClose: onNextPaymentBottomSheetClose,
    onToggle: onNextPaymentBottomSheetToggle,
  } = useModal();
  const handleBottomSheet = async () => {
    // onSheetToggle();
    onNextPaymentBottomSheetToggle();
  };
  const handleModal = async () => {
    onModalToggle();
  };
  const handleCokBankCookieTest = async () => {
    setCookie(ALLIANCE_COOKIE, "cb")
  };
  const handleLogin = async () => {
    router.push('/login')
  };

  return (
    <div className={styles.testContainer}>
      <Button onClick={generalPaymentTest}>일반 상품 구매 테스트 버튼</Button>
      <Button onClick={handleCokBankCookieTest}>콕뱅크 쿠키 테스트</Button>

      {/* <Button onClick={handleWrongTokenRefreshTest}>
        잘못된 토큰으로 재발급 테스트
      </Button>
      <Button onClick={handleOldTokenRefreshTest}>
        만료된 토큰으로 재발급 테스트
      </Button> */}
      <Button onClick={handleRequest}>서버 요청 테스트</Button>
      <Button onClick={handleLogout}>로그아웃 테스트</Button>
      <Button onClick={handleLogin}>로그인</Button>
      {/* <Button onClick={handleRefresh}>재발급 테스트</Button>
      <Button onClick={handleBottomSheet}>Bottom Sheet 테스트</Button>
      <Button onClick={handleModal}>Modal 테스트</Button> */}
      <Modal
        title="모달 테스트"
        content="모달 테스트 중입니다"
        isOpen={isModalOpen}
        onClose={onModalClose}
        confirmText="확인"
      />
      <DeliveryScheduleBottomSheet
        isOpen={isNextPaymentBottomSheetOpen}
        onClose={onNextPaymentBottomSheetClose}
        deliveryDate="2025-04-12"
      />
      {/* <DefaultText type="title4">안녕</DefaultText>
      <DefaultText type="caption">안녕</DefaultText> */}
      {/* <NextPaymentBottomSheet
        isOpen={isNextPaymentBottomSheetOpen}
        onClose={onNextPaymentBottomSheetClose}
      /> */}
    </div>
  );
}

"use client";

import React from "react";
import { setCookie } from "@/utils/cookie";
import { AUTH_CONFIG } from "@/constants/auth";
import axiosInstance from "@/api/axiosInstance";
import Button from "@/components/common/button/Button";


export default function TestTokenRefresh() {
  const handleTest = async () => {
    // 테스트용: 임의의 잘못된 토큰 설정
    setCookie(AUTH_CONFIG.ACCESS_TOKEN_COOKIE, "invalid_or_expired_token");
    console.log("테스트용 잘못된 토큰 설정 완료");
    
    try {
      const response = await axiosInstance.get('/api/planDiscount');
      console.log("API 응답:", response);
    } catch (error) {
      console.error("API 호출 중 에러 발생:", error);
    }
  };

  return (
    <div>
      <Button type="primary" variant="solid" onClick={handleTest}>토큰 만료 테스트</Button>
    </div>
  );
}

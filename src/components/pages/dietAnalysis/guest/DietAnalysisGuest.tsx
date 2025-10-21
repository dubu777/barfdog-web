"use client";

import Text from "@/components/common/text/Text";
import { commonWrapper } from "@/styles/common.css";
import Button from "@/components/common/button/Button";
import { useRouter } from "next/navigation";
import Card from "@/components/common/card/Card";

export default function DietAnalysisGuest() {
  const router = useRouter();
  return (
    <div
      className={commonWrapper({
        direction: "col",
        padding: 20,
        backgroundColors: "gray50",
        justify: "start",
        height: "fullWithHeader",
      })}
    >
      <Card shadow="light" gap={40} padding={16}>
        <div>
          <Text type="title2" align="center">
            로그인하고
            <br />
            1:1 식단을 추천받아 보세요
          </Text>
          <Text type="body2" color="gray700" align="center">
            우리 아이 상태에 딱 맞는 식단을 알려드려요!
          </Text>
          <div
            style={{
              width: "300px",
              height: "300px",
              backgroundColor: "gray",
              marginTop: "20px",
            }}
          />
        </div>
        {/* 이미지 작업 미완료로 임시 div */}
        <Button
          size="lg"
          fullWidth
          onClick={() => router.push("/diet-analysis")}
        >
          로그인하고 식단 추천받기
        </Button>
      </Card>
    </div>
  );
}

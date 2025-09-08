"use client";

import Text from "@/components/common/text/Text";
import SvgIcon from "@/components/common/svgIcon/SvgIcon";
import { commonWrapper } from "@/styles/common.css";
import DogIcon from "public/images/dietAnalysis/first-dog.svg";
import Button from "@/components/common/button/Button";
import { useRouter } from "next/navigation";

export default function DietAnalysisGuest() {
  const router = useRouter();

  const handleGotoSurvey = () => {
    window.location.href = "/diet-analysis/survey"; // 펫 등록 api 완성 되면 펫 등록 쪽으로 이동
  };
  const handleGotoSheet = () => {
    router.push("/diet-analysis/subscribe?reportId=3752");
  };

  return (
    <div className={commonWrapper({ direction: "col", padding: 20, gap: 32 })}>
      <div className={commonWrapper({ gap: 12, direction: "col" })}>
        <div>
          <Text type="title2">바프독 AI가 추천하는</Text>
          <Text type="title2">우리 아이 맞춤 건강 식단</Text>
        </div>
        <Text type="body3" color="gray800">
          우리 아이 상태에 딱 맞는 식단을 알려드려요!
        </Text>
      </div>
      <SvgIcon src={DogIcon} width={175} height={140} />
      <Button
        buttonColor="gray900"
        size="lg"
        fullWidth
        onClick={handleGotoSurvey}
      >
        식단 추천받기
      </Button>
      <Button
        buttonColor="gray900"
        size="lg"
        fullWidth
        onClick={handleGotoSheet}
      >
        주문서 이동
      </Button>
    </div>
  );
}

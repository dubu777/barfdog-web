"use client";

import DefaultText from "@/components/common/defaultText/DefaultText";
import SvgIcon from "@/components/common/svgIcon/SvgIcon";
import { commonWrapper } from "@/styles/common.css";
import DogIcon from "public/images/dietAnalysis/first-dog.svg";
import * as styles from "./FirstTimeRegistration.css";
import Button from "@/components/common/button/Button";
import { useRouter } from "next/navigation";

export default function FirstTimeRegistration() {
  const router = useRouter();
  const handleGotoSurvey = () => {
    window.location.href = "/diet-analysis/survey";
  };
  const handleGotoSheet = () => {
    router.push("/diet-analysis/subscribe?reportId=3752");
  };

  return (
    <div className={styles.firstTimeRegistrationContainer}>
      <div className={commonWrapper({ gap: 12, direction: "col" })}>
        <div>
          <DefaultText type="title2">바프독 AI가 추천하는</DefaultText>
          <DefaultText type="title2">우리 아이 맞춤 건강 식단</DefaultText>
        </div>
        <DefaultText type="body3" color="gray800">
          우리 아이 상태에 딱 맞는 식단을 알려드려요!
        </DefaultText>
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

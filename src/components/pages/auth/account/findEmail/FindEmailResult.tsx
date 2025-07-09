"use client";
import * as styles from "../FindAccount.css";
import Text from "@/components/common/text/Text";
import DefaultButton from "@/components/common/defaultButton/DefaultButton";
import { useAuthStore } from "@/store/useAuthStore";
import { DefaultObjectType } from "@/types";
import { useRouter } from "next/navigation";
import Card from "@/components/common/card/Card";
import { commonWrapper } from "@/styles/common.css";
import DefaultText from "@/components/common/defaultText/DefaultText";
import Divider from "@/components/common/divider/Divider";
import ButtonDocked from "@/components/common/buttonDocked/ButtonDocked";
import CheckIcon from "public/images/survey/check_small.svg";
import SvgIcon from "@/components/common/svgIcon/SvgIcon";
import KakaoIcon from "public/images/social/kakao_logo.svg";
import NaverIcon from "public/images/social/naver_logo.svg";
const FindEmailResult = () => {
  const { tempEmailUserInfo } = useAuthStore();
  const router = useRouter();

  const providerValue = (() => {
    switch (tempEmailUserInfo.provider) {
      case "kakao":
        return <SvgIcon src={KakaoIcon} size={34} />;
      case "naver":
        return <SvgIcon src={NaverIcon} size={34} />;
      default:
        return "현재 연결된 SNS 계정이 없습니다.";
    }
  })();
  const result = [
    {
      id: "email",
      label: "가입된 이메일",
      value: tempEmailUserInfo.email,
    },
    {
      id: "provider",
      label: "연결된 SNS",
      value: providerValue,
    },
  ];
  const handleLogin = () => {
    router.push("/login");
  };
  return (
    <section className={styles.findAccountContainer}>
      {tempEmailUserInfo.email && (
        <Card shadow="light" align="start" padding={16} gap={12}>
          <DefaultText type="title4">아이디 내역</DefaultText>
          <Divider thickness={2} color="gray900" />
          <div className={commonWrapper({ direction: "col", gap: 8 })}>
            {result.map((item) => (
              <div
                className={commonWrapper({
                  justify: "start",
                })}
              >
                <DefaultText
                  type="body3"
                  color="gray700"
                  className={styles.findIdLabel}
                >
                  {item.label}
                </DefaultText>
                <DefaultText type="label2" color="gray800">
                  {item.value}
                </DefaultText>
              </div>
            ))}
          </div>
        </Card>
      )}
      <ButtonDocked
        type="full-button"
        primaryButtonLabel="로그인"
        onPrimaryClick={handleLogin}
        primaryButtonSize="lg"
      />
    </section>
  );
};

export default FindEmailResult;

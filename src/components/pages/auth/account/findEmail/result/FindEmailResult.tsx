"use client";
import * as styles from "../../FindAccount.css";
import Card from "@/components/common/card/Card";
import { commonWrapper } from "@/styles/common.css";
import Text from "@/components/common/text/Text";
import Divider from "@/components/common/divider/Divider";
import ButtonDocked from "@/components/common/buttonDocked/ButtonDocked";
import SvgIcon from "@/components/common/svgIcon/SvgIcon";
import KakaoIcon from "public/images/logo/auth/kakao-logo.svg";
import NaverIcon from "public/images/logo/auth/naver-logo.svg";

interface FindEmailResultProps {
  email: string;
  snsProvider: string | null;
}

export default function FindEmailResult({
  email,
  snsProvider,
}: FindEmailResultProps) {
  const providerValue = (() => {
    switch (snsProvider) {
      case "KAKAO":
        return <SvgIcon src={KakaoIcon} size={33} />;
      case "NAVER":
        return <SvgIcon src={NaverIcon} size={33} />;
      default:
        return "연결된 SNS 계정이 없습니다.";
    }
  })();
  const config = [
    {
      id: "email",
      label: "가입된 이메일",
      value: email,
    },
    {
      id: "provider",
      label: "연결된 SNS",
      value: providerValue,
    },
  ];
  return (
    <>
      <Card shadow="light" align="start" padding={16} gap={12}>
        <Text type="title4">아이디 찾기 결과</Text>
        <Divider thickness={2} color="gray900" />
        <div
          className={commonWrapper({
            direction: "col",
            gap: 8,
          })}
        >
          {config.map((item) => (
            <div
              key={item.id}
              className={commonWrapper({
                justify: "start",
                align: "start",
              })}
            >
              <Text type="body3" color="gray700" className={styles.findIdLabel}>
                {item.label}
              </Text>
              <Text type="body3" color="gray800">
                {item.value}
              </Text>
            </div>
          ))}
        </div>
      </Card>
    </>
  );
}

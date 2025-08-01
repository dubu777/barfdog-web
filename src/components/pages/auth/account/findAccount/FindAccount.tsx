"use client";

import TabBar, { Tab } from "@/components/common/tabBar/TabBar";
import FindEmail from "../findEmail/FindEmail";
import FindPassword from "../findPassword/FindPassword";
import { findAccountTabBarContainer } from "../FindAccount.css";
import Header from "@/components/layout/header/Header";
import { useSearchParams } from "next/navigation";
import FindEmailResult from "../findEmail/FindEmailResult";

export default function FindAccount() {
  const searchParams = useSearchParams();
  const type = searchParams.get("type");

  const tabs: Tab[] = [
    {
      label: "아이디찾기",
      content: type === "result" ? <FindEmailResult /> : <FindEmail />,
    },
    {
      label: "비밀번호 찾기",
      content: <FindPassword />,
    },
  ];

  return (
    <>
      <Header centerTitle="계정찾기" showBackButton />
      <TabBar
        hasTabContent
        tabs={tabs}
        variant="text"
        className={findAccountTabBarContainer}
      />
    </>
  );
}

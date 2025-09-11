"use client";

import TabBar, { Tab } from "@/components/common/tabBar/TabBar";
import FindEmail from "../findEmail/FindEmail";
import { findAccountTabBarContainer } from "../FindAccount.css";
import Header from "@/components/layout/header/Header";
import { useSearchParams } from "next/navigation";
import ResetPassword from "../resetPassword/ResetPassword";

export default function FindAccount() {
  const searchParams = useSearchParams();
  const type = searchParams.get("type");
  const defaultIndex = type === "password" ? 1 : 0;

  const tabs: Tab[] = [
    {
      label: "아이디찾기",
      content: <FindEmail />,
    },
    {
      label: "비밀번호 재설정",
      content: <ResetPassword />,
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
        defaultIndex={defaultIndex}
      />
    </>
  );
}

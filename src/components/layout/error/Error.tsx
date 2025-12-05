"use client";

import { commonWrapper } from "@/styles/common.css";
import EmptyImage from "/public/images/foodong/empty.svg";
import LogoIcon from "public/images/logo/logo.svg";
import Text from "@/components/ui/text/Text";
import Button from "@/components/ui/button/Button";
import { useRouter } from "next/navigation";
import Header from "@/components/layout/header/Header";
import Link from "next/link";

interface ErrorProps {
  showHeader?: boolean;
}

export default function Error({ showHeader = false }: ErrorProps) {
  const router = useRouter();
  return (
    <main>
      {showHeader && (
        <Header
          leftElement={
            <Link href="/" aria-label="홈">
              <LogoIcon />
            </Link>
          }
        />
      )}
      <section
        className={commonWrapper({
          minHeight: "fullWithHeader",
          backgroundColors: "gray50",
          direction: "col",
          gap: 12,
        })}
      >
        <EmptyImage />
        <div className={commonWrapper({ gap: 6, direction: "col" })}>
          <Text type="title2">댕...</Text>
          <Text type="body2" color="gray600" align="center">
            현재 데이터를 불러올 수 없습니다
            <br />
            나중에 다시 시도해 주세요
          </Text>
        </div>
        <div className={commonWrapper({ gap: 8 })}>
          <Button
            variant="outline"
            intent="assistive"
            size="sm"
            onClick={() => router.back()}
          >
            이전 페이지
          </Button>
          <Button
            variant="solid"
            intent="secondary"
            size="sm"
            onClick={() => router.push("/")}
          >
            메인 페이지
          </Button>
        </div>
      </section>
    </main>
  );
}

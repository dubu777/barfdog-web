"use client";

import Button from "@/components/common/button/Button";
import DefaultText from "@/components/common/defaultText/DefaultText";
import { commonWrapper } from "@/styles/common.css";
import { useRouter } from "next/navigation";
import DogIcon from "/public/images/healthNote/dogIcon.png";
import Image from "next/image";

export default function HealthNoteGuest() {
  const router = useRouter();

  return (
    <div
      className={commonWrapper({
        direction: "col",
        padding: 20,
      })}
    >
      <div
        className={commonWrapper({
          direction: "col",
          backgroundColors: "gray0",
          padding: 20,
          borderRadius: 12,
          gap: 20,
        })}
      >
        <div
          className={commonWrapper({
            direction: "col",
          })}
        >
          <DefaultText type="title2">반려견을 추가하고</DefaultText>
          <DefaultText type="title2">관련 워딩</DefaultText>
        </div>
        <Image
          src={DogIcon}
          height={180}
          width={180}
          priority
          alt="임시 이미지"
        />
        <Button
          buttonColor="gray900"
          fullWidth
          onClick={() => router.push("/health-note/dogs/create")}
        >
          로그인 하고 반려견 건강 관리하기
        </Button>
      </div>
    </div>
  );
}

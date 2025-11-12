"use client";
import { commonWrapper } from "@/styles/common.css";
import CreateDogCard from "@/components/pages/heathNote/common/createDogCard/CreateDogCard";

export default function HealthNoteGuest() {
  return (
    <div className={commonWrapper({ padding: 20 })}>
      <CreateDogCard buttonLabel="로그인하고 반려견 건강 관리하기" />
    </div>
  );
}

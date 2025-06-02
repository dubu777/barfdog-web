"use client";

import Button from "@/components/common/button/Button";
import { useRouter } from "next/navigation";

export default function HealthNoteGuest() {
  const router = useRouter();

  return (
    <article>
      <Button
        buttonColor="gray900"
        fullWidth
        onClick={() => router.push("/login")}
      >
        로그인 하고 반려견 건강 관리하기
      </Button>
    </article>
  );
}

"use client";

import Button from "@/components/common/button/Button";

export default function BodyCheckPage() {
  const handleButtonClick = () => {
    window.location.href = "/health-note/body-check/survey";
  };
  return (
    <main>
      <h1>부위별 진단 페이지</h1>
      <Button onClick={handleButtonClick}>위/장 진단</Button>
    </main>
  );
}

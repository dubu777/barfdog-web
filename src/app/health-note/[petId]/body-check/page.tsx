"use client";

import BodyCheckMain from "@/components/pages/heathNote/bodyCheck/main/BodyCheckMain";

interface BodyCheckPageProps {
  params: Promise<{
    petId: string;
  }>;
}

export default async function BodyCheckPage({ params }: BodyCheckPageProps) {
  const { petId } = await params;
  return (
    <main>
      <BodyCheckMain petId={Number(petId)} />
    </main>
  );
}

'use client';

import Header from "@/components/layout/header/Header";
import { useParams } from "next/navigation";

export default function StoreHeader() {
  const params = useParams();
  return (
    <Header
      showCartButton
      leftTitle={!params.itemId ? '스토어' : undefined}
      showBackButton={!!params.itemId}
    />
  );
}
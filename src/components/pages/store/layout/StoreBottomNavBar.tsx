'use client';

import BottomNavBar from "@/components/layout/bottomNavBar/BottomNavBar";
import { useParams } from "next/navigation";

export default function StoreBottomNavBar() {
  const params = useParams();
  if(params.itemId) return null;
  return (
    <BottomNavBar position="sticky" />
  );
}
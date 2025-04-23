import { ReactNode } from "react";
import Header from "@/components/layout/header/Header";

interface OrderLayoutProps {
  children: ReactNode;
}
export default function OrderLayout({ children }: OrderLayoutProps) {
  return (
    <>
        <Header showBackButton />
        {children}
    </>
  );
}

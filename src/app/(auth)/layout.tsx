import Header from "@/components/layout/header/Header";
import { ReactNode } from "react";

interface AuthLayoutProps {
  children: ReactNode;
}
export default function AuthLayout({ children }: AuthLayoutProps) {
  return (
    <>
      <Header showBackButton />
      {children}
    </>
  );
}

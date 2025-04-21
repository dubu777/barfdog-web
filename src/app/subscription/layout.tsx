import {ReactNode} from "react";
import Header from "@/components/layout/header/Header";

interface SubscriptionLayoutProps { 
  children: ReactNode
}
export default function SubscriptionLayout({children}: SubscriptionLayoutProps) {
  return (
    <>
      <Header
        showBackButton
      />
      {children}
    </>
  );
}
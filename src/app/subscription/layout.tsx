import {ReactNode} from "react";
import NewHeader from "@/components/layout/newHeader/NewHeader";

interface SubscriptionLayoutProps { 
  children: ReactNode
}
export default function SubscriptionLayout({children}: SubscriptionLayoutProps) {
  return (
    <>
      <NewHeader
        showBackButton
      />
      {children}
    </>
  );
}
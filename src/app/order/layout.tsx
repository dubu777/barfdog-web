import {ReactNode} from "react";
import NewHeader from "@/components/layout/newHeader/NewHeader";

interface OrderLayoutProps { 
  children: ReactNode
}
export default function OrderLayout({children}: OrderLayoutProps) {
  return (
    <>
      <NewHeader
        showBackButton
        centerTitle="결제"
      />
      {children}
    </>
  );
}
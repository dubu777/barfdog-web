import { ReactNode } from "react";
import NewHeader from "@/components/layout/newHeader/NewHeader";
import OrderNavigationGuard from "@/components/pages/order/common/orderNavigationGuard/OrderNavigationGuard";

interface OrderLayoutProps {
  children: ReactNode;
}
export default function OrderLayout({ children }: OrderLayoutProps) {
  return (
    <>
      <OrderNavigationGuard>{children}</OrderNavigationGuard>
    </>
  );
}

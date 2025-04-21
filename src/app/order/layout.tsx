import { ReactNode } from "react";
import NavigationGuard from "@/components/common/navigationGuard/NavigationGuard";

interface OrderLayoutProps {
  children: ReactNode;
}
export default function OrderLayout({ children }: OrderLayoutProps) {
  return (
    <>
      <NavigationGuard
        modalTitle="주문 취소"
        modalContent="주문을 취소하고 나가시겠어요?"
        confirmText="네"
        cancelText="아니요"
      >
        {children}
      </NavigationGuard>
    </>
  );
}

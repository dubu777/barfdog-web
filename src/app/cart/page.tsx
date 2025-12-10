import { ErrorBoundary } from "react-error-boundary";
import Cart from "@/components/pages/cart/Cart";
import Error from "@/components/layout/error/Error";
import Header from "@/components/layout/header/Header";

export default async function CartPage() {
  return (
    <ErrorBoundary fallback={<Error />}>
      <Header showBackButton centerTitle="장바구니" />
      <Cart />
    </ErrorBoundary>
  );
}

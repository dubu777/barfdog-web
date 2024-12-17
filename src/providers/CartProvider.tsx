'use client';
import { ReactNode, useEffect } from "react";
import { useCartStore } from "@/store/useCartStore";
import { useGetCartInfo } from "@/api/cart/queries/useGetCartInfo";

const CartProvider = ({ children }: { children: ReactNode }) => {
  const { setCartInfo } = useCartStore();
  const { data: cartInfo } = useGetCartInfo();

  useEffect(() => {
    if (cartInfo) {
      setCartInfo(cartInfo);
    }
  }, [cartInfo, setCartInfo]);
  
  return (
    <>{children}</>
  );
};

export default CartProvider;
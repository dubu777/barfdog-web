'use client';
import { ReactNode, useEffect } from "react";
import { useCartStore } from "@/store/useCartStore";
import { useGetCart } from "@/api/queries/useGetCart";

const CartProvider = ({ children }: { children: ReactNode }) => {
  const { setCartData } = useCartStore();
  const { data: cartData } = useGetCart();

  useEffect(() => {
    if (cartData) {
      setCartData(cartData);
    }
  }, [cartData, setCartData]);
  
  return (
    <>{children}</>
  );
};

export default CartProvider;
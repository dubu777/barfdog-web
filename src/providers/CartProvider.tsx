'use client';
import axiosInstance from "@/api/axiosInstance";
import { ReactNode, useEffect } from "react";
import { useCartStore } from "@/store/useCartStore";

const CartProvider = ({ children }: { children: ReactNode }) => {
  const { setCartData } = useCartStore();

  useEffect(() => {
    const fetchCartData = async () => {
      try {
        const cartResponse = await axiosInstance.get('/api/baskets');
        setCartData(cartResponse.data);
      } catch (error) {
        console.error('Failed to fetch cart data:', error);
      }
    };
    fetchCartData();
  }, [setCartData]);

  return (
    <>
      {children}
    </>
  );
};

export default CartProvider;
"use client";

import Link from "next/link";
import CartIcon from "/public/images/header/cart.svg";
import SvgIcon from "@/components/ui/svgIcon/SvgIcon";
import { useGetCartInfo } from "@/api/cart/queries/useGetCartInfo";
import * as styles from "./CartButton.css";

export default function CartButton() {
  const { data: cartInfo } = useGetCartInfo();
  const count =
    (cartInfo?.orderableItemList?.length || 0) +
    (cartInfo?.soldOutItemList?.length || 0);

  return (
    <Link href="/cart" className={styles.cartButton}>
      {count !== 0 && <div className={styles.cartCount}>{count}</div>}
      <SvgIcon src={CartIcon} size={24} color="gray900" />
    </Link>
  );
}

'use client';
import { useEffect } from "react";
import * as styles from './ItemDetail.css';
import ItemHero from "@/components/pages/store/storeDetail/itemHero/ItemHero";
import ItemPurchase from "@/components/pages/store/storeDetail/itemPurchase/ItemPurchase";
import ItemContent from "@/components/pages/store/storeDetail/itemContent/ItemContent";
import { useGetStoreItemDetail } from "@/api/store/queries/useGetStoreItemDetail";
import { useStoreItemStore } from "@/store/useStoreItemStore";

interface ItemDetailProps {
  itemId: number;
}

const ItemDetail = ({ itemId }: ItemDetailProps) => {
  const { setItemPrice } = useStoreItemStore();
  const { data: itemDetail } = useGetStoreItemDetail(itemId);
  const originalPrice = itemDetail.itemDto?.originalPrice;
  const salePrice = itemDetail.itemDto?.salePrice;

  useEffect(() => {
    setItemPrice(originalPrice === salePrice ? originalPrice : salePrice);
  }, [originalPrice, salePrice, setItemPrice]);
  
  return (
    <section className={styles.itemDetailContainer}>
      <ItemHero itemDetail={itemDetail} />
      <ItemPurchase />
      <ItemContent itemDetail={itemDetail} />
    </section>
  );
};

export default ItemDetail;
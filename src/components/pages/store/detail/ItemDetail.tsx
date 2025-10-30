'use client';
import { useEffect } from "react";
import Divider from "@/components/ui/divider/Divider";
import ButtonDocked from "@/components/ui/buttonDocked/ButtonDocked";
import ItemTopInfo from "@/components/pages/store/detail/itemTopInfo/ItemTopInfo";
import ItemCategoryTab from "./itemCategoryTab/ItemCategoryTab";
import ItemPurchaseBottomSheet from "./itemPurchaseBottomSheet/ItemPurchaseBottomSheet";
import useModal from "@/hooks/useModal";
import { useStoreItemStore } from "@/store/useStoreItemStore";
import { useGetStoreItemDetail } from "@/api/store/queries/useGetStoreItemDetail";
import { parseItemTags } from "@/utils/store/parseItemTags";

interface ItemDetailProps {
  itemId: number;
}

export default function ItemDetail({ 
  itemId 
}: ItemDetailProps) {
  const { setItemPrice, setDiscountRate, discountRate } = useStoreItemStore();
  const { data } = useGetStoreItemDetail(itemId);
  const itemInfo = data?.itemInfo;
  const { originalPrice, salePrice, inStock, itemIcons } = itemInfo ?? {};

  const { isOpen, onClose, onToggle } = useModal();

  useEffect(() => {
    setItemPrice(originalPrice === salePrice ? originalPrice : salePrice);
    setDiscountRate(originalPrice, salePrice);
  }, [originalPrice, salePrice, setItemPrice, setDiscountRate]);

  if(!data) return null;

  return (
    <section>
      <ItemTopInfo
        name={itemInfo.name}
        originalPrice={itemInfo.originalPrice}
        salePrice={itemInfo.salePrice}
        deliveryFree={itemInfo.deliveryFree}
        imageList={data.itemImageList}
        reviewInfo={data.reviewSummary}
        deliveryInfo={data.freeDeliveryCondition}
        discountRate={discountRate}
        tagList={parseItemTags(itemIcons)}
      />
      <Divider thickness={8} color='gray100' />
      <ItemCategoryTab
        itemId={itemInfo.id}
        reviewCount={data.reviewSummary.count}
        contents={itemInfo.contents}
        description={itemInfo.description}
      />
      <ButtonDocked 
        type='full-button' 
        primaryButtonLabel={inStock ? '구매하기' : '품절'}
        position='sticky'
        onPrimaryClick={onToggle}
        isPrimaryDisabled={!inStock}
      />
      {isOpen && 
        <ItemPurchaseBottomSheet
          id={itemInfo.id}
          name={itemInfo.name}
          salePrice={itemInfo.salePrice}
          originalPrice={itemInfo.originalPrice}
          itemOptionList={data.itemOptionList}
          isOpen={isOpen}
          onClose={onClose}
        />
      }
    </section>
  );
};
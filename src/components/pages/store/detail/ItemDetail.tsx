'use client';
import { useEffect } from "react";
import Divider from "@/components/common/divider/Divider";
import ButtonDocked from "@/components/common/buttonDocked/ButtonDocked";
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
  const itemInfo = data?.itemDto;
  const { originalPrice, salePrice, inStock, itemIcons } = itemInfo ?? {};

  const { isOpen, onClose, onToggle } = useModal();

  useEffect(() => {
    setItemPrice(originalPrice === salePrice ? originalPrice : salePrice);
    setDiscountRate(originalPrice, salePrice);
  }, [originalPrice, salePrice, setItemPrice, setDiscountRate]);

  console.log(data);
  
  if(!data) return null;
  return (
    <section>
      <ItemTopInfo 
        data={{
          name: itemInfo.name,
          originalPrice: itemInfo.originalPrice,
          salePrice: itemInfo.salePrice,
          discountType: itemInfo.discountType,
          deliveryFree: itemInfo.deliveryFree,
          imageList: data.itemImageDtoList,
          reviewInfo: data.reviewDto,
          deliveryInfo: data.deliveryCondDto,
          discountRate: discountRate,
          tagList: parseItemTags(itemIcons),
        }}
      />
      <Divider thickness={8} color='gray100' />
      <ItemCategoryTab
        data={{
          itemId: data.itemDto.id,
          contents: data.itemDto.contents,
          description: data.itemDto.description,
          reviewCount: data.reviewDto.count,
        }}
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
          data={{
            id: data.itemDto.id,
            name: data.itemDto.name,
            salePrice: data.itemDto.salePrice,
            originalPrice: data.itemDto.originalPrice,
            itemOptionList: data.itemOptionDtoList,
          }}
          isOpen={isOpen}
          onClose={onClose}
        />
      }
    </section>
  );
};
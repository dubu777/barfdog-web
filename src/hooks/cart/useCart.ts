import { useCartStore } from "@/store/useCartStore";
import { useDeleteCartItems } from "@/api/cart/mutations/useDeleteCartItems";
import { useDebouncedCallback } from "use-debounce";
import { useUpdateCartItemQuantity } from "@/api/cart/mutations/useUpdateCartItemQuantity";

export function useCart() {
  const { cartInfo, selectedItems, setSelectedItems, updateItemAmount } =
    useCartStore();

  const { mutate: updateQuantity } = useUpdateCartItemQuantity();
  const { mutate: deleteMutate } = useDeleteCartItems();

  const debouncedUpdateQuantity = useDebouncedCallback(
    (basketId: number, amount: number) => {
      updateQuantity({ basketId, amount });
    },
    500
  );

  const isSelectedAll =
    selectedItems?.length === cartInfo?.orderableItemList?.length;

  const handleItemSelect = (basketId: number) => {
    setSelectedItems(
      selectedItems.includes(basketId)
        ? selectedItems.filter((id) => id !== basketId)
        : [...selectedItems, basketId]
    );
  };

  const handleSelectAll = () => {
    if (selectedItems.length === cartInfo?.orderableItemList?.length) {
      setSelectedItems([]);
    } else {
      const allItemIds =
        cartInfo?.orderableItemList?.map((item) => item.basketId) || [];
      setSelectedItems(allItemIds);
    }
  };

  const handleUpdateItemQuantity = (basketId: number, value: number) => {
    // 즉시 UI 업데이트 (반응성 유지)
    updateItemAmount(basketId, value);

    // API 호출은 디바운스 (500ms) - value(최종 수량)를 그대로 전달
    debouncedUpdateQuantity(basketId, value);
  };

  const handleDeleteItem = (basketId: number) => {
    deleteMutate([basketId]);
  };

  const handleDeleteSelectedItems = () => {
    deleteMutate(selectedItems);
  };

  return {
    isSelectedAll,
    handleItemSelect,
    handleSelectAll,
    handleUpdateItemQuantity,
    handleDeleteItem,
    handleDeleteSelectedItems,
  };
}

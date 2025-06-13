import { CartInfo } from "@/types";
import { useCartStore } from "@/store/useCartStore";
import { useDecreaseItemQuantity, useIncreaseItemQuantity } from "@/api/cart/mutations/useUpdateItemQuantity";
import { useDeleteCartItemById } from "@/api/cart/mutations/useDeleteCartItem";

export function useCart() {
	const {
		cartInfo,
		setCartInfo,
		selectedItems,
		setSelectedItems,
		updateItemAmount,
		updateItemOptionAmount,
	} = useCartStore();

	const { mutate: increaseItem } = useIncreaseItemQuantity();
	const { mutate: decreaseItem } = useDecreaseItemQuantity();
	const { mutate: deleteMutate } = useDeleteCartItemById();

	const isSelectedAll = selectedItems?.length === cartInfo?.basketDtoList?.length;

	const handleItemSelect = (basketId: number) => {
		setSelectedItems(
			selectedItems.includes(basketId)
				? selectedItems.filter((id) => id !== basketId)
				: [...selectedItems, basketId]
		);
	}

	const handleSelectAll = () => {
		if (selectedItems.length === cartInfo?.basketDtoList.length) {
			setSelectedItems([]);
		} else {
			const allBasketIds = cartInfo?.basketDtoList.map((item) => item.itemDto.basketId);
			setSelectedItems(allBasketIds as number[]);
		}
	}

	const handleItemAmountChange = (basketId: number, value: number, type: 'increase' | 'decrease') => {
		updateItemAmount(basketId, value);
		const mutateFn = type === 'increase' ? increaseItem : decreaseItem;

		mutateFn({ basketId: basketId }, {
			onSuccess: () => {
				console.log(`${type} 성공!!`)
			},
			onError: (error) => {
				console.log('error', error)
			},
		})
	}

	const handleItemOptionAmountChange = (basketId: number, optionId: number, value: number) => {
		updateItemOptionAmount(basketId, optionId, value)
	}

	// 선택 삭제하는 deleteCartItemByIds 400error 이슈로 개별 삭제 순차적으로 적용
	const handleDeleteItemById = async (itemId: number) => {
		await deleteMutate(
			{ itemId: itemId },
			{
				onSuccess: () => {
					console.log('itemId delete');
				}
			}
		)
	}

	const handleDeleteSelectedItems = async () => {
		for (const itemId of selectedItems) {
			await handleDeleteItemById(itemId);
		}
		const updatedBasketDtoList = cartInfo?.basketDtoList.filter((item) => !selectedItems.includes(item.itemDto.basketId));
		const updatedCartInfo = { ...cartInfo, basketDtoList: updatedBasketDtoList };
		setCartInfo(updatedCartInfo as CartInfo);
		setSelectedItems([]);
	}

	return {
		isSelectedAll,
		handleItemSelect,
		handleSelectAll,
		handleItemAmountChange,
		handleItemOptionAmountChange,
		handleDeleteItemById,
		handleDeleteSelectedItems,
	};
}
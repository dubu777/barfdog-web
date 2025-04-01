'use client';
import * as styles from './Cart.css';
import Text from "@/components/common/text/Text";
import DefaultCheckbox from "@/components/common/defaultCheckbox/DefaultCheckbox";
import DefaultButton from "@/components/common/defaultButton/DefaultButton";
import CartItem from "@/components/pages/cart/cartItem/CartItem";
import CartPriceInfo from "@/components/pages/cart/cartPriceInfo/CartPriceInfo";
import { useCartStore } from "@/store/useCartStore";
import { useDeleteCartItemById } from "@/api/cart/mutations/useDeleteCartItem";

const Cart = () => {
  const { cartInfo, setCartInfo, selectedItems, setSelectedItems } = useCartStore();
  const { mutate: deleteMutate } = useDeleteCartItemById();

  // 선택 삭제하는 deleteCartItemByIds 400error 이슈로 개별 삭제 순차적으로 적용
  const deleteItemById = async (itemId: number) => {
    await deleteMutate(
      { itemId: itemId },
      {
      onSuccess: () => {
          console.log('itemId delete');
        }
      }
    )
  }

  if (!cartInfo || cartInfo.basketDtoList.length === 0) return <p>Loading...</p>;
  const isSelectedAllChecked = selectedItems.length === cartInfo.basketDtoList.length;

  const handleItemSelect = (basketId: number) => {
    setSelectedItems(
      selectedItems.includes(basketId)
        ? selectedItems.filter((id) => id !== basketId)
        : [...selectedItems, basketId]
    );
  }

  const handleSelectAll = () => {
    if (selectedItems.length === cartInfo.basketDtoList.length) {
      setSelectedItems([]);
    } else {
      const allBasketIds = cartInfo.basketDtoList.map((item) => item.itemDto.basketId);
      setSelectedItems(allBasketIds);
    }
  }

  const handleDeleteSelected = async () => {
    for (const itemId of selectedItems) {
      await deleteItemById(itemId);
    }
    const updatedBasketDtoList = cartInfo.basketDtoList.filter((item) => !selectedItems.includes(item.itemDto.basketId));
    const updatedCartInfo = { ...cartInfo, basketDtoList: updatedBasketDtoList };
    setCartInfo(updatedCartInfo);
    setSelectedItems([]);
  }

  return (
    <section className={styles.cartContainer}>
      <Text className={styles.cartTitle} type='title' size='titleLg'>장바구니</Text>
      <article>
        <div className={styles.cartItemControls}>
          <DefaultCheckbox
            id='all'
            name='all'
            value={isSelectedAllChecked}
            onChange={handleSelectAll}
            labelPosition='right'
            label='전체 선택'
          />
          <DefaultButton
            type='mainBorder'
            size='xs'
            borderRadius='sm'
            onClick={handleDeleteSelected}
            isDisabled={selectedItems.length === 0}
          >
            선택 삭제
          </DefaultButton>
        </div>
        <ul className={styles.cartItemList}>
          {cartInfo.basketDtoList.map(basketItem => (
            <CartItem
              key={basketItem.itemDto.basketId}
              item={basketItem.itemDto}
              options={basketItem.itemOptionDtoList}
              totalPrice={basketItem.totalPrice}
              isSelected={selectedItems.includes(basketItem.itemDto.basketId)}
              onSelect={() => handleItemSelect(basketItem.itemDto.basketId)}
            />
          ))}
        </ul>
      </article>
      <CartPriceInfo />
      <DefaultButton
        type='main'
        borderRadius='sm'
        size='lg'
        isDisabled={selectedItems.length < 1}
      >
        총 {selectedItems.length}건 주문하기
      </DefaultButton>
    </section>
  );
};

export default Cart;
'use client';
import * as styles from './Cart.css';
import Text from "@/components/common/text/Text";
import DefaultCheckbox from "@/components/common/defaultCheckbox/DefaultCheckbox";
import DefaultButton from "@/components/common/defaultButton/DefaultButton";
import CartItem from "@/components/pages/cart/cartItem/CartItem";
import CartPriceInfo from "@/components/pages/cart/cartPriceInfo/CartPriceInfo";
import { useCartStore } from "@/store/useCartStore";

const Cart = () => {
  const { cartData, setCartData, selectedItems, setSelectedItems } = useCartStore();

  if (!cartData || cartData.basketDtoList.length === 0) return <p>Loading...</p>;
  const isSelectedAllChecked = selectedItems.length === cartData.basketDtoList.length;

  const handleItemSelect = (basketId: number) => {
    setSelectedItems(
      selectedItems.includes(basketId)
        ? selectedItems.filter((id) => id !== basketId)
        : [...selectedItems, basketId]
    );
  }

  const handleSelectAll = () => {
    if (selectedItems.length === cartData.basketDtoList.length) {
      setSelectedItems([]);
    } else {
      const allBasketIds = cartData.basketDtoList.map((item) => item.itemDto.basketId);
      setSelectedItems(allBasketIds);
    }
  }

  const handleDeleteSelected = () => {
    const updatedBasketDtoList = cartData.basketDtoList.filter((item) => !selectedItems.includes(item.itemDto.basketId));
    const updatedCartData = { ...cartData, basketDtoList: updatedBasketDtoList };
    setCartData(updatedCartData);
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
          {cartData.basketDtoList.map(basketItem => (
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
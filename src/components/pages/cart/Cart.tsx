'use client';
import { Fragment, useEffect } from "react";
import * as styles from './Cart.css';
import LabeledCheckbox from "@/components/common/labeledCheckBox/LabeledCheckBox";
import DefaultText from "@/components/common/defaultText/DefaultText";
import Divider from "@/components/common/divider/Divider";
import ButtonDocked from "@/components/common/buttonDocked/ButtonDocked";
import Loader from "@/components/common/loader/Loader";
import CartItem from "@/components/pages/cart/cartItem/CartItem";
import CartPriceInfo from "@/components/pages/cart/cartPriceInfo/CartPriceInfo";
import { useCartStore } from "@/store/useCartStore";
import { useGetCartInfo } from "@/api/cart/queries/useGetCartInfo";
import { useCart } from "@/hooks/cart/useCart";
import useModal from "@/hooks/useModal";
import AlertModal from "@/components/common/modal/alertModal/AlertModal";

const Cart = () => {
  const { data: cartData } = useGetCartInfo();
  const { cartInfo, setCartInfo, selectedItems, calculatedPrices } = useCartStore();
  const { totalOrderPrice } = calculatedPrices;

  const { handleDeleteSelectedItems, handleItemSelect, handleSelectAll, isSelectedAll } = useCart();

  const { isOpen: isOpenSoldOutModal, onClose: onCloseSoldOutModal, onToggle: onToggleSoldOutModal } = useModal();
  const isSoldOut = true;

  useEffect(() => {
    if(cartData) {
      setCartInfo(cartData);
    }
  }, [cartData])

  const handleSubmit = () => {
    console.log('주문하기')
  }

  if (!cartData) return <Loader fullscreen />;
  return (
    <>
      <section className={styles.cartContainer}>
        <article className={styles.cartItemControls}>
          <LabeledCheckbox
            value={isSelectedAll}
            isChecked={isSelectedAll}
            onToggle={handleSelectAll}
            iconType='circle'
          >
            <DefaultText type='label2'>
              전체 선택 ({selectedItems.length}/{cartInfo?.basketDtoList.length})
            </DefaultText>
          </LabeledCheckbox>
          <button onClick={handleDeleteSelectedItems} disabled={selectedItems.length === 0} className={styles.deleteButton}>
            <DefaultText type='body3' color='gray700'>상품삭제</DefaultText>
          </button>
        </article>
        <Divider thickness={8} color='gray50' />
        <article className={styles.cartListBox}>
          <div className={styles.cartItemList}>
            {cartInfo?.basketDtoList?.map((item, index) => (
              <Fragment key={item.itemDto.basketId}>
                <div key={item.itemDto.basketId}>
                  <CartItem
                    key={item.itemDto.basketId}
                    item={item.itemDto}
                    options={item.itemOptionDtoList}
                    isSelected={selectedItems.includes(item.itemDto.basketId)}
                    onSelect={() => handleItemSelect(item.itemDto.basketId)}
                  />
                </div>
                {index + 1 !== cartInfo?.basketDtoList.length &&
                <Divider thickness={1} color='gray200' />
                }
              </Fragment>
            ))}
          </div>
        </article>
        <Divider thickness={8} color='gray50' />
        <CartPriceInfo />
        <ButtonDocked
          type='full-button'
          primaryButtonLabel={`${totalOrderPrice.toLocaleString()}원 주문하기`}
          onPrimaryClick={isSoldOut ? onToggleSoldOutModal : handleSubmit}
          isPrimaryDisabled={selectedItems.length < 1}
          primaryButtonVariant='solid'
          primaryCount={selectedItems.length}
        />
      </section>
      {isOpenSoldOutModal &&
        <AlertModal
          title='품절 상품은 제외하고 결제돼요'
          content='추가상품이 품절되어 제외하고 결제됩니다'
          isOpen={isOpenSoldOutModal}
          onClose={onCloseSoldOutModal}
          confirmText='결제하기'
          cancelText='취소'
          onConfirm={handleSubmit}
        />
      }
    </>
  );
};

export default Cart;
'use client';
import * as styles from './Cart.css';
import { Fragment, useEffect, useRef } from "react";
import LabeledCheckbox from "@/components/common/labeledCheckBox/LabeledCheckBox";
import DefaultText from "@/components/common/defaultText/DefaultText";
import Divider from "@/components/common/divider/Divider";
import ButtonDocked from "@/components/common/buttonDocked/ButtonDocked";
import Spinner from "@/components/common/spinner/Spinner";
import CartItem from "@/components/pages/cart/cartItem/CartItem";
import CartPriceInfo from "@/components/pages/cart/cartPriceInfo/CartPriceInfo";
import { useCartStore } from "@/store/useCartStore";
import { useCart } from "@/hooks/cart/useCart";
import { useGetCartInfo } from "@/api/cart/queries/useGetCartInfo";
import { useUpdateCartInfo } from "@/api/cart/mutations/useUpdateCartInfo";

// 옵션 삭제, 품절 기능 적용 필요
export default function Cart() {
  const { data: cartData } = useGetCartInfo();
  const { cartInfo, setCartInfo, selectedItems, calculatedPrices } = useCartStore();
  const { totalOrderPrice } = calculatedPrices;

  const { handleDeleteSelectedItems, handleItemSelect, handleSelectAll, isSelectedAll } = useCart();

  const isSoldOut = false;

  const { mutate } = useUpdateCartInfo({ retry: false });
  const effectRan = useRef(false);

  useEffect(() => {
    // StrictMode 환경에서 useEffect 두 번 실행되는 문제 방지용 플래그
    if (effectRan.current) return;

    // 로컬스토리지에 저장된 대기중인 장바구니 아이템 불러오기
    const pending = localStorage.getItem('pendingCartItem');
    if (pending) {
      mutate({ body: JSON.parse(pending) });
      // 중복 실행 방지를 위해 로컬스토리지에서 대기 아이템 삭제
      localStorage.removeItem('pendingCartItem');
    }

    // 플래그 설정으로 다음 호출부터는 실행하지 않도록 함
    effectRan.current = true;
  }, []);

  useEffect(() => {
    // 서버에서 불러온 장바구니 데이터 store 반영
    if(cartData) {
      setCartInfo(cartData);
    }
  }, [cartData])

  const handleSubmit = () => {
    console.log('주문하기')
  }

  if (!cartData) return <Spinner fullscreen />;
  return (
    <section className={styles.cartContainer}>
      <article className={styles.cartItemControls}>
        <LabeledCheckbox
          value={isSelectedAll}
          isChecked={isSelectedAll}
          onToggle={handleSelectAll}
        >
          <DefaultText type='label2'>
            전체 선택 ({selectedItems.length}/{cartInfo?.basketDtoList.length})
          </DefaultText>
        </LabeledCheckbox>
        <button onClick={handleDeleteSelectedItems} disabled={selectedItems.length === 0} className={styles.deleteButton}>
          <DefaultText type='body3' color='gray700'>선택삭제</DefaultText>
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
      {isSoldOut && (
        <>
          <article>
            <div className={styles.cartSoldOutTitle}>
              <DefaultText type='headline2'>품절/구매불가</DefaultText>
              <DefaultText type='body3' color='gray700'>해당 상품에 포함된 추가 상품도 구매가 불가능해요.</DefaultText>
            </div>
            <div className={styles.cartListBox}>
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
                        isSoldOut
                      />
                    </div>
                    {index + 1 !== cartInfo?.basketDtoList.length &&
                    <Divider thickness={1} color='gray200' />
                    }
                  </Fragment>
                ))}
              </div>
            </div>
          </article>
          <Divider thickness={8} color='gray50' />
        </>
      )}
      <CartPriceInfo />
      <ButtonDocked
        type='full-button'
        primaryButtonLabel={`${totalOrderPrice.toLocaleString()}원 주문하기`}
        onPrimaryClick={handleSubmit}
        isPrimaryDisabled={selectedItems.length < 1}
        primaryButtonVariant='solid'
        primaryCount={selectedItems.length}
      />
    </section>
  );
};
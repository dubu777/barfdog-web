"use client";
import { commonWrapper } from "@/styles/common.css";
import { Fragment, useEffect } from "react";
import LabeledCheckbox from "@/components/ui/labeledCheckBox/LabeledCheckBox";
import Text from "@/components/ui/text/Text";
import Divider from "@/components/ui/divider/Divider";
import ButtonDocked from "@/components/ui/buttonDocked/ButtonDocked";
import Spinner from "@/components/ui/spinner/Spinner";
import ListDivider from "@/components/ui/listDivider/ListDivider";
import CartItem from "@/components/pages/cart/cartItem/CartItem";
import CartPriceInfo from "@/components/pages/cart/cartPriceInfo/CartPriceInfo";
import { useCartStore } from "@/store/useCartStore";
import { useCart } from "@/hooks/cart/useCart";
import { useGetCartInfo } from "@/api/cart/queries/useGetCartInfo";
import EmptyList from "@/components/ui/emptyList/EmptyList";
import { useRouter } from "next/navigation";

export default function Cart() {
  const router = useRouter();
  const { data: cartData } = useGetCartInfo();
  const { cartInfo, setCartInfo, selectedItems, calculatedPrices } =
    useCartStore();
  const { totalOrderPrice } = calculatedPrices;

  const {
    handleDeleteSelectedItems,
    handleItemSelect,
    handleSelectAll,
    isSelectedAll,
  } = useCart();

  useEffect(() => {
    if (cartData) setCartInfo(cartData);
  }, [cartData]);

  const handleSubmit = () => {
    console.log("주문하기");
  };

  if (!cartData || !cartInfo) return <Spinner fullscreen />;

  const availableItems =
    cartInfo.orderableItemList || cartData.orderableItemList || [];
  const soldOutItems =
    cartInfo.soldOutItemList || cartData.soldOutItemList || [];
  const hasSoldOutItems = soldOutItems.length > 0;

  return (
    <>
      {availableItems.length > 0 || soldOutItems.length > 0 ? (
        <section
          className={commonWrapper({
            direction: "col",
            align: "start",
            justify: "start",
            minHeight: "fullWithHeader",
            paddingBottom: 85,
          })}
        >
          <article
            className={commonWrapper({
              justify: "between",
              paddingX: 20,
              paddingBottom: 16,
            })}
          >
            <LabeledCheckbox
              value={isSelectedAll}
              isChecked={isSelectedAll}
              onToggle={handleSelectAll}
            >
              <Text type="label2">
                전체 선택 ({selectedItems.length}/{availableItems.length})
              </Text>
            </LabeledCheckbox>
            <button
              onClick={handleDeleteSelectedItems}
              disabled={selectedItems.length === 0}
              className={commonWrapper({ justify: "end", align: "center" })}
            >
              <Text type="body3" color="gray700">
                선택삭제
              </Text>
            </button>
          </article>
          <Divider height={1} color="gray200" />
          <Divider height={8} color="gray50" />
          <article className={commonWrapper({ paddingX: 20, paddingY: 24 })}>
            <div
              className={commonWrapper({
                direction: "col",
                align: "start",
                gap: 24,
              })}
            >
              {availableItems.map((item, index) => (
                <Fragment key={item.basketId}>
                  <CartItem
                    item={item}
                    isSelected={selectedItems.includes(item.basketId)}
                    onSelect={() => handleItemSelect(item.basketId)}
                  />
                  <ListDivider
                    listLength={availableItems.length}
                    index={index}
                    color="gray200"
                  />
                </Fragment>
              ))}
            </div>
          </article>
          <Divider height={8} color="gray50" />
          {hasSoldOutItems && (
            <article
              className={commonWrapper({ direction: "col", align: "start" })}
            >
              <div
                className={commonWrapper({
                  direction: "col",
                  align: "start",
                  gap: 4,
                  paddingX: 20,
                  paddingTop: 24,
                })}
              >
                <Text type="headline2">품절/구매불가</Text>
                <Text type="body3" color="gray700">
                  해당 상품에 포함된 추가 상품도 구매가 불가능해요.
                </Text>
              </div>
              <div className={commonWrapper({ paddingX: 20, paddingY: 24 })}>
                <div
                  className={commonWrapper({
                    direction: "col",
                    align: "start",
                    gap: 24,
                  })}
                >
                  {soldOutItems.map((item, index) => (
                    <Fragment key={item.basketId}>
                      <CartItem
                        item={item}
                        isSelected={false}
                        onSelect={() => {}}
                        isSoldOut
                      />
                      <ListDivider
                        listLength={soldOutItems.length}
                        index={index}
                        color="gray200"
                      />
                    </Fragment>
                  ))}
                </div>
              </div>
              <Divider height={8} color="gray50" />
            </article>
          )}
          <CartPriceInfo />
          <ButtonDocked
            type="full-button"
            primaryButtonLabel={`${totalOrderPrice.toLocaleString()}원 주문하기`}
            onPrimaryClick={handleSubmit}
            isPrimaryDisabled={selectedItems.length < 1}
            primaryButtonVariant="solid"
            primaryCount={selectedItems.length}
          />
        </section>
      ) : (
        <div
          className={commonWrapper({
            minHeight: "fullWithHeader",
            backgroundColors: "gray50",
            align: "center",
          })}
        >
          <EmptyList
            title="장바구니에 담은 상품이 없어요"
            primaryButtonText="상품 둘러보기"
            onPrimaryClick={() => router.push("/store")}
          />
        </div>
      )}
    </>
  );
}

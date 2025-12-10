"use client";

import { commonWrapper } from "@/styles/common.css";
import * as styles from "./CartItem.css";
import CloseIcon from "/public/images/header/close.svg";
import InfoIcon from "/public/images/icons/info-fill.svg";
import Text from "@/components/ui/text/Text";
import SvgIcon from "@/components/ui/svgIcon/SvgIcon";
import Card from "@/components/ui/card/Card";
import Chips from "@/components/ui/chips/Chips";
import LabeledCheckbox from "@/components/ui/labeledCheckBox/LabeledCheckBox";
import { CartItemDto } from "@/types/cart";
import { useCart } from "@/hooks/cart/useCart";
import Divider from "@/components/ui/divider/Divider";
import CartItemContent from "@/components/pages/cart/cartItem/cartItemContent/CartItemContent";

interface CartItemProps {
  item: CartItemDto;
  isSelected: boolean;
  onSelect: () => void;
  isSoldOut?: boolean;
}

export default function CartItem({
  item,
  isSelected,
  onSelect,
  isSoldOut = false,
}: CartItemProps) {
  const { handleUpdateItemQuantity, handleDeleteItem } = useCart();

  return !isSoldOut ? (
    <LabeledCheckbox
      value={isSelected}
      isChecked={isSelected}
      onToggle={onSelect}
      iconClick
      direction="col"
      className={styles.cartItemBox}
    >
      <button
        onClick={() => handleDeleteItem(item.basketId)}
        className={styles.deleteButton}
      >
        <SvgIcon src={CloseIcon} size={20} color="gray500" />
      </button>
      <CartItemContent
        item={item}
        isSoldOut={isSoldOut}
        onUpdateQuantity={handleUpdateItemQuantity}
      />
      {item.itemOptionList && item.itemOptionList.length > 0 && (
        <div
          className={commonWrapper({
            direction: "col",
            align: "start",
            gap: 12,
          })}
        >
          {item.itemOptionList.map((option) => {
            const isOptionSoldOut = option.isSoldOut;
            const optionUnitPrice = option.totalOriginalPrice / option.amount;

            return (
              <Card
                key={option.optionId}
                shadow="none"
                backgroundColor="gray100"
                direction="col"
                gap={8}
                padding={12}
                align="start"
                justify="start"
              >
                <div className={styles.cartItemOptionBox({ isOptionSoldOut })}>
                  <Chips variant="outlined" color="gray700">
                    {isOptionSoldOut ? "품절" : "추가"}상품
                  </Chips>
                  <Text type="body3">{option.name}</Text>
                </div>
                <div className={styles.dividerWrapper({ height: 27 })}>
                  {isOptionSoldOut ? (
                    <Text type="headline1" color="red">
                      Sold Out
                    </Text>
                  ) : (
                    <>
                      <Text type="headline1">
                        {optionUnitPrice.toLocaleString()}원
                      </Text>
                      <Divider
                        direction="vertical"
                        height={50}
                        color="gray300"
                      />
                      <Text type="body3">수량 {option.amount}개</Text>
                    </>
                  )}
                </div>
              </Card>
            );
          })}
        </div>
      )}
    </LabeledCheckbox>
  ) : (
    <div className={styles.cartItemBox}>
      <div className={commonWrapper({ justify: "between" })}>
        <SvgIcon src={InfoIcon} size={18} color="gray700" />
        <button onClick={() => handleDeleteItem(item.basketId)}>
          <SvgIcon src={CloseIcon} size={20} color="gray500" />
        </button>
      </div>
      <CartItemContent
        item={item}
        isSoldOut={isSoldOut}
        onUpdateQuantity={handleUpdateItemQuantity}
      />
    </div>
  );
}

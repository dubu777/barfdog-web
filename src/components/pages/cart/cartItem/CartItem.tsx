import * as styles from './CartItem.css';
import Image from "next/image";
import CloseIcon from "/public/images/header/close.svg";
import Counter from "@/components/common/counter/Counter";
import DefaultText from "@/components/common/defaultText/DefaultText";
import SvgIcon from "@/components/common/svgIcon/SvgIcon";
import Card from "@/components/common/card/Card";
import Chips from "@/components/common/chips/Chips";
import LabeledCheckbox from "@/components/common/labeledCheckBox/LabeledCheckBox";
import { CartItemDto, CartItemOptionDto } from "@/types/cart";
import { useCart } from "@/hooks/cart/useCart";

interface CartItemProps {
  item: CartItemDto;
  options: CartItemOptionDto[];
  isSelected: boolean;
  onSelect: () => void;
}

const CartItem = ({ item, options, isSelected, onSelect }: CartItemProps) => {
  const { handleItemAmountChange, handleItemOptionAmountChange, handleDeleteItemById } = useCart();

  return (
    <LabeledCheckbox
      value={isSelected}
      isChecked={isSelected}
      onToggle={onSelect}
      iconType='circle'
      iconClick
    >
      <div className={styles.cartItem}>
        <div className={styles.cartItemInfoWrapper}>
          <Image src={item.thumbnailUrl} alt={item.name} width={88} height={88} className={styles.cartItemImage} />
          <div className={styles.cartItemInfo}>
            <div className={styles.cartItemInfoTop}>
              <div className={styles.cartItemContent}>
                <div>
                  <DefaultText type='label2' color='gray700'>{item.name}</DefaultText>
                  <DefaultText type='body3' color='gray600' block>구매 수량 {item.amount}</DefaultText>
                </div>
                <DefaultText type='headline2' color='gray800'>{item.salePrice.toLocaleString()}원</DefaultText>
              </div>
              <button onClick={() => handleDeleteItemById(item.basketId)}><SvgIcon src={CloseIcon} size={20} color='gray500' /></button>
            </div>
            <Counter
              min={1}
              initialCount={item.amount}
              onChange={(value, type) => handleItemAmountChange(item.basketId, value, type)}
              className={styles.cartItemCounter}
            />
          </div>
        </div>
        {options.length > 0 &&
        options.map(option => (
          <Card
            key={option.id}
            shadow='none'
            backgroundColor='gray100'
            direction='row'
            gap={8}
            padding={12}
            align='start'
            justify='start'
          >
            <Chips variant='outlined' color='gray700'>추가상품</Chips>
            <div className={styles.cartItemInfo}>
              <div className={styles.cartItemInfoTop}>
                <div className={styles.cartItemContent}>
                  <DefaultText type='body3' color='gray700'>{option.name}</DefaultText>
                  <DefaultText type='label3' color='gray800'>{option.optionPrice.toLocaleString()}원</DefaultText>
                </div>
                <button><SvgIcon src={CloseIcon} size={20} color='gray500' /></button>
              </div>
              <Counter
                min={1}
                initialCount={option.amount}
                onChange={(value) => handleItemOptionAmountChange(item.basketId, option.id, value)}
                className={styles.cartItemCounter}
              />
            </div>
          </Card>
        ))
        }
      </div>
    </LabeledCheckbox>
  );
};

export default CartItem;
import * as styles from './CartItem.css';
import Image from "next/image";
import Text from "@/components/common/text/Text";
import Counter from "@/components/common/counter/Counter";
import DefaultCheckbox from "@/components/common/defaultCheckbox/DefaultCheckbox";
import { useCartStore } from "@/store/useCartStore";
import { CartItemDto, CartItemOptionDto } from "@/types/cart";

interface CartItemProps {
  item: CartItemDto;
  options: CartItemOptionDto[];
  totalPrice: number;
  isSelected: boolean;
  onSelect: () => void;
}

const CartItem = ({ item, options, totalPrice, isSelected, onSelect }: CartItemProps) => {
  const samePrice = item.salePrice === item.originalPrice;
  const { updateItemAmount}  = useCartStore();

  return (
    <li className={styles.cartItem} key={item.itemId}>
      <DefaultCheckbox
        id='all'
        name='all'
        value={isSelected}
        onChange={onSelect}
      />
      <div className={styles.itemInfoBox}>
        <div className={styles.itemInfo}>
          <Image src={item.thumbnailUrl} alt={item.name} width={60} height={60} />
          <div className={styles.itemInfoText}>
            <p>{item.name}</p>
            <p>
              <b>{item.salePrice.toLocaleString()}원</b>
              {!samePrice &&
                <span className={styles.originalPrice}>{item.originalPrice}원</span>
              }
            </p>
            {options.length > 0 &&
              options.map(option => (
                <Text key={option.id} type='description' size='xs' color='grey'>
                  {option.name} ({option.optionPrice.toLocaleString()}원) / {option.amount}개 / {option.optionPrice.toLocaleString()}원
                </Text>
              ))
            }
          </div>
        </div>
        <Counter
          min={1}
          initialCount={item.amount}
          onChange={(value) => {
            const diff = value - item.amount;
            updateItemAmount(item.basketId, value);
          }}
        />
      </div>
      <Text className={styles.totalPrice} type='title' size='titleMd' weight='bold' color='black'>{totalPrice.toLocaleString()}원</Text>
    </li>
  );
};

export default CartItem;
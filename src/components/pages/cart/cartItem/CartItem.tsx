import * as styles from './CartItem.css';
import CloseButton from '/public/images/icons/close-black.png';
import Image from "next/image";
import Text from "@/components/common/text/Text";
import Counter from "@/components/common/counter/Counter";
import DefaultCheckbox from "@/components/common/defaultCheckbox/DefaultCheckbox";
import { useCartStore } from "@/store/useCartStore";
import { CartItemDto, CartItemOptionDto } from "@/types/cart";
import { useDecreaseItemQuantity, useIncreaseItemQuantity } from "@/api/cart/mutations/useUpdateItemQuantity";
import { useDeleteCartItemById } from "@/api/cart/mutations/useDeleteCartItem";

interface CartItemProps {
  item: CartItemDto;
  options: CartItemOptionDto[];
  totalPrice: number;
  isSelected: boolean;
  onSelect: () => void;
}

const CartItem = ({ item, options, totalPrice, isSelected, onSelect }: CartItemProps) => {
  const samePrice = item.salePrice === item.originalPrice;
  const { updateItemAmount }  = useCartStore();
  const { mutate: increaseMutate } = useIncreaseItemQuantity(item.basketId);
  const { mutate: decreaseMutate } = useDecreaseItemQuantity(item.basketId);
  const { mutate: deleteMutate } = useDeleteCartItemById();

  const handleUpdateItemQuantity = (value: number, type: 'increase' | 'decrease') => {
    updateItemAmount(item.basketId, value);
    console.log(type)
    const mutateFn = type === 'increase' ? increaseMutate : decreaseMutate;

    mutateFn(undefined, {
      onSuccess: () => {
        console.log(`${type} 성공!!`)
      },
      onError: (error) => {
        console.log('error', error)
      },
    })
  }

  const handleDeleteItem = () => {
    deleteMutate(
      { itemId: item.basketId },
      {
        onSuccess: () => {
          console.log('delete 성공!!')
        }
      }
    )
  }
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
          onChange={(value, type) => handleUpdateItemQuantity(value, type)}
        />
      </div>
      <div className={styles.totalPriceBox}>
        <button onClick={handleDeleteItem} className={styles.closeBtn}>
          <Image src={CloseButton} alt='close button' width={10} height={10} />
        </button>
        <Text type='title' size='titleMd' weight='bold'>{totalPrice.toLocaleString()}원</Text>
      </div>
    </li>
  );
};

export default CartItem;
import * as styles from './ItemPurchase.css';
import DefaultButton from "@/components/common/defaultButton/DefaultButton";
import {useUpdateCartInfo} from "@/api/cart/mutations/useUpdateCartInfo";
import {useStoreItemStore} from "@/store/useStoreItemStore";
import {UpdateCartInfo} from "@/types";
import {useToastStore} from "@/store/useToastStore";

interface ItemPurchaseProps {
  itemId: number;
}

const ItemPurchase = ({ itemId }: ItemPurchaseProps) => {
  const { mutate } = useUpdateCartInfo();
  const { itemAmount, selectedOptions, resetStore } = useStoreItemStore();

  const { addToast } = useToastStore();
  const optionDtoList = selectedOptions.map(option => ({ optionId: option.value, optionAmount: option.count }));

  const body = {
    itemId,
    itemAmount,
    optionDtoList
  };
  const handleAddToCart = () => {
    // 로그인 여부 확인 및 적용 필요
    mutate(
      { body: body as UpdateCartInfo }, {
        onSuccess: () => {
          addToast('장바구니에 추가되었습니다!', 'success');
          resetStore();
        }
      }
    )
  }
  return (
    <div className={styles.itemPurchaseContainer}>
      <DefaultButton onClick={handleAddToCart} type='mainBorder' size='lg' borderRadius='sm'>
        장바구니
      </DefaultButton>
      <DefaultButton type='main' size='lg' borderRadius='sm'>
        구매하기
      </DefaultButton>
    </div>
  );
};

export default ItemPurchase;
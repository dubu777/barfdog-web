import * as styles from './ItemPurchase.css';
import DefaultButton from "@/components/common/defaultButton/DefaultButton";

const ItemPurchase = () => {
  return (
    <div className={styles.itemPurchaseContainer}>
      <DefaultButton type='mainBorder' size='lg' borderRadius='sm'>
        장바구니
      </DefaultButton>
      <DefaultButton type='main' size='lg' borderRadius='sm'>
        구매하기
      </DefaultButton>
    </div>
  );
};

export default ItemPurchase;
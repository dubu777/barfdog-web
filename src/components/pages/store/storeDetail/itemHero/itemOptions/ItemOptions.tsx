import * as styles from './ItemOptions.css';
import * as heroStyles from '../ItemHero.css';
import { ellipsis } from "@/styles/common.css";
import Image from "next/image";
import CloseButton from '/public/images/icons/close-black.png';
import Counter from "@/components/common/counter/Counter";
import SelectBox from "@/components/common/selectBox/SelectBox";
import Text from "@/components/common/text/Text";
import { DetailItemOption } from "@/types";
import { useStoreItemStore } from "@/store/useStoreItemStore";

interface ItemOption {
  value: number;
  label: string;
  name: string;
  price: number;
  remaining: number;
  count: number;
}

interface ItemOptionsProps {
  itemOptionListData: DetailItemOption[];
}

const ItemOptions = ({ itemOptionListData }: ItemOptionsProps) => {
  const itemOptionList = itemOptionListData.map(option => ({
    value: option.id,
    label: `${option.name} (재고: ${option.remaining}) (+${option.optionPrice.toLocaleString()}원)`,
    name: option.name,
    price: option.optionPrice,
    remaining: option.remaining,
    count: 0,
  }));
  const { selectedOptions, addOption, removeOption, updateOptionCount, totalPrice, itemAmount, updateItemAmount } = useStoreItemStore();

  const handleUpdateItemAmount = (itemAmount: number) => {
    updateItemAmount(itemAmount);
  }

  const handleSelect = (option: ItemOption) => {
    addOption(option);
  }
  const handleChangeOptionCount = (value: number, count: number) => {
    updateOptionCount(value, count)

  }
  const handleRemoveOption = (value: number) => {
    removeOption(value);
  }
  return (
    <>
      <div className={heroStyles.itemInfo}>
        <Text className={heroStyles.infoLabel} type='description' size='md' color='black' weight='bold' align='left'>
          수량선택
        </Text>
        <div className={heroStyles.infoValue}>
          <Counter min={1} initialCount={itemAmount} fullWidth onChange={(value) => handleUpdateItemAmount(value)} />
        </div>
      </div>
      <div className={heroStyles.itemInfo}>
        <Text className={heroStyles.infoLabel} type='description' size='md' color='black' weight='bold' align='left'>
          추가상품
        </Text>
        <div className={heroStyles.infoValue}>
          <div>
            <SelectBox
              id="selectedOption"
              options={itemOptionList}
              onSelect={(selected) => handleSelect(selected as ItemOption)}
              fullWidth
              objectValue
              placeholder={itemOptionList.length === 0 ? '상품 옵션이 없습니다.' : '상품 옵션 선택'}
              placeholderPosition='left'
              optionSize='sm'
              isDisabled={itemOptionList.length === 0}
            />
          </div>
        </div>
      </div>
      <ul className={styles.selectedOptionsContainer}>
        {selectedOptions.map(option => (
          <li key={option.value} className={styles.selectedOption}>
            <Text className={`${styles.optionName} ${ellipsis({ lineSize: 'line1' })}`} type='description' size='sm' color='black' weight='normal' align='left'>
              {option.name}
            </Text>
            <Counter min={1} initialCount={option.count} onChange={(value) => handleChangeOptionCount(option.value, value)} className={styles.optionCounter} />
            <Text className={styles.optionPrice} type='description' size='md' color='black' weight='normal'>
              {option.price.toLocaleString()}원
            </Text>
            <button onClick={() => handleRemoveOption(option.value)} className={styles.optionCloseButton}>
              <Image src={CloseButton} alt='close button' width={15} height={15}/>
            </button>
          </li>
        ))}
      </ul>
      <div className={styles.totalPriceContainer}>
        <Text type='description' size='md' color='grey' weight='normal'>
          총 상품 금액 :
        </Text>
        <Text type='title' size='titleXXl' weight='bold'>
          &nbsp;&nbsp;{totalPrice.toLocaleString()}&nbsp;
        </Text>
        <Text type='description' size='md' color='black'>
          원
        </Text>
      </div>
    </>
  );
};

export default ItemOptions;
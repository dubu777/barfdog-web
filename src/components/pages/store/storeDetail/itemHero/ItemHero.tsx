import * as styles from './ItemHero.css';
import Text from "@/components/common/text/Text";
import ItemImageSlider from "@/components/pages/store/storeDetail/itemHero/itemImageSlider/ItemImageSlider";
import ItemOptions from "@/components/pages/store/storeDetail/itemHero/itemOptions/ItemOptions";
import { StoreItemDetail } from "@/types";

interface ItemHeroProps {
  itemDetail: StoreItemDetail;
}

const ItemHero = ({ itemDetail }: ItemHeroProps) => {
  const heroImageList = itemDetail?.itemImageDtoList;
  const itemInfo = itemDetail?.itemDto;
  const deliveryInfo = itemDetail?.deliveryCondDto;

  if (!itemInfo || !heroImageList || !deliveryInfo) {
    return null;
  }

  const infoCategory = [
    {
      name: 'Tip',
      value: (
        <Text className={styles.description} type='description' size='md' color='black' weight='light' align='left'>
          {itemInfo.description}
        </Text>
      ),
    },
    {
      name: '배송정보',
      value: (
        <div>
          <Text type='description' size='md' color='black' weight='light' align='left'>
            {itemInfo.deliveryFree
              ? '무료'
              : `택배배송 ${deliveryInfo.price.toLocaleString()}원 (${deliveryInfo.freeCondition.toLocaleString()}원 이상 구매시 무료)`
            }
          </Text>
          <Text type='description' size='sm' color='grey' align='left'>제주 및 도서산간 지역도 배송비 추가 없이 보내드립니다.</Text>
        </div>
      ),
    },
  ]


  return (
    <article className={styles.itemHeroContainer}>
      <ItemImageSlider heroImageList={heroImageList} />
      <Text type='title' size='titleMd' align='left'>{itemInfo.name}</Text>
      <div className={styles.itemPrice}>
        <Text type='title' size='titleXl' align='left'>
          {itemInfo.originalPrice !== itemInfo.salePrice
            ? `${itemInfo.salePrice.toLocaleString()}`
            : `${itemInfo.originalPrice.toLocaleString()}`
          }
        </Text>
        &nbsp;
        <Text type='description' size='md' color='black' align='left'>원</Text>
        {itemInfo.originalPrice !== itemInfo.salePrice &&
          <div className={styles.itemSalePriceBox}>
            <Text type='description' size='md' color='grey' align='left' weight='normal' className={styles.itemSalePrice}>
              {itemInfo.originalPrice.toLocaleString()}원
              </Text>
            <Text type='description' size='md' color='black' align='left' weight='normal'>
              {Math.ceil(Number(((1 - itemInfo.salePrice / itemInfo.originalPrice) * 100).toFixed(2)))}%
            </Text>
          </div>
        }
      </div>
      <div className={styles.itemInfoBox}>
        {infoCategory.map((info, index) => (
          <div key={info.name} className={styles.itemInfo}>
            <Text className={styles.infoLabel} type='description' size='md' color={index === 0 ? 'red' : 'black'} weight='bold' align='left'>
              {info.name}
            </Text>
            <div className={styles.infoValue}>
              {info.value}
            </div>
          </div>
        ))}
        <ItemOptions itemOptionListData={itemDetail.itemOptionDtoList} />
      </div>
    </article>
  );
};

export default ItemHero;
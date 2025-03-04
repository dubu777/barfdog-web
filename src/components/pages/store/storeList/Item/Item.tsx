import * as styles from './Item.css';
import Link from "next/link";
import Text from "@/components/common/text/Text";
import RateStar from "@/components/common/rateStar/RateStar";
import ImageLoadingSpinner from "@/components/common/imageLoadingSpinner/ImageLoadingSpinner";
import { ItemTagType, StoreItemListData } from "@/types/store";
import Chips from "@/components/common/chips/Chips";

interface StoreItemProps {
  item: StoreItemListData;
}

const Item = ({ item }: StoreItemProps) => {
  const itemTags = item.itemIcons.split(',').filter(value => value !== '') as ItemTagType[];
  return (
    <li key={item.id} className={styles.storeItem}>
      <Link href={`/store/${item.id}`} className={styles.storeLink}>
        <div className={styles.itemImageBox}>
          {itemTags.length > 0 &&
          <div className={styles.itemTags}>
            {itemTags.map(tag => (
              <Chips key={tag} variant='outlined' size='sm' switchOff={tag !== 'BEST'}>
                {tag}
              </Chips>
            ))}
          </div>
          }
          <ImageLoadingSpinner
            src={item.thumbnailUrl}
            alt={item.name}
            fill
            height={270}
            className={styles.itemImage}
          />
        </div>
        <Text type='description' size='sm' color='black' align='left'>{item.name}</Text>
        <div className={styles.itemOriginPrice}>
          <Text type='description' size='md' color='black' align='left'>
            {item.originalPrice !== item.salePrice
              ? `${item.originalPrice.toLocaleString()} 원`
              : `${item.salePrice.toLocaleString()} 원`
            }
          </Text>
          {!item.inStock &&
          <Chips variant='solid' size='sm' switchOff>품절</Chips>
          }
        </div>
        {item.originalPrice !== item.salePrice &&
        <div className={styles.itemSalePriceBox}>
          <Text type='description' size='sm' color='grey' align='left' className={styles.itemSalePrice}>{item.salePrice.toLocaleString()} 원</Text>
          <Text type='description' size='md' color='grey' align='left'>
            {Math.ceil(Number(((1 - item.salePrice / item.originalPrice) * 100).toFixed(2)))}%
          </Text>
        </div>
        }
        <div className={styles.itemReviewInfo}>
          <RateStar rateLength={5} value={item.star} color='yellow' align='left' inlineBlock />
          <Text type='description' size='sm' color='red'>{item.star.toFixed(1).toString()}</Text>
          <Text type='description' size='sm' color='grey'>({item.reviewCount})</Text>
        </div>
      </Link>
    </li>
  );
};

export default Item;
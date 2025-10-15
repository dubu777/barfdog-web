import * as styles from './Item.css';
import Link from "next/link";
import RateStar from "@/components/common/rateStar/RateStar";
import ImageLoadingSpinner from "@/components/common/imageLoadingSpinner/ImageLoadingSpinner";
import Chips from "@/components/common/chips/Chips";
import Text from "@/components/common/text/Text";
import { StoreItemListData } from "@/types/store";
import { getItemViewProps } from "@/utils/store/getItemViewProps";
import { CHIPS_COLORS } from '@/constants/style';

interface StoreItemProps {
  item: StoreItemListData;
}

export default function Item({ 
  item
}: StoreItemProps) {
  const {
    isDiscounted,
    formattedOriginalPrice,
    formattedSalePrice,
    discountRate,
    isSoldOut,
    starRating,
    tagList,
  } = getItemViewProps(item);

  return (
    <div className={styles.storeItem}>
      <Link href={`/store/${item.id}`} className={styles.storeLink}>
        <div className={styles.itemImageBox}>
          {tagList.length > 0 &&
            <div className={styles.itemTags}>
              {tagList.map(tag => (
                <Chips key={tag.tag} variant='solid' color={tag.color as keyof typeof CHIPS_COLORS} size='sm'>
                  {tag.tag}
                </Chips>
              ))}
            </div>
          }
          <ImageLoadingSpinner
            src={item.displayThumbnailUrl.url}
            alt={item.name}
            fill
            className={styles.itemImage}
          />
        </div>
        <div className={styles.itemInfoBox}>
          <Text type='body2' color='gray700'>{item.name}</Text>
          {!isDiscounted
            ? (
              <div className={styles.itemContent}>
                <Text type='headline1'>{formattedOriginalPrice}</Text>
                {isSoldOut &&
                  <Chips variant='solid' color='gray600'>품절</Chips>
                }
              </div>
            )
            : (
              <div className={styles.itemDiscount}>
                <div className={styles.itemSalePriceBox}>
                  <Text type='caption2' color='red'>할인특가</Text>
                  <Text type='caption2' color='gray600' className={styles.itemSalePrice}>
                    {formattedOriginalPrice}
                  </Text>
                </div>
                <div className={styles.itemContent}>
                  <Text type='headline1' color='red'>{discountRate}%</Text>
                  <Text type='headline1' color='gray900'>{formattedSalePrice}</Text>
                  {isSoldOut &&
                    <Chips variant='solid' color='gray600'>품절</Chips>
                  }
                </div>
              </div>
            )
          }
          <div className={styles.itemContent}>
            <RateStar rateLength={1} color='red' align='left' size={16} />
            <Text type='caption2' color='gray600'>
              {starRating}
            </Text>
          </div>
        </div>
      </Link>
    </div>
  );
};
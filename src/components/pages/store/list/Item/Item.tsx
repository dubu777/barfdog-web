import * as styles from './Item.css';
import Link from "next/link";
import RateStar from "@/components/common/rateStar/RateStar";
import ImageLoadingSpinner from "@/components/common/imageLoadingSpinner/ImageLoadingSpinner";
import Chips from "@/components/common/chips/Chips";
import DefaultText from "@/components/common/defaultText/DefaultText";
import { StoreItemListData } from "@/types/store";
import { getItemViewProps } from "@/utils/store/getItemViewProps";

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
    <li key={item.id} className={styles.storeItem}>
      <Link href={`/store/${item.id}`} className={styles.storeLink}>
        <div className={styles.itemImageBox}>
          {tagList.length > 0 &&
            <div className={styles.itemTags}>
              {tagList.map(tag => (
                <Chips key={tag.tag} variant='solid' color={tag.color} size='sm'>
                  {tag.tag}
                </Chips>
              ))}
            </div>
          }
          <ImageLoadingSpinner
            src={item.thumbnailUrl}
            alt={item.name}
            fill
            className={styles.itemImage}
          />
        </div>
        <div className={styles.itemInfoBox}>
          <DefaultText type='body2' color='gray700'>{item.name}</DefaultText>
          {!isDiscounted
            ? (
              <div className={styles.itemContent}>
                <DefaultText type='headline1'>{formattedOriginalPrice}</DefaultText>
                {isSoldOut &&
                  <Chips variant='solid' color='gray600'>품절</Chips>
                }
              </div>
            )
            : (
              <div className={styles.itemDiscount}>
                <div className={styles.itemSalePriceBox}>
                  <DefaultText type='caption2' color='red'>할인특가</DefaultText>
                  <DefaultText type='caption2' color='gray600' className={styles.itemSalePrice}>
                    {formattedOriginalPrice}
                  </DefaultText>
                </div>
                <div className={styles.itemContent}>
                  <DefaultText type='headline1' color='red'>{discountRate}%</DefaultText>
                  <DefaultText type='headline1' color='gray900'>{formattedSalePrice}</DefaultText>
                  {isSoldOut &&
                    <Chips variant='solid' color='gray600'>품절</Chips>
                  }
                </div>
              </div>
            )
          }
          <div className={styles.itemContent}>
            <RateStar rateLength={1} color='red' align='left' size={16} />
            <DefaultText type='caption2' color='gray600'>
              {starRating}
            </DefaultText>
          </div>
        </div>
      </Link>
    </li>
  );
};
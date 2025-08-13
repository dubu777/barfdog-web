import * as styles from './ItemTopInfo.css';
import { pointColor } from '@/styles/common.css';
import CheckIcon from "public/images/survey/check_small.svg";
import SvgIcon from '@/components/common/svgIcon/SvgIcon';
import DefaultText from '@/components/common/defaultText/DefaultText';
import Divider from '@/components/common/divider/Divider';
import RateStar from '@/components/common/rateStar/RateStar';
import ItemImageSlider from "@/components/pages/store/detail/itemTopInfo/itemImageSlider/ItemImageSlider";
import { DetailDeliveryConditionInfo, DetailItemImage, DetailItemReview, DiscountType, ItemTag } from "@/types";
import { DISCOUNT_UNIT } from '@/constants';
import Chips from '@/components/common/chips/Chips';
import { CHIPS_COLORS } from '@/constants/style';

interface ItemTopInfo {
  name: string;
  originalPrice: number;
  salePrice: number;
  discountRate: number;
  discountType: DiscountType;
  deliveryFree: boolean;
  imageList: DetailItemImage[];
  reviewInfo: DetailItemReview;
  deliveryInfo: DetailDeliveryConditionInfo;
  tagList: ItemTag[];
}

interface ItemTopInfoProps {
  data: ItemTopInfo;
}

export default function ItemTopInfo({ data }: ItemTopInfoProps) {
  const diffPrice = data.salePrice !== data.originalPrice && data.salePrice < data.originalPrice;

  return (
    <article>
      <ItemImageSlider itemImageList={data.imageList} />
      <div className={styles.itemInfoBox}>
        <div className={styles.itemDefaultInfo}>
          {data.tagList.length > 0 && 
            <div className={styles.itemTagList}>
              {data.tagList.map(tag => (
                <Chips variant='solid' color={tag.color as keyof typeof CHIPS_COLORS}>
                  {tag.tag}
                </Chips>
              ))}
            </div>
          }
          <div className={styles.itemTitle}>
            <DefaultText type='title2' block>{data.name}</DefaultText>
            <div className={styles.itemStar}>
              <RateStar rateLength={5} value={data.reviewInfo.star} size={12.8} />
              <DefaultText type='caption2'>{data.reviewInfo.star} ({data.reviewInfo.count})</DefaultText>
            </div>
          </div>
          <div>
            {diffPrice &&
              <p className={styles.itemDiscountPrice}>
                <DefaultText type='body2' color='red'>할인특가</DefaultText>
                <DefaultText type='body2' color='gray600' lineThrough>
                  {data.originalPrice.toLocaleString()}원
                </DefaultText>
              </p>
            }
            <DefaultText type='title2' className={styles.itemPrice}>
              {diffPrice &&
                <span className={pointColor}>
                  {data.discountRate}{DISCOUNT_UNIT.FIXED_RATE}
                </span>
              }
              <span>
                {data.salePrice.toLocaleString()}원
              </span>
            </DefaultText>
          </div>
        </div>
        <Divider thickness={2} color='gray100' />
        <div className={styles.itemDeliveryInfo}>
          <DefaultText className={styles.infoTitle} type='body2' color='gray700'>배송정보</DefaultText>
          <div className={styles.infoContent}>
            <span>
              <DefaultText type='label2'>{data.deliveryFree ? '무료' : '택배배송'}&nbsp;&nbsp;</DefaultText>
              {!data.deliveryFree && 
                <DefaultText type='headline3'>{data.deliveryInfo.price.toLocaleString()}원</DefaultText>
              }
            </span>
            {!data.deliveryFree && 
              <DefaultText type='body3' color='red'>({data.deliveryInfo.freeCondition.toLocaleString()}원 이상 구매 시 무료)</DefaultText>
            }
            <DefaultText className={styles.itemDeliveryDescription} type='caption2' color='gray500'>
              <SvgIcon src={CheckIcon} width={16} height={17} />
              제주 및 도서산간 지역 배송비 동일
            </DefaultText>
          </div>
        </div>
      </div>
    </article>
  );
};
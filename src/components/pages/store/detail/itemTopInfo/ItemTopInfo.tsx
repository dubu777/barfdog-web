import { commonWrapper, pointColor } from "@/styles/common.css";
import CheckIcon from "public/images/survey/check_small.svg";
import SvgIcon from "@/components/ui/svgIcon/SvgIcon";
import Text from "@/components/ui/text/Text";
import Divider from "@/components/ui/divider/Divider";
import Chips from "@/components/ui/chips/Chips";
import RateStar from "@/components/ui/rateStar/RateStar";
import ItemImageSlider from "@/components/pages/store/detail/itemTopInfo/itemImageSlider/ItemImageSlider";
import { DeliveryConditionInfo, ItemImage, ItemReview, ItemTag } from "@/types";
import { DISCOUNT_UNIT } from "@/constants";
import { CHIPS_COLORS } from "@/constants/style";
import { infoTitle } from "./ItemTopInfo.css";

interface ItemTopInfoProps {
  name: string;
  originalPrice: number;
  salePrice: number;
  discountRate: number;
  deliveryFree: boolean;
  imageList: ItemImage[];
  reviewInfo: ItemReview;
  deliveryInfo: DeliveryConditionInfo;
  tagList: ItemTag[];
}

export default function ItemTopInfo({
  name,
  originalPrice,
  salePrice,
  discountRate,
  deliveryFree,
  imageList,
  reviewInfo,
  deliveryInfo,
  tagList,
}: ItemTopInfoProps) {
  const diffPrice = salePrice !== originalPrice && salePrice < originalPrice;

  return (
    <article>
      <ItemImageSlider itemImageList={imageList} itemName={name} />
      <div
        className={commonWrapper({
          direction: "col",
          align: "start",
          gap: 12,
          padding: 20,
          backgroundColors: "gray0",
        })}
      >
        <div
          className={commonWrapper({
            direction: "col",
            align: "start",
            gap: 12,
          })}
        >
          {tagList.length > 0 && (
            <div className={commonWrapper({ gap: 4, justify: "start" })}>
              {tagList.map((tag) => (
                <Chips
                  key={tag.tag}
                  variant="solid"
                  color={tag.color as keyof typeof CHIPS_COLORS}
                >
                  {tag.tag}
                </Chips>
              ))}
            </div>
          )}
          <div
            className={commonWrapper({
              direction: "col",
              align: "start",
              gap: 4,
            })}
          >
            <Text type="title2" block>
              {name}
            </Text>
            <div className={commonWrapper({ gap: 2, justify: "start" })}>
              <RateStar rateLength={5} value={reviewInfo.star} size={12.8} />
              <Text type="caption2">
                {reviewInfo.star} ({reviewInfo.count})
              </Text>
            </div>
          </div>
          <div>
            {diffPrice && (
              <p className={commonWrapper({ gap: 6, justify: "start" })}>
                <Text type="body2" color="red">
                  할인특가
                </Text>
                <Text type="body2" color="gray600" lineThrough>
                  {originalPrice.toLocaleString()}원
                </Text>
              </p>
            )}
            <Text
              type="title2"
              className={commonWrapper({ gap: 4, justify: "start" })}
            >
              {diffPrice && (
                <span className={pointColor}>
                  {discountRate}
                  {DISCOUNT_UNIT.FIXED_RATE}
                </span>
              )}
              <span>{salePrice.toLocaleString()}원</span>
            </Text>
          </div>
        </div>
        <Divider height={2} color="gray100" />
        <div className={commonWrapper({ justify: "start", align: "start" })}>
          <Text className={infoTitle} type="body2" color="gray700">
            배송정보
          </Text>
          <div
            className={commonWrapper({
              direction: "col",
              align: "start",
              gap: 4,
            })}
          >
            <span>
              <Text type="label2">
                {deliveryFree ? "무료" : "택배배송"}&nbsp;&nbsp;
              </Text>
              {!deliveryFree && (
                <Text type="headline3">
                  {deliveryInfo.price.toLocaleString()}원
                </Text>
              )}
            </span>
            {!deliveryFree && (
              <Text type="body3" color="red">
                ({deliveryInfo.freeCondition.toLocaleString()}원 이상 구매 시
                무료)
              </Text>
            )}
            <Text
              className={commonWrapper({ gap: 4, justify: "start" })}
              type="caption2"
              color="gray500"
            >
              <SvgIcon src={CheckIcon} width={16} height={17} />
              제주 및 도서산간 지역 배송비 동일
            </Text>
          </div>
        </div>
      </div>
    </article>
  );
}

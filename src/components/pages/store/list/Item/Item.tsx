import { commonWrapper, imageWrapper, ellipsis } from "@/styles/common.css";
import { itemImageBox, itemTags, storeItem } from "./Item.css";
import Link from "next/link";
import RateStar from "@/components/ui/rateStar/RateStar";
import Chips from "@/components/ui/chips/Chips";
import Text from "@/components/ui/text/Text";
import { StoreItemListData } from "@/types/store";
import { getItemViewProps } from "@/utils/store/getItemViewProps";
import { CHIPS_COLORS } from "@/constants/style";
import Image from "next/image";
import { memo } from "react";

interface StoreItemProps {
  item: StoreItemListData;
  index: number;
}

function Item({ item, index }: StoreItemProps) {
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
    <div className={storeItem}>
      <Link
        href={`/store/detail/${item.id}`}
        className={commonWrapper({
          direction: "col",
          align: "start",
          gap: 16,
        })}
      >
        <div className={itemImageBox}>
          {tagList.length > 0 && (
            <div className={itemTags}>
              {tagList.map((tag) => (
                <Chips
                  key={tag.tag}
                  variant="solid"
                  color={tag.color as keyof typeof CHIPS_COLORS}
                  size="sm"
                >
                  {tag.tag}
                </Chips>
              ))}
            </div>
          )}
          <Image
            src={item.displayThumbnailUrl.url}
            alt={item.name}
            fill
            priority={index < 6}
            loading={index < 6 ? "eager" : "lazy"}
            fetchPriority={index < 3 ? "high" : "auto"}
            sizes="(max-width: 499px) 50vw, 33vw"
            className={imageWrapper({
              objectFit: "cover",
              hoverScale: true,
            })}
          />
        </div>
        <div
          className={commonWrapper({
            direction: "col",
            align: "start",
            gap: 4,
          })}
        >
          <Text
            type="body2"
            color="gray700"
            className={ellipsis({ lineSize: "line2" })}
          >
            {item.name}
          </Text>
          {!isDiscounted ? (
            <div className={commonWrapper({ justify: "start", gap: 4 })}>
              <Text type="headline1">{formattedOriginalPrice}</Text>
              {isSoldOut && (
                <Chips variant="solid" color="gray600">
                  품절
                </Chips>
              )}
            </div>
          ) : (
            <div
              className={commonWrapper({ direction: "col", align: "start" })}
            >
              <div className={commonWrapper({ justify: "start", gap: 8 })}>
                <Text type="caption2" color="red">
                  할인특가
                </Text>
                <Text type="caption2" color="gray600" lineThrough>
                  {formattedOriginalPrice}
                </Text>
              </div>
              <div className={commonWrapper({ justify: "start", gap: 8 })}>
                <Text type="headline1" color="red">
                  {discountRate}%
                </Text>
                <Text type="headline1" color="gray900">
                  {formattedSalePrice}
                </Text>
                {isSoldOut && (
                  <Chips variant="solid" color="gray600">
                    품절
                  </Chips>
                )}
              </div>
            </div>
          )}
          <div className={commonWrapper({ justify: "start", gap: 4 })}>
            <RateStar rateLength={1} color="red" align="left" size={16} />
            <Text type="caption2" color="gray600">
              {starRating}
            </Text>
          </div>
        </div>
      </Link>
    </div>
  );
}

export default memo(Item);

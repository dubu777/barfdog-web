"use client";

import { commonWrapper } from "@/styles/common.css";
import * as styles from "../CartItem.css";
import Image from "next/image";
import Text from "@/components/ui/text/Text";
import Counter from "@/components/ui/counter/Counter";
import { CartItemDto } from "@/types/cart";
import Divider from "@/components/ui/divider/Divider";
import Link from "next/link";

interface CartItemContentProps {
  item: CartItemDto;
  isSoldOut: boolean;
  onUpdateQuantity: (basketId: number, value: number) => void;
}

export default function CartItemContent({
  item,
  isSoldOut,
  onUpdateQuantity,
}: CartItemContentProps) {
  const unitOriginalPrice = item.totalOriginalPrice / item.amount;
  const unitSalePrice = item.totalSalePrice / item.amount;

  return (
    <div
      className={commonWrapper({ justify: "start", align: "start", gap: 8 })}
    >
      <Link href={`/store/detail/${item.itemId}`}>
        <Image
          src={item.displayImageUrl.url}
          alt={item.name}
          width={88}
          height={88}
          className={styles.cartItemImage({
            isSoldOut,
          })}
        />
      </Link>
      <div
        className={commonWrapper({
          direction: "col",
          align: "start",
          gap: 4,
        })}
      >
        <Link href={`/store/detail/${item.itemId}`}>
          <Text type="label2" color="gray700">
            {item.name}
          </Text>
        </Link>
        {isSoldOut ? (
          <Text type="headline1" color="red">
            Sold Out
          </Text>
        ) : (
          <>
            <div className={styles.dividerWrapper({ height: 20 })}>
              <Text type="body3" color="gray600" block>
                구매수량
              </Text>
              <Divider direction="vertical" color="gray300" height={50} />
              <Text type="body3" color="gray600" block>
                {item.amount}개
              </Text>
            </div>
            <div
              className={commonWrapper({ justify: "between", align: "end" })}
            >
              <div
                className={commonWrapper({
                  direction: "col",
                  align: "start",
                  gap: 2,
                })}
              >
                {unitOriginalPrice !== unitSalePrice && (
                  <Text type="caption2" color="gray600" lineThrough>
                    {unitOriginalPrice.toLocaleString()}원
                  </Text>
                )}
                <Text type="headline1">{unitSalePrice.toLocaleString()}원</Text>
              </div>
              <Counter
                min={1}
                initialCount={item.amount}
                onChange={(value) => onUpdateQuantity(item.basketId, value)}
              />
            </div>
          </>
        )}
      </div>
    </div>
  );
}

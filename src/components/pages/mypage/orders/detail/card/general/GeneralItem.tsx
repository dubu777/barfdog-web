import { Fragment } from "react";
import { commonWrapper } from "@/styles/common.css";
import Text from "@/components/common/text/Text";
import Divider from "@/components/common/divider/Divider";
import CardImage from "@/components/pages/mypage/common/card/image/CardImage";
import OrderPrice from "../../../common/card/OrderPrice";
import { OrderItem as OrderItemType } from "@/types/mypage/orders";

interface GeneralItemProps {
  orderItem: OrderItemType;
  showPrice?: boolean;
}

export default function GeneralItem({ 
  orderItem,
  showPrice = true,
}: GeneralItemProps) {
  return (
    <div className={commonWrapper({ gap: 12, justify: 'start', align: 'start' })}>
      <CardImage 
        imageUrl={orderItem.thumbnailUrl ?? ''} 
        name={orderItem.itemName ?? ''} 
      />
      <div className={commonWrapper({ direction: 'col', gap: 4, justify: 'start', align: 'start' })}>
        <Text type="headline3">{orderItem.itemName}</Text>
        <Text type="body3" color="gray700">{orderItem.amount}개</Text>
        {orderItem.selectOptionList.length > 0 && orderItem.selectOptionList.map((option) => (
          <Fragment key={option.optionName}>
            <Divider thickness={1} color="gray100" />
            <div className={commonWrapper({ gap: 6, justify: 'between' })}>
              <Text type="caption2" color="gray600">{option.optionName}</Text>
              <Text type="caption" color="gray600">{option.optionAmount}개</Text>
            </div>
          </Fragment>
        ))}
        {showPrice && 
          <OrderPrice
            paymentPrice={orderItem.finalPrice}
          />
        }
      </div>
    </div>
  );
}
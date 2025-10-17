import { Fragment } from "react";
import { commonWrapper } from "@/styles/common.css";
import Text from "@/components/common/text/Text";
import Divider from "@/components/common/divider/Divider";
import OrderImage from "../../../common/card/OrderImage";
import OrderName from "../../../common/card/OrderName";
import OrderPrice from "../../../common/card/OrderPrice";
import { OrderItem as OrderItemType } from "@/types/mypage/orders";

interface OrderItemProps {
  orderItem: OrderItemType;
  showPrice?: boolean;
}

export default function OrderItem({ 
  orderItem,
  showPrice = true,
}: OrderItemProps) {
  return (
    <div className={commonWrapper({ gap: 12, justify: 'start', align: 'start' })}>
      <OrderImage
        thumbnailUrl={orderItem.thumbnailUrl}
        itemName={orderItem.itemName}
      />
      <div className={commonWrapper({ direction: 'col', gap: 4, justify: 'start', align: 'start' })}>
        <OrderName name={orderItem.itemName} />
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
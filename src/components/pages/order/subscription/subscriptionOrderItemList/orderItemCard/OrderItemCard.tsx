import { OrderType, SubscribeDto } from "@/types";

interface OrderItemCardProps {
  orderType: OrderType;
  orderData: SubscribeDto;
  recipeName: string;
}

export default function OrderItemCard({orderType, orderData, recipeName}: OrderItemCardProps) {
  return (
    <div>
      {recipeName}
    </div>
  )
}
import { TEMP_RECIPE_DTO_DATA } from "@/constants";
import { OrderType, SubscribeDto } from "@/types";
import Image from "next/image";
import * as styles from "./OrderItemCard.css";
import DefaultText from "@/components/common/defaultText/DefaultText";
import { formatNumberWithCommas } from "@/utils";

interface OrderItemCardProps {
  orderType: OrderType;
  orderData: SubscribeDto;
  recipeName: string;
  recipeCount: number;
  oneMealGramPerPack: number;
  originPrice: number;
}

export default function OrderItemCard({
  orderType,
  orderData,
  recipeName,
  recipeCount,
  oneMealGramPerPack,
  originPrice,
}: OrderItemCardProps) {
  // 🔥 주문 정보 문자열 생성 함수
  const getOrderInfoText = () => {
    const isFullPlan = orderData.plan === "FULL";
    const mealPerDay = isFullPlan ? "하루 두 끼" : "하루 한 끼";
    const deliveryDuration = isFullPlan ? "2주" : "4주";
    const packCount = 28 / recipeCount;

    return `${oneMealGramPerPack}g | ${mealPerDay} | ${deliveryDuration} | ${packCount}팩`;
  };

  return (
    <div className={styles.orderItemCardContainer}>
        <Image
          src={TEMP_RECIPE_DTO_DATA[recipeName].imageURL}
          alt={recipeName}
          width={88}
          height={88}
          priority
          className={styles.orderItemCardImage}
        />
      <div className={styles.orderItemContentWrapper}>
        <div className={styles.orderItemInfoWrapper}>
          <DefaultText type="label2">
            {TEMP_RECIPE_DTO_DATA[recipeName].name}
          </DefaultText>
          <DefaultText type="body3">{getOrderInfoText()}</DefaultText>
        </div>
        <DefaultText type="headline2">
          {formatNumberWithCommas(originPrice)}원
        </DefaultText>
      </div>
    </div>
  );
}

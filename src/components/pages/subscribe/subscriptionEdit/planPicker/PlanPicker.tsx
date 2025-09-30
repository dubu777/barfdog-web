import Card from "@/components/common/card/Card";
import LabelValueItem from "@/components/common/labelValueItem/LabelValueItem";
import { DELIVERY_PLAN_LABEL, MEAL_PLAN_LABEL } from "@/constants";
import Button from "@/components/common/button/Button";
import Divider from "@/components/common/divider/Divider";
import { commonWrapper } from "@/styles/common.css";
import { DeliveryPlan, MealPlan } from "@/types";
import Text from "@/components/common/text/Text";

interface PlanPickerProps {
  mealPlan: MealPlan;
  deliveryPlan: DeliveryPlan;
  onClick: () => void;
}

export default function PlanPicker({
  mealPlan,
  deliveryPlan,
  onClick,
}: PlanPickerProps) {
  return (
    <Card shadow="light" padding={16} gap={12}>
      <div className={commonWrapper({ justify: "between" })}>
        <Text type="title4">구독 주기</Text>
        <Button
          variant="outline"
          size="sm"
          borderColor="gray300"
          textColor="gray900"
          onClick={onClick}
        >
          수정
        </Button>
      </div>
      <Divider thickness={2} color="gray900" />
      <LabelValueItem
        label="식사량"
        value={MEAL_PLAN_LABEL[mealPlan]}
        valueType="headline2"
        valueColor="gray900"
        labelColor="gray600"
        labelWidth={60}
        gap={12}
      />

      <Divider thickness={1} color="gray200" />
      <LabelValueItem
        label="배송 주기"
        value={DELIVERY_PLAN_LABEL[deliveryPlan]}
        valueType="headline2"
        valueColor="gray900"
        labelColor="gray600"
        labelWidth={60}
        gap={12}
      />
    </Card>
  );
}

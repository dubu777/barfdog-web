import Card from "@/components/ui/card/Card";
import LabelValueItem from "@/components/ui/labelValueItem/LabelValueItem";
import { DELIVERY_PLAN_LABEL, MEAL_PLAN_LABEL } from "@/constants";
import Button from "@/components/ui/button/Button";
import Divider from "@/components/ui/divider/Divider";
import { commonWrapper } from "@/styles/common.css";
import { DeliveryPlan, MealPlan } from "@/types";
import Text from "@/components/ui/text/Text";
import { useFormContext } from "react-hook-form";

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
  const { control } = useFormContext();
  return (
    <Card shadow="light" padding={16} gap={12}>
      <div className={commonWrapper({ justify: "between" })}>
        <Text type="title4">구독 주기</Text>
        <Button
          variant="outline"
          intent="assistive"
          size="sm"
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

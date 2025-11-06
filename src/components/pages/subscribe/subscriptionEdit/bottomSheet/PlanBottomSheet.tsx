import BottomSheet from "@/components/ui/bottomSheet/BottomSheet";
import ButtonDocked from "@/components/ui/buttonDocked/ButtonDocked";
import Text from "@/components/ui/text/Text";
import DeliveryCycle from "../../deliveryOptions/deliveryCycle/DeliveryCycle";
import MealFrequency from "../../deliveryOptions/mealFrequency/MealFrequency";
import { planBottomSheetContainer } from "./PlanBottomSheet.css";
import { commonWrapper } from "@/styles/common.css";

interface PlanBottomSheetProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function PlanBottomSheet({
  isOpen,
  onClose,
}: PlanBottomSheetProps) {
  return (
    <BottomSheet isOpen={isOpen} onClose={onClose}>
      <div className={planBottomSheetContainer}>
        <Text
          type="title4"
          className={commonWrapper({ padding: 20, justify: "start" })}
        >
          구독 정보 수정
        </Text>
        <MealFrequency source="edit" />
        <DeliveryCycle source="edit" />
        <ButtonDocked
          type="full-button"
          primaryButtonLabel="완료"
          onPrimaryClick={onClose}
          primaryButtonSize="lg"
        />
      </div>
    </BottomSheet>
  );
}

import BottomSheet from "@/components/common/bottomSheet/BottomSheet";
import ButtonDocked from "@/components/common/buttonDocked/ButtonDocked";
import Text from "@/components/common/text/Text";
import DeliveryCycle from "../../deliveryOptions/deliveryCycle/DeliveryCycle";
import MealFrequency from "../../deliveryOptions/mealFrequency/MealFrequency";
import { planBottomSheetContainer } from "./PlanBottomSheet.css";
import { commonWrapper, paddingStyles } from "@/styles/common.css";

interface PlanBottomSheetProps {
  isOpen: boolean;
  onClose: () => void;
  onCommit: () => void;
}

export default function PlanBottomSheet({
  isOpen,
  onClose,
  onCommit,
}: PlanBottomSheetProps) {
  const handleSubmit = () => {
    onCommit();
    onClose();
  };
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
          onPrimaryClick={handleSubmit}
          primaryButtonSize="lg"
        />
      </div>
    </BottomSheet>
  );
}

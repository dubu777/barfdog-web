import Button from "@/components/common/button/Button";
import { commonWrapper } from "@/styles/common.css";

interface PetCardButtonProps {
  showOnlySubscribeButton: boolean;
  isSubscribing: boolean;
  onSurvey: () => void;
  onResult: () => void;
}

export default function PetCardButton({
  showOnlySubscribeButton,
  isSubscribing,
  onSurvey,
  onResult,
}: PetCardButtonProps) {
  if (showOnlySubscribeButton) {
    return (
      <Button size="sm" fullWidth onClick={onSurvey}>
        식단 추천받기
      </Button>
    );
  }

  return (
    <div className={commonWrapper({ gap: 8 })}>
      <Button
        type="assistive"
        variant="outline"
        textColor="red"
        borderColor="red"
        size="sm"
        fullWidth
        onClick={onSurvey}
      >
        다시 추천 받기
      </Button>

      <Button
        {...(isSubscribing
          ? {
              type: "assistive",
              variant: "outline",
              textColor: "gray900",
              borderColor: "gray300",
            }
          : {})}
        size="sm"
        onClick={onResult}
        fullWidth
      >
        {isSubscribing ? "맞춤 결과 확인" : "맞춤 식단 구독하기"}
      </Button>
    </div>
  );
}

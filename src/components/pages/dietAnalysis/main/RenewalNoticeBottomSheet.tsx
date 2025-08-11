import BottomSheet from "@/components/common/bottomSheet/BottomSheet";
import DefaultText from "@/components/common/defaultText/DefaultText";
import { commonWrapper } from "@/styles/common.css";
import NoticeIcon from "public/images/dietAnalysis/renewal-notice.svg";
import { renewalNoticeButtonWrapper } from "./DietAnalysisMain.css";
import Button from "@/components/common/button/Button";

interface RenewalNoticeBottomSheetProps {
  onSurvey: () => void;
  isOpen: boolean;
  onClose: () => void;
}

export default function RenewalNoticeBottomSheet({
  onSurvey,
  isOpen,
  onClose,
}: RenewalNoticeBottomSheetProps) {
  return (
    <BottomSheet isOpen={isOpen} onClose={onClose}>
      <div
        className={commonWrapper({
          direction: "col",
          padding: 20,
          gap: 12,
          align: "start",
        })}
      >
        <div>
          <DefaultText type="title3">AI 추천식단이</DefaultText>
          <DefaultText type="title3" color="red">
            한층 더 정밀해졌어요
          </DefaultText>
        </div>
        <DefaultText type="body2" color="gray600">
          업그레이드된 설문과 분석을 통해 반려견에게 더 잘 맞는 식단을
          준비했습니다. 새 설문을 진행하고 새로운 추천을 받아보세요.
        </DefaultText>
      </div>
      <div className={commonWrapper({})}>
        <NoticeIcon />
      </div>
      <div className={renewalNoticeButtonWrapper}>
        <Button onClick={onSurvey} fullWidth>
          식단 다시 추천받기
        </Button>
        <Button onClick={onClose} variant="text" textColor="gray500" fullWidth>
          나중에
        </Button>
      </div>
    </BottomSheet>
  );
}

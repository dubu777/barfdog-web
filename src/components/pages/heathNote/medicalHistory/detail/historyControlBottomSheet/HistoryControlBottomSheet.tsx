import { commonWrapper, pointColor } from "@/styles/common.css";
import EditIcon from "/public/images/icons/pen.svg";
import DeleteIcon from "/public/images/icons/trashbag.svg";
import Button from "@/components/ui/button/Button";
import Text from "@/components/ui/text/Text";
import BottomSheet from "@/components/ui/bottomSheet/BottomSheet";

interface HistoryControlBottomSheetProps {
  isOpen: boolean;
  onClose: () => void;
  handleEdit: () => void;
  handleDelete: () => void;
}

export default function HistoryControlBottomSheet({
  isOpen,
  onClose,
  handleEdit,
  handleDelete,
}: HistoryControlBottomSheetProps) {
  return (
    <BottomSheet
      isOpen={isOpen}
      onClose={onClose}
    >
      <Text type="title4" className={commonWrapper({
        padding: 20,
        paddingBottom: 8,
        justify: 'start'
      })}>
        병원 진료 기록
      </Text>
      <div className={commonWrapper({
        padding: 20,
        paddingTop: 12,
        paddingBottom: 40,
        direction: 'col',
        align: 'start',
        gap: 12,
      })}>
        <Button
          onClick={() => {
            onClose();
            handleEdit();
          }}
          variant="outline"
          intent="assistive"
          size="lg"
          fullWidth
          icon={EditIcon}
        >
          병원 진료 기록 수정
        </Button>
        <Button
          onClick={() => {
            onClose();
            handleDelete();
          }}
          variant="outline"
          intent="assistive"
          size="lg"
          fullWidth
          icon={DeleteIcon}
          iconColor="red"
        >
          <span className={pointColor}>병원 진료 기록 삭제</span>
        </Button>
      </div>
    </BottomSheet>
  );
}

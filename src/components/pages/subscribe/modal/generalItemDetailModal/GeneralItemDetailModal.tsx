import FullModalWrapper from "@/components/common/fullModalWrapper/FullModalWrapper";

interface GeneralItemDetailModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function GeneralItemDetailModal({isOpen, onClose}: GeneralItemDetailModalProps) {
  return (
    <FullModalWrapper isVisible={isOpen} handleClose={onClose}>
      <div>
        
      </div>
    </FullModalWrapper>
  );
}
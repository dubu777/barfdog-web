
import Modal from "@/components/common/defaultModal/defaultModal";
import React from "react";


interface DeliveryScheduleModalProps {
  isVisible: boolean;
  onClose: () => void;

}

export default function DeliveryScheduleModal({
  isVisible,
  onClose,

}: DeliveryScheduleModalProps) {

  return (
    <Modal isVisible={isVisible} onClose={onClose}>
      <div>
        asd
      </div>
    </Modal>
  );
}

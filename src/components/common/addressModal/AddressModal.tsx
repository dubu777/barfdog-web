import * as styles from './AddressModal.css';
import Image from "next/image";
import CloseButton from '/public/images/icons/close-black.png';
import Portal from "@/components/common/portal/Portal";
import DaumPostcode, { Address } from 'react-daum-postcode';
import { AnimatePresence, motion } from "framer-motion";

interface AlertModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectAddressData: (data: Address) => void;
}

const AddressModal = ({ isOpen, onClose, onSelectAddressData }: AlertModalProps) => {
  if (!isOpen) return null;

  const handleComplete = (data: Address) => {
    onSelectAddressData(data);
    onClose();
  }
  
  return (
    <Portal onClose={onClose}>
      <AnimatePresence>
        <motion.div
          className={styles.modalStyle}
          onClick={(e) => e.stopPropagation()}
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.8 }}
          transition={{ duration: 0.3 }}
        >
          <button onClick={onClose} className={styles.closeBtn}>
            <Image src={CloseButton} alt='close button' width={10} height={10} />
          </button>
          <DaumPostcode onComplete={handleComplete} />
        </motion.div>
      </AnimatePresence>
    </Portal>
  );
};

export default AddressModal;
import DaumPostcodeEmbed, { Address } from 'react-daum-postcode';
import * as styles from "./AddressSearchModal.css";
import SvgIcon from "../svgIcon/SvgIcon";
import CloseIcon from "/public/images/header/close.svg";
import ModalBackground from '../modalBackground/ModalBackground';


interface AddressSearchModalProps {
  isVisible: boolean;
  onClose: () => void;
  onSelectAddress: (data: Address) => void;
}


export default function AddressSearchModal({isVisible, onClose, onSelectAddress}: AddressSearchModalProps) {
const handleComplete = (data: Address) => {
  onSelectAddress(data);
  onClose();
}

  return (
    <ModalBackground isVisible={isVisible} onClose={onClose}>
      <div className={styles.addressSearchModal}>
        <div className={styles.closeButtonWrapper}>
          <button onClick={onClose}>
            <SvgIcon src={CloseIcon} size={20} />
          </button>
        </div>
        <DaumPostcodeEmbed onComplete={handleComplete}/>
      </div>
    </ModalBackground>
  )
}
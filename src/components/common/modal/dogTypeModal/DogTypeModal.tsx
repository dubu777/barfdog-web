import * as styles from "./DogTypeModal.css";
import { DOG_TYPE } from "@/constants/dog";
import SearchableSelector from "@/components/common/searchableSelector/SearchableSelector";
import FullModalWrapper from "@/components/common/fullModalWrapper/FullModalWrapper";
import DefaultText from "@/components/common/defaultText/DefaultText";

interface DogTypeModalProps {
  dogName: string;
  value: string;
  onChange: (value: string) => void;
  isOpen: boolean;
  onClose: () => void;
}

const DogTypeModal = ({
  dogName,
  value,
  onChange,
  isOpen,
  onClose,
}: DogTypeModalProps) => {
  return (
    <FullModalWrapper isVisible={isOpen} handleClose={onClose}>
      <div className={styles.dogTypeModalContainer}>
        <DefaultText type="title3">
          {dogName}의<br />
          견종은 무엇인가요?
        </DefaultText>
        <SearchableSelector
          placeholder="견종을 검색해 보세요"
          options={DOG_TYPE}
          selectedValue={value}
          onChange={onChange}
        />
      </div>
    </FullModalWrapper>
  );
};

export default DogTypeModal;

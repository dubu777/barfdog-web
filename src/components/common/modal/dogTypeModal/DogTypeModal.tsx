import * as styles from "./DogTypeModal.css";
import { DOG_TYPE } from "@/constants/dog";
import SearchableSelector from "@/components/common/searchableSelector/SearchableSelector";
import FullModalWrapper from "@/components/common/fullModalWrapper/FullModalWrapper";
import DefaultText from "@/components/common/defaultText/DefaultText";
import { PetBreedList } from "@/types/pet";
import { Option } from "@/types";

interface DogTypeModalProps {
  dogName: string;
  value: number;
  breedList: PetBreedList;
  isOpen: boolean;
  onChange: (value: number) => void;
  onClose: () => void;
}

const DogTypeModal = ({
  dogName,
  value,
  breedList,
  isOpen,
  onChange,
  onClose,
}: DogTypeModalProps) => {
  const options: Option<number>[] =
    breedList?.map(({ breedId, breedName }) => ({
      label: breedName,
      value: breedId,
    })) ?? [];
  return (
    <FullModalWrapper isVisible={isOpen} handleClose={onClose}>
      <div className={styles.dogTypeModalContainer}>
        <DefaultText type="title3">
          {dogName}의<br />
          견종은 무엇인가요?
        </DefaultText>
        <SearchableSelector
          placeholder="견종을 검색해 보세요"
          options={options}
          selectedValue={value}
          onChange={onChange}
          onClose={onClose}
        />
      </div>
    </FullModalWrapper>
  );
};

export default DogTypeModal;

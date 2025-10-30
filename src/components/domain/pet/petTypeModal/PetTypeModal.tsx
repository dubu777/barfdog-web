import * as styles from "./PetTypeModal.css";
import SearchableSelector from "@/components/domain/pet/searchableSelector/SearchableSelector";
import FullModalWrapper from "@/components/ui/fullModalWrapper/FullModalWrapper";
import Text from "@/components/ui/text/Text";
import { PetBreedList } from "@/types/pet";
import { Option } from "@/types";

interface PetTypeModalProps {
  dogName: string;
  value: number;
  breedList: PetBreedList;
  isOpen: boolean;
  onChange: (value: number) => void;
  onClose: () => void;
}

export default function PetTypeModal({
  dogName,
  value,
  breedList,
  isOpen,
  onChange,
  onClose,
}: PetTypeModalProps) {
  const options: Option<number>[] =
    breedList?.map(({ breedId, breedName }) => ({
      label: breedName,
      value: breedId,
    })) ?? [];
  return (
    <FullModalWrapper isVisible={isOpen} handleClose={onClose}>
      <div className={styles.dogTypeModalContainer}>
        <Text type="title3">
          {dogName}의<br />
          견종은 무엇인가요?
        </Text>
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
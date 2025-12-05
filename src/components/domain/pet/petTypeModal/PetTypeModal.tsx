import { commonWrapper } from "@/styles/common.css";
import SearchableSelector from "@/components/domain/pet/searchableSelector/SearchableSelector";
import FullModalWrapper from "@/components/ui/fullModalWrapper/FullModalWrapper";
import Text from "@/components/ui/text/Text";
import { PetBreedList } from "@/types/pet";
import { Option } from "@/types";

interface PetTypeModalProps {
  value: number;
  breedList: PetBreedList;
  isOpen: boolean;
  onChange: (value: number) => void;
  onClose: () => void;
}

export default function PetTypeModal({
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
      <div
        className={commonWrapper({
          backgroundColors: "gray50",
          direction: "col",
          align: "start",
          gap: 32,
          padding: 20,
          paddingTop: 32,
        })}
      >
        <Text type="title3">우리 아이의 견종을 선택해 주세요</Text>
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
}

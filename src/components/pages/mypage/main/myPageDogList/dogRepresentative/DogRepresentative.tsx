'use client';
import { useState } from "react";
import * as styles from "../MyPageDogList.css";
import RedFlag from "/public/images/icons/flag-red.svg";
import DefaultFlag from "/public/images/icons/flag-default.svg";
import AlertModal from "@/components/common/alertModal/AlertModal";
import { useUpdateRepresentativeDog } from "@/api/dog/mutations/useUpdateRepresentativeDog";
import { useToastStore } from "@/store/useToastStore";

interface DogRepresentativeProps {
  noData: boolean;
  representativeDog: boolean;
  dogId: number;
  resetSwiper: (() => void) | undefined;
}

const DogRepresentative = ({ noData, representativeDog, dogId, resetSwiper }: DogRepresentativeProps) => {
  const [openRepresentativeModal, setOpenRepresentativeModal] = useState<boolean>(false);
  const { addToast } = useToastStore();
  const { mutate } = useUpdateRepresentativeDog(dogId);

  const handleRepresentativeDog = () => {
    mutate(
      undefined,
      {
        onSuccess: async () => {
          setOpenRepresentativeModal(false);
          addToast('대표견이 성공적으로 설정되었습니다!', 'success');
          if(resetSwiper) resetSwiper();
        }
      }
    );
  }
  return (
    !noData &&
      <>
      <button
        onClick={() => !representativeDog && setOpenRepresentativeModal(true)}
        className={styles.dogFlag({ representativeDog: representativeDog })}
      >
        {representativeDog ? <RedFlag /> : <DefaultFlag />}
      </button>
      <AlertModal
        isOpen={openRepresentativeModal}
        onClose={() => setOpenRepresentativeModal(false)}
        onConfirm={handleRepresentativeDog}
        message={'대표견으로 설정하시겠습니까?'}
      />
      </>
  );
};

export default DogRepresentative;
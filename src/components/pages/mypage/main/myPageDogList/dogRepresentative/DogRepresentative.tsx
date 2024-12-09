'use client';
import { useState } from "react";
import * as styles from "../MyPageDogList.css";
import RedFlag from "/public/images/icons/flag-red.svg";
import DefaultFlag from "/public/images/icons/flag-default.svg";
import AlertModal from "@/components/common/alertModal/AlertModal";

interface DogRepresentativeProps {
  noData: boolean;
  representativeDog: boolean;
}

const DogRepresentative = ({ noData, representativeDog }: DogRepresentativeProps) => {
  const [openRepresentativeModal, setOpenRepresentativeModal] = useState<boolean>(false);
  const handleRepresentativeDog = () => {

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
"use client";
import * as styles from "./HealthNoteMainHeader.css";
import { dogImage } from "@/components/pages/heathNote/common/HealthNoteCommon.css";
import { Fragment, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import ChevronDown from "/public/images/icons/chevron-sort-up.svg";
import CheckCircle from "public/images/icons/check_circle.svg";
import PlusIcon from "/public/images/icons/plus.svg";
import SvgIcon from "@/components/common/svgIcon/SvgIcon";
import DogIcon from "/public/images/healthNote/dogIcon.png";
import DefaultText from "@/components/common/defaultText/DefaultText";
import BottomSheet from "@/components/common/bottomSheet/BottomSheet";
import ButtonDocked from "@/components/common/buttonDocked/ButtonDocked";
import Divider from "@/components/common/divider/Divider";
import useModal from "@/hooks/useModal";
import { useHealthNoteStore } from "@/store/useHealthNoteStore";
import { DogInfo } from "@/types/healthNote";
import { useUpdateRepresentativeDog } from "@/api/dog/mutations/useUpdateRepresentativeDog";
import { useGetPetList } from "@/api/pet/queries/useGetPetList";
import { commonWrapper } from "@/styles/common.css";

const HealthNoteMainHeader = () => {
  const router = useRouter();
  const { data: petList = [] } = useGetPetList();
  console.log(petList);

  const representativeDog = petList?.find((dog) => dog.isRepresentative);

  const { dogInfo, setDogInfo } = useHealthNoteStore();
  const dogImageUrl = dogInfo?.imageUrl ? dogInfo.imageUrl : DogIcon;

  const { isOpen, onClose, onToggle } = useModal();

  const { mutate: updateTargetDogMutate } = useUpdateRepresentativeDog();

  useEffect(() => {
    if (representativeDog) {
      setDogInfo({
        dogId: representativeDog.id,
        name: representativeDog.name,
        imageUrl: representativeDog.displayImageUrl?.url ?? null,
      });
    }
  }, [petList, setDogInfo, representativeDog]);

  const handleShowDogList = () => {
    if (petList.length === 0) {
      router.push("/pet/create?source=health-note");
    } else {
      onToggle();
    }
  };

  const handleChangeDogInfo = (dogInfo: DogInfo) => {
    setDogInfo(dogInfo);
  };

  const handleCloseChangeDogInfo = () => {
    const isChangedDog =
      dogInfo?.dogId &&
      (!representativeDog?.id || dogInfo?.dogId !== representativeDog?.id);

    if (isChangedDog) {
      updateTargetDogMutate(
        { dogId: dogInfo.dogId },
        {
          onSuccess: (data) => {
            console.log("data!!!", data);
          },
          onError: (err) => {
            console.log("err", err);
          },
        }
      );
    }
    onClose();
  };

  const handleCreatePet = () => {
    onClose();
    router.push("/pet/create?source=health-note");
  };

  return (
    <>
      <header className={styles.heathNoteHeaderContainer}>
        <Image
          src={dogImageUrl}
          alt="대표 반려견"
          width={40}
          height={40}
          className={dogImage({ borderRadius: "lg" })}
        />
        <button onClick={handleShowDogList} className={styles.selectButton}>
          <DefaultText type="headline1">
            {petList.length === 0 ? "반려견 등록" : dogInfo?.name}
          </DefaultText>
          <SvgIcon src={ChevronDown} style={{ transform: "rotate(180deg)" }} />
        </button>
      </header>
      {petList && isOpen && (
        <BottomSheet
          isOpen={isOpen}
          onClose={handleCloseChangeDogInfo}
          className={styles.selectBottomSheet}
        >
          <div className={styles.selectBottomSheetHeader}>
            <DefaultText type="title4">반려견 선택</DefaultText>
            <Link href="/health-note/pets">
              <DefaultText type="label4" color="gray500">
                전체보기
              </DefaultText>
            </Link>
          </div>
          <div className={styles.selectBottomSheetBox}>
            {petList.map((dog, index) => {
              const active = dog.id === Number(dogInfo?.dogId) || false;
              return (
                <Fragment key={dog.id}>
                  <button
                    className={styles.selectDogButton}
                    onClick={() =>
                      handleChangeDogInfo({
                        dogId: dog.id,
                        name: dog.name,
                        imageUrl: dog?.displayImageUrl?.url ?? null,
                      })
                    }
                  >
                    <div className={styles.selectBottomSheetDogInfo}>
                      <Image
                        src={dog?.displayImageUrl?.url || DogIcon}
                        alt={dog.name}
                        width={40}
                        height={40}
                        className={dogImage({ borderRadius: "lg", active })}
                      />
                      <DefaultText type="headline1">{dog.name}</DefaultText>
                    </div>
                    {active && (
                      <SvgIcon src={CheckCircle} size={24} color="red" />
                    )}
                  </button>
                  {petList.length !== index + 1 && (
                    <Divider thickness={1} color="gray100" />
                  )}
                </Fragment>
              );
            })}
          </div>
          <ButtonDocked
            type="full-button"
            primaryButtonVariant="outline"
            primaryButtonType="assistive"
            primaryButtonLabel={
              <div className={commonWrapper({ gap: 6 })}>
                <SvgIcon src={PlusIcon} />
                <DefaultText type="headline3">새로운 아이 등록하기</DefaultText>
              </div>
            }
            onPrimaryClick={handleCreatePet}
            position="sticky"
          />
        </BottomSheet>
      )}
    </>
  );
};

export default HealthNoteMainHeader;

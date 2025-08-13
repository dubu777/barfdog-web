"use client";
import * as styles from "./HealthNoteMainHeader.css";
import { petImage } from "@/components/pages/heathNote/common/HealthNoteCommon.css";
import { Fragment, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import ChevronDown from "/public/images/icons/chevron-sort-up.svg";
import CheckCircle from "public/images/icons/check_circle.svg";
import PlusIcon from "/public/images/icons/plus.svg";
import SvgIcon from "@/components/common/svgIcon/SvgIcon";
import PetIcon from "/public/images/healthNote/DogIcon.png";
import DefaultText from "@/components/common/defaultText/DefaultText";
import BottomSheet from "@/components/common/bottomSheet/BottomSheet";
import ButtonDocked from "@/components/common/buttonDocked/ButtonDocked";
import Divider from "@/components/common/divider/Divider";
import useModal from "@/hooks/useModal";
import { useHealthNoteStore } from "@/store/useHealthNoteStore";
import { PetInfo } from "@/types/healthNote";
import { useGetPetList } from "@/api/pet/queries/useGetPetList";
import { commonWrapper } from "@/styles/common.css";
import { useUpdateRepresentativePet } from "@/api/pet/mutations/useUpdateRepresentativePet";
import { useToastStore } from "@/store/useToastStore";

export default function HealthNoteMainHeader() {
  const router = useRouter();
  const { addToast } = useToastStore();
  const { data: petList = [] } = useGetPetList();

  const representativePet = petList?.find((pet) => pet.isRepresentative);

  const { petInfo, setPetInfo } = useHealthNoteStore();
  const petImageUrl = petInfo?.imageUrl ? petInfo.imageUrl : PetIcon;

  const { isOpen, onClose, onToggle } = useModal();

  const { mutate: updateRepresentative } = useUpdateRepresentativePet();

  useEffect(() => {
    if (representativePet) {
      setPetInfo({
        id: representativePet.id,
        name: representativePet.name,
        imageUrl: representativePet.displayImageUrl?.url ?? null,
      });
    }
  }, [petList, setPetInfo, representativePet]);

  const handleShowPetList = () => {
    if (petList.length === 0) {
      router.push("/pet/create?source=health-note");
    } else {
      onToggle();
    }
  };

  const handleChangePetInfo = (petInfo: PetInfo) => {
    setPetInfo(petInfo);
  };

  const handleCloseChangePetInfo = () => {
    const isChangedPet =
      petInfo?.id &&
      (!representativePet?.id || petInfo?.id !== representativePet?.id);

    if (isChangedPet) {
      updateRepresentative(petInfo?.id, {
        onSuccess: () => {
          addToast("대표견이 변경되었습니다", 'above-button');
        },
        onError: () => {
          addToast("대표견 설정에 실패했습니다", 'above-button');
        },
      });
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
          src={petImageUrl}
          alt="대표 반려견"
          width={40}
          height={40}
          className={petImage({ borderRadius: "lg" })}
        />
        <button onClick={handleShowPetList} className={styles.selectButton}>
          <DefaultText type="headline1">
            {petList.length === 0 ? "반려견 등록" : petInfo?.name}
          </DefaultText>
          <SvgIcon src={ChevronDown} style={{ transform: "rotate(180deg)" }} />
        </button>
      </header>
      {petList && isOpen && (
        <BottomSheet
          isOpen={isOpen}
          onClose={handleCloseChangePetInfo}
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
            {petList.map((pet, index) => {
              const active = pet.id === Number(petInfo?.id) || false;
              return (
                <Fragment key={pet.id}>
                  <button
                    className={styles.selectPetButton}
                    onClick={() =>
                      handleChangePetInfo({
                        id: pet.id,
                        name: pet.name,
                        imageUrl: pet?.displayImageUrl?.url ?? null,
                      })
                    }
                  >
                    <div className={styles.selectBottomSheetPetInfo}>
                      <Image
                        src={pet?.displayImageUrl?.url || PetIcon}
                        alt={pet.name}
                        width={40}
                        height={40}
                        className={petImage({ borderRadius: "lg", active })}
                      />
                      <DefaultText type="headline1">{pet.name}</DefaultText>
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
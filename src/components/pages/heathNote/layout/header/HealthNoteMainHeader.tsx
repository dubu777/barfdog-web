"use client";
import * as styles from "./HealthNoteMainHeader.css";
import { commonWrapper } from "@/styles/common.css";
import { petImage } from "@/components/pages/heathNote/common/HealthNoteCommon.css";
import { Fragment, useState } from "react";
import { useRouter } from "next/navigation";
import { useQueryClient } from "@tanstack/react-query";
import Link from "next/link";
import Image from "next/image";
import ChevronDown from "/public/images/icons/chevron-sort-up.svg";
import CheckCircle from "public/images/icons/check_circle.svg";
import PlusIcon from "/public/images/icons/plus.svg";
import PetIcon from "/public/images/healthNote/dogIcon.png";
import SvgIcon from "@/components/common/svgIcon/SvgIcon";
import Text from "@/components/common/text/Text";
import ButtonDocked from "@/components/common/buttonDocked/ButtonDocked";
import useModal from "@/hooks/useModal";
import BottomSheet from "@/components/common/bottomSheet/BottomSheet";
import { useToastStore } from "@/store/useToastStore";
import { queryKeys } from "@/constants";
import { useGetPetList } from "@/api/pet/queries/useGetPetList";
import { useUpdateRepresentativePet } from "@/api/pet/mutations/useUpdateRepresentativePet";
import { Pet } from "@/types/pet";
import ListDivider from "@/components/common/listDivider/ListDivider";

export default function HealthNoteMainHeader() {
  const router = useRouter();
  const queryClient = useQueryClient();

  const { addToast } = useToastStore();
  const { isOpen, onClose, onToggle } = useModal();

  const { data: petList = [] } = useGetPetList();
  const { mutate: updateRepresentative } = useUpdateRepresentativePet();

  const representativePet = petList?.find((pet) => pet.isRepresentative);
  const petImageUrl =
    representativePet?.displayImageUrl && representativePet.displayImageUrl.url
      ? representativePet.displayImageUrl.url
      : PetIcon;

  const [selectedPet, setSelectedPet] = useState<Pet | null>(null);

  const handleShowPetList = () => {
    if (petList.length === 0) {
      router.push("/pet/create?source=health-note");
    } else {
      onToggle();
    }
  };

  const handleCloseChangePetInfo = () => {
    const isChangedPet =
      representativePet?.id !== selectedPet?.id

    if (isChangedPet && selectedPet) {
      updateRepresentative(selectedPet?.id, {
        onSuccess: async () => {
          addToast("대표견이 변경되었습니다", 'above-button');
          await queryClient.invalidateQueries({
            queryKey: [queryKeys.PET.BASE, queryKeys.PET.GET_PET_LIST],
          });
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
          <Text type="headline1">
            {petList.length === 0 ? "반려견 등록" : representativePet?.name}
          </Text>
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
            <Text type="title4">반려견 선택</Text>
            <Link href="/health-note/pets">
              <Text type="label4" color="gray500">
                전체보기
              </Text>
            </Link>
          </div>
          <div className={styles.selectBottomSheetBox}>
            {petList.map((pet, index) => {
              const active = pet.id === Number(selectedPet?.id ?? representativePet?.id) || false;
              return (
                <Fragment key={pet.id}>
                  <button
                    className={styles.selectPetButton}
                    onClick={() => setSelectedPet(pet)}
                  >
                    <div className={styles.selectBottomSheetPetInfo}>
                      <Image
                        src={pet?.displayImageUrl?.url || PetIcon}
                        alt={pet.name}
                        width={40}
                        height={40}
                        className={petImage({ borderRadius: "lg", active })}
                      />
                      <Text type="headline1">{pet.name}</Text>
                    </div>
                    {active && (
                      <SvgIcon src={CheckCircle} size={24} color="red" />
                    )}
                  </button>
                  <ListDivider listLength={petList.length} index={index} color='gray100' />
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
                <Text type="headline3">새로운 아이 등록하기</Text>
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
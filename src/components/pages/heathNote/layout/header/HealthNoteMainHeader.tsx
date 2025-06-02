"use client";
import * as styles from "./HealthNoteMainHeader.css";
import { Fragment, useEffect } from "react";
import { useRouter } from "next/navigation";
import {
  createDogButton,
  dogImage,
} from "@/components/pages/heathNote/common/HealthNoteCommon.css";
import Link from "next/link";
import Image from "next/image";
import ChevronDown from "/public/images/icons/chevron-sort-up.svg";
import CheckCircle from "/public/images/mypage/check_circle.svg";
import PlusIcon from "/public/images/subscription/plus.svg";
import SvgIcon from "@/components/common/svgIcon/SvgIcon";
import DogIcon from "/public/images/healthNote/dogIcon.png";
import DefaultText from "@/components/common/defaultText/DefaultText";
import BottomSheet from "@/components/common/bottomSheet/BottomSheet";
import ButtonDocked from "@/components/common/buttonDocked/ButtonDocked";
import Divider from "@/components/common/divider/Divider";
import useModal from "@/hooks/useModal";
import { useGetDogList } from "@/api/dog/queries/useGetDogList";
import { useHealthNoteStore } from "@/store/useHealthNoteStore";
import { DogInfo } from "@/types/healthNote";
import { useUpdateRepresentativeDog } from "@/api/dog/mutations/useUpdateRepresentativeDog";

interface HealthNoteMainHeaderProps {}

const HealthNoteMainHeader = ({}: HealthNoteMainHeaderProps) => {
  const router = useRouter();
  const { data: dogList = [] } = useGetDogList();
  const representativeDog = dogList?.find((dog) => dog.representative);

  const { dogInfo, setDogInfo } = useHealthNoteStore();
  const dogImageUrl = dogInfo?.imageUrl ? dogInfo.imageUrl : DogIcon;

  const { isOpen, onClose, onToggle } = useModal();
  const { mutate: updateTargetDogMutate } = useUpdateRepresentativeDog();
  console.log("dogList", dogList);
  console.log("doginfo", dogInfo);

  useEffect(() => {
    if (representativeDog) {
      setDogInfo({
        dogId: representativeDog.id,
        name: representativeDog.name,
        imageUrl: representativeDog.pictureUrl,
      });
    }
  }, [dogList, setDogInfo, representativeDog]);

  const handleShowDogList = () => {
    if (dogList.length === 0) {
      router.push("/health-note/dogs/create");
    } else {
      onToggle();
    }
  };

  const handleChangeDogInfo = (dogInfo: DogInfo) => {
    setDogInfo(dogInfo);
  };

  const handleCloseChangeDogInfo = () => {
    if (dogInfo?.dogId) {
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
            {dogList.length === 0 ? "반려견 등록" : dogInfo?.name}
          </DefaultText>
          <SvgIcon src={ChevronDown} style={{ transform: "rotate(180deg)" }} />
        </button>
      </header>
      {dogList && isOpen && (
        <BottomSheet isOpen={isOpen} onClose={handleCloseChangeDogInfo}>
          <div className={styles.selectBottomSheetHeader}>
            <DefaultText type="title4">반려견 선택</DefaultText>
            <Link href="/health-note/dogs">
              <DefaultText type="label4" color="gray500">
                전체보기
              </DefaultText>
            </Link>
          </div>
          <div className={styles.selectBottomSheetBox}>
            {dogList.map((dog, index) => {
              const active = dog.id === Number(dogInfo?.dogId) || false;
              return (
                <Fragment key={dog.id}>
                  <button
                    className={styles.selectDogButton}
                    onClick={() =>
                      handleChangeDogInfo({
                        dogId: dog.id,
                        name: dog.name,
                        imageUrl: dog?.pictureUrl,
                      })
                    }
                  >
                    <div className={styles.selectBottomSheetDogInfo}>
                      <Image
                        src={dog?.pictureUrl || DogIcon}
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
                  {dogList.length !== index + 1 && (
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
              <DefaultText type="headline3" className={createDogButton}>
                <SvgIcon src={PlusIcon} />
                새로운 아이 등록하기
              </DefaultText>
            }
            onPrimaryClick={() => router.push("/health-note/dogs/create")}
            position="sticky"
          />
        </BottomSheet>
      )}
    </>
  );
};

export default HealthNoteMainHeader;

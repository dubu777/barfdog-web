import { commonWrapper } from "@/styles/common.css";
import Image from "next/image";
import * as styles from "./PetCard.css";
import DefaultText from "@/components/common/defaultText/DefaultText";
import Chips from "@/components/common/chips/Chips";
import SvgIcon from "@/components/common/svgIcon/SvgIcon";
import FemaleIcon from "public/images/subscription/female.svg";
import MaleIcon from "public/images/subscription/male.svg";
import EditIcon from "public/images/subscription/pen.svg";
import { getAgeFromBirth } from "@/utils/getAgeFromBirth";
import DefaultImage from "public/images/subscription/dog-default-profile.png";
import Button from "@/components/common/button/Button";
import useModal from "@/hooks/useModal";
import PetEditModal from "@/components/common/modal/pets/edit/PetEditModal";
import { BreedInfo } from "@/types/pet";
import { useRouter } from "next/navigation";

interface PetCardProps {
  petId: number;
  profileImageUrl: string | null;
  name: string;
  gender: string;
  birthDay: string;
  breedInfo: BreedInfo;
  isSubscribing: boolean;
  reportId: number | null;
}

export default function PetCard({
  petId,
  profileImageUrl,
  name,
  gender,
  birthDay,
  breedInfo,
  isSubscribing,
  reportId,
}: PetCardProps) {
  const age = getAgeFromBirth(birthDay);
  const router = useRouter();
  const handleGoToSurvey = () => {
    window.location.href = `/diet-analysis/survey?petName=${name}&petId=${petId}&gender=${gender}`;
  };
  const {
    isOpen: isPetEditModalOpen,
    onClose: onPetEditModalClose,
    onToggle: onPetEditModalToggle,
  } = useModal();

  return (
    <div className={styles.dogCardContainer}>
      <div className={commonWrapper({ gap: 12 })}>
        <Image
          className={styles.profileImageStyle}
          src={profileImageUrl ?? DefaultImage}
          alt="반려견 프로필"
          width={76}
          height={76}
          priority
        />
        <div
          className={commonWrapper({
            direction: "col",
            gap: 4,
            align: "start",
            justify: "center",
          })}
        >
          <div className={commonWrapper({ justify: "between" })}>
            <div className={commonWrapper({ justify: "start", gap: 6 })}>
              <DefaultText type="headline1">{name}</DefaultText>
              {isSubscribing && (
                <Chips variant="solid" color="gray900" borderRadius="lg">
                  구독중
                </Chips>
              )}
            </div>
            <SvgIcon
              src={EditIcon}
              size={28}
              color="gray500"
              onClick={onPetEditModalToggle}
            />
          </div>
          <div className={commonWrapper({ justify: "start", gap: 6 })}>
            <SvgIcon
              src={gender === "FEMALE" ? FemaleIcon : MaleIcon}
              size={18}
            />
            <DefaultText type="body3" color="gray600">
              {breedInfo.name}
            </DefaultText>
          </div>
          <DefaultText type="body3" color="gray600">
            {age}
          </DefaultText>
        </div>
      </div>
      <div className={commonWrapper({ gap: 8 })}>
        <Button
          type="assistive"
          variant="outline"
          textColor="gray900"
          borderColor="gray300"
          size="sm"
          onClick={() => router.push(`/diet-analysis/result/${reportId}`)}
          fullWidth
        >
          맞춤 결과 확인
        </Button>
        <Button
          type="assistive"
          variant="outline"
          textColor="red"
          borderColor="red"
          size="sm"
          fullWidth
          onClick={handleGoToSurvey}
        >
          다시 추천 받기
        </Button>
      </div>
      {isPetEditModalOpen && (
        <PetEditModal
          key={petId}
          petId={petId}
          profileImageUrl={profileImageUrl}
          breedInfo={breedInfo}
          name={name}
          gender={gender}
          birthDay={birthDay}
          isOpen={isPetEditModalOpen}
          onClose={onPetEditModalClose}
        />
      )}
    </div>
  );
}

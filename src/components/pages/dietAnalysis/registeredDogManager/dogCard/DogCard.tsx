import { commonWrapper } from "@/styles/common.css";
import Image from "next/image";
import * as styles from "./DogCard.css";
import DefaultText from "@/components/common/defaultText/DefaultText";
import Chips from "@/components/common/chips/Chips";
import SvgIcon from "@/components/common/svgIcon/SvgIcon";
import FemaleIcon from "public/images/subscription/female.svg";
import MaleIcon from "public/images/subscription/male.svg";
import EditIcon from "public/images/subscription/pen.svg";
import { getAgeFromBirth } from "@/utils/getAgeFromBirth";
import DefaultImage from "public/images/mypage/user-profile.svg";
import Button from "@/components/common/button/Button";

interface DogCardProps {
  dogId: number;
  profileImageUrl?: string | null;
  dogType: string;
  name: string;
  gender: string;
  birthDate: string;
  weight: number;
  subscribeStatus: string;
}

export default function DogCard({
  dogId,
  profileImageUrl,
  dogType,
  name,
  gender,
  birthDate,
  weight,
  subscribeStatus,
}: DogCardProps) {
  // subscribeStatus 상태 어떤게 있는지 여부에 따라 렌더링
  const age = getAgeFromBirth(birthDate);

  return (
    <div className={styles.dogCardContainer}>
      <div className={commonWrapper({ gap: 12 })}>
        {profileImageUrl ? (
          <Image
            className={styles.profileImageStyle}
            src={profileImageUrl}
            alt="반려견 프로필"
            width={76}
            height={76}
            priority
          />
        ) : (
          <SvgIcon src={DefaultImage} size={76} color="red" />
        )}
        <div
          className={commonWrapper({
            direction: "col",
            gap: 4,
            align: "start",
            justify: "center",
          })}
        >
          <div className={commonWrapper({ justify: "between"})}>
            <div className={commonWrapper({ justify: "start", gap: 6 })}>
            <DefaultText type="headline1">{name}</DefaultText>
            <Chips variant="solid" color="gray900" borderRadius="lg">
              {subscribeStatus}
            </Chips>
            </div>
            <SvgIcon src={EditIcon} size={32} color="gray500" />
          </div>
          <div className={commonWrapper({ justify: "start", gap: 6 })}>
            <SvgIcon
              src={gender === "FEMALE" ? FemaleIcon : MaleIcon}
              size={18}
            />
            <DefaultText type="body3" color="gray600">
              {dogType}
            </DefaultText>
          </div>
          <DefaultText type="body3" color="gray600">
            {age} | {weight}kg
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
        >
          다시 추천 받기
        </Button>
      </div>
    </div>
  );
}

"use client";

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
import { BreedInfo } from "@/types/pet";
import { useRouter } from "next/navigation";
import { ReactNode } from "react";

interface PetCardProps {
  petId: number;
  profileImageUrl: string | null;
  name: string;
  gender: string;
  birthDay: string;
  breedInfo: BreedInfo;
  isSubscribing: boolean;
  isRepresentative: boolean;
  actionSlot: ReactNode;
  source: "health-note" | "diet-analysis";
}

export default function PetCard({
  petId,
  profileImageUrl,
  name,
  gender,
  birthDay,
  breedInfo,
  isSubscribing,
  isRepresentative,
  actionSlot,
  source,
}: PetCardProps) {
  const age = getAgeFromBirth(birthDay);
  const router = useRouter();

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
              {isRepresentative && source === "health-note" && (
                <Chips variant="outlined" color="red" borderRadius="lg">
                  대표견
                </Chips>
              )}
            </div>
            <SvgIcon
              src={EditIcon}
              size={28}
              color="gray500"
              onClick={() => router.push(`/pet/${petId}`)}
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
      {actionSlot}
    </div>
  );
}

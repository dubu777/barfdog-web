"use client";

import { useRouter } from "next/navigation";
import * as styles from "./HealthNoteMainHeader.css";
import DefaultText from "@/components/common/defaultText/DefaultText";
import DogIcon from "/public/images/healthNote/dogIcon.png";
import Image from "next/image";
import { petImage } from "../../common/HealthNoteCommon.css";

export default function HealthNoteGuestHeader() {
  const router = useRouter();
  return (
    <header className={styles.heathNoteHeaderContainer}>
      <Image
        src={DogIcon}
        alt="대표 반려견"
        width={40}
        height={40}
        className={petImage({ borderRadius: "lg" })}
      />
      <button
        onClick={() => router.push("/pet/create?source=health-note")}
        className={styles.selectButton}
      >
        <DefaultText type="headline1">반려견 등록</DefaultText>
      </button>
    </header>
  );
};
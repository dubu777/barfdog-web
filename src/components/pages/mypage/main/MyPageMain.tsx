'use client';
import { useEffect } from "react";
import * as styles from "./MyPageMain.css";
import Image from "next/image";
import NoImage from "/public/images/icons/noImage.png";
import EditButton from "/public/images/icons/edit.svg";
import Badge from "@/components/common/badge/Badge";
import DogList from "@/components/pages/mypage/main/dogList/DogList";
import MyPageMenu from "@/components/pages/mypage/main/menuLink/MenuLink";
import { MyPageMemberDto, MyPageRepresentiveDogDto } from "@/types/myPage";
import { useAuthStore } from "@/store/useAuthStore";
import { useGetMypageInfo } from "@/api/queries/useGetMypageInfo";
import { useGetDogs } from "@/api/queries/useGetDogs";

const MyPageMain = () => {
  const { data: myPageData } = useGetMypageInfo();
  const { data: dogsData } = useGetDogs();

  const userData: MyPageMemberDto = myPageData.mypageMemberDto;
  const representativeDogData: MyPageRepresentiveDogDto = myPageData.mypageRepresentiveDogDto;
  const { setUserInfo } = useAuthStore();

  useEffect(() => {
    if (userData) {
      setUserInfo(userData)
    }
  }, [userData, setUserInfo])

  return (
    <section className={styles.mainContainer}>
      <article className={styles.userInfoBox}>
        <Image src={NoImage} alt='사용자 이미지' width={89} height={89} />
        <div>
          <p className={styles.infoText({ type: 'parents', })}>{representativeDogData.dogName} 보호자</p>
          <h2 className={styles.infoText({ type: 'username', })}>
            <b className={styles.infoText({ size: 'lg' })}>{userData.memberName}</b> 님
            <Badge>{userData.grade}</Badge>
          </h2>
          <p className={styles.infoText({ type: 'email' })}>email@gmail.com</p>
        </div>
        <button className={styles.editMypageButton}>
          <EditButton />
        </button>
      </article>
      <DogList dogsData={dogsData} />
      <div className={styles.myPageBanner}>
        광고 배너
      </div>
      <MyPageMenu />
    </section>
  );
};

export default MyPageMain;
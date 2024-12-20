'use client';
import * as styles from "./MypageInfo.css";
import Image from "next/image";
import Badge from "@/components/common/badge/Badge";
import NoImage from "/public/images/icons/noImage.png";
import EditButton from "/public/images/icons/edit.svg";
import {useGetMyPageInfo} from "@/api/mypage/queries/useGetMypageInfo";
import {MyPageMemberDto, MyPageRepresentativeDogDto} from "@/types";
import {useAuthStore} from "@/store/useAuthStore";
import {useEffect} from "react";

const MyPageInfo = () => {
  const { data: myPageData } = useGetMyPageInfo();

  const userData: MyPageMemberDto = myPageData.mypageMemberDto;
  const representativeDogData: MyPageRepresentativeDogDto = myPageData.mypageRepresentiveDogDto;
  const { setUserInfo } = useAuthStore();

  useEffect(() => {
    if (userData) {
      setUserInfo(userData)
    }
  }, [userData, setUserInfo])
  return (
    <article className={styles.userInfoBox}>
      <Image src={NoImage} alt='사용자 이미지' width={89} height={89} />
      <div>
        <p className={styles.infoText({ type: 'parents', })}>{representativeDogData?.dogName} 보호자</p>
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
  );
};

export default MyPageInfo;
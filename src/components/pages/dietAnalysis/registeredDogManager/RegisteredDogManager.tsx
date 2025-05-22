"use client";

import Button from "@/components/common/button/Button";
import DefaultText from "@/components/common/defaultText/DefaultText";
import SvgIcon from "@/components/common/svgIcon/SvgIcon";
import { commonWrapper } from "@/styles/common.css";
// import * as styles from "./RegisteredDogManager.css";
import AddIcon from "public/images/icons/add-circle.svg";
import DogCard from "./dogCard/DogCard";
import { useInfiniteList } from "@/hooks/useInfiniteList";
import { DogData } from "@/types";

interface RegisteredDogManagerProps {
  dogListData: DogData[];
}

export default function RegisteredDogManager({dogListData}: RegisteredDogManagerProps) {
  console.log(dogListData, "dog");

  // 무한 스크롤 - 서버와 연동해서 구현한 무한 스크롤은 아니고, 데이터는 한번에 받아오고, 10개씩 렌더링 하게 구현
  const [visibleDogs, loadMoreRef] = useInfiniteList(dogListData, {
    pageSize: 10,
    rootMargin: "50px",
  });

  const handleNavigateToSurvey = () => {
    window.location.href = "/diet-analysis/survey";
  }
  return (
    <div
      className={commonWrapper({
        direction: "col",
        backgroundColors: "gray50",
        gap: 20,
        padding: 20,
      })}
    >
      <Button type="assistive" variant="outline" size="lg" fullWidth onClick={handleNavigateToSurvey}>
        <div className={commonWrapper({ gap: 6 })}>
          <SvgIcon src={AddIcon} />
          <DefaultText type="headline3">새로운 아이 등록하기</DefaultText>
        </div>
      </Button>
      <div className={commonWrapper({ direction: "col", gap: 12 })}>
        {visibleDogs.map((item) => (
          <DogCard
            key={item.id}
            dogId={item.id}
            profileImageUrl={item.pictureUrl}
            dogType={"말티즈"}
            name={item.name}
            gender={item.gender}
            birthDate={"2019-05-12"}
            weight={7.4}
            subscribeStatus={item.subscribeStatus}
          />
        ))}
      </div>
      {visibleDogs.length < dogListData.length && (
        <div ref={loadMoreRef}>
          <DefaultText type="body3">불러오는 중…</DefaultText>
        </div>
      )}
    </div>
  );
}

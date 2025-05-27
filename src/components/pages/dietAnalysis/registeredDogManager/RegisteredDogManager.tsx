"use client";
import { useRouter } from "next/navigation";
import DefaultText from "@/components/common/defaultText/DefaultText";
import { commonWrapper } from "@/styles/common.css";
// import * as styles from "./RegisteredDogManager.css";
import DogCard from "./dogCard/DogCard";
import { useInfiniteList } from "@/hooks/useInfiniteList";
import { DogListData } from "@/types";
import CreateDogButton from "@/components/pages/heathNote/common/createDogButton/CreateDogButton";

interface RegisteredDogManagerProps {
  dogListData: DogListData[];
}

export default function RegisteredDogManager({
  dogListData,
}: RegisteredDogManagerProps) {
  console.log(dogListData, "dog");
  const router = useRouter();
  // 무한 스크롤 - 서버와 연동해서 구현한 무한 스크롤은 아니고, 데이터는 한번에 받아오고, 10개씩 렌더링 하게 구현
  const [visibleDogs, loadMoreRef] = useInfiniteList(dogListData, {
    pageSize: 10,
    rootMargin: "50px",
  });

  return (
    <div
      className={commonWrapper({
        direction: "col",
        backgroundColors: "gray50",
        gap: 20,
        padding: 20,
      })}
    >
      <CreateDogButton from="dietAnalysis" />
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

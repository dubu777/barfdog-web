"use client";
import DefaultText from "@/components/common/defaultText/DefaultText";
import { commonWrapper } from "@/styles/common.css";
// import * as styles from "./RegisteredDogManager.css";
import DogCard from "./dogCard/DogCard";
import { useInfiniteList } from "@/hooks/useInfiniteList";
import CreateButton from "@/components/common/createButton/CreateButton";
import { useGetDogList } from "@/api/dog/queries/useGetDogList";
import EmptyIcon from "public/images/dietAnalysis/empty-pet.svg";
import Button from "@/components/common/button/Button";
import { dietAnalysisMainContainer } from "./DietAnalysisMain.css";
import { useGetPetList } from "@/api/pet/queries/useGetPetList";

export default function DietAnalysisMain() {
  const { data: dogListData = [] } = useGetDogList();
  const { data: petList = [] } = useGetPetList();
  console.log(petList, "petList");
  // 무한 스크롤 - 서버와 연동해서 구현한 무한 스크롤은 아니고, 데이터는 한번에 받아오고, 10개씩 렌더링 하게 구현
  const [visibleDogs, loadMoreRef] = useInfiniteList(dogListData, {
    pageSize: 10,
    rootMargin: "50px",
  });

  return (
    <div className={dietAnalysisMainContainer}>
      {dogListData.length < 1 ? (
        <>
          <div className={commonWrapper({ direction: "col", gap: 12 })}>
            <EmptyIcon />
            <DefaultText type="title2">멍...</DefaultText>
            <DefaultText type="body2" color="gray600">
              등록된 반려견 리스트가 없어요
              <br />
              반려견을 등록해보세요
            </DefaultText>
          </div>
          <Button buttonColor="gray900" size="md" onClick={() => {}}>
            반려견 등록하기
          </Button>
        </>
      ) : (
        <>
          <CreateButton
            routeType="location"
            url="/diet-analysis/survey"
            text="새로운 아이 등록하기"
          />
          <div className={commonWrapper({ direction: "col", gap: 12 })}>
            {visibleDogs.map((item) => (
              <DogCard
                key={item.id}
                dogId={item.id}
                // reportId={item.reportId}
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
        </>
      )}
    </div>
  );
}

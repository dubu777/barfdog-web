"use client";
import DefaultText from "@/components/common/defaultText/DefaultText";
import { commonWrapper } from "@/styles/common.css";
import DogCard from "./dogCard/DogCard";
import { useInfiniteList } from "@/hooks/useInfiniteList";
import CreateButton from "@/components/common/createButton/CreateButton";
import EmptyIcon from "public/images/dietAnalysis/empty-pet.svg";
import Button from "@/components/common/button/Button";
import { dietAnalysisMainContainer } from "./DietAnalysisMain.css";
import { useGetPetList } from "@/api/pet/queries/useGetPetList";

export default function DietAnalysisMain() {
  const { data } = useGetPetList();

  // 무한 스크롤 - 서버와 연동해서 구현한 무한 스크롤은 아님, 10개씩 렌더링 하게 구현
  const [visibleDogs, loadMoreRef] = useInfiniteList(data.petList, {
    pageSize: 10,
    rootMargin: "50px",
  });
  console.log(data);

  return (
    <div className={dietAnalysisMainContainer}>
      {data.petList.length < 1 ? (
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
                reportId={item.recipeSurveyId}
                profileImageUrl={item.displayImageUrl?.url ?? null}
                dogType={"말티즈"}
                name={item.name}
                gender={item.gender}
                birthDate={item.birthInfo.birthDay}
                isSubscribing={item.isSubscribing}
              />
            ))}
          </div>
          {visibleDogs.length < data.petList.length && (
            <div ref={loadMoreRef}>
              <DefaultText type="body3">불러오는 중</DefaultText>
            </div>
          )}
        </>
      )}
    </div>
  );
}

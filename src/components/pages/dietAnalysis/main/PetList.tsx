import DefaultText from "@/components/common/defaultText/DefaultText";
import { commonWrapper } from "@/styles/common.css";
import CreateButton from "@/components/common/createButton/CreateButton";
import PetCard from "./petCard/PetCard";
import { Pet } from "@/types/pet";
import { RefObject } from "react";

export interface PetListProps {
  /** 표시할 반려견 배열 (무한 스크롤로 잘라낸 리스트) */
  pets: Pet[];
  /** 전체 반려견 수 (더 가져올지 결정용) */
  totalCount: number;
  /** 스크롤 끝 감지용 ref */
  loadMoreRef: RefObject<HTMLDivElement>;
  /** 등록 모달 토글 핸들러 */
  onToggle: () => void;
}

export default function PetList({
  pets,
  totalCount,
  loadMoreRef,
  onToggle,
}: PetListProps) {
  return (
    <div
      className={commonWrapper({
        direction: "col",
        padding: 20,
        gap: 20,
        backgroundColors: "gray50",
        justify: "start",
        minHeight: "fullWithHeader",
      })}
    >
      <CreateButton text="새로운 아이 등록하기" onClick={onToggle} />
      <div
        className={commonWrapper({
          direction: "col",
          gap: 12,
          paddingBottom: 85,
        })}
      >
        {pets.map((item) => (
          <PetCard
            key={item.id}
            reportId={item.recipeSurveyId}
            petId={item.id}
            profileImageUrl={item.displayImageUrl?.url ?? null}
            name={item.name}
            breedInfo={item.breedInfo}
            gender={item.gender}
            birthDay={item.birthInfo.birthDay}
            isSubscribing={item.isSubscribing}
          />
        ))}
      </div>
      {pets.length < totalCount && (
        <div ref={loadMoreRef}>
          <DefaultText type="body3">불러오는 중</DefaultText>
        </div>
      )}
    </div>
  );
}

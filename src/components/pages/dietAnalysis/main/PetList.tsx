"use client";

import Text from "@/components/ui/text/Text";
import { commonWrapper } from "@/styles/common.css";
import CreateButton from "@/components/ui/createButton/CreateButton";
import PetCard from "./petCard/PetCard";
import { Pet } from "@/types/pet";
import React, { ReactNode, RefObject } from "react";

export interface PetListProps {
  /** 표시할 반려견 배열 (무한 스크롤로 잘라낸 리스트) */
  pets: Pet[];
  /** 전체 반려견 수 (더 가져올지 결정용) */
  totalCount: number;
  /** 스크롤 끝 감지용 ref */
  loadMoreRef: RefObject<HTMLDivElement>;
  /** 등록 모달 토글 핸들러 */
  renderCardActions?: (pet: Pet) => ReactNode;
  source: "health-note" | "diet-analysis";
}

export default function PetList({
  pets,
  totalCount,
  loadMoreRef,
  renderCardActions,
  source,
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
      <CreateButton
        text="새로운 아이 등록하기"
        url={`/pet/create?source=${source}`}
      />
      <div
        className={commonWrapper({
          direction: "col",
          gap: 12,
          paddingBottom: 85,
        })}
      >
        {pets.map((pet) => {
          return (
            <PetCard
              key={pet.id}
              petId={pet.id}
              profileImageUrl={pet.displayImageUrl?.url ?? null}
              name={pet.name}
              breedInfo={pet.breedInfo}
              gender={pet.gender}
              birthDay={pet.birthInfo.birthDay}
              isSubscribing={pet.isSubscribing}
              isRepresentative={pet.isRepresentative}
              source={source}
              actionSlot={renderCardActions ? renderCardActions(pet) : null}
            />
          );
        })}
      </div>
      {pets.length < totalCount && (
        <div ref={loadMoreRef}>
          <Text type="body3">불러오는 중</Text>
        </div>
      )}
    </div>
  );
}

"use client";

import { useInfiniteList } from "@/hooks/useInfiniteList";
import { useGetPetList } from "@/api/pet/queries/useGetPetList";
import EmptyPetList from "./EmptyPetList";
import PetList from "./PetList";
import { useRouter } from "next/navigation";
import { Pet } from "@/types/pet";
import { useState } from "react";
import PetCardButton from "./PetCardButton";
import RenewalNoticeBottomSheet from "./RenewalNoticeBottomSheet";

export default function DietAnalysisMain() {
  const router = useRouter();
  const { data } = useGetPetList();
  console.log(data);

  const [noticePet, setNoticePet] = useState<Pet | null>(null);
  // 서버와 연동해서 구현한 무한 스크롤은 아님, 10개씩 렌더링 하게 구현
  const [visibleDogs, loadMoreRef] = useInfiniteList(data, {
    pageSize: 10,
    rootMargin: "50px",
  });

  const handleCreatePet = () => {
    router.push("/pet/create?source=diet-analysis");
  };

  const goSurvey = (pet: Pet) => {
    window.location.href = `/diet-analysis/survey?petName=${encodeURIComponent(
      pet.name
    )}&petId=${pet.id}&gender=${encodeURIComponent(pet.gender)}`;
  };

  const goResultOrOpenSheet = (pet: Pet) => {
    if (pet.recipeSurveyId == null) setNoticePet(pet);
    else router.push(`/diet-analysis/result/${pet.recipeSurveyId}`);
  };

  if (data.length === 0) {
    return <EmptyPetList onCreate={handleCreatePet} />;
  }

  return (
    <>
      <PetList
        pets={visibleDogs}
        totalCount={data.length}
        loadMoreRef={loadMoreRef}
        onCreate={handleCreatePet}
        renderCardActions={(pet) => {
          const isRenewalSurvey = pet.recipeSurveyId != null;
          return (
            <PetCardButton
              showOnlySubscribeButton={!pet.isSubscribing && !isRenewalSurvey}
              isSubscribing={pet.isSubscribing}
              onSurvey={() => goSurvey(pet)}
              onResult={() => goResultOrOpenSheet(pet)}
            />
          );
        }}
      />

      {noticePet && (
        <RenewalNoticeBottomSheet
          isOpen
          onClose={() => setNoticePet(null)}
          onSurvey={() => {
            const pet = noticePet;
            setNoticePet(null);
            if (pet) goSurvey(pet);
          }}
        />
      )}
    </>
  );
}

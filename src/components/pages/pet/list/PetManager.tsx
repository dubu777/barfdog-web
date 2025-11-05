"use client";

import { useInfiniteList } from "@/hooks/useInfiniteList";
import { useGetPetList } from "@/api/pet/queries/useGetPetList";
import Button from "@/components/ui/button/Button";
import PetList from "@/components/pages/dietAnalysis/main/PetList";
import { useUpdateRepresentativePet } from "@/api/pet/mutations/useUpdateRepresentativePet";
import { useToastStore } from "@/store/useToastStore";
import { useMemo } from "react";
import Header from "@/components/layout/header/Header";

export default function PetManager() {
  const { data } = useGetPetList();
  const { mutate: updateRepresentative } = useUpdateRepresentativePet();
  const { addToast } = useToastStore();

  const [visibleDogs, loadMoreRef] = useInfiniteList(data, {
    pageSize: 10,
    rootMargin: "50px",
  });

  const sortedVisibleDogs = useMemo(() => {
    const reps = visibleDogs.filter((p) => p.isRepresentative);
    const others = visibleDogs.filter((p) => !p.isRepresentative);
    return [...reps, ...others];
  }, [visibleDogs]);

  const handleRepresentative = (petId: number) => {
    updateRepresentative(petId, {
      onSuccess: () => {
        addToast("대표견 설정이 완료됐습니다", "above-button");
      },
      onError: () => {
        addToast("대표견 설정에 실패했습니다", "above-button");
      },
    });
  };

  return (
    <>
    <Header
      centerTitle="반려견 전체보기"
      showBackButton
    />
    <PetList
      pets={sortedVisibleDogs}
      totalCount={data.length}
      loadMoreRef={loadMoreRef}
      source="health-note"
      renderCardActions={(pet) => {
        if (pet.isRepresentative) return null;
        return (
          <Button
            variant="outline"
            size="sm"
            onClick={() => handleRepresentative(pet.id)}
          >
            대표견 설정
          </Button>
        );
      }}
    />
    </>
  );
}

"use client";

import { useInfiniteList } from "@/hooks/useInfiniteList";
import { useGetPetList } from "@/api/pet/queries/useGetPetList";
import { useRouter } from "next/navigation";
import Button from "@/components/common/button/Button";
import PetList from "@/components/pages/dietAnalysis/main/PetList";
import { useUpdateRepresentativePet } from "@/api/pet/mutations/useUpdateRepresentativePet";
import { useToastStore } from "@/store/useToastStore";
import { useMemo } from "react";

export default function PetManager() {
  const router = useRouter();
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

  const handleCreatePet = () => {
    router.push("/pet/create?source=health-note");
  };

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
    <PetList
      pets={sortedVisibleDogs}
      totalCount={data.length}
      loadMoreRef={loadMoreRef}
      onCreate={handleCreatePet}
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
  );
}

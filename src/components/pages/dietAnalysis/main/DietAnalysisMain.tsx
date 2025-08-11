"use client";

import { useInfiniteList } from "@/hooks/useInfiniteList";
import { useGetPetList } from "@/api/pet/queries/useGetPetList";
import EmptyPetList from "./EmptyPetList";
import PetList from "./PetList";
import { useRouter } from "next/navigation";

export default function DietAnalysisMain() {
  const router = useRouter();
  const { data } = useGetPetList();
  console.log(data);

  // 서버와 연동해서 구현한 무한 스크롤은 아님, 10개씩 렌더링 하게 구현
  const [visibleDogs, loadMoreRef] = useInfiniteList(data, {
    pageSize: 10,
    rootMargin: "50px",
  });

  const handleCreatePet = () => {
    router.push("/pet/create?source=diet-analysis");
  };

  if (data.length === 0) {
    return <EmptyPetList onCreate={handleCreatePet} />;
  }

  return (
    <PetList
      pets={visibleDogs}
      totalCount={data.length}
      loadMoreRef={loadMoreRef}
      onCreate={handleCreatePet}
    />
  );
}

"use client";

import { useInfiniteList } from "@/hooks/useInfiniteList";
import { useGetPetList } from "@/api/pet/queries/useGetPetList";
import useModal from "@/hooks/useModal";
import PetCreateModal from "@/components/common/modal/pets/create/PetCreateModal";
import EmptyPetList from "./EmptyPetList";
import PetList from "./PetList";

export default function DietAnalysisMain() {
  const { data } = useGetPetList();

  // 서버와 연동해서 구현한 무한 스크롤은 아님, 10개씩 렌더링 하게 구현
  const [visibleDogs, loadMoreRef] = useInfiniteList(data, {
    pageSize: 10,
    rootMargin: "50px",
  });

  const {
    isOpen: isPetCreateModalOpen,
    onClose: onPetCreateModalClose,
    onToggle: onPetCreateModalToggle,
  } = useModal();
  console.log(data.length);

  return (
    <>
      {data.length < 0 ? (
        <EmptyPetList />
      ) : (
        <PetList
          pets={visibleDogs}
          totalCount={data.length}
          loadMoreRef={loadMoreRef}
          onToggle={onPetCreateModalToggle}
        />
      )}
      {isPetCreateModalOpen && (
        <PetCreateModal
          isOpen={isPetCreateModalOpen}
          onClose={onPetCreateModalClose}
        />
      )}
    </>
  );
}

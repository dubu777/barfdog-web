"use client";
import { commonWrapper } from "@/styles/common.css";
import CreateDogCard from "@/components/pages/heathNote/common/createDogCard/CreateDogCard";
import TopSurveyMenu from "./menu/TopSurveyMenu";
import ServiceMenu from "./menu/ServiceMenu";
import { useGetPetList } from "@/api/pet/queries/useGetPetList";

export default function HealthNoteUser() {
  const { data: petList = [] } = useGetPetList();
  const petInfo = petList?.find((pet) => pet.isRepresentative);

  return (
    <section className={commonWrapper({
      minHeight: 'fullWithHeader',
      paddingX: 20,
      paddingTop: 32,
      paddingBottom: 85,
      direction: 'col',
      align: 'start',
      justify: 'start',
      gap: 32,
    })}>
      {petList?.length > 0 ? (
        <>
          <TopSurveyMenu petId={petInfo?.id} />
          {petInfo && <ServiceMenu petId={petInfo.id} />}
        </>
      ) : (
        <CreateDogCard buttonLabel="반려견 추가하기" />
      )}
    </section>
  );
}

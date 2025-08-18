"use client";
import { useMemo, useState } from "react";
import * as styles from "./Dogpedia.css";
import ArrowRightIcon from "/public/images/icons/chevron-right-blue.svg";
import SvgIcon from "@/components/common/svgIcon/SvgIcon";
import DefaultText from "@/components/common/defaultText/DefaultText";
import SearchableSelector from "@/components/common/searchableSelector/SearchableSelector";
import DogpediaDetail from "@/components/pages/heathNote/dogpedia/detail/DogpediaDetail";
import { Option } from "@/types";
import { useGetBreedList } from "@/api/healthNote/dogpidea/queries/useGetBreedList";
import { useGetPetDetail } from "@/api/pet/queries/useGetPetDetail";

interface DogpediaProps {
  petId: number;
}

export default function Dogpedia({ petId }: DogpediaProps) {
  const { data } = useGetBreedList();
  const { data: petInfo } = useGetPetDetail(petId);

  // 건강수첩 메인에서 선택한 대표 반려견의 breed initialValue값 적용
  const petBreedId = useMemo(() => {
    if (!data || !petInfo || !petInfo.breedInfo) return null;
    const found = data.find(breed => breed.breedName === petInfo.breedInfo.name);
    return found ? found.breedId : null;
  }, [data, petInfo]);

  const [selectedBreedId, setSelectedBreedId] = useState<number | null>(petBreedId);

  const DOGPEDIA_OPTIONS: Option<number>[] = useMemo(() => {
    return data.map((breed) => ({
      label: breed.breedName,
      value: breed.breedId,
    }));
  }, [data]);

  const handleSelect = (value) => {
    setSelectedBreedId(Number(value));
    window.scrollTo(0, 0);
  };

  return (
    <>
      {selectedBreedId === null || !petInfo ? (
        <section className={styles.searchDogContainer}>
          <DefaultText type="title3">
            궁금한 견종이 있으신가요?
            <br />
            지금 바로 검색해 보세요
          </DefaultText>
          <div className={styles.searchableSelector}>
            <SearchableSelector
              placeholder="견종을 검색해 보세요"
              onChange={handleSelect}
              options={DOGPEDIA_OPTIONS}
              selectedValue={selectedBreedId}
              className={styles.searchableSelectorButton}
              type="button"
              rightElement={<SvgIcon src={ArrowRightIcon} />}
              emptyElement={
                <div className={styles.searchableSelectorEmpty}>
                  <DefaultText type="label1" color="gray700" align="center">
                    앗, 현재 등록되지 않은 견종이에요!
                    <br />
                    다른 견종을 검색해 보세요!
                  </DefaultText>
                </div>
              }
            />
          </div>
        </section>
      ) : (
        <DogpediaDetail
          breedId={selectedBreedId}
          setSelectedBreedId={setSelectedBreedId}
        />
      )}
    </>
  );
}

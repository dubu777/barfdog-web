import { commonWrapper } from "@/styles/common.css";
import { useMemo } from "react";
import InputField from "@/components/ui/inputField/InputField";
import Divider from "@/components/ui/divider/Divider";
import BreedDefaultInfo from "@/components/pages/heathNote/dogpedia/detail/breedDefaultInfo/BreedDefaultInfo";
import BreedCategoryTabs from "@/components/pages/heathNote/dogpedia/detail/breedCategoryTabs/BreedCategoryTabs";
import BreedDetailInfo from "@/components/pages/heathNote/dogpedia/detail/breedDetailInfo/BreedDetailInfo";
import { useGetBreedDetail } from "@/api/healthNote/dogpidea/queries/useGetBreedDetail";

interface DogpediaDetailProps {
  breedId: number;
  setSelectedBreedId: (value: null) => void;
}

export default function DogpediaDetail({
  breedId,
  setSelectedBreedId,
}: DogpediaDetailProps) {
  const { data } = useGetBreedDetail(breedId);

  const breedDefaultInfo = useMemo(() => {
    return {
      ...data.physicalSpec,
      name: data.name,
      temperament: data.characteristics.temperament,
      imageUrl: data.imageUrl,
    };
  }, [data]);

  const breedCategoryTabData = useMemo(() => {
    const { temperament, ...rest } = data.characteristics;
    const breedCharacteristicsInfo = { ...rest };
    return {
      ...breedCharacteristicsInfo,
      furType: data.fur.furType,
      furLength: data.fur.furLength,
    };
  }, [data.characteristics, data.fur]);

  if (!data) return null;
  return (
    <section className={commonWrapper({ direction: "col", paddingBottom: 40 })}>
      <article
        className={commonWrapper({
          direction: "col",
          paddingX: 20,
          paddingTop: 16,
          paddingBottom: 32,
          gap: 28,
        })}
      >
        <InputField
          value="다른 견종도 궁금하지 않으신가요?"
          searchButton
          type="button"
          onClick={() => setSelectedBreedId(null)}
        />
        <BreedDefaultInfo data={breedDefaultInfo} />
      </article>
      <BreedCategoryTabs data={breedCategoryTabData} />
      <Divider height={4} color="gray100" />
      <BreedDetailInfo data={data.careInfo} />
    </section>
  );
}

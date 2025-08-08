import * as styles from './DogpediaDetail.css';
import { useMemo } from "react";
import InputField from "@/components/common/inputField/InputField";
import Divider from "@/components/common/divider/Divider";
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
	}, [data])

	const breedCategoryTabData = useMemo(() => {
		const { temperament, ...rest } = data.characteristics;
		const breedCharacteristicsInfo = { ...rest };
		return {
			...breedCharacteristicsInfo,
			furType: data.fur.furType,
			furLength: data.fur.furLength,
		};
	}, [data.characteristics, data.fur])

	if(!data) return null;
	return (
		<>
			<section className={styles.dogpediaContainer}>
				<InputField
					value='다른 견종도 궁금하지 않으신가요?'
					searchButton
					type='button'
					onClick={() => setSelectedBreedId(null)}
				/>
				<BreedDefaultInfo data={breedDefaultInfo} />
			</section>
			<BreedCategoryTabs data={breedCategoryTabData}/>
			<Divider thickness={4} color='gray100' />
			<BreedDetailInfo data={data.careInfo} />
		</>
	);
};
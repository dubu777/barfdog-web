import {BREED_CHARACTERISTICS_CATEGORY, FUR_LENGTH, FUR_TYPE} from "@/constants/healthNote/dogpedia";

interface Breed {
	breedId: number;
	breedName: string;
}

type BreedList = Breed[];

interface BreedPhysicalSpec {
	minHeightCm: number;
	maxHeightCm: number;
	minWeightKg: number;
	maxWeightKg: number;
	minLifespanYear: number;
	maxLifespanYear: number;
}

interface BreedCharacteristics {
	temperament: string;
	affectionLevel: number;       // 가족을 얼마나 좋아할까요
	childFriendlyLevel: number;   // 아이들과 잘 지낼까요
	petFriendlyLevel: number;     // 다른 강아지와 친구가 될까요
	sheddingLevel: number;    // 털 빠짐
	groomingLevel: number;    // 털 저일
	droolingLevel: number;    // 침 흘림
	strangerFriendlyLevel: number;// 낯선 사람을 보면
	playfulnessLevel: number; // 장난기
	guardingLevel: number;    // 집 잘 지키나
	adaptabilityLevel: number;// 새로운 환경 적응하나
	trainabilityLevel: number;// 훈련 잘 따라오나
	activityLevel: number;    // 운동 좋아하나
	barkingLevel: number;     // 얼마나 자주 짖나
	stimulusLevel: number;     // 머리 쓰는 놀이 좋아하나
}

type BreedCharacteristicsCategory = keyof typeof BREED_CHARACTERISTICS_CATEGORY;

type FurType = keyof typeof FUR_TYPE;
type FurLength = keyof typeof FUR_LENGTH;

interface BreedFur {
	furType: FurType;
	furLength: FurLength;
}

interface BreedCareInfo {
	healthInfo: string; //건강
	diseaseInfo: string; //유전 질환
	groomingInfo: string; // 그루밍
	activityInfo: string; // 운동
	trainingInfo: string; // 훈련
	nutritionInfo: string; // 영양섭취
}

interface BreedDetail {
	id: number;
	name: string;
	imageUrl: string;
	physicalSpec: BreedPhysicalSpec;
	characteristics: BreedCharacteristics;
	fur: BreedFur;
	careInfo: BreedCareInfo;
}

export type {
	BreedList,
	BreedDetail,
	BreedPhysicalSpec,
	BreedCharacteristics,
	BreedCharacteristicsCategory,
	BreedFur,
	FurType,
	FurLength,
	BreedCareInfo,
}
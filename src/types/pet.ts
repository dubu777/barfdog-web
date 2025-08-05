interface PetListResponse {
  petList: Pet[];
}

interface Pet {
  id: number;
  recipeSurveyId?: number;
  name: string;
  gender: "MALE" | "FEMALE";
  displayImageUrl: string | null;
  isRepresentative: boolean;
  isSubscribing: boolean;
  isLegacyBreed: boolean;
  isLegacyBirthday: boolean;
  breedInfo: BreedInfo;
  birthInfo: BirthInfo;
  subscribeInfo: SubscribeInfo;
}

interface BreedInfo {
  id: number | null;
  name: string;
  isLegacy: boolean;
}

interface BirthInfo {
  birthDay: string;
  rawBirthDay: string;
  years: number;
  months: number;
  days: number;
  isLegacy: boolean;
}

interface SubscribeInfo {
  id: number | null;
  status: string | null;
  subscribing: boolean;
}

export type { PetListResponse, Pet };

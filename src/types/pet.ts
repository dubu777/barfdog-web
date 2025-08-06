interface PetListResponse {
  petList: Pet[];
}

interface Pet {
  id: number;
  recipeSurveyId: number | null;
  name: string;
  gender: "MALE" | "FEMALE";
  displayImageUrl: DisplayImageUrl | null;
  isRepresentative: boolean;
  isSubscribing: boolean;
  isLegacyBreed: boolean;
  isLegacyBirthday: boolean;
  breedInfo: BreedInfo;
  birthInfo: BirthInfo;
  subscribeInfo: SubscribeInfo;
}

interface DisplayImageUrl {
  url: string;
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

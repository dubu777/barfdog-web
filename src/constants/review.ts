export { REVIEW_STATUS, REVIEW_TYPE, REVIEW_PET_LIFE_INTERESTS };

const REVIEW_STATUS = {
  REQUEST: '승인대기',
  RETURN: '반려',
  APPROVAL: '승인',
  ADMIN: '관리자',
} as  const;

const REVIEW_TYPE = {
  ITEM: '일반상품',
  SUBSCRIBE: '정기구독',
} as const;

const REVIEW_PET_LIFE_INTERESTS = {
  healthCareService: '헬스 케어 서비스',
  culturalFacilities: '전용 문화 시설',
  seniorDogCare: '노령견 케어 및 관리',
} as const;
export { DOG_SIZE, DOG_GENDER };

const DOG_SIZE = {
	LARGE: '대형견',
	MIDDLE: '중형견',
	SMALL: '소형견',
} as const;

const DOG_GENDER = {
	MALE: '수컷',
	FEMALE: '암컷',
} as const;
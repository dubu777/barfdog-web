const DOGPEDIA_CATEGORY: Record<string, string> = {
	FAMILY_LIFE: '가족',
	PHYSICAL: '신체',
	SOCIAL: '사회성',
	PERSONALITY: '성격',
}

const DOGPEDIA_CATEGORY_QUESTION = {
	FAMILY_LIFE: {
		AFFECTION_WITH_FAMILY: {
			label: '가족을 얼마나 좋아할까요?',
			minLevel: '혼자 있는게 좋아요',
			maxLevel: '가족과 붙어 있는게 좋아요',
		},
		GOOD_WITH_KIDS: {
			label: '아이들과 잘 지낼까요?',
			minLevel: '함께하기 어려워요',
			maxLevel: '아이들과 노는 게 좋아요',
		},
		GOOD_WITH_OTHER_DOGS: {
			label: '다른 강아지와 친구가 될까요?',
			minLevel: '혼자 있는게 편해요',
			maxLevel: '친구들과 노는걸 좋아해요',
		},
	},
	PHYSICAL: {
		SHEDDING_LEVEL: {
			label: '털이 많이 빠질까요?',
			minLevel: '털이 거의 안빠져요',
			maxLevel: '털이 많이 빠져요',
		},
		GROOMING_FREQUENCY: {
			label: '털 관리는 얼마나 필요할까요?',
			minLevel: '가끔 손질만 해주세요',
			maxLevel: '매일 빗겨주고 손질해줘요',
		},
		DROOLING_LEVEL: {
			label: '침을 많이 흘리나요?',
			minLevel: '침을 거의 안흘려요',
			maxLevel: '치므 조그 마니 흐려요...',
		},
	},
	SOCIAL: {
		OPENNESS_TO_STRANGERS: {
			label: '낯선 사람을 보면?',
			minLevel: '낯을 많이 가려요',
			maxLevel: '누구나 인사할 수 있어요!',
		},
		PLAYFULNESS: {
			label: '장난꾸러기일까요?',
			minLevel: '차분히 쉬는게 좋아요',
			maxLevel: '장난치는거 너무 좋아요!',
		},
		WATCHDOG_PROTECTIVE_NATURE: {
			label: '집을 잘 지킬 수 있나요?',
			minLevel: '누구든 환영이에요',
			maxLevel: '우리집은 내가 지켜요!',
		},
		ADAPTABILITY: {
			label: '새로운 환경에 잘 적응할까요?',
			minLevel: '익숙한 환경이 좋아요',
			maxLevel: '어디든 금방 적응해요!',
		},
	},
	PERSONALITY: {
		TRAINABILITY: {
			label: '훈련을 잘 따라올까요?',
			minLevel: '따라가는게 어려워요',
			maxLevel: '훈련을 잘 따라와요',
		},
		ENERGY_LEVEL: {
			label: '운동을 좋아하나요?',
			minLevel: '짧은 산책이면 충분해요',
			maxLevel: '하루 종일 뛰어놀고 싶어요!',
		},
		BARKING_LEVEL: {
			label: '얼마나 자주 짖나요?',
			minLevel: '필요한 순간에만 짖어요',
			maxLevel: '다양한 이유로 자주 짖어요',
		},
		MENTAL_STIMULATION_NEEDS: {
			label: '머리를 쓰는 놀이를 좋아하나요?',
			minLevel: '가만히 있어도 행복해요',
			maxLevel: '새로운 자극이 너무 좋아요!',
		},
	},
} as const;

const COAT_TYPE = {

}



const COAT_LENGTH = {

}


export {
	DOGPEDIA_CATEGORY,
	DOGPEDIA_CATEGORY_QUESTION,
}
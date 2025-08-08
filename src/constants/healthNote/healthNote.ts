import FullCheckImage from '/public/images/healthNote/main/full-check.png';
import BodyCheckImage from '/public/images/healthNote/main/body-check.png';
import HealthCheckImage from '/public/images/healthNote/main/health-check.png';
import GutCheckImage from '/public/images/healthNote/main/gut-check.png';
import DogPediaImage from '/public/images/healthNote/main/dogpedia.png';

const HEALTH_NOTE_MENU_CATEGORY = [
	{
		label: '건강 종합 진단',
		description: `몇 가지 질문으로 우리 아이의\n건강 상태를 체크할 수 있어요`,
		fullWidth: true,
		url: '/health-note/full-check',
		imageUrl: FullCheckImage,
		width: 140,
		height: 168,
	},
	{
		label: '부위별 진단',
		url: '/health-note/body-check',
		imageUrl: BodyCheckImage,
		width: 58,
		height: 61,
	},
	{
		label: '장내 미생물 검사',
		url: '/health-note/gut-check',
		imageUrl: GutCheckImage,
		width: 46,
		height: 64,
	},
	{
		label: '병원 진료 기록',
		url: '/health-note/medical-history',
		imageUrl: HealthCheckImage,
		width: 50,
		height: 62,
	},
	{
		label: '견종 백과',
		url: '/health-note/dogpedia',
		imageUrl: DogPediaImage,
		width: 64,
		height: 64,
	},
]

const POSITIVE_KEY = "none";

export { HEALTH_NOTE_MENU_CATEGORY, POSITIVE_KEY };

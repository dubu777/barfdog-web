import GastroIcon from "public/images/healthNote/full-check/gut.svg";
import SkinIcon from "public/images/healthNote/full-check/skin.svg";
import ObesityIcon from "public/images/healthNote/full-check/diet.svg";
import SmGastroIcon from "public/images/healthNote/body-check/Icon-Bowel.svg";
import SmSkinIcon from "public/images/healthNote/body-check/Icon-Skin.svg";
import SmObesityIcon from "public/images/healthNote/body-check/Icon-Diet.svg";
import MealIcon from "public/images/healthNote/body-check/meal.svg";
import ClockIcon from "public/images/healthNote/body-check/clock.svg";
import WaterIcon from "public/images/healthNote/body-check/water.svg";
import ShampooIcon from "public/images/healthNote/body-check/shampoo.svg";
import BrushIcon from "public/images/healthNote/body-check/brush.svg";
import DogIcon from "public/images/healthNote/body-check/dog_care.svg";
import MeetIcon from "public/images/healthNote/body-check/meet.svg";
import ScaleIcon from "public/images/healthNote/body-check/scale.svg";
import SnackIcon from "public/images/healthNote/body-check/snack.svg";
import {
	defaultGastroSurveyValues, defaultObesitySurveyValues, defaultSkinSurveyValues,
	gastroSurveySchema, obesitySurveySchema,
	skinSurveySchema
} from "@/utils/validation/bodyCheckSurveyValidation";
import { GASTRO_SURVEY_ITEMS, GASTRO_SURVEY_SECTION } from "@/constants/healthNote/bodyCheck/gastro";
import { SKIN_SURVEY_ITEMS, SKIN_SURVEY_SECTION } from "@/constants/healthNote/bodyCheck/skin";
import { OBESITY_SURVEY_ITEMS, OBESITY_SURVEY_SECTION } from "@/constants/healthNote/bodyCheck/obesity";
import { toLabelValueList } from "@/utils/toLabelValueList";

// 부위별 진단 설문 기본 설정 (UI, category 등)
const BODY_PART = {
	gastro: {
		name: "위/장",
		key: "GID",
		icon: GastroIcon,
		smIcon: SmGastroIcon,
		schema: gastroSurveySchema,
		defaultValues: defaultGastroSurveyValues,
		questions: GASTRO_SURVEY_ITEMS,
		sections: GASTRO_SURVEY_SECTION,
	},
	skin: {
		name: "피부",
		key: "SKD",
		icon: SkinIcon,
		smIcon: SmSkinIcon,
		schema: skinSurveySchema,
		defaultValues: defaultSkinSurveyValues,
		questions: SKIN_SURVEY_ITEMS,
		sections: SKIN_SURVEY_SECTION,
	},
	obesity: {
		name: "비만",
		key: "OBD",
		icon: ObesityIcon,
		smIcon: SmObesityIcon,
		schema: obesitySurveySchema,
		defaultValues: defaultObesitySurveyValues,
		questions: OBESITY_SURVEY_ITEMS,
		sections: OBESITY_SURVEY_SECTION,
	},
} as const;

// 부위별 진단 상세 의심 증상별 경과
const DISEASE_PHASES = {
	early: "초기",
	mid: "중기",
	advanced: "장기",
} as const;

const DISEASE_PHASES_WEIGHT_BALANCE = {
	early: "저체중",
	mid: "적정체중",
	advanced: "과체중",
} as const;

const DISEASE_PHASES_LIST = toLabelValueList(DISEASE_PHASES);
const DISEASE_PHASES_WEIGHT_BALANCE_LIST = toLabelValueList(DISEASE_PHASES_WEIGHT_BALANCE);


// 부위별 진단 상세 정밀 진단 결과 및 의심 증상별 경과
const BODY_CHECK_DISEASE_INFO = {
	hemorrhagicEnteritisScore: {
		category: "GID",
		name: "출혈성 장염",
		description: "장내 출혈과 염증으로 인해 변 색 변화와 구토가 동반되는 질환",
		min: 8,
		max: 64,
		phaseDescriptions: {
			early: "장내에 경미한 출혈과 설사가 동반되며, 대변 색이 약간 어두워지기 시작합니다.",
			mid: "빈번한 혈변과 복통 증상이 나타나며, 구토와 전반적인 컨디션 저하가 동반됩니다.",
			advanced: "지속적인 출혈과 심한 구토가 발생하고, 탈수·빈혈·전신 쇠약이 나타날 수 있습니다.",
		},
		management:
			"장내 출혈과 염증이 빠르게 진행되는 출혈성 장염은 초기에 대처가 중요해요. 갑작스러운 식욕 저하나 혈변이 보인다면 식단부터 살펴보고 휴식을 충분히 줄 수 있는 환경을 마련해 주세요. 자극을 줄이는 것만으로도 불편한 증상이 더 빨리 가라앉아요.",
	},
	gastricUlcerScore: {
		category: "GID",
		name: "위궤양",
		description: "위 점막이 손상되어 식욕 저하, 구토, 복통이 나타나는 질환",
		min: 6,
		max: 48,
		phaseDescriptions: {
			early: "속쓰림이나 가벼운 상복부 통증이 나타나며, 식사 후 불편감이 간헐적으로 발생합니다.",
			mid: "식욕 저하와 구토 증상이 동반되며, 체중 감소와 복통이 빈번해집니다.",
			advanced: "위궤양 부위에서 출혈이 발생하고, 심한 복통·구토, 빈혈 위험이 증가합니다.",
		},
		management:
			"위궤양은 방치하면 빠르게 악화될 수 있지만, 초기부터 위에 부담을 덜어주는 식사와 안정적인 환경을 만들어준다면 충분히 회복할 수 있어요. 자극적인 금식이나 과도한 스트레스만 줄여줘도 훨씬 좋아집니다.",
	},
	enteritisScore: {
		category: "GID",
		name: "장염",
		description: "장의 염증으로 인해 설사, 구토, 복부 불편감이 나타나는 질환",
		min: 9,
		max: 72,
		phaseDescriptions: {
			early: "경미한 설사와 복부 불편감이 동반되며, 가벼운 발열이 있을 수 있습니다.",
			mid: "설사 횟수가 증가하고, 발열·혈변·복부 경련이 나타나며 전반적인 컨디션 저하가 옵니다.",
			advanced: "심한 탈수와 빈번한 혈변, 급성 복통이 지속되고, 빠른 치료가 필요합니다.",
		},
		management:
			"장염은 잠시 장을 쉬게 해주는 식단과 충분한 수분 섭취만으로도 회복에 큰 도움이 돼요. 낯선 간식이나 사람이 먹는 음식은 피하고 아이가 편안하게 쉴 수 있는 환경을 만들어 주세요. 장 속 균형을 도와주는 유산균이나 저자극 식이섬유도 빠른 회복에 도움이 돼요.",
	},
	ibsScore: {
		category: "GID",
		name: "IBS(과민성 대장 증후군)",
		description: "스트레스나 식습관에 의해 장이 과민하게 반응하는 기능성 질환",
		min: 5,
		max: 40,
		phaseDescriptions: {
			early: "간헐적인 복부 팽만감과 가벼운 변비 또는 설사 증상이 나타납니다.",
			mid: "지속적인 장 불편감이 있으며, 스트레스나 특정 음식에 의해 증상이 악화됩니다.",
			advanced: "심한 복부 경련과 배변 곤란이 반복되며, 심리적 불안·피로감이 동반될 수 있습니다.",
		},
		management:
			"장이 아주 예민한 상태라 자극보다 안정이 가장 중요해요. 식사와 산책 시간을 일정하게 유지하고, 스트레스를 줄일 수 있는 조용한 공간을 마련해 주세요. 사람 음식이나 기름진 간식보다는 소화에 좋은 식사와 장내 균형을 위한 유산균 급여가 큰 도움이 돼요.",
	},
	gastroLifestyleScore: {
		category: "GID",
		name: "생활습관",
		description: "식사, 간식, 유산균 섭취 등 장 건강에 영향을 주는 생활 요소",
		min: 5,
		max: 20,
		phaseDescriptions: null,
		management: null,
	},
	bacterialDermatitisScore: {
		category: "SKD",
		name: "세균성 피부염",
		description: "피부 상처나 면역 저하로 인해 세균이 증식하여 발적, 농포, 가려움이 나타나는 질환",
		min: 5,
		max: 40,
		phaseDescriptions: {
			early: "작은 붉은 반점, 뾰루지, 국소적인 가려움",
			mid: "병변 부위의 진물, 딱지 형성, 탈모",
			advanced: "심한 붓기와 통증, 농가진, 전신 열감, 2차 감염",
		},
		management: "감염 부위는 청결하게 유지하고 피부에 자극을 주는 외부 요인을 피하는 것이 중요해요. 심화되기 전에 병원 치료를 권장 드립니다. 집에서는 건조, 환기, 보습 관리에 신경써 주세요.",
	},
	mycoticDermatitisScore: {
		category: "SKD",
		name: "진균성 피부염",
		description: "곰팡이 감염으로 인해 피부에 원형 탈모, 각질, 가려움이 발생하는 질환",
		min: 4,
		max: 32,
		phaseDescriptions: {
			early: "털 빠짐, 모낭 주변의 붉은 병변, 각질",
			mid: "탈모 부위 확대, 피부 갈라짐, 가려움",
			advanced: "감염 부위 확산, 세균성 2차 감염 동반",
		},
		management: "사람에게도 전염될 수 있고, 초기에 전염성이 높기 때문에 격리 및 접촉 주의가 필요해요. 항진균 샴푸나 약물 치료가 필요하며 이불, 브러시, 수건 등 주변 환경을 소독하여 청결을 유지해 주세요.",
	},
	fleaTickDermatitisScore: {
		category: "SKD",
		name: "벼룩・진드기 피부염",
		description: "외부 기생충의 침입으로 심한 가려움과 피부 염증이 유발되는 질환",
		min: 4,
		max: 32,
		phaseDescriptions: {
			early: "가려움, 긁거나 핥는 행동, 미세한 붉은 반점",
			mid: "지속적인 가려움, 딱지, 탈모, 피부 착색",
			advanced: "상처 감염, 전신 염증 반응, 자가 손상 증가",
		},
		management: "가장 중요한 건 벼룩과 진드기에 대한 예방이에요. 외부 활동을 마친 후에는 털을 꼼꼼히 확인하여 벼룩이나 진드기를 제거해 주세요. 실내 환경을 소독하여 재감염을 막아주는 것도 중요해요.",
	},
	malasseziaDermatitisScore: {
		category: "SKD",
		name: "말라세지아 피부염",
		description: "피부에 존재하는 효모균이 과증식하여 악취, 기름진 피부, 가려움을 유발하는 질환",
		min: 6,
		max: 48,
		phaseDescriptions: {
			early: "피부 기름짐, 불쾌한 냄새, 가려움, 각질",
			mid: "피부 두꺼워짐, 지속적인 긁기와 핥기, 냄새 심화",
			advanced: "넓은 부위로 확산, 진물, 만성화",
		},
		management: "지방 함량이 낮고 저자극 식단과 함께 정기적인 약용 샴푸를 사용하는 것이 치료에 도움이 돼요. 알레르기 유발 요인을 제거하고 피부가 습해지지 않도록 실내 환경을 철저하게 관리해 주세요.",
	},
	skinLifestyleScore: {
		category: "SKD",
		name: "생활습관",
		description: "목욕, 식단, 환경 관리 등 피부 건강에 영향을 주는 생활성 요인",
		min: 5,
		max: 20,
		phaseDescriptions: null,
		management: null,
	},
	weightBalanceScore: {
		category: "OBD",
		name: "체중 균형",
		description: "갈비뼈 만져짐, 허리선, 복부 라인 등을 기준으로 확인한 몸의 외형 상태",
		min: 4,
		max: 40,
		phaseDescriptions: {
			early: "마른 몸, 들어간 허리선, 뚜렷한 갈비뼈",
			mid: "균형 잡힌 라인, 만져지는 갈비뼈, 자연스러운 허리선",
			advanced: "뚜렷하지 않은 허리선, 쳐진 복부, 잘 만져지지 않는 갈비뼈",
		},
		management: "적정 체형을 유지하려면 활동량도 중요하지만, 무엇보다 식단 관리가 핵심이에요. 급여량을 조절하고 체형에 맞는 저지방·고단백 식사를 이어가는 게 가장 효과적인 방법이에요. 꾸준한 식단 관리만으로도 적정 체중을 지켜줄 수 있어요.",
	},
	activityScore: {
		category: "OBD",
		name: "활동성",
		description: "산책이나 점프, 계단 오르기 등에서 드러나는 평소 움직임의 활발함 정도",
		min: 3,
		max: 30,
		phaseDescriptions: null,
		management: null,
	},
	dietaryScore: {
		category: "OBD",
		name: "식습관",
		description: "식사량, 간식 주는 횟수, 식사 후 행동을 통해 살펴본 먹는 습관의 안정성",
		min: 3,
		max: 30,
		phaseDescriptions: null,
		management: null,
	},
}

// 부위별 진단 상세 식사 습관
const BODY_PART_HEALTH_TIPS = {
	gastro: {
		title: "위장 건강은 평소\n식사 습관부터 살펴야 해요",
		list: [
			{
				step: "first",
				title: "소화 부담 없는 사료 선택",
				description:
					"위장 질환이 있는 아이들은 지방과 자극이 적은 사료를 먹는 것이 매우 중요해요. " +
					"알레르기 유발 식재료나 고지방 간식은 소화기에 무리를 줄 수 있어요.",
				icon: MealIcon,
				practices: [
					"단백질 원료가 명확한 음식 급여 (오리, 소 등)",
					"기름기 많은 사료나 간식 피하기",
					"식이섬유가 포함된 식단 급여하기",
				],
			},
			{
				step: "second",
				title: "규칙적인 식사 시간 유지",
				description:
					"같은 시간에 식사를 제공하면 위장 리듬이 안정되고, 소화기관에 부담이 줄어듭니다. " +
					"불규칙한 식사는 위산 과다, 소화 불량, 식욕 저하로 이어질 수 있어요.",
				icon: ClockIcon,
				practices: [
					"식사 시간 고정하기 (예: 오전 8시 / 오후 4시)",
					"공복 시간이 과도하게 길지 않도록 조절하기",
					"야식, 간식으로 식사 간격 흐트러뜨리지 않기",
				],
			},
			{
				step: "third",
				title: "유산균과 충분한 수분 섭취",
				description:
					"유산균과 충분한 수분은 장내 미생물 균형을 맞추고, 변 상태를 개선하는 데 큰 도움을 줘요. " +
					"특히 장염과 IBS 같은 질환의 예방 및 회복에 필수적이에요.",
				icon: WaterIcon,
				practices: [
					"매일 유산균 또는 프리바이오틱스 급여",
					"식사와 별도로 물 마시는 습관 유도",
					"수분 함량이 높은 간식이나 생식 사료 급여",
				],
			},
		]
	},

	skin: {
		title: "피부를 지키려면\n평소 관리가 중요해요",
		list: [
			{
				step: "first",
				title: "저자극 목욕과 충분한 건조",
				description:
					"샴푸 선택과 건조 방식이 피부 질환을 예방하고 증상 악화를 막는 데 중요해요. " +
					"자극이 적은 제품을 사용하고 물기가 남지 않도록 잘 건조해 주세요.",
				icon: ShampooIcon,
				practices: [
					"피부 타입에 맞는 약산성 저자극 샴푸 사용",
					"목욕 후 수건과 드라이기로 충분히 건조",
					"귀, 발가락 사이 등 습해지기 쉬운 부위 관리",
				],
			},
			{
				step: "second",
				title: "오염을 줄이는 청결 관리",
				description:
					"산책 후 남는 먼지, 진드기, 꽃가루는 피부 질환의 직접적인 원인이 될 수 있어요. " +
					"외출 후 간단한 관리만으로도 자극을 줄이고 피부를 보호할 수 있어요.",
				icon: BrushIcon,
				practices: [
					"산책 후 발, 배, 털을 부드럽게 닦아주기",
					"외출 후 몸 전체를 꼼꼼히 빗질하기",
					"피부에 닿는 실내 용품을 주기적으로 세탁",
				],
			},
			{
				step: "third",
				title: "모질 장벽을 지키는 피부관리",
				description:
					"건강한 모질은 피부 상태를 보여주는 중요한 지표예요. " +
					"지질과 수분 밸런스 유지를 도와주는 식이와 생활 습관 관리가 피부 장벽 보호에 도움이 돼요.",
				icon: DogIcon,
				practices: [
					"오메가-3 등 피부에 도움이 되는 성분 섭취",
					"브러싱으로 털 엉킴을 방지하고 피지 순환 유도",
					"건조한 시기엔 피부용 보습 미스트, 오일 사용",
				],
			},
		],
	},

	obesity: {
		title: "체중 관리는 평소 식단과\n생활 방식이 좌우해요",
		list: [
			{
				step: "first",
				title: "저지방·고단백 식단으로 체지방 감량",
				description:
					"단순히 양만 줄이는 것보다 칼로리는 낮고 단백질은 높은 사료가 근육을 유지하면서 지방만 감량하는 데 효과적이에요.",
				icon: MeetIcon,
				practices: [
					"저지방 고단백 식단 선택",
					"필수 아미노산이 포함된 단백질 원료 확인",
					"식이섬유가 포함된 식사를 통해 포만감을 높이기",
				],
			},
			{
				step: "second",
				title: "총 급여량 조절과 정량 급여",
				description:
					"아이의 상태를 기준으로 하루 섭취 열량을 정확히 파악하여 급여량을 설정하고 총섭취량을 통한 관리하는 것이 중요해요.",
				icon: ScaleIcon,
				practices: [
					"하루 필요 열량 기준으로 식사량 계산",
					"체중별 권장 급여량 확인 후 목표에 맞춰 조정",
					"한 번에 급여하지 말고 2회 이상 나누어 소분 급여",
				],
			},
			{
				step: "third",
				title: "간식 조절을 통한 칼로리 관리",
				description:
					"간식 섭취 비율이 높아지면 칼로리 조절이 어려워지기 때문에 하루 열량 기준 내에서 간식까지 포함해 계획적으로 관리해주는 것이 좋아요.",
				icon: SnackIcon,
				practices: [
					"간식은 정해진 시간에만 제한적으로 급여",
					"간식 섭취는 전체 열량의 10% 이하로 유지",
					"보상은 놀이, 산책, 터치 등으로 대체",
				],
			},
		],
	}
} as const;

// 부위별 진단 상세 추천 상품
const BODY_PART_RECOMMENDED_ITEMS = {
	gastro: {
		title: "위/장 상태에 따라\n맞춤 상품을 추천해 드려요",
		subTitle: "장이 예민한 시기에는 소화에 부담 없는\n단백질과 장 건강에 도움을 주는 성분이 중요해요",
		list: [
			{
				title: "유기농 발효 유산균으로 위/장 케어",
				tag: "천연 유산균",
				description: "유기농 채소를 자연 발효시켜 만든 천연 유산균이 유익균이 자라기 좋은 환경을 만들어주고 장내 균형 회복에 도움을 줘요. ",
			},
			{
				title: "예민한 위장을 위한 저자극 레시피",
				tag: "소화기 안정",
				description: "위염이나 장염 등 위장관이 민감한 아이에게는 저지방·고소화 식단이 필요해요. 닭가슴살과 닭안심은 소화 흡수가 용이하고, 당근과 브로콜리는 장내 균형 회복에 도움을 줘요.",
			},
			{
				title: "장내 균형 회복을 위한 생식 패키지",
				tag: "장내 미생물 균형",
				description: "8가지 생식 레시피로 우리 아이에게 맞는 식단을 선택할 수 있어요. 식이섬유와 다양한 단백질 조합이 장내 유익균 증식과 소화기 안정에 효과적이에요.",
			},
		]
	},
	skin: {
		title: "피부 상태에 따라\n맞춤 상품을 추천해 드려요",
		subTitle: "푸석해진 털은 피부 컨디션이 보내는 신호로\n윤기 있는 모질에 도움을 주는 제품을 추천해 드려요",
		list: [
			{
				title: "윤기 있고 건강한 모질",
				tag: "피부 장벽 강화",
				description:
					"양과 소의 질 좋은 단백질에 항산화 채소와 햄프씨드를 더해 건강한 피부 장벽과 윤기 나는 모질을 함께 관리할 수 있어요. ",
			},
			{
				title: "예민한 피부를 위한 저자극 식단",
				tag: "항산화 피부케어",
				description:
					"기름기 적은 칠면조 정육은 알러지 반응을 줄이는 데 도움을 주고, 브로콜리와 블루베리는 항산화 성분이 풍부해 피부 염증 완화에 효과적이에요.",
			},
			{
				title: "피부 면역을 위한 고영양 보양식",
				tag: "피부 면역 강화",
				description:
					"슈퍼푸드 버섯과 케이지 프리 닭을 오랜 시간 고아 만든 영양식이에요. 피부 면역력은 전신 면역과 연결돼 있어요. 기운이 없거나 피부가 예민한 아이에게 추천해요.",
			},
		]
	},
	obesity: {
		title: "체중 조절을 도와주는\n맞춤 상품을 추천해 드려요",
		subTitle: "체중 조절에는 저지방 고단백과 \n포만감을 높여주는 식단이 중요해요",
		list: [
			{
				title: "고단백・저지방 체중 관리 식단",
				tag: "체중 관리",
				description: "지방은 낮추고 단백질은 충분히 채워 체중 감량에 효과적인 식단이에요. 포만감을 주는 채소 구성 덕분에 과식을 줄이고 소화 부담도 덜어줘요.",
			},
			{
				title: "기호성 높은 다이어트 식단",
				tag: "포만감 식단",
				description: "체중 관리뿐만 아니라 기호성도 높은 레시피예요. 지방은 낮추고 단백질은 높인 소고기 부위와 포만감을 높이는 채소 조합이 체중 조절에 효과적이에요.",
			},
			{
				title: "장 건강 기반 체중 케어",
				tag: "소화 개선",
				description: "자연 발효된 천연 유산균은 장내 유익균 균형을 맞춰 소화·흡수를 도와주고, 대사 기능을 정상화해 체중 조절에 효과적이에요. 특히 비만 반려견에게는 장 기능 개선을 통한 영양 흡수 효율 조절이 중요해요.",
			},
		]
	},
} as const;

export {
	DISEASE_PHASES,
	DISEASE_PHASES_LIST,
	DISEASE_PHASES_WEIGHT_BALANCE_LIST,
	BODY_PART,
	BODY_PART_HEALTH_TIPS,
	BODY_CHECK_DISEASE_INFO,
	BODY_PART_RECOMMENDED_ITEMS,
}
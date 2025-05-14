import { ArticleCategory, FAQCategories, NoticeCategory } from "@/types";
import YoutubeIcon from '/public/images/about/youtube.svg';
import BloggerIcon from '/public/images/about/blogger.svg';
import InstagramIcon from '/public/images/about/instagram.svg';
import FacebookIcon from '/public/images/about/facebook.svg';

export {
	ARTICLE_CATEGORY,
	NOTICE_CATEGORY,
	FAQ_CATEGORIES,
	FAQ_DEFAULT_LIST,
	ABOUT_DATA
} ;

const ARTICLE_CATEGORY: Record<ArticleCategory, { label: string }> = {
	ALL: { label: '전체' },
	NUTRITION: { label: '영양' },
	HEALTH: { label: '건강' },
	LIFE: { label: '생애' },
}


const NOTICE_CATEGORY: Record<NoticeCategory, { label: string }> = {
	ALL: { label: '전체' },
	NOTICE: { label: '공지' },
	EVENT: { label: '이벤트' },
	POLICY: { label: '정책' },
}

const FAQ_DEFAULT_LIST = [
	{
		label: '상품',
		question: `'생식'이 무엇인가요?`,
		answer: `반려동물(개, 고양이)이 육식동물이라는 전제하에 가장 알맞은 형태의 
			식이 방식으로 육류 및 내장류 곡물 채소 과일 등을 혼합하여 급여하며 
			식재료만으로 부족한 영양소를 영양제와 보조제를 추가해 맞춰 완벽한 식단을 구성하는 식사입니다.
			반려동물 선진국인 미국 및 유럽에서는 이미 많이 알려진 식이 방법으로 아래와 같은 장점이 있습니다.
		`,
		subDescription: [
			'고온 및 압출 등의 공정 과정을 거치지 않아 영양소 및 효소 유익균의 손상 및 파괴 최소화',
			'건조한 사료에 비해 수분 공급률을 높여 하부 요로계 질환을 예방',
			'흡수율이 95% 이상으로 영양을 최대한 흡수할 수 있고 배변의 질이 개선되며 활동량이 증가',
			'레시피를 유동적으로 구성할 수 있음',
			'상업 사료에 포함될 수 있는 질낮은 비타민과 미네랄 보존제 등을 급여하지 않음으로써 염증성 질환 및 장 질환 개선, 면역력 증가로 질환 개선',
			'모질 눈물 알러지 치아 냄새 등을 개선 등',
		]
	},
	{
		label: '상품',
		question: `왜 바프독으로 바꿔야 하나요?`,
		answer: `바프독은 반려동물의 사료를 만들지 않습니다.
			바프독은 반려동물을 위한 음식을 만듭니다.
			또한 바프독은 반려견마다의 건강 빅데이터를 토대로 국내 최초로 1:1 맞춤 한 끼로 포장된 제품으로 조리하여 전달드리고 있습니다.
			
			따라서, 집에서 힘들게 소분하는 고생은 하지 않으셔도 됩니다!
			바프독의 모든 레시피는 최고 품질의  재료로 만들어지며 iso 인증된 자체 저온시설에서 체계적으로 준비하고 요리됩니다.
			
			이 방식은 사람의 음식이 만들어지는 것과 동일한 방식으로 매 끼니가 저온 시설에서 조리되기 때문에 안전을 보장하고 언제나 신선함 속에서 배송 될 수 있도록 동결되어 전달됩니다.
		`,
	},
	{
		label: '상품',
		question: `구독 후 처음 배송되는 날이 언제인가요?`,
		answer: `바프독은 매주 목요일에 주문을 마감하여 금~일요일 제조 후 냉동 및 멸균처리를 거쳐 화요일에 일괄 발송되는 시스템입니다.
			
			가장 신선한 상태로 식사 발송을 위한 시스템이오니 너그러운 양해 부탁드립니다.`,
	},
	{
		label: '상품',
		question: `구독 전 몇 팩만 구매할 수 있나요?`,
		answer: `단품으로 먼저 기호성, 알러지 등을 확인하실 수 있도록 네이버 스마트 스토어에 샘플을 구매하실 수 있도록 준비해두었습니다.
		
			급여 전 샘플을 먼저 이용해 보시는 것을 추천드립니다. 바프독 강아지 샘플 닭 칠면조 오리 양 소 (100g x 4팩) : 바프독
		`,
	},
	{
		label: '배송',
		question: `생식을 시작하고 싶은데 정기구독 중간에 취소가 자유롭나요?`,
		answer: `네, 그렇습니다!
			첫 구독 신청 시 플랜에 따라 2주치 또는 4주치가 결제되며
			그 다음 발송부터는 미리 언제든 취소 가능합니다.
		`,
	},
	{
		label: '상품',
		question: `급여 방법은 어디서 참고할 수 있나요?`,
		answer: `각 레시피 별 상세페이지 또는 해당 게시판의 '올바른 급여 방법' 게시물을 확인하여 주세요!
			https://www.barfdog.co.kr/community/notice/40
		`,
	},
	{
		label: '상품',
		question: `생식이 처음인데 괜찮을까요?`,
		answer: `기존 급여하시던 식사에서 생식으로의 성공적인 전환을 위해
			가장 먼저 바프독 음식을 기존 급여하시던 음식과 섞어 먹이는 것부터 시작하세요.
			바프독 음식을 전체의 25% 정도 섞어 시작하여 매번 천천히 100%까지 늘려가시면 됩니다.

			만약 반려동물의 장이 더 예민하고 종종 배탈을 경험한다면 더욱 적은 양으로 시작으로 새로운 음식에 적응할 때까지 천천히 증가하세요.

			전환에는 최대 7~14 일 정도 걸릴 수 있습니다.
		`,
	},
	{
		label: '상품',
		question: `이곳에 없는 질문을 하고싶어요`,
		answer: `이곳에 없는 질문이라면,
			언제든지 실시간 상담톡 또는 **카카오톡 ID' 바프독'**으로 문의 남겨주세요
			확인 후 최선을 다해 답변드리겠습니다🧐
			감사합니다.
		`,
	},
]

const FAQ_CATEGORIES: FAQCategories = {
	DELIVERY: {
		label: "배송",
		subcategories: {
			SUBSCRIPTION: {
				label: "정기배송",
				items: [
					{ question: "정기배송 제품 출고일이 어떻게 되나요?", answer: "비밀입니다!!!" },
					{ question: "구독중 상품과 일반상품 묶음 배송이 가능한가요?", answer: "" },
					{ question: "배송일을 변경하고 싶어요", answer: "" },
					{ question: "배송을 잠시 미루고 싶어요", answer: "" },
				],
			},
			GENERAL: {
				label: "일반배송",
				items: [
					{ question: "일반 상품도 정기구독이 가능한가요?", answer: "" },
				],
			},
		},
	},
	ORDER_CANCEL: {
		label: "주문취소",
		subcategories: {
			COMMON: {
				label: "일반",
				items: [
					{ question: "정기구독 중간에 취소가 자유롭나요?", answer: "" },
					{ question: "주문 취소는 어떻게 하나요?", answer: "" },
					{ question: "이미 생산중인 생식 주문을 취소할 수 있나요?", answer: "" },
				],
			},
		},
	},
	EXCHANGE_RETURN: {
		label: "교환/반품",
		subcategories: {
			COMMON: {
				label: "일반",
				items: [
					{ question: "교환/ 반품이 자유롭나요?", answer: "" },
					{ question: "환불은 어떻게 이루어지나요?", answer: "" },
				],
			},
		},
	},
	SERVICE: {
		label: "서비스",
		subcategories: {
			MICROBIOLOGICAL_TEST: {
				label: "미생물 검사",
				items: [
					{ question: "미생물 검사 결과는 어디서 확인가능한가요?", answer: "" },
				],
			},
			INFO_UPDATE: {
				label: "정보 수정",
				items: [
					{ question: "반려견 정보를 수정하고 싶어요", answer: "" },
					{ question: "반려견의 레시피를 변경하고 싶어요", answer: "" },
					{ question: "레시피에 알러지 선택 항목이 반영되나요?", answer: "" },
				],
			},
		},
	},
	ORDER_PAYMENT: {
		label: "주문/결제",
		subcategories: {
			ORDER: {
				label: "주문",
				items: [
					{ question: "구독 전 몇 팩만 구매할 수 있나요?", answer: "" },
				],
			},
			GENERAL_DELIVERY: {
				label: "일반배송",
				items: [
					{ question: "구독 전 몇 팩만 구매할 수 있나요?", answer: "" },
				],
			},
		},
	},
	MEMBER_INFO: {
		label: "회원정보",
		subcategories: {
			LOGIN: {
				label: "로그인",
				items: [
					{ question: "아이디와 비밀번호가 기억나지 않아요", answer: "" },
					{ question: "비밀번호 변경은 어디서 하나요?", answer: "" },
					{ question: "휴대폰 번호를 변경하고 싶어요", answer: "" },
					{ question: "로그아웃 하고 싶어요", answer: "" },
					{ question: "다른 아이디로 재가입하고 싶어요", answer: "" },
				],
			},
			WITHDRAWAL_ETC: {
				label: "탈퇴/기타",
				items: [
					{ question: "회원 탈퇴는 어떻게 하나요?", answer: "" },
				],
			},
		},
	},
	PRODUCT: {
		label: "상품",
		subcategories: {
			SALARY_INQUIRY: {
				label: "급여문의",
				items: [
					{ question: "생식이 처음인데 괜찮을까요?", answer: "" },
					{ question: "고양이가 먹어도 괜찮을까요?", answer: "" },
					{ question: "실온보관했는데 먹어도 괜찮을까요?", answer: "" },
					{ question: "사료와 섞어 먹여도 되나요?", answer: "" },
					{ question: "성장기나 노견이 먹어도 되나요?", answer: "" },
					{ question: "장기급여해도 안전한가요?", answer: "" },
					{ question: "하루 급여량은 얼마인가요?", answer: "" },
					{ question: "급여 방법은 어디서 참고할 수 있나요?", answer: "" },
				],
			},
			PRODUCT_INQUIRY: {
				label: "제품문의",
				items: [
					{ question: "자연식이 무엇인가요?", answer: "" },
					{ question: "생식이 무엇인가요?", answer: "" },
					{ question: "왜 바프독으로 바꿔야 하나요?", answer: "" },
					{ question: "생식은 어떻게 보관하나요?", answer: "" },
					{ question: "화식은 어떻게 보관하나요?", answer: "" },
					{ question: "파우치째 해동해도 안전한가요?", answer: "" },
					{ question: "소분 보관은 어떻게 하나요?", answer: "" },
				],
			},
		},
	},
	BENEFIT: {
		label: "혜택",
		subcategories: {
			POINT: {
				label: "포인트",
				items: [
					{ question: "포인트를 확인하고 싶어요", answer: "" },
					{ question: "환불 시 포인트는 어떻게 반환되나요?", answer: "" },
					{ question: "구매시 사용 가능한 혜택은 어떤 것들이 있나요?", answer: "" },
				],
			},
			COUPON: {
				label: "쿠폰",
				items: [
					{ question: "쿠폰이 등록되지 않아요", answer: "" },
					{ question: "쿠폰은 어디서 등록하나요?", answer: "" },
				],
			},
		},
	},
};

const ABOUT_DATA = {
	OUR_STORY: {
		title: 'Fresh Life! Fresh our',
		subTitle: `우리는 반려동물과 반려인의 건강하고 행복한 \n라이프스타일과 삶의 균형을 위해 끊임없이 움직입니다`,
		logoImageUrl: '/images/about/aboutTitle1.png',
		imageUrl: '/images/about/about1.png',
		content: `우리는 반려동물과 아주 긴 시간을 함께 합니다.
			때로는 이 여정이 고되고 지칠 때도 있지만 충분히 가치가 있는 일입니다. 시간이 한참 흐른 어느 날, 이 순간을 회상하는 날이 오면 우리는 주저없이 말할 것입니다.
			내 인생 가장 가치 있고 행복한 시간이었다고 말입니다.
			
			바프독이라는 브랜드를 만들며 조언을 구하고자 많은 반려인들을 만났습니다. 제가 그분들을 만나 뵙고 가장 많이 들었던 말은 ‘삶의 이유’였습니다.
			
			/b“두부는 제가 왜 살아야 하는지를 알려줬어요”
			“이 친구로 인해 사랑을 주고, 받는 기분이 무엇인지 알았어요”
			“하루 종일 함께하지 못해 너무 미안해요. 그래도 주말은 오롯이 유미랑 함께 보낼 거예요”/b
			
			이렇게 우리들은 ‘존재의 이유’가 된 내 소중한 반려동물들이 오랜시간 건강하게 내 옆에 머물러 주기를 간절히 원합니다. 이를 위해 보호자로서 많은 시간, 관심, 노력 등을 기울이지만 때로는 보살핌의 어려움과 올바름에 좌절감이 들기도 합니다.
			
			이것이 소중한 반려동물과의 여정에 바프독이 함께 걷고자 하는 ‘이유’입니다. 이 여정은 반려인과 반려동물마다의 특성과 상황에 따라 달라야하고 특별한 요구사항에 따라서도 달라야 합니다.
			
			그래서 바프독은 더 사려 깊어야 하고, 접근하기 쉬워야 하고, 맞춤형이어야 한다고 생각하여 반려동물들에게 가장 균형 잡힌 보살핌을 만들어 주고자 합니다.
			
			바프독을 믿고 주문해주시는 반려인의 반려동물을 위한 맞춤형의 건강한 식사, 올바른 재료로 보답하겠습니다.
			바프독은 당신의 반려동물에게
			건강한 일년, 건강한 일생, 건강한 여정을 선물할 수 있도록 노력할 것 입니다.
		
			그 긴 여정을 응원합니다.
		`,
		subContent: {
			text: '프레쉬아워 CEO 임경호',
			imageUrl: '/images/about/signature.png',
		},
	},
	OUR_PROCESS: {
		title: 'No More Feed, Dogs Want Food',
		subTitle: `우리는 반려동물과 반려인의 건강하고 행복한 \n라이프스타일과 삶의 균형을 위해 끊임없이 움직입니다`,
		logoImageUrl: '/images/about/aboutTitle2.png',
		imageUrl: '/images/about/about2.png',
		descriptions: [
			{
				title: '휴먼그레이드 등급의 원재료 소싱',
				description: '우리는 반려동물과 반려인의 건강하고 행복한 \n라이프스타일과 삶의 균형을 위해 끊임없이 움직입니다',
			},
			{
				title: '차별화된 맞춤형 1:1 생산',
				description: '오직 한 반려견을 위한 1:1 맞춤형 레시피와 반려인의 고민을 반영하여 최고의 맞춤형 영양 구성의 비율을 만듭니다',
			},
			{
				title: '철저한 위생과 품질 관리',
				description: '바프독의 생산시설은 매일 위생테스트를 통해 관리하고 있으며 생산된 제품은 영양성분 테스트를 수행하고 데이터화 합니다',
			},
			{
				title: '믿을 수 있는 안전성',
				description: '최종 생산이 완료 된 후에도 포장된 제품의 신선도를 최적의 상태로 유지하기 위해 전자빔 멸균 처리에서 택배발송까지의 전 과정동안 냉동탑차, 15℃이하 저온 생산시설에서 포장 등 Full콜드체인시스템으로 신선함을 유지하고 있습니다',
			},
			{
				title: '환경을 위한 포장',
				description: '친환경 아이스팩 사용, 종이 아이스박스 사용 등, 바프독 뿐 아니라 구매 고객님, 반려동물이 살아가는 환경이 더 나아질 수 있도록 노력합니다.\n(단, 한여름에는 더 신선하게 배송받으실 수 있도록 스트로폼 아이스박스로 배송됩니다.)',
			},
		]
	},
	SNS: {
		title: 'INSTAGRAM',
		subTitle: `인스타그램에서\n바프독의 최신 소식을 확인해보세요`,
		imageUrl: '/images/about/about3.png',
		action: {
			label: '인스타그램 구경가기',
			url: 'https://www.instagram.com/barfdog_official/',
			variant: 'solid',
		},
		descriptions: [
			{
				url: 'https://www.youtube.com/channel/UCf_VpnXwfLu6wQ1ADcXSphA/featured',
				imageUrl: YoutubeIcon,
			},
			{
				url: 'https://blog.naver.com/barfdog',
				imageUrl: BloggerIcon,
			},
			{
				url: 'https://www.instagram.com/barfdog_official/',
				imageUrl: InstagramIcon,
			},
			{
				url: 'https://www.facebook.com/BARFDOG_official-100623948688775',
				imageUrl: FacebookIcon,
			},
		],
	},
} as const;
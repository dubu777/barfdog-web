import { SurveyTitleConfig } from "@/types";
import { SurveyStepKeys } from "@/utils/validation/surveyValidation";
import Born from "public/images/survey/Icon-Born.svg";
import Bowel from "public/images/survey/Icon-Bowel.svg";
import Diabetes from "public/images/survey/Icon-Diabetes.svg";
import Diet from "public/images/survey/Icon-Diet.svg";
import Energy from "public/images/survey/Icon-Energy.svg";
import Ear from "public/images/survey/Icon-Ear.svg";
import Eye from "public/images/survey/Icon-Eye.svg";
import Heart from "public/images/survey/Icon-Heart.svg";
import Hyperlipidemia from "public/images/survey/Icon-hyperlipidemia.svg";
import Kidney from "public/images/survey/Icon-Kidney.svg";
import Liver from "public/images/survey/Icon-Liver.svg";
import Non from "public/images/survey/Icon-Non.svg";
import Olddog from "public/images/survey/Icon-Olddog.svg";
import Pancreas from "public/images/survey/Icon-pancreas.svg";
import Puppy from "public/images/survey/Icon-Puppy.svg";
import Skin from "public/images/survey/Icon-Skin.svg";
import Skincare from "public/images/survey/Icon-Skincare.svg";

import FillBorn from "public/images/survey/IconFill-Born.svg";
import FillBowel from "public/images/survey/IconFill-Bowel.svg";
import FillDiabetes from "public/images/survey/IconFill-Diabetes.svg";
import FillDiet from "public/images/survey/IconFill-Diet.svg";
import FillEar from "public/images/survey/IconFill-Ear.svg";
import FillEnergy from "public/images/survey/IconFill-Energy.svg";
import FillEye from "public/images/survey/IconFill-Eye.svg";
import FillHeart from "public/images/survey/IconFill-Heart.svg";
import FillHyperlipidemia from "public/images/survey/IconFill-hyperlipidemia.svg";
import FillKidney from "public/images/survey/IconFill-Kidney.svg";
import FillLiver from "public/images/survey/IconFill-Liver.svg";
import FillNon from "public/images/survey/IconFill-Non.svg";
import FillOlddog from "public/images/survey/IconFill-Olddog.svg";
import FillPancreas from "public/images/survey/IconFill-pancreas.svg";
import FillPuppy from "public/images/survey/IconFill-Puppy.svg";
import FillSkin from "public/images/survey/IconFill-Skin.svg";
import FillSkincare from "public/images/survey/IconFill-Skincare.svg";

export {
  SURVEY_FORM_INFO,
  RECIPE_TEMP_DATA,
  SURVEY_NO_AUTO_NEXT_STEP,
  NONE_VALUE,
  SURVEY_SECTIONS,
  SURVEY_TITLES,
  CRITICAL_DISEASES,
};

const SURVEY_SECTIONS = [
  { key: "dogBasicInfo", label: "기본 정보", steps: 6 },
  { key: "dogLifestyle", label: "생활 정보", steps: 5 },
  { key: "dogDietHealth", label: "식단/건강", steps: 3 },
];

const SURVEY_TITLES: Record<SurveyStepKeys, SurveyTitleConfig> = {
  step1: {
    titleTemplates: ["반려견에 대해 알려주세요"],
  },
  step2: {
    titleTemplates: ["{petName}의", "생년월일은 언제인가요?"],
    subtitleTemplates: [
      [{ text: "아이의 생년월에 따라 급여량이 달라져요.", color: "gray600" }],
      [{ text: "정확히 모르신다면 대략적으로 알려주세요.", color: "gray600" }],
    ],
  },
  step3: {
    titleTemplates: ["{petName}의", "몸무게는 얼마인가요?"],
  },
  step4: {
    titleTemplates: ["{petName}의", "견종은 무엇인가요?"],
  },
  step5: {
    titleTemplates: ["현재", "임신 중인가요?"],
  },
  step6: {
    titleTemplates: ["현재", "수유 중인가요?"],
  },
  step7: {
    titleTemplates: ["{petName}의", "체형은 어느 쪽에 가까운가요?"],
  },
  step8: {
    titleTemplates: ["{petName}의", "활동량은 어느 쪽에 가까운가요?"],
  },
  step9: {
    titleTemplates: ["{petName}의", "간식량은 어떤가요?"],
  },
  step10: {
    titleTemplates: ["못 먹는 재료는", "무엇인가요?"],
  },
  step11: {
    titleTemplates: ["{petName}의", "건강고민은 무엇인가요?"],
    subtitleTemplates: [
      [{ text: "1순위부터 3순위까지 선택해 주세요", color: "red" }],
    ],
  },
  step12: {
    titleTemplates: ["현재 먹고 있는", "사료는 무엇인가요?"],
  },
  step13: {
    titleTemplates: ["현재 먹고 있는", "영양제가 있나요?"],
  },
  step14: {
    titleTemplates: ["아래의 질병 중", "앓고 있는 질병이 있나요?"],
  },
};

const SURVEY_FORM_INFO = {
  dogBasicInfo: {
    gender: {
      title: "성별",
      options: [
        {
          value: "female",
          label: "암컷",
          imageUrl: "/images/survey/female.png",
        },
        {
          value: "male",
          label: "수컷",
          imageUrl: "/images/survey/male.png",
        },
      ],
    },
    isNeutered: {
      title: "중성화 여부",
      options: [
        { value: true, label: "중성화 했어요" },
        { value: false, label: "중성화 안했어요" },
      ],
    },
    isSenior: {
      title: "노령견",
      options: [
        { value: true, label: "노령견이에요" },
        { value: false, label: "노령견이 아니에요" },
      ],
    },
    dogSize: {
      title: "견사이즈",
      options: [
        {
          value: "small",
          label: "소형",
          imageUrl: "/images/survey/small-dog.png",
        },
        {
          value: "medium",
          label: "중형",
          imageUrl: "/images/survey/medium-dog.png",
        },
        {
          value: "large",
          label: "대형",
          imageUrl: "/images/survey/large-dog.png",
        },
      ],
    },
    dogType: {
      placeholder: "견종을 검색해 보세요",
      options: [
        { label: "품종 모름", value: "품종 모름" },
        { label: "믹스", value: "믹스" },
        { label: "골든 리트리버", value: "골든 리트리버" },
        { label: "골든두들", value: "골든두들" },
        { label: "그레이 하운드", value: "그레이 하운드" },
        { label: "그레이트 데인", value: "그레이트 데인" },
        { label: "그레이트 피레니즈", value: "그레이트 피레니즈" },
        { label: "그린란드견", value: "그린란드견" },
        { label: "기슈견", value: "기슈견" },
        { label: "꼬똥 드 툴레아", value: "꼬똥 드 툴레아" },
        { label: "나폴리탄 마스티프", value: "나폴리탄 마스티프" },
        { label: "뉴기니고산개", value: "뉴기니고산개" },
        { label: "뉴펀들랜드", value: "뉴펀들랜드" },
        { label: "닥스훈트", value: "닥스훈트" },
        { label: "도고 아르헨티노", value: "도고 아르헨티노" },
        { label: "도베르만 핀셔", value: "도베르만 핀셔" },
        { label: "라사압소", value: "라사압소" },
        { label: "라페이로 도 알렌테조", value: "라페이로 도 알렌테조" },
        { label: "래브라도 리트리버", value: "래브라도 리트리버" },
        { label: "레온베르거", value: "레온베르거" },
        { label: "로트와일러", value: "로트와일러" },
        { label: "마스티프", value: "마스티프" },
        { label: "말티즈", value: "말티즈" },
        { label: "미니어처 슈나우저", value: "미니어처 슈나우저" },
        { label: "미니어처 핀셔", value: "미니어처 핀셔" },
        { label: "바셋 하운드", value: "바셋 하운드" },
        { label: "베들링턴 테리어", value: "베들링턴 테리어" },
        { label: "벨지언 쉽독", value: "벨지언 쉽독" },
        { label: "보더 콜리", value: "보더 콜리" },
        { label: "보르도 마스티프", value: "보르도 마스티프" },
        { label: "보르조이", value: "보르조이" },
        { label: "보비에 드 플랜더스", value: "보비에 드 플랜더스" },
        { label: "보스턴 테리어", value: "보스턴 테리어" },
        { label: "복서", value: "복서" },
        { label: "불도그", value: "불도그" },
        { label: "불리 쿠타", value: "불리 쿠타" },
        { label: "브리어드", value: "브리어드" },
        { label: "블러드 하운드", value: "블러드 하운드" },
        { label: "비글", value: "비글" },
        { label: "비숑 프리제", value: "비숑 프리제" },
        { label: "빠삐용", value: "빠삐용" },
        { label: "사모예드", value: "사모예드" },
        { label: "사플라니낙", value: "사플라니낙" },
        { label: "삽살개", value: "삽살개" },
        { label: "샤페이", value: "샤페이" },
        { label: "세인트 버나드", value: "세인트 버나드" },
        { label: "솔로이츠 쿠인틀레", value: "솔로이츠 쿠인틀레" },
        { label: "스코티쉬 테리어", value: "스코티쉬 테리어" },
        { label: "스키퍼키", value: "스키퍼키" },
        { label: "스피츠", value: "스피츠" },
        { label: "시코쿠견", value: "시코쿠견" },
        { label: "실키 테리어", value: "실키 테리어" },
        { label: "아메리칸 불리", value: "아메리칸 불리" },
        {
          label: "아메리칸 스태퍼드셔 테리어",
          value: "아메리칸 스태퍼드셔 테리어",
        },
        { label: "아이디", value: "아이디" },
        { label: "아키타견", value: "아키타견" },
        { label: "아펜핀셔", value: "아펜핀셔" },
        { label: "아프간 하운드", value: "아프간 하운드" },
        { label: "알래스칸 클리카이", value: "알래스칸 클리카이" },
        { label: "에스트렐라 마운틴 독", value: "에스트렐라 마운틴 독" },
        { label: "오브차카", value: "오브차카" },
        { label: "요크셔 테리어", value: "요크셔 테리어" },
        {
          label: "웨스트 하이랜드 화이트테리어",
          value: "웨스트 하이랜드 화이트테리어",
        },
        { label: "재패니즈 스피츠", value: "재패니즈 스피츠" },
        { label: "재패니즈 친", value: "재패니즈 친" },
        { label: "잭 러셀 테리어", value: "잭 러셀 테리어" },
        { label: "저먼 셰퍼드", value: "저먼 셰퍼드" },
        { label: "제주개", value: "제주개" },
        { label: "진돗개", value: "진돗개" },
        { label: "차우차우", value: "차우차우" },
        { label: "치와와", value: "치와와" },
        { label: "카네 코르소", value: "카네 코르소" },
        {
          label: "카발리에 킹 찰스 스파니엘",
          value: "카발리에 킹 찰스 스파니엘",
        },
        { label: "코리안 마스티프", value: "코리안 마스티프" },
        { label: "코몬도르", value: "코몬도르" },
        { label: "코커 스파니엘", value: "코커 스파니엘" },
        { label: "콜리", value: "콜리" },
        { label: "고든 세터", value: "고든 세터" },
        {
          label: "그레이트 스위스 마운틴 도그",
          value: "그레이트 스위스 마운틴 도그",
        },
        { label: "글렌 오브 이말 테리어", value: "글렌 오브 이말 테리어" },
        { label: "노르웨지안 부훈트", value: "노르웨지안 부훈트" },
        { label: "노르웨이 엘크 하운드", value: "노르웨이 엘크 하운드" },
        { label: "노리치 테리어", value: "노리치 테리어" },
        {
          label: "노바 스코셔 덕 톨링 레트리버",
          value: "노바 스코셔 덕 톨링 레트리버",
        },
        { label: "노퍽 테리어", value: "노퍽 테리어" },
        { label: "댄디 딘몬트 테리어", value: "댄디 딘몬트 테리어" },
        { label: "도고 까나리오", value: "도고 까나리오" },
        { label: "도그 드 보르도", value: "도그 드 보르도" },
        { label: "도사견", value: "도사견" },
        { label: "동경이", value: "동경이" },
        { label: "라포니안 허더", value: "라포니안 허더" },
        { label: "레이크랜드 테리어", value: "레이크랜드 테리어" },
        { label: "로디지아 리지백", value: "로디지아 리지백" },
        { label: "로첸", value: "로첸" },
        { label: "미니어처 불 테리어", value: "미니어처 불 테리어" },
        { label: "바센지", value: "바센지" },
        { label: "버니즈 마운틴 도그", value: "버니즈 마운틴 도그" },
        { label: "벨기에 말리노이즈", value: "벨기에 말리노이즈" },
        { label: "벨기에 테뷰런", value: "벨기에 테뷰런" },
        { label: "벨지안 그리펀", value: "벨지안 그리펀" },
        { label: "보더 테리어", value: "보더 테리어" },
        { label: "보스롱", value: "보스롱" },
        { label: "볼로네즈", value: "볼로네즈" },
        { label: "불 마스티프", value: "불 마스티프" },
        { label: "불 테리어", value: "불 테리어" },
        { label: "브뤼셀 그리펀", value: "브뤼셀 그리펀" },
        { label: "브리타니", value: "브리타니" },
        { label: "블랙 러시안 테리어", value: "블랙 러시안 테리어" },
        { label: "블랙 앤드 탄 쿤하운드", value: "블랙 앤드 탄 쿤하운드" },
        { label: "비어디드 콜리", value: "비어디드 콜리" },
        { label: "비즐라", value: "비즐라" },
        { label: "살루키", value: "살루키" },
        { label: "서식스 스패니얼", value: "서식스 스패니얼" },
        { label: "셔틀랜드 쉽독", value: "셔틀랜드 쉽독" },
        {
          label: "소프트 코티드 휘튼 테리어",
          value: "소프트 코티드 휘튼 테리어",
        },
        { label: "스무스 폭스 테리어", value: "스무스 폭스 테리어" },
        { label: "스웨디쉬 발훈트", value: "스웨디쉬 발훈트" },
        { label: "스카이 테리어", value: "스카이 테리어" },
        { label: "스코티시 디어하운드", value: "스코티시 디어하운드" },
        { label: "스태퍼드셔 불 테리어", value: "스태퍼드셔 불 테리어" },
        { label: "스탠더드 슈나우저", value: "스탠더드 슈나우저" },
        { label: "스패니쉬 그레이 하운드", value: "스패니쉬 그레이 하운드" },
        { label: "스패니쉬 마스티프", value: "스패니쉬 마스티프" },
        { label: "스피노네 이탈리아노", value: "스피노네 이탈리아노" },
        { label: "시바 이누", value: "시바 이누" },
        { label: "실리엄 테리어", value: "실리엄 테리어" },
        { label: "아메리칸 불도그", value: "아메리칸 불도그" },
        { label: "아메리칸 아키다", value: "아메리칸 아키다" },
        { label: "아메리칸 에스키모 도그", value: "아메리칸 에스키모 도그" },
        { label: "아메리칸 워터 스패니얼", value: "아메리칸 워터 스패니얼" },
        { label: "아메리칸 코커 스패니얼", value: "아메리칸 코커 스패니얼" },
        { label: "아메리칸 폭스하운드", value: "아메리칸 폭스하운드" },
        {
          label: "아이리시 소프트코티드 휘튼 테리어",
          value: "아이리시 소프트코티드 휘튼 테리어",
        },
        {
          label: "아이리시 레드 앤드 화이트 세터",
          value: "아이리시 레드 앤드 화이트 세터",
        },
        { label: "아이리시 세터", value: "아이리시 세터" },
        { label: "아이리시 울프 하운드", value: "아이리시 울프 하운드" },
        { label: "아이리시 워터 스패니얼", value: "아이리시 워터 스패니얼" },
        { label: "아이리시 테리어", value: "아이리시 테리어" },
        { label: "알래스칸 맬러뮤트", value: "알래스칸 맬러뮤트" },
        { label: "에어데일 테리어", value: "에어데일 테리어" },
        {
          label: "오스트레일리안 실키 테리어",
          value: "오스트레일리안 실키 테리어",
        },
        { label: "오스트레일리안 켈피", value: "오스트레일리안 켈피" },
        { label: "오스트레일리안 셰퍼드", value: "오스트레일리안 셰퍼드" },
        {
          label: "오스트레일리안 캐틀 도그",
          value: "오스트레일리안 캐틀 도그",
        },
        { label: "오스트레일리안 테리어", value: "오스트레일리안 테리어" },
        { label: "오터 하운드", value: "오터 하운드" },
        { label: "올드 잉글리시 쉽독", value: "올드 잉글리시 쉽독" },
        { label: "와이머라너", value: "와이머라너" },
        { label: "와이어 폭스 테리어", value: "와이어 폭스 테리어" },
        {
          label: "와이어헤어드 포인팅 그리펀",
          value: "와이어헤어드 포인팅 그리펀",
        },
        { label: "웰시 스프링어 스패니얼", value: "웰시 스프링어 스패니얼" },
        { label: "웰시 테리어", value: "웰시 테리어" },
        { label: "이비전 하운드", value: "이비전 하운드" },
        { label: "이탤리언 그레이하운드", value: "이탤리언 그레이하운드" },
        { label: "잉글리시 세터", value: "잉글리시 세터" },
        {
          label: "잉글리시 스프링어 스패니얼",
          value: "잉글리시 스프링어 스패니얼",
        },
        { label: "잉글리시 코커 스패니얼", value: "잉글리시 코커 스패니얼" },
        { label: "잉글리시 토이 스패니얼", value: "잉글리시 토이 스패니얼" },
        { label: "잉글리시 폭스하운드", value: "잉글리시 폭스하운드" },
        { label: "자이언트 슈나우저", value: "자이언트 슈나우저" },
        { label: "저먼 쇼트헤어드 포인터", value: "저먼 쇼트헤어드 포인터" },
        {
          label: "저먼 와이어헤어드 포인터",
          value: "저먼 와이어헤어드 포인터",
        },
        { label: "저먼 핀셔", value: "저먼 핀셔" },
        { label: "저먼 헌팅 테리어", value: "저먼 헌팅 테리어" },
        { label: "차이니즈 샤페이", value: "차이니즈 샤페이" },
        { label: "차이니즈 크레스티드", value: "차이니즈 크레스티드" },
        { label: "체서피크 베이 레트리버", value: "체서피크 베이 레트리버" },
        { label: "카디건 웰시 코기", value: "카디건 웰시 코기" },
        { label: "컬리코티드 레트리버", value: "컬리코티드 레트리버" },
        { label: "케리 블루 테리어", value: "케리 블루 테리어" },
        { label: "케언 테리어", value: "케언 테리어" },
        { label: "케이넌 도그", value: "케이넌 도그" },
        { label: "케이스혼트", value: "케이스혼트" },
        { label: "쿠바스", value: "쿠바스" },
        { label: "쿠이커혼제", value: "쿠이커혼제" },
        { label: "클럼버 스패니얼", value: "클럼버 스패니얼" },
        { label: "토이 폭스 테리어", value: "토이 폭스 테리어" },
        { label: "티베탄 마스티프", value: "티베탄 마스티프" },
        { label: "티베탄 스패니얼", value: "티베탄 스패니얼" },
        { label: "티베탄 테리어", value: "티베탄 테리어" },
        { label: "파라오 하운드", value: "파라오 하운드" },
        { label: "파슨 러셀 테리어", value: "파슨 러셀 테리어" },
        { label: "패터데일 테리어", value: "패터데일 테리어" },
        { label: "퍼그", value: "퍼그" },
        { label: "페키니즈", value: "페키니즈" },
        { label: "펨브록 웰시 코기", value: "펨브록 웰시 코기" },
        { label: "포르투기즈 워터 도그", value: "포르투기즈 워터 도그" },
        { label: "포메라니안", value: "포메라니안" },
        { label: "포인터", value: "포인터" },
        { label: "폭스 테리어", value: "폭스 테리어" },
        { label: "폴리시 롤런드 시프도그", value: "폴리시 롤런드 시프도그" },
        { label: "폼피츠", value: "폼피츠" },
        { label: "푸미", value: "푸미" },
        { label: "풀리", value: "풀리" },
        { label: "풍산개", value: "풍산개" },
        { label: "프렌치 불도그", value: "프렌치 불도그" },
        { label: "프티 바세 그리퐁 방댕", value: "프티 바세 그리퐁 방댕" },
        { label: "플랫코티드 레트리버", value: "플랫코티드 레트리버" },
        { label: "플롯 하운드", value: "플롯 하운드" },
        { label: "피니시 스피츠", value: "피니시 스피츠" },
        { label: "피레니안 마스티프", value: "피레니안 마스티프" },
        { label: "피레니안 쉽독", value: "피레니안 쉽독" },
        { label: "피레니안 셰퍼드", value: "피레니안 셰퍼드" },
        { label: "필드 스패니얼", value: "필드 스패니얼" },
        { label: "필라 브라질레이로", value: "필라 브라질레이로" },
        { label: "핏 불 테리어", value: "핏 불 테리어" },
        { label: "해리어", value: "해리어" },
        { label: "하바니즈", value: "하바니즈" },
        { label: "홋카이도 이누", value: "홋카이도 이누" },
        { label: "휘핏", value: "휘핏" },
        { label: "달마시안", value: "달마시안" },
        { label: "시베리안 허스키", value: "시베리안 허스키" },
        { label: "시추", value: "시추" },
        { label: "말티푸", value: "말티푸" },
        {
          label: "맨체스터 테리어(스탠다드)",
          value: "맨체스터 테리어(스탠다드)",
        },
        { label: "맨체스터 테리어(토이)", value: "맨체스터 테리어(토이)" },
        { label: "푸들(미니어처)", value: "푸들(미니어처)" },
        { label: "푸들(스탠다드)", value: "푸들(스탠다드)" },
        { label: "푸들(토이)", value: "푸들(토이)" },
        { label: "아나톨리아 셰퍼드(캉갈)", value: "아나톨리아 셰퍼드(캉갈)" },
      ],
    },
    pregnancy: {
      options: [
        { value: "none", label: "아니요" },
        { value: "early", label: "임신 초기" },
        { value: "late", label: "임신 후기" },
      ],
    },
    lactation: {
      options: [
        { value: "none", label: "아니요" },
        { value: "1", label: "1~2마리" },
        { value: "3", label: "3~4마리" },
        { value: "5", label: "5~6마리" },
        { value: "7", label: "7마리 이상" },
      ],
    },
  },
  dogLifestyle: {
    bodyCondition: {
      options: [
        {
          value: "very_thin",
          label: "매우 마름",
          subLabel: ["근육이 거의 느껴지지 않음", "허리뼈와 골반뼈가 튀어나옴"],
          imageUrl: "/images/survey/very-thin.png",
        },
        {
          value: "thin",
          label: "마름",
          subLabel: ["갈비뼈가 쉽게 만져짐", "허리선이 움푹 들어감"],
          imageUrl: "/images/survey/thin.png",
        },
        {
          value: "normal",
          label: "적정 체중",
          subLabel: ["복부가 위로 올라가 있음", "허리선이 잘 구별됨"],
          imageUrl: "/images/survey/normal.png",
        },
        {
          value: "overweight",
          label: "과체중",
          subLabel: ["복부가 평평", "허리선이 거의 보이지 않음"],
          imageUrl: "/images/survey/overweight.png",
        },
        {
          value: "obese",
          label: "심각한 비만",
          subLabel: ["복부가 심하게 쳐짐", "허리선이 없고 옆으로 볼록함"],
          imageUrl: "/images/survey/obese.png",
        },
      ],
    },
    activityLevel: {
      options: [
        { value: "very_high", label: "매우 많아요" },
        { value: "high", label: "많아요" },
        { value: "normal", label: "보통이에요" },
        { value: "low", label: "적어요" },
        { value: "very_low", label: "매우 적어요" },
      ],
    },
    snackFrequency: {
      options: [
        {
          value: "low",
          label: "적어요",
          subLabel: "식사에 영향을 주지 않는 양",
        },
        {
          value: "moderate",
          label: "적당해요",
          subLabel: "어느정도 영향을 주는 양",
        },
        {
          value: "high",
          label: "많아요",
          subLabel: "식사에 상당한 영향을 주는 양",
        },
      ],
    },
    inedibleFood: {
      options: [
        { value: "none", label: "없어요" },
        { value: "chicken", label: "닭" },
        { value: "turkey", label: "칠면조" },
        { value: "duck", label: "오리" },
        { value: "lamb", label: "양" },
        { value: "cow", label: "소" },
        { value: "kangaroo", label: "캥거루" },
        { value: "goat", label: "염소" },
        { value: "quail", label: "메추리" },
        { value: "heart", label: "심장" },
      ],
    },
    healthConcerns: {
      options: [
        {
          value: "vomiting_diarrhea",
          label: "구토•설사",
          Icon: Bowel,
          SelectedIcon: FillBowel,
        },
        {
          value: "weight_control",
          label: "체중조절",
          Icon: Diet,
          SelectedIcon: FillDiet,
        },
        {
          value: "energy_boost",
          label: "기력보충",
          Icon: Energy,
          SelectedIcon: FillEnergy,
        },
        {
          value: "tears",
          label: "눈물•눈곱",
          Icon: Eye,
          SelectedIcon: FillEye,
        },
        {
          value: "skin_hair",
          label: "피부•모질",
          Icon: Skincare,
          SelectedIcon: FillSkincare,
        },
        {
          value: "joint_health",
          label: "관절 건강",
          Icon: Born,
          SelectedIcon: FillBorn,
        },
        {
          value: "puppy_development",
          label: "자견 발육",
          Icon: Puppy,
          SelectedIcon: FillPuppy,
        },
        {
          value: "senior_health",
          label: "노령견 건강",
          Icon: Olddog,
          SelectedIcon: FillOlddog,
        },
      ],
    },
  },
  dogDietHealth: {
    currentMeal: {
      options: [
        { value: "dry", label: "건사료" },
        { value: "wet", label: "습식사료" },
        { value: "homemade", label: "홈메이드식" },
        { value: "freeze_dried", label: "동결건조" },
        { value: "cooked", label: "화식" },
        { value: "raw", label: "생식" },
      ],
    },
    supplements: {
      options: [
        { value: "none", label: "없어요" },
        { value: "probiotics", label: "유산균" },
        { value: "omega_3", label: "오메가-3" },
        { value: "antioxidant", label: "항산화" },
        { value: "joint", label: "관절" },
        { value: "eye", label: "눈" },
        { value: "skin", label: "피부" },
        { value: "immunity", label: "면역력" },
        { value: "heart", label: "심장" },
        { value: "teeth", label: "치아" },
        { value: "bronchus", label: "기관지" },
        { value: "general", label: "종합" },
      ],
    },
    healthIssues: {
      options: [
        { value: "none", label: "없어요", Icon: Non, SelectedIcon: FillNon },
        {
          value: "hyperlipidemia",
          label: "고지혈증",
          Icon: Hyperlipidemia,
          SelectedIcon: FillHyperlipidemia,
        },
        {
          value: "pancreatic",
          label: "췌장질환",
          Icon: Pancreas,
          SelectedIcon: FillPancreas,
        },
        {
          value: "heart",
          label: "심장병",
          Icon: Heart,
          SelectedIcon: FillHeart,
        },
        {
          value: "kidney",
          label: "신장병",
          Icon: Kidney,
          SelectedIcon: FillKidney,
        },
        {
          value: "dermatitis",
          label: "피부염",
          Icon: Skin,
          SelectedIcon: FillSkin,
        },
        {
          value: "cholelithiasis",
          label: "쓸개골탈구",
          Icon: Born,
          SelectedIcon: FillBorn,
        },
        {
          value: "liver_disease",
          label: "간질환",
          Icon: Liver,
          SelectedIcon: FillLiver,
        },
        {
          value: "diabetes",
          label: "당뇨병",
          Icon: Diabetes,
          SelectedIcon: FillDiabetes,
        },
        {
          value: "ear_inflammation",
          label: "귀염증",
          Icon: Ear,
          SelectedIcon: FillEar,
        },
        {
          value: "tears",
          label: "눈물•안구",
          Icon: Eye,
          SelectedIcon: FillEye,
        },
      ],
    },
  },
};

const CRITICAL_DISEASES = [
  {value: "hyperlipidemia", label: "고지혈증"},
  {value: "pancreatic", label: "췌장질환"},
  {value: "heart", label: "심장병"},
  {value: "kidney", label: "신장병"},
];

export interface RecipeTempData {
  id: number;
  name: string;
  imageURL: string;
  ingredients: string[];
  efficacy: string[];
  type: "single" | "double";
}

export interface TempRecipeDto {
  id: number;
  name: string;
  imageURL: string;
}

const RECIPE_TEMP_DATA: Record<number, RecipeTempData> = {
  5: {
    id: 5,
    name: "스타터 프리미엄",
    imageURL: "/images/recipe/starter_premium.png",
    ingredients: ["닭", "칠면조"],
    efficacy: ["구토•설사", "관절 건강"],
    type: "double",
  },
  6: {
    id: 6,
    name: "터키앤비프",
    imageURL: "/images/recipe/turkey_and_beef.png",
    ingredients: ["칠면조", "소"],
    efficacy: ["구토•설사", "관절 건강"],
    type: "double",
  },
  7: {
    id: 7,
    name: "덕앤램",
    imageURL: "/images/recipe/duck_and_lamb.png",
    ingredients: ["오리", "양"],
    efficacy: ["구토•설사", "관절 건강"],
    type: "double",
  },
  8: {
    id: 8,
    name: "램앤비프",
    imageURL: "/images/recipe/lamb_and_beef.png",
    ingredients: ["양", "소"],
    efficacy: ["구토•설사", "관절 건강"],
    type: "double",
  },
  9: {
    id: 9,
    name: "프리미엄 치킨",
    imageURL: "/images/recipe/premium_chicken.png",
    ingredients: ["닭"],
    efficacy: ["구토•설사", "관절 건강"],
    type: "single",
  },
  10: {
    id: 10,
    name: "프리미엄 터키",
    imageURL: "/images/recipe/premium_turkey.png",
    ingredients: ["칠면조"],
    efficacy: ["구토•설사", "관절 건강"],
    type: "single",
  },
  11: {
    id: 11,
    name: "프리미엄 램",
    imageURL: "/images/recipe/premium_lamb.png",
    ingredients: [""],
    efficacy: ["구토•설사", "관절 건강"],
    type: "single",
  },
  12: {
    id: 12,
    name: "프리미엄 비프",
    imageURL: "/images/recipe/premium_beef.png",
    ingredients: ["양"],
    efficacy: ["구토•설사", "관절 건강"],
    type: "single",
  },
};

// 자동 다음 스텝으로 넘어가지 말아야 하는 스텝들을 Set으로 관리.
const SURVEY_NO_AUTO_NEXT_STEP = new Set<SurveyStepKeys>([
  "step3",
  "step10",
  "step11",
  "step12",
  "step13",
  "step14",
]);


const NONE_VALUE = "none";
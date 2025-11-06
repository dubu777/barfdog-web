import WalkImage from "/public/images/healthNote/full-check/walk.svg";
import SkinImage from "/public/images/healthNote/full-check/skin.svg";
import EyesImage from "/public/images/healthNote/full-check/eyes.svg";
import TeethImage from "/public/images/healthNote/full-check/teeth.svg";
import GutImage from "/public/images/healthNote/full-check/gut.svg";
import ThyroidImage from "/public/images/healthNote/full-check/thyroid.svg";
import JointImage from "/public/images/healthNote/full-check/joint.svg";
import HeartImage from "/public/images/healthNote/full-check/heart.svg";
import KidneyImage from "/public/images/healthNote/full-check/kidney.svg";
import ImmuneImage from "/public/images/healthNote/full-check/immune.svg";

import GoodImage from "/public/images/healthNote/full-check/good.svg";
import NormalImage from "/public/images/healthNote/full-check/normal.svg";
import WarningImage from "/public/images/healthNote/full-check/warning.svg";
import DangerImage from "/public/images/healthNote/full-check/danger.svg";

import { BODY_PART_TO_CATEGORY } from "@/constants";

const BODY_PART_PRIORITY = [
  "CVD",
  "URD",
  "IMD",
  "EMD",
  "GID",
  "MSD",
  "OPH",
  "ODD",
  "SKD",
];

const DISEASE_INFO_POSITIVE = {
  key: "none",
  label: "없어요",
  value: 10,
};

const COAT_INFO_LIST = [
  {
    key: `coat${6}`,
    label: "윤기가 흐르고 촉감이 부드러워요",
    value: 6,
  },
  {
    key: `coat${4}`,
    label: "적당히 윤기가 있고 약간의 털빠짐이 있어요",
    value: 4,
  },
  {
    key: `coat${3}`,
    label: "푸석하거나 건조한 느낌이 들고, 이전보다 털빠짐이 증가했어요",
    value: 3,
  },
  {
    key: `coat${2}`,
    label: "거칠고 푸석하며 탈모 부위가 보이기 시작해요",
    value: 2,
  },
  {
    key: `coat${1}`,
    label: "심한 털빠짐과 함께 염증, 악취, 원형 탈모가 발생해요",
    value: 1,
  },
];

const WALK_TIME_BY_WEEK_LIST = [
  { key: "0times", label: "주 0회", value: 0 },
  { key: "1times", label: "주 1회", value: 1 },
  { key: "2times", label: "주 2회", value: 2 },
  { key: "3times", label: "주 3회", value: 3 },
  { key: "4times", label: "주 4회", value: 4 },
  { key: "5times", label: "주 5회", value: 5 },
  { key: "6times", label: "주 6회", value: 6 },
  { key: "everyday", label: "매일", value: 7 },
];

const WALK_MINUTE_BY_WEEK_LIST = [
  { key: "0.5Hour", label: "0.5시간", value: 0.5 },
  { key: "1Hour", label: "1시간", value: 1.0 },
  { key: "1.5Hour", label: "1.5시간", value: 1.5 },
  { key: "2Hour", label: "2시간", value: 2.0 },
  { key: "2.5Hour", label: "2.5시간", value: 2.5 },
  { key: "3Hour", label: "3시간", value: 3.0 },
  { key: "3.5Hour", label: "3.5시간", value: 3.5 },
  { key: "4Hour", label: "4시간", value: 4.0 },
  { key: "4.5Hour", label: "4.5시간", value: 4.5 },
  { key: "over5Hour", label: "5시간이상", value: 5.0 },
];

const DISEASE_INFO = {
  MALASSEZIA_DERMATITIS: {
    category: "SKD",
    name: "말라세지아 피부염",
    diagnosis: "지속적으로 몸을 핥거나 긁고, 피부가 기름져 보여요",
    causes: "말라세지아 효모균의 과다 증식, 지루성 피부, 면역력 저하, 알레르기",
    symptoms:
      "피부 기름짐, 불쾌한 냄새와 각질, 가려움증, 붉은 발진, 피부 두꺼워짐",
    management:
      "지루성 피부를 관리하기 위한 약용 샴푸를 사용하고, 습기 찬 환경을 피하며, 알레르기 유발 요인을 제거하고 면역력 강화에 신경 써야 해요.",
    value: 6,
  },
  FLEA_TICK_DERMATITIS: {
    category: "SKD",
    name: "벼룩 진드기 피부염",
    diagnosis: "극심한 가려움으로 피부가 붉어지고 털이 부분적으로 빠져요",
    causes:
      "벼룩이나 진드기 물림, 기생충에 대한 알레르기 반응, 불충분한 외부 기생충 예방",
    symptoms: "심한 가려움증, 피부 발적, 딱지 형성, 2차 세균 감염",
    management:
      "외부 기생충 예방제를 정기적으로 투여하고, 자주 빗질하여 이상을 확인하며, 실내외 생활 공간을 항상 깨끗하게 유지하는 것이 중요해요.",
    value: 4,
  },
  MYCOTIC_DERMATITIS: {
    category: "SKD",
    name: "진균성 피부염",
    diagnosis: "원형 탈모가 발생하고 비듬과 각질이 많아졌어요",
    causes:
      "곰팡이 감염(예: 백선), 습한 환경, 면역력 저하, 다른 동물로부터의 전염",
    symptoms:
      "원형의 탈모 부위, 피부 각질화, 가려움증, 붉은 반점, 피부 두꺼워짐",
    management:
      "습하고 더러운 환경을 피하고, 환기를 자주 시켜 피부가 마르게 해주는 것이 중요해요.",
    value: 2,
  },
  BACTERIAL_DERMATITIS: {
    category: "SKD",
    name: "세균성 피부염",
    diagnosis: "피부가 붉어지면서 진물과 고름이 생기고 악취가 나요",
    causes:
      "상처 부위의 세균 감염, 면역력 저하, 불충분한 위생 관리, 알레르기 반응, 기생충 감염, 영양 불균형",
    symptoms: "피부 발적, 농포 형성, 가려움증, 통증, 탈모, 악취",
    management:
      "정기적으로 목욕시키고 피부를 깨끗이 유지해야 하며, 상처 발생 시 빠르게 소독해 주세요.",
    value: 1,
  },
  DRY_EYE: {
    category: "OPH",
    name: "건성안 (안구건조증)",
    diagnosis: "눈곱이 많아지고 눈물이 너무 많거나 부족해요",
    causes: "눈물샘 기능 저하, 자가면역 질환, 안약 남용, 노화, 약물 부작용",
    symptoms: "눈 건조감, 충혈, 실눈뜨기, 눈곱 증가, 각막 손상",
    management:
      "인공눈물을 정기적으로 넣어 수분을 유지하고, 눈 주변 청결을 유지하여 관리해 주는 것이 좋아요.",
    value: 6,
  },
  CONJUNCTIVITIS: {
    category: "OPH",
    name: "결막염",
    diagnosis: "눈을 자주 비비거나 깜짝이고 눈을 뜨기 불편해해요",
    causes: "세균 감염, 바이러스 감염, 알레르기, 먼지·이물질, 자극성 화학물질",
    symptoms: "눈 충혈, 눈곱 증가, 눈물 흘림, 가려움, 눈꺼풀 부종",
    management:
      "외출 후 눈을 깨끗이 닦아주고, 먼지나 꽃가루에 노출되지 않게 주의해 주세요.",
    value: 4,
  },
  CATARACT: {
    category: "OPH",
    name: "백내장",
    diagnosis: "눈이 뿌옇게 변하거나 충혈되며, 시력이 저하됐어요",
    causes: "노화, 유전적 요인, 당뇨병, 외상, 눈 염증, 독성 물질 노출",
    symptoms:
      "눈동자 혼탁, 시력 저하, 사물 충돌, 방향 감각 상실, 눈의 빛 반응 저하",
    management:
      "정기적으로 눈 건강을 점검하고 당뇨병 같은 질병을 조기에 관리하며, 외상이나 강한 자외선 노출을 피하는 것이 중요해요.",
    value: 2,
  },
  CORNEAL_ULCER: {
    category: "OPH",
    name: "각막궤양",
    diagnosis: "심한 충혈과 통증을 보이며, 눈물과 눈곱이 과도하게 나타나요",
    causes:
      "외상, 이물질 접촉, 눈 깜빡임 감소, 안구 건조증, 감염, 자가면역 질환",
    symptoms: "충혈, 눈물 증가, 통증, 눈 비빔, 시야 흐림, 각막 혼탁",
    management:
      "눈에 이물질이 들어가지 않도록 주의하고, 눈을 자주 비비거나 충혈이 지속되는 경우 바로 검사받는 것이 좋아요.",
    value: 1,
  },
  TARTAR_PLAQUE: {
    category: "ODD",
    name: "치석 축적",
    diagnosis: "치아에 노란 덩어리가 보이고, 입냄새가 평소보다 심해졌어요",
    causes:
      "양치 부족, 부적절한 식단, 침 속 미네랄, 유전적 요인, 구강 구조 문제",
    symptoms:
      "노란 치아, 구취, 잇몸 염증, 출혈, 치아 흔들림, 구강 내 세균 증가",
    management:
      "매일 양치를 해주고, 치석 제거용 간식을 병행하면 좋아요. 정기적인 치과 검진과 스케일링으로 치석을 예방할 수 있습니다.",
    value: 6,
  },
  PERIODONTAL_DISEASE: {
    category: "ODD",
    name: "치주염",
    diagnosis: "잇몸이 붓거나 출혈이 있으며 치아가 흔들려요",
    causes:
      "치석 및 플라그 축적, 구강 위생 불량, 세균 감염, 유전적 요인, 영양 결핍",
    symptoms: "잇몸 출혈, 구취, 치아 흔들림, 식욕 부진, 잇몸 통증, 턱 통증",
    management:
      "치아를 자주 닦아주고 정기적으로 스케일링을 받아야 해요. 구강 청결을 유지하면 치주염을 예방하는 데 큰 도움이 됩니다.",
    value: 4,
  },
  CRACKED_TOOTH: {
    category: "ODD",
    name: "치아 균열/파절",
    diagnosis: "음식을 씹지 않고 삼키거나 딱딱한 사료를 먹기 힘들어해요",
    causes: "딱딱한 물체 씹기, 외상, 교합 문제, 충치로 인한 약화, 사고, 노화",
    symptoms:
      "치아 깨짐, 씹을 때 통증, 음식 거부, 출혈, 잇몸 염증, 턱 만지기 불편해함",
    management:
      "딱딱한 장난감이나 뼈는 피하고, 정기적으로 구강 검진을 통해 이상을 조기에 발견해야 해요. 이상 발견 시 빠르게 수의사의 진료를 받아야 합니다.",
    value: 2,
  },
  STOMATITIS: {
    category: "ODD",
    name: "구내염",
    diagnosis:
      "입냄새가 심하게 나거나 잇몸에서 피가 나며, 음식을 먹을 때 심한 통증을 느껴요",
    causes:
      "세균 감염, 바이러스 감염, 면역 반응 이상, 치석 축적, 영양 부족, 구강 위생 불량",
    symptoms:
      "구강 내 염증, 침 흘림, 입 냄새, 통증으로 인한 식욕 저하, 출혈, 궤양",
    management:
      "정기적으로 양치질을 시키고 구강 상태를 점검해야 해요. 잇몸이 붓거나 통증을 느끼면 빠르게 검진을 받고 치석 제거 등의 처치를 해야 합니다.",
    value: 1,
  },
  IBS: {
    category: "GID",
    name: "과민성 대장 증후군 (IBS)",
    diagnosis: "설사와 변비를 반복하거나 배를 만지면 불편해 해요",
    causes:
      "만성 스트레스, 장운동 이상, 식이 불균형, 장내 세균 변화, 알레르기, 유전",
    symptoms: "간헐적 설사, 복부 불편감, 점액성 변, 체중 변화, 식욕 변화, 구토",
    management:
      "스트레스를 줄이고 저자극성의 소화가 잘 되는 식단을 유지하며, 장 건강에 좋은 유산균을 섭취하면 증상 완화에 도움이 됩니다.",
    value: 6,
  },
  ENTERITIS: {
    category: "GID",
    name: "장염",
    diagnosis: "구토와 설사가 잦고 이전보다 식욕이 줄었어요",
    causes:
      "세균성 감염, 바이러스 감염, 부적절한 음식 섭취, 독성 물질 섭취, 기생충 감염, 알레르기",
    symptoms: "설사, 구토, 복통, 식욕 감소, 탈수, 피로감, 잦은 배변 시도",
    management:
      "위생적인 환경과 식사를 유지하고 새로운 음식은 천천히 급여하는 게 좋아요. 이상 증상이 보이면 빠르게 진료받는 것이 중요해요.",
    value: 4,
  },
  GASTRIC_ULCER: {
    category: "GID",
    name: "위궤양",
    diagnosis: "종종 혈변을 하고 복통으로 끙끙거릴 때가 있어요",
    causes:
      "만성 스트레스, 비스테로이드 항염증제(NSAIDs) 장기 복용, 위산 과다, 종양, 이물질 섭취",
    symptoms:
      "구토, 혈액이 섞인 구토물, 복통, 식욕 저하, 체중 감소, 무기력, 어두운 색 변",
    management:
      "약물 복용 시 수의사 지시에 따라야 하고, 자극적인 음식이나 급격한 식단 변화는 피하는 것이 좋습니다.",
    value: 2,
  },
  HEMORRHAGIC_ENTERITIS: {
    category: "GID",
    name: "출혈성 장염",
    diagnosis: "잦은 피가 섞인 구토와 혈변으로 기운 없이 축 쳐져 있어요",
    causes:
      "세균 감염, 바이러스 감염, 독성 물질 섭취, 심한 스트레스, 음식 알레르기, 면역 이상",
    symptoms: "다량의 혈변, 구토, 식욕 감소, 탈수, 무기력, 복통",
    management:
      "스트레스 상황을 줄이고, 이상 증상이 나타나면 바로 진료를 받아야 해요. 백신 접종도 도움이 됩니다.",
    value: 1,
  },
  STRUMITIS: {
    category: "EMD",
    name: "갑상선염",
    diagnosis: "목 부위를 만지면 불편해하고 쉽게 지쳐요",
    causes: "면역 체계 이상, 감염, 외상성 손상, 세균 또는 바이러스 감염",
    symptoms:
      "활동량 감소, 무기력, 피로, 식욕 감소, 피부 건조, 털 빠짐, 체온 증가, 무기력",
    management:
      "면역력 관리를 위해 충분한 휴식과 영양을 섭취하고, 정기 검진으로 염증 발생 여부를 조기에 확인하는 것이 중요해요.",
    value: 6,
  },
  HYPOTHYROIDISM: {
    category: "EMD",
    name: "갑상선 기능 저하증",
    diagnosis: "털이 푸석해지고 체중이 늘며, 쉽게 무기력해져요",
    causes: "자가면역성 갑상선염, 갑상선 조직의 퇴행성 변화, 유전적 요인",
    symptoms:
      "피로, 체중 증가, 피부 건조, 심박수 저하, 떨거나 움츠림, 우울감, 탈모, 운동량 감소",
    management:
      "균형 잡힌 식단과 적당한 운동으로 건강을 유지하고, 무기력이나 피부 변화가 느껴지면 정기적으로 갑상선 기능을 점검하는 것이 중요해요.",
    value: 4,
  },
  HYPERTHYROIDISRM: {
    category: "EMD",
    name: "갑상선 기능 항진증",
    diagnosis: "활동량과 식욕이 늘지만 체중은 줄어들어요",
    causes:
      "갑상선 종양, 자가면역질환, 갑상선 조직의 과다 증식, 약물 과다 복용",
    symptoms:
      "과잉 활동성, 체중 감소, 식욕 증가, 심박수 증가, 과민 반응, 더위를 심하게 탐, 불안, 설사",
    management:
      "정기 검진을 통해 목 부위 종양을 조기에 발견하고, 평소 활동성과 식욕 변화를 주의 깊게 관찰하는 것이 중요해요.",
    value: 2,
  },
  THYROID_CANCER: {
    category: "EMD",
    name: "갑상선암",
    diagnosis: "목에 딱딱한 혹이 만져지거나 숨쉬기 힘들어해요",
    causes: "유전적 요인, 노령견, 유전적 요인, 환경적 요인, 방사선 노출",
    symptoms:
      "목 부위 종양, 목소리 변화, 호흡 곤란, 과도한 헐떡임, 체중 감소, 식욕 저하, 무기력",
    management:
      "정기적인 건강 검진과 목 부위 이상 유무를 자주 확인해요. 이상이 느껴지면 즉시 진료를 받고 조직 검사를 통해 조기 발견하는 것이 중요합니다.",
    value: 1,
  },
  PATELLAR_LUXATION: {
    category: "MSD",
    name: "슬개골 탈구",
    diagnosis: "갑자기 절뚝이거나 무릎을 털듯이 걷는 행동을 보여요",
    causes: "선천적 구조 이상, 유전, 근육 약화, 반복적인 외상",
    symptoms: "간헐적인 절뚝거림, 무릎이 빠지는 듯한 걸음거리, 불안정한 보행",
    management:
      "미끄러운 바닥을 피하고 무리한 점프나 높은 곳에서의 활동을 피해주세요. 적절한 체중 유지와 슬개골 주변 근육 강화 운동이 도움돼요.",
    value: 6,
  },
  DEGENERATIVE_ARTHRITIS: {
    category: "MSD",
    name: "퇴행성 관절염",
    diagnosis: "오래 쉬다 일어날 때 뻣뻣하거나 다리를 절뚝여요",
    causes: "노화, 만성 관절 손상, 비만, 유전적 요인, 외상, 과도한 사용",
    symptoms: "운동 감소, 뻣뻣한 움직임, 통증, 관절 부종, 절뚝거림",
    management:
      "관절에 무리가 가지 않도록 체중 조절을 하고, 정기적인 운동과 영양 관리로 관절 건강을 유지하는 것이 중요해요.",
    value: 4,
  },
  HIP_DYSPLASIA: {
    category: "MSD",
    name: "고관절 이형성증",
    diagnosis: "뒷다리에 힘이 빠지거나 엉덩이를 흔드는 걸음걸이를 보여요",
    causes:
      "유전적 요인, 성장기 영양 과잉, 비만, 빠른 성장, 운동 과다, 칼슘 과다 섭취",
    symptoms:
      "엉덩이 흔들림, 뒷다리 절뚝거림, 통증 호소, 활동성 감소, 움직임 제한",
    management:
      "성장기에는 적절한 영양과 운동이 중요하며, 유전적 요인을 고려해 정기적으로 검진을 받아야 해요. 체중 관리는 필수입니다.",
    value: 2,
  },
  ACL_TEARS: {
    category: "MSD",
    name: "전십자인대 파열",
    diagnosis: "뒷다리를 들고 걷거나 한쪽 다리에만 체중을 실어 걸어요",
    causes:
      "인대 약화, 격렬한 운동, 외상, 비만, 노화, 관절 구조 이상, 반복된 충격",
    symptoms: "갑작스러운 다리 들기, 절뚝거림, 무릎 통증, 운동 회피, 관절 부기",
    management:
      "체중을 적절히 유지하고, 무리한 점프나 과격한 운동은 피해야 해요. 다리에 부담이 가는 활동은 제한해주는 것이 좋습니다.",
    value: 1,
  },
  ARRHYTHMIA: {
    category: "CVD",
    name: "부정맥",
    diagnosis: "뛰다가 갑자기 주저앉거나 숨을 고르지 못해요",
    causes:
      "심장 전도계 이상, 유전, 약물 부작용, 심장 질환 동반, 전해질 불균형",
    symptoms: "불규칙한 심박수, 실신, 운동 시 숨참, 무기력, 갑작스러운 기절",
    management:
      "심장 리듬 이상이 의심되면 심전도 검사를 받아야 해요. 정기적인 검진과 전해질 균형 조절이 부정맥 예방에 도움이 됩니다.",
    value: 6,
  },
  MMVD: {
    category: "CVD",
    name: "이첨판 폐쇄부전증(MMVD)",
    diagnosis: "기침을 자주 하거나 조금만 움직여도 숨이 가빠져요",
    causes: "노화, 유전적 요인, 승모판 퇴행성 변화, 노령견에서 흔함",
    symptoms: "심장 잡음, 지속적인 기침, 피로, 호흡 곤란, 운동량 감소",
    management:
      "노령견은 정기적인 심장 청진과 심초음파 검진이 필수예요. 초기 발견 시 약물로 진행을 늦출 수 있으므로 조기 치료가 중요합니다.",
    value: 4,
  },
  DCM: {
    category: "CVD",
    name: "확장성 심근증 (DCM)",
    diagnosis: "숨쉬기 힘들어하며 배가 부풀어 올라요",
    causes: "유전적 요인, 타우린 부족, 심근 섬유의 퇴행성 변화",
    symptoms: "기침, 호흡 곤란, 복부 팽만, 심박수 증가, 피로감, 실신",
    management:
      "심장 건강에 좋은 영양소를 포함한 식단을 제공하고, 정기적으로 심장 초음파와 혈액 검사를 통해 조기 발견이 중요해요.",
    value: 2,
  },
  CHF: {
    category: "CVD",
    name: "심부전 (CHF)",
    diagnosis: "숨을 가쁘게 쉬고 혀가 파랗게 변했어요",
    causes: "심장 판막 질환, 심근증, 고혈압, 선천성 심장병, 심근 손상",
    symptoms: "심한 기침, 호흡 곤란, 식욕 부진, 복수, 청색증",
    management:
      "체중을 적절히 유지하고 정기적인 심장 검진을 받아야 해요. 심장 약 복용은 반드시 수의사의 지시에 따라 꾸준히 진행해야 합니다.",
    value: 1,
  },
  RENAL_INSUFFICIENCY: {
    category: "URD",
    name: "신장 기능 저하",
    diagnosis: "평소보다 물을 많이 마시고 소변을 자주 봐요",
    causes: "만성 질환 진행, 신장 기능 감소, 유전, 약물 부작용, 고혈압",
    symptoms: "물을 많이 마심, 피로, 식욕 저하, 체중 감소, 소변량 증가",
    management:
      "신장 보호 처방식과 수분 공급이 중요하고, 혈액과 소변 검사를 통해 주기적으로 기능 저하 여부를 확인하는 것이 좋아요.",
    value: 6,
  },
  UROLITHIASIS: {
    category: "URD",
    name: "요로 결석",
    diagnosis: "소변을 볼 때 힘들어하거나 피가 섞여 나와요",
    causes: "불충분한 수분 섭취, 부적절한 식단, 유전적 요인, 요로 감염",
    symptoms: "배뇨 곤란, 혈뇨, 잦은 배뇨 시도, 통증, 소변 중단",
    management:
      "수분을 충분히 공급하고, 처방식을 통해 소변의 pH를 조절해야 해요. 정기적인 요분석과 초음파 검진으로 조기 발견할 수 있습니다.",
    value: 4,
  },
  AKI: {
    category: "URD",
    name: "급성 신부전",
    diagnosis: "갑자기 밥을 먹지 않고 구토하거나 소변을 거의 보지 않아요",
    causes: "독성 물질 섭취, 심한 탈수, 요로 폐색, 감염, 패혈증",
    symptoms: "급격한 무기력, 구토, 식욕 부진, 소변량 감소 또는 없음, 탈수",
    management:
      "독성 물질 접근을 차단하고, 수분 공급에 신경 써야 해요. 이상 증상이 보이면 즉시 병원에서 수액 치료 등 빠른 조치를 받아야 합니다.",
    value: 2,
  },
  CKD: {
    category: "URD",
    name: "만성 신부전",
    diagnosis: "평소보다 소변을 자주 보고 식욕과 체중이 감소했어요",
    causes: "노화, 유전, 고혈압, 신장염, 만성 요로 감염",
    symptoms: "다음다뇨, 구토, 식욕 저하, 체중 감소, 구취, 피로",
    management:
      "수분 섭취를 충분히 하고, 저단백 처방식을 유지하며, 정기적으로 혈액검사와 소변검사를 통해 신장 상태를 점검해야 해요.",
    value: 1,
  },
  IMMUNODEFICIENCY: {
    category: "IMD",
    name: "면역 결핍증",
    diagnosis: "자주 감기에 걸리고 상처 회복이 느려요",
    causes: "선천적 유전, 바이러스 감염, 영양 결핍, 약물",
    symptoms: "반복적인 감염, 체중 감소, 상처가 잘 아물지 않음",
    management:
      "균형 잡힌 식사와 위생 관리를 통해 감염을 예방하고, 감기나 장염 증상에도 민감하게 대응하는 것이 중요해요.",
    value: 6,
  },
  AUTOIMMUNE_DERMATOSIS: {
    category: "IMD",
    name: "자가면역 피부질환",
    diagnosis: "코와 눈 주위 피부가 벗겨지거나 궤양이 생겼어요",
    causes: "면역체계 이상, 유전, 약물 반응, 스트레스",
    symptoms: "피부 궤양, 물집, 피부 벗겨짐, 탈모, 가려움",
    management:
      "피부 자극을 줄이고 스트레스를 관리하며, 증상 발생 시 빠르게 면역조절 치료를 받아야 해요.",
    value: 4,
  },
  LYMPHOMA: {
    category: "IMD",
    name: "림프종",
    diagnosis: "목이나 겨드랑이에 멍울이 만져지거나 쉽게 지쳐해요",
    causes:
      "림프구의 악성 종양, 유전적 요인, 면역력 저하, 환경 독소, 화학물질 노출",
    symptoms: "림프절 종대, 체중 감소, 식욕 저하, 무기력, 드물게 호흡 곤란",
    management:
      "면역력을 높이기 위해 균형 잡힌 식단과 충분한 휴식이 필요하며, 조기 진단을 위한 정기 건강검진이 중요해요.",
    value: 2,
  },
  IMHA: {
    category: "IMD",
    name: "면역 매개성 용혈성 빈혈 (IMHA)",
    diagnosis: "잇몸이 하얗게 변하고 황달이나 빈혈 증상을 보여요",
    causes: "자가면역 반응, 감염, 종양, 약물 반응, 유전적 요인",
    symptoms: "창백한 잇몸, 무기력, 빠른 호흡, 황달, 식욕 부진, 고열",
    management:
      "정기 건강검진을 통해 혈액 상태를 확인하고, 급격한 무기력이나 잇몸 변화가 보이면 즉시 진료를 받아야 해요.",
    value: 1,
  },
} as const;

const DISEASE_INFO_LIST = Object.entries(DISEASE_INFO).map(([key, value]) => ({
  key,
  ...value,
}));

const getOptionByLabel = (category: string) => {
  return [
    DISEASE_INFO_POSITIVE,
    ...DISEASE_INFO_LIST.filter((disease) => disease.category === category).map(
      (disease) => ({
        key: disease.key,
        label: disease.diagnosis,
        value: disease.value,
      })
    ),
  ];
};

const DISEASE_CATEGORY = {
  COAT: {
    label: "모질",
    imageUrl: SkinImage,
    options: COAT_INFO_LIST,
    title: "모질은 어떤 상태인가요?",
    multiple: false,
  },
  walkCount: {
    label: "평균 산책 횟수",
    imageUrl: WalkImage,
    options: WALK_TIME_BY_WEEK_LIST,
    title: "평균 산책 횟수는 어떻게 되나요?",
    flexWrap: true,
    multiple: false,
  },
  walkHours: {
    label: "평균 산책 시간",
    imageUrl: WalkImage,
    options: WALK_MINUTE_BY_WEEK_LIST,
    title: "평균 산책 시간은 어떻게 되나요?",
    flexWrap: true,
    multiple: false,
  },
  SKD: {
    label: BODY_PART_TO_CATEGORY.SKD,
    imageUrl: SkinImage,
    options: getOptionByLabel("SKD"),
    multiple: true,
  },
  OPH: {
    label: BODY_PART_TO_CATEGORY.OPH,
    imageUrl: EyesImage,
    options: getOptionByLabel("OPH"),
    multiple: true,
  },
  ODD: {
    label: BODY_PART_TO_CATEGORY.ODD,
    imageUrl: TeethImage,
    options: getOptionByLabel("ODD"),
    multiple: true,
  },
  GID: {
    label: BODY_PART_TO_CATEGORY.GID,
    imageUrl: GutImage,
    options: getOptionByLabel("GID"),
    multiple: true,
  },
  EMD: {
    label: BODY_PART_TO_CATEGORY.EMD,
    imageUrl: ThyroidImage,
    options: getOptionByLabel("EMD"),
    multiple: true,
  },
  MSD: {
    label: BODY_PART_TO_CATEGORY.MSD,
    imageUrl: JointImage,
    options: getOptionByLabel("MSD"),
    multiple: true,
  },
  CVD: {
    label: BODY_PART_TO_CATEGORY.CVD,
    imageUrl: HeartImage,
    options: getOptionByLabel("CVD"),
    multiple: true,
  },
  URD: {
    label: BODY_PART_TO_CATEGORY.URD,
    imageUrl: KidneyImage,
    options: getOptionByLabel("URD"),
    multiple: true,
  },
  IMD: {
    label: BODY_PART_TO_CATEGORY.IMD,
    imageUrl: ImmuneImage,
    options: getOptionByLabel("IMD"),
    multiple: true,
  },
} as const;

const DISEASE_CATEGORY_LIST = Object.entries(DISEASE_CATEGORY).map(
  ([key, value]) => ({
    key: key,
    ...value,
  })
);

const DEFAULT_RECOMMENDED_ITEM_LIST = [
  {
    title: "장트러블을 막는 유산균 케어",
    description:
      "발효 채소와 천연 유산균이 장내 유익균을 늘리고 유해균을 억제해요. 건강할 때부터 꾸준히 장을 관리하면 설사나 변비 같은 트러블을 예방할 수 있어요.",
  },
  {
    title: "염증 관리로 면역력과 관절을 함께 보호",
    description:
      "유기농 강황의 풍부한 커큐민이 몸 속 염증 반응을 조절해요. 노화가 시작되기 전부터 염증 관리를 시작하면 면역력과 관절 건강을 함께 지킬 수 있어요.",
  },
  {
    title: "자연스러운 음수량 개선 습관",
    description:
      "100% 국내산 한우 뼈를 우려 만든 사골 큐브가 음수량 개선에 도움을 줘요. 음수량이 부족하면 생길 수 있는 탈수, 요로계 문제를 미리 막을 수 있어요.",
  },
]

const RECOMMENDED_ITEM_BY_DISEASE = {
  SKD: {
    title: "윤기 있고 건강한 모질",
    description:
      "양과 소의 질 좋은 단백질에 항산화 채소와 햄프씨드를 더해 건강한 피부 장벽과 윤기 나는 모질을 함께 관리할 수 있어요.",
  },
  OPH: {
    title: "맑고 건강한 눈 컨디션",
    description:
      "항산화력이 뛰어난 블루베리와 당근, 대구간유를 조합한 식단으로 망막을 보호하고 눈의 노화와 시력 저하 예방에 도움을 줄 수 있어요.",
  },
  ODD: {
    title: "튼튼하고 깨끗한 치아 관리",
    description:
      "오래 씹는 동안 치석과 치태를 자연스럽게 제거해주고, 저작활동을 통해 스트레스를 해소하며 치아와 잇몸 건강 유지에 도움을 줘요.",
  },
  GID: {
    title: "균형 잡힌 장내 환경",
    description:
      "유기농 채소를 자연 발효시켜 만든 천연 유산균이 유익균이 자라기 좋은 환경을 만들어주고 장내 균형 회복에 도움을 줘요.",
  },
  EMD: {
    title: "갑상선 기능을 위한 영양 밸런스",
    description:
      "셀레늄과 아연, 비타민 등 다양한 영양소가 갑상선 호르몬의 기능을 원활히 돕고 항산화 작용을 더해 신진대사의 균형과 에너지 순환을 건강하게 유지합니다.",
  },
  MSD: {
    title: "유연하고 편안한 관절 움직임",
    description:
      "관절 건강에 좋은 커큐민이 풍부한 유기농 강황으로 만들어진 제품이에요. 염증 완화와 움직임 개선에 도움을 줄 수 있어 꾸준한 관리에 적합해요.",
  },
  CVD: {
    title: "심장과 혈관의 균형 케어",
    description:
      "오리고기의 오메가-3가 심장 염증을 완화하고 혈관 건강을 돕고, 양고기의 L-카르니틴이 심장 에너지 대사를 지원해 안정적인 심장 기능 유지를 도와줘요.",
  },
  URD: {
    title: "신장을 위한 부드러운 수분 케어",
    description:
      "풍부한 수분이 음수량을 늘려주고 노폐물 배출을 도와 신장과 요로 건강 유지에 도움을 줄 수 있어요. 콜라겐과 글리신이 전반적인 활력과 회복에도 기여해요.",
  },
  IMD: {
    title: "컨디션 회복을 돕는 면역 케어",
    description:
      "고단백 닭과 면역 기능에 도움을 주는 버섯, 채소를 함께 고아낸 스프입니다. 영양이 부족하거나 기운이 없을 때 면역력 보충용으로 간편하게 급여할 수 있어요.",
  },
} as const;

const RESULT_HEALTH_STATUS_ICON_MAP = {
  good: GoodImage,
  normal: NormalImage,
  warning: WarningImage,
  danger: DangerImage,
};

export {
  DISEASE_CATEGORY,
  DISEASE_CATEGORY_LIST,
  DISEASE_INFO_POSITIVE,
  DISEASE_INFO,
  DISEASE_INFO_LIST,
  BODY_PART_PRIORITY,
  DEFAULT_RECOMMENDED_ITEM_LIST,
  RECOMMENDED_ITEM_BY_DISEASE,
  RESULT_HEALTH_STATUS_ICON_MAP,
};

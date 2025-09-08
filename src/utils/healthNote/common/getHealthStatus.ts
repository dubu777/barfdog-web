import GoodEmogi from '/public/images/healthNote/good_emoji.svg';
import NormalEmogi from '/public/images/healthNote/normal_emoji.svg';
import WarningEmogi from '/public/images/healthNote/warning_emoji.svg';
import DangerEmogi from '/public/images/healthNote/danger_emogi.svg';

type StatusLevel = 'good' | 'normal' | 'warning' | 'danger';
type Tone = '400' | '500';

type ScoreStatus =
	| 'downLarge'
	| 'downSmall'
	| 'same'
	| 'upSmall'
	| 'upLarge';

type SimplifiedStatus = 'up' | 'same' | 'down';

const STATUS_ICON_MAP = {
	good: GoodEmogi,
	normal: NormalEmogi,
	warning: WarningEmogi,
	danger: DangerEmogi,
};

const STATUS_LABEL_MAP = {
	good: '건강해요!',
	normal: '양호해요',
	warning: '주의가 필요해요',
	danger: '위험해요',
};

const STATUS_COLOR_BASE_FULL = {
	good: 'blue',
	normal: 'green',
	warning: 'yellow',
	danger: 'red',
} as const;

const STATUS_COLOR_BASE_SIMPLE = {
	good: 'blue',
	normal: 'green',
	warning: 'yellow',
	danger: 'pastelRed',
} as const;

function getStatusLevel(score: number): StatusLevel {
	if (score >= 90) return 'good';
	if (score >= 70) return 'normal';
	if (score >= 40) return 'warning';
	return 'danger';
}

function getStatusColor(
	base: typeof STATUS_COLOR_BASE_FULL | typeof STATUS_COLOR_BASE_SIMPLE,
	level: StatusLevel,
	tone: Tone = '400'
) {
	const color = base[level];
	if (color === 'red' || color === 'pastelRed') return color;
	return `${color}${tone}` as const;
}

export function getFullHealthStatus(score: number, tone: Tone = '400') {
	const level = getStatusLevel(score);
	return {
		key: level,
		label: STATUS_LABEL_MAP[level],
		color: getStatusColor(STATUS_COLOR_BASE_FULL, level, tone),
		icon: STATUS_ICON_MAP[level],
	};
}

export function getSimpleHealthStatus(score: number, tone: Tone = '400') {
	const level = getStatusLevel(score);
	return {
		key: level,
		label: STATUS_LABEL_MAP[level],
		color: getStatusColor(STATUS_COLOR_BASE_SIMPLE, level, tone),
	};
}

export function getScoreChangeStatus (diff: number, diffValue: number): ScoreStatus {
	if (diff >= diffValue) return 'upLarge';
	if (diff > 0) return 'upSmall';
	if (diff === 0) return 'same';
	if (diff >- diffValue) return 'downSmall';
	return 'downLarge';
};

export function getSimplifyStatus(status: ScoreStatus): SimplifiedStatus {
	if (status === 'same') return 'same';
	if (status.startsWith('up')) return 'up';
	return 'down';
}

export function getSimplifyStatusLabel (simplifyStatus: SimplifiedStatus): string {
	if (simplifyStatus === 'same') return '우리 아이는 딱 평균이에요!';
	if (simplifyStatus === 'up') return '우리 아이는 아주 건강해요!';
	return '우리 아이는 관리가 필요해요!';
}

export function getSimplifyStatusColor (simplifyStatus: SimplifiedStatus): 'green500' | 'blue600' | 'red' {
	if (simplifyStatus === 'same') return 'green500';
	if (simplifyStatus === 'up') return 'blue600';
	return 'red';
}
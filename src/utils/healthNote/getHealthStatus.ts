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
	good: '건강해요',
	normal: '양호해요',
	warning: '주의가 필요해요',
	danger: '위험해요',
};

const STATUS_COLOR_BASE = {
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

function getStatusColor(level: StatusLevel, tone: Tone = '400') {
	const base = STATUS_COLOR_BASE[level];

	if (base === 'pastelRed') return base;

	return `${base}${tone}` as const;
}

export function getFullHealthStatus(score: number, tone: Tone = '400') {
	const level = getStatusLevel(score);
	return {
		key: level,
		label: STATUS_LABEL_MAP[level],
		color: getStatusColor(level, tone),
		icon: STATUS_ICON_MAP[level],
	};
}

export function getSimpleHealthStatus(score: number, tone: Tone = '400') {
	const level = getStatusLevel(score);
	return {
		key: level,
		label: STATUS_LABEL_MAP[level],
		color: getStatusColor(level, tone),
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

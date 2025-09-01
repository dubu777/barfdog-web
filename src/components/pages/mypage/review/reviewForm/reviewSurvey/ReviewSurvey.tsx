import * as styles from './ReviewSurvey.css';
import { themeVars } from "@/styles/theme.css";
import { Dispatch, MouseEvent, SetStateAction } from "react";
import Text from "@/components/common/text/Text";
import { SurveyKey, SurveyQuestionType, SurveyValue } from "@/types";

const surveyQuestions: SurveyQuestionType[] = [
	{ key: "preference", label: "기호도가 어땠나요?" },
	{ key: "freshness", label: "신선도가 어땠나요?" },
	{ key: "deliveryStatus", label: "배송상태가 어땠나요?" },
];

const surveyOptions: { value: SurveyValue; type: string }[] = [
	{ value: "dislike", type: "dislike" },
	{ value: "normal", type: "normal" },
	{ value: "like", type: "like" },
];

interface SurveyQuestionProps {
	questionKey: SurveyKey;
	label: string;
	value: SurveyValue;
	onChange: (key: SurveyKey, value: SurveyValue) => void;
}

const SurveyIcon = ({ active, type }: { active: boolean, type: SurveyValue }) => {
	const fill = !active ? themeVars.colors.gray.gray200 : themeVars.colors.red.lightPink;
	const stroke = !active ? themeVars.colors.gray.gray500 : themeVars.colors.red.red;
	return (
		<>
			<svg width="53" height="52" viewBox="0 0 53 52" fill="none" xmlns="http://www.w3.org/2000/svg">
				<circle cx="26.5" cy="26" r="25" fill={fill} stroke={stroke} strokeWidth="2"/>
				{type === 'dislike' ?
					<path d="M18.375 36.5625C18.375 32.0752 22.0127 28.4375 26.5 28.4375C30.9873 28.4375 34.625 32.0752 34.625 36.5625" stroke={stroke} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
					: type === 'normal' ?
						<path d="M34.625 30.875C30.5625 34.9375 26.5 30.0625 26.5 30.0625C26.5 30.0625 22.4375 34.9375 18.375 30.875" stroke={stroke} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
						: type === 'like' && <path d="M34.625 28.4375C34.625 32.9248 30.9873 36.5625 26.5 36.5625C22.0127 36.5625 18.375 32.9248 18.375 28.4375" stroke={stroke} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>

				}
				<circle cx="18.7812" cy="20.7188" r="0.71875" fill={stroke} stroke={stroke} strokeLinecap="round" strokeLinejoin="round"/>
				<circle cx="34.2188" cy="20.7188" r="0.71875" fill={stroke} stroke={stroke} strokeLinecap="round" strokeLinejoin="round"/>
			</svg>
		</>
	)
}

const SurveyQuestion = ({ questionKey, label, value, onChange }: SurveyQuestionProps) => (
	<div className={styles.reviewSurveyBox}>
		<Text type="title4" align="center">
			{label}
		</Text>
		<div className={styles.surveyIconBox}>
			{surveyOptions.map(({ value: optionValue, type }) => (
				<button 
					key={type}
					className={styles.surveyIcon}
					onClick={(e: MouseEvent) => {
						e.preventDefault();
						onChange(questionKey, optionValue)
					}}
				>
					<SurveyIcon active={value === optionValue} type={type as SurveyValue} />
				</button>
			))}
		</div>
	</div>
);

interface ReviewSurveyProps {
	surveyFormData: Record<SurveyKey, SurveyValue>;
	setSurveyFormData: Dispatch<SetStateAction<Record<SurveyKey, SurveyValue>>>;
}

const ReviewSurvey = ({ surveyFormData, setSurveyFormData }: ReviewSurveyProps) => {
	const handleSurveyChange = (key: SurveyKey, value: SurveyValue) => {
		setSurveyFormData((prev) => ({ ...prev, [key]: value }));
	};
	return (
		<div className={styles.reviewSurveyContainer}>
			{surveyQuestions.map(({ key, label }) => (
				<SurveyQuestion
					key={key}
					questionKey={key}
					label={label}
					value={surveyFormData[key]}
					onChange={handleSurveyChange}
				/>
			))}
		</div>
	);
};

export default ReviewSurvey;
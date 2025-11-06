import { globalStyle, style } from "@vanilla-extract/css";
import { themeVars } from "@/styles/theme.css";

export const datePickerContainer = style({
	width: '100%',
	display: 'flex',
	flexDirection: 'column',
	alignItems: 'center',
})

export const datePickerContainerMargin = style({
	marginBottom: '80px',
})

export const datePickerHeader = style({
	display: 'flex',
	justifyContent: 'space-between',
})

export const datePickerSelect = style({
	border: 0,
	fontSize: '18px',
	fontWeight: 500,
	letterSpacing: '-0.4px',
	lineHeight: '150%',
	outline: 'none',
	cursor: 'pointer',
})

export const datePickerButtons = style({
	display: 'flex',
	gap: '16px',
})

export const datePickerPrevNextButton = style({
	cursor: 'pointer',
})

export const activeDay = style({
	background: `${themeVars.colors.blue.blue500} !important`,
	color: `${themeVars.colors.gray.gray0} !important`,
	borderRadius: '50%',
	fontWeight: themeVars.fontWeight.bold,
})

globalStyle(`${datePickerContainer} .react-datepicker-popper`, {
	position: 'static',
	transform: 'unset !important',
})

globalStyle(`${datePickerContainer} .react-datepicker-wrapper`, {
	width: '100%',
})

globalStyle(`${datePickerContainer} .react-datepicker`, {
	width: '348px',
	border: `1px solid ${themeVars.colors.gray.gray300}`,
	borderRadius: '8px',
	boxShadow: themeVars.shadow.light,
	overflow: 'hidden',
	marginTop: '20px',
})

globalStyle(`${datePickerContainer} .react-datepicker__month-container`, {
	float: 'unset',
	width: '100%',
})

globalStyle(`${datePickerContainer} .react-datepicker__day-names`, {
	marginBottom: '4px',
	marginTop: '12px',
})

globalStyle(`${datePickerContainer} .react-datepicker__day-names .react-datepicker__day-name`, {
	fontSize: '14px',
})

globalStyle(`${datePickerContainer} .react-datepicker__day-name, .react-datepicker__day, .react-datepicker__time-name`, {
	width: '44px',
	height: '20px',
	margin: 0,
	fontSize: '16px',
	lineHeight: '140%',
})

globalStyle(`${datePickerContainer} .react-datepicker__header`, {
	backgroundColor: themeVars.colors.gray.gray0,
	padding: '16px 20px 0',
	borderBottom: `1px solid ${themeVars.colors.gray.gray200}`
})

globalStyle(`${datePickerContainer} .react-datepicker__month`, {
	padding: '10px 20px 16px',
	margin: 0,
})

globalStyle(`${datePickerContainer} .react-datepicker__triangle`, {
	display: 'none',
})

globalStyle(`${datePickerContainer} .react-datepicker__day, .react-datepicker__time-name`, {
	width: '44px !important',
	height: '44px',
	lineHeight: '44px',
	margin: '0 !important',
	color: themeVars.colors.gray.gray700,
})

globalStyle(`${datePickerContainer} .react-datepicker__day:not([aria-disabled=true]):hover`, {
	color: themeVars.colors.blue.blue500,
	backgroundColor: themeVars.colors.blue.blue50,
	borderRadius: '50%',
})

globalStyle(`${datePickerContainer} .react-datepicker__day--selected, .react-datepicker__day--in-selecting-range, .react-datepicker__day--in-range, .react-datepicker__month-text--selected, .react-datepicker__month-text--in-selecting-range, .react-datepicker__month-text--in-range, .react-datepicker__quarter-text--selected, .react-datepicker__quarter-text--in-selecting-range, .react-datepicker__quarter-text--in-range, .react-datepicker__year-text--selected, .react-datepicker__year-text--in-selecting-range, .react-datepicker__year-text--in-range`, {
	background: `${themeVars.colors.blue.blue500} !important`,
	color: `${themeVars.colors.gray.gray0} !important`,
	borderRadius: '50%',
	fontWeight: themeVars.fontWeight.bold,
})

globalStyle(`${datePickerContainer} .react-datepicker__day--today, .react-datepicker__month-text--today, .react-datepicker__quarter-text--today, .react-datepicker__year-text--today`, {
	color: themeVars.colors.blue.blue500,
	backgroundColor: themeVars.colors.blue.blue50,
	borderRadius: '50%',
})
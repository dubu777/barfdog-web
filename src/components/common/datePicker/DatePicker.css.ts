import { globalStyle, style } from "@vanilla-extract/css";
import { themeVars } from "@/styles/theme.css";
import { recipe } from "@vanilla-extract/recipes";

export const datePickerContainer = style({
	width: '100%',
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
})

export const datePickerButtons = style({
	display: 'flex',
	gap: '16px',
	cursor: 'pointer'
})

globalStyle(`${datePickerContainer} .react-datepicker-wrapper`, {
	width: '100%',
})

globalStyle(`${datePickerContainer} .react-datepicker`, {
	width: '348px',
	border: 0,
})

globalStyle(`${datePickerContainer} .react-datepicker__month-container`, {
	float: 'unset',
	width: '100%',
})

globalStyle(`${datePickerContainer} .react-datepicker__day-names`, {
	marginBottom: '4px',
	marginTop: '14px',
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
	background: themeVars.colors.gray.gray0,
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
})

globalStyle(`${datePickerContainer} .react-datepicker__day:not([aria-disabled=true]):hover`, {
	color: themeVars.colors.blue.blue500,
	background: themeVars.colors.blue.blue50,
	borderRadius: '50%',
})

globalStyle(`${datePickerContainer} .react-datepicker__day--selected, .react-datepicker__day--in-selecting-range, .react-datepicker__day--in-range, .react-datepicker__month-text--selected, .react-datepicker__month-text--in-selecting-range, .react-datepicker__month-text--in-range, .react-datepicker__quarter-text--selected, .react-datepicker__quarter-text--in-selecting-range, .react-datepicker__quarter-text--in-range, .react-datepicker__year-text--selected, .react-datepicker__year-text--in-selecting-range, .react-datepicker__year-text--in-range`, {
	background: `${themeVars.colors.blue.blue500} !important`,
	color: `${themeVars.colors.gray.gray0} !important`,
	borderRadius: '50%',
})

globalStyle(`${datePickerContainer} .react-datepicker-popper`, {
	top: '30px !important',
})

export const mobileDatePicker = style({
	borderRadius: '8px',
	background: themeVars.colors.gray.gray0,
	padding: '14px 20px'
})

export const mobileDatePickerHeader = recipe({
	base: {
		width: '100%',
		textAlign: 'left',
		display: 'flex',
		justifyContent: 'space-between',
	},
	variants: {
		isOpen: {
			true: {
				marginBottom: '6px',
			}
		}
	}
})

export const mobileDatePickerBox = style({
	borderRadius: '8px',
	border: `1px solid ${themeVars.colors.gray.gray300}`
})

export const mobilePickerItem = style({
	borderRadius: '8px',
	background: 'salmon'
})

export const mobilePickerSelected = recipe({
	base: {
		color: themeVars.colors.gray.gray300
	},
	variants: {
		selected: {
			true: {
				color: themeVars.colors.gray.gray900,
				fontWeight: 500,
			}
		}
	}
})
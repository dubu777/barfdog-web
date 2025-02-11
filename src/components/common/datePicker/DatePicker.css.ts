import { globalStyle, style } from "@vanilla-extract/css";
import { themeVars } from "@/styles/theme.css";

export const datePickerContainer = style({
	width: '100%',
})

globalStyle(`${datePickerContainer} .react-date-picker`, {
	width: '100%',
	height: '40px',
	fontSize: themeVars.fontSize["text-sm"],
})

globalStyle(`${datePickerContainer} .react-date-picker__wrapper`, {
	borderRadius: '5px',
	padding: '0 20px',
	border: `1px solid ${themeVars.colors.gray.gray400}`
})

globalStyle(`${datePickerContainer} .react-date-picker__inputGroup`, {
	textAlign: 'left',
})

globalStyle(`${datePickerContainer} .react-date-picker__button:enabled:hover .react-date-picker__button__icon, .react-date-picker__button:enabled:focus .react-date-picker__button__icon`, {
	stroke: themeVars.colors.red.red,
})

globalStyle(`${datePickerContainer} .react-date-picker__inputGroup__input:invalid`, {
	background: themeVars.backgroundColors.pinkFa,
})

globalStyle(`${datePickerContainer} .react-calendar__tile--now, .react-calendar__tile--now:enabled:hover, .react-calendar__tile--now:enabled:focus`, {
	border: `1px solid ${themeVars.colors.red.red}`,
	background: `${themeVars.colors.gray.gray0} !important`,
})

globalStyle(`${datePickerContainer} .react-calendar__tile--active, .react-calendar__tile--active:enabled:hover, .react-calendar__tile--active:enabled:focus`, {
	background: `${themeVars.colors.red.red} !important`,
	color: `${themeVars.colors.gray.gray0} !important`,
})
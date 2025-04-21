import { style } from "@vanilla-extract/css";
import { themeVars } from "@/styles/theme.css";

export const reviewImagesModalContainer = style({
	width: '100vw',
	height: '100vh',
	backgroundColor: `${themeVars.colors.gray.gray900} !important`,
	alignItems: 'center',
	justifyContent: 'center',
})

export const reviewImageModalHeader = style({
	display: 'flex',
	alignItems: 'center',
	justifyContent: 'space-between',
	padding: "14px 20px",
})

export const reviewImageSlider = style({
	width: '100%',
	height: 'auto !important',
	maxHeight: 'calc(100vh - 56px)',
	position: 'relative',
	display: 'flex',
	justifyContent: 'center',
	alignItems: 'center',
})

export const reviewImage = style({
	position: 'static !important',
	width: '100%',
	objectFit: 'cover'
})
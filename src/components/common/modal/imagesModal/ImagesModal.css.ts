import { style } from "@vanilla-extract/css";
import { themeVars } from "@/styles/theme.css";

export const imagesModalContainer = style({
	maxWidth: '600px',
	width: '100%',
	height: '100vh',
	backgroundColor: `${themeVars.colors.gray.gray900} !important`,
	alignItems: 'center',
	justifyContent: 'center',
})

export const imageModalHeader = style({
	display: 'flex',
	alignItems: 'center',
	justifyContent: 'space-between',
	padding: "14px 20px",
})

export const imageSliderWrapper = style({
	display: 'flex',
	justifyContent: 'center',
	alignItems: 'center',
	height: 'calc(100% - 52px)',
})

export const imageSlider = style({
	width: '100%',
	height: 'auto !important',
	maxHeight: 'calc(100vh - 56px)',
	position: 'relative',
	display: 'flex',
	justifyContent: 'center',
	alignItems: 'center',
})

export const image = style({
	position: 'static',
	width: '100%',
	objectFit: 'contain'
})
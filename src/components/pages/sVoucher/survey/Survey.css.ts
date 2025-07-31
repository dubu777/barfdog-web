import { style } from "@vanilla-extract/css";
import { themeVars } from "@/styles/theme.css";

export const surveyContainer = style({
	height: '100vh',
	display: 'flex',
	flexDirection: 'column',
	alignItems: 'center',
	gap: '20px',
	backgroundColor: themeVars.colors.gray.gray50,
})

export const surveyTitle = style({
	width: '100%',
	padding: '40px 20px 20px',
})

export const surveyInput = style({
	width: '100%',
	padding: '20px',
	display: 'flex',
	flexDirection: 'column',
	gap: '4px',
})

export const surveyInfo = style({
	width: '100%',
	padding: '0 20px',
	display: 'flex',
	flexDirection: 'column',
	gap: '32px',
})

export const surveyImage = style({
	position: 'relative',
	display: 'flex',
	flexDirection: 'column',
	gap: '12px',
})

export const surveyInfoImage = style({
	width: '100%',
	height: 'auto',
	objectFit: 'contain'
})

export const surveyUploadContainer = style({
	display: 'flex',
	flexDirection: 'column',
	gap: '16px',
	padding: '0 20px',
})

export const surveyLightIcon = style({
	padding: '12px',
	borderRadius: '8px',
	border: `1px solid ${themeVars.colors.blue.blue500}`,
	display: 'flex',
	alignItems: 'center',
	gap: '12px',
})

export const surveyUploadBox = style({
	width: '100%',
	aspectRatio: '1 / 1',
	display: 'flex',
	flexDirection: 'column',
	alignItems: 'center',
	justifyContent: 'center',
	gap: '12px',
	border: `2px dashed ${themeVars.colors.gray.gray300}`,
	borderRadius: '8px',
})

export const surveyPreviewContainer = style({
	padding: '0 20px',
	display: 'flex',
	flexDirection: 'column',
	gap: '16px',
})

export const surveyPreviewImage = style({
	width: '100%',
	borderRadius: '10px',
	objectFit: 'cover',
})
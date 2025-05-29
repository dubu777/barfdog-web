import { style } from "@vanilla-extract/css";
import { themeVars } from "@/styles/theme.css";

export const walkScoreContainer = style({
	display: 'flex',
	flexDirection: 'column',
	alignItems: 'center',
	gap: '12px',
})

export const walkScoreContentBox = style({
	width: '100%',
	display: 'flex',
	flexDirection: 'column',
	alignItems: 'center',
	gap: '8px',
})

export const walkScoreInfoCard = style({
	display: 'flex',
	flexDirection: 'column',
	padding: '0 !important'
})

export const walkScore = style({
	display: 'flex',
	justifyContent: 'space-between',
	padding: '12px 12px 0'
})

export const walkScoreInfo = style({
	display: 'flex',
	padding: '12px 16px'
})

export const averageDurations = style({
	width: '100%',
	padding: '24px 16px 0',
	display: 'flex',
	alignItems: 'flex-end',
	justifyContent: 'center',
	gap: '35px',
	position: 'relative',
	selectors: {
		'&:after': {
			content: '',
			display: 'block',
			minWidth: '294px',
			width: '100%',
			height: '1px',
			background: 'linear-gradient(90deg, rgba(145, 145, 145, 0.00) 0%, rgba(94, 94, 94, 0.60) 50%, rgba(145, 145, 145, 0.00) 100%)',
			position: 'absolute',
			bottom: '23px',
			left: '50%',
			transform: 'translateX(-50%)',
		}
	}
})

export const walkNotice = style({
	display: 'flex',
	flexDirection: 'column',
	gap: '6px',
	border: `2px dashed ${themeVars.colors.blue.blue300}`,
	marginTop: '4px',
})

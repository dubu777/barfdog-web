import { style } from "@vanilla-extract/css";
import { themeVars } from "@/styles/theme.css";

export const totalScoreContainer = style({
	display: 'flex',
	flexDirection: 'column',
	gap: '20px',
})

export const rankInfo = style({
	width: '50%',
	display: 'flex',
	flexDirection: 'column',
	alignItems: 'center',
	gap: '4px',
	selectors: {
		'&:first-child': {
			borderRight: `1px solid ${themeVars.colors.gray.gray200}`
		}
	}
})

export const rankContent = style({
	display: 'flex',
	alignItems: 'center',
	gap: '4px',
})
import { style } from "@vanilla-extract/css";
import { themeVars } from "@/styles/theme.css";

export const infoBox = style({
	width: '50%',
	display: 'flex',
	flexDirection: 'column',
	alignItems: 'center',
	gap: '4px',
	selectors: {
		'&:first-child': {
			borderRight: `1px solid ${themeVars.colors.gray.gray100}`
		}
	}
})

export const infoContent = style({
	display: 'flex',
	alignItems: 'center',
	gap: '4px',
})
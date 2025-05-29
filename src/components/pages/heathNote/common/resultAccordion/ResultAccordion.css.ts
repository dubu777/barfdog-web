import { style } from "@vanilla-extract/css";
import { themeVars } from "@/styles/theme.css";

export const resultAccordionButton = style({
	background: `${themeVars.colors.gray.gray0} !important`,
	border: '0 !important',
	display: 'flex',
	justifyContent: 'space-between',
	alignItems: 'center',
	borderRadius: '8px',
	padding: '12px !important'
})

export const resultAccordionContent = style({
	background: `${themeVars.colors.gray.gray0} !important`,
	border: '0 !important',
	borderBottomRightRadius: '8px',
	borderBottomLeftRadius: '8px',
	padding: '8px 12px 12px !important',
})

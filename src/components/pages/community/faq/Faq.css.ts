import { style } from "@vanilla-extract/css";
import { themeVars } from "@/styles/theme.css";

export const faqContainer = style({
	background: themeVars.colors.gray.gray0,
})

export const faqTitle = style({
	padding: '40px 20px 20px',
	display: 'flex',
	flexDirection: 'column',
	gap: '4px'
})

export const faqAccordionTitle = style({
	display: 'flex',
	alignItems: 'center',
	gap: '20px'
})

export const faqAccordionContent = style({
	background: themeVars.colors.gray.gray50,
})

export const subAnswer = style({
	marginTop: '20px',
})
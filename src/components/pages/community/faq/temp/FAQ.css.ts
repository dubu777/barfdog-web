import { style } from "@vanilla-extract/css";
import { themeVars } from "@/styles/theme.css";

export const faqContainer = style({
	backgroundColor: themeVars.colors.gray.gray0,
})

export const faqAccordion = style({
	width: '100%',
	display: 'flex',
	alignItems: 'center',
	gap: '20px'
})

export const faqAccordionSubCategory = style({
	minWidth: '15%',
})

export const faqAccordionContent = style({
	backgroundColor: themeVars.colors.gray.gray50
})
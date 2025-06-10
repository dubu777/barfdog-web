import { style } from "@vanilla-extract/css";
import { themeVars } from "@/styles/theme.css";

export const detailCategoryTabsContainer = style({
	backgroundColor: themeVars.colors.gray.gray0,
})

export const tabsHeader = style({
	boxShadow: themeVars.shadow.light,
})

export const tabContent = style({
	padding: '20px',
	display: 'flex',
	flexDirection: 'column',
	gap: '16px',
})

export const sliderQuestion = style({
	display: 'flex',
	flexDirection: 'column',
	gap: '28px',
})
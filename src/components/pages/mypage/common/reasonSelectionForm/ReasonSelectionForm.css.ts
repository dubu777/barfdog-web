import { style } from "@vanilla-extract/css";
import { themeVars } from "@/styles/theme.css";

export const reasonSelectionTitle = style({
	display: 'flex',
	flexDirection: 'column',
	gap: '4px',
	padding: '40px 20px 20px',
})

export const reasonCheckboxList = style({
	background: themeVars.colors.gray.gray0,
	padding: '40px 20px',
	display: 'flex',
	flexDirection: 'column',
	gap: '12px',
})

export const otherReasonTextarea = style({
	marginTop: '10px',
})


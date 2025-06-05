import { style } from "@vanilla-extract/css";
import { themeVars } from "@/styles/theme.css";

export const bankTransferRefundContainer = style({
	marginTop: '2px',
	padding: '20px',
	backgroundColor: themeVars.colors.gray.gray0,
})

export const bankTransferRefundForm = style({
	paddingTop: '20px',
	display: 'flex',
	flexDirection: 'column',
	gap: '16px',
})
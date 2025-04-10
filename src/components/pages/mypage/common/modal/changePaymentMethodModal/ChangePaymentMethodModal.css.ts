import { style } from "@vanilla-extract/css";
import { themeVars } from "@/styles/theme.css";

export const paymentMethodModalContainer = style({
	width: "100%",
	backgroundColor: themeVars.colors.gray.gray0,
})

export const paymentMethodImage = style({
	backgroundColor: themeVars.colors.gray.gray50,
	padding: '20px 40px',
})

export const paymentInfo = style({
	backgroundColor: themeVars.colors.gray.gray50,
})

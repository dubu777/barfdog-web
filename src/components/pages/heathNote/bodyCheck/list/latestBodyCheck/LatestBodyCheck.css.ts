import { style } from "@vanilla-extract/css";
import { themeVars } from "@/styles/theme.css";

export const bodyCheckTopCard = style({
	backgroundColor: themeVars.colors.gray.gray50,
	display: "flex",
	flexDirection: "column",
	gap: '20px',
	padding: "40px 20px",
});

export const bodyCheckButton = style({
	width: "100%",
	height: "120px",
	cursor: 'pointer',
});

export const bodyCheckCard = style({
	height: "100%",
});
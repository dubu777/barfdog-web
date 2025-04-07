import { style } from "@vanilla-extract/css";
import { themeVars } from "@/styles/theme.css";

export const marqueeContainer = style({
	backgroundColor: themeVars.colors.gray.gray50,
	padding: "20px 0",
});

export const marqueeTrack = style({
	display: "flex",
	gap: "30px",
	margin: '0 15px',
});

export const logoItem = style({
	objectFit: 'cover',
});

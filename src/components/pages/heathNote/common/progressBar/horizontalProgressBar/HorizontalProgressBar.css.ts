import { style } from "@vanilla-extract/css";
import { themeVars } from "@/styles/theme.css";

export const progressBarWrapper = style({
	width: '100%',
	display: 'flex',
	flexDirection: 'column',
});

export const labelRow = style({
	display: 'flex',
	gap: '4px',
});

export const barContainer = style({
	height: '28px',
	display: 'flex',
	alignItems: 'center',
});

export const bar = style({
	width: '100%',
	height: '8px',
	backgroundColor: themeVars.colors.gray.gray200,
	borderRadius: '8px',
});


export const barProgress = style({
	position: 'relative',
	borderRadius: '8px',
});

export const barColorStyle = {
	blue500: style({
		background: themeVars.colors.blue.blue500,
	}),
	green500: style({
		background: themeVars.colors.green.green500,
	}),
	yellow500: style({
		background: themeVars.colors.yellow.yellow500,
	}),
	red: style({
		background: themeVars.colors.red.red,
	}),
};

export const barIcon = style({
	position: 'absolute',
	top: '50%',
	transform: 'translate(50%, -50%)',
})
import { style } from "@vanilla-extract/css";
import { themeVars } from "@/styles/theme.css";

export const statusTrackerContainer = style({
	background: themeVars.colors.gray.gray0,
	padding: '20px',
});

export const statusTracker = style({
	display: 'flex',
	flexDirection: 'column',
	paddingBottom: '12px',
	borderBottom: `2px solid ${themeVars.colors.gray.gray900}`,
});

export const statusTrackerStepBox = style({
	display: 'flex',
	justifyContent: 'space-evenly',
	alignItems: 'center',
	padding: '8px 0 0'
});

export const statusTrackerStepInfo = style({
	display: 'flex',
	flexDirection: 'column',
	alignItems: 'center',
	justifyContent: 'flex-end',
	gap: '4px',
});

export const statusTrackerLabel = style({
	whiteSpace: 'pre-line'
});
import { style } from "@vanilla-extract/css";
import { themeVars } from "@/styles/theme.css";
import { recipe } from "@vanilla-extract/recipes";

export const comparisonProgressBarBox = style({
	display: 'flex',
	flexDirection: 'column',
	alignItems: 'center',
	marginTop: '10px',
});

export const bars = style({
	display: 'flex',
	gap: '24px',
	alignItems: 'flex-end',
	marginBottom: '8px',
});

export const barBox = style({
	display: 'flex',
	flexDirection: 'column',
	alignItems: 'center',
});

export const barBase = recipe({
	base: {
		borderRadius: '8px',
	},
	variants: {
		size: {
			sm: {
				width: '32px'
			},
			md: {
				width: '48px'
			}
		}
	}
})

export const prevBar = {
	downLarge: style({
		backgroundColor: themeVars.colors.gray.gray300,
		height: '98px',
	}),
	downSmall: style({
		backgroundColor: themeVars.colors.gray.gray300,
		height: '92px',
	}),
	same: style({
		backgroundColor: themeVars.colors.gray.gray300,
		height: '88px',
	}),
	upSmall: style({
		backgroundColor: themeVars.colors.gray.gray300,
		height: '84px',
	}),
	upLarge: style({
		backgroundColor: themeVars.colors.gray.gray300,
		height: '64px',
	}),
}


export const currentBar = {
	downLarge: style({
		backgroundColor: themeVars.colors.red.pastelRed,
		height: '64px',
	}),
	downSmall: style({
		backgroundColor: themeVars.colors.red.pastelRed,
		height: '84px',
	}),
	same: style({
		backgroundColor: themeVars.colors.green.green400,
		height: '88px',
	}),
	upSmall: style({
		backgroundColor: themeVars.colors.blue.blue400,
		height: '92px',
	}),
	upLarge: style({
		backgroundColor: themeVars.colors.blue.blue400,
		height: '98px',
	}),
}

export const currentChips = style({
	marginBottom: '8px',
})
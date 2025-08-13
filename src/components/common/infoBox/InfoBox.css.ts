import { style } from "@vanilla-extract/css";
import { themeVars } from "@/styles/theme.css";
import { recipe } from "@vanilla-extract/recipes";

export const infoBoxBase = style({
	padding: '12px',
	borderRadius: '8px',
	display: 'flex',
	justifyContent: 'space-between',
	alignItems: 'center',
})

export const infoBoxStyle = recipe({
	base: {
		width: '100%',
		display: 'flex',
		gap: '8px'
	},
	variants: {
		align: {
			start: {
				alignItems: "flex-start",
			},
			center: {
				alignItems: "center",
			}
		}
	}
})

export const infoTextStyle = style({
	width: '100%',
	whiteSpace: 'pre-line',
})

export const infoBoxColor = {
	red: style({
		backgroundColor: themeVars.colors.red.pinkWhite,
		border: `1px solid ${themeVars.colors.red.pastelPink}`,
	}),
	blue: style({
		backgroundColor: themeVars.colors.gray.gray50,
		border: `1px solid ${themeVars.colors.blue.blue500}`,
	}),
	gray: style({
		backgroundColor: themeVars.colors.gray.gray100,
		border: `1px solid ${themeVars.colors.gray.gray400}`,
	})
}

export const infoBoxClickEvent = {
	true: style({
		cursor: 'pointer',
	}),
	false: style({
		cursor: 'default',
	}),
}

export const infoBoxFullWidth = style({
  width: "100%",
});
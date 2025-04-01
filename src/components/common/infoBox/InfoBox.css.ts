import { style } from "@vanilla-extract/css";
import { themeVars } from "@/styles/theme.css";

export const infoBoxBase = style({
	padding: '12px',
	borderRadius: '8px',
	display: 'flex',
	justifyContent: 'space-between',
	alignItems: 'center',
})

export const infoBoxStyle = style({
	display: 'flex',
	alignItems: "center",
	gap: '8px'
})

export const infoTextStyle = style({
	whiteSpace: 'pre-line',
})

export const infoBoxColor = {
	red: style({
		background: themeVars.colors.red.pinkWhite,
		border: `1px solid ${themeVars.colors.red.pastelPink}`,
	}),
	blue: style({
		background: themeVars.colors.gray.gray50,
		border: `1px solid ${themeVars.colors.blue.blue500}`,
	}),
	gray: style({
		background: themeVars.colors.gray.gray100,
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
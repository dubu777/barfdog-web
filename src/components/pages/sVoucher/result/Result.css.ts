import { style } from "@vanilla-extract/css";
import { recipe } from "@vanilla-extract/recipes";
import { themeVars } from "@/styles/theme.css";

export const resultContainer = style({
	display: 'flex',
	flexDirection: 'column',
	padding: '20px 0 40px',
	gap: '32px',
	backgroundColor: themeVars.colors.gray.gray50,
})

export const resultInfo = style({
	padding: '0 20px',
	display: 'flex',
	flexDirection: 'column',
	gap: '16px',
})

export const resultCard = style({
	padding: '24px 20px',
})

export const resultTitle = style({
	display: 'flex',
	alignItems: 'center',
	gap: '8px',
})

export const resultDetail = style({
	width: '100%',
	display: 'flex',
	gap: '12px',
	justifyContent: 'center',
	padding: '0 12px',
	height: '60px'
})

export const resultBcs = style({
	display: 'flex',
	flexDirection: 'column',
	alignItems: 'center',
})

export const resultImageSlider = style({
	paddingBottom: '30px',
})

export const resultImage = style({
	width: '100%',
	height: '100%',
	objectFit: 'cover',
	borderRadius: '16px',
})

// ----------------------------------------

export const resultAverage = style({
	padding: '0 20px',
})

export const resultAverageBarBax = style({
	width: '100%',
	display: 'flex',
	justifyContent: 'center',
	alignItems: 'flex-end',
	gap: '20px',
	padding: '0 15.5px',
})

export const resultAverageItem = style({
	display: 'flex',
	flexDirection: 'column',
	alignItems: 'center',
	gap: '6px',
})

export const averageBar = recipe({
	base: {
		width: '40px',
		borderRadius: '4px',
	},
	variants: {
		active: {
			true: {
				backgroundColor: themeVars.colors.red.pastelRed,
			},
			false: {
				backgroundColor: themeVars.colors.red.pastelPink,
			}
		}
	}
})

export const resultProductItems = style({
	padding: '0 20px',
	display: 'flex',
	flexDirection: 'column',
	gap: '24px',
})

export const productItems = style({
	display: 'flex',
	flexWrap: 'wrap',
	gap: '20px 8px',
})

export const productItem = style({
	width: 'calc(50% - 4px)',
	display: 'flex',
	flexDirection: 'column',
	gap: '6px',
})

export const productItemImage = style({
	width: '100%',
	height: 'auto',
	aspectRatio: '1 / 1',
	borderRadius: '6px',
	objectFit: 'cover',
})
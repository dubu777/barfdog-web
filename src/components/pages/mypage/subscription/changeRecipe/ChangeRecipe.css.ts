import { style } from "@vanilla-extract/css";

export const changeRecipeContainer = style({
	display: 'flex',
	flexDirection: 'column',
	gap: '20px',
	padding: '20px',
})

export const changeRecipeTitle = style({
	display: 'flex',
	flexDirection: 'column',
	gap: '8px',
})

export const changeRecipeTopInfo = style({
	display: 'flex',
	flexDirection: 'column',
	gap: '18px',
})

export const topInfo = style({
	display: 'flex',
	justifyContent: 'space-between',
	alignItems: 'center',
})

export const changeRecipeBottomInfo = style({
	display: 'flex',
	flexDirection: 'column',
	gap: '12px',
})


export const bottomInfoTitle = style({
	display: 'flex',
	justifyContent: 'space-between',
	alignItems: 'center',
})

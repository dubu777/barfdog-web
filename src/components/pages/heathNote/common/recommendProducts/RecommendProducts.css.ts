import { style } from "@vanilla-extract/css";
import { themeVars } from "@/styles/theme.css";

export const itemList = style({
	display: 'flex',
	flexDirection: 'column',
	gap: '20px',
	marginTop: '20px',
})

export const itemHeader = style({
	display: 'flex',
	alignItems: 'center',
	gap: '8px',
	marginBottom: '12px',
})

export const itemInfoBox = style({
	width: '100%',
	display: 'flex',
	justifyContent: 'space-between',
	alignItems: 'center',
})

export const itemInfo = style({
	display: 'flex',
	alignItems: 'center',
	gap: '12px',
})

export const itemImage = style({
	width: '72px',
	height: '72px',
	objectFit: 'cover',
	background: themeVars.colors.gray.gray200,
	borderRadius: '8px',
})

export const itemContent = style({
	display: 'flex',
	flexDirection: 'column',
	gap: '8px',
})

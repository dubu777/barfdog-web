import { style } from "@vanilla-extract/css";
import { themeVars } from "@/styles/theme.css";

export const breedDetailInfo = style({
	padding: '20px 20px 40px',
	display: 'flex',
	flexDirection: 'column',
	gap: '20px',
	backgroundColor: themeVars.colors.gray.gray0,
	marginBottom: '40px',
})

export const detailInfoList = style({
	display: 'flex',
	flexDirection: 'column',
	gap: '28px',
})

export const detailInfoItem = style({
	display: 'flex',
	flexDirection: 'column',
	gap: '4px',
})

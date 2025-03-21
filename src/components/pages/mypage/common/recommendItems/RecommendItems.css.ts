import { style } from "@vanilla-extract/css";

export const recommendItemsContainer = style({
	marginTop: '53px',
})

export const recommendItemsTitle = style({
	display: 'flex',
	flexDirection: 'column',
})

export const recommendItemsSubTitle = style({
	margin: '12px 0 20px',
})

export const recommendItems = style({
	width: '120px !important',
})

export const recommendItemImage = style({
	borderRadius: '8px',
	objectFit: 'cover',
	marginBottom: '6px',
})

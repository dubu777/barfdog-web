import { style } from "@vanilla-extract/css";

export const dogProfileImageBox = style({
	display: 'flex',
	flexDirection: 'column',
	gap: '20px',
	padding: '20px',
})

export const dogProfileImageWrapper = style({
	position: 'relative',
	width: '89px',
	height: '89px',
	margin: '0 auto',
})

export const dogProfileImage = style({
	borderRadius: '50%',
	objectFit: 'cover',
})

export const dogInfoForm = style({
	display: 'flex',
	flexDirection: 'column',
	gap: '20px',
	padding: '20px',
})

export const buttonBox = style({
	display: 'flex',
	gap: '8px'
})

export const subInputField = style({
	marginTop: '8px',
})
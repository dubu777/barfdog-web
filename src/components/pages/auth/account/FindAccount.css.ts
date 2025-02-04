import { style } from "@vanilla-extract/css";

export const findAccountContainer = style({
	margin: '60px 0',
	padding: '0 100px',
})

export const findAccountForm = style({
	margin: '40px 0',
	display: 'flex',
	flexDirection: 'column',
	gap: '1rem',
})

export const findAccountResultContainer = style({
	margin: '60px 0',
	padding: '0 100px',
	border: '1px solid red',
	display: 'flex',
	flexDirection: 'column',
	gap: '40px',
})

export const resultBox = style({
	display: 'flex',
	flexDirection: 'column',
	gap: '1rem',
	border: `1px solid gray`,
	padding: '60px 0',
})

export const result = style({
	display: 'flex',
	justifyContent: 'space-between',
	width: '80%',
	margin: '0 auto'
})

export const resultButtons = style({
	display: 'flex',
	flexDirection: 'column',
	gap: '10px',
})

export const connectSnsContainer = style({
	padding: '0 100px',
	height: '100vh',
	display: 'flex',
	flexDirection: 'column',
	justifyContent: 'center',
	alignItems: 'center',
})

export const connectSnsPassword = style({
	width: '60%',
	margin: '40px auto 20px',
})

export const connectSnsSubmitButton = style({
	width: '60%',
	margin: '0 auto',
})
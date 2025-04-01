import { style } from "@vanilla-extract/css";

export const orderIssueFilter = style({
	width: '100%',
	display: 'flex',
	flexDirection: 'row-reverse',
	alignItems: 'center',
	gap: '4px',
	padding: '20px 12px 12px 20px',
})

export const orderIssueList = style({
	padding: '0 20px',
	display: 'flex',
	flexDirection: 'column',
	gap: '10px',
})

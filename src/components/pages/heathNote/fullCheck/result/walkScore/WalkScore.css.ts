import { style } from "@vanilla-extract/css";
import { themeVars } from "@/styles/theme.css";

export const averageGraph = style({
	width: '100%',
	padding: '16px',
	display: 'flex',
	alignItems: 'flex-end',
	justifyContent: 'center',
	gap: '35px',
	position: 'relative',
	selectors: {
		'&:after': {
			content: '',
			display: 'block',
			minWidth: '294px',
			width: '100%',
			height: '1px',
			background: 'linear-gradient(90deg, rgba(145, 145, 145, 0.00) 0%, rgba(94, 94, 94, 0.60) 50%, rgba(145, 145, 145, 0.00) 100%)',
			position: 'absolute',
			bottom: '39px',
			left: '50%',
			transform: 'translateX(-50%)',
		}
	}
})

export const walkNotice = style({
	border: `2px dashed ${themeVars.colors.blue.blue300}`,
	marginTop: '4px',
})

import { style } from "@vanilla-extract/css";
import { recipe } from "@vanilla-extract/recipes";
import { themeVars } from "@/styles/theme.css";

export const progressBarContainer = style({
	position: 'relative',
	width: '100%',
	background: themeVars.colors.gray.gray400,
	borderRadius: '60px',
	height: '4px',
})

export const progressActive = recipe({
	base: {
		position: 'absolute',
		top: 0,
		background: themeVars.colors.red.red,
		transition: 'all .35s',
		height: '4px',
		selectors: {
			'&::before': {
				content: '',
				display: 'block',
				width: '6px',
				height: '6px',
				borderRadius: '50%',
				border: `1px solid ${themeVars.colors.red.red}`,
				background: themeVars.colors.gray.gray0,
				position: 'absolute',
				top: '50%',
				right: 0,
				transform: 'translateY(-50%)',
				transition: 'all .35s',
			},
			'&::after': {
				content: '',
				display: 'block',
				width: '1px',
				height: '8px',
				background: themeVars.colors.red.red,
				position: 'absolute',
				top: '-5px',
				right: '3.5px',
				transform: 'translateY(-50%)',
				transition: 'all .35s',
			}
		}
	},
	variants: {
		progress: {
			0: {
				selectors: {
					'&::after': {
						display: 'none',
					}
				}
			},
			100: {
				selectors: {
					'&::after': {
						display: 'none',
					}
				}
			},
		}
	}
})

export const progressLabel = style({
	position: 'absolute',
	top: '-34px',
	left: '50%',
	transform: 'translateX(-55%)',
	padding: '2px 16px',
	borderRadius: '40px',
	border: `1px solid ${themeVars.colors.red.red}`,
	background: themeVars.colors.gray.gray0,
})
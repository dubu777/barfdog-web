import { style } from '@vanilla-extract/css';
import { recipe } from "@vanilla-extract/recipes";
import { themeVars } from "@/styles/theme.css";

export const container = recipe({
	base: {
		position: 'relative',
		border: `1px solid ${themeVars.colors.gray.gray300}`,
		transition: 'box-shadow .2s ease, border-radius .2s ease',
	},
	variants: {
		fullWidth: {
			true: { width: '100%' },
			false: { width: 'auto' }
		},
		isOpen: {
			true: {
			}
		},
		direction: {
			bottom: {
				borderRadius: '8px 8px 0 0',
			},
			top: {
				borderRadius: '0 0 8px 8px',
			},
		},
	},
	compoundVariants: [
		{
			variants: {
				isOpen: false,
				direction: 'bottom',
			},
			style: { borderRadius: '8px' },
		},
		{
			variants: {
				isOpen: false,
				direction: 'top',
			},
			style: { borderRadius: '8px' },
		},
	],
});

export const inputBox = style({
	width: '100%',
	position: 'relative',
	backgroundColor: themeVars.colors.gray.gray0,
	cursor: 'pointer',
	borderRadius: '8px',
});

export const arrowIcon = recipe({
	base: {
		cursor: "pointer",
		position: "absolute",
		top: "50%",
		right: "20px",
		transform: "rotate(180deg) translateY(50%)",
		transition: 'all .35s',
	},
	variants: {
		isOpen: {
			true: {
				transform: "translateY(-50%)",
			}
		}
	}
});

export const input = recipe({
	base: {
		width: '100%',
		height: '48px',
		padding: '12px 20px',
		fontSize: themeVars.fontSize["text-md"],
		color: themeVars.colors.gray.gray500,
		border: 'none',
		outline: 'none',
		cursor: 'pointer',
	},
	variants: {
		isOpen: {
			true: {
				selectors: {
					'&::placeholder': {
						color: themeVars.colors.gray.gray900,
						fontWeight: themeVars.fontWeight.semibold
					},
				},
			}
		}
	}
});

export const dropdown = recipe({
	base: {
		width: 'calc(100% + 2px)',
		position: 'absolute',
		left: '50%',
		right: 0,
		backgroundColor: themeVars.colors.gray.gray0,
		overflow: 'hidden',
		overflowY: 'scroll',
		zIndex: 100,
		display: 'flex',
		flexDirection: 'column',
		boxSizing: 'border-box',
		border: `1px solid ${themeVars.colors.gray.gray300}`,
	},
	variants: {
		direction: {
			bottom: {
				top: '100%',
				borderRadius: '0 0 8px 8px',
			},
			top: {
				bottom: '100%',
				borderRadius: '8px 8px 0 0',
			},
		}
	}
});

export const option = style({
	padding: '18px 20px',
	color: themeVars.colors.gray.gray600,
	selectors: {
		'&:hover': {
			color: themeVars.colors.gray.gray900,
			backgroundColor: themeVars.colors.gray.gray100
		},
	},
});

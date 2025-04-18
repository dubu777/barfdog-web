import { style } from "@vanilla-extract/css";
import { recipe } from "@vanilla-extract/recipes";
import { themeVars } from "@/styles/theme.css";

export const productInfoBox = style({
	display: 'flex',
	gap: '12px',
	marginBottom: '12px',
	marginTop: '10px',
})

export const productName = style({
	display: 'flex',
	flexDirection: 'column',
	justifyContent: 'center',
	gap: '4px',
})

export const productAvatar = style({
	objectFit: 'cover',
	borderRadius: '8px',
	background: themeVars.colors.gray.gray400,
});

export const statusContainer = recipe({
	base: {
		marginBottom: '10px',
	},
	variants: {
		hasStatusLabel: {
			true: {
				paddingTop: '24px',
			}
		}
	}
})

export const statusProgressBar = style({
	margin: '6px 0',
})

export const dateInfo = style({
	display: 'flex',
	justifyContent: 'space-between',
	alignItems: 'center',
})

export const buttonContainer = style({
	display: 'flex',
	flexDirection: 'column',
	gap: '10px'
});

export const actionsControls = recipe({
	base: {
		display: 'flex',
		gap: '10px 8px',
	},
	variants: {
		isWrap: {
			true: { flexWrap: 'wrap' },
		}
	}
});

export const actionsButton = style({
	minWidth: 'calc(50% - 4px)',
});

export const orderCardInfoTop = style({
	display: 'flex',
	alignItems: 'center',
	justifyContent: 'space-between'
})

export const orderCardDetailButton = style({
	display: 'flex',
	alignItems: 'center',
	height: '20px',
	margin: '6px 0'
})

export const emptyStateCard = style({
	display: 'flex',
	flexDirection: 'column',
	gap: '10px',
})

export const reviewCardActions = style({
	width: '100%',
	display: 'flex',
	gap: '8px',
	marginTop: '12px',
})

export const divider = style({
	display: 'inline-block',
	width: '1px',
	height: '12px',
	background: themeVars.colors.gray.gray400,
	margin: '0 4px',
})

import { style } from "@vanilla-extract/css";
import { recipe } from "@vanilla-extract/recipes";

export const petInfoBox = style({
	display: 'flex',
	gap: '12px',
	margin: '12px 0',
})

export const petName = style({
	display: 'flex',
	flexDirection: 'column',
	gap: '4px',
})

export const statusInfoText = style({
	marginBottom: '6.5px',
})

export const petSubscribeStatus = recipe({
	base: {
		marginBottom: '12px',
	},
	variants: {
		hasStatusLabel: {
			true: {
				paddingTop: '35px',
			}
		}
	}
})

export const statusInfo = style({
	display: 'flex',
	justifyContent: 'space-between',
	alignItems: 'center',
	marginTop: '6px',
})

export const subscribeControlsBox = style({
	display: 'flex',
	gap: '13px'
});


export const petAvatar = style({
	width: '67px',
	height: '67px',
	objectFit: 'cover',
	cursor: 'pointer',
});

export const editImageContainer = style({
	width: '100%',
	display: 'flex',
	flexDirection: 'column',
	gap: '1rem'
});
import { recipe } from "@vanilla-extract/recipes";
import { style } from "@vanilla-extract/css";
import { MAIN_BACKGROUND_COLORS } from "@/constants/style";
import { themeVars } from "@/styles/theme.css";

export const mainWrapper = style({
	minHeight: '100vh',
	marginBottom: '60px'
});

export const mainContainer = style({
	// height: 'calc(100vh - 112px)',
	height: 'auto',
	padding: '60px 0',
})

export const mainContainerBackgroundColor = {
	pinkWhite: style({
		backgroundColor: MAIN_BACKGROUND_COLORS.pinkWhite,
	}),
	yellow: style({
		backgroundColor: MAIN_BACKGROUND_COLORS.yellow,
	}),
	gray200: style({
		backgroundColor: MAIN_BACKGROUND_COLORS.gray200,
	}),
	gray50: style({
		backgroundColor: MAIN_BACKGROUND_COLORS.gray50,
	}),
	white: style({
		backgroundColor: MAIN_BACKGROUND_COLORS.white,
	}),
}

export const mainTitle = recipe({
	base: {
		display: 'flex',
		flexDirection: 'column',
		gap: '6px',
		padding: '20px',
	},
	variants: {
		align: {
			center: {
				alignItems: 'center',
			},
			left: {
				alignItems: 'flex-start'
			}
		}
	}
})

export const mainBox = style({
	padding: '20px',
})

export const mainFirstContainer = style({
	display: 'flex',
	flexDirection: 'column',
	alignItems: 'center',
	justifyContent: 'center',
	padding: '40px 0',
	minHeight: '386px',
	height: '50vh',
})

export const mainReviewDescription = style({
	margin: '28px 40px',
	padding: '20px',
	background: themeVars.colors.red.pastelPink,
	borderRadius: '8px',
	position: 'relative',
	selectors: {
		'&:before': {
			content: '😋',
			fontSize: '37px',
			display: 'block',
			position: 'absolute',
			left: '-15px',
			top: '-15px',
		},
		'&:after': {
			content: '💕',
			fontSize: '37px',
			display: 'block',
			position: 'absolute',
			right: '-10px',
			bottom: '-10px',
		},
	}
})

export const mainFAQDescriptionBox = style({
	display: 'flex',
	flexDirection :'column',
	alignItems: 'flex-start',
	gap: '16px',
	padding: '40px 20px 20px',
})

export const mainFAQDescription = style({
	padding: '12px 20px',
	background: themeVars.colors.yellow.yellow200,
	borderRadius: '48px',
	selectors: {
		'&:nth-child(2)': {
			marginLeft: 'auto',
		}
	}
})

export const mainFAQButtonBox = style({
	paddingTop: '120px'
})

export const mainFAQButton = style({
	position: 'relative',
})

export const mainFAQButtonAvatar = style({
	position: 'absolute',
	top: 0,
	left: '50%',
	transform: 'translate(-50%, -100%)',
})

export const mainChapterIndexChips = style({
	display: 'inline-block',
	margin: '0 20px',
	borderRadius: '50px',
	background: themeVars.colors.red.red,
	color: themeVars.colors.gray.gray0,
	padding: "0 12px"
})

export const mainProductionPointsBox = style({
	background: themeVars.colors.red.red,
	display: 'flex',
	alignItems: 'flex-end',
	justifyContent: 'center',
	padding: '10px 20px',
	gap: '26px',
})

export const mainProductionPoint = style({
	display: 'flex',
	flexDirection: 'column',
	alignItems: 'center',
	justifyContent: 'space-between',
	width: 'calc(100% / 3)',
	gap: '10px',
	paddingBottom: '10px',
	height: '100%',
})

export const mainProductionPointDivider = style({
	width: '1.5px',
	height: '100px',
	display: 'block',
	margin: 'auto 0',
	background: themeVars.colors.gray.gray0,
})

export const mainProductionImageBox = style({
	display: 'flex',
	gap: '4px',
	paddingTop: 0,
})

export const mainProductionImage = style({
	width: 'calc(100% / 3)',
	height: 'auto',
	objectFit: 'contain',
})

export const mainDeliveryMarqueeContainer = style({
	background: themeVars.colors.red.red,
	height: '40px',
})

export const mainDeliveryMarqueeBox = style({
	display: 'flex',
	gap: '46px',
	margin: '0 23px',
})

export const mainDeliveryMarquee = style({
	display: 'flex',
	alignItems: 'center',
	gap: '8px',
})
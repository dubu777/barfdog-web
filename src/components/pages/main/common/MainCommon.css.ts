import { recipe } from "@vanilla-extract/recipes";
import { style } from "@vanilla-extract/css";
import { MAIN_BACKGROUND_COLORS } from "@/constants/style";
import { themeVars } from "@/styles/theme.css";

export const mainWrapper = style({
	minHeight: '100vh',
	marginBottom: '60px'
});

export const mainContainer = style({
	height: 'auto',
	padding: '60px 0',
	overflowX: 'hidden',
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
	padding: '20px !important',
})

export const mainBannerContainer = style({
	height: '386px',
})

export const mainBannerSlider = style({
	width: '100%',
	height: '100%',
})

export const mainBannerLink = style({
	width: '100%',
	height: '100%',
})

export const mainBannerImage = style({
	width: '100%',
	height: '100%',
	objectFit: 'cover',
})

export const mainReviewDescription = style({
	margin: '28px 40px 57px',
	padding: '20px',
	backgroundColor: themeVars.colors.red.pastelPink,
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

export const mainReviewCard = style({
	width: '120px !important',
	margin: '0 2px',
	overflow: 'hidden',
	padding: '0 !important',
	display: 'flex',
	flexDirection: 'column',
	alignItems: 'flex-start',
})

export const mainReviewImage = style({
	borderTopLeftRadius: '8px',
	borderTopRightRadius: '8px'
})

export const mainReviewCardContent = style({
	width: '100%',
	padding: '8px',
	display: 'flex',
	flexDirection: 'column',
	gap: '8px',
})

export const mainReviewButton = style({
	marginTop: '20px',
})

export const mainStoreItemList = style({

})

export const mainStoreItem = style({
	width: '120px !important',
	display: 'flex !important',
	flexDirection: 'column',
	gap: '6px',
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
	backgroundColor: themeVars.colors.yellow.yellow200,
	borderRadius: '48px',
	selectors: {
		'&:nth-child(2)': {
			marginLeft: 'auto',
		}
	}
})

export const mainFAQButtonBox = style({
	padding: '120px 20px 20px'
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

export const mainSurveyImageBox = style({
	height: '308px',
	overflow: 'hidden',
	display: 'flex',
	justifyContent: 'center',
	paddingTop: '20px',
})

export const mainSurveyImageInnerBox = style({
	display: 'flex',
	flexDirection: 'row-reverse',
	marginRight: '28px',
})

export const mainSurveyImage1 = style({
	marginTop: '64px',
	transform: 'translateX(28px)'
})

export const mainChapterIndexChips = style({
	display: 'inline-block',
	margin: '0 20px',
	borderRadius: '50px',
	background: themeVars.colors.red.red,
	color: themeVars.colors.gray.gray0,
	padding: "0 12px"
})

export const mainChapter1ImageList = style({
	display: 'flex',
	justifyContent: 'center',
	alignItems: 'center',
	gap: '17px',
	overflow: 'hidden',
	padding: '20px',
})

export const mainChapter1Image = style({
	width: '158px',
	height: '344px',
	borderRadius: '8px',
})

export const mainChapter2ImageList = style({
	display: 'flex',
	flexWrap: 'wrap',
	gap: '6px 4px',
	padding: '20px',
})

export const mainChapter2Image = style({
	width: '100%',
	height: 'auto',
	borderRadius: '8px',
})

export const mainChapter3Image = style({
	width: '247px !important',
	height: '280px',
})

export const mainBarfImage = style({
	padding: '0 20px'
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
	padding: '0 20px 20px'
})

export const mainProductionImage = style({
	width: 'calc(100% / 3)',
	height: 'auto',
	objectFit: 'contain',
})

export const mainProductionVideo = style({
	width: '100%',
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

export const mainBrandStoryContainer = style({
	padding: '40px 20px 316px !important',
})

export const mainBrandStoryMarquee = style({
	background: themeVars.colors.gray.gray800,
	display: 'flex',
	alignItems: 'center',
	padding: '4px 0'
})

export const mainBrandStoryLogo = style({
	margin: '0 10px',
	width: 'auto',
	height: '40px',
})
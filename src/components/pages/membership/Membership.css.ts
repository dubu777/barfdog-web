import { style } from "@vanilla-extract/css";
import { recipe } from "@vanilla-extract/recipes";
import { themeVars } from "@/styles/theme.css";

export const membershipContainer = style({})

export const membershipHeader = style({
	height: '52px',
	display: 'flex',
	justifyContent: 'center',
	alignItems: 'center',
	position: 'relative',
})

export const closeButton = style({
	position: 'absolute',
	right: '8px'
})

export const membershipList = style({
	background: themeVars.colors.gray.gray50,
	padding: '20px',
	display: 'flex',
	flexDirection: 'column',
	gap: '8px',
})

export const membershipItem = style({
	background: themeVars.colors.gray.gray0,
	borderRadius: '8px',
	padding: '20px',
})

export const membershipInfo = style({
	paddingBottom: '12px',
	marginBottom: '12px',
	borderBottom: `1px solid ${themeVars.colors.gray.gray200}`,
})

export const membershipName = style({
	display: 'flex',
	gap: '8px',
	alignItems: 'center',
})

export const membershipCondition = style({
	display: 'block',
})

export const membershipBenefit = style({})

export const benefitList = recipe({
	base: {
		display: 'flex',
		flexDirection: 'column',
		gap: '6px',
	},
	variants: {
		isSub: {
			true: {
				paddingLeft: '8px',
				marginTop: '6px'
			}
		}
	}
})

export const membershipDescription = style({
	background: themeVars.colors.gray.gray50,
	padding: '40px 20px 57px',
	textAlign: 'left',
	lineHeight: '2',
	display: 'flex',
	flexDirection: 'column',
	gap: '8px',
})
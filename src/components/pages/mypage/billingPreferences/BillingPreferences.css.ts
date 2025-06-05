import { style } from "@vanilla-extract/css";
import { themeVars } from "@/styles/theme.css";

// 결제수단 자동적립금
export const billingPreferencesContainer = style({
	backgroundColor: themeVars.colors.gray.gray0,
	marginTop: '2px',
})

export const billingPreferencesBox = style({
	padding: '20px',
})

export const billingLinkBox = style({
	padding: '0 20px 20px',
})

export const billingLink = style({
	display: 'block',
	padding: '16px 0',
	selectors: {
		'&:nth-child(1)': {
			borderBottom: `1px solid ${themeVars.colors.gray.gray200}`,
		}
	}
})

// 결제수단관리 리스트
export const paymentCardList = style({
	display: 'flex',
	flexDirection: 'column',
	gap: '10px',
	paddingBottom: '20px',
})

export const paymentCardPolicyInfo = style({
	display: 'flex',
	flexDirection: 'column',
	gap: '8px',
	padding: '20px 0',
})

// 결제수단 상세
export const detailSubscription = style({
	padding: '20px',
	backgroundColor: themeVars.colors.gray.gray0,
})

export const detailSubscriptionTitle = style({
})

export const detailSubscriptionList = style({
	marginTop: '20px',
	borderBottom: `1px solid ${themeVars.colors.gray.gray50}`
})

export const detailSubscriptionCard = style({
	padding: '0 !important',
})

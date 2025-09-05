import { style } from "@vanilla-extract/css";
import { recipe } from "@vanilla-extract/recipes";
import { themeVars } from "@/styles/theme.css";

export const myRecommendationCode = style({
  padding: '8px 12px !important',
  height: 'auto !important',
  marginTop: '4px'
})

export const recommendationCode = style({
  background: themeVars.colors.gray.gray0,
  padding: '20px 0 0',
  border: `1px solid ${themeVars.colors.gray.gray300}`,
})

export const codeActions = style({
  width: '100%',
  padding: '8px 0',
  display: 'flex',
})

export const codeActionButton = style({
  width: '100%',
  padding: '6px 0',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  gap: '4px',
  cursor: 'pointer',
})

export const rewardListTopBox = style({
  width: 'calc(100% / 3)',
  display: 'flex',
  flexDirection: 'column',
  padding: '8px 20px',
  background: themeVars.colors.gray.gray0,
  gap: '4px',
})

export const sendMessageModalContainer = style({
	width: '100%',
	backgroundColor: themeVars.colors.gray.gray50,
	padding: '20px',
	display: 'flex',
	flexDirection: 'column',
	gap: '20px',
})

export const sendMessageCard = style({
	border: `1px solid ${themeVars.colors.gray.gray200}`,
})

export const sendMessageInput = recipe({
	base: {},
	variants: {
		type: {
			name: {
				display: 'inline-block',
				maxWidth: '98px',
				margin: '0 4px 4px',
			},
			phoneNumber: {
				marginTop: '8px',
			}
		}
	}
})
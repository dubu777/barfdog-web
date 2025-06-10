import { style } from "@vanilla-extract/css";
import { recipe } from "@vanilla-extract/recipes";
import { themeVars } from "@/styles/theme.css";

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
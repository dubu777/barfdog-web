import { recipe } from "@vanilla-extract/recipes";
import { themeVars } from "@/styles/theme.css";

export const orderDeliveryDetailContainer = recipe({
	base: {
		minHeight: 'calc(100vh - 60px)',
		paddingBottom: '104px',
		background: themeVars.colors.gray.gray50,
	},
	variants: {
		showReceipt: {
			true: {
				padding: '20px',
			}
		}
	}
})
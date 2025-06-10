import { recipe } from "@vanilla-extract/recipes";

export const orderDeliveryDetailContainer = recipe({
	base: {
		paddingBottom: '104px',
	},
	variants: {
		showReceipt: {
			true: {
				padding: '20px',
			}
		}
	}
})
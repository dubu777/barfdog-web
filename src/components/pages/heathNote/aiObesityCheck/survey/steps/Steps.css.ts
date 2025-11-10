import { style } from "@vanilla-extract/css";
import { themeVars } from "@/styles/theme.css";
import { recipe } from "@vanilla-extract/recipes";

export const surveyInfoImageBox = recipe({
	base: {
		display: 'grid',
		gap: '8px',
	},
	variants: {
		columns: {
			2: {
				gridTemplateColumns: 'repeat(2, 1fr)',
			},
			3: {
				gridTemplateColumns: 'repeat(3, 1fr)',
			},
			4: {
				gridTemplateColumns: 'repeat(4, 1fr)',
			},
		}
	}
})

export const surveyUploadBox = style({
	width: '100%',
	maxHeight: '316px',
	aspectRatio: '1 / 1',
	display: 'flex',
	flexDirection: 'column',
	alignItems: 'center',
	justifyContent: 'center',
	gap: '12px',
	border: `2px dashed ${themeVars.colors.gray.gray300}`,
	borderRadius: '8px',
})

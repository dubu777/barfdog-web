import { style } from "@vanilla-extract/css";
import { themeVars } from "@/styles/theme.css";

export const accountContainer = style({
	display: 'flex',
	flexDirection: 'column',
})

export const accountInfo = style({
	display: 'flex',
	flexDirection: 'column',
	alignItems: 'center',
	justifyContent: 'center',
	padding: '20px',
})

export const accountButtonBox = style({
	width: '100%',
	display: 'flex',
	justifyContent: 'center',
	alignItems: 'center',
	position: 'fixed',
	bottom: 0,
	left: '50%',
	transform: 'translateX(-50%)',
	padding: '20px',
	borderTop: `1px solid ${themeVars.colors.gray.gray200}`,
	backgroundColor: themeVars.colors.gray.gray0,
})

export const accountImage = style({
	marginBottom: '16px',
})

export const accountLinkBox = style({
	display: 'flex',
	flexDirection: 'column',
	alignItems: 'flex-start',
	padding: '0 20px 20px',
	backgroundColor: themeVars.colors.gray.gray0,
})

export const accountLink = style({
	display: 'block',
	width: '100%',
	textAlign: 'left',
	padding: '16px 0',
	borderBottom: `1px solid ${themeVars.colors.gray.gray200}`,
	selectors: {
		'&:last-child': {
			borderBottom: 'none',
		}
	}
})

export const deleteAccountButton = style({
	border: '1xp solid red',
	textAlign: 'left',
	padding: '16px 20px'
})

export const accountForm = style({
	display: 'flex',
	flexDirection: 'column',
	gap: '20px',
	padding: '20px',
})

export const accountInputBox = style({
	width: '100%',
	display: 'flex',
	gap: '16px',
	alignItems: 'center',
})

export const accountLabel = style({
	width: '30%',
	fontSize: '15px'
})

export const accountInput = style({
	width: '70%',
})

export const accountSubmitButton = style({
	margin: '0 auto',
	width: '30%',
	display: 'flex',
	gap: '16px',
})

export const accountErrors = style({
	display: 'flex',
	flexDirection: 'column',
	alignItems: 'flex-start',
	gap: '5px',
	marginTop: '8.5px'
})

export const accountError = style({
	display: 'flex',
	alignItems: 'center',
})

export const connectedSns = style({
	display: 'flex',
	alignItems: 'center',
	justifyContent: 'space-between',
	backgroundColor: themeVars.colors.gray.gray0,
	padding: '16px 20px',
})

export const disconnectSnsSubmit = style({
	width: '30%',
	margin: '20px auto 0',
})

export const connectSnsBottomSheet = style({
	padding: '11px 20px'
})

export const connectSnsBox = style({
	width: '100%',
	padding: '20px 20px 40px',
	display: 'flex',
	flexDirection: 'column',
	gap: '13px'
})

export const uploadProfile = style({
	marginTop: '10px',
	display: 'flex',
	flexDirection: 'column',
	gap: '10px',
	justifyContent: 'center',
	alignItems: 'center',
	marginBottom: '20px',
})

export const userInfoBox = style({
	padding: '20px',
})

export const userInfoForm = style({
	display: 'flex',
	flexDirection: 'column',
	gap: '20px',
	marginBottom: '20px'
})

export const notificationBox = style({
})

export const notificationInfo = style({
	padding: '20px',
	display: 'flex',
	flexDirection: 'column',
	justifyContent: 'flex-start',
})

export const notificationItem = style({
	width: '100%',
	display: 'flex',
	justifyContent: 'space-between',
	alignItems: 'center',
	padding: '16px 0',
	borderBottom: `1px solid ${themeVars.colors.gray.gray200}`,
})

export const connectSnSAuthContainer = style({
	padding: '60px 20px 20px',
})

export const connectSnSAuthTitle = style({
	display: 'flex',
	flexDirection: 'column',
	gap: '4px',
	paddingBottom: '20px',
	borderBottom: `2px solid ${themeVars.colors.gray.gray900}`,
})

export const connectSnSAuthForm = style({
	paddingTop: '20px',
})

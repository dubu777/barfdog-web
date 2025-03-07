import {style} from "@vanilla-extract/css";
import {recipe} from "@vanilla-extract/recipes";
import {themeVars} from "@/styles/theme.css";

export const containerStyle = style({
	display: 'flex',
	alignItems: 'flex-end',
	justifyContent: 'center',
})

export const backgroundStyle = style({
	backgroundColor: "rgba(0, 0, 0, 0.3)",
})

export const overlayStyle = recipe({
	base: {
		position: "fixed",
		top: 0,
		left: 0,
		width: "100vw",
		height: "100vh",
		backgroundColor: "rgba(0, 0, 0, 0.5)",
		opacity: 0,
		transition: "opacity .35s ease-in-out",
		zIndex: 1000,
	},
	variants: {
		isOpen: {
			true: { opacity: 1 },
			false: { opacity: 0, zIndex: -1 },
		},
	},
})

export const sheetStyle = style({
	position: "fixed",
	bottom: 0,
	left: 0,
	minHeight: '50vh',
	maxHeight: '95vh',
	width: "100%",
	backgroundColor: "#fff",
	borderRadius: "16px 16px 0 0",
	// padding: "16px",
})

export const handleStyle = style({
	width: "60px",
	height: "4px",
	backgroundColor: themeVars.colors.gray.gray900,
	borderRadius: "100px",
	margin: "12px auto",
})

export const closeButtonStyle = style({
	position: 'absolute',
	top: '20px',
	right: '20px',
})
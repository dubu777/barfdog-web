import { themeVars } from "@/styles/theme.css";
import { style } from "@vanilla-extract/css";

export const modalContainer = style({
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'center',
    maxWidth: "600px",
    width: '100%',
    height: "100%",
    backgroundColor: themeVars.colors.gray.gray0,
})

export const modalHeaderWrapper = style({
    position: "relative",
    display: 'flex',
    height: "52px",
    justifyContent: "center",
    alignItems: 'center',
    alignSelf: "stretch",
})

export const closeButtonWrapper = style({
    position: "absolute",
    right: "20px",
    top: '10px',
})

export const backButtonWrapper = style({
    position: "absolute",
    left: "20px",
    top: '10px',
})
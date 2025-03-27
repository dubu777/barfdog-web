import { style } from "@vanilla-extract/css";
import { themeVars } from "@/styles/theme.css";

export const bottomSheetContainer = style({
  position: "fixed",
  bottom: 0,
  left: 0,
  right: 0,
  height: "auto",
  margin: "0 auto",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  backgroundColor: themeVars.colors.gray.gray0,
  borderRadius: "16px 16px 0 0",
  maxWidth: "600px",
  width: "100%",
});

export const bottomSheetContentWrapper = style({
  display: "flex",
  flexDirection: "column",
  alignItems: "flex-start",
  width: "100%",
});

export const bottomSheetHeader = style({
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  height: "52px",
  width: "100%",
  padding: "0 20px",
});

export const handleWrapper = style({
	width: "60px",
	height: "20px",
	paddingTop: "4px"
});

export const handleButton = style({
  width: "60px",
  height: "4px",
  backgroundColor: themeVars.colors.gray.gray900,
  borderRadius: "100px",
});

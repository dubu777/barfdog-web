import { globalStyle, style } from "@vanilla-extract/css";
import { themeVars } from "@/styles/theme.css";

export const wrapperContainer = style({
  minHeight: "calc(100vh - 52px)",
  backgroundColor: themeVars.colors.gray.gray50,
});

globalStyle(`${wrapperContainer} > section`, {
  height: "100%",
});

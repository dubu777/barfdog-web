import { themeVars } from "@/styles/theme.css";
import { style } from "@vanilla-extract/css";

export const recipeBadgeContainer = style({
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-start",
    padding: '4px',
    borderRadius: '4px',
    backgroundColor: themeVars.colors.red.pinkWhite,
    color: themeVars.colors.red.red,
    border: `1px solid ${themeVars.colors.red.pastelRed}`,
    width: "100%",
    marginBottom: "12px",
});


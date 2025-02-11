import { themeVars } from "@/styles/theme.css";
import { style } from "@vanilla-extract/css";

export const recipeBadgeContainer = style({

    padding: '8px 12px',
    borderRadius: '8px',
    backgroundColor: themeVars.colors.red.pinkWhite,
    color: themeVars.colors.red.red,
    border: `solid 1px ${themeVars.colors.red.pastelPink}`,
    width: "100%",
    marginTop: "10px",
});


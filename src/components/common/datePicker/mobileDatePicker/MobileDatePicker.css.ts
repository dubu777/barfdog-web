import { globalStyle, style } from "@vanilla-extract/css";
import { recipe } from "@vanilla-extract/recipes";
import { themeVars } from "@/styles/theme.css";

export const mobileDatePickerContainer = style({
  width: "100%",
  display: "flex",
  flexDirection: "column",
  gap: "8px",
});

export const mobileDatePickerStyle = style({
  gap: "28px",
  justifyContent: "center",
});

globalStyle(`${mobileDatePickerStyle} > div:last-child`, {
  zIndex: -1,
  width: "calc(100% - 36px) !important",
  left: "50% !important",
  transform: "translateX(-50%)",
  borderRadius: "4px",
  backgroundColor: themeVars.colors.gray.gray100,
  mixBlendMode: "multiply",
  boxShadow: themeVars.shadow.light,
  color: themeVars.colors.gray.gray900,
});

globalStyle(`${mobileDatePickerStyle} > div:last-child div`, {
  display: 'none'
});

export const mobileDatePickerBox = style({
  borderRadius: "8px",
  border: `1px solid ${themeVars.colors.gray.gray300}`,
});

export const mobilePickerSelected = recipe({
  base: {
    color: themeVars.colors.gray.gray300,
  },
  variants: {
    selected: {
      true: {
        color: themeVars.colors.gray.gray900,
        fontWeight: 500,
      },
    },
  },
});

import { style } from "@vanilla-extract/css";
import { themeVars } from "@/styles/theme.css";
import { recipe } from "@vanilla-extract/recipes";

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
  flex: 1,
  overflow: "hidden",
  position: "relative",
});

export const bottomSheetHeaderWrapper = recipe({
  base: {
    width: "100%",
    display: "flex",
    flexDirection: "column",
    justifyContent: "flex-start",
    gap: "12px",
  },
  variants: {
    hasSubTitle: {
      true: {
        padding: "20px",
      },
      false: {},
    },
  },
});

export const bottomSheetHeader = recipe({
  base: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
  },
  variants: {
    hasSubTitle: {
      true: {
        height: "auto",
      },
      false: {
        height: "52px",
        padding: "0 20px",
      },
    },
  },
});

export const handleWrapper = style({
  width: "60px",
  height: "20px",
  paddingTop: "4px",
});

export const handleButton = style({
  width: "60px",
  height: "4px",
  backgroundColor: themeVars.colors.gray.gray900,
  borderRadius: "100px",
});

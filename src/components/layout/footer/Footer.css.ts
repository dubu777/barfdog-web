import { themeVars } from "@/styles/theme.css";
import { style } from "@vanilla-extract/css";
import { recipe } from "@vanilla-extract/recipes";

export const footerContainer = style({
  background: themeVars.colors.gray.gray500,
  padding: "20px 20px 40px 20px",
});

export const logo = style({
  padding: "12px 20px",
});

export const menuLinkBox = style({
  padding: "4px 8px",
});

export const menuLink = style({
  padding: "8px 12px",
});

export const policyMenuLinkBox = style({
  padding: "8px",
});

export const footerInfo = style({
  padding: "0 20px",
});

export const footerInfoText = style({
  display: "flex",
  height: "18px",
});

export const footerInfoBox = recipe({
  base: {
    flexWrap: "wrap",
    maxWidth: "400px",
    display: "flex",
  },
  variants: {
    gap: {
      6: {
        columnGap: "6px",
      },
      12: {
        columnGap: "12px",
      },
    },
  },
  defaultVariants: {
    gap: 6,
  },
});

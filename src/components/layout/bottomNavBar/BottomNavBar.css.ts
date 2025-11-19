import { themeVars } from "@/styles/theme.css";
import { style } from "@vanilla-extract/css";

export const bottomNavBarBase = style({
  left: 0,
  right: 0,
  bottom: 0,
  width: "100%",
  minWidth: "320px",
  maxWidth: "600px",
  margin: "0 auto",
  zIndex: 200,
  backgroundColor: themeVars.colors.gray.gray0,
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  borderTop: `1px solid ${themeVars.colors.gray.gray200}`,
});

export const bottomNavBarOs = {
  iOS: style({
    padding: "8px 12px 34px",
  }),
  Android: style({
    padding: "14px 12px 24px",
  }),
  Other: style({
    padding: "14px 12px 24px",
  }),
};

export const bottomNavBarPosition = {
  fixed: style({
    position: "fixed",
  }),
  sticky: style({
    position: "sticky",
  }),
};

export const navLinkItem = style({
  width: "calc(100% / 5)",
});

export const navItemWrapper = style({
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
  padding: "8px",
  // borderRadius: "30px",
  // transition: "background-color 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
  // ":hover": {
  //   backgroundColor: themeVars.colors.gray.gray50,
  // },
});

export const navLabel = style({
  height: "17px",
});

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
  borderTop: `1px solid ${themeVars.colors.gray.gray200}`
});

export const bottomNavBarOs = {
  iOS: style({
    padding: '8px 12px 34px',
  }),
  Android: style({
    padding: '14px 12px 24px',
  }),
  Other: style({
    padding: '14px 12px 24px',
  }),
}

export const bottomNavBarPosition = {
  fixed: style({
    position: 'fixed',
  }),
  sticky: style({
    position: 'sticky',
  }),
}

export const bottomNavBarWrapper = style({
  flex: 1,
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  width: '100%',
  height: '100%',
});

export const navLinkItem = style({
  width: 'calc(100% / 5)',
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: 'center',
});

export const navLabel = style({
  height: '17px',
});
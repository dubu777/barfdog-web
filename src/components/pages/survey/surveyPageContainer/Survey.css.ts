import { themeVars } from "@/styles/theme.css";
import { style } from "@vanilla-extract/css";

export const surveyLayoutContainer = style({
  minHeight: 'calc(100vh - 85px)',
  width: '100%',
  marginBottom: '85px',
  backgroundColor: themeVars.colors.gray.gray50,
  overflow: "hidden",
});

export const surveyTitle = style({
  fontSize: themeVars.fontSize["title-sm"],
  paddingBottom: "35px",
});

export const surveyInputWrapper = style({
  display: "flex",
  flexDirection: "column",
  alignItems: 'center',
  minWidth: '300px',
})


export const subscribeShopContainer = style({
  position: 'relative',
  width: '100%',
  paddingTop: '59px',
  backgroundColor: themeVars.colors.gray.gray50,
});

export const summaryWrapper = style({
  position: 'absolute',
  bottom: '0',
  width: '100%',
});

export const subscribeShopWrapper = style({
  width: '100%',
  padding: '20px 20px 123px 20px',
});

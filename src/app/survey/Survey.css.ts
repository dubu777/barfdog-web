import { themeVars } from "@/styles/theme.css";
import { style } from "@vanilla-extract/css";

export const surveyLayoutContainer = style({
  minHeight: 'calc(100vh - 153px)',
  width: '100%',
  marginTop: '62px',
  marginBottom: '50px',
  backgroundColor: themeVars.backgroundColors.pinkFa,
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
  marginTop: '62px',
  display: 'flex',
  justifyContent: 'center',
});
export const summaryWrapper = style({
  position: 'absolute',
  bottom: '0',
  width: '100%',
});

export const subscribeShopWrapper = style({
  maxWidth: '360px',
  width: '100%',
  padding: '20px 0 80px 0',
});

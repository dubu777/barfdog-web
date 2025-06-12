import { underline } from "./../../../common/defaultText/DefaultText.css";
import { themeVars } from "@/styles/theme.css";
import { style } from "@vanilla-extract/css";

export const resultSummaryTop = style({
  display: "flex",
  flexDirection: "column",
  alignItems: "start",
  gap: "4px",
  backgroundColor: themeVars.colors.red.red,
  width: "100%",
  padding: "40px 20px 88px 20px",
});

export const tempImageStyle = style({
  width: "100%",
  height: "140px",
  marginBottom: "16px",
  backgroundColor: themeVars.colors.gray.gray100,
});

export const resultCardWrapper = style({
  width: "100%",
  padding: "0 20px",
});
export const resultSummaryCard = style({
  marginTop: "-60px",
});

export const resultSummaryCardText = style({
  marginLeft: "4px",
});

export const otherSymptomsWrapper = style({
  display: "flex",
  justifyContent: "start",
});
export const inedibleFoodChipStyle = style({
  border: `1px solid ${themeVars.colors.red.lightRed}`,
});
export const pointText = style({
  color: themeVars.colors.red.red,
});
export const tempIconStyle = style({
  backgroundColor: themeVars.colors.gray.gray200,
  width: "60px",
  height: "60px",
});
export const pointTextBox = style({
  display: "flex",
  padding: "0px 4px",
  height: "24px",
  justifyContent: "center",
  alignItems: "center",
  borderRadius: "2px",
  backgroundColor: themeVars.colors.gray.gray900,
  color: themeVars.colors.gray.gray0,
});
export const underlineText = style({
  textDecoration: "underline",
});

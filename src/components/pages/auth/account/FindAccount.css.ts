import { themeVars } from "@/styles/theme.css";
import { style } from "@vanilla-extract/css";

export const findAccountContainer = style({
  display: "flex",
  flexDirection: "column",
  gap: "20px",
  justifyContent: "flex-start",
  alignItems: "center",
  padding: "32px 20px",
  backgroundColor: themeVars.colors.gray.gray50,
  height: "calc(100vh - 109px)",
});

export const findIdLabel = style({
  flex: 2,
  maxWidth: "100px",
});
export const findIdValue = style({
  display: "inline-flex",
  flex: 3,
  alignItems: "center",
});

export const findAccountForm = style({
  margin: "40px 0",
  display: "flex",
  flexDirection: "column",
  gap: "1rem",
});

export const resultBox = style({
  display: "flex",
  flexDirection: "column",
  gap: "1rem",
  border: `1px solid gray`,
  padding: "60px 0",
});

export const result = style({
  display: "flex",
  justifyContent: "space-between",
  width: "80%",
  margin: "0 auto",
});

export const resultButtons = style({
  display: "flex",
  flexDirection: "column",
  gap: "10px",
});

export const connectSnsContainer = style({
  height: "100vh",
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
});

export const connectSnsPassword = style({
  width: "60%",
  margin: "40px auto 20px",
});

export const connectSnsSubmitButton = style({
  width: "60%",
  margin: "0 auto",
});

export const findAccountTabBarContainer = style({
  width: "100%",
  boxShadow: "0 3px 4px -1px rgba(0, 0, 0, 0.1)",
});

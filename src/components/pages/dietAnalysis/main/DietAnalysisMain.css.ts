import { themeVars } from "@/styles/theme.css";
import { style } from "@vanilla-extract/css";

export const emptyTitle = style({
  marginTop: "12px",
});
export const emptyText = style({
  marginTop: "6px",
  marginBottom: "20px",
});

export const renewalNoticeButtonWrapper = style({
  display: "flex",
  flexDirection: "column",
  padding: "12px 20px 38px 12px",
  gap: "20px",
  alignItems: "center",
  width: "100%",
});

export const emptyPetContainer = style({
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
  backgroundColor: themeVars.colors.gray.gray50,
  height: "calc(100vh - 52px)",
  marginTop: "-40px",
});

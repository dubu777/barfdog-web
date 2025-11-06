import { themeVars } from "@/styles/theme.css";
import { style } from "@vanilla-extract/css";

export const heathNoteHeaderContainer = style({
  padding: "6px 20px",
  display: "flex",
  alignItems: "center",
  gap: "8px",
  backgroundColor: themeVars.colors.gray.gray0,
});

export const selectButton = style({
  display: "flex",
  alignItems: "center",
  cursor: "pointer",
});

export const selectBottomSheet = style({
  maxHeight: "90vh",
  overflowY: "scroll",
});

export const selectBottomSheetHeader = style({
  width: "100%",
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  padding: "20px 20px 8px",
  position: "sticky",
  top: "-1px",
  backgroundColor: themeVars.colors.gray.gray0,
});

export const selectBottomSheetBox = style({
  width: "100%",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
});

export const selectPetButton = style({
  width: "100%",
  display: "flex",
  justifyContent: "space-between",
  padding: "12px 16px",
  height: "auto",
  cursor: "pointer",
});

export const selectBottomSheetPetInfo = style({
  display: "flex",
  alignItems: "center",
  gap: "8px",
});

import { style } from "@vanilla-extract/css";
import { themeVars } from "@/styles/theme.css";

export const bodyCheckListBox = style({
  width: '100%',
  borderTopLeftRadius: '16px',
  borderTopRightRadius: '16px',
  overflow: 'hidden',
  backgroundColor: themeVars.colors.gray.gray0,
});

export const bodyCheckList = style({
  marginTop: '16px',
});

export const bodyCheckEmptyList = style({
  padding: "55px 0",
});

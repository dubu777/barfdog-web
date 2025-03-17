import { themeVars } from "@/styles/theme.css";
import { style } from "@vanilla-extract/css";
import { recipe } from "@vanilla-extract/recipes";

export const modalContainer = style({
  display: "flex",
  flexDirection: "column",
  justifyContent: "space-between",
  alignItems: 'flex-start',
  minWidth: '321px',
  minHeight: '126px',
  padding: '20px',
  gap: '28px',
  borderRadius: '8px',
  backgroundColor: themeVars.colors.gray.gray0,
})

export const modalContentWrapper = style({
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: 'flex-start',
  width: '100%',
  gap: '8px',
})

export const modalButtonWrapper = style({
    display: "flex",
    justifyContent: 'flex-end',
    alignItems: 'center',
    alignSelf: "stretch",
    gap: '8px'
})
import { style } from "@vanilla-extract/css";
import { themeVars } from "@/styles/theme.css";

export const reviewFormContainer = style({
  background: themeVars.colors.gray.gray50,
})

export const reviewNotice = style({
  padding: '20px',
})

export const reviewFormTitle = style({
  padding: '20px 20px 0',
  background: themeVars.colors.gray.gray0,
})

export const reviewControls = style({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  marginBottom: '20px',
})

export const reviewContentsBox = style({
  margin: '4px 0',
  background: themeVars.colors.gray.gray0,
})

export const reviewContents = style({
  padding: '20px 20px 0',
})

export const reviewContentsTitle = style({
  display: 'flex',
  alignItems: 'center',
  gap: '4px',
  marginTop: '20px',
})

export const reviewTemporaryReward = style({
  textAlign: 'left',
})

export const reviewNoticeBottomSheet = style({
  padding: '0 20px 20px',
})

export const bottomSheetSubTitle = style({
  margin: '16px 0 8px',
})

export const bottomSheetInfoDetail = style({
  display: 'flex',
  flexDirection: 'column',
  gap: '8px',
  marginLeft: '8px',
})
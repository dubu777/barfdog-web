import { style } from "@vanilla-extract/css";
import { themeVars } from "@/styles/theme.css";

export const gutCheckListContainer = style({
  padding: '40px 20px',
  display: 'flex',
  flexDirection: 'column',
  gap: '20px',
})

export const gutCheckListTitle = style({
  display: 'flex',
  alignItems: 'flex-end',
  justifyContent: 'space-between',
})

export const kitGuideButton = style({
  backgroundColor: `${themeVars.colors.gray.gray100} !important`,
  border: `1px solid ${themeVars.colors.gray.gray400} !important`,
  color: `${themeVars.colors.gray.gray700} !important`,
})

export const gutCheckList = style({
  display: 'flex',
  flexDirection: 'column',
  gap: '12px',
})

export const gutCheckCardItem = style({
  width: '100%',
  display: 'flex',
  alignItems: 'center',
	justifyContent: 'space-between',
  gap: '8px',
})

export const gutCheckEmpty = style({
  padding: '28px 0',
})

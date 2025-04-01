import { style } from "@vanilla-extract/css";
import { themeVars } from "@/styles/theme.css";

export const fileUploadContainer = style({
  padding: '20px',
  background: themeVars.colors.gray.gray0,
})

export const fileUploadTitle = style({
  display: 'flex',
  alignItems: 'center',
  gap: '4px',
  marginBottom: '8px',
})

export const uploadBox = style({
  display: 'flex',
})

export const uploadLabel = style({
  width: '100px',
  height: '100px',
  background: themeVars.colors.gray.gray200,
  border: `1px solid ${themeVars.colors.gray.gray500}`,
  borderRadius: '8px',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  cursor: 'pointer',
  marginRight: '4px',
})

export const uploadInfo = style({
  marginTop: '10px',
})

export const error = style({
  marginBottom: '20px',
})
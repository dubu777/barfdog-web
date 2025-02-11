import { style } from "@vanilla-extract/css";
import { themeVars } from "@/styles/theme.css";

export const reviewImageContainer = style({
  display: 'flex',
  justifyContent: 'space-between',
})

export const fileUploadTitle = style({
  width: '20%',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'flex-start',
  gap: '10px',
  fontWeight: themeVars.fontWeight.semibold,
})

export const subTitle = style({
  fontSize: themeVars.fontSize["text-sm"],
  fontWeight: themeVars.fontWeight.normal,
  color: themeVars.colors.red.red,
})

export const fileUpload = style({
  width: '70%',
})

export const uploadBox = style({
  display: 'flex',
  gap: '10px',
})

export const uploadLabel = style({
  width: '75px',
  height: '75px',
  background: themeVars.backgroundColors.grey63,
  cursor: 'pointer',
  position: 'relative',
  ':before': {
    content: '',
    display: 'block',
    width: '2px',
    height: '20px',
    background: themeVars.colors.gray.gray0,
    position: 'absolute',
    top: '40%',
    left: '50%',
    transform: 'rotate(180deg)',
  },
  ':after': {
    content: '',
    display: 'block',
    width: '2px',
    height: '20px',
    background: themeVars.colors.gray.gray0,
    position: 'absolute',
    top: '40%',
    left: '50%',
    transform: 'rotate(-90deg)',
  },
})

export const previewFiles = style({
  display: 'flex',
  flexWrap: 'wrap',
  gap: '10px',
  width: 'calc(100% - 90px)'
})

export const previewFile = style({
  position: 'relative',
})

export const previewImage = style({
  objectFit: 'cover',
  border: `1px solid ${themeVars.borderColors.greyDD}`
})

export const removeButton = style({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  width: '20px',
  height: '20px',
  position: 'absolute',
  right: '5px',
  top: '5px',
  background: '#fff',
  padding: '5px',
  borderRadius: '50%',
  cursor: 'pointer'
})

export const uploadInfo = style({
  marginTop: '10px',
})

export const error = style({
  marginBottom: '20px',
})
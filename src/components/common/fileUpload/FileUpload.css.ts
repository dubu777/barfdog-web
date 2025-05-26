import { recipe } from "@vanilla-extract/recipes";
import { style } from "@vanilla-extract/css";
import { themeVars } from "@/styles/theme.css";

export const fileUploadContainer = style({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  gap: '10px'
})

export const imageFile = recipe({
  base: {
    display: 'block',
    cursor: 'pointer',
  },
  variants: {
    borderRadius: {
      true: {
        borderRadius: '50%'
      }
    },
    objectFit: {
      cover: {
        objectFit: 'cover',
      },
      contain: {
        objectFit: 'contain',
      }
    }
  }
})

export const background = style({
  position: 'absolute',
  top: 0,
  left: 0,
  width: '100%',
  height: '100%',
  background: themeVars.colors.dimmed.gary60,
  borderRadius: '50%',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  cursor: 'pointer'
})

export const fileInfoContainer = style({
  width: '100%',
  display: 'flex',
  alignItems: 'center',
  gap: '10px'
})

export const fileInputLabel = style({
  minWidth: '25%',
  borderRadius: '5px',
  padding: '5px 8px',
  textAlign: 'center',
  background: themeVars.colors.red.red,
  color: themeVars.colors.gray.gray0,
  fontSize: themeVars.fontSize["text-sm"],
  cursor: 'pointer',
})

export const clearButton = style({
  cursor: 'pointer',
})

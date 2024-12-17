import { themeVars } from "@/styles/theme.css";
import { style } from "@vanilla-extract/css";


export const packageSelectionContainer = style({
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
  width: '100%',
  gap: '10px',
})

export const packageSelectionWrapper = style({
  display: 'grid',
  gridTemplateColumns: 'repeat(2, 1fr)',
  gap: '10px',
})

export const packageSelectionCard = style({
  width: '140px',
  height: '150px',
  backgroundColor: themeVars.backgroundColors.grey7E,
})
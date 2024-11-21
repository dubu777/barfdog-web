import {style} from "@vanilla-extract/css";
import {themeVars} from "@/styles/theme.css";

export const modalStyle = style({
  width: '90%',
  backgroundColor: themeVars.colors.white,
  borderRadius: '8px',
  padding: '40px 22px 24px',
  textAlign: 'center',
  boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.1)',
  position: 'relative'
});

export const closeBtn = style({
  position: 'absolute',
  top: '20px',
  right: '20px',
  cursor: 'pointer',
  '@media': {
    'screen and (max-width: 600px)': {
      right: '12px',
    }
  },
})
import { style } from "@vanilla-extract/css";
import { themeVars } from "@/styles/theme.css";

export const toastContainer = style({
  position: "fixed",
  left: "50%",
  transform: "translateX(-50%)",
  zIndex: 1000,
  maxWidth: "560px",
})

export const toastPosition = {
  'bottom': style({
    bottom: '20px',
  }),
  'above-button': style({
    bottom: '108px',
  })
}

export const toast = style({
  padding: '14px 12px 14px 20px',
  background: themeVars.colors.dimmed.gray80,
  color: themeVars.colors.gray.gray0,
  borderRadius: '8px',
  boxShadow: themeVars.shadow.normal,
  fontSize: '14px',
  textAlign: 'left',
  width: '100%',
  opacity: 1,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
});
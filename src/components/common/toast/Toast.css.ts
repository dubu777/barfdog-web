import { style } from "@vanilla-extract/css";
import { themeVars } from "@/styles/theme.css";

export const toastContainer = style({
  width: 'calc(100% - 40px)',
  position: "fixed",
  left: "50%",
  transform: "translateX(-50%)",
  zIndex: 1000,
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
  boxShadow: '-1px -1px 2px 0px rgba(255, 255, 255, 0.08) inset, 0px 1px 4px 0px rgba(0, 0, 0, 0.08), 0px 2px 10px 0px rgba(0, 0, 0, 0.10)',
  fontSize: '14px',
  textAlign: 'left',
  width: '100%',
  opacity: 1,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
});
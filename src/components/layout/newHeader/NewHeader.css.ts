import { themeVars } from "@/styles/theme.css";
import { style } from "@vanilla-extract/css";


export const headerContainer = style({
  position: 'fixed',
  top: 0,
  left: 0,
  right: 0,
  width: "100%",
  height: "52px",
  zIndex: 100,
});

export const headerContent = style({
  maxWidth: '600px',
  width: '100%',
  margin: '0 auto',
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  height: "100%",
  padding: "0 20px",
  backgroundColor: themeVars.colors.gray.gray0,
});

export const centerSlot = style({
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
});

export const leftSlot = style({
  display: "flex",
  alignItems: "center",
  gap: "28px",
});

export const rightSlot = style({
  display: "flex",
  alignItems: "center",
  gap: "28px",
});

export const cartButton = style({
  position: 'relative',
})

export const cartCount = style({
  position: 'absolute',
  width: '16px',
  height: '16px',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  top: -5,
  right: -6,
  background: `url('/images/icons/cartCircle.png') no-repeat center center / 16px 16px`,
})
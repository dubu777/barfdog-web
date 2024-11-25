import { style } from "@vanilla-extract/css";
import { recipe } from "@vanilla-extract/recipes";
import { themeVars } from "@/styles/theme.css";

export const modalStyle = style({
  minWidth: '50%',
  backgroundColor: themeVars.colors.white,
  borderRadius: '8px',
  padding: '32px 22px 24px',
  textAlign: 'center',
  boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.1)',
  position: 'relative'
});

export const messageStyle = recipe({
  base: {
    marginBottom: '29px',
    fontSize: themeVars.fontSize["text-md"],
  },
  variants: {
    isAutoClose: {
      true: {
        marginBottom: 0,
      }
    }
  }
});

export const buttonContainerStyle = style({
  display: 'flex',
  gap: '22px',
  justifyContent: 'center',
});

export const buttonStyle = style({
  padding: '8px 16px',
  borderRadius: '22px',
  border: 'none',
  cursor: 'pointer',
  width: '50%',
});

export const cancelButtonStyle = style([
  buttonStyle,
  {
    backgroundColor: themeVars.colors.white,
    border: `1px solid ${themeVars.borderColors.greyBB}`,
  },
]);

export const confirmButtonStyle = style([
  buttonStyle,
  {
    backgroundColor: '#d32f2f',
    color: themeVars.colors.white,
  },
]);

export const closeButton = style({
  width: '10px',
  height: '10px',
  background: `url('/images/icons/close-black.png') no-repeat center center / 10px 10px`,
  position: 'absolute',
  right: '16px',
  top: '16px'
})
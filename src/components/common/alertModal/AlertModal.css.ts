import {style} from "@vanilla-extract/css";
import {commonLayoutStyle} from "@/styles/common.css";
import {themeVars} from "@/styles/theme.css";

export const overlayStyle = style([commonLayoutStyle, {
  height: '100vh',
  position: 'fixed',
  top: 0,
  left: '50%',
  transform: 'translateX(-50%)',
  backgroundColor: 'rgba(0, 0, 0, 0.5)',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  zIndex: 1000,
}]);

export const modalStyle = style({
  width: '50%',
  backgroundColor: themeVars.colors.white,
  borderRadius: '8px',
  padding: '32px 22px 24px',
  textAlign: 'center',
  boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.1)',
});

export const messageStyle = style({
  marginBottom: '29px',
  fontSize: themeVars.fontSize["text-md"],
});

export const buttonContainerStyle = style({
  display: 'flex',
  gap: '22px',
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
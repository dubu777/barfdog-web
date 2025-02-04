import { style } from "@vanilla-extract/css";
import { recipe } from "@vanilla-extract/recipes";
import { themeVars } from "@/styles/theme.css";

export const loginButton = recipe({
  base: {
    width: '100%',
    height: '62px',
    borderRadius: '33px',
    fontSize: themeVars.fontSize["text-md"],
    fontWeight: themeVars.fontWeight.bold,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '8px',
    position: 'relative',
    cursor: 'pointer'
  },
  variants: {
    provider: {
      kakao: {
        background: themeVars.backgroundColors.kakao,
        color: themeVars.colors.black,
        marginBottom: '12px',
      },
      naver: {
        background: themeVars.backgroundColors.naver,
        color: themeVars.colors.white,
      }
    },
    lastLoginActivity: {
      true: {
        border: `1px solid ${themeVars.colors.red}`,
      }
    }
  }
})

export const lastLoginActivity = style({
  minWidth: '55px',
  padding: '3px 6px',
  background: themeVars.colors.red,
  color: themeVars.colors.white,
  fontSize: themeVars.fontSize["text-2xs"],
  fontWeight: themeVars.fontWeight.normal,
  borderRadius: '33px',
  position: 'absolute',
  left: '-25px',
  top: '50%',
  transform: 'translateY(-50%)'
})

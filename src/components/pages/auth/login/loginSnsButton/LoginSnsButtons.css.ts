import { style } from "@vanilla-extract/css";
import { recipe } from "@vanilla-extract/recipes";
import { themeVars } from "@/styles/theme.css";

export const loginButton = recipe({
  base: {
    width: '100%',
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
        backgroundColor: themeVars.backgroundColors.kakao,
        color: themeVars.colors.gray.gray900,
      },
      naver: {
        backgroundColor: themeVars.backgroundColors.naver,
        color: themeVars.colors.gray.gray0,
      }
    },
    lastLoginActivity: {
      true: {
        border: `1px solid ${themeVars.colors.red.red}`,
      }
    },
    size: {
      sm: {
        height: '54px',
      },
      md: {
        height: '62px',
      }
    },
    borderRadius: {
      sm: {
        borderRadius: '4px',
      },
      md: {
        borderRadius: '33px',
      }
    }
  },
  compoundVariants: [
    {
      variants: { provider: 'kakao', size: 'md' },
      style: {
        marginBottom: '12px',
      },
    },
  ]
})

export const lastLoginActivity = style({
  minWidth: '55px',
  padding: '3px 6px',
  backgroundColor: themeVars.colors.red.red,
  color: themeVars.colors.gray.gray0,
  fontSize: themeVars.fontSize["text-2xs"],
  fontWeight: themeVars.fontWeight.normal,
  borderRadius: '33px',
  position: 'absolute',
  left: '-25px',
  top: '50%',
  transform: 'translateY(-50%)'
})

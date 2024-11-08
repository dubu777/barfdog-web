import { style } from "@vanilla-extract/css";
import { recipe } from "@vanilla-extract/recipes";
import { themeVars } from "@/styles/theme.css";
import { defaultWidth } from "@/styles/common.css";

export const mainContainer = style({
  height: themeVars.height.innerHeight,
  marginTop: '62px'
})

export const userInfoBox = style([defaultWidth, {
  marginBottom: '27px',
  display: 'flex',
  alignItems: 'center',
  gap: '22px',
  paddingTop: '8px',
  position: 'relative',
}])

export const infoText = recipe({
  base: {
    textAlign: 'left',
  },
  variants: {
    size: {
      lg: {
        fontSize: themeVars.fontSize["text-lg"],
      }
    },
    type: {
      parents: {
        fontSize: themeVars.fontSize["text-xs"],
      },
      email: {
        marginBottom: 0,
        fontSize: themeVars.fontSize["text-xs"],
      },
      username: {
        display: 'flex',
        alignItems: 'flex-end',
        gap: '8px',
        fontSize: themeVars.fontSize["text-md"],
        margin: '5px 8px 16px 0',
        position: 'relative',
        ':after': {
          content: '',
          display: 'block',
          width: '15px',
          height: '1px',
          background: themeVars.colors.black,
          position: 'absolute',
          left: 0,
          bottom: '-8px',
        }
      }
    }
  }
})

export const editMypageButton = style({
  position: 'absolute',
  right: 0,
  top: 0,
})

export const myPageBanner = style({
  width: '100%',
  height: '49px',
  background: themeVars.colors.black,
  color: themeVars.colors.white,
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
})


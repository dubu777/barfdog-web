import { themeVars } from "@/styles/theme.css";
import { recipe } from "@vanilla-extract/recipes";
import { style } from "@vanilla-extract/css";

export const mainVideoWrapper = recipe({
  base: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    minHeight: '515px',
    height: '65vh',
    color: themeVars.colors.white,
    alignItems: 'center',
    position: 'relative',
    marginTop: '62px'
  },
  variants: {
    isTopBannerVisible: {
      true: {
        marginTop: '102px',
      },
    }
  },
});

export const mainVideo = style({
  width: '100%',
  height: '100%',
  objectFit: 'cover',
  position: 'absolute',
  top: 0,
  left: 0,
})
export const mainVideoButton = style({
  width: '172px',
  zIndex: 10,
  marginTop: '96px',
})
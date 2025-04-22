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
    color: themeVars.colors.gray.gray0,
    alignItems: 'center',
    position: 'relative',
  },
  variants: {
    isTopBannerVisible: {
      true: {
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
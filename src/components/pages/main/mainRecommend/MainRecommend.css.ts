import {style} from "@vanilla-extract/css";
import {themeVars} from "@/styles/theme.css";
import {recipe} from "@vanilla-extract/recipes";

export const mainRecommendWrapper = style({
  height: 'auto',
  padding: '66px 0 62px',
  color: themeVars.colors.black,
})

export const recommendTitle = style({
  marginBottom: '4px',
})

export const recommendSlideContainer = style({
  paddingLeft: '20px',
})

export const recommendSlideList = recipe({
  base: {
    width: '100%',
    margin: '30px 0 40px',
  },
  variants: {
    type: {
      'recipes': {
        margin: '25px 0 0',
      }
    },
  }
})

export const recommendSlideBox = recipe({
  base: {
    overflow: 'hidden',
  },
  variants: {
    type: {
      healthCheck: {
        width: '139px !important',
        borderRadius: '8px',
      },
      recipes: {
        width: 'auto !important',
      },
    }
  }
})

export const recommendSlideItem = style({
  width: '100%',
  position: 'relative',
  cursor: 'pointer',
})

export const recommendSlideImage = recipe({
  base: {
    display: 'block',
    objectFit: 'contain',
    borderRadius: '7px',
  },
  variants: {
    type: {
      'recipes': {
        marginBottom: '4px'
      },
      'healthCheck': {
        width: '100%',
        height: '100%',
      }
    }
  }
})

export const healthCheckFakeBg = style({
  width: '100%',
  height: '100%',
  position: 'absolute',
  top: 0,
  left: 0,
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  background: themeVars.backgroundColors.darkOpacity,
})

export const healthCheckTitle = style({
  position: 'absolute',
  top: 20,
  left: 13,
})

export const recipesContentBox = style({
  paddingLeft: '10px'
})

export const recipesPrice = style({
  marginTop: '5px',
  display: 'flex',
  gap: '9px',
})

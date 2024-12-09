import { globalStyle, style } from "@vanilla-extract/css";
import { recipe } from "@vanilla-extract/recipes";
import { themeVars } from "@/styles/theme.css";
import { defaultWidth } from "@/styles/common.css";

export const dogsInfoBox = style({
  marginBottom: '29px',
});

export const dogsList = style({
  height: '100%',
  paddingTop: '4px !important',
})

export const dogSlider = style({
  width: '90% !important',
});

export const dogSlide = recipe({
  base: {
    border: `1px solid ${themeVars.colors.lightGrey}`,
    width: '100%',
    height: '100%',
    borderRadius: '3px',
    position: 'relative',
    padding: '43px 20px 20px',
  },
  variants: {
    representative: {
      true: {
        border: `1px solid ${themeVars.colors.mainRed}`,
      }
    },
    noDogData: {
      true: {
        width: '90%',
        margin: '0 auto',
      }
    }
  }
})

export const noDogDataContainer = style( [defaultWidth, {
  width: '100%',
  height: '100%',
  background: themeVars.backgroundColors.darkOpacity90,
  position: 'absolute',
  top: 0,
  left: 0,
  borderRadius: '3px',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
}]);

export const dogListScrollbar = style({
  width: 'calc(100% - 40px)',
  margin: '16px auto 0',
  height: '8px',
  backgroundColor: themeVars.backgroundColors.greyD9,
  borderRadius: '8px',
});

globalStyle(`${dogListScrollbar} .swiper-scrollbar-drag`, {
  backgroundColor: themeVars.backgroundColors.greyA6,
  borderRadius: '8px',
})

export const dogFlag = recipe({
  base: {
    position: 'absolute',
    top: '-4px',
    left: '19px',
  },
  variants: {
    representativeDog: {
      false: {
        cursor: 'pointer'
      }
    }
  }
});

export const dogContent = style({
  display: 'flex',
  gap: '18px',
  marginBottom: '19px',
});

export const subscribeStatus = style({
  display: 'inline-block',
  position: 'absolute',
  top: '24px',
  right: '20px',
});

export const subscribeDateBox = style({
  width: '100%',
  height: '19px%',
  background: themeVars.backgroundColors.greyD9,
  display: 'flex',
  justifyContent: 'center',
  gap: '18px',
  padding: '10px',
  marginBottom: '11px',
  fontSize: themeVars.fontSize["text-xs"],
});

export const productionDate = style({
  position: 'relative',
  ':after': {
    content: '',
    display: 'block',
    width: '1px',
    height: '100%',
    background: themeVars.colors.black,
    position: 'absolute',
    top: '0',
    right: '-9px',
  }
});

export const subscribeControlsBox = style({
  display: 'flex',
  gap: '13px'
});
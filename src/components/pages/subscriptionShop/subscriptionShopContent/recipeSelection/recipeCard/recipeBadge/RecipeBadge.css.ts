import { themeVars } from "@/styles/theme.css";
import { recipe } from "@vanilla-extract/recipes";

export const recipeBadgeContainer = recipe({
  base: {
    position: 'absolute',
    zIndex: 1,
    left: '5px',
    top: '-5px',
    height: '20px',
    textAlign: 'center',
    padding: '0 7px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: '10px',
    color: themeVars.fontColors.white,
    fontWeight: themeVars.fontWeight.semibold,
    fontSize: themeVars.fontSize["text-2xs"],
    lineHeight: '1',
  },
  variants: {
    type: {
      'recommend': {
        backgroundColor: themeVars.backgroundColors.mainRed
      },
      'inedible': {
        backgroundColor: themeVars.backgroundColors.black        
      },
      'none': {
      },
    }
  },
});


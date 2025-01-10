import { themeVars } from "@/styles/theme.css";
import { style } from "@vanilla-extract/css";
import { recipe } from "@vanilla-extract/recipes";

export const paymentMethodContainer = style({
  display: 'flex',
  flexDirection: 'column',
  width: '100%',
  gap: '20px',
  marginBottom: '20px',
});


export const paymentMethodBox = recipe({
  base: {
    width: '100%',
    height: '50px',
    cursor: 'pointer',
    transition: 'background-color 0.3s',
  },
  variants: {
    selected: {
      true: {
        backgroundColor: themeVars.backgroundColors.darkOpacity90,
      },
      false: {
        backgroundColor: themeVars.backgroundColors.greyA6,
      },
    },
  },
  defaultVariants: {
    selected: false,
  },
});

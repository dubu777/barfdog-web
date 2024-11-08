import { style } from '@vanilla-extract/css';
import {recipe} from "@vanilla-extract/recipes";
import {themeVars} from "@/styles/theme.css";

export const accordionContainer = style({
  // marginBottom: '10px',
  // border: '1px solid #ccc',
});

export const accordionButton = recipe({
 base: {
   display: 'flex',
   justifyContent: 'space-between',
   width: '100%',
   padding: '18px 12px',
   fontWeight: themeVars.fontSize["text-md"],
   fontSize: themeVars.fontWeight.bold,
   borderTop: `1px solid ${themeVars.borderColors.greyBB}`,
   cursor: 'pointer',
 },
  variants: {
   noChildren: {
     true: {
       cursor: 'default',
     }
   }
  }
});

export const accordionIcon = recipe({
  base: {
    transition: 'all .35s',
  },
  variants: {
    isOpen: {
      true: {
        transform: 'rotate(180deg)',
      }
    }
  }
});
export const accordionContent = style({
  padding: ' 12px 12px 18px',
  // backgroundColor: '#fafafa',
});

export const accordionMotionDiv = style({
  overflow: 'hidden',
});
import { style } from "@vanilla-extract/css";
import { recipe } from "@vanilla-extract/recipes";
import { themeVars } from "@/styles/theme.css";
import { defaultWidth } from "@/styles/common.css";

export const orderDetailContainer = style([defaultWidth, {
  borderBottom: `1px solid ${themeVars.borderColors.greyBB}`,
  marginBottom: '100px'
}]);

export const orderInfoContainer = style({
  display: 'flex',
  flexDirection: 'column',
  gap: '15px'
});

export const orderPriceBox = style({
  width: '100%',
  display: 'flex',
  justifyContent: 'space-between',
});

export const totalPrice = style({
  fontSize: themeVars.fontSize["text-xs"],
  color: themeVars.fontColors.grey89,
  paddingRight: '16px',
  position: 'relative',
  ':after': {
    content: '',
    display: 'block',
    width: '1px',
    height: '80%',
    background: themeVars.fontColors.grey89,
    position: 'absolute',
    right: '8px',
    top: '50%',
    transform: 'translateY(-50%)'
  }
});

export const deliveryButton = recipe({
 base: {
   paddingLeft: '16px',
   position: 'relative',
   ':after': {
     content: '',
     display: 'block',
     width: '1px',
     height: '80%',
     background: themeVars.fontColors.grey89,
     position: 'absolute',
     left: '8px',
     top: '50%',
     transform: 'translateY(-50%)'
   }
 },
  variants: {
    isButton: {
      true: {
        color: themeVars.colors.mainRed,
        textDecoration: 'underline',
      }
    }
  }
});

export const orderItemList = style({
  display: 'flex',
  flexDirection: 'column',
  gap: '15px',
  marginBottom: '23px',
});

export const orderItem = style({
  display: 'flex',
  gap: '17px',
  alignItems: 'center',
});

export const itemInfo = style({
  display: 'flex',
  flexDirection: 'column',
  gap: '10px',
  alignItems: 'flex-start',
  fontSize: themeVars.fontSize["text-sm"]
});

export const orderInfo = recipe({
  base: {
    display: 'flex',
    fontSize: themeVars.fontSize["text-sm"],
  },
  variants: {
    discountInfo: {
      true: {
        paddingLeft: '16px',
      }
    }
  }
});

export const infoTitle = style({
  width: '150px',
  textAlign: 'left',
});
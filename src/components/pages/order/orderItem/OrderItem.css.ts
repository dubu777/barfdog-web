import { themeVars } from "@/styles/theme.css";
import { style } from "@vanilla-extract/css";
import { recipe } from "@vanilla-extract/recipes";


export const orderInfoContainer = style({
  display: 'flex',
  flexDirection: 'column',
  width: '100%',
  gap: '15px',
  marginBottom: '20px',
})

export const gridContainer = style({
  display: "grid",
  gridTemplateColumns: "2fr 1fr 1fr 1fr 1fr",
  gap: "8px",
});

export const gridHeader = style({
  display: "contents", // 행(row) 배치 유지
  fontWeight: "bold",
  borderBottom: `1px solid ${themeVars.borderColors.grey79}`,
});

export const gridRow = style({
  display: "contents", // 행(row) 배치 유지
  borderBottom: `1px solid ${themeVars.borderColors.grey79}`,
});


export const couponButton = recipe({
  base: {
  padding: '2px 3px',
  borderRadius: '5px',
  fontSize: themeVars.fontSize["text-sm"],
  },
  variants: {
    isApplied: {
      true: {
        border: `1px solid ${themeVars.fontColors.mainRed}`,
        backgroundColor: themeVars.backgroundColors.white,
        color: themeVars.fontColors.mainRed,
      },
      false: {
        border: `1px solid ${themeVars.backgroundColors.grey63}`,
        backgroundColor: themeVars.backgroundColors.white,
        color: themeVars.fontColors.grey6E,
      },
    },

  },
})

export const subscriptionItemWrapper = style({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  width: '100%',
  gap: '10px',
  padding: '20px',
  border: `1px solid ${themeVars.borderColors.grey79}`,
  borderRadius: '20px',
})
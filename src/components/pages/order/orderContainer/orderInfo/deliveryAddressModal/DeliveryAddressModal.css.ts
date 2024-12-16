import { themeVars } from "@/styles/theme.css";
import { style } from "@vanilla-extract/css";
import { recipe } from "@vanilla-extract/recipes";

export const deliveryModalContainer = style({
  position: 'relative',
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  width: "100%",
  gap: "15px",
  padding: "10px",
});

export const deliveryModalContentWrapper = style({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  width: "100%",
  gap: "5px",
});

export const deliveryInfoBox = recipe({
  base: {
    position: "relative",
    width: "100%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    padding: "15px",
    gap: "15px",
  },
  variants: {
    isSelected: {
      true: {
        border: `1px solid ${themeVars.borderColors.mainRed}`,
      },
      false: {
        border: `1px solid ${themeVars.borderColors.grey79}`,
      },
    },
  },
  defaultVariants: {
    isSelected: false,
  },
});
export const deliveryInfoBoxWrapper = style({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  gap: "10px",
});

export const selectButton = style({
  position: "absolute",
  right: "10px",
  top: "8px",
  fontSize: themeVars.fontSize["text-sm"],
  width: '40px',
  height: '22px',
  border: `1px solid ${themeVars.borderColors.grey79}`,
  borderRadius: '4px',
});

export const updateButton = style({
  fontSize: themeVars.fontSize["text-sm"],
  width: '40px',
  height: '22px',
  border: `1px solid ${themeVars.borderColors.grey79}`,
  borderRadius: '4px',
});

export const updateButtonWrapper = style({
  display: 'flex',
  gap: '5px',
});

export const deliveryAddressWrapper = style({
  display: "flex",
  flexDirection: "column",
  alignItems: "flex-start",
  width: '100%',
});

export const deliveryRecipientWrapper = style({
  display: "flex",
});



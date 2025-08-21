import { style } from "@vanilla-extract/css";
import { themeVars } from "@/styles/theme.css";

export const tabBarContainerBase = style({
  width: "100%",
  display: "flex",
  alignItems: "center",
  position: "relative",
  zIndex: 1,
});

export const tabBarBase = style({
  position: "relative",
  zIndex: 1,
});

export const tabBarContainerAlign = {
  center: style({
    justifyContent: "center",
  }),
  spaceBetween: style({
    justifyContent: "space-between",
  }),
  flexStart: style({
    justifyContent: "flex-start",
  }),
};

export const tabBarContainerVariants = {
  text: style({
    backgroundColor: themeVars.colors.gray.gray0,
  }),
  segmentedButton: style({
    border: `1px solid ${themeVars.colors.red.red}`,
    borderRadius: "8px",
    overflow: "hidden",
  }),
  chips: style({
    gap: "8px",
  }),
};

export const tabBarBaseVariants = style({
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  cursor: "pointer",
  position: "relative",
  zIndex: 2,
});

export const tabBarVariants = {
  text: style({
    padding: "20px 16px 10px",
    backgroundColor: themeVars.colors.gray.gray0,
  }),
  segmentedButton: style({
    height: "42px",
    color: themeVars.colors.gray.gray300,
    borderRight: `1px solid ${themeVars.colors.gray.gray300}`,
    transition: "all .2s",
  }),
  chips: style({
    padding: "4px 12px",
    color: themeVars.colors.gray.gray700,
    backgroundColor: themeVars.colors.gray.gray100,
    borderRadius: "4px",
  }),
};

export const tabBarActiveVariants = {
  text: style({
    position: "relative",
    selectors: {
      "&::after": {
        content: "",
        display: "block",
        backgroundColor: themeVars.colors.gray.gray900,
        width: "20px",
        height: "2px",
        position: "absolute",
        left: "50%",
        bottom: 0,
        transform: "translateX(-50%)",
      },
    },
  }),
  segmentedButton: style({
    color: themeVars.colors.gray.gray0,
    background: themeVars.colors.red.red,
    border: 0,
  }),
  chips: style({
    color: themeVars.colors.gray.gray0,
    background: themeVars.colors.red.red,
  }),
};

export const tabBarSlider = style({
  padding: "20px !important",
});

export const tabBarSlideItem = style({
  width: "auto !important",
});

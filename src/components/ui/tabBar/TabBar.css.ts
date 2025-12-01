import { style } from "@vanilla-extract/css";
import { themeVars } from "@/styles/theme.css";
import { recipe } from "@vanilla-extract/recipes";

export const tabBarContainer = recipe({
  base: {},
  variants: {
    fullWidth: {
      true: {
        width: "100%",
      },
    },
  },
});

export const tabBarButtonWrapper = recipe({
  base: {
    display: "flex",
    alignItems: "center",
  },
  variants: {
    variant: {
      text: {
        backgroundColor: themeVars.colors.gray.gray0,
      },
      segmentedButton: {
        border: `1px solid ${themeVars.colors.red.red}`,
        borderRadius: "8px",
        overflow: "hidden",
      },
      chips: {
        gap: "8px",
      },
    },
    justify: {
      center: {
        justifyContent: "center",
      },
      between: {
        justifyContent: "space-between",
      },
      start: {
        justifyContent: "flex-start",
      },
    },
    borderRadius: {
      20: {
        borderTopLeftRadius: "20px",
        borderTopRightRadius: "20px",
      },
    },
  },
});

export const tabBarButton = recipe({
  base: {
    width: "100%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    cursor: "pointer",
    position: "relative",
    zIndex: 2,
    borderTopLeftRadius: "20px",
    borderTopRightRadius: "20px",
    transition: "all 0.2s",
  },
  variants: {
    variant: {
      text: {
        padding: "20px 16px 10px",
        backgroundColor: themeVars.colors.gray.gray0,
      },
      segmentedButton: {
        height: "42px",
        color: themeVars.colors.gray.gray300,
        borderRight: `1px solid ${themeVars.colors.gray.gray300}`,
      },
      chips: {
        padding: "4px 12px",
        color: themeVars.colors.gray.gray700,
        backgroundColor: themeVars.colors.gray.gray100,
        borderRadius: "4px",
      },
    },
    isActive: {
      true: {},
      false: {},
    },
  },
  compoundVariants: [
    {
      variants: {
        variant: "text",
        isActive: true,
      },
      style: {
        position: "relative",
        selectors: {
          "&::after": {
            content: "",
            display: "block",
            backgroundColor: themeVars.colors.gray.gray900,
            width: "20px",
            height: "2px",
            borderRadius: "1px",
            position: "absolute",
            left: "50%",
            bottom: 0,
            transform: "translateX(-50%)",
          },
        },
      },
    },
    {
      variants: {
        variant: "segmentedButton",
        isActive: true,
      },
      style: {
        color: themeVars.colors.gray.gray0,
        background: themeVars.colors.red.red,
        border: 0,
      },
    },
    {
      variants: {
        variant: "chips",
        isActive: true,
      },
      style: {
        color: themeVars.colors.gray.gray0,
        background: themeVars.colors.red.red,
      },
    },
  ],
});

export const tabBarChipsActive = recipe({
  base: {},
  variants: {
    color: {
      gray800: {
        background: themeVars.colors.gray.gray800,
        color: themeVars.colors.gray.gray0,
      },
      red: {
        background: themeVars.colors.red.red,
        color: themeVars.colors.gray.gray0,
      },
    },
  },
});

export const tabBarSlider = style({
  padding: "20px !important",
});

export const tabBarSlideItem = style({
  width: "auto !important",
});

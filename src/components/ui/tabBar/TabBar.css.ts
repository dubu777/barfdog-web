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
      true: {
        borderTopLeftRadius: "20px",
        borderTopRightRadius: "20px",
      },
      false: {},
    },
    fullWidth: {
      true: {
        width: "100%",
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
    transition: "all 0.2s",
  },
  variants: {
    variant: {
      text: {
        padding: "20px 16px 10px",
        backgroundColor: themeVars.colors.gray.gray0,
        fontWeight: themeVars.typography.label.label1.fontWeight,
        fontSize: themeVars.typography.label.label1.fontSize,
        lineHeight: themeVars.typography.label.label1.lineHeight,
        letterSpacing: themeVars.typography.label.label1.letterSpacing,
        color: themeVars.colors.gray.gray300,
      },
      segmentedButton: {
        height: "42px",
        fontWeight: themeVars.typography.headline.headline3.fontWeight,
        fontSize: themeVars.typography.headline.headline3.fontSize,
        lineHeight: themeVars.typography.headline.headline3.lineHeight,
        letterSpacing: themeVars.typography.headline.headline3.letterSpacing,
        color: themeVars.colors.gray.gray300,
        borderRight: `1px solid ${themeVars.colors.gray.gray300}`,
      },
      chips: {
        padding: "4px 12px",
        fontWeight: themeVars.typography.headline.headline3.fontWeight,
        fontSize: themeVars.typography.headline.headline3.fontSize,
        lineHeight: themeVars.typography.headline.headline3.lineHeight,
        letterSpacing: themeVars.typography.headline.headline3.letterSpacing,
        color: themeVars.colors.gray.gray700,
        backgroundColor: themeVars.colors.gray.gray100,
        borderRadius: "4px",
      },
    },
    borderRadius: {
      true: {
        borderTopLeftRadius: "20px",
        borderTopRightRadius: "20px",
      },
      false: {},
    },
    isActive: {
      true: {},
      false: {},
    },
    chipsActiveColor: {
      red: {},
      gray800: {},
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
        color: themeVars.colors.gray.gray900,
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
        variant: "text",
        isActive: false,
      },
      style: {
        position: "relative",
        selectors: {
          "&:hover": {
            color: themeVars.colors.gray.gray400,
          },
          "&:hover:after": {
            content: "",
            display: "block",
            width: "20px",
            height: "2px",
            borderRadius: "10px",
            backgroundColor: themeVars.colors.gray.gray400,
            position: "absolute",
            bottom: 0,
            left: "50%",
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
        backgroundColor: themeVars.colors.red.red,
        border: 0,
      },
    },
    {
      variants: {
        variant: "segmentedButton",
        isActive: false,
      },
      style: {
        selectors: {
          "&:hover": {
            color: themeVars.colors.gray.gray900,
          },
        },
      },
    },

    {
      variants: {
        variant: "chips",
        isActive: true,
        chipsActiveColor: "red",
      },
      style: {
        color: themeVars.colors.gray.gray0,
        backgroundColor: themeVars.colors.red.red,
      },
    },
    {
      variants: {
        variant: "chips",
        isActive: true,
        chipsActiveColor: "gray800",
      },
      style: {
        color: themeVars.colors.gray.gray0,
        backgroundColor: themeVars.colors.gray.gray800,
      },
    },
    {
      variants: {
        variant: "chips",
        isActive: false,
      },
      style: {
        selectors: {
          "&:hover": {
            backgroundColor: themeVars.colors.gray.gray200,
          },
        },
      },
    },
  ],
});

export const tabBarSlider = style({
  padding: "20px !important",
});

export const tabBarSlideItem = style({
  width: "auto !important",
});

import { style, globalStyle } from "@vanilla-extract/css";
import { themeVars } from "@/styles/theme.css";
import { recipe } from "@vanilla-extract/recipes";

export const selectBoxContainer = recipe({
  base: {
    display: "flex",
    justifyContent: "flex-end",
    alignItems: "center",
    zIndex: 300,
    position: "relative",
  },
  variants: {
    fullWidth: {
      true: {
        width: "100%",
      },
    },
  },
});

export const selectInputWrapper = style({
  position: "relative",
  display: "flex",
  justifyContent: "space-between",
  width: "100%",
});

export const arrowIcon = recipe({
  base: {
    cursor: "pointer",
    position: "absolute",
    top: "50%",
    right: "20px",
    transform: "translateY(-50%)",
    transition: 'all .35s',
  },
  variants: {
    isOpen: {
      true: {
        transform: "rotate(180deg) translateY(50%)",
      }
    }
  }
});

export const inputField = recipe({
  base: {
    fontSize: themeVars.fontSize["text-md"],
    textAlign: "center",
    width: "100%",
    height: "100%",
    outline: "0",
    padding: "12px 20px",
    minHeight: "48px",
    borderRadius: "8px",
    border: `1px solid ${themeVars.colors.gray.gray200}`,
    cursor: "pointer",
    color: themeVars.colors.gray.gray500,
    ":disabled": {
      cursor: "auto",
    },
  },
  variants: {
    forFilter: {
      true: {
        border: 0,
        borderRadius: 0,
        height: "auto",
        minHeight: "unset",
        padding: 0,
        paddingRight: "15px",
        textAlign: "right",
      },
    },
    placeholderPosition: {
      left: {
        textAlign: "left",
        ":placeholder": {
          textAlign: "left",
        },
      },
    },
  },
});

export const frontWord = style({
  fontSize: themeVars.fontSize["text-md"],
  marginRight: "13px",
  minWidth: "60px",
});

export const optionsContainer = style({
  position: "absolute",
  left: "0",
  top: "100%",
  width: "100%",
  minHeight: "48px",
  zIndex: 2,
  borderRadius: "0.5rem",
  fontSize: themeVars.fontSize["text-md"],
  boxShadow: themeVars.shadow.strong,
  backgroundColor: themeVars.colors.gray.gray0,
  border: `1px solid ${themeVars.colors.gray.gray300}`,
});

export const optionsWrapper = style({
  height: '100%',
  overflowY: "scroll",
});

globalStyle(`${optionsWrapper}::-webkit-scrollbar`, {
  display: "none",
});

export const option = recipe({
  base: {
    transitionTimingFunction: "ease",
    transitionDuration: "0.3s",
    transitionProperty: "background, color",
    padding: '12px 20px',
    height: "48px",
    display: "flex",
    alignItems: "center",
    cursor: "pointer",
    selectors: {
      '&[data-selected="true"]': {
        backgroundColor: themeVars.colors.gray.gray200,
      },
      "&:hover": {
        backgroundColor: themeVars.colors.gray.gray50,
      },
    },
  },
  variants: {
    optionSize: {
      sm: {
        fontSize: themeVars.fontSize["text-sm"],
      },
    },
  },
});

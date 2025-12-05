import { style } from "@vanilla-extract/css";
import { themeVars } from "@/styles/theme.css";

export const circleProgressBox = style({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  position: "relative",
});

export const svg = style({
  transform: "rotate(-90deg)",
  position: "relative",
  zIndex: 0,
});

export const circleBackground = style({
  fill: "none",
  stroke: themeVars.colors.gray.gray300,
});

export const circleProgressBase = style({
  fill: "none",
  strokeLinecap: "round",
  transition: "stroke 0.25s ease-out",
});

export const circleProgressColor = {
  blue400: style({
    stroke: themeVars.colors.blue.blue400,
  }),
  green400: style({
    stroke: themeVars.colors.green.green400,
  }),
  yellow400: style({
    stroke: themeVars.colors.yellow.yellow400,
  }),
  pastelRed: style({
    stroke: themeVars.colors.red.pastelRed,
  }),
};

export const centerContent = style({
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  zIndex: 1,
  width: "199px !important",
  height: "199px !important",
  borderRadius: "50%",
  background: themeVars.colors.gray.gray0,
  boxShadow: "-1px -1px 2px rgba(255, 255, 255, 0.08) inset",
  filter:
    "drop-shadow(0px 2px 10px rgba(0, 0, 0, 0.10)) drop-shadow(0px 1px 4px rgba(0, 0, 0, 0.08))",
});

const label = style({
  position: "absolute",
  zIndex: 2,
});

export const leftLabel = style([
  label,
  {
    left: "32px",
    bottom: "-8px",
  },
]);

export const rightLabel = style([
  label,
  {
    right: "22px",
    bottom: "-8px",
  },
]);

export const centerLabel = style([
  label,
  {
    bottom: "-8px",
  },
]);

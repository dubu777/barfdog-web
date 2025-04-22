import { themeVars } from "@/styles/theme.css";
export {COLORS}

type colors = "white" | "red" | "pastelRed" | "gray900" | "gray800" | "gray700" | "gray600" | "gray500" | "gray300" | "gray200" | "gray50" |  "gray0" | "blue500";

const COLORS: Record<colors, string> = {
  white: themeVars.colors.gray.gray0,
  red: themeVars.colors.red.red,
  pastelRed: themeVars.colors.red.pastelRed,
  gray900: themeVars.colors.gray.gray900,
  gray800: themeVars.colors.gray.gray800,
  gray700: themeVars.colors.gray.gray700,
  gray600: themeVars.colors.gray.gray600,
  gray500: themeVars.colors.gray.gray500,
  gray300: themeVars.colors.gray.gray300,
  gray200: themeVars.colors.gray.gray200,
  gray50: themeVars.colors.gray.gray50,
  gray0: themeVars.colors.gray.gray0,
  blue500: themeVars.colors.blue.blue500,
} as const;

export const CHIPS_COLORS = {
  red: themeVars.colors.red.red,
  lightPink: themeVars.colors.red.lightPink,
  gray800: themeVars.colors.gray.gray800,
  gray700: themeVars.colors.gray.gray700,
} as const;

export const MAIN_BACKGROUND_COLORS = {
  pinkWhite: themeVars.colors.red.pinkWhite,
  yellow: themeVars.colors.yellow.yellow50,
  gray50: themeVars.colors.gray.gray50,
  gray200: themeVars.colors.gray.gray200,
  white: themeVars.colors.gray.gray0,
} as const;

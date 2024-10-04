import { createTheme } from "@vanilla-extract/css";

// 예시 코드 - 추후 수정 
export const [themeClass, themeVars] = createTheme({
  colors: {
    white: '#ffffff',
    black: '#000000',
  },
  fontSize: {
    xs: '0.6rem',
    s: '0.875rem',
    m: '1rem',
    l: '1.25rem',
    xl: '1.5rem',
    xxl: '1.75rem',
    heading: '2rem',
  },
});
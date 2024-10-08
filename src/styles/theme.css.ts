import { createTheme } from "@vanilla-extract/css";

// 예시 코드 - 추후 수정 
export const [themeClass, themeVars] = createTheme({
  fontSize: {
    xs: '0.6rem',
    s: '0.875rem',
    m: '1rem',
    l: '1.25rem',
    xl: '1.5rem',
    xxl: '1.75rem',
    heading: '2rem',
  },
  colors: {
    white: '#ffffff',
    black: '#000000',
    mainRed: '#BE1A21',
    red: '#CA1010',
  },
  fonColors: {
    yellow: '#faff00',
    darkRed: '#AF3D3D',
    black: '#0E1108',
    greyA8: '#A8A8A8',
    grey97: '#979797',
    grey89: '#898989',
    grey5A: '#5A5A5A',
    grey4F: '#4F4F4F',
    grey4a: '#4A4A4A',
    grey38: '#383838',
  },
  backgroundColors: {
    gradientPink: 'linear-gradient(146deg, rgba(255,255,255,0.1) 0%, rgba(202,16,16,0.2) 100%)',
    pinkF1: '#FFF1F1',
    pinkFa: '#FFFAFA',
    pinkFF: '#FFE0E1',
    greyF7: '#F7F7F7',
    greyF2: '#F2F2F2',
    grey99: '#999999',
    grey7E: '#7E7E7E',
    grey63: '#636363',
  },
  borderColors: {
    redB8: '#B8363B',
    redAF: '#AF3D3D',
    greyAC: '#ACABAB',
    grey99: '#999999',
    grey85: '#858585',
    grey7E: '#7E7E7E',
  },
  buttonColors: {
    disabledRed: 'rgba(194, 40, 47, .6)',
    greyB9: '#B9B9B9',
    greyAC: '#ACABAB',
    grey99: '#999999',
    grey7E: '#7E7E7E',
  }
});
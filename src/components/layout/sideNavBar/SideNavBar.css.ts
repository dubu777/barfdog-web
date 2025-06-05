import { style } from "@vanilla-extract/css";
import { recipe } from "@vanilla-extract/recipes";
import { themeVars } from "@/styles/theme.css";

export const sideNavBarWrapper = style({
  position: 'fixed',
  top: 0,
  width: '100%',
  height: '100vh',
  zIndex: 400,
  display: 'flex',
  justifyContent: 'flex-end',
  margin: '0 auto',
  // overflow: 'hidden'
})

export const sideNavBarContainer = style({
  width: '70%',
  height: '100%',
  backgroundColor: themeVars.colors.gray.gray0,
  position: 'relative',
  padding: '100px 18px 36px',
})

export const closeBtn = style({
  position: 'absolute',
  right: 20,
  top: 20,
  cursor: 'pointer',
})

export const background = style({
  backgroundColor: themeVars.backgroundColors.darkOpacity,
  width: '100%',
  height: '100%',
  position: 'absolute',
})

export const navWrapper = style({
  borderTop: `1px solid ${themeVars.borderColors.black50}`,
  borderBottom: `1px solid ${themeVars.borderColors.black50}`
})

export const navContainer = style({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'flex-start',
  color: themeVars.fontColors.grey4a,
})

export const navTitle = style({
  width: '100%',
  fontSize: themeVars.fontSize["text-xl"],
  fontWeight: themeVars.fontWeight.bold,
  padding: '10px 0 10px 19px',
  textAlign: 'left',
  borderBottom: ''
})

export const navItems = style({
  width: '100%',
  fontSize: themeVars.fontSize["text-md"],
  textAlign: 'left',
  borderTop: `0.35px solid ${themeVars.borderColors.greyAC}`,
  borderBottom: `0.35px solid ${themeVars.borderColors.greyAC}`,
  padding: '21px 0 21px 19px',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'flex-start',
  gap: '21px',
})

export const navItem = style({
  width: '100%',
})

export const navItemLink = style({
  width: '100%',
  textAlign: 'left',
  cursor: 'pointer',
})

export const subItemsTitle = style({
  width: '100%',
  fontSize: themeVars.fontSize["text-md"],
  textAlign: 'left',
  display: 'flex',
  justifyContent: 'space-between',
  cursor: 'pointer',
  paddingRight: '8px'
})

export const arrowIcon = recipe({
  base: {
    transition: 'transform .35s'
  },
  variants: {
    isOpen: {
      false: {
        transform: 'rotate(180deg)'
      }
    }
  }
})

export const subItemsContainer = style({
  width: '100%',
  display: 'flex',
  flexWrap: 'wrap',
  padding: '18px',
  backgroundColor: themeVars.backgroundColors.greyF7,
  marginTop: '14px',
  overflow: 'hidden',
})

export const subItem = style({
  width: '50%',
  marginBottom: '20px',
  fontSize: themeVars.fontSize["text-sm"],
  selectors: {
    '&:nth-child(3), &:nth-child(4)': {
      marginBottom: 0,
    }
  }
})

export const snsContainer = style({
  marginTop: '37px',
  paddingLeft: '19px',
  display: 'flex',
  alignItems: 'center',
  gap: '17px',
})

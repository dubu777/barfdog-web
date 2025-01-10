import { style } from "@vanilla-extract/css";
import { themeVars } from "@/styles/theme.css";

export const storeFilterContainer = style({
  padding: '0 10px'
})

export const storeFilterTop = style({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  marginBottom: '20px'
})

export const sortByFilter = style({
  width: 'auto',
  maxWidth: '100px',
  marginTop: 'auto',
});

export const itemTypeFilter = style({
  display: 'flex',
  justifyContent: 'space-between',
})

export const itemType = style({
  width: 'calc(100% / 4)',
  cursor: 'pointer',
  position: 'relative',
  borderRight: `1px solid ${themeVars.borderColors.greyBB}`,
  ':last-child': {
    borderRight: 0
  }
})

export const itemTypeText = style({
  cursor: 'pointer',
})
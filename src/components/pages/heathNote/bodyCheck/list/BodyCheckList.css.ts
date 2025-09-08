import { style } from "@vanilla-extract/css";
import { themeVars } from "@/styles/theme.css";

export const bodyCheckListContainer = style({
  backgroundColor: themeVars.colors.gray.gray0,
  minHeight: 'calc(100vh - 52px)',
});

export const bodyCheckListBox = style({
  borderTopLeftRadius: '16px',
  borderTopRightRadius: '16px',
  overflow: 'hidden',
});

export const bodyCheckListTab = style({
  borderBottom: `1px solid ${themeVars.colors.gray.gray50}`,
  boxShadow: themeVars.shadow.light,
})

export const bodyCheckListTitle = style({
  padding: '20px 20px 0',
});

export const bodyCheckList = style({
  display: 'flex',
  flexDirection: 'column',
  margin: '20px 0 0',
  paddingBottom: '40px'
});

export const bodyCheckListItem = style({
  width: '100%',
  display: 'flex',
  flexDirection: 'column',
  gap: '12px',
  alignItems: 'flex-start',
});

export const bodyCheckListItemCard = style({
  borderRadius: 'none',
});

export const bodyCheckListItemTop = style({
  display: 'flex',
  flexDirection: 'column',
  gap: '8px',
});

export const bodyCheckListItemTitle = style({
  display: 'flex',
  alignItems: 'center',
  gap: '8px',
});

export const bodyCheckEmptyList = style({
  padding: "55px 0",
});

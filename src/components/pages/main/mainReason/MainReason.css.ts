import {style} from "@vanilla-extract/css";
import {themeVars} from "@/styles/theme.css";

export const flexColumn = style({ display: 'flex', flexDirection: 'column', justifyContent: 'center' });
export const flexRow = style({ display: 'flex', flexDirection: 'row', alignItems: 'center' });

export const mainReasonWrapper = style([flexColumn, {
  padding: '73px 59px 81px',
  display: 'flex',
  flexDirection: 'column',
  whiteSpace: 'pre',
  textAlign: 'left',
  '@media': {
    'screen and (max-width: 600px)': {
      padding: '73px 29px 70px',
    }
  },
}])

export const mainReasonListItem = style([flexRow, {
  justifyContent: 'space-between',
  marginBottom: '21px',
  ':last-child': {
    marginBottom: 0,
  },
}])

export const mainReasonItemInfo = style([flexColumn, {
  width: '70%',
}])

export const mainReasonImage = style([flexColumn, {
  objectFit: 'contain'
}])

export const mainReasonLink = style([flexRow, {
  objectFit: 'contain',
  textAlign: 'left',
  fontSize: themeVars.fontSize["text-xs"],
  fontWeight: themeVars.fontWeight.bold,
  color: themeVars.colors.mainRed,
}])

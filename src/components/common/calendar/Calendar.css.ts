import { globalStyle, style } from "@vanilla-extract/css";
import { themeVars } from "@/styles/theme.css";

export const calendarContainer = style({
  width: '100%',
  maxWidth: '300px',
  margin: '0 auto 60px',
  backgroundColor: 'white',
  borderRadius: '8px',
  border: 0,
  boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
  padding: '10px 10px',
  display: 'flex',
  gap: '16px',
  flexDirection: 'column',

});

export const calendarTile = style({
  width: '40px',
  height: '40px',
  padding: '10px',
  marginBottom: '5px',
  cursor: 'default !important',
  selectors: {
    '&:hover': {
      cursor: 'default !important',
    },
    '&.react-calendar__tile--active, &.react-calendar__tile--hasActive': {
      background: `${themeVars.colors.mainRed} !important`,
      color: `${themeVars.colors.white} !important`,
    },
    '&.react-calendar__tile--rangeStart, &.react-calendar__tile--rangeEnd': {
      background: `${themeVars.backgroundColors.pinkFF} !important`,
      color: `${themeVars.colors.black} !important`,
    },
  },
});

export const calendarTileNow = style({
  background: 'transparent !important',
  border: `1px solid ${themeVars.borderColors.grey79} !important`,
  borderRadius: '50%',
  cursor: 'default !important',
  marginBottom: '5px',
  selectors: {
    '&:hover': {
      background: `${themeVars.colors.mainRed} !important`,
      color: `${themeVars.colors.white} !important`,
      cursor: 'default',
    },
  },
  fontWeight: 'bold',
});

globalStyle('.react-calendar__navigation', {
  margin: '0 !important'
});

globalStyle('.react-calendar__navigation button', {
  cursor: 'default !important'
});

globalStyle('.react-calendar__month-view__days', {
  marginTop: '1rem !important'
});

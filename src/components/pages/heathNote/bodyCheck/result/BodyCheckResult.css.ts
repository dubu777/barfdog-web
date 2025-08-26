import { themeVars } from "@/styles/theme.css";
import { style } from "@vanilla-extract/css";

export const bodyCheckChipsStyle = style({
  margin: "20px 0 12px 0",
});

export const bodyCheckDiseaseList = style({
  width: '100%',
  padding: '20px 0 0',
  display: 'flex',
  flexDirection: 'column',
  gap: '18px',
});

export const phaseTextStyle = style({
  whiteSpace: "nowrap",
});

export const freshGutInfoBox = style({
  display: "flex",
  flexDirection: "column",
  gap: "12px",
  alignItems: "start",
  border: `1px dashed ${themeVars.colors.red.red}`,
  borderRadius: "8px",
  backgroundColor: themeVars.colors.gray.gray0,
  padding: "12px",
  width: "100%",
});

export const freshGutImageBox = style({
  borderRadius: '20px',
  overflow: 'hidden',
  position: 'relative',
});

export const freshGutImage = style({
  width: "100%",
  objectFit: "cover",
});

export const freshGutInfo = style({
  width: '100%',
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  gap: '16px',
});

export const freshGutLogoImage = style({
  width: "92px",
  height: "auto",
  aspectRatio: "23/4",
  objectFit: "cover",
});

export const freshGutTextBox = style({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',

});

export const freshGutSubText = style({
  padding: '2px 8px',
  backgroundColor: themeVars.colors.gray.gray900,
});

export const freshGutText = style({
  margin: '8px 0 4px'
});

export const freshGutButton = style({
  marginTop: '6px',
});

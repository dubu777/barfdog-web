import { themeVars } from "@/styles/theme.css";
import { style } from "@vanilla-extract/css";

export const recipeCardContainer = style({
  position: 'relative',
  width: "170px",
  backgroundColor: themeVars.backgroundColors.white,
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  borderRadius: "10px",
  boxShadow: "2px 4px 12px #00000014",
  cursor: "pointer",
});

export const recipeImageWrapper = style({
  width: "100%",
  height: "149px",
  backgroundColor: "#FDF2E4",
  display: "flex",
  justifyContent: "center",
  alignContent: "center",
  borderTopLeftRadius: "10px",
  borderTopRightRadius: "10px",
  paddingTop: "5px",
});

export const recipeDescriptionWrapper = style({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  width: "100%",
  gap: "7px",
  padding: "10px 12px",
});

export const recipeTitleWrapper = style({
  textAlign: "center",
  width: "100%",
});

export const recipeDescripionBox = style({
  display: "flex",
  flexDirection: "column",
  alignItems: "flex-start",
  width: "100%",
});

export const detailButton = style({
  height: "20px",
  padding: "0 10px",
  color: themeVars.fontColors.white,
  fontSize: themeVars.fontSize["text-2xs"],
  borderRadius: "10px",
  lineHeight: "1",
  backgroundColor: "#F19B62",
});

// export const detailButton = recipe({
//   base: {
//     height: "20px",
//     padding: "0 10px",

//     color: themeVars.fontColors.white,
//     fontSize: themeVars.fontSize["text-2xs"],
//     borderRadius: '10px',
//     lineHeight: '1',
//   },
//   variants: {
//     type: {
//       'single': {
//         backgroundColor: '#F19B62',
//       },
//       'double': {
//         backgroundColor: '#F19B62',
//       },
//     }
//   }
// });

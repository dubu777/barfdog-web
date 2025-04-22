import { themeVars } from "@/styles/theme.css";
import { style } from "@vanilla-extract/css";
import { recipe } from "@vanilla-extract/recipes";

export const recipeCardContainer = recipe({
  base: {
    position: 'relative',
    width: "100%",
    backgroundColor: themeVars.colors.gray.gray0,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    borderRadius: "12px",
    padding: '16px',
    cursor: "pointer",
  },
  variants: {
    isSelected: {
      true: 
      {
        outline: `1px solid ${themeVars.colors.red.red}`,
      },
      false: {
        outline: '1px solid transparent',
      }
    }
  },
  defaultVariants: {
    isSelected: false
  }

});



export const recipeCardTitleWrapper = style({
  width: "100%",
  display: "flex",
  justifyContent: 'space-between',
});

export const recipeCardContentWrapper = style({
  width: "100%",
  display: "flex",
  justifyContent: 'space-between',
});

export const recipeCardLeftWrapper = style({
  width: "100%",
  display: "flex",
  flexDirection: 'column',
  alignItems: 'flex-start',
  gap: "12px",
  marginTop: '18px',
});

export const ingredientsWrapper = style({
  width: "100%",
  display: "flex",
  justifyContent: 'flex-start',
  gap: '8px',
});

export const recipeCardBadgeWrapper = style({
  width: "100%",
  display: "flex",
  justifyContent: 'flex-start',
  gap: '4px',
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

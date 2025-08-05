import { themeVars } from "@/styles/theme.css";
import { style } from "@vanilla-extract/css";

export const healthTipGridWrapper = style({
  display: "grid",
  // 2열짜리: 첫 컬럼은 auto(1번 박스), 두 번째 컬럼은 나머지(2,3번 박스)
  gridTemplateColumns: "auto 1fr",
  // 2행: 첫째 행에 1번·2번, 둘째 행에 3번만
  gridTemplateRows: "auto auto",
  // 영역 이름 지정
  gridTemplateAreas: [`"icon title"`, `".    description"`].join("\n"),
  gap: "4px",
});

export const iconGrid = style({ gridArea: "icon" });
export const titleGrid = style({ gridArea: "title", alignSelf: "center" });
export const descriptionGrid = style({ gridArea: "description" });

export const ingredientSwiper = style({
  width: "100%",
  paddingLeft: 0,
  paddingRight: 0,
});

export const ingredientSlide = style({
  width: "auto !important",
});

export const ingredientItem = style({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  gap: "4px",
});

export const ingredientIcon = style({
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  width: "60px",
  height: "60px",
  border: `1px solid ${themeVars.colors.gray.gray200}`,
  borderRadius: "8px",
  backgroundColor: themeVars.colors.gray.gray50,
  padding: "4px",
});

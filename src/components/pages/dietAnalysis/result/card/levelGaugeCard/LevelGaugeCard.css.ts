import { themeVars } from "@/styles/theme.css";
import { style } from "@vanilla-extract/css";
import { recipe } from "@vanilla-extract/recipes";

export const resultCardStyle = style({
  border: `1px solid ${themeVars.colors.gray.gray200}`,
});

export const gauge = style({
  display: "flex", // 각 막대 균등 분할
  width: "100%",
  border: `1px solid ${themeVars.colors.gray.gray500}`, // 외곽 테두리
  borderRadius: "12px", // 모서리 둥글게
  overflow: "hidden",
});

export const gaugeBar = recipe({
  base: {
    flex: 1,
    width: "100%",
    height: "12px",
    borderRight: `1px solid ${themeVars.colors.gray.gray500}`, // 막대 사이 테두리
    selectors: {
      "&:last-child": {
        borderRight: "none", // 마지막 막대엔 우측 테두리 제거
      },
    },
  },

  variants: {
    /** 게이지가 채워졌는지 여부 */
    filled: {
      on: {},
      off: { background: themeVars.colors.gray.gray50 },
    },

    color: {
      blue: { background: themeVars.colors.blue.blue200 },
      yellow: { background: themeVars.colors.yellow.yellow400 },
    },
  },

  /** filled=off 이면 어떤 색이든 무조건 회색 → 회색으로 덮어쓰기 */
  compoundVariants: [
    {
      variants: { filled: "off", color: "blue" },
      style: { background: themeVars.colors.gray.gray50 },
    },
    {
      variants: { filled: "off", color: "yellow" },
      style: { background: themeVars.colors.gray.gray50 },
    },
  ],

  defaultVariants: {
    filled: "off",
    color: "blue",
  },
});

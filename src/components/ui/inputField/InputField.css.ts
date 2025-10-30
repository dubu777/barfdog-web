import { style } from "@vanilla-extract/css";
import { themeVars } from "@/styles/theme.css";
import { recipe } from "@vanilla-extract/recipes";

/** 바깥 컨테이너(라벨/메시지 포함) */
export const container = recipe({
  base: {
    display: "flex",
    flexDirection: "column",
    rowGap: "8px",
  },
  variants: {
    fullWidth: {
      true: { width: "100%" },
      false: {},
    },
  },
  defaultVariants: {
    fullWidth: true,
  },
});

/** 인풋 + 컨펌버튼 정렬) */
export const wrapper = recipe({
  base: {
    display: "flex",
    alignItems: "center",
    columnGap: "8px",
  },
  variants: {
    fullWidth: {
      true: { width: "100%" },
      false: {},
    },
  },
  defaultVariants: {
    fullWidth: true,
  },
});

/** 인풋 외곽 박스 (prefix/suffix 버튼 포함) */
export const field = recipe({
  base: {
    display: "flex",
    alignItems: "center",
    height: "48px",
    textAlign: "left",
  },
  variants: {
    variant: {
      box: {
        width: "100%",
        padding: "12px 20px",
        color: themeVars.colors.gray.gray900,
        borderRadius: "8px",
        border: `1px solid ${themeVars.colors.gray.gray300}`,
        backgroundColor: themeVars.colors.gray.gray0,
        selectors: {
          "&::placeholder": { color: themeVars.colors.gray.gray300 },
        },
      },
      line: {
        width: "100%",
        padding: "12px 4px",
        color: themeVars.colors.gray.gray900,
        borderBottom: `1px solid ${themeVars.colors.gray.gray500}`,
        backgroundColor: "transparent",
      },
    },
    disabled: {
      true: {},
      false: {},
    },
    error: {
      true: {},
      false: {},
    },
    /** 우측 confirm 버튼 존재 시 인풋 영역이 늘어나도록 */
    hasConfirm: {
      true: { flex: "1 0 0" },
      false: {},
    },
  },
  compoundVariants: [
    // disabled
    {
      variants: { variant: "box", disabled: true },
      style: {
        backgroundColor: themeVars.colors.gray.gray200,
      },
    },
    {
      variants: { variant: "line", disabled: true },
      style: {
        borderBottomColor: themeVars.colors.gray.gray400,
      },
    },

    // error
    {
      variants: { variant: "box", error: true },
      style: {
        borderColor: themeVars.colors.red.red,
      },
    },
    {
      variants: { variant: "line", error: true },
      style: {
        borderBottomColor: themeVars.colors.red.red,
      },
    },
  ],
  defaultVariants: {
    variant: "box",
    disabled: false,
    error: false,
    hasConfirm: false,
  },
});

/** 실제 input */
export const input = style({
  width: "100%",
  fontSize: "16px",
  fontWeight: 500,
  lineHeight: "148%",
  letterSpacing: "-0.4px",
  textAlign: "left",
  background: "transparent",
  selectors: {
    "&::placeholder": {
      color: themeVars.colors.gray.gray300,
    },
    '&[type="button"]': {
      cursor: "pointer",
      color: themeVars.colors.gray.gray300,
    },
    "&:disabled": {
      color: themeVars.colors.gray.gray400,
    },
  },
});

/** prefix(검색 등) 버튼 */
export const prefixButton = style({
  width: 24,
  height: 24,
  marginRight: 12,
});

/** suffix 버튼 그룹 (마스킹/클리어 등) */
export const suffixGroup = style({
  display: "flex",
  columnGap: "12px",
});

/** suffix 기본 버튼 */
export const suffixButton = style({
  width: 24,
  height: 24,
});

/** 단위 텍스트 */
export const unit = style({
  display: "flex",
  marginLeft: 8,
});

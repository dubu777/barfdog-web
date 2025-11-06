import { themeVars } from "@/styles/theme.css";
import { recipe } from "@vanilla-extract/recipes";

export const snsButtonBox = recipe({
  base: {
    height: "52px",
    width: "100%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    cursor: "pointer",
    gap: 16,
    borderRadius: "4px",
  },
  variants: {
    provider: {
      kakao: {
        backgroundColor: themeVars.colors.kakao.kakaoBackground,
      },
      naver: {
        backgroundColor: themeVars.colors.naver.naverBackground,
      },
    },
  },
});

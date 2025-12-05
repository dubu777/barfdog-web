import { themeVars } from "@/styles/theme.css";
import { globalStyle } from "@vanilla-extract/css";

globalStyle("*", {
  boxSizing: "border-box",
});

globalStyle("html, body", {
  margin: 0,
  padding: 0,
  width: "100%",
  height: "100%",
  scrollbarGutter: "stable",
});

globalStyle("body", {
  background: themeVars.colors.gray.gray100,
  overscrollBehavior: "none",
});

globalStyle("button", {
  cursor: "pointer",
});

globalStyle(".swiper-pagination-bullet", {
  width: "6px !important",
  height: "6px !important",
  background: `${themeVars.colors.gray.gray300} !important`,
  opacity: "1 !important",
});

globalStyle(".swiper-pagination-bullet-active", {
  background: `${themeVars.colors.gray.gray700} !important`,
});

globalStyle(".swiper-button-prev, .swiper-button-next", {
  color: `${themeVars.colors.gray.gray0} !important`,
});

globalStyle(".swiper-button-next:after, .swiper-button-prev:after", {
  fontSize: "30px !important",
});

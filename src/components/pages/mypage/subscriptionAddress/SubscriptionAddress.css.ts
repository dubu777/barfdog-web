import { style } from "@vanilla-extract/css";
import { defaultWidth } from "@/styles/common.css";

export const addressContainer = style([defaultWidth, {
  overflow: 'hidden',
  position: 'relative',
  height: 'auto',
}]);

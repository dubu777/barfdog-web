import { style } from "@vanilla-extract/css";
import { defaultWidth } from "@/styles/common.css";

export const filterContainer = style([defaultWidth, {
  display: 'flex',
  gap: '11px',
  padding: '0 20px',
  marginBottom: '37px',
}]);
import {style} from "@vanilla-extract/css";
import {commonLayoutStyle} from "@/styles/common.css";

export const overlayStyle = style([commonLayoutStyle, {
  height: '100vh',
  position: 'fixed',
  top: 0,
  left: '50%',
  transform: 'translateX(-50%)',
  backgroundColor: 'rgba(0, 0, 0, 0.5)',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  zIndex: 1000,
}]);

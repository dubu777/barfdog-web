import { keyframes, style } from "@vanilla-extract/css";

const rotation = keyframes({
	'0%': { transform: 'rotate(0deg)' },
	'100%': { transform: 'rotate(360deg)' }
});

export const loader = style({
	width: '48px',
	height: '48px',
	border: '5px solid #FFF',
	borderBottomColor: '#FF3D00',
	borderRadius: '50%',
	display: 'inline-block',
	boxSizing: 'border-box',
	animation: `${rotation} 1s linear infinite`,
})

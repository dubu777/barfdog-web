import { style } from "@vanilla-extract/css";

export const recipesBackground = style({
  padding: '60px 20px',
  height: '228px',
  background: `linear-gradient(180deg, rgba(0, 0, 0, 0.24) 0%, rgba(0, 0, 0, 0.30) 50%, rgba(0, 0, 0, 0.24) 100%), url('/images/recipes/background.jpg') lightgray 50% / cover no-repeat`,
  backdropFilter: 'blur(2px)',
});

export const recipesBackgroundContent = style({
  width: '100%',
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  gap: 8,
  zIndex: 100,
});
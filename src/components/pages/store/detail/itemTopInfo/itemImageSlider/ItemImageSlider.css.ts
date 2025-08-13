import { style } from "@vanilla-extract/css";

export const itemImageList = style({
  position: 'relative',
  width: '100%',
  aspectRatio: '1 / 1',
})

export const imageCount = style({
  position: 'absolute',
  top: '20px',
  left: '20px',
  zIndex: 200,
})

export const imageSlideBox = style({
  height: '100%',
})

export const imageSlide = style({
  width: '100%',
  height: '100%',
  objectFit: 'cover',
  objectPosition: 'center'
})

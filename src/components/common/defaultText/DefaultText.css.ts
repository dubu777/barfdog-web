import { themeVars } from '@/styles/theme.css';
import { style } from '@vanilla-extract/css';

// Typography styles
export const textStyles = {
  display1: style({
    fontWeight: themeVars.typography.display.display1.fontWeight,
    fontSize: themeVars.typography.display.display1.fontSize,
    lineHeight: themeVars.typography.display.display1.lineHeight,
    letterSpacing: themeVars.typography.display.display1.letterSpacing,
  }),
  display2: style({
    fontWeight: themeVars.typography.display.display2.fontWeight,
    fontSize: themeVars.typography.display.display2.fontSize,
    lineHeight: themeVars.typography.display.display2.lineHeight,
    letterSpacing: themeVars.typography.display.display2.letterSpacing,
  }),

  title1: style({
    fontWeight: themeVars.typography.title.title1.fontWeight,
    fontSize: themeVars.typography.title.title1.fontSize,
    lineHeight: themeVars.typography.title.title1.lineHeight,
    letterSpacing: themeVars.typography.title.title1.letterSpacing,
  }),
  title2: style({
    fontWeight: themeVars.typography.title.title2.fontWeight,
    fontSize: themeVars.typography.title.title2.fontSize,
    lineHeight: themeVars.typography.title.title2.lineHeight,
    letterSpacing: themeVars.typography.title.title2.letterSpacing,
  }),
  title3: style({
    fontWeight: themeVars.typography.title.title3.fontWeight,
    fontSize: themeVars.typography.title.title3.fontSize,
    lineHeight: themeVars.typography.title.title3.lineHeight,
    letterSpacing: themeVars.typography.title.title3.letterSpacing,
  }),
  title4: style({
    fontWeight: themeVars.typography.title.title4.fontWeight,
    fontSize: themeVars.typography.title.title4.fontSize,
    lineHeight: themeVars.typography.title.title4.lineHeight,
    letterSpacing: themeVars.typography.title.title4.letterSpacing,
  }),

  headline1: style({
    fontWeight: themeVars.typography.headline.headline1.fontWeight,
    fontSize: themeVars.typography.headline.headline1.fontSize,
    lineHeight: themeVars.typography.headline.headline1.lineHeight,
    letterSpacing: themeVars.typography.headline.headline1.letterSpacing,
  }),
  headline2: style({
    fontWeight: themeVars.typography.headline.headline2.fontWeight,
    fontSize: themeVars.typography.headline.headline2.fontSize,
    lineHeight: themeVars.typography.headline.headline2.lineHeight,
    letterSpacing: themeVars.typography.headline.headline2.letterSpacing,
  }),
  headline3: style({
    fontWeight: themeVars.typography.headline.headline2.fontWeight,
    fontSize: themeVars.typography.headline.headline2.fontSize,
    lineHeight: themeVars.typography.headline.headline2.lineHeight,
    letterSpacing: themeVars.typography.headline.headline2.letterSpacing,
  }),
  headline4: style({
    fontWeight: themeVars.typography.headline.headline2.fontWeight,
    fontSize: themeVars.typography.headline.headline2.fontSize,
    lineHeight: themeVars.typography.headline.headline2.lineHeight,
    letterSpacing: themeVars.typography.headline.headline2.letterSpacing,
  }),

  label1: style({
    fontWeight: themeVars.typography.label.label1.fontWeight,
    fontSize: themeVars.typography.label.label1.fontSize,
    lineHeight: themeVars.typography.label.label1.lineHeight,
    letterSpacing: themeVars.typography.label.label1.letterSpacing,
  }),
  label2: style({
    fontWeight: themeVars.typography.label.label2.fontWeight,
    fontSize: themeVars.typography.label.label2.fontSize,
    lineHeight: themeVars.typography.label.label2.lineHeight,
    letterSpacing: themeVars.typography.label.label2.letterSpacing,
  }),
  label3: style({
    fontWeight: themeVars.typography.label.label3.fontWeight,
    fontSize: themeVars.typography.label.label3.fontSize,
    lineHeight: themeVars.typography.label.label3.lineHeight,
    letterSpacing: themeVars.typography.label.label3.letterSpacing,
  }),
  label4: style({
    fontWeight: themeVars.typography.label.label4.fontWeight,
    fontSize: themeVars.typography.label.label4.fontSize,
    lineHeight: themeVars.typography.label.label4.lineHeight,
    letterSpacing: themeVars.typography.label.label4.letterSpacing,
  }),

  body1: style({
    fontWeight: themeVars.typography.body.body1.fontWeight,
    fontSize: themeVars.typography.body.body1.fontSize,
    lineHeight: themeVars.typography.body.body1.lineHeight,
    letterSpacing: themeVars.typography.body.body1.letterSpacing,
  }),
  body2: style({
    fontWeight: themeVars.typography.body.body2.fontWeight,
    fontSize: themeVars.typography.body.body2.fontSize,
    lineHeight: themeVars.typography.body.body2.lineHeight,
    letterSpacing: themeVars.typography.body.body2.letterSpacing,
  }),
  body3: style({
    fontWeight: themeVars.typography.body.body2.fontWeight,
    fontSize: themeVars.typography.body.body2.fontSize,
    lineHeight: themeVars.typography.body.body2.lineHeight,
    letterSpacing: themeVars.typography.body.body2.letterSpacing,
  }),
  caption: style({
    fontWeight: themeVars.typography.body.caption.fontWeight,
    fontSize: themeVars.typography.body.caption.fontSize,
    lineHeight: themeVars.typography.body.caption.lineHeight,
    letterSpacing: themeVars.typography.body.caption.letterSpacing,
  }),
};

export const fontColors = {
  white: style({ color: themeVars.colors.gray.gray0 }),
  red: style({ color: themeVars.colors.red.red }),
  gray900: style({ color: themeVars.colors.gray.gray900 }),
  gray600: style({ color: themeVars.colors.gray.gray600 }),
};

export const alignStyles = {
  left: style({ textAlign: 'left' }),
  center: style({ textAlign: 'center' }),
  right: style({ textAlign: 'right' }),
};
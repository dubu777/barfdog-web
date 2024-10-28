import { themeVars } from '@/styles/theme.css';
import { style } from '@vanilla-extract/css';

export const mainSliderWrapper = style({
    width: '100%',
    height: 'auto',
    margin: '29px 0',
})

export const mainSliderContainer = style({
    height: '100%',
    paddingBottom: '27px'
})

export const reviewSlideItem = style({
    background: themeVars.colors.white,
    width: '345px',
    height: '411px',
    borderRadius: '7px',
    boxShadow: '0px 0px 7px rgba(0, 0, 0, 0.1)',
    display: 'flex',
    flexDirection: 'column',
    padding: '31px 17px 14px',
    position: 'relative',
    '@media': {
        'screen and (max-width: 600px)': {
            width: '277px',
        }
    },
})

export const reviewSlideImage = style({
    width: '100% !important',
    position: 'relative !important',
    borderRadius: '7px',
    objectFit: 'cover',
    marginBottom: '1rem',
    aspectRatio: '4 / 3.5'
})

export const reviewSlideContents = style({
    height: '25%',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start'
})

const textLeft = style({
    textAlign: 'left',
})

export const reviewSlideTitle = style([textLeft, {
    position: 'relative',
    height: '34px',
    '::after': {
        content: '',
        display: 'block',
        width: '100%',
        height: '1px',
        position: 'absolute',
        bottom: '12px',
        background: themeVars.colors.black,
    }
}])

export const reviewSlideBottomInfo = style({
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    fontSize: themeVars.fontSize["text-xs"],
    color: themeVars.fontColors.grey4a,
})

export const reviewSlideSubscribeType = style({
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-end',
    gap: '4px'
})

export const reviewRate = style({
    fontSize: themeVars.fontSize["text-lg"],
    color: themeVars.colors.mainRed,
    textAlign: 'right',
    marginBottom: '5px',
})
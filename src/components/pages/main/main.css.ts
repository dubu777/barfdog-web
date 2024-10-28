import { themeVars } from '@/styles/theme.css';
import { style } from '@vanilla-extract/css';
import { recipe } from '@vanilla-extract/recipes';

const baseFlex = style({ display: 'flex' });

export const flexColumn = style([baseFlex, { flexDirection: 'column', justifyContent: 'center' }]);
export const flexRow = style([baseFlex, { flexDirection: 'row', alignItems: 'center' }]);
export const mainContainer = style({ minHeight: '100vh', marginBottom: '80px' });
export const pointColor = style({ color: themeVars.colors.mainRed });

export const mainTitle = recipe({
    base: {
        fontStyle: 'normal',
        fontWeight: themeVars.fontWeight.bold,
        fontSize: '23px',
        zIndex: 100,
        lineHeight: 'normal',
    },
    variants: {
        size: {
            md: {
                fontSize: themeVars.fontSize["text-md"],
                fontWeight: themeVars.fontWeight.semibold,
                letterSpacing: '-0.04em',
            },
            lg: {
                fontSize: themeVars.fontSize["text-lg"],
                letterSpacing: '-0.05em',
            },
            titleLg: {
                fontSize: themeVars.fontSize["title-lg"],
                letterSpacing: '-0.06em',
            },
            titleXl: {
                fontSize: themeVars.fontSize["title-xl"],
                letterSpacing: '-0.01em',
            },
            titleXXl: {
                fontSize: themeVars.fontSize["title-xxl"],
                letterSpacing: '-0.01em',
            },
        },
        color: {
            white: {
                color: themeVars.colors.white
            },
        },
        weight: {
            normal: {
                fontWeight: themeVars.fontWeight.normal,
            }
        }
    },
    defaultVariants: {
        size: 'titleLg',
    }
})

export const mainDescription = recipe({
    base: {
        fontWeight: themeVars.fontWeight.normal,
        fontSize: themeVars.fontSize["text-sm"],
        letterSpacing: '-0.05em',
        lineHeight: 'normal',
        zIndex: 100,
        whiteSpace: 'pre-line'
    },
    variants: {
        size: {
            xs: {
                fontSize: themeVars.fontSize["text-xs"],
            },
            sm: {
                fontSize: themeVars.fontSize["text-sm"],
                fontWeight: themeVars.fontWeight.light,
            },
            md: {
                fontSize: themeVars.fontSize["text-md"],
                fontWeight: themeVars.fontWeight.semibold,
                letterSpacing: '-0.01em',
            },
        },
        color: {
            default: {
                color: themeVars.fontColors.grey89,
            },
            white: {
                color: themeVars.colors.white,
            },
            black: {
                color: themeVars.colors.black,
            },
        },
        align: {
            center: {
                textAlign: 'center',
            },
            left: {
                textAlign: 'left',
            }
        },
        weight: {
            light: {
                fontWeight: themeVars.fontWeight.light,
            },
            normal: {
                fontWeight: themeVars.fontWeight.normal,
            },
            bold: {
                fontWeight: themeVars.fontWeight.bold,
            }
        }
    },
    defaultVariants: {
        color: 'default',
        align: 'center',
    },
})

export const mainLink = recipe({
    base: {
        fontSize: '15px',
        fontWeight: themeVars.fontWeight.bold,
        color: themeVars.colors.mainRed,
        zIndex: 100,
    },
    variants: {
        type: {
            button: {
                background: themeVars.colors.white,
                border: `1px solid ${themeVars.borderColors.redB8}`,
                borderRadius: '21px',
                padding: '12px 25px',
                transition: 'all .35s',
                ':hover': {
                    background: themeVars.colors.mainRed,
                    color: themeVars.colors.white,
                }
            },
            text: {
                fontSize: '11px',
            },
        },
        align: {
            center: {
                textAlign: 'center',
            },
            left: {
                textAlign: 'left',
            },
        }
    },
    defaultVariants: {
        type: 'button',
        align: 'center',
    },
})

// -----------------------------------------------------
export const mainVideoWrapper = recipe({
    base: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        minHeight: '515px',
        height: '65vh',
        color: themeVars.colors.white,
        alignItems: 'center',
        position: 'relative',
        marginTop: '62px'
    },
    variants: {
        isTopBannerVisible: {
            true: {
                marginTop: '102px',
            },
        }
    },
});

export const mainVideo = style({
    width: '100%',
    height: '100%',
    objectFit: 'cover',
    position: 'absolute',
    top: 0,
    left: 0,
})

// -----------------------------------------------------
export const mainRecommendWrapper = style({
    height: 'auto',
    padding: '66px 0 62px',
    color: themeVars.colors.black,
})

export const recommendSlideContainer = style({
    paddingLeft: '20px',
})

export const recommendSlideList = recipe({
    base: {
        width: '100%',
        margin: '30px 0 40px',
    },
    variants: {
        type: {
            'recipes': {
                margin: '25px 0 0',
            }
        }
    }
})

export const recommendSlideBox = recipe({
   base: {
       overflow: 'hidden',
   },
    variants: {
        type: {
            healthCheck: {
                width: '139px !important',
                borderRadius: '8px',
            },
            recipes: {
                width: 'auto !important',
            },
        }
    }
})

export const recommendSlideItem = style({
    width: '100%',
    position: 'relative',
    cursor: 'pointer',
})

export const recommendSlideImage = recipe({
    base: {
        display: 'block',
        objectFit: 'contain',
        borderRadius: '7px',
    },
    variants: {
        type: {
            'recipes': {
                marginBottom: '4px'
            },
            'healthCheck': {
                width: '100%',
                height: '100%',
            }
        }
    }
})

export const healthCheckFakeBg = style({
    width: '100%',
    height: '100%',
    position: 'absolute',
    top: 0,
    left: 0,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    background: themeVars.backgroundColors.darkOpacity,
})

export const healthCheckTitle = style({
    position: 'absolute',
    top: 20,
    left: 13,
})

export const recipesContentBox = style({
    paddingLeft: '10px'
})

export const recipesPrice = style({
    marginTop: '5px',
    display: 'flex',
    gap: '9px'
})

// -----------------------------------------------------
export const mainReviewWrapper = style({
    width: '100%',
    padding: '45px 0 31px',
    justifyContent: 'flex-start',
    background: 'linear-gradient(161.23deg, rgba(255, 255, 255, 0.1) 3.51%, rgba(202, 16, 16, 0.2) 94.98%)',
})

// -----------------------------------------------------
export const mainReasonWrapper = style([flexColumn, {
    padding: '73px 59px 81px',
    display: 'flex',
    flexDirection: 'column',
    whiteSpace: 'pre',
    textAlign: 'left',
    '@media': {
        'screen and (max-width: 600px)': {
            padding: '73px 29px 70px',
        }
    },
}])

export const mainReasonListItem = style([flexRow, {
    justifyContent: 'space-between',
    marginBottom: '21px',
    ':last-child': {
        marginBottom: 0,
    },
}])

export const mainReasonItemInfo = style([flexColumn, {
    width: '70%',
}])

export const mainReasonImage = style([flexColumn, {
    objectFit: 'contain'
}])


// -----------------------------------------------------
export const mainSurveyWrapper = style({
    width: '100%',
    minHeight: '680px',
    background: themeVars.backgroundColors.pinkF1,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    padding: '53px 0 45px'
})

// -----------------------------------------------------
export const mainServiceWrapper = style([flexColumn, {
    padding: '66px 61px 21px',
    minHeight: '100vh',
    justifyContent: 'flex-start',
    whiteSpace: 'pre',
    '@media': {
        'screen and (max-width: 600px)': {
            padding: '66px 50px 21px',
        }
    },
}])

export const mainServiceBox = style({
    paddingBottom: '77px',
    position: 'relative',
    '::after': {
        content: '',
        display: 'block',
        width: '1px',
        height: '32px',
        background: themeVars.colors.black,
        position: 'absolute',
        left: '50%',
        bottom: '22px'
    }
})

export const mainServiceListItem = style({
    marginBottom: '42px',
    ':last-child': {
        marginBottom: 0,
    },
})
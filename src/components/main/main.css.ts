import { themeVars } from '@/styles/theme.css';
import { style } from '@vanilla-extract/css';
import { recipe } from '@vanilla-extract/recipes';

const baseFlex = style({ display: 'flex' });

export const flexColumn = style([baseFlex, { flexDirection: 'column', justifyContent: 'center' }])
export const flexRow = style([baseFlex, { flexDirection: 'row', alignItems: 'center' }])

export const mainContainer = style({
    minHeight: '100vh'
});

export const mainTitle = recipe({
    base: {
        fontStyle: 'normal',
        fontWeight: themeVars.fontWeight.bold,
        fontSize: '23px',
    },
    variants: {
        size: {
            size16: {
                fontSize: '16px',
                fontWeight: themeVars.fontWeight.semibold,
                letterSpacing: '-0.04em',
            },
            size17: {
                fontSize: '17px',
                letterSpacing: '-0.05em',
            },
            size23: {
                fontSize: '23px',
                letterSpacing: '-0.06em',
            },
            size25: {
                fontSize: '25px',
                letterSpacing: '-0.01em',
            },
        },
    },
    defaultVariants: {
        size: 'size23',
    }
})
export const mainDescription = recipe({
    base: {
        fontStyle: 'normal',
        fontSize: '14px',
        letterSpacing: '-0.05em',
    },
    variants: {
        size: {
            size11: {
                fontSize: '11px',
            },
            size12: {
                fontSize: '12px',
            },
            size13: {
                fontSize: '13px',
                letterSpacing: '-0.1em',
            },
            size14: {
                fontSize: '14px',
                fontWeight: themeVars.fontWeight.light,
                lineHeight: '20px',
            },
            size15: {
                fontSize: '15px',
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
        }
    },
    defaultVariants: {
        size: 'size23',
        color: 'default',
        align: 'center',
    },
    compoundVariants: [
        {
            variants: {
                size: 'size14',
                color: 'black'
            },
            style: {
                fontWeight: themeVars.fontWeight.bold,
            }
        }
    ]
})
export const mainLink = recipe({
    base: {
        fontSize: '15px',
        fontWeight: themeVars.fontWeight.bold,
        color: themeVars.colors.mainRed,
    },
    variants: {
        type: {
            button: {
                background: themeVars.colors.white,
                border: `1px solid ${themeVars.borderColors.redB8}`,
                borderRadius: '21px',
                padding: '13px 30px',
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
export const mainSection1 = style([flexColumn, {
    minHeight: '515px',
    height: '70vh',
    background: `url(/images/main/section1Bg.png) no-repeat center center / 100% 100%`,
    color: themeVars.colors.white,
    alignItems: 'center',
}]);

// -----------------------------------------------------
export const mainSection2 = style([flexColumn, {
    minHeight: '707px',
    height: themeVars.height.innerHeight,
    padding: '66px 0',
    color: themeVars.colors.black,
}])

// -----------------------------------------------------
export const mainSection4 = style([flexColumn, {
    padding: '70px 28px 80px',
    display: 'flex',
    flexDirection: 'column',
    whiteSpace: 'pre',
    textAlign: 'left',
}])

export const mainSection4ListItem = style([flexRow, {
    justifyContent: 'space-evenly',
    marginBottom: '28px',
    ':last-child': {
        marginBottom: 0,
    },
    '@media': {
        'screen and (max-width: 600px)': {
            justifyContent: 'space-between'
        }
    },
}])
export const mainSection4ItemInfo = style([flexColumn, {
    minWidth: '40%',
}])
export const mainSection4Image = style([flexColumn, {
    objectFit: 'contain'
}])

// -----------------------------------------------------
export const mainSection6 = style([flexColumn, {
    padding: '66px 48px 22px',
    minHeight: '100vh',
    justifyContent: 'flex-start',
    whiteSpace: 'pre',
    marginBottom: '102px',
}])
export const mainSection6Box = style({
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
export const mainSection6ListItem = style({
    marginBottom: '42px',
    ':last-child': {
        marginBottom: 0,
    },
})
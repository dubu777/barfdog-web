import { style } from "@vanilla-extract/css";
import { themeVars } from "@/styles/theme.css";

export const subscriptionCard = style({
  border: `1px solid ${themeVars.borderColors.greyBB}`,
  borderRadius: '3px',
  padding: '25px 23px 16px',
  textAlign: 'left',
})

export const subscriptionName = style({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  marginBottom: '13px'
})

export const productionDates = style({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  gap: '18px',
  marginBottom: '15px',
  background: themeVars.backgroundColors.greyD9,
})

export const productionDate = style({
  position: 'relative',
  ':after': {
    content: '',
    display: 'block',
    width: '1px',
    height: '70%',
    background: themeVars.colors.black,
    position: 'absolute',
    top: '50%',
    right: '-9px',
    transform: 'translateY(-50%)'
  }
});

export const subscriptionInfo = style({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'flex-start',
  gap: '8px',
  marginBottom: '13px',
})

export const infoName = style({
  display: 'inline-block',
  minWidth: '95px',
  textAlign: 'left'
})

export const subscriptionControls = style({
  width: '100%',
  display: 'inline-flex',
  gap: '12px',
  justifyContent: 'center',
  alignItems: 'center',
})

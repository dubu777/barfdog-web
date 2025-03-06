import StarIcon from '/public/images/icons/star.svg';
import { themeVars } from "@/styles/theme.css";
import {
  rateStarBoxAlignStyles,
  rateStarBoxInlineBlockStyles,
  rateStarStyles
} from "./RateStar.css";

interface RateStarProps {
  rateLength: number;
  color?: 'yellow' | 'red' | 'gray';
  align?: 'center' | 'left' | 'right';
  value?: number;
  onChange?: (newRating: number) => void;
  inlineBlock?: boolean;
}

const RateStar = ({
  rateLength = 5,
  color = 'red',
  align = 'left',
  value,
  onChange,
  inlineBlock = false,
}: RateStarProps) => {
  const grayColor = themeVars.colors.gray.gray300;
  const starColor = color === 'yellow'
    ? themeVars.colors.yellow.yellow500
    : color === 'red'
      ? themeVars.colors.red.red
      : grayColor;

  const emptyColor = (i: number) => value === 0 || value ? i >= value : false;

  const handleClick = (index: number) => {
    if(onChange) {
      onChange(index + 1);
    }
  }
  return (
    <div className={`${rateStarBoxAlignStyles[align]} ${inlineBlock ? rateStarBoxInlineBlockStyles : ''}`}>
      {Array.from({ length: rateLength }, (v, i) => i + 1).map((_, i) => (
        <span
          key={i}
          className={rateStarStyles({ isEditable: !!onChange })}
          onClick={onChange ? () => handleClick(i) : undefined}
        >
          <StarIcon style={{ color: emptyColor(i) ? grayColor : starColor }} />
        </span>
      ))}
    </div>
  );
};

export default RateStar;
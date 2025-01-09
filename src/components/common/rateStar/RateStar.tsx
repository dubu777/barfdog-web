import * as styles from './RateStar.css';

interface RateStarProps {
  rateLength: number;
  value?: number;
  color?: 'yellow' | 'red' | 'black';
  align?: 'center' | 'left';
  onChange?: (newRating: number) => void;
  isEdit?: boolean;
  inlineBlock?: boolean;
}

const RateStar = ({ rateLength, color = 'red', align = 'center', value, onChange, isEdit = false, inlineBlock = false }: RateStarProps) => {
  const handleClick = (index: number) => {
    if(onChange) {
      onChange(index + 1);
    }
  }
  return (
    <div className={styles.rateBox({ align, inlineBlock })}>
      {Array.from({ length: rateLength }, (v, i) => i + 1).map((_, i) => (
        <span
          key={i}
          className={styles.rate({ color, align, empty: value === 0 || value ? i >= value : false, isEdit })}
          onClick={() => value ? handleClick(i) : undefined}
        >
          ★
        </span>
      ))}
    </div>
  );
};

export default RateStar;
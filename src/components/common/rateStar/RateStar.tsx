import * as styles from './RateStar.css';
import { Fragment } from "react";

interface RateStar {
  rateLength: number;
  color?: 'yellow' | 'red' | 'black';
  align?: 'center' | 'left'
}

const RateStar = ({ rateLength, color = 'red', align = 'center' }: RateStar) => {
  return (
    <span className={styles.rate({ color, align })}>
      {Array.from({length: rateLength}, (v, i) => i + 1).map((_, i) => (
        <Fragment key={i}>★</Fragment>
      ))}
    </span>
  );
};

export default RateStar;
import * as styles from './RateStar.css';
import {Fragment} from "react";

interface RateStar {
  rateLength: number;
  color?: 'yellow' | 'red' | 'black';
}

const RateStar = ({ rateLength, color = 'red' }: RateStar) => {
  return (
     <span className={styles.rate({ color })}>
      {Array.from({length: rateLength}, (v, i) => i + 1).map((_, i) => (
        <Fragment key={i}>★</Fragment>
      ))}
    </span>
  );
};

export default RateStar;
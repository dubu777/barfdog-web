import * as styles from './DotSpinner.css';

export const DotSpinner: React.FC = () => (
  <div className={styles.placeLoadArea}>
    <div className={styles.dot1} />
    <div className={styles.dot2} style={{ left: 0 }} />
    <div className={styles.dot3} style={{ left: 0 }} />
    <div className={styles.dot4} style={{ left: 0 }} />
    <div className={styles.dot5} style={{ left: 0 }} />
  </div>
);

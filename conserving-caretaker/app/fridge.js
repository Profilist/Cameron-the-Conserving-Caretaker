import React from 'react';
import styles from './fridge.module.css';

const Fridge = () => {
  return (
    <div className={styles.fridge}>
      <div className={styles.fridgeBody}>
        <div className={`${styles.handle} ${styles.top}`}></div>
        <div className={`${styles.handle} ${styles.bottom}`}></div>
        <div className={styles.divider}></div>
        <div className={`${styles.hightlight} ${styles.topHightlight}`}></div>
        <div className={`${styles.hightlight} ${styles.bottomHightlight}`}></div>
        <div className={styles.shadowBottom}></div>
      </div>
      <div className={styles.fridgeShadow}></div>
    </div>
  );
};

export default Fridge;

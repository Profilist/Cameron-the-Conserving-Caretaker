import styles from './tv.module.css';

const tv = ( {onToggle, isTVOn} ) => {
  return (
    <div className={styles.container}>
      <div className={`${styles.monitor} ${isTVOn ? styles.flicker : ''}`} onClick={onToggle}>
        {isTVOn && <div className={styles.monitorScreen}></div>}
      </div>
    </div>
  );
};

export default tv;

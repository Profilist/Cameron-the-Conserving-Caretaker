import styles from './tv.module.css';

const tv = () => {
  return (
    <div className={styles.container}>
      <div className={styles.monitor}>
        <div className={styles.monitorScreen}></div>
      </div>
    </div>
  );
};

export default tv;

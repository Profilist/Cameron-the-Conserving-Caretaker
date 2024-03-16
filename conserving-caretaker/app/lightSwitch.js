import styles from "./lightSwitch.module.css";

const lightSwitch = ({ onToggle, isLightOn }) => {

  return (
    <div className={styles.htmlBody}>
      <input type="checkbox" id="light-switch" className={styles.lightSwitch} onChange={onToggle} checked={isLightOn} />
      <label htmlFor="light-switch" className={styles.lightSwitchLabel}>
        <div className={styles.screw}></div>
        <div className={styles.switch}></div>
        <div className={styles.screw}></div>
      </label>
      <div className={styles.background}></div>
    </div>
  );
};

export default lightSwitch;

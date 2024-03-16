"use client";

import { useState } from 'react';
import styles from './home.module.css'; 

const Landing = () => {
    const [isDarkMode, setIsDarkMode] = useState(false);

    const toggleDarkMode = () => {
        setIsDarkMode(!isDarkMode);
    };

    return (
        <div className={`${styles.container} ${isDarkMode ? styles.dark : ''}`}>
            <div className={styles.logo}>
                <img src="/logo.png" alt="Cameron Logo" />
            </div>
            <h1 className={styles.title}>Cameron, a Conserving Caretaker</h1>
            <p className={styles.description}>Track your energy usage, set goals, and save money with Cameron.</p>
            <a href="/bedroom" className={styles.btn}>Get Started</a>
            <label className={styles.switch}>
                <input type="checkbox" onChange={toggleDarkMode} />
                <span className={styles.slider}></span>
            </label>
        </div>
    );
};

export default Landing;

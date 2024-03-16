"use client";

import Head from "next/head";
import { useState, useEffect } from "react";
import LightSwitch from "../lightSwitch";
import ProgressBar from "../progressBar";
import landingStyles from "../landing.module.css";
import TV from "../tv";
import Door from "../door";

export default function Home() {
  const [isLightOn, setIsLightOn] = useState(false);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const savedProgress = parseFloat(localStorage.getItem("progress")) || 0;
    const savedLightState = localStorage.getItem("isLightOn") === "true";

    setIsLightOn(savedLightState);

    if (savedLightState) {
      const lastSavedTime =
        parseInt(localStorage.getItem("lastSavedTime"), 10) || Date.now();
      const currentTime = Date.now();
      const elapsed = currentTime - lastSavedTime;
      const additionalProgress = (elapsed/100) * 0.01;
      setProgress(savedProgress + additionalProgress);
    } else {
      setProgress(savedProgress);
    }

    if (!savedLightState) {
      localStorage.setItem("lastSavedTime", Date.now().toString());
    }
  }, []);

  useEffect(() => {
    let intervalId;
    if (isLightOn) {
      intervalId = setInterval(() => {
        setProgress((prevProgress) => {
          const newProgress = prevProgress + 0.01;
          localStorage.setItem("progress", newProgress.toString());
          localStorage.setItem("isLightOn", isLightOn.toString());
          localStorage.setItem("lastSavedTime", Date.now().toString());
          return newProgress;
        });
      }, 10);
    }
    return () => clearInterval(intervalId);
  }, [isLightOn]);

  const toggleLight = () => {
    const newState = !isLightOn;
    setIsLightOn(newState);
    localStorage.setItem("isLightOn", newState.toString());

    if (!newState) {
      localStorage.setItem("lastSavedTime", Date.now().toString());
    }
  };

  const voltsUsed = (Math.round(progress * 0.04 * 100) / 100).toFixed(2);
  const cost = (Math.round(progress * 0.04 * 0.2 * 100) / 100).toFixed(2);

  const textColor = isLightOn ? "#132436" : "white";

  return (
    <div>
      <Head>
        <title>Save Energy</title>
      </Head>
      <div className={landingStyles.frame}>
        <Door link={"kitchen"} />
        <LightSwitch onToggle={toggleLight} isLightOn={isLightOn} />
        <div className={`${landingStyles.textBox} ${landingStyles.light}`}>
          <p style={{ color: textColor }}>
            You have used up {voltsUsed} volts.
          </p>
          <ProgressBar progress={progress} />
          <p style={{ color: textColor }}>This light has cost you ${cost}.</p>
        </div>
        <TV />
      </div>
    </div>
  );
}

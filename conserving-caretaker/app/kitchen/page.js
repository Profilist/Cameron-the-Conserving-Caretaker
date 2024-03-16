"use client";

import Head from "next/head";
import { useState, useEffect } from "react";
import LightSwitch from "../lightSwitch";
import ProgressBar from "../progressBar";
import landingStyles from "../landing.module.css";
import Fridge from "../fridge";
import Door from "../door";

export default function Kitchen() {
  const [isLightOn, setIsLightOn] = useState(false);
  const [progress, setProgress] = useState(0);
  const [progressFridge, setProgressFridge] = useState(0);

  useEffect(() => {
    const savedProgress = parseFloat(localStorage.getItem("progress1")) || 0;
    const savedProgressFridge =
      parseFloat(localStorage.getItem("progressFridge")) || 0;
    const savedLightState = localStorage.getItem("isLightOn1") === "true";

    setIsLightOn(savedLightState);

    const lastSavedTime =
      parseInt(localStorage.getItem("lastSavedTime"), 10) || Date.now();
    const currentTime = Date.now();
    const elapsed = currentTime - lastSavedTime;
    const additionalProgress = (elapsed / 100) * 0.01;

    if (savedLightState) {
      setProgress(savedProgress + additionalProgress);
    } else {
      setProgress(savedProgress);
    }

    setProgressFridge(savedProgressFridge + additionalProgress);

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
          localStorage.setItem("progress1", newProgress.toString());
          localStorage.setItem("isLightOn1", isLightOn.toString());
          localStorage.setItem("lastSavedTime1", Date.now().toString());
          return newProgress;
        });
      }, 50);
    }
    return () => clearInterval(intervalId);
  }, [isLightOn]);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgressFridge((prevProgress) => {
        const newProgress = prevProgress + 0.01;
        localStorage.setItem("progressFridge", newProgress.toString());
        return newProgress;
      });
    }, 100);
    return () => clearInterval(interval);
  }, []);

  const toggleLight = () => {
    const newState = !isLightOn;
    setIsLightOn(newState);
    localStorage.setItem("isLightOn", newState.toString());

    if (!newState) {
      localStorage.setItem("lastSavedTime", Date.now().toString());
    }
  };

  const wattsUsed = (Math.round(progress * 0.04 * 100) / 100).toFixed(2);
  const cost = (Math.round(progress * 0.04 * 0.2 * 100) / 100).toFixed(2);
  const wattsUsedFridge = (
    Math.round(progressFridge * 0.04 * 100) / 100
  ).toFixed(2);
  const costFridge = (
    Math.round(progressFridge * 0.04 * 0.2 * 100) / 100
  ).toFixed(2);

  const textColor = isLightOn ? "#132436" : "white";

  return (
    <div>
      <Head>
        <title>Save Energy</title>
      </Head>
      <div className={landingStyles.frame}>
        <Door link={"laundry"} />
        <Fridge />
        <div className={`${landingStyles.textBox} ${landingStyles.fridge}`}>
          <p style={{ color: textColor }}>
            You have used up {wattsUsedFridge} watts.
          </p>
          <ProgressBar progress={progressFridge} appliance={"FRIDGE"}/>
          <p style={{ color: textColor }}>
            This fridge has cost you ${costFridge}.
          </p>
        </div>
        <LightSwitch onToggle={toggleLight} isLightOn={isLightOn} />
        <div className={`${landingStyles.textBox} ${landingStyles.light}`}>
          <p style={{ color: textColor }}>
            You have used up {wattsUsed} watts.
          </p>
          <ProgressBar progress={progress} appliance={"LIGHTS"}/>
          <p style={{ color: textColor }}>This light has cost you ${cost}.</p>
        </div>
      </div>
    </div>
  );
}

"use client";

import Head from "next/head";
import { useState, useEffect } from "react";
import LightSwitch from "../lightSwitch";
import ProgressBar from "../progressBar";
import landingStyles from "../landing.module.css";
import TV from "../tv";
import Door from "../door";
import Washer from "../washer";

export default function Laundry() {
  const [isLightOn, setIsLightOn] = useState(false);
  const [isWashing, setWashing] = useState(false);
  const [progress, setProgress] = useState(0);
  const [progressWasher, setProgressWasher] = useState(0);

  useEffect(() => {
    const savedProgress = parseFloat(localStorage.getItem("progress2")) || 0;
    const savedProgressWasher = parseFloat(localStorage.getItem("progressWasher")) || 0;
    const savedLightState = localStorage.getItem("isLightOn2") === "true";
    const savedWashingState = localStorage.getItem("isWashing") === "true";

    setIsLightOn(savedLightState);
    setWashing(savedWashingState);

    const lastSavedTime =
      parseInt(localStorage.getItem("lastSavedTime2"), 10) || Date.now();
    const currentTime = Date.now();
    const elapsed = currentTime - lastSavedTime;
    const additionalProgress = (elapsed / 100) * 0.01;

    if (savedLightState) {
      setProgress(savedProgress + additionalProgress);
    } else {
      setProgress(savedProgress);
    }

    if (savedWashingState) {
      setProgressWasher(savedProgressWasher + additionalProgress);
    } else {
      setProgressWasher(savedProgressWasher);
    }

    localStorage.setItem("lastSavedTime2", Date.now().toString());
  }, []);

  useEffect(() => {
    let intervalId;
    if (isLightOn) {
      intervalId = setInterval(() => {
        setProgress((prevProgress) => {
          const newProgress = prevProgress + 0.01;
          localStorage.setItem("progress2", newProgress.toString());
          localStorage.setItem("isLightOn2", isLightOn.toString());
          localStorage.setItem("lastSavedTime2", Date.now().toString());
          return newProgress;
        });
      }, 50);
    }
    return () => clearInterval(intervalId);
  }, [isLightOn]);

  useEffect(() => {
    let intervalId;
    if (isWashing) {
      intervalId = setInterval(() => {
        setProgressWasher((prevProgress) => {
          const newProgress = prevProgress + 0.01;
          localStorage.setItem("progressWasher", newProgress.toString());
          localStorage.setItem("isWashing", isWashing.toString());
          localStorage.setItem("lastSavedTime2", Date.now().toString());
          return newProgress;
        });
      }, 10);
    }
    return () => clearInterval(intervalId);
  }, [isWashing]);

  const toggleLight = () => {
    const newState = !isLightOn;
    setIsLightOn(newState);
    localStorage.setItem("isLightOn2", newState.toString());

    if (!newState) {
      localStorage.setItem("lastSavedTime2", Date.now().toString());
    }
  };

  const toggleWasher = () => {
    const newState = !isWashing;
    setWashing(newState);
    localStorage.setItem("isWashing", newState.toString());

    if (!newState) {
      localStorage.setItem("lastSavedTime2", Date.now().toString());
    }
  };

  const voltsUsed = (Math.round(progress * 0.04 * 100) / 100).toFixed(2);
  const cost = (Math.round(progress * 0.04 * 0.2 * 100) / 100).toFixed(2);
  const voltsUsedWasher = (Math.round(progressWasher * 0.04 * 100) / 100).toFixed(2);
  const costWasher = (Math.round(progressWasher * 0.04 * 0.2 * 100) / 100).toFixed(2);

  const textColor = isLightOn ? "#132436" : "white";

  return (
    <div>
      <Head>
        <title>Save Energy</title>
      </Head>
      <div className={landingStyles.frame}>
        <Door link={"bedroom"} />
        <Washer onToggle={toggleWasher} isWashing={isWashing} />
        <div className={`${landingStyles.textBox} ${landingStyles.washer}`}>
          <p style={{ color: textColor }}>
            You have used up {voltsUsedWasher} volts.
          </p>
          <ProgressBar progress={progressWasher} appliance={"WASHING MACHINE"}/>
          <p style={{ color: textColor }}>This washing machine has cost you ${costWasher}.</p>
        </div>
        <LightSwitch onToggle={toggleLight} isLightOn={isLightOn} />
        <div className={`${landingStyles.textBox} ${landingStyles.light}`}>
          <p style={{ color: textColor }}>
            You have used up {voltsUsed} volts.
          </p>
          <ProgressBar progress={progress} appliance={"LIGHTS"}/>
          <p style={{ color: textColor }}>This light has cost you ${cost}.</p>
        </div>
      </div>
    </div>
  );
}

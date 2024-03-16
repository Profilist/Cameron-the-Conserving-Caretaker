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
  const [isTVOn, setisTVOn] = useState(false);
  const [progress, setProgress] = useState(0);
  const [progressTV, setProgressTV] = useState(0);

  useEffect(() => {
    const savedProgress = parseFloat(localStorage.getItem("progress")) || 0;
    const savedProgressTV = parseFloat(localStorage.getItem("progressTV")) || 0;
    const savedLightState = localStorage.getItem("isLightOn") === "true";
    const savedTVState = localStorage.getItem("isTVOn") === "true";

    setIsLightOn(savedLightState);
    setisTVOn(savedTVState);

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

    if (savedTVState) {
      setProgressTV(savedProgressTV + additionalProgress);
    } else {
      setProgressTV(savedProgressTV);
    }

    localStorage.setItem("lastSavedTime", Date.now().toString());
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
      }, 20);
    }
    return () => clearInterval(intervalId);
  }, [isLightOn]);

  useEffect(() => {
    let intervalId;
    if (isTVOn) {
      intervalId = setInterval(() => {
        setProgressTV((prevProgress) => {
          const newProgress = prevProgress + 0.01;
          localStorage.setItem("progressTV", newProgress.toString());
          localStorage.setItem("isTVOn", isTVOn.toString());
          localStorage.setItem("lastSavedTime", Date.now().toString());
          return newProgress;
        });
      }, 10);
    }
    return () => clearInterval(intervalId);
  }, [isTVOn]);

  const toggleLight = () => {
    const newState = !isLightOn;
    setIsLightOn(newState);
    localStorage.setItem("isLightOn", newState.toString());

    if (!newState) {
      localStorage.setItem("lastSavedTime", Date.now().toString());
    }
  };

  const toggleTV = () => {
    const newState = !isTVOn;
    setisTVOn(newState);
    localStorage.setItem("isTVOn", newState.toString());

    if (!newState) {
      localStorage.setItem("lastSavedTime", Date.now().toString());
    }
  };

  const wattsUsed = (Math.round(progress * 0.04 * 100) / 100).toFixed(2);
  const cost = (Math.round(progress * 0.04 * 0.2 * 100) / 100).toFixed(2);
  const wattsUsedTV = (Math.round(progressTV * 0.04 * 100) / 100).toFixed(2);
  const costTV = (Math.round(progressTV * 0.04 * 0.2 * 100) / 100).toFixed(2);

  const textColor = isLightOn ? "#132436" : "white";

  return (
    <div>
      <Head>
        <title>Save Energy</title>
      </Head>
      <div className={landingStyles.frame}>
        <Door link={"kitchen"} />

        <TV onToggle={toggleTV} isTVOn={isTVOn} />
        <div className={`${landingStyles.textBox} ${landingStyles.TV}`}>
          <p style={{ color: textColor }}>
            You have used up {wattsUsedTV} watts.
          </p>
          <ProgressBar progress={progressTV} appliance={"LIGHTS"} />
          <p style={{ color: textColor }}>This TV has cost you ${costTV}.</p>
        </div>

        <LightSwitch onToggle={toggleLight} isLightOn={isLightOn} />
        <div className={`${landingStyles.textBox} ${landingStyles.light}`}>
          <p style={{ color: textColor }}>
            You have used up {wattsUsed} watts.
          </p>
          <ProgressBar progress={progress} appliance={"LIGHTS"} />
          <p style={{ color: textColor }}>This light has cost you ${cost}.</p>
        </div>
      </div>
    </div>
  );
}

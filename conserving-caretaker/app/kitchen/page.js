"use client";

import Head from "next/head";
import { useState, useEffect } from "react";
import LightSwitch from "../lightSwitch";
import ProgressBar from "../progressBar";
import landingStyles from "../landing.module.css";
import Fridge from "../fridge";
import TV from "../tv";
import Door from "../door";

export default function Kitchen() {
  const [isLightOn, setIsLightOn] = useState(false);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    let intervalId;
    if (isLightOn) {
      intervalId = setInterval(() => {
        setProgress((prevProgress) => prevProgress + 0.01);
      }, 10);
    }
    return () => clearInterval(intervalId);
  }, [isLightOn]);

  const voltsUsed = (Math.round(progress * 0.04 * 100) / 100).toFixed(2);
  const cost = (Math.round(progress * 0.04 * 0.2 * 100) / 100).toFixed(2);

  const textColor = isLightOn ? "#132436" : "white";

  return (
    <div>
      <Head>
        <title>Save Energy Yes</title>
        <link rel="icon" href="/yoth.png" />
      </Head>
      <div className={landingStyles.frame}>
        <Door/>
        <Fridge/>
        <LightSwitch onToggle={() => setIsLightOn(!isLightOn)} />
        <div className={landingStyles.textBox}>
          <p style={{ color: textColor}}>You have used up {voltsUsed} volts.</p>
          <ProgressBar progress={progress} />
          <p style={{ color: textColor}}>This light has cost you ${cost}.</p>
        </div>
        <TV/>
      </div>
    </div>
  );
}

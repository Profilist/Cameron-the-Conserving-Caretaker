"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import styles from "./door.module.css";

export default function Door(props) {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const [isZoomed, setIsZoomed] = useState(false);

  const toggleDoor = () => {
    setIsOpen(!isOpen);
    setTimeout(() => {
      setIsZoomed(true);
    }, 1000);

    setTimeout(() => {
      router.push(`/${props.link}`);
    }, 2000);
  };

  const nextRoom = props.link.charAt(0).toUpperCase() + props.link.slice(1);

  return (
    <div className={styles.backDoor}>
      <div
        className={`${styles.door} ${isOpen ? styles.doorOpen : ""} ${isZoomed ? styles.zoomEffect : ''}`}
        onClick={toggleDoor}
      >
        <span className={styles.doorText}>{nextRoom}</span>
      </div>
    </div>
  );
}

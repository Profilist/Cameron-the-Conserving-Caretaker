"use client";

import { useState } from 'react';
import styles from './door.module.css';
import Link from 'next/link';

const door = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleDoor = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className={styles.backDoor}>
      <div 
        className={`${styles.door} ${isOpen ? styles.doorOpen : ''}`} 
        onClick={toggleDoor}>
      </div>
      <Link href="/kitchen">Kitchen</Link>
    </div>
  );
};

export default door;

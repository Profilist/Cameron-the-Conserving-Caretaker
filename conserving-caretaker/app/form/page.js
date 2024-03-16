"use client";

import { useState } from 'react';
import styles from '../form.module.css'; 

const Form = () => {
    const [homeSize, setHomeSize] = useState('');
    const [people, setPeople] = useState('');
    const [appliances, setAppliances] = useState('');
    const [result, setResult] = useState('');
    const [isModalOpen, setIsModalOpen] = useState(false);

    const calculateEnergy = (event) => {
        event.preventDefault(); 
        
        const totalEnergy = (parseFloat(homeSize) * 1.5) + (parseFloat(people) * 1.5);
        const monthlyCost = totalEnergy * 0.15;
        const resultText = `The average energy usage you should aim for is ${totalEnergy.toFixed(2)} kW per month per square foot and per person. The estimated monthly cost is $${monthlyCost.toFixed(2)} assuming $0.15 per kW.`;
        
        setResult(resultText);
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
    };

    return (
        <div className={styles.container}>
            <h1 className={styles.title}>Cameron, a Conservative Caretaking Calculator</h1>
            <form className={styles.form} onSubmit={calculateEnergy}>
                <label htmlFor="homeSize" className={styles.label}>What is the size of your home (in square feet)?</label>
                <input type="number" id="homeSize" className={styles.inputNumber} required value={homeSize} onChange={(e) => setHomeSize(e.target.value)} />
                
                <label htmlFor="people" className={styles.label}>How many people live in your home?</label>
                <input type="number" id="people" className={styles.inputNumber} required value={people} onChange={(e) => setPeople(e.target.value)} />
                
                <label htmlFor="appliances" className={styles.label}>What major appliances do you use regularly?</label>
                <textarea id="appliances" className={styles.textarea} rows="4" required value={appliances} onChange={(e) => setAppliances(e.target.value)}></textarea>
                
                <br/>
                <br/>

                <input type="submit" className={styles.inputSubmit} value="Calculate" />
            </form>

            {isModalOpen && (
                <div className={styles.modal}>
                    <div className={styles.modalContent}>
                        <span className={styles.close} onClick={closeModal}>&times;</span>
                        <p>Average cost or energy usage:</p>
                        <p>{result}</p>
                        <br/>
                        <a className={styles.explore} href="/bedroom">Go explore your home</a>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Form;

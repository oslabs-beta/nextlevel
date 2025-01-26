'use client';

import React, { useState } from 'react';
import styles from '../dashboard.module.css';

const WebVitalsFilter = ({ onSubmit }) => {
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({ 
      startDate, 
      endDate 
    });
  };

  return (
    <form onSubmit={handleSubmit} className={styles.filterContainer}>
      <input
        type="datetime-local"
        value={startDate}
        onChange={(e) => setStartDate(e.target.value)}
        className={styles.dateInput}
      />
      <input
        type="datetime-local"
        value={endDate}
        onChange={(e) => setEndDate(e.target.value)}
        className={styles.dateInput}
      />
      <button type="submit" className={styles.filterButton}>
        Filter
      </button>
    </form>
  );
};

export default WebVitalsFilter;

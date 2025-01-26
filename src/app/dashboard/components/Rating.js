import React, { useEffect, useState } from 'react';
// import { CategoryBar } from '@tremor/react';
import { CategoryBar } from './CategoryBar'
import styles from '../dashboard.module.css';

const Rating = ({ goodRange, needsImprovementRange, poorRange, metricType, currentValue }) => {
  const maxValue = poorRange[1];
  const roundedValue = Number(currentValue).toFixed(2);
  
  const rangeValues = [
    goodRange[1],                              // Good range
    needsImprovementRange[1] - goodRange[1],   // Needs improvement range
    poorRange[1] - needsImprovementRange[1]    // Poor range
  ];

  return (
    <div className={styles.ratingDiv}>
      <h2 className={styles.ratingHeading}>{metricType}</h2>
      <div className={styles.ratingBar}>
        <CategoryBar
          values={rangeValues}
          marker={currentValue ? {
            value: currentValue,
            tooltip: `${roundedValue} ms`,
            showAnimation: true
          } : undefined}
          colors={["emerald", "amber", "pink"]}
          className="mx-auto max-w-sm"
        />
        <div className={styles.statusText}>
          {currentValue ? (
            currentValue <= goodRange[1] ? 'Great!' :
            currentValue <= needsImprovementRange[1] ? 'Needs Work' :
            'Poor'
          ) : ''}
        </div>
      </div>
    </div>
  );
};

export default Rating;
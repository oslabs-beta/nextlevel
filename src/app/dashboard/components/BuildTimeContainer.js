import React from 'react';
import styles from '../dashboard.module.css';
import BuildTimeChart from './BuildTimeChart';
import BundleLog from './BundleLog';

function BuildTimeContainer({ username }) {
  return (
    <div className={styles.chartContainer}>
      <h2 className={styles.chartTitle}>Build Time</h2>
      <div className={styles.buildCharts}>
        <BuildTimeChart username={username}/>
        <BundleLog username={username}/>
      </div>
    </div>
  );
}

export default BuildTimeContainer;

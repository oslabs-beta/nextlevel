import React from 'react';
import styles from '../dashboard.module.css';
import BuildTimeChart from './buildtimechart';
import BuildTimeMetrics from './buildtimemetrics';

function BuildTimeContainer({ data, username }) {
  return (
    <div className={styles.chartContainer}>
      <h2 className={styles.chartTitle}>Build Time</h2>
      <div className={styles.buildCharts}>
        <BuildTimeChart className={styles.buildTimeChart} data={ data }/>
        <BuildTimeMetrics className={styles.bundleLogChart} username={username}/>
      </div>
    </div>
  );
}

export default BuildTimeContainer;
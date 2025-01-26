'use client';

import React, { useEffect, useState, useRef } from 'react';
import styles from '../dashboard.module.css';
import useWebVitalsData from '../hooks/useWebVitalsData';
import WebVitalsFilter from './WebVitalsFilter';
import CLSChart from './CLSChart';
import WebVitalRatings from './WebVitalRatings';
import WebVitalsChart from './WebVitalsChart';

function WebVitalsContainer({ username}) {
  const [webVitalsData, setWebVitalsData] = useState([]);
  const [clsData, setClsData] = useState([]);
  const [loading, setLoading] = useState(false); // Track loading state
  // const chartRef = useRef(null);
  // set end date to one day ago
  // set start date to now
  const now = new Date();
  const defaultEnd = now.toISOString().slice(0, 16);
  const oneDayAgo = new Date(now.getTime() - (24 * 60 * 60 * 1000));
  const defaultStart = oneDayAgo.toISOString().slice(0, 16); // format to 'YYYY-MM-DDTHH:MM'

  const [startDate, setStartDate] = useState(defaultStart);
  const [endDate, setEndDate] = useState(defaultEnd);

  const onSubmit = (startDate, endDate) => {
    setStartDate(startDate);
    setEndDate(endDate);
  };

  useEffect(() => {
    if (!startDate || !endDate) return; // Skip fetching if no date range is selected
    setLoading(true); // Start loading state

    useWebVitalsData(username, startDate, endDate)
    .then(data => {
      setWebVitalsData(data);
      const filteredData = data.filter(entry => entry.metricType === 'CLS');
      setClsData(filteredData);
      setLoading(false); // End loading state
      // return data;
    }).catch(error => {
        console.error('Error fetching web vitals', error);
        setLoading(false); // End loading state in case of error
    });
  }, [username, startDate, endDate]);

  // console.log('Web Vitals Data:', webVitalsData);
  
  // Render empty chart initially while loading
  if (loading) {
    return (
      <div className={styles.chartContainer}>
        <h2 className={styles.chartTitle}>Web Vitals</h2>
        <WebVitalsFilter onSubmit={onSubmit} />
        <div>Loading charts...</div> {/* Loading state */}
      </div>
    );
  }

  return (
    <div className={styles.chartContainer}>
      <div className={styles.chartHeader}>
        <h2 className={styles.chartTitle}>Web Vitals</h2>
        <WebVitalsFilter onSubmit={onSubmit} />
      </div>
      
      {/* Web Vitals Chart */}
      <div className={styles.webVitalsSection}>
        <WebVitalsChart webVitalsData={webVitalsData.length > 0 ? webVitalsData : [{value: 0}]}/>
      </div>
      
      {/* CLS Chart */}
      <div className={styles.clsSection}>
        <CLSChart clsData={clsData}/>
      </div>
      
      {/* Category Bar Charts */}
      <div className={styles.ratingsSection}>
        <div className={styles.ratingsRow}>
          <WebVitalRatings data={webVitalsData.filter(d => d.metricType === 'FCP' || d.metricType === 'TTFB')} />
        </div>
        <div className={styles.ratingsRow}>
          <WebVitalRatings data={webVitalsData.filter(d => d.metricType === 'LCP' || d.metricType === 'FID')} />
        </div>
        <div className={styles.ratingsRow}>
          <WebVitalRatings data={webVitalsData.filter(d => d.metricType === 'INP')} className={styles.centerSingle} />
        </div>
      </div>
    </div>
  );
}

export default WebVitalsContainer;


'use client';

import React, { useEffect, useState } from 'react';
import styles from '../dashboard.module.css';
import useBundleData from '../hooks/useBundleData';

function BundleLog({username}) {
  console.log('entering build time metrics for username:', username);

  const [bundleLogs, setBundleLogs] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [currentLog, setCurrentLog] = useState({});


  // useEffect(() => {
  //   useBundleData(username)
  //   .then(logs => {
  //     // console.log('Bundle Logs:', logs);
  //     setBundleLogs(logs);
  //     return logs;
  //   }).then(logs => {
  //     // console.log('logs length ', logs.length)
  //     const logsLength = logs.length
  //     setCurrentIndex(logsLength - 1);
  //     // console.log('Current Index:', currentIndex);
  //     setCurrentLog(bundleLogs[currentIndex]);
  //     // console.log('Current Log:', currentLog);
  //   })
  //   .catch(error => {
  //     console.error('Error fetching bundle log:', error);
  //   });

  // }, []);

  useEffect(() => {
    let mounted = true;
    
    const fetchLogs = async () => {
      try {
        const logs = await useBundleData(username);
        if (mounted) {
          setBundleLogs(logs);
        }
      } catch (error) {
        console.error('Error fetching bundle log:', error);
      }
    };

    fetchLogs();
    
    return () => {
      mounted = false;
    };
  }, [username]);

  // useEffect(() => {
  //   const logsLength = bundleLogs.length;
  //   setCurrentIndex(logsLength - 1);
  //   // console.log('Current Index:', currentIndex);
  //   setCurrentLog(bundleLogs[currentIndex]);
  //   // console.log('Current Log:', currentLog);
  // }, [bundleLogs]);

  // Update currentIndex and currentLog when bundleLogs is updated
  useEffect(() => {
    if (bundleLogs && bundleLogs.length > 0) {
      const logsLength = bundleLogs.length;
      setCurrentIndex(logsLength - 1); // Set index to the last log initially
      setCurrentLog(bundleLogs[logsLength - 1]); // Set current log to last log
    }
  }, [bundleLogs]); // This effect runs whenever bundleLogs changes

  const toggleBack = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
      setCurrentLog(bundleLogs[currentIndex - 1]);
    }
  }

  const toggleForward = () => {
    if (currentIndex < bundleLogs.length - 1) {
      setCurrentIndex(currentIndex + 1);
      setCurrentLog(bundleLogs[currentIndex + 1]);
    }
  }

  const formatDateTime = (dateTime) => {
    const date = new Date(dateTime);
    return date.toLocaleString();
  };

  if (!bundleLogs || bundleLogs.length === 0) {
    return <div>No logs available.</div>; // Placeholder when no logs are available
  }


  return (
    <div className={styles.bundleLogContainer}>
      <h3 className={styles.bundleLogTitle}>Bundle Logs</h3>
      <div className={styles.bundleToggleBox}>
        <div className={styles.bundleHeader}>
          <button className={styles.toggleButton} onClick={toggleBack} disabled={currentIndex === 0}>{`<`}</button> 
          {/* back doesn't work when index = 0, next doesnt work when index = length-1 */}
          <div>{formatDateTime(currentLog.bundleDate)}</div>
          <button className={styles.toggleButton} onClick={toggleForward} disabled={currentIndex === bundleLogs.length - 1}>{`>`}</button>
        </div>
        <div className={styles.bundleLog}>
          <pre>{currentLog.bundleLog}</pre>
        </div>
        
      </div>
    </div>
  );
}

export default BundleLog;
import React, { useEffect, useState } from 'react';
import Rating from './Rating';
import styles from '../dashboard.module.css';

const WebVitalRatings = ({ data }) => {
    console.log('DATA FROM WEB VITAL RATINGS: ', data);

    const [vitalRatings, setVitalRatings] = useState([]);

  // Updated ranges based on Google's Core Web Vitals thresholds
  const metricsConfig = {
    TTFB: {
      good: [0, 600],            // Good: 0-600ms
      needsImprovement: [600, 1000],  // Needs Improvement: 600-1000ms
      poor: [1000, 2000]         // Poor: >1000ms (max set to 2000 for visualization)
    },
    LCP: {
      good: [0, 2500],           // Good: 0-2.5s
      needsImprovement: [2500, 4000],  // Needs Improvement: 2.5-4s
      poor: [4000, 8000]         // Poor: >4s (max set to 8s for visualization)
    },
    FCP: {
      good: [0, 1800],           // Good: 0-1.8s
      needsImprovement: [1800, 3000],  // Needs Improvement: 1.8-3s
      poor: [3000, 5000]         // Poor: >3s (max set to 5s for visualization)
    },
    FID: {
      good: [0, 100],            // Good: 0-100ms
      needsImprovement: [100, 200],    // Needs Improvement: 100-200ms
      poor: [200, 400]           // Poor: >200ms (max set to 400ms for visualization)
    },
    INP: {
      good: [0, 200],            // Good: 0-200ms
      needsImprovement: [200, 500],    // Needs Improvement: 200-500ms
      poor: [500, 1000]          // Poor: >500ms (max set to 1000ms for visualization)
    },
    CLS: {
      good: [0, 0.1],            // Good: 0-0.1
      needsImprovement: [0.1, 0.25],   // Needs Improvement: 0.1-0.25
      poor: [0.25, 0.5]          // Poor: >0.25 (max set to 0.5 for visualization)
    }
  };

    // Helper function to calculate average for a specific metric type
    const calculateAverage = (data, metricType) => {
        const metrics = data.filter(item => item.metricType === metricType);
        if (metrics.length === 0) return null;
        
        const sum = metrics.reduce((acc, curr) => acc + curr.metricValue, 0);
        return sum / metrics.length;
    };

    useEffect(() => {
        const averages = data?.length 
            ? Object.keys(metricsConfig).reduce((acc, metric) => ({
                ...acc,
                [metric]: calculateAverage(data, metric)
            }), {})
        : {};

        const ratings = Object.entries(metricsConfig).map(([metricType, ranges]) => (
            <Rating
                key={metricType}
                metricType={metricType}
                goodRange={ranges.good}
                needsImprovementRange={ranges.needsImprovement}
                poorRange={ranges.poor}
                currentValue={averages[metricType]}
            />
        ));

        setVitalRatings(ratings);
    }, [data]);

    return (
        <div className={styles.ratingContainerDiv}>
            <div className={styles.ratingsContainer}>
                {vitalRatings}
            </div>
        </div>
    );
};

export default WebVitalRatings;
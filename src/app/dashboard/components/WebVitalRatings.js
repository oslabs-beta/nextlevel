import React, { useEffect, useState } from 'react';
import Rating from './Rating';
import styles from '../dashboard.module.css';

const WebVitalRatings = ({ data }) => {
    console.log('DATA FROM WEB VITAL RATINGS: ', data);
    const ranges = {
        //we set the upper limits, may need to adjust
        "TTFB": [0, 800, 1800, 3000],
        "LCP": [0, 2500, 4000, 7000],
        "FCP": [0, 1800, 3000, 5000],
        "FID": [0, 100, 300, 450],
        "INP": [0, 200, 500, 800],
        "CLS": [0, 0.1, 0.25, .75],
    }

    const [vitalRatings, setVitalRatings] = useState([]);

    useEffect(() => {
        // Handle the case where no data is available
        if (!data || data.length === 0) {
            // Render empty (default) values if no data is available
            setVitalRatings([
              <Rating key="TTFB" goodRange={ranges.TTFB} needsImprovementRange={ranges.TTFB} poorRange={ranges.TTFB} currentValue={null} metricType="TTFB" />,
              <Rating key="LCP" goodRange={ranges.LCP} needsImprovementRange={ranges.LCP} poorRange={ranges.LCP} currentValue={null} metricType="LCP" />,
              <Rating key="FCP" goodRange={ranges.FCP} needsImprovementRange={ranges.FCP} poorRange={ranges.FCP} currentValue={null} metricType="FCP" />,
              <Rating key="FID" goodRange={ranges.FID} needsImprovementRange={ranges.FID} poorRange={ranges.FID} currentValue={null} metricType="FID" />,
              <Rating key="INP" goodRange={ranges.INP} needsImprovementRange={ranges.INP} poorRange={ranges.INP} currentValue={null} metricType="INP" />,
              <Rating key="CLS" goodRange={ranges.CLS} needsImprovementRange={ranges.CLS} poorRange={ranges.CLS} currentValue={null} metricType="CLS" />,
            ]);
            return;
          }
        // If data is available, calculate averages and populate ratings
        const averages = {
            "TTFB": [0, 0],
            "LCP": [0, 0],
            "FCP": [0, 0],
            "FID": [0, 0],
            "INP": [0, 0],
            "CLS": [0, 0],
        }


        data.forEach(entry => {
            switch (entry.metricType) {
                case "TTFB":
                    averages["TTFB"][0] += entry.metricValue;
                    averages["TTFB"][1]++;
                    break;
                case "LCP":
                    averages["LCP"][0] += entry.metricValue;
                    averages["LCP"][1]++;
                    break;
                case "FCP":
                    averages["FCP"][0] += entry.metricValue;
                    averages["FCP"][1]++;
                    break;
                case "FID":
                    averages["FID"][0] += entry.metricValue;
                    averages["FID"][1]++;
                    break;
                case "INP":
                    averages["INP"][0] += entry.metricValue;
                    averages["INP"][1]++;
                    break;
                case "CLS":
                    averages["CLS"][0] += entry.metricValue;
                    averages["CLS"][1]++;
                    break;
                default:
                    break;
            }
        });

        const metrics = Object.keys(ranges);
        const vitals = metrics.map(metric => {
            const unrounded = averages[metric][0] / averages[metric][1];
            let val;
            if(metric === "CLS") {
                if(!unrounded) {
                    val = Math.round(unrounded);
                } else {
                    val = unrounded.toFixed(4);
                }
            } else {
                val = Math.round(unrounded);
            }
            // if (metric === "CLS") {
            //     val = unrounded ? unrounded.toFixed(4) : 0; // Default to 0 if no data
            // } else {
            //     val = Math.round(unrounded) || 0; // Default to 0 if no data
            // }
            return (
                <Rating
                    key={metric}
                    goodRange={[ranges[metric][0],ranges[metric][1]]}
                    needsImprovementRange={[ranges[metric][1],ranges[metric][2]]}
                    poorRange={[ranges[metric][2],ranges[metric][3]]}
                    currentValue={val}
                    metricType={metric}
                />
            );
        });
        setVitalRatings(vitals);
    }, [data]);


    // if (vitalRatings.length === 0) {
    //     // Fallback to empty ratings if no data or still loading
    //     return (
    //       <div className={styles.ratingContainerDiv}>
    //         <div>No Web Vital ratings available.</div> {/* Placeholder message */}
    //       </div>
    //     );
    // }

    return (
        <div className={styles.ratingContainerDiv}>
            <div className={styles.ratingsContainer}>
                {vitalRatings}
            </div>
        </div>
    );
};

export default WebVitalRatings;
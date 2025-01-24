import React, { useEffect, useState } from 'react';
// import { CategoryBar } from '@tremor/react';
import { CategoryBar } from './CategoryBar'
import styles from '../dashboard.module.css';

const Rating = ({ goodRange, needsImprovementRange, poorRange, metricType, currentValue }) => {
  // const chartRef = useRef(null);

  const [categoryBarValues, setCategoryBarValues] = useState([0, 0, 0]);

  useEffect(() => {
    // Set values for the category bar, with currentValue being null, render empty values
    const goodValue = currentValue !== null && currentValue <= goodRange[1] ? currentValue : 0;
    const needsImprovementValue = currentValue !== null && currentValue > goodRange[1] && currentValue <= needsImprovementRange[1] ? currentValue : 0;
    const poorValue = currentValue !== null && currentValue > needsImprovementRange[1] ? currentValue : 0;

    // Set the values for the CategoryBar
    setCategoryBarValues([goodValue, needsImprovementValue, poorValue]);
  }, [currentValue, goodRange, needsImprovementRange, poorRange])

  // Tooltip text based on value
  const statusText = currentValue === 0
    ? 'No Data'  // Treat 0 as "No Data"
    : currentValue <= goodRange[1]
    ? 'Great!'
    : currentValue <= needsImprovementRange[1]
    ? 'Needs Work'
    : 'Poor';

// OLD CHARTS
  // useEffect(() => {
  //   const createChart = () => {
  //     const chart = JSC.chart(chartRef.current, {
  //       debug: true,
  //       type: 'gauge',
  //       legend_visible: false,
  //       chartArea_boxVisible: true,
  //       width: 175,
  //       height: 150,
  //       defaultFont: 'Poppins, sans-serif',
  //       xAxis: {
  //         scale: { range: [0, 1], invert: true }
  //       },
  //       palette: {
  //         pointValue: '%yValue',
  //         ranges: [
  //           { value: [goodRange[0], goodRange[1]], color: '#008000' },
  //           { value: [needsImprovementRange[0], needsImprovementRange[1]], color: '#FFD221' }, 
  //           { value: [poorRange[0], poorRange[1]], color: '#FF5353' } 
  //         ]
  //       },
  //       yAxis: {
  //         defaultTick: { padding: 3, enabled: false },
  //         customTicks: [goodRange[0], goodRange[1], needsImprovementRange[1], poorRange[1]],
  //         // customTicks: [goodRange[0], poorRange[1]], // Updated customTicks to reflect correct ranges
  //         line: {
  //           width: 15,
  //           breaks_gap: 0.05,
  //           color: 'smartPalette'
  //         },
  //         scale: { range: [goodRange[0], poorRange[1]] }
  //       },
  //       defaultSeries: {
  //         opacity: 1,
  //         shape: {
  //           label: {
  //             align: 'center',
  //             verticalAlign: 'middle'
  //           }
  //         }
  //       },
  //       series: [
  //         {
  //           type: 'marker',
  //           name: 'Score',
  //           shape_label: {
  //             text: `${currentValue ? `<span style='fontWeight: bold'>${metricType !== 'CLS' ? `${currentValue} ms` : currentValue}</span>` : ''}<br/> <span style='fontSize: 12px'>${currentValue ? (currentValue <= goodRange[1] ? 'Great!' : currentValue <= needsImprovementRange[1] ? 'Needs Work' : 'Poor') : `No Data`}</span>`,
  //             style: { fontSize: 20, fontFamily: 'Poppins, sans-serif' }
  //           },
  //           defaultPoint: {
  //             tooltip: '%yValue',
  //             marker: {
  //               outline: {
  //                 width: 10,
  //                 color: 'currentColor'
  //               },
  //               fill: 'white',
  //               type: 'circle',
  //               visible: true,
  //               size: 30
  //             }
  //           },
  //           points: [[1, currentValue]]
  //         }
  //       ]
  //     });
  //   };

  //   createChart();
  // }, [poorRange, needsImprovementRange, goodRange, currentValue]);

  
  return (
    <div className={styles.ratingDiv}>
      <h2 className={styles.ratingHeading}>{metricType}</h2>
      {/* <div className={styles.ratingGauge} ref={chartRef}></div> */}
      <div className={styles.ratingBar}>
      <CategoryBar
        values={[10, 10, 20]}
        marker={{ value: 17, tooltip: "68", showAnimation: true }}
        colors={["pink", "amber", "emerald"]}
       className="mx-auto max-w-sm"
      />
        <div className={styles.statusText}>{statusText}</div>
      </div>
    </div>
  );
};

export default Rating;
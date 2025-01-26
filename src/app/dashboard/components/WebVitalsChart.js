'use client';

import React, { useEffect, useState, useRef } from 'react';
import styles from '../dashboard.module.css';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  TimeScale
} from 'chart.js';
import 'chartjs-adapter-date-fns';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  TimeScale
);

function WebVitalsChart({ webVitalsData }) {
  const chartRef = useRef(null);
  
  // Group data by metric type and get latest values
  const getLatestMetrics = (data, metricType) => {
    return data
      .filter(entry => entry.metricType === metricType)
      .sort((a, b) => new Date(b.metricDate) - new Date(a.metricDate))
      .map(entry => ({
        x: new Date(entry.metricDate),
        y: entry.metricValue
      }));
  };

  const chartData = {
    datasets: [
      {
        label: 'Time to First Byte (ms)',
        data: getLatestMetrics(webVitalsData, 'TTFB'),
        borderColor: 'rgb(75, 192, 192)',
        tension: 0.1
      },
      {
        label: 'First Contentful Paint (ms)',
        data: getLatestMetrics(webVitalsData, 'FCP'),
        borderColor: 'rgb(255, 99, 132)',
        tension: 0.1
      },
      {
        label: 'Largest Contentful Paint (ms)',
        data: getLatestMetrics(webVitalsData, 'LCP'),
        borderColor: 'rgb(54, 162, 235)',
        tension: 0.1
      },
      {
        label: 'First Input Delay (ms)',
        data: getLatestMetrics(webVitalsData, 'FID'),
        borderColor: 'rgb(153, 102, 255)',
        tension: 0.1
      },
      {
        label: 'Interaction to Next Paint (ms)',
        data: getLatestMetrics(webVitalsData, 'INP'),
        borderColor: 'rgb(255, 159, 64)',
        tension: 0.1
      }
    ]
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top',
      },
      // title: {
      //   display: true,
      //   text: 'Web Vitals Metrics'
      // }
    },
    scales: {
      x: {
        type: 'time',
        time: {
          unit: 'minute',
          tooltipFormat: 'MMM dd, yyyy HH:mm'
        },
        title: {
          display: true,
          text: 'Date/Time',
          align: 'center',
          padding: { top: 20 },
          font: {
            size: 12
          }
        }
      },
      y: {
        title: {
          display: true,
          text: 'Time (ms)'
        }
      }
    }
  };

  const downloadChart = () => {
    const chartInstance = chartRef.current;
    if (chartInstance) {
      const link = document.createElement('a');
      link.href = chartInstance.toBase64Image();
      link.download = 'web-vitals-chart.png';
      link.click();
    }
  };
  
  return (
    <div className={styles.webVitalsChartContainer}>
      <div className={styles.webVitalsChart}>
        <Line data={chartData} options={options} ref={chartRef} />
      </div>
      <button onClick={downloadChart} className={styles.downloadButton}>
        Download
      </button>
    </div>
  );
}

export default WebVitalsChart;

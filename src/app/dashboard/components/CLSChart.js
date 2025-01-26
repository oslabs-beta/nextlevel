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
import useWebVitalsData from '../hooks/useWebVitalsData';
import WebVitalsFilter from './WebVitalsFilter';

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

function CLSChart({ clsData }) {
  const chartRef = useRef(null);

  const chartData = {
    labels: clsData.map(entry => new Date(entry.metricDate)),
    datasets: [
      {
        label: 'Cumulative Layout Shift',
        data: clsData.map(entry => entry.metricValue),
        fill: false,
        borderColor: 'rgb(255,189,89)',
        tension: 0.1,
      },
    ],
  };

  const options = {
    scales: {
      x: {
        type: 'time',
        time: {
          unit: 'minute',
          tooltipFormat: 'MMM dd, yyyy HH:mm',
          displayFormats: {
            minute: 'MMM dd, yyyy HH:mm',
          },
        },
        title: {
          display: true,
          text: 'Date/Time',
          align: 'center',
          padding: { top: 10 }
        },
      },
      y: {
        title: {
          display: true,
          text: 'CLS Value',
        },
      },
    },
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
      },
    },
  };

  const downloadChart = () => {
    const chartInstance = chartRef.current;
    if (chartInstance) {
      const link = document.createElement('a');
      link.href = chartInstance.toBase64Image();
      link.download = 'cls-chart.png';
      link.click();
    }
  };

  return (
    <div className={styles.clsContainer}>
      <div className={styles.clsChartWrapper}>
        <Line data={chartData} options={options} ref={chartRef} />
      </div>
      <button onClick={downloadChart} className={styles.downloadButton}>
        Download
      </button>
    </div>
  );
}

export default CLSChart;
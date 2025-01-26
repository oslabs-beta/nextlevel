'use client';

import React, { useState, useEffect } from 'react';
import styles from '../dashboard.module.css';

function APIKey({ username }) {
  const [copySuccess, setCopySuccess] = useState('');
  const [api, setApi] = useState('');

  useEffect(() => {
    console.log('Fetching API key for username:', username);

    const apiUrl = process.env.NODE_ENV === 'development'
    ? `http://localhost:3000/onboarding/api?username=${username}`  // Local URL in dev mode
    : `https://www.nextlevel-dash.com/onboarding/api?username=${username}`;  // Production URL

    fetch(apiUrl)
    .then((res) => {
      if (!res.ok) {
        throw new Error(`HTTP error! status: ${res.status}`);
      }
      return res.json(); // not res.json() because its returning
    })
    .then((data) => {
      console.log('API key response:', data);
      setApi(data.APIkey);
    })
    .catch((error) => {
      console.error('Error fetching API key:', error);
    });
  }, [username]);

  const copyToClipboard = () => {
    navigator.clipboard.writeText(api).then(() => {
      setCopySuccess('Copied!');
      setTimeout(() => setCopySuccess(''), 2000);
    }, () => {
      setCopySuccess('Failed to copy!');
      setTimeout(() => setCopySuccess(''), 2000);
    });
  };

  return (
    <div className={styles.apiKeyContainer}>
      <h3 className={styles.apiKeyTitle}>API Key</h3>
      <div className={styles.apiKeyDisplay}>
        {api}
      </div>
      <button onClick={copyToClipboard} className={styles.filterButton}>
        {copySuccess || 'Copy'}
      </button>
    </div>
  );
}

export default APIKey;
'use client';

import React, { useState, useEffect } from 'react';
import styles from '../dashboard.module.css';

function APIKey({ username }) {
  //new code
  const [ copySuccess, setCopySuccess ] = useState('');
  const [ api, setApi ] = useState('');

  useEffect(() => {

    const apiUrl = process.env.NODE_ENV === 'development'
    ? `http://localhost:3000/onboarding/api?username=${username}`  // Local URL in dev mode
    : `https://www.nextlevel-dash.com/onboarding/api?username=${username}`;  // Production URL

    fetch(apiUrl)
    .then((res) => {
      if (res.ok) {
        // console.log('res:', res);
        return res.json(); // not res.json() because its returning
      }
    })
    .then((data) => {
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
    <div className={styles.apiContainer}>
      <h3 id="apiTitle">API Key</h3>
      <input
        type="text"
        value={api}
        readOnly
        className={styles.apiCodeInput}
      />
      <button onClick={copyToClipboard} className={styles.copyButton}>
        Copy
      </button>
      {copySuccess && <span className={styles.copySuccess}>{copySuccess}</span>}
    </div>
  );
}

export default APIKey;
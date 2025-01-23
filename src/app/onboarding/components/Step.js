'use client';

import React, { useEffect, useState } from 'react';
import CodeBox from './CodeBox';
import styles from '../Onboarding.module.css';

const Step = ({ stepNumber, title, description, code, language, api, username }) => {
  const [APIkey, setAPIkey] = useState('');
  
  useEffect(() => {
    if(api === true) {
      // Determine API URL based on the environment
      const apiUrl = process.env.NODE_ENV === 'development'
        ? `http://localhost:3000/onboarding/api?username=${username}`  // Local API for dev
        : `https://www.nextlevel-dash.com/onboarding/api?username=${username}`;  // Production API URL
      
      fetch(apiUrl)
      .then((res) => {
        if (res.ok) {
          // console.log('res:', res);
          return res.json(); // Parse the JSON response
        }
      })
      .then((data) => {
        // console.log('API key in onboardin page:', data.APIkey);
        setAPIkey(data.APIkey); // Set the API key in state
      })
      .catch((error) => {
        console.error('Error fetching API key:', error);
      });
    }
  }, [username, api]);
  
  const formattedCode = code.split('\n').map((line, index) => (
    <span key={index}>{line}<br /></span>
  ));

  return (
    <div>
      {stepNumber && <h2>Step {stepNumber}: {title}</h2>}
      <p className={styles.description}>{description}</p>
      <CodeBox fileName={language} codeText={code} formattedCode={formattedCode} />
      {api === true && <CodeBox fileName="API Key" formattedCode={APIkey} />}
    </div>
  );
};

export default Step;
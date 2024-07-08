#!/usr/bin/env node
// makes this the entry point for command line argument

const { exec } = require('child_process');
const { sendToApi } = require('./sendToApi');

// function that will run next build and collect data, sending to api
const bundleBuildAnalyzer = () => {
  const apiKey = process.env.API_KEY;
  const buildURL = `http://localhost:3000/dashboard/api/build`;
  const bundleURL = `http://localhost:3000/dashboard/api/bundle`;

  // use exec to run next build and get next bundle analyzer terminal output
  const command = 'ANALYZE=true next build';
  const startTime = Date.now(); // start time before execution
  exec(command, (error, stdout) => {
    if (error) {
      console.error(`error in exec: ${error}`);
      return;
    }
    // compute and send the build time to build time endpoint
    const endTime = Date.now(); // end time after execution has finished
    const buildTime = endTime - startTime;
    console.log('Build time:', buildTime);
    sendToApi({buildTime}, buildURL);

    //bundle analyzer data is console logged in stdout
    const bundleLog = stdout;
    sendToApi({bundleLog}, bundleURL);
  });
}

bundleBuildAnalyzer();
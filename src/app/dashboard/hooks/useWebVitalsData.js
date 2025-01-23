'use client';

async function fetchWebVitals (username, metricType, startDate, endDate) {
  const baseUrl = process.env.NODE_ENV === 'production'
  ? `https://www.nextlevel-dash.com/dashboard/api/webvitals?username=${username}&metricType=${metricType}&start=${startDate}&end=${endDate}`
  : `http://localhost:3000/dashboard/api/webvitals?username=${username}&metricType=${metricType}&start=${startDate}&end=${endDate}`;

  try {
    // const res = await fetch(`https://www.nextlevel-dash.com/dashboard/api/webvitals?username=${username}&metricType=${metricType}&start=${startDate}&end=${endDate}`);
    // const res = await fetch(`http://localhost:3000/dashboard/api/webvitals?username=${username}&metricType=${metricType}&start=${startDate}&end=${endDate}`);
    const res = await fetch(baseUrl);
      if (res.ok) {
        // console.log('Res from useWebVitalsData:', res);
        const resData = await res.json();
        // console.log('Data from useWebVitalsData:', resData);
        return resData;  //array of obj with all metric types
      } else {
        console.error('Response not ok');
        return [];
      }
  } catch (error) {
    console.error('Error fetching web vitals', error);
    return [];
  }
}

const useWebVitalsData = async (username, startDate, endDate) => {
  // console.log('entering use effect useWebVitalsData for:', username);
  const metricTypes = ['FCP', 'LCP', 'TTFB', 'FID', 'INP', 'CLS'];

  try {
    const metricsCombined = await Promise.all(
      metricTypes.map(async (metricType) => {
        const data = await fetchWebVitals(username, metricType, startDate, endDate);
        if (data.length === 0) {
          // Return a default value for metrics that have no data
          return [{
            metricType,
            metricValue: 0,  // Default value when no data is found
            timestamp: startDate,  // Just a placeholder timestamp, you can adjust it as needed
          }];
        }
        return data;
      })
    );
    // console.log('Metrics Combined:', metricsCombined.flat());
    return metricsCombined.flat(); // Flatten the array of arrays into a single array
  } catch (error) {
    console.error('Error in useWebVitals:', error);
    return []; // Return an empty array in case of any errors
  }
};

export default useWebVitalsData; 
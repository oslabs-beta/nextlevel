'use client';

import React, { useEffect, useState } from 'react';

const useBundleData = async (username) => {
  // console.log('entering use effect usebundledata for:', username);

  const baseUrl = process.env.NODE_ENV === 'development'
  ? 'http://localhost:3000/dashboard/api/bundle'  // Local API for dev
  : 'https://www.nextlevel-dash.com/dashboard/api/bundle';  // Production API URL

  try {
    const res = await fetch(`${baseUrl}?username=${username}`);
    // const res = await fetch(`http://localhost:3000/dashboard/api/bundle?username=${username}`);
    if (res.ok) {
      // console.log('res from useBundleData:', res);
      const data = await res.json();
      // console.log('Data from useBundleData:', data);
      return data;
    } else {
      console.error('Response not ok');
      return null;
    }
  } catch (error) {
    console.error('Error fetching bundle log:', error);
    return null;
  }
};

export default useBundleData;
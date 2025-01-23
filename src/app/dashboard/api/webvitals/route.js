import dbConnect from '../../../lib/connectDB.js';
import User from '../../../models/User.js';
import { NextResponse } from 'next/server';

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const username = searchParams.get('username');
    const metricType = searchParams.get('metricType');
    const start = searchParams.get('start');
    const end = searchParams.get('end');

    console.log("Received username:", username);  // Log the received username
  
    if (!username || !metricType || !start || !end) {
      return NextResponse.json({ message: 'Username, metric type, start date, and end date are required' }, { status: 400 });
    }
    const startDate = new Date(start);
    const endDate = new Date(end);

    const foundUser = await User.findOne({ username });

    if (!foundUser) {
      return NextResponse.json({ message: "User not found in web vitals route" }, { status: 404 });
    }
    const metricData = [];

    // Get the metric data from the user's document based on metric type
    const metrics = foundUser[metricType] || [];

    const filteredMetrics = metrics.filter(metric => {
      const metricDate = new Date(metric.metricDate);
      return metricDate >= startDate && metricDate <= endDate;
    });

    // If no data is found for the metric, return default value
    if (filteredMetrics.length === 0) {
      metricData.push({
        metricType,
        metricValue: 0,  // Default value for no data
        timestamp: startDate,  // Placeholder timestamp
      });
    } else {
      metricData.push(...filteredMetrics);
    }

    return NextResponse.json(metricData, { status: 200 });
  } catch (error) {
    // console.error(error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}


export async function POST(request) {
  await dbConnect();
  try {
    const { metricType, metricValue, apiKey } = await request.json();
    // console.log('API key:', apiKey);

    if (!metricType || !metricValue || !apiKey) {
      return NextResponse.json({ message: 'Missing infromation in the web vitals post' }, { status: 400 });
    }

    // console.log('going into try web vitals post')
    const user = await User.findOne({ APIkey: apiKey });
    // console.log('User:', user);
    
    if (!user) { 
      return NextResponse.json({ message: 'API key was not found' }, { status: 409 });
    }
    // maybe make new schema with buildDate
    const newMetric = {
      metricType,
      metricValue,
      metricDate: Date.now()
    }
    user[metricType].push(newMetric);
    
    await user.save();

    return NextResponse.json({ message: 'Web vitals updated successfully'}, { status: 201 });
  } catch (error) {
    // console.error(error);
    return NextResponse.json({ message: `Internal server error in web vitals post request ${error}` }, { status: 500 });
  }
}

import { NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import dbConnect from '../../lib/connectDB';
import User from '../../models/User';

export async function POST(req) {
  const { username, password } = await req.json();
  console.log('Login attempt with:', { username });  // Don't log passwords

  if (!username || !password) {
    console.log('Missing fields:', { username: !!username, password: !!password });
    return NextResponse.json(
      { message: 'Missing required fields' },
      { status: 400 }
    );
  }

  await dbConnect();

  try {
    const user = await User.findOne({
      $or: [
        { username: username },
        { email: username }
      ]
    });
    
    // Add detailed debugging
    console.log('User record:', {
      id: user?._id,
      email: user?.email,
      username: user?.username,
      hasPassword: !!user?.password,
      fields: user ? Object.keys(user.toObject()) : [],
      createdAt: user?.createdAt
    });

    if (!user) {
      return NextResponse.json(
        { message: 'Invalid username or password' },
        { status: 401 }
      );
    }

    if (!user.password) {
      console.log('User has no password set');
      return NextResponse.json(
        { message: 'Please login with OAuth provider' },
        { status: 401 }
      );
    }

    const isPassValid = await bcrypt.compare(password, user.password);
    console.log('Password validation result:', isPassValid);

    if (!isPassValid) {
      return NextResponse.json(
        { message: 'Invalid username or password' },
        { status: 401 }
      );
    }

    return NextResponse.json(
      { message: 'Login successful', user },
      { status: 200 }
    );
  } catch (error) {
    console.error('Login error:', error);
    return NextResponse.json(
      { message: 'Internal server error' },
      { status: 500 }
    );
  }
}

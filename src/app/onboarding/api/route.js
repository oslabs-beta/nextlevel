import dbConnect from '../../lib/connectDB';
import User from '../../models/User';
import { NextResponse } from 'next/server';


export async function GET(request) {
    await dbConnect(); // Ensure database connection
    try {
        const { searchParams } = new URL(request.nextUrl);
        // const { searchParams } = new URL(request.url);
        const username = searchParams.get('username');
        console.log('Looking up API key for username:', username);

        if (!username) {
            return NextResponse.json({ message: 'Username is required' }, { status: 400 });
        }

        // Log the query we're about to make
        console.log('Database query:', { username });

        const foundUser = await User.findOne({ username });
        console.log('Found user in database:', {
            found: !!foundUser,
            username: foundUser?.username,
            email: foundUser?.email,
            APIkey: foundUser?.APIkey
        });

        if (!foundUser) {
            return NextResponse.json({ message: "User not found" }, { status: 404 });
        }

        // Log what we're sending back
        console.log('Returning API key:', foundUser.APIkey);

        return NextResponse.json({ APIkey: foundUser.APIkey }, { status: 200 });
    } catch (error) {
        console.error('Error in API key lookup:', error);
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}

export const runtime = "nodejs"; 
import dbConnect from './connectDB';
import User from '../models/User'; // Adjust the import based on your User model location
import bcrypt from 'bcryptjs';

export async function verifyCredentials(username, password) {
  // console.log('Connecting to database');
  await dbConnect();
  // console.log('Finding user by username:', username);
  
  // Try to find user by username or email
  const user = await User.findOne({
    $or: [
      { username: username },
      { email: username }
    ]
  });

  if (!user) {
    console.log('User not found');
    return null;
  }

  if (!user.password) {
    console.log('User has no password set (OAuth user)');
    return null;
  }

  // console.log('User found:', user);
  const isPassValid = await bcrypt.compare(password, user.password); // Use your specific method for comparing passwords
  if (!isPassValid) {
    console.log('Password is invalid');
    return null;
  }

  console.log('Password is valid');
  return {
    id: user._id.toString(),
    name: user.username,
    email: user.email,
    username: user.username,
    APIkey: user.APIkey
  };
}

'use client';

import React from 'react';
import { useState } from 'react';
import './login.css';
import { FaCircleUser } from 'react-icons/fa6';
import { Si1Password } from 'react-icons/si';
import { FcGoogle } from 'react-icons/fc';
import { IoLogoGithub } from 'react-icons/io';
import { AiOutlineGoogle } from 'react-icons/ai';
import Link from 'next/link';

export default function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
      });

      if (response.ok) {
        setSuccess(true);
        setError('');
        setUsername('');
        setPassword('');
        window.location.href = '/dashboard';
      } else {
        const errorData = await response.json();
        setError(errorData.message);
        setSuccess(false);
      }
    } catch (err) {
      setError('An error occurred. Please try again.');
      setSuccess(false);
    }
  };

  return (
    <body>
      <div className="wrapper">
        <form onSubmit={handleSubmit}>
          <div className="logo-container">
            <img src="./TransparentIcon.png" alt="Logo" className="logo" />
            <h1>NextLevel</h1>
          </div>
          <div className="input-box">
            <input type="text" placeholder="Username" value = {username} onChange = {(e) => setUsername(e.target.value)} required />
            <FaCircleUser className="icon" />
          </div>
          <div className="input-box">
            <input type="password" placeholder="Password"value = {password} onChange = {(e) => setPassword(e.target.value)} required />
            <Si1Password className="icon" />
          </div>

          <div className="remember-forgot">
            <label>
              <input type="checkbox" /> Remember me
            </label>
            <a href="#">Forgot password?</a>
          </div>
          <button type="submit"> Login </button>
          {error && (
            <p className="message" style={{ color: 'red' }}>
              {error}
            </p>
          )}
          {success && (
            <p className="message" style={{ color: 'green' }}>
              Login successful!
            </p>
          )}

          <div className="oauth-link">
            <Link href="/Oauth">
              <button type="button" className="oauth-button">
                <AiOutlineGoogle className="google-icon" />
              </button>
            </Link>
            <Link href="/Oauth">
              <button type="button" className="oauth-button">
                <IoLogoGithub className="github-icon" />
              </button>
            </Link>
          </div>

          <div className="register-link">
            <p>
              Don't have an account? <Link href="/signup">Register</Link>
            </p>
          </div>
        </form>
      </div>
    </body>
  );
}

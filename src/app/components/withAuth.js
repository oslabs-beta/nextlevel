'use client';

import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import Spinner from './Spinner';

const withAuth = (WrappedComponent) => {
  return function WithAuthComponent(props) {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [loading, setLoading] = useState(true);
    const router = useRouter();

    useEffect(() => {
      const checkAuth = async () => {
        try {
          // First check URL parameters
          const urlParams = new URLSearchParams(window.location.search);
          const username = urlParams.get('username');
          
          if (username) {
            setIsAuthenticated(true);
            setLoading(false);
            return;
          }

          // If no username in URL, check NextAuth session
          const response = await fetch('/api/auth/session');
          const session = await response.json();

          if (session?.user) {
            setIsAuthenticated(true);
          } else {
            router.push('/login');
          }
        } catch (error) {
          console.error('Auth check failed:', error);
          router.push('/login');
        } finally {
          setLoading(false);
        }
      };

      checkAuth();
    }, [router]);

    if (loading) {
      return <Spinner />;
    }

    if (!isAuthenticated) {
      return null;
    }

    return <WrappedComponent {...props} />;
  };
};

export default withAuth;



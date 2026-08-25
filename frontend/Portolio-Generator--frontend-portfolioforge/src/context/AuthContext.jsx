import React, { createContext, useContext, useState, useCallback } from 'react';
import authService from '../services/authService';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    try {
      const stored = sessionStorage.getItem('pf_user');
      return stored ? JSON.parse(stored) : null;
    } catch { return null; }
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const isAuthenticated = !!user;
  const isAdmin = user?.role === 'admin';

  const login = useCallback(async (email, password) => {
    setLoading(true);
    setError('');
    try {
      const result = await authService.login(email, password);
      setUser(result);
      sessionStorage.setItem('pf_user', JSON.stringify(result));
      return result;
    } catch (err) {
      setError(err.message || 'Login failed');
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  const signup = useCallback(async (name, email, password) => {
    setLoading(true);
    setError('');
    try {
      const result = await authService.signup(name, email, password);
      setUser(result);
      sessionStorage.setItem('pf_user', JSON.stringify(result));
      return result;
    } catch (err) {
      setError(err.message || 'Signup failed');
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  const logout = useCallback(() => {
    setUser(null);
    sessionStorage.removeItem('pf_user');
  }, []);

  return (
    <AuthContext.Provider value={{ user, isAuthenticated, isAdmin, loading, error, login, signup, logout, setError }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be inside AuthProvider');
  return ctx;
}

import api from '../api/axiosClient';

/**
 * Centralized VELoop Daily Streak & Wallet API Service
 * All API interactions flow strictly through this module.
 */

// Streak Endpoints
export const getStreak = async () => {
  const res = await api.get('/streak/status');
  return res.data;
};

export const getStreakStatus = getStreak;

export const claimStreak = async () => {
  const res = await api.post('/streak/claim');
  return res.data;
};

export const getHistory = async () => {
  const res = await api.get('/streak/history');
  return res.data;
};

// Wallet & Ledger Endpoints
export const getWallet = async () => {
  const res = await api.get('/wallet/summary');
  return res.data;
};

export const getLedger = async (page = 1, limit = 20) => {
  const res = await api.get(`/wallet/ledger?page=${page}&limit=${limit}`);
  return res.data;
};

// Authentication Endpoints
export const login = async (email, password) => {
  const res = await api.post('/auth/login', { email, password });
  return res.data;
};

export const register = async (name, email, password) => {
  const res = await api.post('/auth/register', { name, email, password });
  return res.data;
};

export const demoLogin = async () => {
  const res = await api.post('/auth/demo-login');
  return res.data;
};

export const getMe = async () => {
  const res = await api.get('/auth/me');
  return res.data;
};

const streakApi = {
  getStreak,
  getStreakStatus,
  claimStreak,
  getHistory,
  getWallet,
  getLedger,
  login,
  register,
  demoLogin,
  getMe
};

export default streakApi;

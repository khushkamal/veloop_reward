import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import streakApi from '../services/streakApi';
import { playClaimSuccessSound, playGrandFanfareSound } from '../utils/audioEffects';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [streakStatus, setStreakStatus] = useState(null);
  const [wallet, setWallet] = useState(null);
  const [loading, setLoading] = useState(true);
  const [actionLoading, setActionLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchStreakStatus = useCallback(async () => {
    try {
      const res = await streakApi.getStreak();
      if (res.success) {
        setStreakStatus(res.data);
      }
    } catch (err) {
      console.error('Error fetching streak status:', err);
    }
  }, []);

  const fetchWalletSummary = useCallback(async () => {
    try {
      const res = await streakApi.getWallet();
      if (res.success) {
        setWallet(res.data);
      }
    } catch (err) {
      console.error('Error fetching wallet:', err);
    }
  }, []);

  const refreshAllData = useCallback(async () => {
    await Promise.all([fetchStreakStatus(), fetchWalletSummary()]);
  }, [fetchStreakStatus, fetchWalletSummary]);

  // Initial user check
  const checkAuth = useCallback(async () => {
    const token = localStorage.getItem('veloop_auth_token');
    if (!token) {
      setLoading(false);
      return;
    }
    try {
      const res = await streakApi.getMe();
      if (res.success) {
        setUser(res.user);
        setStreakStatus(res.streakStatus);
        await fetchWalletSummary();
      }
    } catch (err) {
      console.warn('Auth check failed, logging out:', err);
      localStorage.removeItem('veloop_auth_token');
      setUser(null);
    } finally {
      setLoading(false);
    }
  }, [fetchWalletSummary]);

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  // Auth actions
  const login = async (email, password) => {
    setError(null);
    setActionLoading(true);
    try {
      const res = await streakApi.login(email, password);
      if (res.success) {
        localStorage.setItem('veloop_auth_token', res.token);
        setUser(res.user);
        await refreshAllData();
        return { success: true };
      }
    } catch (err) {
      const msg = err.response?.data?.error || 'Login failed';
      setError(msg);
      return { success: false, error: msg };
    } finally {
      setActionLoading(false);
    }
  };

  const register = async (name, email, password) => {
    setError(null);
    setActionLoading(true);
    try {
      const res = await streakApi.register(name, email, password);
      if (res.success) {
        localStorage.setItem('veloop_auth_token', res.token);
        setUser(res.user);
        await refreshAllData();
        return { success: true };
      }
    } catch (err) {
      const msg = err.response?.data?.error || 'Registration failed';
      setError(msg);
      return { success: false, error: msg };
    } finally {
      setActionLoading(false);
    }
  };

  const demoLogin = async () => {
    setError(null);
    setActionLoading(true);
    try {
      const res = await streakApi.demoLogin();
      if (res.success) {
        localStorage.setItem('veloop_auth_token', res.token);
        setUser(res.user);
        if (res.streakStatus) setStreakStatus(res.streakStatus);
        if (res.wallet) setWallet(res.wallet);
        // Refresh silently in background just in case
        refreshAllData().catch(console.error);
        return { success: true };
      }
    } catch (err) {
      const msg = err.response?.data?.error || 'Demo login failed';
      setError(msg);
      return { success: false, error: msg };
    } finally {
      setActionLoading(false);
    }
  };

  const logout = () => {
    localStorage.removeItem('veloop_auth_token');
    setUser(null);
    setStreakStatus(null);
    setWallet(null);
  };

  // Streak claim action (completely backend authoritative)
  const claimDailyReward = async () => {
    setActionLoading(true);
    setError(null);
    try {
      const res = await streakApi.claimStreak();
      if (res.success) {
        const claimData = res.data;
        setStreakStatus(claimData.streakStatus);
        setWallet((prev) => ({
          ...prev,
          veBalance: claimData.wallet.veBalance,
          totalAmazonGCAmount: claimData.wallet.totalAmazonGCAmount,
          amazonVouchers: claimData.wallet.vouchers
        }));

        if (claimData.reward.rewardType === 'AMAZON_GC') {
          playGrandFanfareSound();
        } else {
          playClaimSuccessSound();
        }

        return { success: true, data: claimData };
      }
    } catch (err) {
      const msg = err.response?.data?.error || 'Failed to claim streak reward';
      setError(msg);
      return { success: false, error: msg, details: err.response?.data };
    } finally {
      setActionLoading(false);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        streakStatus,
        wallet,
        loading,
        actionLoading,
        error,
        login,
        register,
        demoLogin,
        logout,
        fetchStreakStatus,
        fetchWalletSummary,
        refreshAllData,
        claimDailyReward
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}

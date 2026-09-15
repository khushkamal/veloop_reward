import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import DailyStreakPage from './components/DailyStreak/DailyStreakPage';

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<DailyStreakPage />} />
      <Route path="/streak" element={<DailyStreakPage />} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

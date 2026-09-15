import React from 'react';
import Navbar from '../Navbar/Navbar';

export default function StreakHeader({ onOpenAuth, onToggleEvaluator, isEvaluatorOpen }) {
  return (
    <Navbar
      onOpenAuth={onOpenAuth}
      onToggleEvaluator={onToggleEvaluator}
      isEvaluatorOpen={isEvaluatorOpen}
    />
  );
}

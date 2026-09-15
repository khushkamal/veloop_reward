import React from 'react';
import CPADemoModal from '../CPADemoModal/CPADemoModal';

export default function CpaDemo({ isOpen, onClose, onCompleteAdDemo, nextReward, dayIndex }) {
  return (
    <CPADemoModal
      isOpen={isOpen}
      onClose={onClose}
      onCompleteAdDemo={onCompleteAdDemo}
      nextReward={nextReward}
      dayIndex={dayIndex}
    />
  );
}

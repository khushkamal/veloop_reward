import React from 'react';
import ClaimSuccessModal from '../ClaimSuccessModal/ClaimSuccessModal';

export default function ClaimModal({ claimData, onClose }) {
  return <ClaimSuccessModal claimData={claimData} onClose={onClose} />;
}

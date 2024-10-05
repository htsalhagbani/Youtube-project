
import React from 'react';

const Alert = ({ message, type, onClose }) => {
  const alertStyles = {
    success: 'bg-green-100 text-green-800',
    error: 'bg-red-100 text-red-800',
  };

  return (
    <div className={`p-4 mb-4 rounded-lg ${alertStyles[type]} flex justify-between items-center`}>
      <span>{message}</span>
      <button onClick={onClose} className="ml-4 text-lg font-bold">×</button>
    </div>
  );
};

export default Alert;

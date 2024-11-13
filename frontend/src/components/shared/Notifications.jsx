import React from 'react';

const Notification = ({ message, type, isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center px-4 py-6 pointer-events-none sm:p-6 sm:items-start sm:justify-end">
      {/* Overlay */}
      <div className="fixed inset-0 transition-opacity" aria-hidden="true">
        <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
      </div>
      {/* Notification panel, position it at the bottom of the screen */}
      <div className={`pointer-events-auto w-full max-w-sm overflow-hidden rounded-lg shadow-lg ${type === 'success' ? 'bg-green-500' : 'bg-red-500'} text-white`}>
        <div className="p-4">
          <div className="flex items-center">
            <div className="w-0 flex-1 flex justify-between">
              <p className="w-full text-sm font-medium">
                {message}
              </p>
              <button onClick={onClose} className="ml-4 flex-shrink-0 bg-transparent border-0 text-white">
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Notification;

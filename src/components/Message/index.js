import React from 'react';

const Message = ({ message }) => {
  return (
    <div className="max-w-md mx-auto">
      <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
        <p className="text-gray-700 text-sm">{message}</p>
      </div>
    </div>
  );
};

export default Message;

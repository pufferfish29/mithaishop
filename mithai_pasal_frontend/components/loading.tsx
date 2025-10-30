import React from 'react';

const Loading = () => {
  return (
    <div className="flex justify-center items-center">
      <div className="w-56 h-56 px-32 py-32 rounded-full border-t-8 border-b-8 border-red-600 animate-spin"></div>
    </div>
  );
};

export default Loading;

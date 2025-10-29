import React from 'react';

const OrangeWrapper: React.FC<{ children: React.ReactNode; className?: string }> = ({ children, className = '' }) => {
  return (
    <div className={`bg-gradient-to-b from-[#F97316] via-[#FF6E00] to-[#EA580C] p-4 md:p-8 rounded-2xl ${className}`}>
      {children}
    </div>
  );
};

export default OrangeWrapper;
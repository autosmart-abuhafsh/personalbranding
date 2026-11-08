import React from 'react';

interface MonogramLogoProps {
  size?: 'sm' | 'md' | 'lg' | 'xl';
  className?: string;
}

export const MonogramLogo: React.FC<MonogramLogoProps> = ({ size = 'md', className = '' }) => {
  const dimensions = {
    sm: 'w-8 h-8',
    md: 'w-10 h-10',
    lg: 'w-14 h-14',
    xl: 'w-20 h-20',
  }[size];

  return (
    <svg
      viewBox="0 0 64 64"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`${dimensions} shrink-0 select-none ${className}`}
      aria-hidden="true"
    >
      <rect width="64" height="64" rx="14" fill="#0A1020" />
      <rect
        x="1.5"
        y="1.5"
        width="61"
        height="61"
        rx="12.5"
        stroke="#D5B47A"
        strokeOpacity="0.4"
        strokeWidth="1.5"
      />
      <path
        d="M14.5 46L25 18H30L40.5 46H35.3L32.9 39.2H22.1L19.7 46H14.5ZM23.7 34.6H31.3L27.5 23.6L23.7 34.6Z"
        fill="#F4F4F5"
      />
      <path d="M36.5 18H41.5V29.5H48.5V18H53.5V46H48.5V34H41.5V46H36.5V18Z" fill="#D5B47A" />
      <circle cx="51" cy="14" r="2.5" fill="#78263F" />
    </svg>
  );
};

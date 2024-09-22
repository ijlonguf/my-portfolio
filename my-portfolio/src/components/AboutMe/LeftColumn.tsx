// components/AboutMe/LeftColumn.tsx

import React from 'react';
import Image from 'next/image';

const LeftColumn: React.FC = () => {
  return (
    <div className="w-2/5 h-full relative hidden md:block">
      <Image
        src="https://via.placeholder.com/500"
        alt="Your Portrait"
        layout="fill"
        objectFit="cover"
        objectPosition="center"
        priority
        className="rounded-tr-lg rounded-br-lg"
      />
    </div>
  );
};

export default LeftColumn;
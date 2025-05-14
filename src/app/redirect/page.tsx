'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function RedirectPage(url: string) {
  const router = useRouter();

  useEffect(() => {
   
   setInterval(() => {
    router.push(url);
   }, 1000);
  }, [router]);

  return (
    <div className="flex flex-col items-center justify-center space-y-6 py-8">
      <div className="relative">
        {/* <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-24 h-24 rounded-full border-4 border-blue-200 animate-pulse"></div>
        </div> */}
        <div className="relative">
          <div className="w-16 h-16 rounded-full border-4 border-blue-600 border-t-transparent animate-spin"></div>
        </div>
      </div>
      
      <div className="text-center space-y-2">
        <h2 className="text-2xl font-semibold text-gray-800 animate-fade-in">
          Redirecting...
        </h2>
        <p className="text-gray-500 animate-fade-in-delay">
          Please wait while we take you to your destination
        </p>
      </div>

      <div className="flex space-x-2">
        <div className="w-2 h-2 rounded-full bg-blue-600 animate-bounce" style={{ animationDelay: '0ms' }}></div>
        <div className="w-2 h-2 rounded-full bg-blue-600 animate-bounce" style={{ animationDelay: '150ms' }}></div>
        <div className="w-2 h-2 rounded-full bg-blue-600 animate-bounce" style={{ animationDelay: '300ms' }}></div>
      </div>
    </div>
  );
}

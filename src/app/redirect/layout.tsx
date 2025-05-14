import { ReactNode } from 'react';

interface RedirectLayoutProps {
  children: ReactNode;
}

export default function RedirectLayout({ children }: RedirectLayoutProps) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="backdrop-blur-sm bg-white/80 rounded-2xl shadow-xl p-8 border border-white/20">
          {children}
        </div>
      </div>
    </div>
  );
}

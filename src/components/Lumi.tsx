'use client';

interface LumiProps {
  message: string;
  size?: 'sm' | 'lg';
}

export default function Lumi({ message, size = 'sm' }: LumiProps) {
  const moonSize = size === 'lg' ? 'w-16 h-16' : 'w-10 h-10';

  return (
    <div className="flex items-start gap-3 animate-fade-in">
      {/* Moon SVG */}
      <div className={`${moonSize} flex-shrink-0 animate-float`}>
        <svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
          {/* Glow halo */}
          <circle cx="32" cy="32" r="30" fill="#f5a35a" opacity="0.08" />
          <circle cx="32" cy="32" r="24" fill="#f5a35a" opacity="0.12" />
          
          {/* Crescent body */}
          <path
            d="M44 32c0 11-7.2 20-16 20s-16-9-16-20 7.2-20 16-20c-4.8 4-8 11.2-8 20s3.2 16 8 20"
            fill="#f5a35a"
          />
          <circle cx="32" cy="32" r="18" fill="#f5a35a" />
          <circle cx="40" cy="32" r="16" fill="#1a1424" />
          
          {/* Sleepy face on the crescent */}
          {/* Left eye - closed/sleepy */}
          <path
            d="M24 30c1.5-1 3-1 4.5 0"
            stroke="#1a1424"
            strokeWidth="1.8"
            strokeLinecap="round"
          />
          {/* Right eye - closed/sleepy */}
          <path
            d="M30 28c1.5-1 3-1 4.5 0"
            stroke="#1a1424"
            strokeWidth="1.8"
            strokeLinecap="round"
          />
          {/* Tiny smile */}
          <path
            d="M26 35c1.5 1.5 4 1.5 5.5 0"
            stroke="#1a1424"
            strokeWidth="1.5"
            strokeLinecap="round"
          />
          {/* Rosy cheek */}
          <circle cx="24" cy="34" r="1.5" fill="#e87a8c" opacity="0.6" />
        </svg>
      </div>

      {/* Speech bubble */}
      <div className="relative bg-night-800 border border-night-700 rounded-2xl rounded-tl-sm px-4 py-3 max-w-sm shadow-lg">
        <p className="text-cream-200 text-sm font-serif italic leading-relaxed">
          {message}
        </p>
      </div>
    </div>
  );
}

import React, { useEffect } from 'react';

interface AdContainerProps {
  slotId?: string;
  className?: string;
  type?: 'header' | 'sidebar' | 'content' | 'footer';
}

export default function AdContainer({ slotId = '1234567890', className = '', type = 'content' }: AdContainerProps) {
  useEffect(() => {
    try {
      // @ts-ignore
      (window.adsbygoogle = window.adsbygoogle || []).push({});
    } catch (err) {
      console.error('AdSense error', err);
    }
  }, []);

  const dimensions = {
    header: 'min-h-[90px] max-w-[970px]',
    sidebar: 'min-h-[250px] w-full max-w-[300px]',
    content: 'min-h-[250px] w-full',
    footer: 'min-h-[90px] max-w-[728px]',
  };

  return (
    <div className={`ad-container my-[20px] mx-auto min-h-[90px] bg-[#f5f5f5] border border-[#ddd] flex justify-center items-center relative overflow-hidden ${dimensions[type]} ${className}`} data-ad-status="unfilled" aria-label="Advertisement Placeholder">
      <span className="absolute top-2 left-2 text-[10px] text-slate-400 font-bold uppercase tracking-widest z-10">Advertisement</span>
      <ins className="adsbygoogle w-full"
           style={{ display: 'block' }}
           data-ad-client="ca-PUB-YOUR_CLIENT_ID"
           data-ad-slot={slotId}
           data-ad-format="auto"
           data-full-width-responsive="true"></ins>
    </div>
  );
}

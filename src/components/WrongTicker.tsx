import React from 'react';

export function WrongTicker({ items }: { items: string[] }) {
  if (!items.length) return null;
  const text = items.join('   •   ');
  return (
    <div className="ticker" aria-label="wrong-items-ticker">
      <div className="tickerTrack">
        <div className="tickerText">{text}</div>
        <div className="tickerText" aria-hidden="true">{text}</div>
      </div>
    </div>
  );
}

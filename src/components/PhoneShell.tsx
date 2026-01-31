import React from 'react';

export function PhoneShell({ children }: { children: React.ReactNode }) {
  return (
    <div className="appBg">
      <div className="phone">
        <div className="phoneInner">{children}</div>
      </div>
    </div>
  );
}

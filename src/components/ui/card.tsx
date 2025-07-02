import * as React from 'react';

export function Card({ children, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return <div className="rounded-lg border bg-white p-4 shadow" {...props}>{children}</div>;
}

export function CardContent({ children, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return <div className="p-2" {...props}>{children}</div>;
}


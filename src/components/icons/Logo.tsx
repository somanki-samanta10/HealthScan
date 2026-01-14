import { cn } from '@/lib/utils';
import { type SVGProps } from 'react';

export function Logo(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={cn('h-6 w-6', props.className)}
      {...props}
    >
      <title>HealthyScan Logo</title>
      <path d="M15.5 15.5L19 19" />
      <path d="M5 11a7 7 0 1 0 14 0 7 7 0 1 0-14 0z" />
      <path d="M8 11s1.5-2 4-2 4 2 4 2" />
      <path d="M9 14s1-1 3-1 3 1 3 1" />
      <path d="M12 7c-3.87 0-7 3.13-7 7" />
    </svg>
  );
}

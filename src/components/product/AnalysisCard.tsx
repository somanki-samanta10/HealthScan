import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { cn } from '@/lib/utils';
import type { LucideIcon } from 'lucide-react';

interface AnalysisCardProps {
  title: string;
  icon: LucideIcon;
  children: React.ReactNode;
  variant?: 'default' | 'warning';
}

export function AnalysisCard({
  title,
  icon: Icon,
  children,
  variant = 'default',
}: AnalysisCardProps) {
  const cardClasses = cn({
    'bg-accent/20 border-accent': variant === 'warning',
  });
  
  const titleClasses = cn('flex items-center gap-2', {
    'text-accent-foreground': variant === 'warning',
  });

  return (
    <Card className={cardClasses}>
      <CardHeader>
        <CardTitle className={titleClasses}>
          <Icon size={20} /> {title}
        </CardTitle>
      </CardHeader>
      <CardContent className="text-sm text-foreground/80">
        {children}
      </CardContent>
    </Card>
  );
}

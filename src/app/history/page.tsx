import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { mockScanHistory } from '@/lib/mock-data';
import Image from 'next/image';
import Link from 'next/link';
import type { VariantProps } from 'class-variance-authority';
import { badgeVariants } from '@/components/ui/badge';

type BadgeVariants = VariantProps<typeof badgeVariants>;

function getHealthBadge(score: number): {
  variant: BadgeVariants['variant'];
  text: string;
} {
  if (score >= 70) {
    return { variant: 'default', text: 'Beneficial' };
  }
  if (score < 40) {
    return { variant: 'destructive', text: 'Harmful' };
  }
  return { variant: 'secondary', text: 'Neutral' };
}

export default function HistoryPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="space-y-2 mb-8">
        <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl font-headline">
          Scan History
        </h1>
        <p className="text-muted-foreground">
          Review your previously scanned products.
        </p>
      </div>

      {mockScanHistory.length === 0 ? (
        <div className="flex h-64 items-center justify-center rounded-lg border-2 border-dashed">
          <p className="text-muted-foreground">Your scan history is empty.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {mockScanHistory.map((item) => {
            const healthBadge = getHealthBadge(item.healthScore);
            return (
              <Link href={`/product/${item.barcode}`} key={item.barcode}>
                <Card className="flex h-full flex-col overflow-hidden transition-all hover:shadow-lg hover:-translate-y-1">
                  <CardHeader className="p-0">
                    <div className="relative aspect-square w-full">
                      <Image
                        src={item.imageUrl}
                        alt={item.name}
                        fill
                        className="object-cover"
                        data-ai-hint={item.imageHint}
                      />
                    </div>
                  </CardHeader>
                  <CardContent className="flex-1 p-4">
                    <h3 className="font-semibold line-clamp-2">{item.name}</h3>
                  </CardContent>
                  <CardFooter className="p-4 pt-0">
                    <div className="flex w-full items-center justify-between">
                       <span className="text-sm text-muted-foreground">Health Score</span>
                       <Badge variant={healthBadge.variant}>{item.healthScore}</Badge>
                    </div>
                  </CardFooter>
                </Card>
              </Link>
            );
          })}
        </div>
      )}
    </div>
  );
}

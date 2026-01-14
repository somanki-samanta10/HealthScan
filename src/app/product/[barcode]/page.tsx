import { Suspense } from 'react';
import { getProductData } from '@/lib/openfoodfacts';
import { explainHealthImpact, type ExplainHealthImpactOutput } from '@/ai/flows/explain-health-impact';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { AlertTriangle, BadgeCheck, BadgeHelp, Bot, Info, ShieldAlert } from 'lucide-react';
import Image from 'next/image';
import { Badge } from '@/components/ui/badge';
import type { VariantProps } from 'class-variance-authority';
import { badgeVariants } from '@/components/ui/badge';
import { HealthScoreGauge } from '@/components/product/HealthScoreGauge';
import { AnalysisCard } from '@/components/product/AnalysisCard';
import { Skeleton } from '@/components/ui/skeleton';
import { PlaceHolderImages } from '@/lib/placeholder-images';

type BadgeVariants = VariantProps<typeof badgeVariants>;

function getHealthBadge(score: number): {
  variant: BadgeVariants['variant'];
  text: string;
  icon: React.ElementType;
} {
  if (score >= 70) {
    return { variant: 'default', text: 'Beneficial', icon: BadgeCheck };
  }
  if (score < 40) {
    return { variant: 'destructive', text: 'Harmful', icon: ShieldAlert };
  }
  return { variant: 'secondary', text: 'Neutral', icon: BadgeHelp };
}

async function HealthAnalysis({ ingredients, nutritionData }: { ingredients: string; nutritionData: string; }) {
  let analysis: ExplainHealthImpactOutput | null = null;
  let error: string | null = null;

  try {
    analysis = await explainHealthImpact({ ingredients, nutritionData });
  } catch (e) {
    console.error("AI analysis failed:", e);
    error = "Could not analyze the product's health impact at this time.";
  }

  if (error) {
    return (
      <Card className="bg-destructive/10 border-destructive">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-destructive">
            <AlertTriangle size={20} /> Analysis Failed
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p>{error}</p>
        </CardContent>
      </Card>
    );
  }
  
  if (!analysis) return null;
  
  const healthBadge = getHealthBadge(analysis.healthScore);
  const HealthBadgeIcon = healthBadge.icon;

  return (
    <div className="grid md:grid-cols-2 gap-6">
      <Card className="flex flex-col items-center justify-center p-6">
        <HealthScoreGauge score={analysis.healthScore} />
        <div className="mt-4 text-center">
            <Badge variant={healthBadge.variant} className="text-lg px-4 py-1">
                <HealthBadgeIcon className="mr-2 h-5 w-5" />
                {healthBadge.text}
            </Badge>
        </div>
      </Card>
      
      <div className="space-y-6">
        <AnalysisCard title="AI Health Summary" icon={Bot}>
            <p>{analysis.explanation}</p>
        </AnalysisCard>

        {analysis.warnings && (
            <AnalysisCard title="Warnings" icon={Info} variant="warning">
                <p>{analysis.warnings}</p>
            </AnalysisCard>
        )}
      </div>
    </div>
  );
}

function AnalysisSkeleton() {
    return (
        <div className="grid md:grid-cols-2 gap-6">
            <Card className="flex flex-col items-center justify-center p-6">
                <Skeleton className="h-48 w-48 rounded-full" />
                <Skeleton className="h-8 w-32 mt-4" />
            </Card>
            <div className="space-y-6">
                <Card>
                    <CardHeader><Skeleton className="h-6 w-40" /></CardHeader>
                    <CardContent className="space-y-2">
                        <Skeleton className="h-4 w-full" />
                        <Skeleton className="h-4 w-full" />
                        <Skeleton className="h-4 w-5/6" />
                    </CardContent>
                </Card>
                 <Card>
                    <CardHeader><Skeleton className="h-6 w-32" /></CardHeader>
                    <CardContent className="space-y-2">
                        <Skeleton className="h-4 w-full" />
                        <Skeleton className="h-4 w-2/3" />
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}

export default async function ProductPage({ params }: { params: { barcode: string } }) {
  const { product, error } = await getProductData(params.barcode);

  if (!product) {
    const notFoundImage = PlaceHolderImages.find(p => p.id === 'product-not-found');
    return (
      <div className="container mx-auto flex-1 py-12 text-center">
        <div className="max-w-md mx-auto">
            {notFoundImage && (
                 <Image
                    src={notFoundImage.imageUrl}
                    alt="Product not found"
                    width={200}
                    height={200}
                    className="mx-auto mb-6 rounded-lg opacity-70"
                    data-ai-hint={notFoundImage.imageHint}
                />
            )}
            <h2 className="text-2xl font-bold font-headline">Product Not Found</h2>
            <p className="text-muted-foreground mt-2">{error || `We couldn't find a product with the barcode ${params.barcode}.`}</p>
        </div>
      </div>
    );
  }

  const ingredients = product.ingredients_text_en || product.ingredients_text || '';
  const nutritionData = Object.entries(product.nutriments)
    .filter(([, value]) => value !== '' && value !== null)
    .map(([key, value]) => `${key.replace(/_/g, ' ')}: ${value}${product.nutriments[`${key}_unit`] || ''}`)
    .slice(0, 30) // Limit to prevent overly long strings
    .join(', ');

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid lg:grid-cols-3 gap-8">
        <div className="lg:col-span-1">
          <Card className="sticky top-20">
            <CardContent className="p-4">
              <div className="relative aspect-square w-full mb-4 rounded-lg overflow-hidden">
                <Image
                  src={product.image_url || 'https://picsum.photos/seed/default/400/400'}
                  alt={product.product_name || 'Product Image'}
                  fill
                  className="object-contain"
                  data-ai-hint="product package"
                />
              </div>
              <h1 className="text-2xl font-bold font-headline">{product.product_name_en || product.product_name}</h1>
              <p className="text-muted-foreground">{product.brands}</p>
            </CardContent>
          </Card>
        </div>

        <div className="lg:col-span-2 space-y-6">
            <Suspense fallback={<AnalysisSkeleton />}>
                {ingredients ? (
                    <HealthAnalysis ingredients={ingredients} nutritionData={nutritionData} />
                ) : (
                    <Card>
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                                <AlertTriangle size={20} /> Insufficient Data
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <p>We couldn't find enough ingredient information for this product to perform a health analysis.</p>
                        </CardContent>
                    </Card>
                )}
            </Suspense>

            {ingredients && (
                <Card>
                    <CardHeader>
                        <CardTitle>Ingredients</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <p className="text-sm text-muted-foreground">{ingredients}</p>
                    </CardContent>
                </Card>
            )}
        </div>
      </div>
    </div>
  );
}

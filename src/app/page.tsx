// Force GitHub first commit
'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Camera, Search } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const FormSchema = z.object({
  barcode: z
    .string()
    .min(8, 'Barcode must be at least 8 digits')
    .max(14, 'Barcode must be at most 14 digits')
    .regex(/^\d+$/, 'Barcode must contain only digits'),
});

export default function Home() {
  const router = useRouter();

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      barcode: '',
    },
  });

  function onSubmit(data: z.infer<typeof FormSchema>) {
    router.push(`/product/${data.barcode}`);
  }

  return (
    <div className="container mx-auto flex max-w-2xl flex-1 flex-col items-center justify-center px-4 py-12">
      <div className="w-full space-y-8 text-center">
        <div className="space-y-2">
          <h1 className="font-headline text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl">
            Know What You Eat
          </h1>
          <p className="text-lg text-muted-foreground">
            Get an instant health analysis of any food product.
          </p>
        </div>
        
        <Card className="w-full text-left">
            <CardHeader>
                <CardTitle>Analyze a Product</CardTitle>
            </CardHeader>
            <CardContent>
                <div className="space-y-6">
                    <Button variant="secondary" className="w-full h-16 text-lg" disabled>
                        <Camera className="mr-2 h-6 w-6" />
                        Scan with Camera
                    </Button>
                    <div className="relative">
                        <div className="absolute inset-0 flex items-center">
                            <span className="w-full border-t" />
                        </div>
                        <div className="relative flex justify-center text-xs uppercase">
                            <span className="bg-card px-2 text-muted-foreground">
                            Or enter barcode manually
                            </span>
                        </div>
                    </div>
                    <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                        <FormField
                        control={form.control}
                        name="barcode"
                        render={({ field }) => (
                            <FormItem>
                            <FormLabel className="sr-only">Barcode</FormLabel>
                            <FormControl>
                                <Input
                                placeholder="Enter product barcode..."
                                {...field}
                                className="h-12 text-base"
                                />
                            </FormControl>
                            <FormMessage />
                            </FormItem>
                        )}
                        />
                        <Button type="submit" className="w-full h-12 text-lg">
                            <Search className="mr-2 h-5 w-5" />
                            Analyze
                        </Button>
                    </form>
                    </Form>
                </div>
            </CardContent>
        </Card>
      </div>
    </div>
  );
}

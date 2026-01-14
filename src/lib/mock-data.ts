import type { MockScanHistoryItem } from './types';

export const mockScanHistory: MockScanHistoryItem[] = [
  {
    barcode: '737628064502',
    name: 'Cheerios',
    imageUrl: 'https://picsum.photos/seed/p1/400/400',
    imageHint: 'cereal box',
    healthScore: 85,
  },
  {
    barcode: '049000042566',
    name: 'Coca-Cola Classic',
    imageUrl: 'https://picsum.photos/seed/p2/400/400',
    imageHint: 'soda can',
    healthScore: 12,
  },
  {
    barcode: '070470144655',
    name: 'Chobani Greek Yogurt',
    imageUrl: 'https://picsum.photos/seed/p3/400/400',
    imageHint: 'yogurt cup',
    healthScore: 92,
  },
  {
    barcode: '034000041235',
    name: 'Hershey\'s Milk Chocolate Bar',
    imageUrl: 'https://picsum.photos/seed/p4/400/400',
    imageHint: 'chocolate bar',
    healthScore: 35,
  },
];

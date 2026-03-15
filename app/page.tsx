import type { Metadata } from 'next';
import { LandingClient } from '@/components/LandingClient';

export const metadata: Metadata = {
  title: 'Respo Caravan | Compact Camping Trailers',
  description:
    'One camper. Different life scenarios. Respo Caravan — compact camping trailers for those who value freedom, comfort, and modern design.',
  openGraph: {
    title: 'Respo Caravan | Compact Camping Trailers',
    description:
      'One camper. Different life scenarios. Respo Caravan — compact camping trailers for freedom, comfort, and modern design.',
  },
};

export default function LandingPage() {
  return <LandingClient />;
}

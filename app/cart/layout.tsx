import { Metadata } from 'next';

const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://store-sample.com';

export const metadata: Metadata = {
  title: 'Shopping Cart - Store Sample',
  description: 'Review your shopping cart and proceed to checkout',
  alternates: {
    canonical: `${baseUrl}/cart`,
  },
  openGraph: {
    type: 'website',
    title: 'Shopping Cart - Store Sample',
    description: 'Review your shopping cart and proceed to checkout',
    url: `${baseUrl}/cart`,
    siteName: 'Store Sample',
  },
};

export default function CartLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}

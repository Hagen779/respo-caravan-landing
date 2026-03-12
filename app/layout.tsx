import type { Metadata } from "next";
import { Toaster } from "sonner";
import "./globals.css";

export const metadata: Metadata = {
  title: "Respo Caravan | Compact Camping Trailers",
  description:
    "One camper. Different life scenarios. Respo Caravan — compact camping trailers for those who value freedom, comfort, and modern design.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="antialiased">
        {children}
        <Toaster position="top-center" richColors />
      </body>
    </html>
  );
}

import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL('https://stratfordhousedentalpractice.co.uk'),
  title: {
    default: "Stratford House Dental Practice | Dentist in Milton Keynes",
    template: "%s | Stratford House Dental Practice"
  },
  description: "Expert dental care in Milton Keynes & Wolverton. NHS & private dentistry with latest technology. Serving Milton Keynes, Wolverton, Newport Pagnell & surrounding areas. Book your appointment today.",
  keywords: [
    "dentist milton keynes",
    "dental practice wolverton",
    "nhs dentist milton keynes",
    "private dentist milton keynes",
    "dentist near me",
    "milton keynes dentist",
    "wolverton dentist",
    "dental practice near me"
  ],
  authors: [{ name: "Stratford House Dental Practice" }],
  creator: "Stratford House Dental Practice",
  publisher: "Stratford House Dental Practice",
  openGraph: {
    type: "website",
    locale: "en_GB",
    url: "https://stratfordhousedentalpractice.co.uk",
    siteName: "Stratford House Dental Practice",
    title: "Stratford House Dental Practice | Dentist in Milton Keynes",
    description: "Expert dental care in Milton Keynes & Wolverton. NHS & private dentistry with latest technology.",
    images: [
      {
        url: "/images/hero-img.png",
        width: 1200,
        height: 630,
        alt: "Stratford House Dental Practice"
      }
    ]
  },
  twitter: {
    card: "summary_large_image",
    title: "Stratford House Dental Practice | Dentist in Milton Keynes",
    description: "Expert dental care in Milton Keynes & Wolverton. NHS & private dentistry with latest technology.",
    images: ["/images/hero-img.png"]
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`font-inter-display antialiased`}>{children}</body>
    </html>
  );
}

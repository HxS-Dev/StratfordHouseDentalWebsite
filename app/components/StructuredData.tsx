export default function StructuredData(): React.ReactElement {
  const dentalPracticeSchema = {
    "@context": "https://schema.org",
    "@type": "Dentist",
    "@id": "https://stratfordhousedentalpractice.co.uk",
    "name": "Stratford House Dental Practice",
    "url": "https://stratfordhousedentalpractice.co.uk",
    "logo": "https://stratfordhousedentalpractice.co.uk/images/logo.svg",
    "image": "https://stratfordhousedentalpractice.co.uk/images/hero-img.png",
    "description": "Expert dental care in Milton Keynes & Wolverton. NHS & private dentistry with latest technology.",
    "telephone": "+44-1908-313109",
    "email": "info@stratfordhousedentalpractice.co.uk",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "Stratford House, 20 Stratford Road",
      "addressLocality": "Wolverton",
      "addressRegion": "Milton Keynes",
      "postalCode": "MK12 5LW",
      "addressCountry": "GB"
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": 52.0644,
      "longitude": -0.8100
    },
    "openingHoursSpecification": [
      {
        "@type": "OpeningHoursSpecification",
        "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
        "opens": "09:00",
        "closes": "17:00"
      }
    ],
    "priceRange": "££",
    "paymentAccepted": "Cash, Card, NHS",
    "currenciesAccepted": "GBP",
    "areaServed": [
      {
        "@type": "City",
        "name": "Milton Keynes"
      },
      {
        "@type": "City",
        "name": "Wolverton"
      },
      {
        "@type": "City",
        "name": "Newport Pagnell"
      },
      {
        "@type": "City",
        "name": "Stony Stratford"
      }
    ],
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": 4.8,
      "reviewCount": 50
    },
    "sameAs": []
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(dentalPracticeSchema) }}
    />
  );
}

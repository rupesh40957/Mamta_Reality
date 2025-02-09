const seoConfig = {
  siteName: "Mamta Realty",
  defaultTitle: "Mamta Realty - Premier Real Estate Services in Dombivli & Kalyan  | Buy, Sell, Rent Properties",
  defaultDescription: "Mamta Realty offers expert real estate services in Dombivli and Kalyan with 15+ years of experience. Find your dream property - residential flats, commercial spaces, plots & more. Get professional property consultation, fair deals & complete assistance.",
  defaultKeywords: "Mamta Realty, Real Estate Dombivli, Property Dealer Kalyan, Residential Flats, Commercial Property, Property Consultation, Real Estate Agent, Property Deals Mumbai, Buy Property Dombivli, Rent Property Kalyan",
  defaultURL: "https://www.mamtarealty.com",
  defaultImage: "https://www.mamtarealty.com/img/mamtarealty_logo.png",
  defaultLanguage: "en",
  defaultLocale: "en_IN",
  googleVerification: "YOUR_GOOGLE_SITE_VERIFICATION_CODE",
  bingVerification: "YOUR_BING_VERIFICATION_CODE",
  breadcrumb: [
    { name: "Home", url: "/" },
    {name: "listings", url: "/listing"},
    {name: "blog", url: "/blog"},
    { name: "About", url: "/about" },
    { name: "Contact", url: "/contact" },
  ],

  // Social Media & Open Graph
  twitterUsername: "@MamtaRealt63332",
  twitterCardType: "summary_large_image",
  facebookPage: "https://www.facebook.com/profile.php?id=61572393522425",
  linkedInPage: "https://www.linkedin.com/in/mamta-realty-a6b221345/",
  instagramPage: "https://www.instagram.com/mamta_realty/",
  youTubeChannel: "https://www.youtube.com/@MamtaRealty",
  pinterestPage: "https://in.pinterest.com/mamtarealty/",
  whatsappContact: "https://wa.me/9987790471",

  // Contact Information
  businessPhone: "+91 9987790471",
  businessEmail: "contact@mamtarealty.com",
  businessAddress: {
    streetAddress: "", // Add actual street address
    locality: "Dombivli",
    region: "Maharashtra",
    postalCode: "421201", // Add postal code
    country: "IN"
  },

  // Verification Codes
  googleVerification: "YOUR_GOOGLE_SITE_VERIFICATION_CODE",
  bingVerification: "YOUR_BING_VERIFICATION_CODE",
  
  getStructuredData: (pageType = "WebPage", url, breadcrumb) => {
    const baseStructuredData = {
      "@context": "https://schema.org",
      "@type": pageType,
      "name": seoConfig.siteName,
      "url": url || seoConfig.defaultURL,
      "description": seoConfig.defaultDescription,
      "image": seoConfig.defaultImage,
      "inLanguage": seoConfig.defaultLanguage,
      "publisher": {
        "@type": "RealEstateAgent",
        "name": seoConfig.siteName,
        "logo": {
          "@type": "ImageObject",
          "url": seoConfig.defaultImage
        },
        "address": seoConfig.businessAddress,
        "telephone": seoConfig.businessPhone,
        "email": seoConfig.businessEmail,
        "sameAs": [
          seoConfig.facebookPage,
          seoConfig.linkedInPage,
          seoConfig.instagramPage,
          seoConfig.youTubeChannel,
          seoConfig.pinterestPage
        ]
      }
    };

    if (breadcrumb?.length) {
      baseStructuredData.breadcrumb = {
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        "itemListElement": breadcrumb.map((item, index) => ({
          "@type": "ListItem",
          "position": index + 1,
          "name": item.name,
          "item": item.url
        }))
      };
    }

    return baseStructuredData;
  }
};

export default seoConfig;

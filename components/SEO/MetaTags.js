import Head from "next/head";
import seoConfig from "../../utils/seoConfig";

const metaTags = ({ 
  title, 
  description, 
  image, 
  url, 
  keywords,
  pageType = "WebPage",
  breadcrumb
}) => {
  // Generate structured data
  const structuredData = seoConfig.getStructuredData(pageType, url, breadcrumb);

  return (
    <Head>
      {/* Basic Meta Tags */}
      <title>{title || seoConfig.defaultTitle}</title>
      <meta name="description" content={description || seoConfig.defaultDescription} />
      <meta name="keywords" content={keywords || seoConfig.defaultKeywords} />
      <meta name="language" content={seoConfig.defaultLanguage} />
      <meta name="robots" content={seoConfig.robots || "index, follow"} />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <meta charSet="UTF-8" />

      {/* Open Graph Tags */}
      <meta property="og:title" content={title || seoConfig.defaultTitle} />
      <meta property="og:description" content={description || seoConfig.defaultDescription} />
      <meta property="og:image" content={image || seoConfig.defaultImage} />
      <meta property="og:url" content={url || seoConfig.defaultURL} />
      <meta property="og:type" content={pageType === "Article" ? "article" : "website"} />
      <meta property="og:site_name" content={seoConfig.siteName} />
      <meta property="og:locale" content={seoConfig.defaultLocale} />

      {/* Twitter Card Tags */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:site" content={seoConfig.twitterUsername} />
      <meta name="twitter:creator" content={seoConfig.twitterUsername} />
      <meta name="twitter:title" content={title || seoConfig.defaultTitle} />
      <meta name="twitter:description" content={description || seoConfig.defaultDescription} />
      <meta name="twitter:image" content={image || seoConfig.defaultImage} />

      {/* Verification Tags */}
      {seoConfig.googleVerification && (
        <meta name="google-site-verification" content={seoConfig.googleVerification} />
      )}
      {seoConfig.bingVerification && (
        <meta name="msvalidate.01" content={seoConfig.bingVerification} />
      )}

      {/* Canonical URL */}
      <link rel="canonical" href={url || seoConfig.defaultURL} />

      {/* Favicon */}
      <link rel="icon" href="/favicon.ico" />
      <link rel="apple-touch-icon" href="/apple-touch-icon.png" />

      {/* Structured Data */}
      {structuredData && Object.keys(structuredData).length > 0 && (
        <script 
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
      )}
    </Head>
  );
};

export default metaTags;

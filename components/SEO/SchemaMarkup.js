import seoConfig from "../../utils/seoConfig";
import { useRouter } from "next/router";
import Head from "next/head";

const schemaMarkup = ({ pageType = "WebPage", url, breadcrumb }) => {
  const router = useRouter();
  const currentUrl = url || `${seoConfig.defaultURL}${router.asPath}`;

  // Generate structured data based on the page type
  const structuredData = seoConfig.getStructuredData(pageType, currentUrl, breadcrumb);

  return (
    <Head>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
    </Head>
  );
};

export default schemaMarkup;

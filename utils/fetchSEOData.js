const fetchSEOData = async (slug) => {
    try {
      // Example API Endpoint: Replace with your actual API or CMS URL
      const response = await fetch(`https://mamtarealty.com/api/seo/${slug}`);
      
      if (!response.ok) {
        throw new Error(`Failed to fetch SEO data for ${slug}`);
      }
  
      const seoData = await response.json();
      
      return {
        title: seoData?.title || "Mamta Realty - Trusted Real Estate Partner",
        description: seoData?.description || "Mamta Realty has been providing expert real estate services in Dombivli and Kalyan for over a decade.",
        keywords: seoData?.keywords || "Mamta Realty, Real Estate, Dombivli, Kalyan, Residential, Commercial, Property Deals",
        image: seoData?.image || "https://mamtarealty.com/images/default-seo-image.jpg",
        url: seoData?.url || "https://mamtarealty.com",
      };
    } catch (error) {
      console.error("Error fetching SEO data:", error.message);
      return null; // Return null if there's an error
    }
  };
  
  export default fetchSEOData;
  
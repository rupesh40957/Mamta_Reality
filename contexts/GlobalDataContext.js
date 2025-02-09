import { createContext, useState, useEffect } from "react";

export const GlobalDataContext = createContext();

export const GlobalDataProvider = ({ children }) => {
  const [listingData, setListingData] = useState([]);
  const [blogsData, setBlogsData] = useState([]);
  const [loading, setLoading] = useState(true);
  
  // const baseUrl = process.env.DOMAIN 

  useEffect(() => {
    const baseUrl = process.env.DOMAIN || "http://localhost:3000";
    console.log(baseUrl)
    const fetchData = async () => {
      try {
        const [projectsRes, blogsRes] = await Promise.all([

          fetch(`${baseUrl}/api/user/get-listing`),
          fetch(`${baseUrl}/api/user/get-blogs`)
        ]);

        if (!projectsRes.ok || !blogsRes.ok) {
          throw new Error("Failed to fetch data");
        }

        const projectsData = await projectsRes.json();
        const blogsData = await blogsRes.json();

        setListingData(projectsData.properties || []);
        setBlogsData(blogsData.blogs || []);
      } catch (error) {
        console.error("Error fetching global data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <GlobalDataContext.Provider value={{ listingData, blogsData, loading }}>
      {children}
    </GlobalDataContext.Provider>
  );
};

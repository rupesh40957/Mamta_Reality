import "../styles/globals.css";
import { useState, useEffect, useCallback } from "react";
import { useRouter } from "next/router";
import { FaWhatsapp } from "react-icons/fa";
import LoadingBar from "react-top-loading-bar";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import dynamic from "next/dynamic";
import Head from "next/head";
import Script from "next/script";  
import seoConfig from "../utils/seoConfig";
import mamtarealty_logo from "../public/mamtarealty_logo.png";
import { GlobalDataProvider } from "../contexts/GlobalDataContext";
import { AdminProvider } from "../contexts/AdminContext";

// Dynamic Imports
const Navbar = dynamic(() => import("../components/navbar"), { ssr: false });
const Footer = dynamic(() => import("../components/footer"), { ssr: false });
const MetaTags = dynamic(() => import("../components/SEO/MetaTags"), { ssr: false });
const SchemaMarkup = dynamic(() => import("../components/SEO/SchemaMarkup"), { ssr: false });

function MyApp({ Component, pageProps }) {
  const router = useRouter();
  const currentURL = `${seoConfig.defaultURL}${router.asPath}`;

  // State Management
  const [darkMode, setDarkMode] = useState(false);
  const [progress, setProgress] = useState(0);
  const [company] = useState("Mamta Realty");
  const [isLoggedInAdmin, setIsLoggedInAdmin] = useState(false);

  // Initialize Dark Mode on Mount
  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");
    const systemPrefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    const isDark = savedTheme ? savedTheme === "dark" : systemPrefersDark;
    setDarkMode(isDark);
    document.documentElement.classList.toggle("dark", isDark);
  }, []);

  // Toggle Dark Mode
  const toggleDarkMode = useCallback(() => {
    setDarkMode((prevMode) => {
      const newMode = !prevMode;
      localStorage.setItem("theme", newMode ? "dark" : "light");
      document.documentElement.classList.toggle("dark", newMode);
      return newMode;
    });
  }, []);

  // Track Page Route Changes for Loading Bar
  useEffect(() => {
    const handleRouteChange = () => setProgress(100);
    router.events.on("routeChangeStart", handleRouteChange);
    return () => router.events.off("routeChangeStart", handleRouteChange);
  }, [router]);

  return (
    <AdminProvider>
      <GlobalDataProvider>
        {/*  Google Analytics & GTM Scripts */}
        <Script async src="https://www.googletagmanager.com/gtag/js?id=G-3DEW8ZLPW5" />
        <Script
          id="google-analytics"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: ` 
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', 'G-3DEW8ZLPW5');
            `,
          }}
        />
        <Script
          id="google-tag-manager"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              (function(w,d,s,l,i){
                w[l]=w[l]||[];w[l].push({'gtm.start': new Date().getTime(),event:'gtm.js'});
                var f=d.getElementsByTagName(s)[0],
                    j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';
                j.async=true;j.src='https://www.googletagmanager.com/gtm.js?id='+i+dl;
                f.parentNode.insertBefore(j,f);
              })(window,document,'script','dataLayer','GTM-WBRZ8HLP');
            `,
          }}
        />

        {/* Global SEO Meta Tags */}
        <MetaTags
          title={seoConfig.defaultTitle}
          description={seoConfig.defaultDescription}
          image={seoConfig.defaultImage}
          url={currentURL}
          keywords={seoConfig.defaultKeywords}
        />
           {/* Demo A/c */}
      <Script
        src="https://www.googletagmanager.com/gtag/js?id=G-8ZQRFTBDMW"
        strategy="afterInteractive"
      />
      <Script id="google-analytics" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', 'G-8ZQRFTBDMW');
        `}
      </Script>

        {/* JSON-LD Schema Markup */}
        <SchemaMarkup pageType="WebPage" url={currentURL} />

        {/* Canonical URL for SEO */}
        <Head>
          <link rel="canonical" href={currentURL} />
        </Head>

        {/* Page Loading Bar */}
        <LoadingBar
          color="#4c00ff"
          waitingTime={400}
          progress={progress}
          onLoaderFinished={() => setProgress(0)}
        />

        {/* Toast Notifications */}
        <ToastContainer />

        {/* Navbar */}
        <Navbar
          darkMode={darkMode}
          toggleDarkMode={toggleDarkMode}
          companyName={company}
          companyLogo={mamtarealty_logo}
        />

        {/* Main Content */}
        <Component
          {...pageProps}
          setProgress={setProgress}
          darkMode={darkMode}
          toggleDarkMode={toggleDarkMode}
          companyName={company}
          companyLogo={mamtarealty_logo}
          isLoggedInAdmin={isLoggedInAdmin}
          setIsLoggedInAdmin={setIsLoggedInAdmin}
        />

        {/* WhatsApp Floating Button */}
        <a
          href="https://wa.me/9987811471"
          target="_blank"
          rel="noopener noreferrer"
          className="fixed bottom-5 right-5 bg-green-500 rounded-full p-3 shadow-lg hover:bg-green-600 transition duration-200 z-50"
          onClick={() =>
            window.dataLayer && window.dataLayer.push({ event: "whatsapp_click" })
          }
        >
          <FaWhatsapp className="text-white text-4xl" />
        </a>

        {/* Footer */}
        <Footer companyName={company} companyLogo={mamtarealty_logo} />
      </GlobalDataProvider>
    </AdminProvider>
  );
}

export default MyApp;

import Footer from "../components/footer";
import Navbar from "../components/navbar";
import "../styles/globals.css";
import { useState, useEffect, useCallback } from "react";
import { FaWhatsapp } from 'react-icons/fa';
import { useRouter } from "next/router";
import LoadingBar from "react-top-loading-bar";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import mamtarealty_logo from  "../public/mamtarealty_logo.png";

export default function App({ Component, pageProps }) {
  const router = useRouter();

  // dark mode is false and true
  const [darkMode, setDarkMode] = useState(false);

  // progress is 0 and 100 is loading bar 
  const [progress, setProgress] = useState(0); //  // Loading Bar is lod 
  
  // The Company Name is Mamta Realty
  const [company, setCompany] = useState("Mamta Realty");
   
 // The Admin Logging is true and false the show dashboard and container 
 const [isLoggedInAdmin, setIsLoggedInAdmin] = useState(false);

  useEffect(() => {
    initializeDarkMode();
  }, []);


  // The Dark Mode is false and true
  const initializeDarkMode = () => {
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme) {
      setDarkMode(savedTheme === "dark");
      document.documentElement.classList.toggle("dark", savedTheme === "dark");
    } else {
      const systemPrefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
      setDarkMode(systemPrefersDark);
      document.documentElement.classList.toggle("dark", systemPrefersDark);
    }
  };

  // The Dark Mode is false and true
  const toggleDarkMode = useCallback(() => {
    const newMode = !darkMode;
    setDarkMode(newMode);
    const theme = newMode ? "dark" : "light";
    localStorage.setItem("theme", theme);
    document.documentElement.classList.toggle("dark", newMode);
  }, [darkMode]);

// Loading Bar is lod 
useEffect(() => {
  router.events.on("routeChangeStart", () => {setProgress(100);});
}, [router.query]);

  return (
    <>
     <div className="">
     <LoadingBar color="#4c00ff" waitingTime={400} progress={progress} onLoaderFinished={() => setProgress(0)}/>
     <ToastContainer />
     <Navbar darkMode={darkMode}  toggleDarkMode={toggleDarkMode} companyName={company} companyLogo={mamtarealty_logo} />
      <Component {...pageProps} setProgress={setProgress}  darkMode={darkMode} toggleDarkMode={toggleDarkMode} isLoggedInAdmin={isLoggedInAdmin} setIsLoggedInAdmin={setIsLoggedInAdmin}  />
      {/* WhatsApp Icon */}
      <a
        href="https://wa.me/9987790471"
        target="_blank"
        className="fixed bottom-5 right-5 bg-green-500 rounded-full p-3 shadow-lg hover:bg-green-600 transition duration-200 z-50"
      >
       <FaWhatsapp className="text-white text-4xl" /> 
      </a>
      <Footer companyName={company} companyLogo={mamtarealty_logo} />
     </div>
    </>
  );
}

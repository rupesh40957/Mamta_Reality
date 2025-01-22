import Footer from "@/components/footer";
import Navbar from "@/components/navbar";
import "@/styles/globals.css";
import { useState, useEffect, useCallback } from "react";

export default function App({ Component, pageProps }) {
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    initializeDarkMode();
  }, []);

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

  const toggleDarkMode = useCallback(() => {
    const newMode = !darkMode;
    setDarkMode(newMode);
    const theme = newMode ? "dark" : "light";
    localStorage.setItem("theme", theme);
    document.documentElement.classList.toggle("dark", newMode);
  }, [darkMode]);

  return (
    <>
     <div className="">
     <Navbar darkMode={darkMode}  toggleDarkMode={toggleDarkMode} />
      <Component {...pageProps} darkMode={darkMode} toggleDarkMode={toggleDarkMode} />
      <Footer />
     </div>
    </>
  );
}

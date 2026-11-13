import { useState, useEffect } from "react";
import Navbar from "./Components/Navbar";
import AOS from "aos";
import "aos/dist/aos.css";
import Hero from "./Components/Hero";
import About from "./Components/About";
import Experience from "./Components/Experience";
import Skills from "./Components/Skills";
import Projects from "./Components/Projects";
import Contact from "./Components/Contact";
import Footer from "./Components/Footer";
import { PortfolioProvider } from "./context/PortfolioContext";
import AdminDashboard from "./Components/AdminDashboard";

const App = () => {
  const [darkMode, setDarkMode] = useState(true);

  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: false,
      offset: 100,
    });
    document.documentElement.classList.add("dark");
  }, []);

  useEffect(() => {
    AOS.refresh();
  }, [darkMode]);

  const toggleDarkMode = () => {
    const newMode = !darkMode;
    setDarkMode(newMode);
    document.documentElement.classList.toggle("dark");
  };

  return (
    <PortfolioProvider>
      <div
        className={`relative min-h-screen transition-colors duration-500 ${
          darkMode ? "bg-gray-900 text-white" : "bg-gray-50 text-gray-900"
        }`}
      >
        {/* Dark mode background gradient cross-fade layer */}
        <div
          className={`fixed inset-0 pointer-events-none transition-opacity duration-700 ease-in-out ${
            darkMode ? "opacity-100" : "opacity-0"
          } bg-linear-to-br from-gray-900 via-[#0d182e] to-gray-900`}
        />
        {/* Light mode background gradient cross-fade layer */}
        <div
          className={`fixed inset-0 pointer-events-none transition-opacity duration-700 ease-in-out ${
            darkMode ? "opacity-0" : "opacity-100"
          } bg-linear-to-br from-gray-50 to-blue-50`}
        />

        <div className="relative z-10">
          <Navbar darkMode={darkMode} toggleDarkMode={toggleDarkMode} />
          <Hero darkMode={darkMode} />
          <About darkMode={darkMode} />
          <Experience darkMode={darkMode} />
          <Skills darkMode={darkMode} />
          <Projects darkMode={darkMode} />
          <Contact darkMode={darkMode} />
          <Footer darkMode={darkMode} />
        </div>
      </div>
      <AdminDashboard darkMode={darkMode} />
    </PortfolioProvider>
  );
};

export default App;

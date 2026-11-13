import { FaHeart, FaLinkedin, FaWhatsapp, FaInstagram } from "react-icons/fa6";

const Footer = ({ darkMode }) => {
  const currentYear = new Date().getFullYear();

  const iconClass = `w-10 h-10 rounded-full flex items-center justify-center transition-all duration-200
    hover:scale-110 hover:bg-linear-to-r hover:from-rose-500 hover:to-pink-500 hover:text-white shadow-md`;

  const bgClass = darkMode ? "bg-gray-700 text-white" : "bg-gray-200 text-gray-700";

  return (
    <footer
      style={{
        background: darkMode
          ? "linear-gradient(to bottom, #000000, #111827)"
          : "linear-gradient(to right, #ffffff, #fff1f2)",
        borderColor: darkMode ? "#374151" : "#ffe4e6",
      }}
      className="border-t cursor-default caret-transparent transition-colors duration-500"
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-12 py-8">
        {/* Main footer row */}
        <div className="flex flex-col lg:flex-row justify-between items-center gap-8">

          {/* Shahd's side */}
          <div className="flex flex-col items-center lg:items-start gap-3">
            <div>
              <h3
                className="text-2xl font-bold mb-1"
                style={{
                  background: "linear-gradient(to right, #f43f5e, #fb7185)",
                  WebkitBackgroundClip: "text",
                  backgroundClip: "text",
                  color: "transparent",
                }}
              >
                Shahd Kamal
              </h3>
              <p className="text-sm" style={{ color: darkMode ? "#9ca3af" : "#6b7280" }}>
                Data Analyst &amp; Digital Marketing Specialist
              </p>
            </div>

            {/* Shahd's social icons */}
            <div className="flex gap-3">
              <a
                href="https://www.linkedin.com/in/shahd-kamal-30a99436b"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Shahd LinkedIn"
                className={`${iconClass} ${bgClass}`}
                title="Shahd Kamal — LinkedIn"
              >
                <FaLinkedin size={18} />
              </a>
              <a
                href="https://wa.me/201156785653"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Shahd WhatsApp"
                className={`${iconClass} ${bgClass}`}
                title="Shahd Kamal — WhatsApp"
              >
                <FaWhatsapp size={18} />
              </a>
            </div>
          </div>

          {/* Copyright — center */}
          <div className="text-center px-4">
            <p
              className="text-xs font-semibold uppercase tracking-widest mb-1"
              style={{ color: darkMode ? "#9ca3af" : "#4b5563" }}
            >
              © {currentYear} All rights reserved
            </p>
            <p className="flex items-center justify-center gap-1.5 text-sm" style={{ color: darkMode ? "#d1d5db" : "#374151" }}>
              Designed for
              <span className="text-rose-500 font-bold">Shahd Kamal</span>
              <FaHeart className="text-rose-500 inline" size={13} />
            </p>
            <p
              className="text-xs mt-1"
              style={{ color: darkMode ? "#9ca3af" : "#4b5563" }}
            >
              Built by{" "}
              <span className="font-bold" style={{ color: darkMode ? "#e5e7eb" : "#1f2937" }}>
                Mohamed Fahmy
              </span>
            </p>
          </div>

          {/* Mohamed's side */}
          <div className="flex flex-col items-center lg:items-end gap-3">
            <div className="text-center lg:text-right">
              <h3
                className="text-xl font-bold mb-1"
                style={{ color: darkMode ? "#f3f4f6" : "#111827" }}
              >
                Mohamed Fahmy
              </h3>
              <p className="text-xs" style={{ color: darkMode ? "#9ca3af" : "#4b5563" }}>
                Developer &amp; Designer
              </p>
            </div>

            {/* Mohamed's social icons */}
            <div className="flex gap-3">
              <a
                href="https://www.instagram.com/moo__fahmy?igsh=MXI2Z2xkdXV2d2Zpcg%3D%3D"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Mohamed Fahmy Instagram"
                className={`${iconClass} ${bgClass}`}
                title="Mohamed Fahmy — Instagram"
              >
                <FaInstagram size={18} />
              </a>
              <a
                href="https://api.whatsapp.com/send/?phone=201103149905&text&type=phone_number&app_absent=0"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Mohamed Fahmy WhatsApp"
                className={`${iconClass} ${bgClass}`}
                title="Mohamed Fahmy — WhatsApp"
              >
                <FaWhatsapp size={18} />
              </a>
            </div>
          </div>

        </div>

        {/* Bottom separator + admin hint */}
        <div
          className="mt-6 pt-4 border-t text-center text-xs"
          style={{ borderColor: darkMode ? "#1f2937" : "#ffe4e6", color: darkMode ? "#9ca3af" : "#6b7280" }}
        >
          <a
            href="#admin"
            className="hover:text-rose-500 font-medium transition-colors duration-200"
            title="Admin Dashboard"
          >
            Admin
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

import { FaHeart, FaInstagram, FaLinkedin, FaWhatsapp } from "react-icons/fa6";

const Footer = ({ darkMode }) => {
  const currentYear = new Date().getFullYear();
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
        <div className="flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="text-center md:text-left">
            <h3
              className="text-2xl font-bold mb-2"
              style={{
                background: "linear-gradient(to right, #f43f5e, #fb7185)",
                WebkitBackgroundClip: "text",
                backgroundClip: "text",
                color: "transparent",
              }}
            >
              Shahd Kamal
            </h3>
            <p
              className="text-sm"
              style={{
                color: darkMode ? "#9ca3af" : "#6b7280",
              }}
            >
              Data Analyst &amp; Digital Marketing Specialist
            </p>
          </div>
          <div className="flex gap-4">
            <a
              href="https://www.linkedin.com/in/shahd-kamal-30a99436b"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn"
              className="w-10 h-10 rounded-full flex items-center justify-center 
                          bg-[#374151] dark:bg-[#f3f4f6] text-white dark:text-[#374151]
              hover:scale-110 transition-all hover:bg-linear-to-r 
              hover:from-rose-500 hover:to-pink-500 hover:text-white shadow-md"
            >
              <FaLinkedin />
            </a>
            <a
              href="https://wa.me/201103149905"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="WhatsApp"
              className="w-10 h-10 rounded-full flex items-center justify-center 
                          bg-[#374151] dark:bg-[#f3f4f6] text-white dark:text-[#374151]
              hover:scale-110 transition-all hover:bg-linear-to-r 
              hover:from-rose-500 hover:to-pink-500 hover:text-white shadow-md"
            >
              <FaWhatsapp />
            </a>
            <a
              href="https://www.instagram.com/moo__fahmy?igsh=MXI2Z2xkdXV2d2Zpcg=="
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram"
              className="w-10 h-10 rounded-full flex items-center justify-center 
                          bg-[#374151] dark:bg-[#f3f4f6] text-white dark:text-[#374151]
              hover:scale-110 transition-all hover:bg-linear-to-r 
              hover:from-rose-500 hover:to-pink-500 hover:text-white shadow-md"
            >
              <FaInstagram />
            </a>
          </div>
          <div className="text-center md:text-right">
            <p className="text-sm flex items-center justify-end gap-1 text-[#6b7280] dark:text-[#9ca3af]">
              @{currentYear} Designed for
              <span className="text-rose-500 dark:text-rose-400 font-bold ml-1">
                Shahd Kamal
              </span>
              <FaHeart className="text-rose-500 ml-1 inline" size={14} />
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

import { FaLinkedin, FaWhatsapp } from "react-icons/fa6";
import { DownloadIcon, Mail } from "lucide-react";
import shahdPhoto from "../assets/shahd_photo2.jpg";
import { usePortfolio } from "../context/PortfolioContext";

const Hero = ({ darkMode }) => {
  const { profile } = usePortfolio();

  const socialIcons = [
    { icon: <FaWhatsapp />, href: profile.whatsappUrl || "https://wa.me/201156785653" },
    {
      icon: <FaLinkedin />,
      href: profile.linkedinUrl || "https://www.linkedin.com/in/shahd-kamal-30a99436b",
    },
  ];

  const darkTheme = {
    textPrimary: "text-white",
    textSecondary: "text-gray-300",
    buttonSecondary: "text-white border-2 border-rose-500 hover:bg-rose-500/20",
    decorativeCircle: "bg-rose-500 opacity-15",
  };

  const lightTheme = {
    textPrimary: "text-gray-900",
    textSecondary: "text-gray-700",
    buttonSecondary: "text-gray-800 border-2 border-rose-400 hover:bg-rose-500 hover:text-white",
    decorativeCircle: "bg-rose-400 opacity-15",
  };

  const theme = darkMode ? darkTheme : lightTheme;

  return (
    <div className="relative overflow-hidden min-h-[calc(100vh-70px)] lg:min-h-screen flex items-center justify-center cursor-default caret-transparent pt-14 lg:pt-0">
      <section
        id="Home"
        data-aos="fade-up"
        data-aos-delay="250"
        className="body-font z-10 w-full"
      >
        <div
          className="container mx-auto px-4 sm:px-8 lg:px-14 py-6 sm:py-8 lg:py-12
              flex flex-col lg:flex-row items-center justify-between gap-8 lg:gap-12"
        >
          {/* Left Text Column */}
          <div
            className="lg:w-1/2 w-full flex flex-col items-center lg:items-start 
                  text-center lg:text-left order-2 lg:order-1"
          >
            {/* Desktop-only Social Icons (Hidden on mobile) */}
            <div
              className="hidden lg:flex justify-start gap-5 mb-5 w-full"
            >
              {socialIcons.map((social, index) => (
                <a
                  key={index}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={index === 0 ? "Shahd WhatsApp" : "Shahd LinkedIn"}
                  className="transform hover:scale-125 transition-transform text-3xl"
                >
                  <span
                    className={
                      darkMode
                        ? "text-gray-400 hover:text-white"
                        : "text-gray-400 hover:text-gray-800"
                    }
                  >
                    {social.icon}
                  </span>
                </a>
              ))}
            </div>

            <h1
              className={`title-font text-3xl sm:text-4xl lg:text-5xl mb-3 font-bold ${theme.textPrimary}`}
              data-aos="fade-up"
              data-aos-delay="500"
            >
              Hi, I'm {profile.name || "Shahd Kamal"}
            </h1>

            {/* Words directly under her name (editable via Admin) */}
            <p
              className={`mb-3 sm:mb-4 leading-relaxed max-w-md sm:max-w-lg text-lg sm:text-xl font-bold ${theme.textSecondary}`}
              data-aos="fade-up"
              data-aos-delay="600"
            >
              {profile.tagline || "Data Analyst & Digital Marketing Specialist."}
            </p>

            <p
              className={`mb-6 sm:mb-8 leading-relaxed max-w-md sm:max-w-lg text-sm sm:text-base font-semibold ${theme.textSecondary}`}
              data-aos="fade-up"
              data-aos-delay="650"
            >
              {profile.subTagline || "Turning Data into Insights, and Creativity into Digital Growth."}
            </p>

            {/* CTA Buttons */}
            <div className="w-full">
              <div
                className="flex flex-col sm:flex-row justify-center
                          lg:justify-start gap-3 sm:gap-4 w-full sm:w-auto"
                data-aos="fade-up"
                data-aos-delay="700"
              >
                <a
                  href={profile.cvFile || profile.cvUrl || "#Contact"}
                  download={Boolean(profile.cvFile || profile.cvUrl)}
                  className="w-full sm:w-auto inline-flex items-center justify-center text-white
                                  bg-linear-to-r from-rose-500 to-pink-500
                                  border-0 py-3 px-6 sm:px-8 hover:shadow-[0_0_30px_rgba(244,63,94,0.5)]
                                  rounded-full text-base sm:text-lg font-semibold transition-all duration-200 transform cursor-pointer"
                >
                  <DownloadIcon className="w-5 h-5 sm:h-6 sm:w-6 mr-2" />
                  Download CV
                </a>
                <a
                  href="#Contact"
                  onClick={(e) => {
                    e.preventDefault();
                    document.getElementById("Contact")?.scrollIntoView({ behavior: "smooth" });
                    window.history.pushState(null, "", "#Contact");
                  }}
                  className={`w-full sm:w-auto inline-flex items-center ${theme.buttonSecondary} justify-center
                                      border-0 py-3 px-6 sm:px-8 hover:shadow-[0_0_30px_rgba(244,63,94,0.3)]
                                      rounded-full text-base sm:text-lg font-semibold transition-all duration-200 transform cursor-pointer
                                      ${
                                        darkMode ? "text-white" : "text-gray-900"
                                      }`}
                >
                  <Mail className="w-5 h-5 sm:h-6 sm:w-6 mr-2" />
                  Contact Me
                </a>
              </div>

              {/* PHONE SIZE ICONS: Put the icons under the Contact Me button */}
              <div
                className="flex lg:hidden justify-center items-center gap-6 mt-6 pt-2 w-full"
                data-aos="fade-up"
                data-aos-delay="800"
              >
                {socialIcons.map((social, index) => (
                  <a
                    key={index}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={index === 0 ? "Shahd WhatsApp" : "Shahd LinkedIn"}
                    className="transform hover:scale-125 transition-transform text-3xl p-1"
                  >
                    <span
                      className={
                        darkMode
                          ? "text-rose-400 hover:text-white"
                          : "text-rose-500 hover:text-rose-700"
                      }
                    >
                      {social.icon}
                    </span>
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* Right Image Column — Sized so full photo is visible without scrolling */}
          <div
            className="lg:w-1/2 w-full flex items-center justify-center order-1 lg:order-2"
            data-aos="fade-left"
            data-aos-delay="400"
          >
            <div className="relative w-full max-w-[270px] sm:max-w-[320px] lg:max-w-[370px] group">
              {/* Decorative background glow */}
              <div className="absolute -inset-2 bg-linear-to-r from-rose-500 via-pink-500 to-rose-400 rounded-3xl blur-2xl opacity-30 group-hover:opacity-50 transition duration-500" />

              <div className="relative rounded-3xl overflow-hidden border-2 border-rose-400/30 shadow-2xl backdrop-blur-sm max-h-[430px] sm:max-h-[480px] lg:max-h-[520px] flex items-center justify-center bg-gray-900/10">
                <img
                  src={profile.avatar || shahdPhoto}
                  alt={`${profile.name || "Shahd Kamal"} - Data Analyst & Digital Marketing Specialist`}
                  width="370"
                  height="480"
                  fetchPriority="high"
                  className="w-full h-auto max-h-[430px] sm:max-h-[480px] lg:max-h-[520px] object-cover object-top transform group-hover:scale-103 transition-transform duration-500"
                />

                {/* Floating pill badge on photo */}
                <div
                  className="absolute bottom-3 left-3 right-3 p-2.5 sm:p-3 rounded-2xl backdrop-blur-md border border-white/20 shadow-lg flex items-center justify-between"
                  style={{
                    background: darkMode
                      ? "rgba(17, 24, 39, 0.85)"
                      : "rgba(255, 255, 255, 0.85)",
                  }}
                >
                  <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse shrink-0" />
                    <div className="text-left">
                      <p
                        className="text-xs font-bold leading-tight"
                        style={{ color: darkMode ? "white" : "#1f2937" }}
                      >
                        {profile.name || "Shahd Kamal"}
                      </p>
                      <p className="text-[10px] sm:text-[11px] text-rose-500 font-semibold truncate max-w-[150px] sm:max-w-[180px]">
                        Data Analysis &amp; Marketing
                      </p>
                    </div>
                  </div>
                  <span className="text-[10px] font-bold px-2.5 py-1 rounded-lg bg-rose-500/15 text-rose-500 border border-rose-500/30 shrink-0">
                    Power BI
                  </span>
                </div>
              </div>
            </div>
          </div>

          <div
            className={`absolute -top-20 -left-20 w-45 h-45 rounded-full sm:w-54 sm:h-54 ${theme.decorativeCircle} mix-blend-multiply 
                  filter blur-3xl opacity-10 animate-pulse delay-1000 hidden sm:block`}
          />
        </div>
      </section>
    </div>
  );
};

export default Hero;

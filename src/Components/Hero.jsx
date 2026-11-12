import { FaFacebook, FaLinkedin, FaWhatsapp } from "react-icons/fa6";
import { FaInstagramSquare } from "react-icons/fa";
import { DownloadIcon, Mail } from "lucide-react";
import Mohamed_Fahmy_CV from "../assets/Mohamed_Fahmy_CV.pdf";
import shahdPhoto from "../assets/shahd_photo.jpg";

const Hero = ({ darkMode }) => {
  const socialIcons = [
  
    { icon: <FaWhatsapp />, href: "https://wa.me/201156785653" },
    {
      icon: <FaLinkedin />,
      href: "https://www.linkedin.com/in/shahd-kamal-30a99436b",
    },
  ];

  const darkTheme = {
    textPrimary: "text-white",
    textSecondary: "text-gray-300",
    buttonSecondary:
      "text-white border-2 border-rose-500 hover:bg-rose-500/20",
    decorativeCircle: "bg-rose-500 opacity-15",
  };

  const lightTheme = {
    textPrimary: "text-gray-900",
    textSecondary: "text-gray-700",
    buttonSecondary:
      "text-gray-800 border-2 border-rose-400 hover:bg-rose-500 hover:text-white",
    decorativeCircle: "bg-rose-400 opacity-15",
  };

  const theme = darkMode ? darkTheme : lightTheme;

  return (
    <div className="relative overflow-hidden min-h-screen flex flex-col cursor-default caret-transparent">
      <section
        id="Home"
        data-aos="fade-up"
        data-aos-delay="250"
        className="body-font z-10"
      >
        <div
          className="container flex mx-auto px-4 sm:px-8 lg:px-14 lg:py-14
              flex-col lg:flex-row items-center justify-between
              lg:mt-14 mt-23"
        >
          <div
            className="lg:w-1/2 w-full flex flex-col items-center lg:items-start 
                  text-center lg:text-left mb-12 lg:mb-0 "
          >
            <div
              className="flex justify-center lg:justify-start
                      gap-4 sm:gap-6 mb-6 sm:mb-7 w-full"
            >
              {socialIcons.map((social, index) => (
                <a
                  key={index}
                  href={social.href}
                  target="_blank"
                  data-aos-delay={`${400 + index * 100}`}
                  className="transform hover:scale-130 transition-transform
                    decoration-800 rounded-full text-4xl"
                >
                  <span
                    className={`${
                      darkMode
                        ? "text-gray-600 hover:text-white"
                        : "text-gray-300 hover:text-gray-800"
                    }`}
                  >
                    {social.icon}
                  </span>
                </a>
              ))}
            </div>
            <h1
              className={`title-font text-3xl sm:text-4xl lg:text-5xl mb-4 font-bold ${theme.textPrimary}`}
              data-aos="fade-up"
              data-aos-delay="500"
            >
              Hi, I'm Shahd Kamal
            </h1>
            <p
              className={`mb-6 sm:mb-8 leading-relaxed max-w-md sm:max-w-lg text-lg sm:text-xl font-bold ${theme.textSecondary}`}
              data-aos="fade-up"
              data-aos-delay="600"
            >
              Data Analyst & Digital Marketing Specialist.
            </p>
            <p
              className={`mb-6 sm:mb-8 leading-relaxed max-w-md sm:max-w-lg text-md sm:text-lg font-semibold ${theme.textSecondary}`}
              data-aos="fade-up"
              data-aos-delay="600"
            >
              Turning Data into Insights, and Creativity into Digital Growth.
            </p>
            {/* buttons */}
            <div className="w-full pt-4 sm:pt-6">
              <div
                className="flex flex-col sm:flex-row justify-center
                          lg:justify-start gap-3 sm:gap-4"
                data-aos="fade-up"
                data-aos-delay="700"
              >
                <a
                  // href={}
                  download
                  className="w-full sm:w-auto inline-flex items-center justify-center text-white
                                  bg-linear-to-r from-rose-500 to-pink-500
                                  border-0 py-3 px-6 sm:px-8 hover:shadow-[0_0_30px_rgba(244,63,94,0.5)]
                                  rounded-full text-base sm:text-lg font-semibold transition-all duration-200 transform cursor-pointer
                                  "
                >
                  <DownloadIcon className="w-5 h-5 sm:h-6 sm:w-6 mr-2" />
                  Download CV
                </a>
                <a
                  href="#Contact"
                  onClick={(e) => {
                    e.preventDefault();
                    document.getElementById('Contact')?.scrollIntoView({ behavior: 'smooth' });
                    window.history.pushState(null, '', '#Contact');
                  }}
                  className={`w-full sm:w-auto inline-flex items-center ${theme.buttonSecondary} justify-center
                                      border-0 py-3 px-6 sm:px-8 hover:shadow-[0_0_30px_rgba(244,63,94,0.3)]
                                      rounded-full text-base sm:text-lg font-semibold transition-all duration-200 transform cursor-pointer
                                      ${
                                        darkMode
                                          ? "text-white"
                                          : "text-gray-900"
                                      }`}
                >
                  <Mail className="w-5 h-5 sm:h-6 sm:w-6 mr-2" />
                  Contact Me
                </a>
              </div>
            </div>
          </div>
          {/* IMAGES */}
          <div
            className="lg:w-1/2 w-full h-fit max-w-md lg:max-w-lg mt-6 lg:mt-0 flex items-center justify-center"
            data-aos="fade-left"
            data-aos-delay="400"
          >
            <div className="relative w-full max-w-sm sm:max-w-md group">
              {/* Decorative background glow */}
              <div className="absolute -inset-2 bg-linear-to-r from-rose-500 via-pink-500 to-rose-400 rounded-3xl blur-2xl opacity-30 group-hover:opacity-50 transition duration-500" />
              
              <div className="relative rounded-3xl overflow-hidden border-2 border-rose-400/30 shadow-2xl backdrop-blur-sm">
                <img
                  src={shahdPhoto}
                  alt="Shahd Kamal - Data Analyst & Digital Marketing Specialist"
                  className="w-full h-auto object-cover transform group-hover:scale-103 transition-transform duration-500"
                />
                
                {/* Floating pill badge on photo */}
                <div
                  className="absolute bottom-3 left-3 right-3 p-3 rounded-2xl backdrop-blur-md border border-white/20 shadow-lg flex items-center justify-between"
                  style={{
                    background: darkMode
                      ? "rgba(17, 24, 39, 0.85)"
                      : "rgba(255, 255, 255, 0.85)",
                  }}
                >
                  <div className="flex items-center gap-2.5">
                    <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
                    <div className="text-left">
                      <p className="text-xs font-bold leading-tight" style={{ color: darkMode ? "white" : "#1f2937" }}>
                        Shahd Kamal
                      </p>
                      <p className="text-[11px] text-rose-500 font-semibold">
                        Data Analysis &amp; Marketing
                      </p>
                    </div>
                  </div>
                  <span className="text-[10px] font-bold px-2.5 py-1 rounded-lg bg-rose-500/15 text-rose-500 border border-rose-500/30">
                    Power BI
                  </span>
                </div>
              </div>
            </div>
          </div>
          <div
            className={`absolute -top-20 -left-20 w-45 h-45 rounded-full sm:w-54 sm:h-54 ${theme.decorativeCircle} mix-bliend-multiply 
                  filter blur-3xl opacity-10 animate-pulse delay-1000 hidden sm:block`}
          ></div>
        </div>
      </section>
    </div>
  );
};

export default Hero;

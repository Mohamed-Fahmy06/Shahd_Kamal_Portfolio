import { FaFacebook, FaGithub, FaLinkedin, FaWhatsapp } from "react-icons/fa6";
import { FaInstagramSquare } from "react-icons/fa";
import { DownloadIcon, Mail } from "lucide-react";
import Mohamed_Fahmy_CV from "../assets/Mohamed_Fahmy_CV.pdf";
import Avatar from "../assets/Avatar.png";

const Hero = ({ darkMode }) => {
  const socialIcons = [
    {
      icon: <FaInstagramSquare />,
      href: "https://www.instagram.com/moo__fahmy?igsh=MXI2Z2xkdXV2d2Zpcg==",
    },
    {
      icon: <FaFacebook />,
      href: "https://web.facebook.com/profile.php?id=100084434403811",
    },
    { icon: <FaWhatsapp />, href: "https://wa.me/201103149905" },
    {
      icon: <FaLinkedin />,
      href: "https://www.linkedin.com/in/mohamed-fahmy-omar-297aa33a8",
    },
    { icon: <FaGithub />, href: "https://github.com/Mohamed-Fahmy06" },
  ];

  const darkTheme = {
    textPrimary: "text-white",
    textSecondary: "text-gray-300",
    buttonSecondary:
      "text-white border-2 border-orange-500 hover:bg-orange-600",
    decorativeCircle: "bg-orange-500 opacity-10",
  };

  const lightTheme = {
    textPrimary: "text-gray-900",
    textSecondary: "text-gray-700",
    buttonSecondary:
      "text-gray-800 border-2 border-orange-500 hover:bg-orange-500 hover:text-white",
    decorativeCircle: "bg-orange-500 opacity-10",
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
                  href={Mohamed_Fahmy_CV}
                  download
                  className="w-full sm:w-auto inline-flex items-center justify-center text-white
                                  bg-linear-to-r from-orange-500 to-amber-500
                                  border-0 py-3 px-6 sm:px-8 hover:shadow-[0_0_40px_rgb(255,165,0,0.6)]
                                  rounded-full text-base sm:text-lg font-semibold transition-all duration-200 transform
                                  "
                >
                  <DownloadIcon className="w-5 h-5 sm:h-6 sm:w-6 mr-2" />
                  Download CV
                </a>
                <a
                  href="https://wa.me/201103149905"
                  className={`w-full sm:w-auto inline-flex items-center ${theme.buttonSecondary} justify-center
                                      border-0 py-3 px-6 sm:px-8 hover:shadow-[0_0_40px_rgb(255,165,0,0.6)]
                                      rounded-full text-base sm:text-lg font-semibold transition-all duration-200 transform
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
            className="lg:w-1/2 w-full h-fit max-w-md lg:max-w-md mt-2 lg:mt-0 flex items-center justify-center"
            data-aos="fade-left"
            data-aos-delay="400"
          >
            <div className="relative w-4/5 sm:w3/4 lg:w-full">
              <div className="relative overflow-hidden">
                <img
                  src={Avatar}
                  alt=""
                  className=" w-full h-fit object-cover transform
                            hover:scale-105 transition-transform duration-400 animate-pulse"
                />
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

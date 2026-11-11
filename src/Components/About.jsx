import ABout from "../assets/ABout.png";
import { GraduationCap, Briefcase, Layout, ArrowRight } from "lucide-react";

const About = ({ darkMode }) => {
  return (
    <section
      id="About"
      className={`min-h-screen overflow-hidden flex items-center justify-center
    px-4 sm:px-6 py-18 cursor-default caret-transparent`}
    >
      <div
        className={`max-w-6xl w-full grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-12 items-center `}
      >
        <figure
          data-aos="fade-right"
          data-aos-delay="300"
          className="flex flex-wrap justify-center gap-4 relative order-2 lg:order-1"
        >
          <div className=" relative w-75 h-75 lg:w-96 lg:h-96 lg:mt-15">
            {/* image background decoration */}
            <div
              className="absolute -inset-5 lg:-inset-20 
                      bg-linear-to-br from-orange-400 via-orange-500 to-orange-600 rotate-12 star-shape opacity-20 blur-2xl z-0"
              data-aos="zoom-in"
              data-aos-delay="600"
            ></div>
            <div
              className="absolute -inset-2 lg:-inset-4 
                      bg-linear-to-tr from-orange-500/20 to-transparent rounded-3xl rotate-6 z-0"
              data-aos="fade-up"
              data-aos-delay="700"
            ></div>
            <img
              src={ABout}
              alt="Mohamed's Portrait"
              className="absolute inset-0 object-cover z-10 
              transition-all duration-500 hover:scale-105 -top-18 lg:-top-35"
              data-aos="zoom-in"
              data-aos-delay="400"
            />
          </div>
        </figure>

        <article
          data-aos="fade-left"
          data-aos-delay="300"
          className="text-center lg:text-left relative order-1 lg:order-2"
        >
          <header>
            <div className="flex items-center justify-center lg:justify-start gap-2 mb-2" data-aos="fade-up" data-aos-delay="350">
              <span className="w-8 h-0.5 bg-orange-500"></span>
              <span className="text-orange-500 font-medium uppercase tracking-wider text-sm">Get to know me</span>
            </div>
            <h1
              className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6 text-transparent
            bg-linear-to-r from-orange-400 via-orange-500 to-orange-600 bg-clip-text"
              data-aos="fade-up"
              data-aos-delay="400"
            >
              About Me
            </h1>
          </header>

          <div
            className={`text-sm sm:text-base lg:text-lg mb-8 leading-relaxed space-y-4
            border-l-4 border-orange-500 p-4 sm:p-6 rounded-r-2xl
            backdrop-blur-sm shadow-xl shadow-orange-900/5
            ${darkMode ? "text-gray-300 bg-white/5" : "text-gray-700 bg-orange-50/50"}`}
            data-aos="fade-up"
            data-aos-delay="500"
          >
            <p className="font-bold text-xl sm:text-2xl text-orange-500">
              Beyond Numbers. Beyond Creativity.
            </p>
            <p>
              I'm <span className="text-orange-500 font-semibold italic">Shahd Kamal</span>, a results-oriented professional passionate about the intersection of business, data, and digital growth innovation.
            </p>
            <p>I bring together two powerful disciplines that shape the way businesses grow and make decisions:</p>
            <p>
              <span className="text-orange-500 font-semibold">Data Analysis:</span> Turning complex datasets into meaningful insights, uncovering hidden patterns, and translating numbers into strategic decisions. I focus on making data understandable, actionable, and valuable through analytical thinking and data visualization.
            </p>
            <p>
              <span className="text-orange-500 font-semibold">Digital Marketing:</span> Combining creativity with strategic thinking to build engaging digital experiences, strengthen brand presence, understand audience behavior, and create content that connects brands with people.
            </p>
            <p className="italic">
              I believe that successful businesses need more than data and more than creativity — they need the ability to connect both. My approach is simple: <span className="font-semibold">Analyze with purpose, create with strategy, and deliver with impact.</span>
            </p>
          </div>

          <div className="grid grid-cols-3 gap-4 sm:gap-6 mb-8">
            {/* 2 Disciplines */}
            <div
              className={`p-4 rounded-2xl transition-all duration-300 hover:-translate-y-2
              ${darkMode ? "bg-white/5 border border-white/10" : "bg-orange-50 border border-orange-100 shadow-md"}`}
              data-aos="zoom-in"
              data-aos-delay="600"
            >
              <div className="flex justify-center lg:justify-start mb-2 text-orange-500">
                <GraduationCap size={24} />
              </div>
              <div className="text-xl sm:text-2xl font-bold text-orange-500">
                2
              </div>
              <div
                className={`text-[10px] sm:text-xs font-medium uppercase tracking-tighter
                ${darkMode ? "text-gray-400" : "text-gray-600"}`}
              >
                Disciplines
              </div>
            </div>

            {/* Years of Experience */}
            <div
              className={`p-4 rounded-2xl transition-all duration-300 hover:-translate-y-2
              ${darkMode ? "bg-white/5 border border-white/10" : "bg-orange-50 border border-orange-100 shadow-md"}`}
              data-aos="zoom-in"
              data-aos-delay="700"
            >
              <div className="flex justify-center lg:justify-start mb-2 text-orange-500">
                <Briefcase size={24} />
              </div>
              <div className="text-xl sm:text-2xl font-bold text-orange-500">
                1+
              </div>
              <div
                className={`text-[10px] sm:text-xs font-medium uppercase tracking-tighter
                ${darkMode ? "text-gray-400" : "text-gray-600"}`}
              >
                Year Experience
              </div>
            </div>

            {/* CFA Stage */}
            <div
              className={`p-4 rounded-2xl transition-all duration-300 hover:-translate-y-2
                ${darkMode ? "bg-white/5 border border-white/10" : "bg-orange-50 border border-orange-100 shadow-md"}`}
              data-aos="zoom-in"
              data-aos-delay="800"
            >
              <div className="flex justify-center lg:justify-start mb-2 text-orange-500">
                <Layout size={24} />
              </div>
              <div className="text-xl sm:text-2xl font-bold text-orange-500">
                CFA
              </div>
              <div
                className={`text-[10px] sm:text-xs font-medium uppercase tracking-tighter
                ${darkMode ? "text-gray-400" : "text-gray-600"}`}
              >
                Stage 2
              </div>
            </div>
          </div>

        </article>
      </div>
    </section>
  );
};

export default About;


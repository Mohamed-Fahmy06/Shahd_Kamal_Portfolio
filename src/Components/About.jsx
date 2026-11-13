import shahdPhoto from "../assets/shahd_photo.jpg";
import { GraduationCap, Briefcase, Layout } from "lucide-react";
import { usePortfolio } from "../context/PortfolioContext";

const About = ({ darkMode }) => {
  const { profile } = usePortfolio();

  return (
    <section
      id="About"
      className="min-h-screen overflow-hidden flex items-center justify-center px-4 sm:px-6 lg:px-12 py-20 cursor-default caret-transparent transition-colors duration-500"
    >
      <div className="max-w-7xl w-full grid grid-cols-1 lg:grid-cols-12 gap-8 sm:gap-12 lg:gap-14 items-center">
        {/* Left Side: Photo (takes 5 columns on desktop) */}
        <figure
          data-aos="fade-right"
          data-aos-delay="300"
          className="flex justify-center order-2 lg:order-1 lg:col-span-5"
        >
          <div className="relative w-72 sm:w-80 lg:w-full max-w-sm">
            {/* Ambient decorative glow */}
            <div
              className="absolute -inset-4 bg-linear-to-br from-rose-400 via-pink-500 to-rose-600 rounded-3xl opacity-25 blur-2xl z-0"
              data-aos="zoom-in"
              data-aos-delay="600"
            />
            <div
              className="absolute -inset-2 bg-linear-to-tr from-rose-500/20 to-transparent rounded-3xl rotate-3 z-0"
              data-aos="fade-up"
              data-aos-delay="700"
            />
            <img
              src={profile.aboutImage || profile.avatar || shahdPhoto}
              alt={profile.name || "Shahd Kamal"}
              width="384"
              height="480"
              loading="lazy"
              className="relative w-full h-auto object-cover rounded-3xl z-10 border-2 border-rose-400/30 shadow-2xl transition-all duration-500 hover:scale-102"
              data-aos="zoom-in"
              data-aos-delay="400"
            />
          </div>
        </figure>

        {/* Right Side: Article / Content (takes 7 columns on desktop - MORE WIDTH) */}
        <article
          data-aos="fade-left"
          data-aos-delay="300"
          className="text-center lg:text-left relative order-1 lg:order-2 lg:col-span-7"
        >
          <header>
            <div
              className="flex items-center justify-center lg:justify-start gap-2 mb-2"
              data-aos="fade-up"
              data-aos-delay="350"
            >
              <span className="w-8 h-0.5 bg-rose-500" />
              <span className="text-rose-500 font-semibold uppercase tracking-wider text-xs sm:text-sm">
                Get to know me
              </span>
            </div>
            <h2
              className="text-4xl sm:text-5xl lg:text-6xl font-extrabold mb-6 text-transparent bg-linear-to-r from-rose-500 via-pink-500 to-rose-400 bg-clip-text"
              data-aos="fade-up"
              data-aos-delay="400"
            >
              About Me
            </h2>
          </header>

          <div
            className={`text-sm sm:text-base lg:text-lg mb-8 leading-relaxed space-y-4
            border-l-4 border-rose-500 p-5 sm:p-7 rounded-r-2xl
            backdrop-blur-sm shadow-xl shadow-rose-900/5
            ${darkMode ? "text-gray-300 bg-white/5" : "text-gray-700 bg-rose-50/50"}`}
            data-aos="fade-up"
            data-aos-delay="500"
          >
            <p className="font-extrabold text-xl sm:text-2xl text-rose-500">
              {profile.aboutHeadline || "Beyond Numbers. Beyond Creativity."}
            </p>
            <p>
              {profile.aboutIntro || (
                <>
                  I'm <span className="text-rose-500 font-semibold italic">{profile.name || "Shahd Kamal"}</span>, a results-oriented professional passionate about the intersection of business, data, and digital growth innovation.
                </>
              )}
            </p>
            <p>I bring together two powerful disciplines that shape the way businesses grow and make decisions:</p>
            <p>
              <span className="text-rose-500 font-semibold">Data Analysis:</span>{" "}
              {profile.aboutDataAnalysis ||
                "Turning complex datasets into meaningful insights, uncovering hidden patterns, and translating numbers into strategic decisions. I focus on making data understandable, actionable, and valuable through analytical thinking and data visualization."}
            </p>
            <p>
              <span className="text-rose-500 font-semibold">Digital Marketing:</span>{" "}
              {profile.aboutDigitalMarketing ||
                "Combining creativity with strategic thinking to build engaging digital experiences, strengthen brand presence, understand audience behavior, and create content that connects brands with people."}
            </p>
            <p className="italic">
              {profile.aboutConclusion || (
                <>
                  I believe that successful businesses need more than data and more than creativity — they need the ability to connect both. My approach is simple:{" "}
                  <span className="font-semibold text-rose-400">Analyze with purpose, create with strategy, and deliver with impact.</span>
                </>
              )}
            </p>
          </div>

          <div className="grid grid-cols-3 gap-4 sm:gap-6 mb-8">
            {/* Disciplines */}
            <div
              className={`p-4 rounded-2xl transition-all duration-300 hover:-translate-y-1.5 shadow-md
              ${darkMode ? "bg-white/5 border border-white/10" : "bg-rose-50/80 border border-rose-100"}`}
              data-aos="zoom-in"
              data-aos-delay="600"
            >
              <div className="flex justify-center lg:justify-start mb-2 text-rose-500">
                <GraduationCap size={24} />
              </div>
              <div className="text-xl sm:text-2xl font-bold text-rose-500">
                {profile.disciplinesCount || "2"}
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
              className={`p-4 rounded-2xl transition-all duration-300 hover:-translate-y-1.5 shadow-md
              ${darkMode ? "bg-white/5 border border-white/10" : "bg-rose-50/80 border border-rose-100"}`}
              data-aos="zoom-in"
              data-aos-delay="700"
            >
              <div className="flex justify-center lg:justify-start mb-2 text-rose-500">
                <Briefcase size={24} />
              </div>
              <div className="text-xl sm:text-2xl font-bold text-rose-500">
                {profile.yearsExperience || "1+"}
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
              className={`p-4 rounded-2xl transition-all duration-300 hover:-translate-y-1.5 shadow-md
                ${darkMode ? "bg-white/5 border border-white/10" : "bg-rose-50/80 border border-rose-100"}`}
              data-aos="zoom-in"
              data-aos-delay="800"
            >
              <div className="flex justify-center lg:justify-start mb-2 text-rose-500">
                <Layout size={24} />
              </div>
              <div className="text-xl sm:text-2xl font-bold text-rose-500">
                CFA
              </div>
              <div
                className={`text-[10px] sm:text-xs font-medium uppercase tracking-tighter
                ${darkMode ? "text-gray-400" : "text-gray-600"}`}
              >
                {profile.cfaStage || "Stage 2"}
              </div>
            </div>
          </div>
        </article>
      </div>
    </section>
  );
};

export default About;

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { BarChart2, Megaphone, Briefcase } from "lucide-react";
import { client } from "../sanity/client";
import { SKILLS_QUERY } from "../sanity/queries";

const Skills = ({ darkMode }) => {
  const [activeTab, setActiveTab] = useState("data");

  const dataAnalysisSkills = [
    "Data Analysis & Interpretation",
    "Data Cleaning & Preparation",
    "Data Visualization",
    "Dashboard Development",
    "Business Intelligence",
    "Financial Data Analysis",
    "Financial Statement Analysis",
    "Financial Modeling & Valuation",
    "Reporting & Insights Generation",
  ];

  const dataAnalysisTools = ["Microsoft Excel", "Microsoft Power BI"];

  const digitalMarketingSkills = [
    "Digital Marketing Strategy",
    "Social Media Management",
    "Content Strategy",
    "Content Creation",
    "Marketing Campaign Planning",
    "Audience Analysis",
    "Community Management",
    "Brand Awareness",
  ];

  const digitalMarketingTools = [
    "Canva",
    "Meta Business Suite",
    "Facebook & Instagram",
  ];

  const productivityTools = ["Microsoft PowerPoint", "Microsoft Word"];

  const businessSkills = [
    "Business Research",
    "Market Research",
    "Analytical Thinking",
    "Problem Solving",
    "Strategic Thinking",
    "Communication & Presentation",
    "Teamwork & Collaboration",
    "Time Management",
  ];

  const [sanitySkills, setSanitySkills] = useState(null);

  useEffect(() => {
    client
      .fetch(SKILLS_QUERY)
      .then((data) => {
        if (data && data.length > 0) {
          const categorized = {
            dataAnalysis: [],
            dataTools: [],
            marketing: [],
            marketingTools: [],
            productivity: [],
            business: [],
          };
          data.forEach((s) => {
            if (s.category === "Data Analysis & Financial Research") categorized.dataAnalysis.push(s.name);
            else if (s.category === "Data Analysis Tools") categorized.dataTools.push(s.name);
            else if (s.category === "Digital Marketing") categorized.marketing.push(s.name);
            else if (s.category === "Productivity & Presentation") {
              if (s.name === "Canva" || s.name === "Meta Business Suite") categorized.marketingTools.push(s.name);
              else categorized.productivity.push(s.name);
            } else if (s.category === "Business & Professional Skills") categorized.business.push(s.name);
          });
          setSanitySkills(categorized);
        }
      })
      .catch((err) => console.warn("Sanity fetch skills fallback:", err));
  }, []);

  const currentDataSkills = sanitySkills?.dataAnalysis?.length ? sanitySkills.dataAnalysis : dataAnalysisSkills;
  const currentDataTools = sanitySkills?.dataTools?.length ? sanitySkills.dataTools : dataAnalysisTools;
  const currentMarketingSkills = sanitySkills?.marketing?.length ? sanitySkills.marketing : digitalMarketingSkills;
  const currentMarketingTools = sanitySkills?.marketingTools?.length ? sanitySkills.marketingTools : digitalMarketingTools;
  const currentProductivityTools = sanitySkills?.productivity?.length ? sanitySkills.productivity : productivityTools;
  const currentBusinessSkills = sanitySkills?.business?.length ? sanitySkills.business : businessSkills;

  const tabs = [
    { id: "data", label: "Data Analysis", icon: <BarChart2 size={18} /> },
    { id: "marketing", label: "Digital Marketing", icon: <Megaphone size={18} /> },
  ];

  const SkillTag = ({ label }) => (
    <motion.span
      whileHover={{ scale: 1.05, y: -2 }}
      transition={{ duration: 0.15 }}
      className="px-3 py-1.5 rounded-full text-xs sm:text-sm font-semibold border transition-colors inline-block cursor-default"
      style={{
        backgroundColor: darkMode ? "rgba(244, 63, 94, 0.1)" : "#fff1f2",
        color: "#f43f5e",
        borderColor: darkMode ? "rgba(244, 63, 94, 0.25)" : "#fecdd3",
      }}
    >
      {label}
    </motion.span>
  );

  const ToolBadge = ({ label }) => (
    <motion.div
      whileHover={{ scale: 1.02, x: 5 }}
      transition={{ duration: 0.15 }}
      className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-semibold border transition-all duration-300 cursor-default"
      style={{
        background: darkMode
          ? "linear-gradient(to bottom right, #1f2937, #111827)"
          : "linear-gradient(to bottom right, #ffffff, #fff1f2)",
        color: darkMode ? "white" : "#1f2937",
        borderColor: darkMode ? "#374151" : "#ffe4e6",
      }}
    >
      <span
        className="w-2 h-2 rounded-full shrink-0"
        style={{ background: "linear-gradient(to right, #f43f5e, #fb7185)" }}
      />
      {label}
    </motion.div>
  );

  return (
    <section
      id="Skills"
      style={{ backgroundColor: darkMode ? "#111827" : "#f9fafb" }}
      className="py-24 overflow-hidden relative cursor-default caret-transparent transition-colors duration-500"
    >
      <div className="container px-4 sm:px-8 lg:px-14 mx-auto">
        {/* Section Header */}
        <div className="text-center mb-14" data-aos="fade-up">
          <h1
            className="sm:text-4xl text-3xl font-bold title-font mb-4"
            style={{ color: darkMode ? "white" : "#1f2937" }}
          >
            My{" "}
            <span
              style={{
                background: "linear-gradient(to right, #f43f5e, #fb7185)",
                WebkitBackgroundClip: "text",
                backgroundClip: "text",
                color: "transparent",
              }}
            >
              Skills
            </span>
          </h1>
          <p
            className="max-w-2xl mx-auto leading-relaxed text-base sm:text-lg"
            style={{ color: darkMode ? "#d1d5db" : "#6b7280" }}
          >
            A blend of analytical expertise and creative digital strategy.
          </p>
        </div>

        {/* Tab Switcher with sliding indicator */}
        <div className="flex justify-center mb-10" data-aos="fade-up" data-aos-delay="100">
          <div
            className="flex rounded-2xl p-1.5 gap-2 backdrop-blur-md transition-colors duration-400"
            style={{
              background: darkMode ? "rgba(31, 41, 55, 0.85)" : "rgba(254, 226, 226, 0.6)",
              border: darkMode ? "1px solid rgba(75, 85, 99, 0.5)" : "1px solid rgba(254, 205, 211, 0.8)",
            }}
          >
            {tabs.map((tab) => {
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className="relative flex items-center gap-2 px-6 py-3 rounded-xl text-xs sm:text-sm font-semibold transition-colors duration-300 cursor-pointer"
                  style={{
                    color: isActive ? "#ffffff" : darkMode ? "#9ca3af" : "#4b5563",
                  }}
                >
                  {isActive && (
                    <motion.div
                      layoutId="activeSkillTabIndicator"
                      className="absolute inset-0 rounded-xl"
                      style={{
                        background: "linear-gradient(to right, #f43f5e, #fb7185)",
                        boxShadow: "0 4px 20px rgba(244, 63, 94, 0.35)",
                      }}
                      transition={{ type: "spring", stiffness: 400, damping: 30 }}
                    />
                  )}
                  <span className="relative z-10 flex items-center gap-2">
                    {tab.icon}
                    {tab.label}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Tab Content with smooth slide transitions */}
        <div className="relative overflow-hidden" data-aos="fade-up" data-aos-delay="200">
          <AnimatePresence mode="wait">
            {activeTab === "data" ? (
              <motion.div
                key="data"
                initial={{ opacity: 0, x: -35, filter: "blur(4px)" }}
                animate={{ opacity: 1, x: 0, filter: "blur(0px)" }}
                exit={{ opacity: 0, x: 35, filter: "blur(4px)" }}
                transition={{ duration: 0.35, ease: [0.25, 1, 0.5, 1] }}
                className="rounded-2xl border p-6 sm:p-8 max-w-4xl mx-auto transition-colors duration-500 shadow-xl"
                style={{
                  background: darkMode
                    ? "linear-gradient(to bottom right, #1f2937, #111827)"
                    : "linear-gradient(to bottom right, #ffffff, #fff1f2)",
                  borderColor: darkMode ? "#374151" : "#ffe4e6",
                }}
              >
                <div
                  className="h-1 w-20 rounded-full mb-6"
                  style={{ background: "linear-gradient(to right, #f43f5e, #fb7185)" }}
                />
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                  {/* Skills */}
                  <div>
                    <h3
                      className="text-lg font-bold mb-4 flex items-center gap-2"
                      style={{ color: darkMode ? "white" : "#1f2937" }}
                    >
                      <BarChart2 size={20} className="text-rose-500" />
                      Skills
                    </h3>
                    <div className="flex flex-wrap gap-2">
                      {currentDataSkills.map((s, i) => (
                        <SkillTag key={i} label={s} />
                      ))}
                    </div>
                  </div>
                  {/* Tools */}
                  <div>
                    <h3
                      className="text-lg font-bold mb-4"
                      style={{ color: darkMode ? "white" : "#1f2937" }}
                    >
                      🛠 Tools
                    </h3>
                    <div className="flex flex-col gap-2">
                      {currentDataTools.map((t, i) => (
                        <ToolBadge key={i} label={t} />
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>
            ) : (
              <motion.div
                key="marketing"
                initial={{ opacity: 0, x: 35, filter: "blur(4px)" }}
                animate={{ opacity: 1, x: 0, filter: "blur(0px)" }}
                exit={{ opacity: 0, x: -35, filter: "blur(4px)" }}
                transition={{ duration: 0.35, ease: [0.25, 1, 0.5, 1] }}
                className="rounded-2xl border p-6 sm:p-8 max-w-4xl mx-auto transition-colors duration-500 shadow-xl"
                style={{
                  background: darkMode
                    ? "linear-gradient(to bottom right, #1f2937, #111827)"
                    : "linear-gradient(to bottom right, #ffffff, #fff1f2)",
                  borderColor: darkMode ? "#374151" : "#ffe4e6",
                }}
              >
                <div
                  className="h-1 w-20 rounded-full mb-6"
                  style={{ background: "linear-gradient(to right, #f43f5e, #fb7185)" }}
                />
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                  {/* Skills */}
                  <div>
                    <h3
                      className="text-lg font-bold mb-4 flex items-center gap-2"
                      style={{ color: darkMode ? "white" : "#1f2937" }}
                    >
                      <Megaphone size={20} className="text-rose-500" />
                      Skills
                    </h3>
                    <div className="flex flex-wrap gap-2">
                      {currentMarketingSkills.map((s, i) => (
                        <SkillTag key={i} label={s} />
                      ))}
                    </div>
                  </div>
                  {/* Tools */}
                  <div>
                    <h3
                      className="text-lg font-bold mb-4"
                      style={{ color: darkMode ? "white" : "#1f2937" }}
                    >
                      🛠 Tools
                    </h3>
                    <div className="flex flex-col gap-2">
                      {[...currentMarketingTools, ...currentProductivityTools].map((t, i) => (
                        <ToolBadge key={i} label={t} />
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Business & Professional Skills — always visible */}
        <div className="mt-10 max-w-4xl mx-auto" data-aos="fade-up" data-aos-delay="300">
          <div
            className="rounded-2xl border p-6 sm:p-8 transition-colors duration-500 shadow-xl"
            style={{
              background: darkMode
                ? "linear-gradient(to bottom right, #1f2937, #111827)"
                : "linear-gradient(to bottom right, #ffffff, #fff1f2)",
              borderColor: darkMode ? "#374151" : "#ffe4e6",
            }}
          >
            <div
              className="h-1 w-20 rounded-full mb-6"
              style={{ background: "linear-gradient(to right, #f43f5e, #fb7185)" }}
            />
            <h3
              className="text-lg font-bold mb-5 flex items-center gap-2"
              style={{ color: darkMode ? "white" : "#1f2937" }}
            >
              <Briefcase size={20} className="text-rose-500" />
              Business &amp; Professional Skills
            </h3>
            <div className="flex flex-wrap gap-2">
              {currentBusinessSkills.map((s, i) => (
                <SkillTag key={i} label={s} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Skills;

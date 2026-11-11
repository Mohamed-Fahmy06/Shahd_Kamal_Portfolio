import { useState } from "react";
import { BarChart2, Megaphone, Briefcase } from "lucide-react";

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

  const tabs = [
    { id: "data", label: "Data Analysis", icon: <BarChart2 size={18} /> },
    { id: "marketing", label: "Digital Marketing", icon: <Megaphone size={18} /> },
  ];

  const SkillTag = ({ label }) => (
    <span
      className="px-3 py-1.5 rounded-full text-sm font-medium border transition-colors"
      style={{
        backgroundColor: darkMode ? "rgba(249, 115, 22, 0.1)" : "#fff7ed",
        color: "#f97316",
        borderColor: darkMode ? "rgba(249, 115, 22, 0.25)" : "#ffedd5",
      }}
    >
      {label}
    </span>
  );

  const ToolBadge = ({ label }) => (
    <div
      className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-semibold border"
      style={{
        background: darkMode
          ? "linear-gradient(to bottom right, #1f2937, #111827)"
          : "linear-gradient(to bottom right, #ffffff, #f3f4f6)",
        color: darkMode ? "white" : "#1f2937",
        borderColor: darkMode ? "#374151" : "#e5e7eb",
      }}
    >
      <span
        className="w-2 h-2 rounded-full flex-shrink-0"
        style={{ background: "linear-gradient(to right, #f97316, #f59e0b)" }}
      />
      {label}
    </div>
  );

  return (
    <section
      id="Skills"
      style={{ backgroundColor: darkMode ? "#111827" : "#f9fafb" }}
      className="py-24 overflow-hidden relative cursor-default caret-transparent"
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
                background: "linear-gradient(to right, #f97316, #f59e0b)",
                WebkitBackgroundClip: "text",
                backgroundClip: "text",
                color: "transparent",
              }}
            >
              Skills
            </span>
          </h1>
          <p
            className="max-w-2xl mx-auto leading-relaxed text-lg"
            style={{ color: darkMode ? "#d1d5db" : "#4b5563" }}
          >
            A blend of analytical expertise and creative digital strategy.
          </p>
        </div>

        {/* Tab Switcher */}
        <div className="flex justify-center mb-10" data-aos="fade-up" data-aos-delay="100">
          <div
            className="flex rounded-2xl p-1 gap-1"
            style={{
              background: darkMode ? "#1f2937" : "#e5e7eb",
            }}
          >
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className="flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-semibold transition-all duration-300"
                style={
                  activeTab === tab.id
                    ? {
                        background: "linear-gradient(to right, #f97316, #f59e0b)",
                        color: "white",
                        boxShadow: "0 4px 15px rgba(249, 115, 22, 0.35)",
                      }
                    : {
                        color: darkMode ? "#9ca3af" : "#6b7280",
                        background: "transparent",
                      }
                }
              >
                {tab.icon}
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Tab Content */}
        <div data-aos="fade-up" data-aos-delay="200">
          {activeTab === "data" && (
            <div
              className="rounded-2xl border p-6 sm:p-8 max-w-4xl mx-auto"
              style={{
                background: darkMode
                  ? "linear-gradient(to bottom right, #1f2937, #111827)"
                  : "linear-gradient(to bottom right, #ffffff, #f9fafb)",
                borderColor: darkMode ? "#374151" : "#e5e7eb",
              }}
            >
              <div
                className="h-1 w-20 rounded-full mb-6"
                style={{ background: "linear-gradient(to right, #f97316, #f59e0b)" }}
              />
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Skills */}
                <div>
                  <h3
                    className="text-lg font-bold mb-4 flex items-center gap-2"
                    style={{ color: darkMode ? "white" : "#1f2937" }}
                  >
                    <BarChart2 size={20} className="text-orange-500" />
                    Skills
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {dataAnalysisSkills.map((s, i) => (
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
                    {dataAnalysisTools.map((t, i) => (
                      <ToolBadge key={i} label={t} />
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === "marketing" && (
            <div
              className="rounded-2xl border p-6 sm:p-8 max-w-4xl mx-auto"
              style={{
                background: darkMode
                  ? "linear-gradient(to bottom right, #1f2937, #111827)"
                  : "linear-gradient(to bottom right, #ffffff, #f9fafb)",
                borderColor: darkMode ? "#374151" : "#e5e7eb",
              }}
            >
              <div
                className="h-1 w-20 rounded-full mb-6"
                style={{ background: "linear-gradient(to right, #f97316, #f59e0b)" }}
              />
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Skills */}
                <div>
                  <h3
                    className="text-lg font-bold mb-4 flex items-center gap-2"
                    style={{ color: darkMode ? "white" : "#1f2937" }}
                  >
                    <Megaphone size={20} className="text-orange-500" />
                    Skills
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {digitalMarketingSkills.map((s, i) => (
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
                    {[...digitalMarketingTools, ...productivityTools].map((t, i) => (
                      <ToolBadge key={i} label={t} />
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Business & Professional Skills — always visible */}
        <div className="mt-10 max-w-4xl mx-auto" data-aos="fade-up" data-aos-delay="300">
          <div
            className="rounded-2xl border p-6 sm:p-8"
            style={{
              background: darkMode
                ? "linear-gradient(to bottom right, #1f2937, #111827)"
                : "linear-gradient(to bottom right, #ffffff, #f9fafb)",
              borderColor: darkMode ? "#374151" : "#e5e7eb",
            }}
          >
            <div
              className="h-1 w-20 rounded-full mb-6"
              style={{ background: "linear-gradient(to right, #f97316, #f59e0b)" }}
            />
            <h3
              className="text-lg font-bold mb-5 flex items-center gap-2"
              style={{ color: darkMode ? "white" : "#1f2937" }}
            >
              <Briefcase size={20} className="text-orange-500" />
              Business &amp; Professional Skills
            </h3>
            <div className="flex flex-wrap gap-2">
              {businessSkills.map((s, i) => (
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

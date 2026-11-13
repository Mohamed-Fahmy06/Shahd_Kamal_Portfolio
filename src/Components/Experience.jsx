import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Briefcase, TrendingUp, GraduationCap, Award, CheckCircle2, Calendar, Building2 } from "lucide-react";

const Experience = ({ darkMode }) => {
  const [activeTab, setActiveTab] = useState("cfa");

  const experiences = {
    cfa: {
      number: "01",
      category: "Data Analysis & Financial Research",
      title: "CFA Research Challenge & Data Analysis Projects",
      role: "Financial Analyst & Data Analyst",
      period: "2026 – Present",
      organization: "CFA Institute Research Challenge",
      badge: "External Stage Qualifier (Active)",
      bullets: [
        "Analyze financial statements and key performance indicators to evaluate business performance.",
        "Conduct financial and industry research to understand market trends and competitive positioning.",
        "Perform company valuation and investment analysis as part of the CFA Research Challenge.",
        "Analyze datasets to identify patterns, trends, and meaningful business insights.",
        "Use analytical tools to organize, analyze, and visualize data.",
        "Develop reports and dashboards to communicate findings and support data-driven decisions.",
        "Successfully completed the Internal Stage and qualified for the External Stage of the CFA Research Challenge, currently participating in the External Stage.",
      ],
      skills: [
        "Financial Statement Analysis",
        "Company Valuation",
        "Industry & Market Research",
        "Dashboard Development",
        "KPI Modeling",
      ],
    },
    trainer: {
      number: "02",
      category: "Finance Training & Education",
      title: "EELU Aswan Student Branch",
      role: "Finance Trainer",
      period: "2025",
      organization: "National Egyptian E-Learning University",
      badge: "Finance Education & Mentorship",
      bullets: [
        "Delivered finance-related training sessions to student participants.",
        "Explained financial concepts and supported practical learning.",
        "Contributed to knowledge sharing and financial education.",
        "Helped students develop their understanding of finance.",
      ],
      skills: [
        "Financial Education",
        "Curriculum Delivery",
        "Public Speaking",
        "Concept Simplification",
        "Student Mentorship",
      ],
    },
  };

  const tabs = [
    { id: "cfa", label: "Financial & Data Analyst", icon: <TrendingUp size={18} /> },
    { id: "trainer", label: "Finance Trainer", icon: <GraduationCap size={18} /> },
  ];

  const activeExp = experiences[activeTab];

  return (
    <section
      id="Experience"
      style={{ backgroundColor: darkMode ? "#111827" : "#f9fafb" }}
      className="py-24 overflow-hidden relative cursor-default caret-transparent transition-colors duration-500"
    >
      <div className="container mx-auto px-4 sm:px-8 lg:px-14">
        {/* Section Header */}
        <div className="text-center mb-14" data-aos="fade-up">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-semibold uppercase tracking-widest text-rose-500 bg-rose-500/10 border border-rose-500/20 mb-3">
            <Award size={14} /> Career Path &amp; Milestones
          </div>
          <h2
            className="sm:text-4xl text-3xl font-bold title-font mb-4"
            style={{ color: darkMode ? "white" : "#1f2937" }}
          >
            Work{" "}
            <span
              style={{
                background: "linear-gradient(to right, #f43f5e, #fb7185)",
                WebkitBackgroundClip: "text",
                backgroundClip: "text",
                color: "transparent",
              }}
            >
              Experience
            </span>
          </h2>
          <p
            className="max-w-2xl mx-auto leading-relaxed text-base sm:text-lg"
            style={{ color: darkMode ? "#d1d5db" : "#6b7280" }}
          >
            Professional milestones in data analytics, financial research, and education.
          </p>
        </div>

        {/* Tab Switcher (identical to Skills section) */}
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
                  className="relative flex items-center gap-2 px-5 sm:px-6 py-3 rounded-xl text-xs sm:text-sm font-semibold transition-colors duration-300 cursor-pointer"
                  style={{
                    color: isActive ? "#ffffff" : darkMode ? "#9ca3af" : "#4b5563",
                  }}
                >
                  {isActive && (
                    <motion.div
                      layoutId="activeExperienceTabIndicator"
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

        {/* Experience Content Card with AnimatePresence */}
        <div className="relative overflow-hidden max-w-4xl mx-auto" data-aos="fade-up" data-aos-delay="200">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, x: activeTab === "trainer" ? 35 : -35, filter: "blur(4px)" }}
              animate={{ opacity: 1, x: 0, filter: "blur(0px)" }}
              exit={{ opacity: 0, x: activeTab === "trainer" ? -35 : 35, filter: "blur(4px)" }}
              transition={{ duration: 0.35, ease: [0.25, 1, 0.5, 1] }}
              className="rounded-2xl border p-6 sm:p-8 transition-colors duration-500 shadow-xl"
              style={{
                background: darkMode
                  ? "linear-gradient(to bottom right, #1f2937, #111827)"
                  : "linear-gradient(to bottom right, #ffffff, #fff1f2)",
                borderColor: darkMode ? "#374151" : "#ffe4e6",
              }}
            >
              {/* Top Accent Gradient Bar */}
              <div
                className="h-1 w-20 rounded-full mb-6"
                style={{ background: "linear-gradient(to right, #f43f5e, #fb7185)" }}
              />

              {/* Header: Number, Role & Organization */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6 pb-6 border-b border-gray-700/20">
                <div className="flex items-start gap-4">
                  <span
                    className="text-4xl sm:text-5xl font-extrabold leading-none shrink-0"
                    style={{
                      background: "linear-gradient(to right, #f43f5e, #fb7185)",
                      WebkitBackgroundClip: "text",
                      backgroundClip: "text",
                      color: "transparent",
                    }}
                  >
                    {activeExp.number}
                  </span>
                  <div>
                    <span className="text-[11px] font-bold uppercase tracking-wider text-rose-500 block mb-1">
                      {activeExp.category}
                    </span>
                    <h3
                      className="text-xl sm:text-2xl font-bold"
                      style={{ color: darkMode ? "white" : "#1f2937" }}
                    >
                      {activeExp.title}
                    </h3>
                    <div className="flex flex-wrap items-center gap-3 mt-2 text-xs sm:text-sm">
                      <span className="flex items-center gap-1 font-semibold text-rose-500">
                        <Briefcase size={14} /> {activeExp.role}
                      </span>
                      <span className="text-gray-400">&bull;</span>
                      <span
                        className="flex items-center gap-1 font-medium"
                        style={{ color: darkMode ? "#d1d5db" : "#4b5563" }}
                      >
                        <Building2 size={14} /> {activeExp.organization}
                      </span>
                      <span className="text-gray-400">&bull;</span>
                      <span
                        className="flex items-center gap-1 font-medium"
                        style={{ color: darkMode ? "#9ca3af" : "#6b7280" }}
                      >
                        <Calendar size={14} /> {activeExp.period}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="sm:self-start">
                  <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold bg-rose-500/10 text-rose-500 border border-rose-500/20 whitespace-nowrap">
                    <CheckCircle2 size={14} /> {activeExp.badge}
                  </span>
                </div>
              </div>

              {/* Responsibilities Grid */}
              <div className="mb-6">
                <h4
                  className="text-sm font-bold uppercase tracking-wider text-rose-500 mb-3 flex items-center gap-2"
                >
                  <Award size={16} /> Key Responsibilities &amp; Deliverables
                </h4>
                <ul className="space-y-2.5">
                  {activeExp.bullets.map((bullet, bIndex) => (
                    <li
                      key={bIndex}
                      className="flex items-start gap-3 text-xs sm:text-sm leading-relaxed"
                      style={{ color: darkMode ? "#d1d5db" : "#374151" }}
                    >
                      <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-rose-500 shrink-0" />
                      <span>{bullet}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Competencies Tags */}
              <div className="pt-4 border-t border-gray-700/20">
                <p className="text-xs font-bold uppercase tracking-wider text-rose-500 mb-2.5">
                  Core Competencies Applied:
                </p>
                <div className="flex flex-wrap gap-2">
                  {activeExp.skills.map((skill, sIdx) => (
                    <span
                      key={sIdx}
                      className="px-3 py-1 text-xs font-semibold rounded-full border transition-colors"
                      style={{
                        backgroundColor: darkMode ? "rgba(244, 63, 94, 0.1)" : "#fff1f2",
                        color: "#f43f5e",
                        borderColor: darkMode ? "rgba(244, 63, 94, 0.25)" : "#fecdd3",
                      }}
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Bottom Feature Card (identical to Business Skills block in Skills section) */}
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
              className="text-lg font-bold mb-4 flex items-center gap-2"
              style={{ color: darkMode ? "white" : "#1f2937" }}
            >
              <Award size={20} className="text-rose-500" />
              Professional Highlights &amp; Accreditations
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {[
                "CFA Institute Research Challenge Stage 2 Qualifier",
                "Advanced Financial Statement & DCF Valuation",
                "Interactive BI Dashboards for Strategic Decisions",
                "Delivered Practical Financial Training for 100+ Students",
              ].map((highlight, hIdx) => (
                <div
                  key={hIdx}
                  className="flex items-center gap-2.5 p-3 rounded-xl border text-xs sm:text-sm font-semibold"
                  style={{
                    backgroundColor: darkMode ? "rgba(31, 41, 55, 0.6)" : "#ffffff",
                    borderColor: darkMode ? "#374151" : "#fecdd3",
                    color: darkMode ? "white" : "#1f2937",
                  }}
                >
                  <CheckCircle2 size={16} className="text-rose-500 shrink-0" />
                  <span>{highlight}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Experience;

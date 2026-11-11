import { Briefcase } from "lucide-react";

const Experience = ({ darkMode }) => {
  const experiences = [
    {
      number: "01",
      category: "Data Analysis & Financial Research",
      title: "CFA Research Challenge & Data Analysis Projects",
      role: "Financial Analyst & Data Analyst",
      period: "2026 – Present",
      bullets: [
        "Analyze financial statements and key performance indicators to evaluate business performance.",
        "Conduct financial and industry research to understand market trends and competitive positioning.",
        "Perform company valuation and investment analysis as part of the CFA Research Challenge.",
        "Analyze datasets to identify patterns, trends, and meaningful business insights.",
        "Use analytical tools to organize, analyze, and visualize data.",
        "Develop reports and dashboards to communicate findings and support data-driven decisions.",
        "Successfully completed the Internal Stage and qualified for the External Stage of the CFA Research Challenge, currently participating in the External Stage.",
      ],
    },
    {
      number: "02",
      category: "Finance Training & Education",
      title: "EELU Aswan Student Branch",
      role: "Finance Trainer",
      period: "2025",
      bullets: [
        "Delivered finance-related training sessions to student participants.",
        "Explained financial concepts and supported practical learning.",
        "Contributed to knowledge sharing and financial education.",
        "Helped students develop their understanding of finance.",
      ],
    },
  ];

  return (
    <section
      id="Experience"
      style={{ backgroundColor: darkMode ? "#111827" : "#f9fafb" }}
      className="py-24 overflow-hidden relative cursor-default caret-transparent"
    >
      <div className="container mx-auto px-4 sm:px-8 lg:px-14">
        <div className="text-center mb-16" data-aos="fade-up">
          <h2
            className="sm:text-4xl text-3xl font-bold title-font mb-4"
            style={{ color: darkMode ? "white" : "#1f2937" }}
          >
            Work{" "}
            <span
              style={{
                background: "linear-gradient(to right, #f97316, #f59e0b)",
                WebkitBackgroundClip: "text",
                backgroundClip: "text",
                color: "transparent",
              }}
            >
              Experience
            </span>
          </h2>
          <p
            className="max-w-2xl mx-auto leading-relaxed text-lg"
            style={{ color: darkMode ? "#d1d5db" : "#4b5563" }}
          >
            My professional journey in data, finance, and education.
          </p>
        </div>

        <div className="flex flex-col gap-8 max-w-4xl mx-auto">
          {experiences.map((exp, index) => (
            <div
              key={index}
              data-aos="fade-up"
              data-aos-delay={index * 150}
              className="rounded-2xl border overflow-hidden transition-all duration-300 hover:border-orange-500/50"
              style={{
                background: darkMode
                  ? "linear-gradient(to bottom right, #1f2937, #111827)"
                  : "linear-gradient(to bottom right, #ffffff, #f9fafb)",
                borderColor: darkMode ? "#374151" : "#e5e7eb",
              }}
            >
              <div
                className="h-1 w-full"
                style={{
                  background: "linear-gradient(to right, #f97316, #f59e0b)",
                }}
              />

              <div className="p-6 sm:p-8">
                <div className="flex items-start gap-4 mb-4">
                  <span
                    className="text-4xl font-bold leading-none flex-shrink-0"
                    style={{
                      background: "linear-gradient(to right, #f97316, #f59e0b)",
                      WebkitBackgroundClip: "text",
                      backgroundClip: "text",
                      color: "transparent",
                    }}
                  >
                    {exp.number}
                  </span>
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-widest text-orange-500 mb-1">
                      {exp.category}
                    </p>
                    <h3
                      className="text-lg sm:text-xl font-bold"
                      style={{ color: darkMode ? "white" : "#1f2937" }}
                    >
                      {exp.title}
                    </h3>
                  </div>
                </div>

                <div className="flex items-center gap-2 mb-6">
                  <Briefcase size={16} className="text-orange-500 flex-shrink-0" />
                  <span
                    className="text-sm font-medium"
                    style={{ color: darkMode ? "#d1d5db" : "#6b7280" }}
                  >
                    {exp.role}
                  </span>
                  <span style={{ color: darkMode ? "#6b7280" : "#9ca3af" }}>|</span>
                  <span className="text-sm font-semibold text-orange-400">{exp.period}</span>
                </div>

                <ul className="space-y-2">
                  {exp.bullets.map((bullet, bIndex) => (
                    <li
                      key={bIndex}
                      className="flex items-start gap-3 text-sm sm:text-base"
                      style={{ color: darkMode ? "#d1d5db" : "#4b5563" }}
                    >
                      <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-orange-500 flex-shrink-0" />
                      {bullet}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Experience;

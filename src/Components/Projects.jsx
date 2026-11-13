import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  BarChart3,
  TrendingUp,
  Activity,
  Layers,
  Eye,
  X,
  CheckCircle2,
  Table as TableIcon,
  LayoutGrid,
  Sparkles,
} from "lucide-react";

import orascomImg from "../assets/projects/orascom-dashboard.jpg";
import magdiYacoubImg from "../assets/projects/magdi-yacoub-dashboard.jpg";
import covidImg from "../assets/projects/covid19-dashboard.png";

const Projects = ({ darkMode }) => {
  const [activeCategory, setActiveCategory] = useState("all");
  const [viewMode, setViewMode] = useState("grid");
  const [selectedProject, setSelectedProject] = useState(null);

  const projectsList = [
    {
      id: 1,
      title: "Orascom Construction Financial Analytics & Valuation",
      category: "financial",
      categoryLabel: "Financial Analysis",
      des: "Comprehensive 4-tier financial intelligence dashboard analyzing Orascom's profitability, revenue trends, liquidity ratios, debt-to-equity leverage, and shareholder returns (ROE & ROA).",
      longDes:
        "Engineered an executive corporate finance dashboard modeled in Power BI to analyze Orascom Construction's historical statements. The model features 4 structured report pages: Corporate Performance, Profitability & Growth, Financial Position & Liquidity, and Capital Structure & Leverage. Key insights helped identify working capital improvements and capital efficiency trends.",
      image: orascomImg,
      alt: "Orascom Financial Analytics Dashboard",
      kpis: [
        "Revenue Growth Rate",
        "Net Profit Margin",
        "Current & Quick Ratios",
        "Debt-to-Equity Ratio",
        "ROE & ROA",
      ],
      tags: ["Power BI", "Financial Modeling", "Corporate Finance", "DAX", "Valuation"],
      status: "Completed",
      impact: "Identified working capital trends & multi-year margin variances across key revenue streams.",
    },
    {
      id: 2,
      title: "Magdi Yacoub Heart Foundation Hospital & Patient Care Analytics",
      category: "healthcare",
      categoryLabel: "Healthcare Analytics",
      des: "Multi-department clinical and operational intelligence system for the Aswan Heart Centre tracking cardiac diagnoses, risk thresholds, surgical volume, bed occupancy rates, and treatment economics.",
      longDes:
        "Designed a healthcare analytics solution for the Magdi Yacoub Heart Foundation in Aswan. Incorporates multi-dimensional data models tracking cardiovascular diagnoses (Mitral Regurgitation, Aortic Stenosis, CAD, Rheumatic Heart Disease), patient demographic profiles, attending physician workloads, bed occupancy rates, and average length of stay (LOS).",
      image: magdiYacoubImg,
      alt: "Magdi Yacoub Hospital Analytics Dashboard",
      kpis: [
        "Bed Occupancy Rate",
        "Avg Length of Stay (LOS)",
        "% Critical Cases",
        "Avg Cost per Patient",
        "Physician Case Distribution",
      ],
      tags: ["Power BI", "Healthcare BI", "Clinical Analytics", "DAX", "Hospital Management"],
      status: "Completed",
      impact: "Streamlined resource allocation and provided visibility into critical patient thresholds.",
    },
    {
      id: 3,
      title: "COVID-19 Global Health & Critical Care Epidemiology Dashboard",
      category: "healthcare",
      categoryLabel: "Healthcare Analytics",
      des: "Executive epidemiology and resource optimization dashboard monitoring worldwide infection waves, mortality rates, ICU bed capacity, mechanical ventilator utilization, and critical care economics.",
      longDes:
        "Built an 8-page global epidemiology dashboard modeled in Power BI tracking worldwide pandemic metrics. Connects multi-national health datasets to analyze global infection timelines, mortality and survival ratios, hospital-level ICU bed occupancy, mechanical ventilator allocation, and critical care treatment expenses.",
      image: covidImg,
      alt: "COVID-19 Healthcare Analytics Dashboard",
      kpis: [
        "Mortality Rate %",
        "ICU Utilization %",
        "Ventilator Allocation",
        "Vaccination Coverage %",
        "Avg ICU Bill (USD)",
      ],
      tags: ["Power BI", "Epidemiology", "Resource Optimization", "Healthcare Analytics", "DAX"],
      status: "Completed",
      impact: "Modeled ventilator shortages and forecasted peak occupancy periods for intensive care units.",
    },
    {
      id: 4,
      title: "Telecom Egypt (WE) Performance & Business Intelligence",
      category: "business",
      categoryLabel: "Business Intelligence",
      des: "Comprehensive telecom analytics platform tracking subscriber net adds, Average Revenue Per User (ARPU), regional network performance, customer churn indicators, and service profitability.",
      longDes:
        "Developed a telecommunications KPI dashboard tracking subscriber lifecycles for Telecom Egypt (WE). Visualizes monthly recurring revenue, ARPU dynamics across voice and broadband, churn propensity factors, and regional traffic volume to empower data-driven customer retention strategies.",
      image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=2340&auto=format&fit=crop",
      alt: "Telecom Egypt Business Intelligence Dashboard",
      kpis: [
        "ARPU (Avg Revenue / User)",
        "Churn Rate %",
        "Subscriber Net Adds",
        "Data Traffic Volume",
        "Regional Market Share",
      ],
      tags: ["Power BI", "Telecom BI", "Subscriber Analytics", "KPI Tracking", "Business Intelligence"],
      status: "Completed",
      impact: "Uncovered key churn drivers and highlighted high-value subscriber revenue segments.",
    },
    {
      id: 5,
      title: "Accounting & Financial Statement Analysis Project",
      category: "financial",
      categoryLabel: "Financial Analysis",
      des: "Dynamic financial modeling system analyzing Balance Sheets, Income Statements, and Cash Flow statements. Automatically calculates working capital health, solvency indexes, and ratio analysis.",
      longDes:
        "Constructed an automated financial reporting and ratio analysis model in Microsoft Excel and Power BI. Features dynamic linking between Income Statement, Balance Sheet, and Cash Flow to analyze working capital cycles, liquidity margins, operating leverage, and DuPont financial breakdown.",
      image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=2426&auto=format&fit=crop",
      alt: "Accounting Financial Statement Modeling",
      kpis: [
        "Working Capital Cycle",
        "Operating Cash Flow",
        "Current & Quick Ratios",
        "Gross & Net Margin",
        "Asset Turnover",
      ],
      tags: ["Microsoft Excel", "Power BI", "Financial Modeling", "Ratio Analysis", "Accounting"],
      status: "Completed",
      impact: "Automated statement reconciliation and generated executive summary visualizations.",
    },
  ];

  const categories = [
    { id: "all", label: "All Dashboards", count: projectsList.length },
    {
      id: "financial",
      label: "Financial Analysis",
      count: projectsList.filter((p) => p.category === "financial").length,
    },
    {
      id: "healthcare",
      label: "Healthcare Analytics",
      count: projectsList.filter((p) => p.category === "healthcare").length,
    },
    {
      id: "business",
      label: "Business Intelligence",
      count: projectsList.filter((p) => p.category === "business").length,
    },
  ];

  const filteredProjects =
    activeCategory === "all"
      ? projectsList
      : projectsList.filter((p) => p.category === activeCategory);

  return (
    <section
      id="Projects"
      style={{ backgroundColor: darkMode ? "#111827" : "#f9fafb" }}
      className="relative py-24 cursor-default caret-transparent transition-colors duration-500 overflow-hidden"
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-12">
        {/* Section Header */}
        <div className="text-center mb-12" data-aos="fade-up">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-semibold uppercase tracking-widest text-rose-500 bg-rose-500/10 border border-rose-500/20 mb-3">
            <Sparkles size={14} /> Analytics &amp; BI Portfolio
          </div>
          <h2
            style={{ color: darkMode ? "white" : "#1f2937" }}
            className="sm:text-4xl font-bold mb-4 text-3xl"
          >
            Data &amp; Analytics{" "}
            <span
              style={{
                background: "linear-gradient(to right, #f43f5e, #fb7185)",
                WebkitBackgroundClip: "text",
                backgroundClip: "text",
                color: "transparent",
              }}
            >
              Dashboards
            </span>
          </h2>
          <p
            className="max-w-2xl mx-auto text-base sm:text-lg"
            style={{ color: darkMode ? "#d1d5db" : "#6b7280" }}
          >
            Interactive Power BI dashboards, clinical intelligence models, and financial valuation projects delivering actionable business decisions.
          </p>
        </div>

        {/* Executive KPI Overview Strip */}
        <div
          className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12"
          data-aos="fade-up"
          data-aos-delay="100"
        >
          {[
            {
              label: "Analytical Dashboards",
              value: "5+",
              icon: <BarChart3 className="text-rose-500" size={22} />,
              detail: "Power BI & Excel",
            },
            {
              label: "Industry Domains",
              value: "3",
              icon: <Layers className="text-rose-500" size={22} />,
              detail: "Finance, Health, Telecom",
            },
            {
              label: "KPIs Modeled",
              value: "35+",
              icon: <TrendingUp className="text-rose-500" size={22} />,
              detail: "Profit, Liquidity, Care",
            },
            {
              label: "Data Architecture",
              value: "100%",
              icon: <Activity className="text-rose-500" size={22} />,
              detail: "DAX & Dynamic Models",
            },
          ].map((stat, idx) => (
            <div
              key={idx}
              className="p-5 rounded-2xl border transition-all duration-300 hover:-translate-y-1 shadow-md"
              style={{
                background: darkMode
                  ? "linear-gradient(to bottom right, #1f2937, #111827)"
                  : "linear-gradient(to bottom right, #ffffff, #fff1f2)",
                borderColor: darkMode ? "#374151" : "#ffe4e6",
              }}
            >
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-semibold uppercase tracking-wider text-rose-500">
                  {stat.detail}
                </span>
                {stat.icon}
              </div>
              <div
                className="text-2xl sm:text-3xl font-extrabold mb-1"
                style={{
                  background: "linear-gradient(to right, #f43f5e, #fb7185)",
                  WebkitBackgroundClip: "text",
                  backgroundClip: "text",
                  color: "transparent",
                }}
              >
                {stat.value}
              </div>
              <p
                className="text-xs sm:text-sm font-medium"
                style={{ color: darkMode ? "#9ca3af" : "#6b7280" }}
              >
                {stat.label}
              </p>
            </div>
          ))}
        </div>

        {/* Dashboard Control Bar (Category Filter + View Mode Toggle) */}
        <div
          className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-10"
          data-aos="fade-up"
          data-aos-delay="150"
        >
          {/* Category Tabs */}
          <div
            className="flex flex-wrap items-center justify-center sm:justify-start gap-1.5 p-1.5 rounded-2xl backdrop-blur-md"
            style={{
              background: darkMode ? "rgba(31, 41, 55, 0.85)" : "rgba(254, 226, 226, 0.6)",
              border: darkMode ? "1px solid rgba(75, 85, 99, 0.5)" : "1px solid rgba(254, 205, 211, 0.8)",
            }}
          >
            {categories.map((cat) => {
              const isActive = activeCategory === cat.id;
              return (
                <button
                  key={cat.id}
                  onClick={() => setActiveCategory(cat.id)}
                  className="relative px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-colors duration-200 cursor-pointer flex items-center gap-2"
                  style={{
                    color: isActive ? "#ffffff" : darkMode ? "#9ca3af" : "#4b5563",
                  }}
                >
                  {isActive && (
                    <motion.div
                      layoutId="activeProjectCategory"
                      className="absolute inset-0 rounded-xl"
                      style={{
                        background: "linear-gradient(to right, #f43f5e, #fb7185)",
                        boxShadow: "0 4px 15px rgba(244, 63, 94, 0.35)",
                      }}
                      transition={{ type: "spring", stiffness: 400, damping: 30 }}
                    />
                  )}
                  <span className="relative z-10">{cat.label}</span>
                  <span
                    className="relative z-10 text-[11px] px-1.5 py-0.5 rounded-full"
                    style={{
                      background: isActive
                        ? "rgba(255, 255, 255, 0.25)"
                        : darkMode
                        ? "rgba(55, 65, 81, 0.8)"
                        : "rgba(254, 205, 211, 0.7)",
                      color: isActive ? "white" : darkMode ? "#9ca3af" : "#6b7280",
                    }}
                  >
                    {cat.count}
                  </span>
                </button>
              );
            })}
          </div>

          {/* View Mode Switcher */}
          <div
            className="flex items-center gap-1 p-1 rounded-xl"
            style={{
              background: darkMode ? "rgba(31, 41, 55, 0.85)" : "rgba(254, 226, 226, 0.6)",
            }}
          >
            <button
              onClick={() => setViewMode("grid")}
              className={`p-2 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-all cursor-pointer ${
                viewMode === "grid"
                  ? "bg-rose-500 text-white shadow-md"
                  : darkMode
                  ? "text-gray-400 hover:text-white"
                  : "text-gray-600 hover:text-gray-900"
              }`}
              title="Grid View"
            >
              <LayoutGrid size={16} /> Grid
            </button>
            <button
              onClick={() => setViewMode("table")}
              className={`p-2 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-all cursor-pointer ${
                viewMode === "table"
                  ? "bg-rose-500 text-white shadow-md"
                  : darkMode
                  ? "text-gray-400 hover:text-white"
                  : "text-gray-600 hover:text-gray-900"
              }`}
              title="Dashboard Table View"
            >
              <TableIcon size={16} /> Metrics View
            </button>
          </div>
        </div>

        {/* GRID VIEW */}
        {viewMode === "grid" && (
          <motion.div
            layout
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16"
          >
            <AnimatePresence>
              {filteredProjects.map((project) => (
                <motion.div
                  layout
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.3 }}
                  key={project.id}
                  style={{
                    background: darkMode
                      ? "linear-gradient(to bottom right, #1f2937, #111827)"
                      : "linear-gradient(to bottom right, #ffffff, #fff1f2)",
                    borderColor: darkMode ? "#374151" : "#ffe4e6",
                  }}
                  className="group rounded-2xl border hover:border-rose-400/50 transition-all duration-500 overflow-hidden flex flex-col h-full shadow-lg hover:shadow-2xl hover:-translate-y-1.5"
                >
                  {/* Image Container with Domain Tag */}
                  <div
                    onClick={() => setSelectedProject(project)}
                    className="h-52 overflow-hidden relative group/img cursor-pointer"
                  >
                    <div className="absolute inset-0 bg-linear-to-t from-black/85 via-black/30 to-transparent z-10 opacity-70 group-hover/img:opacity-40 transition-opacity duration-500" />
                    <img
                      src={project.image}
                      alt={project.alt}
                      className="w-full h-full object-cover object-top transition-transform duration-700 group-hover/img:scale-110"
                    />
                    <div className="absolute top-3 left-3 z-20">
                      <span className="px-3 py-1 text-[11px] font-bold rounded-full bg-rose-500 text-white shadow-md">
                        {project.categoryLabel}
                      </span>
                    </div>
                    <div className="absolute inset-0 z-20 flex items-center justify-center opacity-0 group-hover/img:opacity-100 transition-opacity duration-300">
                      <span className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-black/75 text-white text-xs font-semibold backdrop-blur-md border border-white/20">
                        <Eye size={16} /> Inspect Dashboard
                      </span>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-6 flex flex-col grow">
                    <h3
                      className="text-lg font-bold mb-2.5 leading-snug line-clamp-2"
                      style={{ color: darkMode ? "white" : "#1f2937" }}
                    >
                      {project.title}
                    </h3>
                    <p
                      className="text-xs sm:text-sm mb-4 leading-relaxed line-clamp-3"
                      style={{ color: darkMode ? "#d1d5db" : "#6b7280" }}
                    >
                      {project.des}
                    </p>

                    {/* Key KPIs Section */}
                    <div className="mb-4 pt-3 border-t border-gray-700/20">
                      <p className="text-[11px] font-bold uppercase tracking-wider text-rose-500 mb-2 flex items-center gap-1.5">
                        <Activity size={13} /> Key Metrics Analyzed:
                      </p>
                      <div className="flex flex-wrap gap-1.5">
                        {project.kpis.slice(0, 3).map((kpi, kIdx) => (
                          <span
                            key={kIdx}
                            className="px-2 py-0.5 text-[11px] rounded-md font-medium border"
                            style={{
                              backgroundColor: darkMode ? "rgba(31, 41, 55, 0.8)" : "#f3f4f6",
                              color: darkMode ? "#e5e7eb" : "#374151",
                              borderColor: darkMode ? "#4b5563" : "#e5e7eb",
                            }}
                          >
                            {kpi}
                          </span>
                        ))}
                        {project.kpis.length > 3 && (
                          <span
                            className="px-2 py-0.5 text-[11px] rounded-md font-medium text-rose-500"
                            style={{
                              backgroundColor: darkMode ? "rgba(244, 63, 94, 0.1)" : "#fff1f2",
                            }}
                          >
                            +{project.kpis.length - 3} more
                          </span>
                        )}
                      </div>
                    </div>

                    {/* Tools Tags */}
                    <div className="flex flex-wrap gap-1.5 mb-5 mt-auto">
                      {project.tags.map((tag, idx) => (
                        <span
                          key={idx}
                          className="px-2.5 py-0.5 text-[11px] rounded-full border transition-colors font-medium"
                          style={{
                            backgroundColor: darkMode ? "rgba(244, 63, 94, 0.1)" : "#fff1f2",
                            color: "#f43f5e",
                            borderColor: darkMode ? "rgba(244, 63, 94, 0.2)" : "#fecdd3",
                          }}
                        >
                          {tag}
                        </span>
                      ))}
                    </div>

                    {/* Inspect Button */}
                    <button
                      onClick={() => setSelectedProject(project)}
                      className="w-full inline-flex items-center justify-center gap-2 py-2.5 px-4 text-xs font-bold rounded-xl text-white shadow-lg transition-all duration-300 hover:scale-102 cursor-pointer"
                      style={{
                        background: "linear-gradient(to right, #f43f5e, #fb7185)",
                        boxShadow: "0 4px 15px rgba(244, 63, 94, 0.25)",
                      }}
                    >
                      <Eye size={15} /> View Dashboard Details
                    </button>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        )}

        {/* METRICS TABLE VIEW */}
        {viewMode === "table" && (
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="rounded-2xl border overflow-hidden mb-16 shadow-xl"
            style={{
              background: darkMode
                ? "linear-gradient(to bottom right, #1f2937, #111827)"
                : "linear-gradient(to bottom right, #ffffff, #fff1f2)",
              borderColor: darkMode ? "#374151" : "#ffe4e6",
            }}
          >
            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm">
                <thead
                  className="border-b text-xs font-bold uppercase tracking-wider"
                  style={{
                    backgroundColor: darkMode ? "rgba(17, 24, 39, 0.8)" : "#fff1f2",
                    color: darkMode ? "#9ca3af" : "#6b7280",
                    borderColor: darkMode ? "#374151" : "#ffe4e6",
                  }}
                >
                  <tr>
                    <th className="py-4 px-6">Project &amp; Analytics Domain</th>
                    <th className="py-4 px-6">Domain</th>
                    <th className="py-4 px-6">Core Metrics Tracked</th>
                    <th className="py-4 px-6">Primary Tools</th>
                    <th className="py-4 px-6 text-center">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-700/20">
                  {filteredProjects.map((proj) => (
                    <tr
                      key={proj.id}
                      className="hover:bg-rose-500/5 transition-colors cursor-pointer"
                      onClick={() => setSelectedProject(proj)}
                    >
                      <td className="py-4 px-6">
                        <div className="font-bold text-sm" style={{ color: darkMode ? "white" : "#1f2937" }}>
                          {proj.title}
                        </div>
                        <div
                          className="text-xs line-clamp-1 mt-0.5"
                          style={{ color: darkMode ? "#9ca3af" : "#6b7280" }}
                        >
                          {proj.des}
                        </div>
                      </td>
                      <td className="py-4 px-6 whitespace-nowrap">
                        <span className="px-2.5 py-1 text-xs font-semibold rounded-full bg-rose-500/10 text-rose-500 border border-rose-500/20">
                          {proj.categoryLabel}
                        </span>
                      </td>
                      <td className="py-4 px-6">
                        <div className="flex flex-wrap gap-1 max-w-md">
                          {proj.kpis.slice(0, 3).map((k, i) => (
                            <span
                              key={i}
                              className="px-2 py-0.5 text-[11px] rounded-md font-medium border"
                              style={{
                                backgroundColor: darkMode ? "#374151" : "#ffffff",
                                color: darkMode ? "#d1d5db" : "#374151",
                                borderColor: darkMode ? "#4b5563" : "#fecdd3",
                              }}
                            >
                              {k}
                            </span>
                          ))}
                        </div>
                      </td>
                      <td className="py-4 px-6 whitespace-nowrap">
                        <span className="text-xs font-semibold" style={{ color: darkMode ? "#d1d5db" : "#4b5563" }}>
                          {proj.tags.slice(0, 2).join(" • ")}
                        </span>
                      </td>
                      <td className="py-4 px-6 text-center whitespace-nowrap">
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            setSelectedProject(proj);
                          }}
                          className="px-3 py-1.5 rounded-lg text-xs font-bold text-white bg-linear-to-r from-rose-500 to-pink-500 shadow-md hover:scale-105 transition-transform"
                        >
                          Inspect
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </motion.div>
        )}

        {/* Bottom CTA / LinkedIn Connect */}
        <div className="text-center" data-aos="fade-up">
          <div
            className="inline-flex flex-col sm:flex-row items-center justify-between gap-6 p-6 sm:p-8 rounded-3xl border max-w-3xl mx-auto shadow-xl"
            style={{
              background: darkMode
                ? "linear-gradient(to bottom right, #1f2937, #111827)"
                : "linear-gradient(to bottom right, #ffffff, #fff1f2)",
              borderColor: darkMode ? "#374151" : "#ffe4e6",
            }}
          >
            <div className="text-left">
              <h4
                className="text-lg sm:text-xl font-bold mb-1"
                style={{ color: darkMode ? "white" : "#1f2937" }}
              >
                Want to explore custom dashboards for your business?
              </h4>
              <p className="text-xs sm:text-sm" style={{ color: darkMode ? "#9ca3af" : "#6b7280" }}>
                Connecting financial valuation, health analytics, and digital marketing insights.
              </p>
            </div>
            <a
              href="https://www.linkedin.com/in/shahd-kamal-30a99436b"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3 font-bold text-white text-sm rounded-full whitespace-nowrap shadow-lg shadow-rose-500/25 hover:shadow-rose-500/40 hover:-translate-y-0.5 transition-all"
              style={{
                background: "linear-gradient(to right, #f43f5e, #fb7185)",
              }}
            >
              Connect on LinkedIn
            </a>
          </div>
        </div>
      </div>

      {/* DASHBOARD INSPECTOR MODAL */}
      <AnimatePresence>
        {selectedProject && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedProject(null)}
              className="fixed inset-0 bg-black/80 backdrop-blur-md cursor-pointer"
            />

            {/* Modal Dialog */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              transition={{ type: "spring", duration: 0.5, bounce: 0.2 }}
              className="relative w-full max-w-4xl rounded-3xl border overflow-hidden shadow-2xl z-10 max-h-[90vh] flex flex-col my-auto"
              style={{
                background: darkMode ? "#111827" : "#ffffff",
                borderColor: darkMode ? "#374151" : "#ffe4e6",
              }}
              onClick={(e) => e.stopPropagation()}
            >
              {/* Modal Header */}
              <div
                className="flex items-center justify-between p-5 sm:p-6 border-b"
                style={{ borderColor: darkMode ? "#374151" : "#ffe4e6" }}
              >
                <div className="flex items-center gap-3">
                  <span className="px-3 py-1 text-xs font-bold rounded-full bg-rose-500 text-white">
                    {selectedProject.categoryLabel}
                  </span>
                  <h3
                    className="text-lg sm:text-xl font-bold truncate max-w-md sm:max-w-xl"
                    style={{ color: darkMode ? "white" : "#1f2937" }}
                  >
                    {selectedProject.title}
                  </h3>
                </div>
                <button
                  onClick={() => setSelectedProject(null)}
                  className="p-2 rounded-full hover:bg-gray-700/30 transition-colors cursor-pointer"
                  style={{ color: darkMode ? "#9ca3af" : "#6b7280" }}
                  aria-label="Close modal"
                >
                  <X size={20} />
                </button>
              </div>

              {/* Modal Body */}
              <div className="overflow-y-auto p-5 sm:p-8 space-y-6">
                {/* Full-width Screenshot Container */}
                <div className="rounded-2xl overflow-hidden border border-rose-500/20 shadow-lg bg-black/40">
                  <img
                    src={selectedProject.image}
                    alt={selectedProject.alt}
                    className="w-full max-h-105 object-cover object-top"
                  />
                </div>

                {/* Detailed Overview */}
                <div>
                  <h4
                    className="text-base font-bold mb-2 flex items-center gap-2"
                    style={{ color: darkMode ? "white" : "#1f2937" }}
                  >
                    <BarChart3 className="text-rose-500" size={18} /> Executive Overview &amp; Architecture
                  </h4>
                  <p
                    className="text-sm sm:text-base leading-relaxed"
                    style={{ color: darkMode ? "#d1d5db" : "#4b5563" }}
                  >
                    {selectedProject.longDes}
                  </p>
                </div>

                {/* Key KPIs Grid */}
                <div>
                  <h4
                    className="text-base font-bold mb-3 flex items-center gap-2"
                    style={{ color: darkMode ? "white" : "#1f2937" }}
                  >
                    <Activity className="text-rose-500" size={18} /> Core Key Performance Indicators (KPIs) Modeled
                  </h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                    {selectedProject.kpis.map((kpi, kIdx) => (
                      <div
                        key={kIdx}
                        className="flex items-center gap-2.5 p-3 rounded-xl border text-xs sm:text-sm font-semibold"
                        style={{
                          background: darkMode ? "rgba(31, 41, 55, 0.6)" : "#f9fafb",
                          borderColor: darkMode ? "#374151" : "#ffe4e6",
                          color: darkMode ? "white" : "#1f2937",
                        }}
                      >
                        <CheckCircle2 size={16} className="text-rose-500 shrink-0" />
                        <span>{kpi}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Impact / Business Value */}
                {selectedProject.impact && (
                  <div
                    className="p-4 rounded-2xl border"
                    style={{
                      backgroundColor: darkMode ? "rgba(244, 63, 94, 0.08)" : "#fff1f2",
                      borderColor: darkMode ? "rgba(244, 63, 94, 0.25)" : "#fecdd3",
                    }}
                  >
                    <p className="text-xs font-bold uppercase tracking-wider text-rose-500 mb-1">
                      Business Impact &amp; Value Delivered:
                    </p>
                    <p
                      className="text-xs sm:text-sm font-medium leading-relaxed"
                      style={{ color: darkMode ? "#fecdd3" : "#9f1239" }}
                    >
                      {selectedProject.impact}
                    </p>
                  </div>
                )}

                {/* Technologies & Tools */}
                <div>
                  <h4
                    className="text-xs font-bold uppercase tracking-wider mb-2.5 text-rose-500"
                  >
                    Analytical Tools &amp; Methods:
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {selectedProject.tags.map((tag, tIdx) => (
                      <span
                        key={tIdx}
                        className="px-3 py-1 rounded-full text-xs font-semibold border"
                        style={{
                          backgroundColor: darkMode ? "#1f2937" : "#f3f4f6",
                          color: darkMode ? "white" : "#374151",
                          borderColor: darkMode ? "#4b5563" : "#ffe4e6",
                        }}
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Modal Footer */}
              <div
                className="p-4 sm:p-6 border-t flex items-center justify-between"
                style={{ borderColor: darkMode ? "#374151" : "#ffe4e6" }}
              >
                <span className="text-xs" style={{ color: darkMode ? "#9ca3af" : "#6b7280" }}>
                  Power BI &bull; Data Analysis &bull; Shahd Kamal
                </span>
                <button
                  onClick={() => setSelectedProject(null)}
                  className="px-5 py-2 rounded-xl text-xs sm:text-sm font-bold text-white bg-linear-to-r from-rose-500 to-pink-500 hover:scale-105 transition-transform cursor-pointer"
                >
                  Close Inspector
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default Projects;

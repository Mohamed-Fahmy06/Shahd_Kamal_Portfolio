import React, { createContext, useContext, useState, useEffect } from "react";
import orascomImg from "../assets/projects/orascom-dashboard.jpg";
import magdiYacoubImg from "../assets/projects/magdi-yacoub-dashboard.jpg";
import covidImg from "../assets/projects/covid19-dashboard.png";
import shahdPhoto from "../assets/shahd_photo2.jpg";

const defaultProfile = {
  name: "Shahd Kamal",
  tagline: "Data Analyst & Digital Marketing Specialist.",
  subTagline: "Turning Data into Insights, and Creativity into Digital Growth.",
  cvUrl: "",
  cvFile: "",
  avatar: shahdPhoto,
  aboutImage: "",
  contactImage: "",
  aboutHeadline: "Beyond Numbers. Beyond Creativity.",
  aboutIntro:
    "I'm Shahd Kamal, a results-oriented professional passionate about the intersection of business, data, and digital growth innovation.",
  aboutDataAnalysis:
    "Turning complex datasets into meaningful insights, uncovering hidden patterns, and translating numbers into strategic decisions. I focus on making data understandable, actionable, and valuable through analytical thinking and data visualization.",
  aboutDigitalMarketing:
    "Combining creativity with strategic thinking to build engaging digital experiences, strengthen brand presence, understand audience behavior, and create content that connects brands with people.",
  aboutConclusion:
    "I believe that successful businesses need more than data and more than creativity — they need the ability to connect both. My approach is simple: Analyze with purpose, create with strategy, and deliver with impact.",
  disciplinesCount: "2",
  yearsExperience: "1+",
  cfaStage: "Stage 2 (Qualified)",
  linkedinUrl: "https://www.linkedin.com/in/shahd-kamal-30a99436b",
  whatsappUrl: "https://wa.me/201156785653",
};

const defaultProjects = [
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
    liveUrl: "https://app.powerbi.com",
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
    liveUrl: "https://app.powerbi.com",
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
    liveUrl: "https://app.powerbi.com",
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
    liveUrl: "https://app.powerbi.com",
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
    liveUrl: "https://app.powerbi.com",
  },
];

const defaultExperiences = [
  {
    id: "cfa",
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
  {
    id: "trainer",
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
];

const defaultSkills = {
  dataAnalysisSkills: [
    "Data Analysis & Interpretation",
    "Data Cleaning & Preparation",
    "Data Visualization",
    "Dashboard Development",
    "Business Intelligence",
    "Financial Data Analysis",
    "Financial Statement Analysis",
    "Financial Modeling & Valuation",
    "Reporting & Insights Generation",
  ],
  dataAnalysisTools: ["Microsoft Excel", "Microsoft Power BI"],
  digitalMarketingSkills: [
    "Digital Marketing Strategy",
    "Social Media Management",
    "Content Strategy",
    "Content Creation",
    "Marketing Campaign Planning",
    "Audience Analysis",
    "Community Management",
    "Brand Awareness",
  ],
  digitalMarketingTools: ["Canva", "Meta Business Suite", "Facebook & Instagram"],
  productivityTools: ["Microsoft PowerPoint", "Microsoft Word"],
  businessSkills: [
    "Business Research",
    "Market Research",
    "Analytical Thinking",
    "Problem Solving",
    "Strategic Thinking",
    "Communication & Presentation",
    "Teamwork & Collaboration",
    "Time Management",
  ],
};

const STORAGE_KEY = "shahd_portfolio_custom_data_v1";

const PortfolioContext = createContext();

export const PortfolioProvider = ({ children }) => {
  // Try loading from localStorage first
  const [profile, setProfile] = useState(() => {
    try {
      const saved = localStorage.getItem(`${STORAGE_KEY}_profile`);
      return saved ? JSON.parse(saved) : defaultProfile;
    } catch {
      return defaultProfile;
    }
  });

  const [projects, setProjects] = useState(() => {
    try {
      const saved = localStorage.getItem(`${STORAGE_KEY}_projects`);
      return saved ? JSON.parse(saved) : defaultProjects;
    } catch {
      return defaultProjects;
    }
  });

  const [experiences, setExperiences] = useState(() => {
    try {
      const saved = localStorage.getItem(`${STORAGE_KEY}_experiences`);
      return saved ? JSON.parse(saved) : defaultExperiences;
    } catch {
      return defaultExperiences;
    }
  });

  const [skills, setSkills] = useState(() => {
    try {
      const saved = localStorage.getItem(`${STORAGE_KEY}_skills`);
      return saved ? JSON.parse(saved) : defaultSkills;
    } catch {
      return defaultSkills;
    }
  });

  // Save to localStorage whenever state changes
  useEffect(() => {
    try {
      localStorage.setItem(`${STORAGE_KEY}_profile`, JSON.stringify(profile));
    } catch (e) {
      console.warn("Storage quota exceeded", e);
    }
  }, [profile]);

  useEffect(() => {
    try {
      localStorage.setItem(`${STORAGE_KEY}_projects`, JSON.stringify(projects));
    } catch (e) {
      console.warn("Storage quota exceeded", e);
    }
  }, [projects]);

  useEffect(() => {
    try {
      localStorage.setItem(`${STORAGE_KEY}_experiences`, JSON.stringify(experiences));
    } catch (e) {
      console.warn("Storage quota exceeded", e);
    }
  }, [experiences]);

  useEffect(() => {
    try {
      localStorage.setItem(`${STORAGE_KEY}_skills`, JSON.stringify(skills));
    } catch (e) {
      console.warn("Storage quota exceeded", e);
    }
  }, [skills]);

  // Dynamic calculations for numbers across the website
  const stats = {
    // e.g. "5+ Analytical Dashboards"
    analyticalDashboardsCount: `${projects.length}+`,
    totalProjects: projects.length,
    industryDomainsCount: `${new Set(projects.map((p) => p.category)).size}`,
    kpisCount: `${projects.reduce((acc, p) => acc + (p.kpis?.length || 0), 0)}+`,
    totalSkillsCount: `${
      skills.dataAnalysisSkills.length +
      skills.dataAnalysisTools.length +
      skills.digitalMarketingSkills.length +
      skills.digitalMarketingTools.length +
      skills.productivityTools.length +
      skills.businessSkills.length
    }+`,
    totalExperiences: experiences.length,
  };

  // Reset to initial original defaults
  const resetToDefaults = () => {
    setProfile(defaultProfile);
    setProjects(defaultProjects);
    setExperiences(defaultExperiences);
    setSkills(defaultSkills);
    localStorage.removeItem(`${STORAGE_KEY}_profile`);
    localStorage.removeItem(`${STORAGE_KEY}_projects`);
    localStorage.removeItem(`${STORAGE_KEY}_experiences`);
    localStorage.removeItem(`${STORAGE_KEY}_skills`);
  };

  return (
    <PortfolioContext.Provider
      value={{
        profile,
        setProfile,
        projects,
        setProjects,
        experiences,
        setExperiences,
        skills,
        setSkills,
        stats,
        resetToDefaults,
      }}
    >
      {children}
    </PortfolioContext.Provider>
  );
};

export const usePortfolio = () => {
  const context = useContext(PortfolioContext);
  if (!context) {
    throw new Error("usePortfolio must be used within a PortfolioProvider");
  }
  return context;
};

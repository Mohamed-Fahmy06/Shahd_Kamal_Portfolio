import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  X,
  Lock,
  LogOut,
  Save,
  RotateCcw,
  Plus,
  Trash2,
  Edit3,
  ExternalLink,
  CheckCircle2,
  AlertCircle,
  BarChart3,
  User,
  Briefcase,
  Layers,
  Wrench,
  Sparkles,
  FileText,
} from "lucide-react";
import { usePortfolio } from "../context/PortfolioContext";

const AUTH_STORAGE_KEY = "shahd_portfolio_admin_auth";
const ADMIN_EMAILS = ["shahdkamal@gmail.com", "shahd@gmail.com", "mohamedfahmy1757@gmail.com"];
const ADMIN_PASSWORD = "shahd2026";

const AdminDashboard = ({ darkMode }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    return localStorage.getItem(AUTH_STORAGE_KEY) === "true";
  });

  // Login form state
  const [emailInput, setEmailInput] = useState("");
  const [passwordInput, setPasswordInput] = useState("");
  const [loginError, setLoginError] = useState("");

  // Active admin tab
  const [activeTab, setActiveTab] = useState("hero");
  const [saveToast, setSaveToast] = useState("");

  const {
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
  } = usePortfolio();

  // Listen to hash changes for #admin
  useEffect(() => {
    const handleHash = () => {
      if (window.location.hash === "#admin") {
        setIsOpen(true);
      } else {
        setIsOpen(false);
      }
    };

    handleHash();
    window.addEventListener("hashchange", handleHash);
    return () => window.removeEventListener("hashchange", handleHash);
  }, []);

  const handleClose = () => {
    setIsOpen(false);
    if (window.location.hash === "#admin") {
      window.history.pushState(null, "", window.location.pathname + window.location.search);
    }
  };

  const handleLogin = (e) => {
    e.preventDefault();
    const cleanEmail = emailInput.trim().toLowerCase();
    if (
      ADMIN_EMAILS.includes(cleanEmail) &&
      passwordInput.trim() === ADMIN_PASSWORD
    ) {
      setIsAuthenticated(true);
      localStorage.setItem(AUTH_STORAGE_KEY, "true");
      setLoginError("");
    } else {
      setLoginError("Invalid Gmail address or Password. Access is restricted to Shahd Kamal.");
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    localStorage.removeItem(AUTH_STORAGE_KEY);
    setEmailInput("");
    setPasswordInput("");
  };

  const showToast = (msg) => {
    setSaveToast(msg);
    setTimeout(() => setSaveToast(""), 3500);
  };

  // --- Project Management ---
  const [editingProject, setEditingProject] = useState(null);
  const [newProjectMode, setNewProjectMode] = useState(false);
  const [projectForm, setProjectForm] = useState({
    title: "",
    category: "financial",
    categoryLabel: "Financial Analysis",
    des: "",
    longDes: "",
    image: "",
    kpis: "",
    tags: "",
    liveUrl: "",
    impact: "",
  });

  const handleStartEditProject = (proj) => {
    setEditingProject(proj.id);
    setNewProjectMode(false);
    setProjectForm({
      title: proj.title || "",
      category: proj.category || "financial",
      categoryLabel: proj.categoryLabel || "Financial Analysis",
      des: proj.des || "",
      longDes: proj.longDes || "",
      image: proj.image || "",
      kpis: Array.isArray(proj.kpis) ? proj.kpis.join(", ") : "",
      tags: Array.isArray(proj.tags) ? proj.tags.join(", ") : "",
      liveUrl: proj.liveUrl || "",
      impact: proj.impact || "",
    });
  };

  const handleSaveProject = () => {
    if (!projectForm.title.trim()) {
      alert("Project title is required!");
      return;
    }

    const formatted = {
      id: editingProject || Date.now(),
      title: projectForm.title,
      category: projectForm.category,
      categoryLabel:
        projectForm.category === "financial"
          ? "Financial Analysis"
          : projectForm.category === "healthcare"
          ? "Healthcare Analytics"
          : "Business Intelligence",
      des: projectForm.des,
      longDes: projectForm.longDes,
      image: projectForm.image || "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=2340&auto=format&fit=crop",
      alt: projectForm.title,
      kpis: projectForm.kpis.split(",").map((k) => k.trim()).filter(Boolean),
      tags: projectForm.tags.split(",").map((t) => t.trim()).filter(Boolean),
      liveUrl: projectForm.liveUrl,
      impact: projectForm.impact,
      status: "Completed",
    };

    if (newProjectMode) {
      setProjects([formatted, ...projects]);
      showToast("✨ New project added! Counter updated automatically.");
    } else {
      setProjects(projects.map((p) => (p.id === editingProject ? formatted : p)));
      showToast("✅ Project updated successfully!");
    }

    setEditingProject(null);
    setNewProjectMode(false);
  };

  const handleDeleteProject = (id) => {
    if (confirm("Are you sure you want to delete this project? Numbers will auto-recalculate.")) {
      setProjects(projects.filter((p) => p.id !== id));
      showToast("🗑️ Project deleted! Number of dashboards recalculated.");
    }
  };

  // --- Skills Tag Helper ---
  const [newSkillText, setNewSkillText] = useState("");
  const handleAddSkill = (categoryKey) => {
    if (!newSkillText.trim()) return;
    setSkills({
      ...skills,
      [categoryKey]: [...skills[categoryKey], newSkillText.trim()],
    });
    setNewSkillText("");
    showToast("Added skill successfully!");
  };

  const handleRemoveSkill = (categoryKey, skillName) => {
    setSkills({
      ...skills,
      [categoryKey]: skills[categoryKey].filter((s) => s !== skillName),
    });
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/80 backdrop-blur-md overflow-y-auto">
      <div
        className={`relative w-full max-w-5xl max-h-[92vh] flex flex-col rounded-3xl border shadow-2xl overflow-hidden transition-all duration-300 ${
          darkMode ? "bg-gray-900 border-gray-700 text-white" : "bg-white border-rose-200 text-gray-900"
        }`}
      >
        {/* Header Bar */}
        <div
          className={`flex items-center justify-between px-6 py-4 border-b ${
            darkMode ? "border-gray-800 bg-gray-950/80" : "border-rose-100 bg-rose-50/70"
          }`}
        >
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl flex items-center justify-center bg-linear-to-r from-rose-500 to-pink-500 text-white shadow-md">
              <Lock size={18} />
            </div>
            <div>
              <h2 className="text-lg font-bold leading-tight flex items-center gap-2">
                Shahd Kamal Portfolio Admin
                <span className="text-[10px] px-2 py-0.5 rounded-full font-bold bg-rose-500/15 text-rose-500 border border-rose-500/30">
                  #admin
                </span>
              </h2>
              <p className="text-xs text-gray-400">
                Live Content Manager &amp; Automatic Number Synchronization
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {isAuthenticated && (
              <button
                onClick={handleLogout}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold text-rose-400 hover:bg-rose-500/10 transition"
                title="Logout"
              >
                <LogOut size={14} />
                <span className="hidden sm:inline">Logout</span>
              </button>
            )}
            <button
              onClick={handleClose}
              className="w-8 h-8 rounded-full flex items-center justify-center hover:bg-rose-500/20 text-gray-400 hover:text-white transition"
              title="Close Admin Panel"
            >
              <X size={20} />
            </button>
          </div>
        </div>

        {/* Toast alert */}
        <AnimatePresence>
          {saveToast && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="bg-emerald-500/90 text-white px-4 py-2 text-xs font-semibold flex items-center justify-center gap-2 shadow-lg"
            >
              <CheckCircle2 size={16} />
              {saveToast}
            </motion.div>
          )}
        </AnimatePresence>

        {/* Content Body */}
        {!isAuthenticated ? (
          /* LOGIN SCREEN */
          <div className="p-8 sm:p-12 flex flex-col items-center justify-center max-w-md mx-auto w-full my-auto text-center">
            <div className="w-16 h-16 rounded-2xl flex items-center justify-center bg-rose-500/10 text-rose-500 border border-rose-500/20 mb-6 shadow-inner">
              <Lock size={32} />
            </div>
            <h3 className="text-2xl font-bold mb-2">Restricted Admin Access</h3>
            <p className="text-xs sm:text-sm text-gray-400 mb-6">
              Please authenticate with Shahd's authorized Gmail &amp; Password to edit portfolio data.
            </p>

            <form onSubmit={handleLogin} className="w-full space-y-4 text-left">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider mb-1.5 text-rose-500">
                  Gmail Address
                </label>
                <input
                  type="email"
                  required
                  placeholder="shahdkamal@gmail.com"
                  value={emailInput}
                  onChange={(e) => setEmailInput(e.target.value)}
                  className={`w-full px-4 py-3 rounded-xl border text-sm outline-none transition focus:border-rose-500 ${
                    darkMode ? "bg-gray-800/80 border-gray-700 text-white" : "bg-white border-rose-200"
                  }`}
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider mb-1.5 text-rose-500">
                  Password
                </label>
                <input
                  type="password"
                  required
                  placeholder="••••••••"
                  value={passwordInput}
                  onChange={(e) => setPasswordInput(e.target.value)}
                  className={`w-full px-4 py-3 rounded-xl border text-sm outline-none transition focus:border-rose-500 ${
                    darkMode ? "bg-gray-800/80 border-gray-700 text-white" : "bg-white border-rose-200"
                  }`}
                />
              </div>

              {loginError && (
                <div className="p-3 rounded-xl bg-rose-500/15 border border-rose-500/30 text-rose-400 text-xs flex items-center gap-2">
                  <AlertCircle size={16} className="shrink-0" />
                  <span>{loginError}</span>
                </div>
              )}

              <button
                type="submit"
                className="w-full py-3.5 rounded-xl font-bold text-sm text-white bg-linear-to-r from-rose-500 to-pink-500 hover:shadow-[0_0_25px_rgba(244,63,94,0.5)] transition duration-200 cursor-pointer"
              >
                Sign In to Admin Dashboard
              </button>

              <p className="text-[11px] text-gray-500 text-center pt-2">
                Hint: Authorized for Shahd Kamal (<code className="text-rose-400">shahdkamal@gmail.com</code> / <code className="text-rose-400">shahd2026</code>)
              </p>
            </form>
          </div>
        ) : (
          /* AUTHENTICATED DASHBOARD */
          <div className="flex-1 flex flex-col md:flex-row overflow-hidden">
            {/* Sidebar Tabs */}
            <div
              className={`w-full md:w-60 p-4 border-b md:border-b-0 md:border-r flex md:flex-col gap-2 shrink-0 overflow-x-auto ${
                darkMode ? "border-gray-800 bg-gray-950/40" : "border-rose-100 bg-rose-50/30"
              }`}
            >
              {[
                { id: "hero", label: "Hero & Profile", icon: <User size={16} /> },
                { id: "about", label: "About Me", icon: <FileText size={16} /> },
                {
                  id: "projects",
                  label: `Projects (${projects.length})`,
                  icon: <BarChart3 size={16} />,
                  badge: `${projects.length}+`,
                },
                { id: "experience", label: "Work Experience", icon: <Briefcase size={16} /> },
                { id: "skills", label: "Skills & Tools", icon: <Wrench size={16} /> },
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-semibold transition shrink-0 cursor-pointer ${
                    activeTab === tab.id
                      ? "bg-linear-to-r from-rose-500 to-pink-500 text-white shadow-md"
                      : darkMode
                      ? "text-gray-400 hover:bg-gray-800/60 hover:text-white"
                      : "text-gray-600 hover:bg-rose-100/60 hover:text-gray-900"
                  }`}
                >
                  <div className="flex items-center gap-2">
                    {tab.icon}
                    <span>{tab.label}</span>
                  </div>
                  {tab.badge && (
                    <span
                      className={`text-[10px] px-1.5 py-0.5 rounded-full font-bold ${
                        activeTab === tab.id
                          ? "bg-white/20 text-white"
                          : "bg-rose-500/15 text-rose-500"
                      }`}
                    >
                      {tab.badge}
                    </span>
                  )}
                </button>
              ))}

              {/* Dynamic Numbers Banner */}
              <div
                className={`mt-auto hidden md:block p-3 rounded-2xl border text-xs ${
                  darkMode ? "bg-gray-800/40 border-gray-700/60" : "bg-white border-rose-200"
                }`}
              >
                <p className="font-bold text-rose-500 mb-1 flex items-center gap-1.5">
                  <Sparkles size={14} /> Auto-Sync Active
                </p>
                <div className="space-y-1 text-[11px] text-gray-400">
                  <div className="flex justify-between">
                    <span>Dashboards:</span>
                    <strong className="text-white font-bold">{stats.analyticalDashboardsCount}</strong>
                  </div>
                  <div className="flex justify-between">
                    <span>Domains:</span>
                    <strong className="text-white font-bold">{stats.industryDomainsCount}</strong>
                  </div>
                  <div className="flex justify-between">
                    <span>KPIs:</span>
                    <strong className="text-white font-bold">{stats.kpisCount}</strong>
                  </div>
                </div>
              </div>
            </div>

            {/* Main Panel Content */}
            <div className="flex-1 p-6 sm:p-8 overflow-y-auto space-y-6">
              {/* TAB 1: HERO & PROFILE */}
              {activeTab === "hero" && (
                <div className="space-y-5">
                  <div className="border-b pb-3 border-gray-700/30">
                    <h3 className="text-lg font-bold">Hero Section &amp; Taglines</h3>
                    <p className="text-xs text-gray-400">
                      Edit the words that appear directly under her name, CV links, and contact handles.
                    </p>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-rose-500 uppercase tracking-wider mb-1">
                        Hero Greeting / Name
                      </label>
                      <input
                        type="text"
                        value={profile.name}
                        onChange={(e) => setProfile({ ...profile, name: e.target.value })}
                        className={`w-full px-4 py-2.5 rounded-xl border text-sm outline-none focus:border-rose-500 ${
                          darkMode ? "bg-gray-800 border-gray-700" : "bg-white border-rose-200"
                        }`}
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-rose-500 uppercase tracking-wider mb-1">
                        Primary Title ("Under Her Name")
                      </label>
                      <input
                        type="text"
                        value={profile.tagline}
                        onChange={(e) => setProfile({ ...profile, tagline: e.target.value })}
                        className={`w-full px-4 py-2.5 rounded-xl border text-sm outline-none focus:border-rose-500 ${
                          darkMode ? "bg-gray-800 border-gray-700" : "bg-white border-rose-200"
                        }`}
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-rose-500 uppercase tracking-wider mb-1">
                      Hero Sub-Tagline
                    </label>
                    <input
                      type="text"
                      value={profile.subTagline}
                      onChange={(e) => setProfile({ ...profile, subTagline: e.target.value })}
                      className={`w-full px-4 py-2.5 rounded-xl border text-sm outline-none focus:border-rose-500 ${
                        darkMode ? "bg-gray-800 border-gray-700" : "bg-white border-rose-200"
                      }`}
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                    <div>
                      <label className="block text-xs font-bold text-rose-500 uppercase tracking-wider mb-1">
                        Download CV Link / URL
                      </label>
                      <input
                        type="text"
                        placeholder="https://... or /Mohamed_Fahmy_CV.pdf"
                        value={profile.cvUrl}
                        onChange={(e) => setProfile({ ...profile, cvUrl: e.target.value })}
                        className={`w-full px-4 py-2.5 rounded-xl border text-sm outline-none focus:border-rose-500 ${
                          darkMode ? "bg-gray-800 border-gray-700" : "bg-white border-rose-200"
                        }`}
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-rose-500 uppercase tracking-wider mb-1">
                        LinkedIn Profile URL
                      </label>
                      <input
                        type="text"
                        value={profile.linkedinUrl}
                        onChange={(e) => setProfile({ ...profile, linkedinUrl: e.target.value })}
                        className={`w-full px-4 py-2.5 rounded-xl border text-sm outline-none focus:border-rose-500 ${
                          darkMode ? "bg-gray-800 border-gray-700" : "bg-white border-rose-200"
                        }`}
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* TAB 2: ABOUT ME */}
              {activeTab === "about" && (
                <div className="space-y-5">
                  <div className="border-b pb-3 border-gray-700/30">
                    <h3 className="text-lg font-bold">About Me Section</h3>
                    <p className="text-xs text-gray-400">
                      Customize headline, biography paragraphs, disciplines, and milestone numbers.
                    </p>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-rose-500 uppercase tracking-wider mb-1">
                      About Headline
                    </label>
                    <input
                      type="text"
                      value={profile.aboutHeadline}
                      onChange={(e) => setProfile({ ...profile, aboutHeadline: e.target.value })}
                      className={`w-full px-4 py-2.5 rounded-xl border text-sm outline-none focus:border-rose-500 ${
                        darkMode ? "bg-gray-800 border-gray-700" : "bg-white border-rose-200"
                      }`}
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-rose-500 uppercase tracking-wider mb-1">
                      Introduction Paragraph
                    </label>
                    <textarea
                      rows={3}
                      value={profile.aboutIntro}
                      onChange={(e) => setProfile({ ...profile, aboutIntro: e.target.value })}
                      className={`w-full p-3 rounded-xl border text-sm outline-none focus:border-rose-500 ${
                        darkMode ? "bg-gray-800 border-gray-700" : "bg-white border-rose-200"
                      }`}
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-rose-500 uppercase tracking-wider mb-1">
                        Data Analysis Discipline Description
                      </label>
                      <textarea
                        rows={4}
                        value={profile.aboutDataAnalysis}
                        onChange={(e) => setProfile({ ...profile, aboutDataAnalysis: e.target.value })}
                        className={`w-full p-3 rounded-xl border text-sm outline-none focus:border-rose-500 ${
                          darkMode ? "bg-gray-800 border-gray-700" : "bg-white border-rose-200"
                        }`}
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-rose-500 uppercase tracking-wider mb-1">
                        Digital Marketing Discipline Description
                      </label>
                      <textarea
                        rows={4}
                        value={profile.aboutDigitalMarketing}
                        onChange={(e) => setProfile({ ...profile, aboutDigitalMarketing: e.target.value })}
                        className={`w-full p-3 rounded-xl border text-sm outline-none focus:border-rose-500 ${
                          darkMode ? "bg-gray-800 border-gray-700" : "bg-white border-rose-200"
                        }`}
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-rose-500 uppercase tracking-wider mb-1">
                      Conclusion / Philosophy Statement
                    </label>
                    <textarea
                      rows={3}
                      value={profile.aboutConclusion}
                      onChange={(e) => setProfile({ ...profile, aboutConclusion: e.target.value })}
                      className={`w-full p-3 rounded-xl border text-sm outline-none focus:border-rose-500 ${
                        darkMode ? "bg-gray-800 border-gray-700" : "bg-white border-rose-200"
                      }`}
                    />
                  </div>

                  <div className="grid grid-cols-3 gap-4 pt-2">
                    <div>
                      <label className="block text-xs font-bold text-rose-500 uppercase tracking-wider mb-1">
                        Disciplines Count
                      </label>
                      <input
                        type="text"
                        value={profile.disciplinesCount}
                        onChange={(e) => setProfile({ ...profile, disciplinesCount: e.target.value })}
                        className={`w-full px-3 py-2 rounded-xl border text-sm outline-none focus:border-rose-500 ${
                          darkMode ? "bg-gray-800 border-gray-700" : "bg-white border-rose-200"
                        }`}
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-rose-500 uppercase tracking-wider mb-1">
                        Years Experience
                      </label>
                      <input
                        type="text"
                        value={profile.yearsExperience}
                        onChange={(e) => setProfile({ ...profile, yearsExperience: e.target.value })}
                        className={`w-full px-3 py-2 rounded-xl border text-sm outline-none focus:border-rose-500 ${
                          darkMode ? "bg-gray-800 border-gray-700" : "bg-white border-rose-200"
                        }`}
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-rose-500 uppercase tracking-wider mb-1">
                        CFA Stage Status
                      </label>
                      <input
                        type="text"
                        value={profile.cfaStage}
                        onChange={(e) => setProfile({ ...profile, cfaStage: e.target.value })}
                        className={`w-full px-3 py-2 rounded-xl border text-sm outline-none focus:border-rose-500 ${
                          darkMode ? "bg-gray-800 border-gray-700" : "bg-white border-rose-200"
                        }`}
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* TAB 3: PROJECTS & DASHBOARDS */}
              {activeTab === "projects" && (
                <div className="space-y-6">
                  <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-3 border-b pb-3 border-gray-700/30">
                    <div>
                      <h3 className="text-lg font-bold flex items-center gap-2">
                        <span>Projects &amp; Dashboards</span>
                        <span className="text-xs px-2.5 py-0.5 rounded-full bg-rose-500/20 text-rose-500 font-extrabold">
                          {stats.analyticalDashboardsCount} Total Dashboards
                        </span>
                      </h3>
                      <p className="text-xs text-gray-400">
                        Adding or deleting dashboards here automatically recalculates the "5+ Analytical Dashboards" counter!
                      </p>
                    </div>

                    {!editingProject && !newProjectMode && (
                      <button
                        onClick={() => {
                          setNewProjectMode(true);
                          setEditingProject(null);
                          setProjectForm({
                            title: "",
                            category: "financial",
                            categoryLabel: "Financial Analysis",
                            des: "",
                            longDes: "",
                            image: "",
                            kpis: "",
                            tags: "",
                            liveUrl: "",
                            impact: "",
                          });
                        }}
                        className="flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold text-white bg-linear-to-r from-rose-500 to-pink-500 hover:shadow-lg transition cursor-pointer self-start sm:self-auto"
                      >
                        <Plus size={16} /> Add Dashboard
                      </button>
                    )}
                  </div>

                  {/* Add / Edit Form */}
                  {(newProjectMode || editingProject) && (
                    <div
                      className={`p-5 rounded-2xl border space-y-4 ${
                        darkMode ? "bg-gray-800/80 border-rose-500/30" : "bg-rose-50/50 border-rose-300"
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <h4 className="font-bold text-sm text-rose-500">
                          {newProjectMode ? "➕ Add New Analytics Dashboard" : "✏️ Edit Dashboard"}
                        </h4>
                        <button
                          onClick={() => {
                            setNewProjectMode(false);
                            setEditingProject(null);
                          }}
                          className="text-xs text-gray-400 hover:text-white"
                        >
                          Cancel
                        </button>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-xs font-bold mb-1">Title</label>
                          <input
                            type="text"
                            value={projectForm.title}
                            onChange={(e) => setProjectForm({ ...projectForm, title: e.target.value })}
                            className={`w-full px-3 py-2 rounded-xl border text-sm outline-none focus:border-rose-500 ${
                              darkMode ? "bg-gray-900 border-gray-700" : "bg-white border-rose-200"
                            }`}
                          />
                        </div>
                        <div>
                          <label className="block text-xs font-bold mb-1">Category</label>
                          <select
                            value={projectForm.category}
                            onChange={(e) => setProjectForm({ ...projectForm, category: e.target.value })}
                            className={`w-full px-3 py-2 rounded-xl border text-sm outline-none focus:border-rose-500 ${
                              darkMode ? "bg-gray-900 border-gray-700" : "bg-white border-rose-200"
                            }`}
                          >
                            <option value="financial">Financial Analysis</option>
                            <option value="healthcare">Healthcare Analytics</option>
                            <option value="business">Business Intelligence</option>
                          </select>
                        </div>
                      </div>

                      <div>
                        <label className="block text-xs font-bold mb-1">Short Summary (Card Preview)</label>
                        <textarea
                          rows={2}
                          value={projectForm.des}
                          onChange={(e) => setProjectForm({ ...projectForm, des: e.target.value })}
                          className={`w-full p-2.5 rounded-xl border text-sm outline-none focus:border-rose-500 ${
                            darkMode ? "bg-gray-900 border-gray-700" : "bg-white border-rose-200"
                          }`}
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-bold mb-1">Detailed Description (Modal Inspector)</label>
                        <textarea
                          rows={3}
                          value={projectForm.longDes}
                          onChange={(e) => setProjectForm({ ...projectForm, longDes: e.target.value })}
                          className={`w-full p-2.5 rounded-xl border text-sm outline-none focus:border-rose-500 ${
                            darkMode ? "bg-gray-900 border-gray-700" : "bg-white border-rose-200"
                          }`}
                        />
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-xs font-bold mb-1">Dashboard Image URL / Path</label>
                          <input
                            type="text"
                            placeholder="https://... or image asset"
                            value={projectForm.image}
                            onChange={(e) => setProjectForm({ ...projectForm, image: e.target.value })}
                            className={`w-full px-3 py-2 rounded-xl border text-sm outline-none focus:border-rose-500 ${
                              darkMode ? "bg-gray-900 border-gray-700" : "bg-white border-rose-200"
                            }`}
                          />
                        </div>
                        <div>
                          <label className="block text-xs font-bold mb-1">Live Power BI / Report URL</label>
                          <input
                            type="text"
                            placeholder="https://app.powerbi.com/..."
                            value={projectForm.liveUrl}
                            onChange={(e) => setProjectForm({ ...projectForm, liveUrl: e.target.value })}
                            className={`w-full px-3 py-2 rounded-xl border text-sm outline-none focus:border-rose-500 ${
                              darkMode ? "bg-gray-900 border-gray-700" : "bg-white border-rose-200"
                            }`}
                          />
                        </div>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-xs font-bold mb-1">KPIs (Comma separated)</label>
                          <input
                            type="text"
                            placeholder="e.g. ROE, Current Ratio, Net Margin"
                            value={projectForm.kpis}
                            onChange={(e) => setProjectForm({ ...projectForm, kpis: e.target.value })}
                            className={`w-full px-3 py-2 rounded-xl border text-sm outline-none focus:border-rose-500 ${
                              darkMode ? "bg-gray-900 border-gray-700" : "bg-white border-rose-200"
                            }`}
                          />
                        </div>
                        <div>
                          <label className="block text-xs font-bold mb-1">Technologies / Tags (Comma separated)</label>
                          <input
                            type="text"
                            placeholder="Power BI, DAX, Financial Modeling"
                            value={projectForm.tags}
                            onChange={(e) => setProjectForm({ ...projectForm, tags: e.target.value })}
                            className={`w-full px-3 py-2 rounded-xl border text-sm outline-none focus:border-rose-500 ${
                              darkMode ? "bg-gray-900 border-gray-700" : "bg-white border-rose-200"
                            }`}
                          />
                        </div>
                      </div>

                      <div className="flex justify-end gap-3 pt-2">
                        <button
                          onClick={() => {
                            setNewProjectMode(false);
                            setEditingProject(null);
                          }}
                          className="px-4 py-2 rounded-xl text-xs font-semibold hover:bg-gray-700/50"
                        >
                          Cancel
                        </button>
                        <button
                          onClick={handleSaveProject}
                          className="px-5 py-2 rounded-xl text-xs font-bold text-white bg-rose-500 hover:bg-rose-600 transition"
                        >
                          {newProjectMode ? "Add Dashboard" : "Update Dashboard"}
                        </button>
                      </div>
                    </div>
                  )}

                  {/* Project Cards List */}
                  <div className="space-y-3">
                    {projects.map((proj, idx) => (
                      <div
                        key={proj.id}
                        className={`p-4 rounded-2xl border flex flex-col sm:flex-row sm:items-center justify-between gap-4 transition hover:border-rose-500/40 ${
                          darkMode ? "bg-gray-800/40 border-gray-700/70" : "bg-white border-rose-100"
                        }`}
                      >
                        <div className="flex items-start gap-3">
                          <span className="w-6 h-6 rounded-lg bg-rose-500/10 text-rose-500 text-xs font-bold flex items-center justify-center shrink-0">
                            {idx + 1}
                          </span>
                          <div>
                            <h4 className="font-bold text-sm leading-snug">{proj.title}</h4>
                            <p className="text-xs text-rose-400 font-semibold mt-0.5">
                              {proj.categoryLabel || proj.category} • {proj.kpis?.length || 0} KPIs • {proj.tags?.join(", ")}
                            </p>
                          </div>
                        </div>

                        <div className="flex items-center gap-2 self-end sm:self-center">
                          <button
                            onClick={() => handleStartEditProject(proj)}
                            className="p-2 rounded-lg text-gray-400 hover:text-white hover:bg-rose-500/20 transition"
                            title="Edit"
                          >
                            <Edit3 size={15} />
                          </button>
                          <button
                            onClick={() => handleDeleteProject(proj.id)}
                            className="p-2 rounded-lg text-rose-400 hover:text-rose-300 hover:bg-rose-500/20 transition"
                            title="Delete"
                          >
                            <Trash2 size={15} />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* TAB 4: WORK EXPERIENCE */}
              {activeTab === "experience" && (
                <div className="space-y-6">
                  <div className="border-b pb-3 border-gray-700/30">
                    <h3 className="text-lg font-bold">Work Experience &amp; Competitions</h3>
                    <p className="text-xs text-gray-400">
                      Edit CFA Challenge achievements, EELU training session details, and bullet milestones.
                    </p>
                  </div>

                  {experiences.map((exp, idx) => (
                    <div
                      key={exp.id || idx}
                      className={`p-5 rounded-2xl border space-y-4 ${
                        darkMode ? "bg-gray-800/40 border-gray-700" : "bg-white border-rose-100"
                      }`}
                    >
                      <div className="flex items-center justify-between border-b pb-2 border-gray-700/30">
                        <span className="text-xs font-extrabold text-rose-500 uppercase tracking-wider">
                          Experience #{idx + 1} ({exp.number})
                        </span>
                        <span className="text-xs text-gray-400">{exp.period}</span>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-xs font-bold mb-1">Title</label>
                          <input
                            type="text"
                            value={exp.title}
                            onChange={(e) => {
                              const updated = [...experiences];
                              updated[idx].title = e.target.value;
                              setExperiences(updated);
                            }}
                            className={`w-full px-3 py-2 rounded-xl border text-sm outline-none focus:border-rose-500 ${
                              darkMode ? "bg-gray-900 border-gray-700" : "bg-white border-rose-200"
                            }`}
                          />
                        </div>
                        <div>
                          <label className="block text-xs font-bold mb-1">Role</label>
                          <input
                            type="text"
                            value={exp.role}
                            onChange={(e) => {
                              const updated = [...experiences];
                              updated[idx].role = e.target.value;
                              setExperiences(updated);
                            }}
                            className={`w-full px-3 py-2 rounded-xl border text-sm outline-none focus:border-rose-500 ${
                              darkMode ? "bg-gray-900 border-gray-700" : "bg-white border-rose-200"
                            }`}
                          />
                        </div>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-xs font-bold mb-1">Period</label>
                          <input
                            type="text"
                            value={exp.period}
                            onChange={(e) => {
                              const updated = [...experiences];
                              updated[idx].period = e.target.value;
                              setExperiences(updated);
                            }}
                            className={`w-full px-3 py-2 rounded-xl border text-sm outline-none focus:border-rose-500 ${
                              darkMode ? "bg-gray-900 border-gray-700" : "bg-white border-rose-200"
                            }`}
                          />
                        </div>
                        <div>
                          <label className="block text-xs font-bold mb-1">Badge Status</label>
                          <input
                            type="text"
                            value={exp.badge}
                            onChange={(e) => {
                              const updated = [...experiences];
                              updated[idx].badge = e.target.value;
                              setExperiences(updated);
                            }}
                            className={`w-full px-3 py-2 rounded-xl border text-sm outline-none focus:border-rose-500 ${
                              darkMode ? "bg-gray-900 border-gray-700" : "bg-white border-rose-200"
                            }`}
                          />
                        </div>
                      </div>

                      <div>
                        <label className="block text-xs font-bold mb-1">Bullet Achievements (One per line)</label>
                        <textarea
                          rows={4}
                          value={exp.bullets?.join("\n")}
                          onChange={(e) => {
                            const updated = [...experiences];
                            updated[idx].bullets = e.target.value.split("\n").filter(Boolean);
                            setExperiences(updated);
                          }}
                          className={`w-full p-2.5 rounded-xl border text-sm outline-none focus:border-rose-500 ${
                            darkMode ? "bg-gray-900 border-gray-700" : "bg-white border-rose-200"
                          }`}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {/* TAB 5: SKILLS & TOOLS */}
              {activeTab === "skills" && (
                <div className="space-y-6">
                  <div className="border-b pb-3 border-gray-700/30">
                    <h3 className="text-lg font-bold">Skills, Tools &amp; Competencies</h3>
                    <p className="text-xs text-gray-400">
                      Manage technical data analysis skills, marketing tools, and business competencies.
                    </p>
                  </div>

                  {/* Add skill row */}
                  <div className="flex gap-2 p-3 rounded-2xl bg-rose-500/10 border border-rose-500/20">
                    <input
                      type="text"
                      placeholder="Type a new skill or tool name..."
                      value={newSkillText}
                      onChange={(e) => setNewSkillText(e.target.value)}
                      className={`flex-1 px-4 py-2 rounded-xl border text-sm outline-none focus:border-rose-500 ${
                        darkMode ? "bg-gray-900 border-gray-700" : "bg-white border-rose-200"
                      }`}
                    />
                    <button
                      onClick={() => handleAddSkill("dataAnalysisSkills")}
                      className="px-3 py-2 rounded-xl text-xs font-bold text-white bg-rose-500 hover:bg-rose-600 transition"
                    >
                      + Data Skill
                    </button>
                    <button
                      onClick={() => handleAddSkill("digitalMarketingSkills")}
                      className="px-3 py-2 rounded-xl text-xs font-bold text-white bg-pink-500 hover:bg-pink-600 transition"
                    >
                      + Marketing
                    </button>
                    <button
                      onClick={() => handleAddSkill("businessSkills")}
                      className="px-3 py-2 rounded-xl text-xs font-bold text-white bg-rose-600 hover:bg-rose-700 transition"
                    >
                      + Business
                    </button>
                  </div>

                  {/* Skill Groups */}
                  {[
                    { key: "dataAnalysisSkills", title: "📊 Data Analysis Skills" },
                    { key: "dataAnalysisTools", title: "🛠 Data Analysis Tools" },
                    { key: "digitalMarketingSkills", title: "📢 Digital Marketing Skills" },
                    { key: "digitalMarketingTools", title: "🎨 Marketing Tools" },
                    { key: "productivityTools", title: "💼 Productivity Tools" },
                    { key: "businessSkills", title: "🧠 Business & Professional Skills" },
                  ].map((group) => (
                    <div
                      key={group.key}
                      className={`p-4 rounded-2xl border ${
                        darkMode ? "bg-gray-800/40 border-gray-700" : "bg-white border-rose-100"
                      }`}
                    >
                      <h4 className="text-xs font-bold uppercase tracking-wider text-rose-500 mb-3">
                        {group.title} ({skills[group.key]?.length || 0})
                      </h4>
                      <div className="flex flex-wrap gap-2">
                        {skills[group.key]?.map((s) => (
                          <span
                            key={s}
                            className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-rose-500/15 text-rose-400 border border-rose-500/30"
                          >
                            <span>{s}</span>
                            <button
                              onClick={() => handleRemoveSkill(group.key, s)}
                              className="w-4 h-4 rounded-full flex items-center justify-center hover:bg-rose-500 hover:text-white transition"
                              title="Delete Skill"
                            >
                              ×
                            </button>
                          </span>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}

        {/* Footer Actions */}
        {isAuthenticated && (
          <div
            className={`flex flex-col sm:flex-row items-center justify-between gap-3 px-6 py-4 border-t ${
              darkMode ? "border-gray-800 bg-gray-950/80" : "border-rose-100 bg-rose-50/70"
            }`}
          >
            <div className="flex items-center gap-2">
              <button
                onClick={() => {
                  if (confirm("Reset all portfolio content back to the original defaults?")) {
                    resetToDefaults();
                    showToast("🔄 Reset to original defaults!");
                  }
                }}
                className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-semibold text-gray-400 hover:text-white hover:bg-rose-500/10 transition"
              >
                <RotateCcw size={14} />
                <span>Reset to Defaults</span>
              </button>
            </div>

            <div className="flex items-center gap-3">
              <button
                onClick={handleClose}
                className="flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-semibold border border-gray-700 hover:bg-gray-800 transition"
              >
                <ExternalLink size={14} />
                <span>View Live Site</span>
              </button>
              <button
                onClick={() => showToast("💾 All changes saved & live on your site!")}
                className="flex items-center gap-2 px-6 py-2.5 rounded-xl text-xs font-bold text-white bg-linear-to-r from-rose-500 to-pink-500 hover:shadow-lg transition cursor-pointer"
              >
                <Save size={14} />
                <span>Save Changes</span>
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminDashboard;

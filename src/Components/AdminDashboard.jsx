import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  X,
  Lock,
  Unlock,
  Key,
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
  Upload,
  Image as ImageIcon,
  ShieldCheck,
  Mail,
  Phone,
  Check,
} from "lucide-react";
import { usePortfolio } from "../context/PortfolioContext";
import { readFileAsDataURL } from "../utils/fileUpload";
import defaultShahdPhoto from "../assets/shahd_photo2.jpg";

const AUTH_STORAGE_KEY = "shahd_portfolio_admin_auth";
const CURRENT_USER_KEY = "shahd_portfolio_admin_current_user";
const ADMIN_PASSWORDS_KEY = "shahd_portfolio_admin_passwords";
const PASSWORD_RESET_REQUESTS_KEY = "shahd_portfolio_password_reset_requests";

const SHAHD_EMAIL = "kamalshahd574@gmail.com";
const MOHAMED_EMAIL = "mohamedfahmy1757@gmail.com";
const MOHAMED_DEFAULT_PASS = "Moofahmy1046";

// Helpers for localStorage password management
const getStoredPasswords = () => {
  try {
    const raw = localStorage.getItem(ADMIN_PASSWORDS_KEY);
    return raw ? JSON.parse(raw) : {};
  } catch {
    return {};
  }
};

const setStoredPasswords = (map) => {
  try {
    localStorage.setItem(ADMIN_PASSWORDS_KEY, JSON.stringify(map));
  } catch (e) {
    console.warn("Could not save admin passwords", e);
  }
};

const getStoredResetRequests = () => {
  try {
    const raw = localStorage.getItem(PASSWORD_RESET_REQUESTS_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
};

const setStoredResetRequests = (requests) => {
  try {
    localStorage.setItem(PASSWORD_RESET_REQUESTS_KEY, JSON.stringify(requests));
  } catch (e) {
    console.warn("Could not save password reset requests", e);
  }
};

const AdminDashboard = ({ darkMode }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    return localStorage.getItem(AUTH_STORAGE_KEY) === "true";
  });
  const [currentAdminEmail, setCurrentAdminEmail] = useState(() => {
    return localStorage.getItem(CURRENT_USER_KEY) || "";
  });

  // Login form state
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loginError, setLoginError] = useState("");
  const [loginSuccess, setLoginSuccess] = useState("");

  // Forgot password flow state: "login" | "forgot" | "resetting"
  const [authView, setAuthView] = useState("login");
  const [forgotEmail, setForgotEmail] = useState(SHAHD_EMAIL);
  const [newResetPassword, setNewResetPassword] = useState("");
  const [confirmResetPassword, setConfirmResetPassword] = useState("");

  // Active admin tab
  const [activeTab, setActiveTab] = useState("hero");
  const [saveToast, setSaveToast] = useState("");

  // Pending requests state (live)
  const [resetRequests, setResetRequests] = useState(getStoredResetRequests);

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

  // Sync reset requests on open
  useEffect(() => {
    if (isOpen) {
      setResetRequests(getStoredResetRequests());
    }
  }, [isOpen]);

  const handleClose = () => {
    setIsOpen(false);
    if (window.location.hash === "#admin") {
      window.history.pushState(null, "", window.location.pathname + window.location.search);
    }
  };

  const showToast = (msg) => {
    setSaveToast(msg);
    setTimeout(() => setSaveToast(""), 3500);
  };

  // Check if Shahd has set her initial password
  const storedPasswords = getStoredPasswords();
  const isShahdFirstTime = !storedPasswords[SHAHD_EMAIL];

  const handleLogin = (e) => {
    e.preventDefault();
    setLoginError("");
    setLoginSuccess("");

    const cleanEmail = loginEmail.trim().toLowerCase();

    if (cleanEmail !== SHAHD_EMAIL && cleanEmail !== MOHAMED_EMAIL) {
      setLoginError("Unauthorized Gmail. Only Shahd Kamal and Mohamed Fahmy are permitted.");
      return;
    }

    const passwords = getStoredPasswords();

    // Shahd First-Time Password Setup
    if (cleanEmail === SHAHD_EMAIL && !passwords[SHAHD_EMAIL]) {
      if (!loginPassword.trim() || loginPassword.length < 6) {
        setLoginError("Please create a password with at least 6 characters.");
        return;
      }
      if (loginPassword !== confirmPassword) {
        setLoginError("Passwords do not match. Please re-enter.");
        return;
      }

      // Save Shahd's chosen password
      const updated = { ...passwords, [SHAHD_EMAIL]: loginPassword.trim() };
      setStoredPasswords(updated);

      setIsAuthenticated(true);
      setCurrentAdminEmail(cleanEmail);
      localStorage.setItem(AUTH_STORAGE_KEY, "true");
      localStorage.setItem(CURRENT_USER_KEY, cleanEmail);
      showToast("🎉 Welcome Shahd! Your password has been set successfully.");
      return;
    }

    // Existing Password Check
    let expectedPassword = passwords[cleanEmail];
    if (!expectedPassword && cleanEmail === MOHAMED_EMAIL) {
      expectedPassword = MOHAMED_DEFAULT_PASS;
    }

    if (loginPassword.trim() === expectedPassword) {
      setIsAuthenticated(true);
      setCurrentAdminEmail(cleanEmail);
      localStorage.setItem(AUTH_STORAGE_KEY, "true");
      localStorage.setItem(CURRENT_USER_KEY, cleanEmail);
      setLoginError("");
    } else {
      setLoginError("Invalid password. If you forgot your password, use the 'Forgot password?' option below.");
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setCurrentAdminEmail("");
    localStorage.removeItem(AUTH_STORAGE_KEY);
    localStorage.removeItem(CURRENT_USER_KEY);
    setLoginEmail("");
    setLoginPassword("");
    setConfirmPassword("");
    setAuthView("login");
  };

  // --- Password Reset Request Logic ---
  const handleSendResetRequest = (e) => {
    e.preventDefault();
    const cleanEmail = forgotEmail.trim().toLowerCase();

    if (cleanEmail !== SHAHD_EMAIL && cleanEmail !== MOHAMED_EMAIL) {
      setLoginError("Email not recognized as an admin account.");
      return;
    }

    const targetEmail = cleanEmail === SHAHD_EMAIL ? MOHAMED_EMAIL : SHAHD_EMAIL;
    const targetName = cleanEmail === SHAHD_EMAIL ? "Mohamed Fahmy" : "Shahd Kamal";
    const requesterName = cleanEmail === SHAHD_EMAIL ? "Shahd Kamal" : "Mohamed Fahmy";

    const currentRequests = getStoredResetRequests();
    // Remove any previous requests for this email
    const filtered = currentRequests.filter((r) => r.requesterEmail !== cleanEmail);

    const newReq = {
      id: `req_${Date.now()}`,
      requesterEmail: cleanEmail,
      requesterName,
      targetEmail,
      targetName,
      status: "pending",
      createdAt: Date.now(),
    };

    const updated = [...filtered, newReq];
    setStoredResetRequests(updated);
    setResetRequests(updated);

    setLoginSuccess(`Password reset request sent to ${targetName} (${targetEmail}). Once they log in and approve your request, you can change your password.`);
    setLoginError("");
  };

  // Check if there is an approved reset request for the selected email
  const activeApprovedRequest = resetRequests.find(
    (r) => r.requesterEmail === forgotEmail.trim().toLowerCase() && r.status === "approved"
  );

  const activePendingRequest = resetRequests.find(
    (r) => r.requesterEmail === forgotEmail.trim().toLowerCase() && r.status === "pending"
  );

  const handleApplyNewPassword = (e) => {
    e.preventDefault();
    if (!newResetPassword.trim() || newResetPassword.length < 6) {
      setLoginError("New password must be at least 6 characters.");
      return;
    }
    if (newResetPassword !== confirmResetPassword) {
      setLoginError("Passwords do not match.");
      return;
    }

    const cleanEmail = forgotEmail.trim().toLowerCase();
    const passwords = getStoredPasswords();
    passwords[cleanEmail] = newResetPassword.trim();
    setStoredPasswords(passwords);

    // Remove the fulfilled reset request
    const remaining = resetRequests.filter((r) => r.requesterEmail !== cleanEmail);
    setStoredResetRequests(remaining);
    setResetRequests(remaining);

    setNewResetPassword("");
    setConfirmResetPassword("");
    setAuthView("login");
    setLoginEmail(cleanEmail);
    setLoginPassword(newResetPassword.trim());
    setLoginSuccess("✅ Password changed successfully! You can now log in.");
    setLoginError("");
  };

  const handleApproveReset = (requestId) => {
    const updated = resetRequests.map((r) =>
      r.id === requestId ? { ...r, status: "approved" } : r
    );
    setStoredResetRequests(updated);
    setResetRequests(updated);
    showToast("✅ Reset request approved! The requester can now set a new password.");
  };

  const handleRejectReset = (requestId) => {
    const updated = resetRequests.filter((r) => r.id !== requestId);
    setStoredResetRequests(updated);
    setResetRequests(updated);
    showToast("❌ Reset request rejected.");
  };

  // Filter requests waiting for the currently logged-in admin's approval
  const pendingRequestsForMe = resetRequests.filter(
    (r) => r.targetEmail === currentAdminEmail && r.status === "pending"
  );

  // --- File Upload Handlers (from PC or Phone) ---
  const handleAvatarFileUpload = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    try {
      showToast("Optimizing & uploading image...");
      const dataUrl = await readFileAsDataURL(file);
      setProfile((prev) => ({ ...prev, avatar: dataUrl }));
      showToast("📸 Hero photo uploaded successfully!");
    } catch (err) {
      alert("Failed to read image file. Please try again.");
    }
  };

  const handleAboutImageUpload = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    try {
      showToast("Optimizing & uploading image...");
      const dataUrl = await readFileAsDataURL(file);
      setProfile((prev) => ({ ...prev, aboutImage: dataUrl }));
      showToast("🖼️ About section photo uploaded successfully!");
    } catch (err) {
      alert("Failed to read image file. Please try again.");
    }
  };

  const handleContactImageUpload = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    try {
      showToast("Optimizing & uploading image...");
      const dataUrl = await readFileAsDataURL(file);
      setProfile((prev) => ({ ...prev, contactImage: dataUrl }));
      showToast("📞 Contact photo uploaded successfully!");
    } catch (err) {
      alert("Failed to read image file. Please try again.");
    }
  };

  const handleCvFileUpload = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    try {
      showToast("Processing CV file...");
      const dataUrl = await readFileAsDataURL(file);
      setProfile((prev) => ({
        ...prev,
        cvFile: dataUrl,
        cvUrl: file.name || "Shahd_Kamal_CV.pdf",
      }));
      showToast(`📄 CV (${file.name}) uploaded & linked successfully!`);
    } catch (err) {
      alert("Failed to read CV file. Please try again.");
    }
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

  const handleProjectImageUpload = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    try {
      const dataUrl = await readFileAsDataURL(file);
      setProjectForm((prev) => ({ ...prev, image: dataUrl }));
      showToast("Dashboard screenshot uploaded!");
    } catch {
      alert("Could not load image file.");
    }
  };

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
      image:
        projectForm.image ||
        "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=2340&auto=format&fit=crop",
      alt: projectForm.title,
      kpis: projectForm.kpis.split(",").map((k) => k.trim()).filter(Boolean),
      tags: projectForm.tags.split(",").map((t) => t.trim()).filter(Boolean),
      liveUrl: projectForm.liveUrl,
      impact: projectForm.impact,
      status: "Completed",
    };

    if (newProjectMode) {
      setProjects([formatted, ...projects]);
      showToast("✨ New dashboard added! Number auto-updated to " + (projects.length + 1) + "+");
    } else {
      setProjects(projects.map((p) => (p.id === editingProject ? formatted : p)));
      showToast("✅ Dashboard updated successfully!");
    }

    setEditingProject(null);
    setNewProjectMode(false);
  };

  const handleDeleteProject = (id) => {
    if (confirm("Are you sure you want to delete this dashboard? Numbers will auto-recalculate.")) {
      setProjects(projects.filter((p) => p.id !== id));
      showToast("🗑️ Dashboard removed! Number recalculated.");
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
                Live Content Manager, File Uploads &amp; Auto-Synchronized Counters
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
                <span className="hidden sm:inline">Logout ({currentAdminEmail === SHAHD_EMAIL ? "Shahd" : "Mohamed"})</span>
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
          /* LOGIN & AUTHENTICATION SCREENS */
          <div className="p-8 sm:p-12 flex flex-col items-center justify-center max-w-md mx-auto w-full my-auto text-center">
            <div className="w-16 h-16 rounded-2xl flex items-center justify-center bg-rose-500/10 text-rose-500 border border-rose-500/20 mb-6 shadow-inner">
              {authView === "login" ? <Lock size={32} /> : <Key size={32} />}
            </div>

            {authView === "login" ? (
              <>
                <h3 className="text-2xl font-bold mb-1">Admin Access</h3>
                <p className="text-xs sm:text-sm text-gray-400 mb-6">
                  Log in with your authorized admin email.
                </p>

                <form onSubmit={handleLogin} className="w-full space-y-4 text-left">
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider mb-1.5 text-rose-500">
                      Gmail Address
                    </label>
                    <input
                      type="email"
                      required
                      placeholder="kamalshahd574@gmail.com"
                      value={loginEmail}
                      onChange={(e) => {
                        setLoginEmail(e.target.value);
                        setLoginError("");
                      }}
                      className={`w-full px-4 py-3 rounded-xl border text-sm outline-none transition focus:border-rose-500 ${
                        darkMode ? "bg-gray-800/80 border-gray-700 text-white" : "bg-white border-rose-200"
                      }`}
                    />
                  </div>

                  {/* If Shahd is logging in for the first time, show friendly first-time password setup */}
                  {loginEmail.trim().toLowerCase() === SHAHD_EMAIL && isShahdFirstTime ? (
                    <div className="p-4 rounded-xl bg-rose-500/10 border border-rose-500/30 text-left space-y-3">
                      <p className="text-xs font-bold text-rose-400 flex items-center gap-1.5">
                        <Sparkles size={14} /> Welcome Shahd! Set your password:
                      </p>
                      <div>
                        <label className="block text-[11px] font-semibold text-gray-300 mb-1">
                          Choose Your Password
                        </label>
                        <input
                          type="password"
                          required
                          placeholder="At least 6 characters"
                          value={loginPassword}
                          onChange={(e) => setLoginPassword(e.target.value)}
                          className={`w-full px-3 py-2 rounded-lg border text-sm outline-none ${
                            darkMode ? "bg-gray-900 border-gray-700 text-white" : "bg-white border-rose-300"
                          }`}
                        />
                      </div>
                      <div>
                        <label className="block text-[11px] font-semibold text-gray-300 mb-1">
                          Confirm Password
                        </label>
                        <input
                          type="password"
                          required
                          placeholder="Re-enter password"
                          value={confirmPassword}
                          onChange={(e) => setConfirmPassword(e.target.value)}
                          className={`w-full px-3 py-2 rounded-lg border text-sm outline-none ${
                            darkMode ? "bg-gray-900 border-gray-700 text-white" : "bg-white border-rose-300"
                          }`}
                        />
                      </div>
                    </div>
                  ) : (
                    <div>
                      <div className="flex justify-between items-center mb-1.5">
                        <label className="block text-xs font-bold uppercase tracking-wider text-rose-500">
                          Password
                        </label>
                        <button
                          type="button"
                          onClick={() => {
                            setAuthView("forgot");
                            setForgotEmail(loginEmail || SHAHD_EMAIL);
                            setLoginError("");
                            setLoginSuccess("");
                          }}
                          className="text-[11px] text-rose-400 hover:underline cursor-pointer"
                        >
                          Forgot password?
                        </button>
                      </div>
                      <input
                        type="password"
                        required
                        placeholder="••••••••"
                        value={loginPassword}
                        onChange={(e) => setLoginPassword(e.target.value)}
                        className={`w-full px-4 py-3 rounded-xl border text-sm outline-none transition focus:border-rose-500 ${
                          darkMode ? "bg-gray-800/80 border-gray-700 text-white" : "bg-white border-rose-200"
                        }`}
                      />
                    </div>
                  )}

                  {loginError && (
                    <div className="p-3 rounded-xl bg-rose-500/15 border border-rose-500/30 text-rose-400 text-xs flex items-center gap-2">
                      <AlertCircle size={16} className="shrink-0" />
                      <span>{loginError}</span>
                    </div>
                  )}

                  {loginSuccess && (
                    <div className="p-3 rounded-xl bg-emerald-500/15 border border-emerald-500/30 text-emerald-400 text-xs flex items-center gap-2">
                      <CheckCircle2 size={16} className="shrink-0" />
                      <span>{loginSuccess}</span>
                    </div>
                  )}

                  <button
                    type="submit"
                    className="w-full py-3.5 rounded-xl font-bold text-sm text-white bg-linear-to-r from-rose-500 to-pink-500 hover:shadow-[0_0_25px_rgba(244,63,94,0.5)] transition duration-200 cursor-pointer"
                  >
                    {loginEmail.trim().toLowerCase() === SHAHD_EMAIL && isShahdFirstTime
                      ? "Save Password & Enter Dashboard"
                      : "Sign In to Admin Dashboard"}
                  </button>

                  <div className="text-[11px] text-gray-500 text-center pt-2 space-y-1">
                    <p>
                      Authorized Admins: <code className="text-rose-400">kamalshahd574@gmail.com</code> &amp; <code className="text-rose-400">mohamedfahmy1757@gmail.com</code>
                    </p>
                  </div>
                </form>
              </>
            ) : (
              /* FORGOT PASSWORD REQUEST & APPROVAL FLOW */
              <div className="w-full text-left space-y-4">
                <div className="text-center">
                  <h3 className="text-2xl font-bold mb-1">Reset Password</h3>
                  <p className="text-xs text-gray-400 mb-4">
                    Security approval required: If one of you forgets their password, a request is sent to the other for approval.
                  </p>
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider mb-1.5 text-rose-500">
                    Who needs a password reset?
                  </label>
                  <select
                    value={forgotEmail}
                    onChange={(e) => {
                      setForgotEmail(e.target.value);
                      setLoginError("");
                      setLoginSuccess("");
                    }}
                    className={`w-full px-4 py-3 rounded-xl border text-sm outline-none ${
                      darkMode ? "bg-gray-800 border-gray-700 text-white" : "bg-white border-rose-200"
                    }`}
                  >
                    <option value={SHAHD_EMAIL}>Shahd Kamal (kamalshahd574@gmail.com)</option>
                    <option value={MOHAMED_EMAIL}>Mohamed Fahmy (mohamedfahmy1757@gmail.com)</option>
                  </select>
                </div>

                {/* Case 1: An approved reset exists -> Let them set a new password! */}
                {activeApprovedRequest ? (
                  <form onSubmit={handleApplyNewPassword} className="p-4 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 space-y-3">
                    <div className="flex items-center gap-2 text-emerald-400 text-xs font-bold">
                      <ShieldCheck size={18} />
                      <span>Request Approved! You may now set your new password:</span>
                    </div>

                    <div>
                      <label className="block text-[11px] font-semibold text-gray-300 mb-1">
                        New Password
                      </label>
                      <input
                        type="password"
                        required
                        placeholder="At least 6 characters"
                        value={newResetPassword}
                        onChange={(e) => setNewResetPassword(e.target.value)}
                        className={`w-full px-3 py-2 rounded-lg border text-sm outline-none ${
                          darkMode ? "bg-gray-900 border-gray-700 text-white" : "bg-white border-rose-300"
                        }`}
                      />
                    </div>

                    <div>
                      <label className="block text-[11px] font-semibold text-gray-300 mb-1">
                        Confirm New Password
                      </label>
                      <input
                        type="password"
                        required
                        placeholder="Re-enter new password"
                        value={confirmResetPassword}
                        onChange={(e) => setConfirmResetPassword(e.target.value)}
                        className={`w-full px-3 py-2 rounded-lg border text-sm outline-none ${
                          darkMode ? "bg-gray-900 border-gray-700 text-white" : "bg-white border-rose-300"
                        }`}
                      />
                    </div>

                    <button
                      type="submit"
                      className="w-full py-2.5 rounded-xl font-bold text-xs text-white bg-emerald-500 hover:bg-emerald-600 transition cursor-pointer"
                    >
                      Update Password &amp; Log In
                    </button>
                  </form>
                ) : activePendingRequest ? (
                  /* Case 2: Request is pending approval */
                  <div className="p-4 rounded-2xl bg-amber-500/10 border border-amber-500/30 text-xs space-y-2">
                    <p className="font-bold text-amber-400 flex items-center gap-1.5">
                      <AlertCircle size={15} /> Request Pending Approval
                    </p>
                    <p className="text-gray-300 text-[11px] leading-relaxed">
                      A reset request was sent to <strong>{activePendingRequest.targetName}</strong> ({activePendingRequest.targetEmail}). They must log in to the admin panel and click <strong>Approve</strong>. Once approved, refresh this page to set your new password.
                    </p>
                  </div>
                ) : (
                  /* Case 3: No request yet -> Send request */
                  <form onSubmit={handleSendResetRequest} className="space-y-3">
                    <p className="text-xs text-gray-400 leading-relaxed">
                      Clicking below will send a reset request to{" "}
                      <strong className="text-rose-400">
                        {forgotEmail === SHAHD_EMAIL ? "Mohamed Fahmy" : "Shahd Kamal"}
                      </strong>
                      . They must log in and approve it before your password can be changed.
                    </p>

                    <button
                      type="submit"
                      className="w-full py-3 rounded-xl font-bold text-xs text-white bg-linear-to-r from-rose-500 to-pink-500 hover:shadow-lg transition cursor-pointer"
                    >
                      Send Reset Request to {forgotEmail === SHAHD_EMAIL ? "Mohamed" : "Shahd"}
                    </button>
                  </form>
                )}

                {loginError && (
                  <div className="p-3 rounded-xl bg-rose-500/15 border border-rose-500/30 text-rose-400 text-xs flex items-center gap-2">
                    <AlertCircle size={16} className="shrink-0" />
                    <span>{loginError}</span>
                  </div>
                )}

                {loginSuccess && (
                  <div className="p-3 rounded-xl bg-emerald-500/15 border border-emerald-500/30 text-emerald-400 text-xs flex items-center gap-2">
                    <CheckCircle2 size={16} className="shrink-0" />
                    <span>{loginSuccess}</span>
                  </div>
                )}

                <div className="text-center pt-2">
                  <button
                    type="button"
                    onClick={() => {
                      setAuthView("login");
                      setLoginError("");
                      setLoginSuccess("");
                    }}
                    className="text-xs text-gray-400 hover:text-white transition"
                  >
                    ← Back to Login
                  </button>
                </div>
              </div>
            )}
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
                { id: "hero", label: "Hero & Photos", icon: <User size={16} /> },
                { id: "about", label: "About Me", icon: <FileText size={16} /> },
                { id: "contact", label: "Contact & Social", icon: <Mail size={16} /> },
                {
                  id: "projects",
                  label: `Dashboards (${projects.length})`,
                  icon: <BarChart3 size={16} />,
                  badge: `${projects.length}+`,
                },
                { id: "experience", label: "Work Experience", icon: <Briefcase size={16} /> },
                { id: "skills", label: "Skills & Tools", icon: <Wrench size={16} /> },
                {
                  id: "security",
                  label: "Security & Approvals",
                  icon: <ShieldCheck size={16} />,
                  badge: pendingRequestsForMe.length > 0 ? `${pendingRequestsForMe.length} pending` : undefined,
                },
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
                        tab.badge.includes("pending")
                          ? "bg-amber-500 text-white animate-pulse"
                          : activeTab === tab.id
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
                  <Sparkles size={14} /> Auto-Calculated Stats
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
                  <div className="flex justify-between">
                    <span>Skills:</span>
                    <strong className="text-white font-bold">{stats.totalSkillsCount}</strong>
                  </div>
                </div>
              </div>
            </div>

            {/* Main Panel Content */}
            <div className="flex-1 p-6 sm:p-8 overflow-y-auto space-y-6">
              {/* Approval notification alert inside dashboard if someone requested a reset */}
              {pendingRequestsForMe.length > 0 && (
                <div className="p-4 rounded-2xl bg-amber-500/15 border border-amber-500/40 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 shadow-lg">
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-xl flex items-center justify-center bg-amber-500 text-black font-bold shrink-0">
                      <Key size={18} />
                    </div>
                    <div>
                      <p className="text-xs font-bold text-amber-300">
                        Password Reset Approval Requested!
                      </p>
                      <p className="text-[11px] text-gray-300">
                        {pendingRequestsForMe[0].requesterName} ({pendingRequestsForMe[0].requesterEmail}) has requested permission to reset their password.
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 self-end sm:self-auto">
                    <button
                      onClick={() => handleApproveReset(pendingRequestsForMe[0].id)}
                      className="px-3.5 py-1.5 rounded-lg text-xs font-bold bg-emerald-500 hover:bg-emerald-600 text-white transition flex items-center gap-1"
                    >
                      <Check size={14} /> Approve
                    </button>
                    <button
                      onClick={() => handleRejectReset(pendingRequestsForMe[0].id)}
                      className="px-3 py-1.5 rounded-lg text-xs font-semibold bg-gray-800 hover:bg-gray-700 text-gray-300 transition"
                    >
                      Reject
                    </button>
                  </div>
                </div>
              )}

              {/* TAB 1: HERO, PROFILE & FILE UPLOADS */}
              {activeTab === "hero" && (
                <div className="space-y-6">
                  <div className="border-b pb-3 border-gray-700/30">
                    <h3 className="text-lg font-bold">Hero Section, Photos &amp; CV Upload</h3>
                    <p className="text-xs text-gray-400">
                      Upload your photo and CV directly from your phone or PC, and customize the words that appear directly under your name.
                    </p>
                  </div>

                  {/* Photo & CV File Upload Row */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    {/* Hero Photo Upload */}
                    <div
                      className={`p-4 rounded-2xl border space-y-3 ${
                        darkMode ? "bg-gray-800/40 border-gray-700" : "bg-rose-50/50 border-rose-200"
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <label className="text-xs font-bold text-rose-500 uppercase tracking-wider flex items-center gap-1.5">
                          <ImageIcon size={15} /> Hero Section Photo
                        </label>
                        {profile.avatar !== defaultShahdPhoto && (
                          <button
                            onClick={() => {
                              setProfile({ ...profile, avatar: defaultShahdPhoto });
                              showToast("Reset photo to default!");
                            }}
                            className="text-[11px] text-gray-400 hover:text-rose-400 underline"
                          >
                            Reset to default
                          </button>
                        )}
                      </div>

                      <div className="flex items-center gap-4">
                        <div className="w-20 h-24 rounded-2xl overflow-hidden border-2 border-rose-400/30 shadow-md shrink-0 bg-black/30">
                          <img
                            src={profile.avatar || defaultShahdPhoto}
                            alt="Preview"
                            className="w-full h-full object-cover object-top"
                          />
                        </div>

                        <div className="space-y-2 flex-1">
                          <label className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-bold bg-linear-to-r from-rose-500 to-pink-500 text-white shadow-md hover:opacity-90 cursor-pointer transition">
                            <Upload size={14} />
                            <span>Upload from Phone / PC</span>
                            <input
                              type="file"
                              accept="image/*"
                              onChange={handleAvatarFileUpload}
                              className="hidden"
                            />
                          </label>
                          <p className="text-[11px] text-gray-400">
                            Supports JPG, PNG, WebP. Automatically optimized for fast mobile rendering.
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* CV Document Upload */}
                    <div
                      className={`p-4 rounded-2xl border space-y-3 ${
                        darkMode ? "bg-gray-800/40 border-gray-700" : "bg-rose-50/50 border-rose-200"
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <label className="text-xs font-bold text-rose-500 uppercase tracking-wider flex items-center gap-1.5">
                          <FileText size={15} /> CV Document (PDF / File)
                        </label>
                        {profile.cvFile && (
                          <span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 font-bold">
                            File Attached
                          </span>
                        )}
                      </div>

                      <div className="space-y-2.5">
                        <div className="flex flex-wrap items-center gap-2">
                          <label className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-bold bg-linear-to-r from-rose-500 to-pink-500 text-white shadow-md hover:opacity-90 cursor-pointer transition">
                            <Upload size={14} />
                            <span>Upload CV from Phone / PC</span>
                            <input
                              type="file"
                              accept=".pdf,.doc,.docx"
                              onChange={handleCvFileUpload}
                              className="hidden"
                            />
                          </label>

                          {profile.cvFile && (
                            <a
                              href={profile.cvFile}
                              download={profile.cvUrl || "Shahd_Kamal_CV.pdf"}
                              className="px-3 py-2 rounded-xl text-xs font-semibold border border-rose-400/40 hover:bg-rose-500/10 transition"
                            >
                              Test Download
                            </a>
                          )}
                        </div>

                        <div>
                          <label className="block text-[11px] text-gray-400 mb-1">
                            Or enter an external CV Link / File Name:
                          </label>
                          <input
                            type="text"
                            placeholder="e.g. /Shahd_Kamal_CV.pdf or Google Drive link"
                            value={profile.cvUrl}
                            onChange={(e) => setProfile({ ...profile, cvUrl: e.target.value })}
                            className={`w-full px-3 py-1.5 rounded-xl border text-xs outline-none focus:border-rose-500 ${
                              darkMode ? "bg-gray-800 border-gray-700" : "bg-white border-rose-200"
                            }`}
                          />
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Words Under Name & Taglines */}
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
                        Words Directly Under Her Name (Primary Title)
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
                </div>
              )}

              {/* TAB 2: ABOUT ME & ABOUT PHOTO */}
              {activeTab === "about" && (
                <div className="space-y-5">
                  <div className="border-b pb-3 border-gray-700/30">
                    <h3 className="text-lg font-bold">About Me Section &amp; Illustration</h3>
                    <p className="text-xs text-gray-400">
                      Upload a photo for the About section or customize text, disciplines, and milestones.
                    </p>
                  </div>

                  {/* About Photo Upload */}
                  <div
                    className={`p-4 rounded-2xl border space-y-3 ${
                      darkMode ? "bg-gray-800/40 border-gray-700" : "bg-rose-50/50 border-rose-200"
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <label className="text-xs font-bold text-rose-500 uppercase tracking-wider flex items-center gap-1.5">
                        <ImageIcon size={15} /> About Section Photo
                      </label>
                      {profile.aboutImage && (
                        <button
                          onClick={() => {
                            setProfile({ ...profile, aboutImage: "" });
                            showToast("Reset to use primary photo!");
                          }}
                          className="text-[11px] text-gray-400 hover:text-rose-400 underline"
                        >
                          Use Hero Photo
                        </button>
                      )}
                    </div>

                    <div className="flex items-center gap-4">
                      <div className="w-20 h-24 rounded-2xl overflow-hidden border-2 border-rose-400/30 shadow-md shrink-0 bg-black/30">
                        <img
                          src={profile.aboutImage || profile.avatar || defaultShahdPhoto}
                          alt="About Preview"
                          className="w-full h-full object-cover object-top"
                        />
                      </div>

                      <div className="space-y-2 flex-1">
                        <label className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-bold bg-linear-to-r from-rose-500 to-pink-500 text-white shadow-md hover:opacity-90 cursor-pointer transition">
                          <Upload size={14} />
                          <span>Upload About Photo (Phone / PC)</span>
                          <input
                            type="file"
                            accept="image/*"
                            onChange={handleAboutImageUpload}
                            className="hidden"
                          />
                        </label>
                        <p className="text-[11px] text-gray-400">
                          {profile.aboutImage
                            ? "Custom image active for About section."
                            : "Currently mirroring Hero photo."}
                        </p>
                      </div>
                    </div>
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

              {/* TAB: CONTACT & PHOTO */}
              {activeTab === "contact" && (
                <div className="space-y-5">
                  <div className="border-b pb-3 border-gray-700/30">
                    <h3 className="text-lg font-bold">Contact Section &amp; Handles</h3>
                    <p className="text-xs text-gray-400">
                      Upload a photo specifically for the Contact section and manage your direct handles.
                    </p>
                  </div>

                  {/* Contact Photo Upload */}
                  <div
                    className={`p-4 rounded-2xl border space-y-3 ${
                      darkMode ? "bg-gray-800/40 border-gray-700" : "bg-rose-50/50 border-rose-200"
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <label className="text-xs font-bold text-rose-500 uppercase tracking-wider flex items-center gap-1.5">
                        <ImageIcon size={15} /> Contact Section Photo
                      </label>
                      {profile.contactImage && (
                        <button
                          onClick={() => {
                            setProfile({ ...profile, contactImage: "" });
                            showToast("Reset to use primary photo!");
                          }}
                          className="text-[11px] text-gray-400 hover:text-rose-400 underline"
                        >
                          Use Hero Photo
                        </button>
                      )}
                    </div>

                    <div className="flex items-center gap-4">
                      <div className="w-20 h-24 rounded-2xl overflow-hidden border-2 border-rose-400/30 shadow-md shrink-0 bg-black/30">
                        <img
                          src={profile.contactImage || profile.avatar || defaultShahdPhoto}
                          alt="Contact Preview"
                          className="w-full h-full object-cover object-top"
                        />
                      </div>

                      <div className="space-y-2 flex-1">
                        <label className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-bold bg-linear-to-r from-rose-500 to-pink-500 text-white shadow-md hover:opacity-90 cursor-pointer transition">
                          <Upload size={14} />
                          <span>Upload Contact Photo (Phone / PC)</span>
                          <input
                            type="file"
                            accept="image/*"
                            onChange={handleContactImageUpload}
                            className="hidden"
                          />
                        </label>
                        <p className="text-[11px] text-gray-400">
                          {profile.contactImage
                            ? "Custom image active for Contact section."
                            : "Currently mirroring Hero photo."}
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
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

                    <div>
                      <label className="block text-xs font-bold text-rose-500 uppercase tracking-wider mb-1">
                        WhatsApp Link
                      </label>
                      <input
                        type="text"
                        value={profile.whatsappUrl}
                        onChange={(e) => setProfile({ ...profile, whatsappUrl: e.target.value })}
                        className={`w-full px-4 py-2.5 rounded-xl border text-sm outline-none focus:border-rose-500 ${
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
                          <label className="block text-xs font-bold mb-1">Category Domain</label>
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

                      {/* Image Upload for Dashboard */}
                      <div>
                        <label className="block text-xs font-bold mb-1 text-rose-500">
                          Dashboard Screenshot (Upload or Link)
                        </label>
                        <div className="flex flex-col sm:flex-row items-center gap-3">
                          <label className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-bold bg-linear-to-r from-rose-500 to-pink-500 text-white shadow-md hover:opacity-90 cursor-pointer transition shrink-0">
                            <Upload size={14} />
                            <span>Upload Screenshot</span>
                            <input
                              type="file"
                              accept="image/*"
                              onChange={handleProjectImageUpload}
                              className="hidden"
                            />
                          </label>
                          <input
                            type="text"
                            placeholder="Or enter Image URL"
                            value={projectForm.image}
                            onChange={(e) => setProjectForm({ ...projectForm, image: e.target.value })}
                            className={`w-full px-3 py-2 rounded-xl border text-sm outline-none focus:border-rose-500 ${
                              darkMode ? "bg-gray-900 border-gray-700" : "bg-white border-rose-200"
                            }`}
                          />
                        </div>
                      </div>

                      <div>
                        <label className="block text-xs font-bold mb-1">Short Description</label>
                        <input
                          type="text"
                          value={projectForm.des}
                          onChange={(e) => setProjectForm({ ...projectForm, des: e.target.value })}
                          className={`w-full px-3 py-2 rounded-xl border text-sm outline-none focus:border-rose-500 ${
                            darkMode ? "bg-gray-900 border-gray-700" : "bg-white border-rose-200"
                          }`}
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-bold mb-1">Detailed Case Study</label>
                        <textarea
                          rows={3}
                          value={projectForm.longDes}
                          onChange={(e) => setProjectForm({ ...projectForm, longDes: e.target.value })}
                          className={`w-full p-3 rounded-xl border text-sm outline-none focus:border-rose-500 ${
                            darkMode ? "bg-gray-900 border-gray-700" : "bg-white border-rose-200"
                          }`}
                        />
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-xs font-bold mb-1">KPIs (Comma Separated)</label>
                          <input
                            type="text"
                            placeholder="Revenue, ROI, Churn"
                            value={projectForm.kpis}
                            onChange={(e) => setProjectForm({ ...projectForm, kpis: e.target.value })}
                            className={`w-full px-3 py-2 rounded-xl border text-sm outline-none focus:border-rose-500 ${
                              darkMode ? "bg-gray-900 border-gray-700" : "bg-white border-rose-200"
                            }`}
                          />
                        </div>

                        <div>
                          <label className="block text-xs font-bold mb-1">Tags (Comma Separated)</label>
                          <input
                            type="text"
                            placeholder="Power BI, DAX, Excel"
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
                          className="px-4 py-2 rounded-xl text-xs font-semibold text-gray-400 hover:text-white"
                        >
                          Cancel
                        </button>
                        <button
                          onClick={handleSaveProject}
                          className="px-6 py-2 rounded-xl text-xs font-bold text-white bg-linear-to-r from-rose-500 to-pink-500 hover:shadow-lg transition cursor-pointer"
                        >
                          {newProjectMode ? "Add to Portfolio" : "Save Changes"}
                        </button>
                      </div>
                    </div>
                  )}

                  {/* Projects List */}
                  <div className="grid grid-cols-1 gap-3">
                    {projects.map((proj) => (
                      <div
                        key={proj.id}
                        className={`p-4 rounded-2xl border flex items-center justify-between gap-4 transition ${
                          darkMode ? "bg-gray-800/40 border-gray-700 hover:border-gray-600" : "bg-white border-rose-100 hover:border-rose-300"
                        }`}
                      >
                        <div className="flex items-center gap-3 min-w-0">
                          <img
                            src={proj.image}
                            alt=""
                            className="w-16 h-12 rounded-lg object-cover shrink-0 border border-rose-400/20"
                          />
                          <div className="min-w-0">
                            <h4 className="font-bold text-sm truncate">{proj.title}</h4>
                            <p className="text-xs text-rose-500 font-semibold">{proj.categoryLabel}</p>
                          </div>
                        </div>

                        <div className="flex items-center gap-2 shrink-0">
                          <button
                            onClick={() => handleStartEditProject(proj)}
                            className="p-2 rounded-lg text-gray-400 hover:text-white hover:bg-gray-700/50 transition"
                            title="Edit"
                          >
                            <Edit3 size={16} />
                          </button>
                          <button
                            onClick={() => handleDeleteProject(proj.id)}
                            className="p-2 rounded-lg text-rose-400 hover:text-rose-300 hover:bg-rose-500/10 transition"
                            title="Delete"
                          >
                            <Trash2 size={16} />
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
                    <h3 className="text-lg font-bold">Work Experience &amp; Career Milestones</h3>
                    <p className="text-xs text-gray-400">
                      Edit your roles, period, organization, and bullet points.
                    </p>
                  </div>

                  <div className="space-y-4">
                    {experiences.map((exp, expIdx) => (
                      <div
                        key={exp.id || expIdx}
                        className={`p-5 rounded-2xl border space-y-3 ${
                          darkMode ? "bg-gray-800/40 border-gray-700" : "bg-white border-rose-100"
                        }`}
                      >
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                          <div>
                            <label className="block text-[11px] font-bold text-rose-500 uppercase">
                              Role Title
                            </label>
                            <input
                              type="text"
                              value={exp.role}
                              onChange={(e) => {
                                const copy = [...experiences];
                                copy[expIdx].role = e.target.value;
                                setExperiences(copy);
                              }}
                              className={`w-full px-3 py-1.5 rounded-xl border text-sm outline-none focus:border-rose-500 ${
                                darkMode ? "bg-gray-900 border-gray-700" : "bg-white border-rose-200"
                              }`}
                            />
                          </div>

                          <div>
                            <label className="block text-[11px] font-bold text-rose-500 uppercase">
                              Organization
                            </label>
                            <input
                              type="text"
                              value={exp.organization}
                              onChange={(e) => {
                                const copy = [...experiences];
                                copy[expIdx].organization = e.target.value;
                                setExperiences(copy);
                              }}
                              className={`w-full px-3 py-1.5 rounded-xl border text-sm outline-none focus:border-rose-500 ${
                                darkMode ? "bg-gray-900 border-gray-700" : "bg-white border-rose-200"
                              }`}
                            />
                          </div>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                          <div>
                            <label className="block text-[11px] font-bold text-rose-500 uppercase">
                              Period
                            </label>
                            <input
                              type="text"
                              value={exp.period}
                              onChange={(e) => {
                                const copy = [...experiences];
                                copy[expIdx].period = e.target.value;
                                setExperiences(copy);
                              }}
                              className={`w-full px-3 py-1.5 rounded-xl border text-sm outline-none focus:border-rose-500 ${
                                darkMode ? "bg-gray-900 border-gray-700" : "bg-white border-rose-200"
                              }`}
                            />
                          </div>

                          <div>
                            <label className="block text-[11px] font-bold text-rose-500 uppercase">
                              Badge
                            </label>
                            <input
                              type="text"
                              value={exp.badge}
                              onChange={(e) => {
                                const copy = [...experiences];
                                copy[expIdx].badge = e.target.value;
                                setExperiences(copy);
                              }}
                              className={`w-full px-3 py-1.5 rounded-xl border text-sm outline-none focus:border-rose-500 ${
                                darkMode ? "bg-gray-900 border-gray-700" : "bg-white border-rose-200"
                              }`}
                            />
                          </div>
                        </div>

                        <div>
                          <label className="block text-[11px] font-bold text-rose-500 uppercase mb-1">
                            Bullet Points (One per line)
                          </label>
                          <textarea
                            rows={4}
                            value={Array.isArray(exp.bullets) ? exp.bullets.join("\n") : ""}
                            onChange={(e) => {
                              const copy = [...experiences];
                              copy[expIdx].bullets = e.target.value.split("\n").filter(Boolean);
                              setExperiences(copy);
                            }}
                            className={`w-full p-2.5 rounded-xl border text-xs outline-none focus:border-rose-500 ${
                              darkMode ? "bg-gray-900 border-gray-700" : "bg-white border-rose-200"
                            }`}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* TAB 5: SKILLS & TOOLS */}
              {activeTab === "skills" && (
                <div className="space-y-6">
                  <div className="border-b pb-3 border-gray-700/30">
                    <h3 className="text-lg font-bold">Skills &amp; Analytical Tools</h3>
                    <p className="text-xs text-gray-400">
                      Add, remove, or customize technical skills. Counter updates automatically!
                    </p>
                  </div>

                  {/* Add New Skill Input */}
                  <div className="flex flex-wrap gap-2 items-center">
                    <input
                      type="text"
                      placeholder="Add a new skill (e.g. SQL, Python, Tableau)"
                      value={newSkillText}
                      onChange={(e) => setNewSkillText(e.target.value)}
                      className={`flex-1 min-w-[200px] px-4 py-2.5 rounded-xl border text-xs outline-none focus:border-rose-500 ${
                        darkMode ? "bg-gray-800 border-gray-700" : "bg-white border-rose-200"
                      }`}
                    />
                    <button
                      onClick={() => handleAddSkill("dataAnalysisSkills")}
                      className="px-3 py-2 rounded-xl text-xs font-bold text-white bg-linear-to-r from-rose-500 to-pink-500 hover:opacity-90 transition"
                    >
                      + Data Skill
                    </button>
                    <button
                      onClick={() => handleAddSkill("dataAnalysisTools")}
                      className="px-3 py-2 rounded-xl text-xs font-bold text-white bg-indigo-600 hover:bg-indigo-700 transition"
                    >
                      + Data Tool
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

              {/* TAB 6: SECURITY & RESET APPROVALS */}
              {activeTab === "security" && (
                <div className="space-y-6">
                  <div className="border-b pb-3 border-gray-700/30">
                    <h3 className="text-lg font-bold">Admin Password Security &amp; Reset Approvals</h3>
                    <p className="text-xs text-gray-400">
                      Manage passwords and approve password-reset requests sent by the other admin.
                    </p>
                  </div>

                  {/* Pending Requests for approval */}
                  <div
                    className={`p-5 rounded-2xl border space-y-4 ${
                      darkMode ? "bg-gray-800/40 border-gray-700" : "bg-white border-rose-100"
                    }`}
                  >
                    <h4 className="text-sm font-bold text-rose-500 flex items-center gap-2">
                      <Key size={16} /> Pending Password Reset Requests
                    </h4>

                    {pendingRequestsForMe.length === 0 ? (
                      <p className="text-xs text-gray-400">
                        No pending requests. If the other admin forgets their password and requests a reset, their request will appear here for your approval.
                      </p>
                    ) : (
                      <div className="space-y-3">
                        {pendingRequestsForMe.map((req) => (
                          <div
                            key={req.id}
                            className="p-4 rounded-xl bg-amber-500/10 border border-amber-500/30 flex flex-col sm:flex-row sm:items-center justify-between gap-3"
                          >
                            <div>
                              <p className="text-xs font-bold text-amber-300">
                                {req.requesterName} ({req.requesterEmail})
                              </p>
                              <p className="text-[11px] text-gray-400">
                                Requested at: {new Date(req.createdAt).toLocaleString()}
                              </p>
                            </div>
                            <div className="flex items-center gap-2">
                              <button
                                onClick={() => handleApproveReset(req.id)}
                                className="px-3.5 py-1.5 rounded-lg text-xs font-bold bg-emerald-500 hover:bg-emerald-600 text-white transition flex items-center gap-1 cursor-pointer"
                              >
                                <Check size={14} /> Approve Request
                              </button>
                              <button
                                onClick={() => handleRejectReset(req.id)}
                                className="px-3 py-1.5 rounded-lg text-xs font-semibold bg-gray-700 hover:bg-gray-600 text-gray-300 transition cursor-pointer"
                              >
                                Reject
                              </button>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>

                  {/* Active Admin Info */}
                  <div
                    className={`p-5 rounded-2xl border space-y-2 text-xs ${
                      darkMode ? "bg-gray-800/40 border-gray-700" : "bg-white border-rose-100"
                    }`}
                  >
                    <h4 className="font-bold text-rose-500 text-sm flex items-center gap-2">
                      <ShieldCheck size={16} /> Currently Logged In As
                    </h4>
                    <p className="text-gray-300">
                      <strong>Admin Email:</strong> {currentAdminEmail || "Authorized Admin"}
                    </p>
                    <p className="text-gray-400 text-[11px]">
                      Shahd and Mohamed have distinct credentials. If either forgets their password, the other must accept the request before the password can be reset.
                    </p>
                  </div>
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
                className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-semibold text-gray-400 hover:text-white hover:bg-rose-500/10 transition cursor-pointer"
              >
                <RotateCcw size={14} />
                <span>Reset to Defaults</span>
              </button>
            </div>

            <div className="flex items-center gap-3">
              <button
                onClick={handleClose}
                className="flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-semibold border border-gray-700 hover:bg-gray-800 transition cursor-pointer"
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

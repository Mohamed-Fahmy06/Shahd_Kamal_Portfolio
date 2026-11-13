import { useState } from "react";
import shahdPhoto from "../assets/shahd_photo.jpg";
import { Mail, Phone, MapPin, Send, Sparkles } from "lucide-react";
import { FaLinkedin } from "react-icons/fa6";
import { usePortfolio } from "../context/PortfolioContext";

const Contact = ({ darkMode }) => {
  const { profile } = usePortfolio();
  const [result, setResult] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const onSubmit = async (event) => {
    event.preventDefault();
    setIsSubmitting(true);
    setResult("Sending....");
    const formData = new FormData(event.target);

    try {
      const response = await fetch("https://formspree.io/f/xqpqelgw", {
        method: "POST",
        body: formData,
        headers: {
          Accept: "application/json",
        },
      });

      if (response.ok) {
        setResult("Message Sent Successfully! Shahd will get back to you soon.");
        event.target.reset();
        setTimeout(() => setResult(""), 6000);
      } else {
        const data = await response.json().catch(() => ({}));
        setResult(data.error || "Failed to send message. Please try again.");
      }
    } catch {
      setResult("Something went wrong. Please reach out directly via WhatsApp or LinkedIn.");
    }
    setIsSubmitting(false);
  };

  return (
    <section
      id="Contact"
      style={{
        backgroundColor: darkMode ? "#111827" : "#f9fafb",
      }}
      className="py-16 sm:py-20 lg:py-24 overflow-hidden cursor-default caret-transparent transition-colors duration-500"
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-12">
        {/* Section Header */}
        <div className="text-center mb-12 sm:mb-16" data-aos="fade-up">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-semibold uppercase tracking-widest text-rose-500 bg-rose-500/10 border border-rose-500/20 mb-3">
            <Sparkles size={14} /> Let's Connect
          </div>
          <h2
            className="text-3xl sm:text-4xl md:text-5xl font-extrabold mb-3"
            style={{
              color: darkMode ? "white" : "#1f2937",
            }}
          >
            Get In{" "}
            <span
              style={{
                background: "linear-gradient(to right, #f43f5e, #fb7185)",
                WebkitBackgroundClip: "text",
                backgroundClip: "text",
                color: "transparent",
              }}
            >
              Touch
            </span>
          </h2>

          <p
            className="text-base sm:text-lg max-w-2xl mx-auto"
            style={{
              color: darkMode ? "#d1d5db" : "#6b7280",
            }}
          >
            I'm always open to discussing data analytics collaborations,
            business intelligence dashboards, and digital growth strategies.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 sm:gap-12 items-center max-w-6xl mx-auto">
          {/* Left Side: Photo & Direct Contact Cards (5 cols) */}
          <div
            className="order-2 lg:order-1 lg:col-span-5 flex flex-col items-center"
            data-aos="fade-right"
          >
            <div className="relative w-full max-w-sm group mb-6">
              {/* Ambient Glow */}
              <div className="absolute -inset-2 bg-linear-to-r from-rose-500 via-pink-500 to-rose-400 rounded-3xl blur-2xl opacity-25 group-hover:opacity-40 transition duration-500" />

              <div className="relative rounded-3xl overflow-hidden border-2 border-rose-400/30 shadow-2xl backdrop-blur-sm">
                <img
                  src={profile.contactImage || profile.avatar || shahdPhoto}
                  alt={profile.name || "Shahd Kamal"}
                  width="384"
                  height="480"
                  loading="lazy"
                  className="w-full h-auto object-cover transform group-hover:scale-102 transition-transform duration-500"
                />

                {/* Floating pill badge on photo */}
                <div
                  className="absolute bottom-3 left-3 right-3 p-3 rounded-2xl backdrop-blur-md border border-white/20 shadow-lg flex items-center justify-between"
                  style={{
                    background: darkMode
                      ? "rgba(17, 24, 39, 0.85)"
                      : "rgba(255, 255, 255, 0.85)",
                  }}
                >
                  <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
                    <div>
                      <p
                        className="text-xs font-bold"
                        style={{ color: darkMode ? "white" : "#1f2937" }}
                      >
                        Shahd Kamal
                      </p>
                      <p className="text-[11px] text-rose-500 font-semibold">
                        Available for Opportunities
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Quick Contact Badges */}
            <div className="w-full max-w-sm space-y-2.5">
              <a
                href={profile.linkedinUrl || "https://www.linkedin.com/in/shahd-kamal-30a99436b"}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Shahd LinkedIn"
                className="flex items-center gap-3 p-3 rounded-xl border text-xs sm:text-sm font-semibold transition-all hover:scale-102 shadow-sm"
                style={{
                  background: darkMode ? "rgba(31, 41, 55, 0.7)" : "#ffffff",
                  borderColor: darkMode ? "#374151" : "#ffe4e6",
                  color: darkMode ? "#f3f4f6" : "#1f2937",
                }}
              >
                <div className="w-8 h-8 rounded-lg flex items-center justify-center bg-rose-500/10 text-rose-500 shrink-0">
                  <FaLinkedin className="w-4 h-4" />
                </div>
                <div className="truncate">
                  <p className="text-[11px] text-rose-500 uppercase tracking-wider font-bold">
                    LinkedIn
                  </p>
                  <p className="truncate">
                    {profile.linkedinUrl ? profile.linkedinUrl.replace(/^https?:\/\/(www\.)?/, "") : "linkedin.com/in/shahd-kamal-30a99436b"}
                  </p>
                </div>
              </a>

              <a
                href={profile.whatsappUrl || "https://wa.me/201156785653"}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Shahd WhatsApp"
                className="flex items-center gap-3 p-3 rounded-xl border text-xs sm:text-sm font-semibold transition-all hover:scale-102 shadow-sm"
                style={{
                  background: darkMode ? "rgba(31, 41, 55, 0.7)" : "#ffffff",
                  borderColor: darkMode ? "#374151" : "#ffe4e6",
                  color: darkMode ? "#f3f4f6" : "#1f2937",
                }}
              >
                <div className="w-8 h-8 rounded-lg flex items-center justify-center bg-rose-500/10 text-rose-500 shrink-0">
                  <Phone size={16} />
                </div>
                <div>
                  <p className="text-[11px] text-rose-500 uppercase tracking-wider font-bold">
                    WhatsApp
                  </p>
                  <p>+20 11 56785653</p>
                </div>
              </a>
            </div>
          </div>

          {/* Right Side: Contact Form (7 cols) */}
          <form
            onSubmit={onSubmit}
            style={{
              background: darkMode
                ? "linear-gradient(to right, #1f2937, #111827)"
                : "linear-gradient(to right, #ffffff, #fff1f2)",
              borderColor: darkMode ? "#374151" : "#ffe4e6",
            }}
            className="rounded-3xl p-6 sm:p-8 border shadow-xl order-1 lg:order-2 lg:col-span-7"
            data-aos="fade-left"
          >
            <input
              type="hidden"
              name="subject"
              value="New Message from Shahd Kamal Portfolio"
            />
            <input type="hidden" name="from_name" value="Shahd Portfolio" />
            <input
              type="checkbox"
              name="botcheck"
              className="hidden"
              style={{ display: "none" }}
            />

            <h3
              className="text-xl font-bold mb-6 flex items-center gap-2"
              style={{ color: darkMode ? "white" : "#1f2937" }}
            >
              <Mail className="text-rose-500" size={20} /> Send Me a Message
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
              {/* First Name */}
              <input
                type="text"
                name="first_name"
                placeholder="First Name"
                style={{
                  backgroundColor: darkMode ? "#374151" : "#ffffff",
                  borderColor: darkMode ? "#4b5563" : "#fecdd3",
                  color: darkMode ? "white" : "#1f2937",
                }}
                className="w-full px-4 py-3 rounded-xl text-sm border focus:outline-none focus:border-rose-500 focus:ring-2 focus:ring-rose-500/20 transition-all"
                required
              />
              {/* Last Name */}
              <input
                type="text"
                name="last_name"
                placeholder="Last Name"
                style={{
                  backgroundColor: darkMode ? "#374151" : "#ffffff",
                  borderColor: darkMode ? "#4b5563" : "#fecdd3",
                  color: darkMode ? "white" : "#1f2937",
                }}
                className="w-full px-4 py-3 rounded-xl text-sm border focus:outline-none focus:border-rose-500 focus:ring-2 focus:ring-rose-500/20 transition-all"
                required
              />
            </div>

            {/* Email Address */}
            <input
              type="email"
              name="email"
              placeholder="Email Address"
              style={{
                backgroundColor: darkMode ? "#374151" : "#ffffff",
                borderColor: darkMode ? "#4b5563" : "#fecdd3",
                color: darkMode ? "white" : "#1f2937",
              }}
              className="w-full px-4 py-3 rounded-xl text-sm border focus:outline-none focus:border-rose-500 focus:ring-2 focus:ring-rose-500/20 transition-all mb-4"
              required
            />

            {/* Phone Number */}
            <input
              type="tel"
              name="phone"
              placeholder="Phone Number (Optional)"
              style={{
                backgroundColor: darkMode ? "#374151" : "#ffffff",
                borderColor: darkMode ? "#4b5563" : "#fecdd3",
                color: darkMode ? "white" : "#1f2937",
              }}
              className="w-full px-4 py-3 rounded-xl text-sm border focus:outline-none focus:border-rose-500 focus:ring-2 focus:ring-rose-500/20 transition-all mb-4"
            />

            {/* Message */}
            <textarea
              name="message"
              rows="4"
              placeholder="How can I help you? (e.g. Project inquiry, consulting, full-time role)"
              style={{
                backgroundColor: darkMode ? "#374151" : "#ffffff",
                borderColor: darkMode ? "#4b5563" : "#fecdd3",
                color: darkMode ? "white" : "#1f2937",
              }}
              className="w-full px-4 py-3 rounded-xl text-sm border focus:outline-none focus:border-rose-500 focus:ring-2 focus:ring-rose-500/20 transition-all mb-6 resize-none"
              required
            />

            <button
              type="submit"
              disabled={isSubmitting}
              style={{
                background: "linear-gradient(to right, #f43f5e, #fb7185)",
                boxShadow: "0 4px 15px rgba(244, 63, 94, 0.3)",
              }}
              className="w-full py-3.5 text-white font-bold rounded-xl text-sm sm:text-base inline-flex items-center justify-center gap-2 hover:scale-[1.02] transition-all disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer shadow-lg"
            >
              <Send size={16} />
              {isSubmitting ? "Sending Message..." : "Send Message"}
            </button>

            {result && (
              <p
                className={`mt-4 text-center text-sm font-semibold ${
                  result.includes("Successfully")
                    ? "text-emerald-500"
                    : "text-rose-500"
                }`}
              >
                {result}
              </p>
            )}
          </form>
        </div>
      </div>
    </section>
  );
};

export default Contact;

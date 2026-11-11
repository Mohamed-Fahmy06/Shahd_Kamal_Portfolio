import { FaExternalLinkAlt, FaGithub } from "react-icons/fa";
import noxeImg from "../assets/Noxe.png";
import shadow_stalkers from "../assets/shadow-stalkers.png";
import physicalTherapy from "../assets/physical-therapy.png";
import saasDashboard from "../assets/saas-dashboard.png";

const Projects = ({ darkMode }) => {
  const projectsList = [
    {
      id: 1,
      title: "Noxe",
      des: "A modern, cinematic movie streaming interface built with React, Vite, and Tailwind CSS.",
      image: noxeImg,
      alt: "Noxe",
      tags: ["React", "Vite", "Tailwind CSS", "React Router"],
      codeLink: "https://github.com/Mohamed-Fahmy06/Noxe.git",
      demoLink: "https://noxe-dun.vercel.app/",
    },
    {
      id: 2,
      title: "Code Zone",
      des: "A professional landing page and about section designed with a focus on modern UI/UX principles.",
      image:
        "https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=2426&auto=format&fit=crop",
      alt: "Code Zone",
      tags: ["React", "Tailwind CSS", "JavaScript"],
      codeLink: "https://github.com/Mohamed-Fahmy06/Code-zone-about-page-.git",
      demoLink: "https://code-zone-about-page-bqyc.vercel.app/",
    },
    {
      id: 3,
      title: "Shadow Stalkers",
      des: "Comprehensive management system for the Arab Academy featuring role-based access and automated reporting.",
      image: shadow_stalkers,
      alt: "Shadow Stalkers",
      tags: ["React", "Express", "Node.js", "SQL.js", "JWT"],
      codeLink: "https://github.com/Mohamed-Fahmy06/Shadow-stalkers.git",
      demoLink: "https://shadow-stalkers.vercel.app/",
    },
    {
      id: 4,
      title: "Because Life is Precious",
      des: "A professional landing page for a physical therapy clinic, focusing on patient recovery, personalized care, and mobile-friendly design.",
      image: physicalTherapy,
      alt: "Physical Therapy Clinic",
      tags: ["HTML", "CSS", "JavaScript"],
      codeLink: "https://github.com/Mohamed-Fahmy06/Decodelabs-Project1.git",
      demoLink: "https://decodelabs-project1.vercel.app/",
    },
    {
      id: 5,
      title: "Nexus SaaS",
      des: "A modern SaaS dashboard prototype featuring a clean UI, analytics overview, and seamless user authentication flow.",
      image: saasDashboard,
      alt: "Nexus SaaS Dashboard",
      tags: ["HTML", "CSS", "UI/UX", "SaaS"],
      codeLink: "https://github.com/Mohamed-Fahmy06/Decodelabs-Project2.git",
      demoLink: "https://decodelabs-project2.vercel.app/",
    },
    {
      id: 6,
      title: "V-ROOMS",
      des: "An immersive platform for booking virtual collaborative spaces, featuring interactive environments and a sleek booking system.",
      image: "https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=2301&auto=format&fit=crop",
      alt: "V-ROOMS",
      tags: ["HTML", "CSS", "JavaScript", "Responsive"],
      codeLink: "https://github.com/Mohamed-Fahmy06/Decodelabs_Project3.git",
      demoLink: "https://decodelabs-project3.vercel.app/",
    },
    {
      id: 7,
      title: "Code Zone - Batch 2026",
      des: "A comprehensive multi-step application portal for developer training, featuring advanced form validation and track selection.",
      image: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?q=80&w=2340&auto=format&fit=crop",
      alt: "Code Zone - Batch 2026",
      tags: ["HTML", "CSS", "JavaScript", "Form Logic"],
      codeLink: "https://github.com/Mohamed-Fahmy06/Decodelabs_Project4.git",
      demoLink: "https://decodelabs-project4.vercel.app/",
    },
  ];

  return (
    <section
      id="Projects"
      style={{ backgroundColor: darkMode ? "#111827" : "#f9fafb" }}
      className="relative py-24 cursor-default caret-transparent transition-colors duration-500"
    >
      <div className="container mx-auto px-4">
        <div className="text-center mb-16" data-aos="fade-up">
          <h2
            style={{ color: darkMode ? "white" : "#1f2937" }}
            className="sm:text-4xl font-bold mb-4 text-3xl"
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
              Projects
            </span>
          </h2>
          <p
            className="max-w-2xl mx-auto text-lg"
            style={{ color: darkMode ? "#d1d5db" : "#6b7280" }}
          >
            A showcase of my recent work and technical contributions
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {projectsList.map((project, index) => (
            <div
              key={project.id}
              style={{
                background: darkMode
                  ? "linear-gradient(to bottom right, #1f2937, #111827)"
                  : "linear-gradient(to bottom right, #ffffff, #f9fafb)",
                borderColor: darkMode ? "#374151" : "#e5e7eb",
              }}
              className="group rounded-2xl border hover:border-orange-500/50 transition-all duration-500 overflow-hidden flex flex-col h-full"
              data-aos="fade-up"
              data-aos-delay={index * 100}
            >
              {/* Image Container */}
              <div className="h-48 overflow-hidden relative group/img">
                <div className="absolute inset-0 bg-linear-to-t from-black/80 via-black/20 to-transparent z-10 opacity-60 group-hover:opacity-40 transition-opacity duration-500" />
                <img
                  src={project.image}
                  alt={project.alt}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
              </div>

              {/* Content */}
              <div className="p-6 flex flex-col grow">
                <h3
                  className="text-xl font-bold mb-3"
                  style={{ color: darkMode ? "white" : "#1f2937" }}
                >
                  {project.title}
                </h3>
                <p
                  className="text-sm mb-6 line-clamp-3"
                  style={{ color: darkMode ? "#d1d5db" : "#6b7280" }}
                >
                  {project.des}
                </p>

                {/* Tags */}
                <div className="flex flex-wrap gap-2 mb-6 mt-auto">
                  {project.tags.map((tag, idx) => (
                    <span
                      key={idx}
                      className="px-3 py-1 text-xs rounded-full border transition-colors"
                      style={{
                        backgroundColor: darkMode ? "rgba(249, 115, 22, 0.1)" : "#fff7ed",
                        color: "#f97316",
                        borderColor: darkMode ? "rgba(249, 115, 22, 0.2)" : "#ffedd5",
                      }}
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                {/* Links */}
                <div className="flex gap-4">
                  <a
                    href={project.codeLink}
                    style={{
                      backgroundColor: darkMode ? "#374151" : "#f3f4f6",
                      color: darkMode ? "white" : "#374151",
                    }}
                    className="flex flex-1 items-center justify-center gap-2 px-4 py-2.5 text-sm font-medium rounded-xl hover:scale-105 transition-transform"
                  >
                    <FaGithub className="text-xl" /> Code
                  </a>
                  <a
                    href={project.demoLink}
                    style={{
                      background: "linear-gradient(to right, #f97316, #f59e0b)",
                    }}
                    className="flex flex-1 items-center justify-center gap-2 px-4 py-2.5 text-white text-sm font-medium rounded-xl hover:scale-105 transition-transform shadow-lg shadow-orange-500/20"
                  >
                    <FaExternalLinkAlt className="text-sm" /> Demo
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center">
          <a
            href="https://github.com/Mohamed-Fahmy06"
            target="_blank"
            rel="noopener noreferrer"
            style={{
              background: "linear-gradient(to right, #f97316, #f59e0b)",
            }}
            className="inline-flex items-center gap-3 px-8 py-4 font-bold text-white text-base rounded-full 
                    hover:shadow-orange-500/40 transition-all hover:shadow-2xl hover:-translate-y-1"
          >
            <FaGithub className="text-2xl" /> View all projects
          </a>
        </div>
      </div>
    </section>
  );
};

export default Projects;

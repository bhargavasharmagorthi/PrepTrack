// src/pages/Home.js
import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { motion, useInView, useMotionValue, animate } from "framer-motion";
import {
  HiAcademicCap,
  HiChartBar,
  HiSparkles,
  HiUsers,
  HiClock,
  HiLightBulb,
  HiDocumentText,
} from "react-icons/hi";
import { FaGraduationCap, FaChalkboardTeacher } from "react-icons/fa";
import Navbar from "../components/Navbar";

/**
 * PrepTrack Home Page
 * - Exported as default: Home
 * - Uses TailwindCSS utility classes + Framer Motion for animations
 * - Modular sections are separated with clear comments
 *
 * Place this file at: src/pages/Home.js
 */

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i = 1) => ({
    opacity: 1,
    y: 0,
    transition: { delay: 0.12 * i, duration: 0.6, ease: "easeOut" },
  }),
};

const HeroIllustration = () => {
  // An inline SVG hero illustration (science + learning themed).
  return (
    <svg
      viewBox="0 0 800 520"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="w-full h-auto max-w-xl"
    >
      <defs>
        <linearGradient id="g1" x1="0" x2="1">
          <stop offset="0" stopColor="#60A5FA" stopOpacity="0.9" />
          <stop offset="1" stopColor="#3B82F6" stopOpacity="0.9" />
        </linearGradient>
      </defs>

      <rect x="0" y="0" width="800" height="520" rx="24" fill="url(#g1)" opacity="0.08" />
      {/* stylized student with book */}
      <g transform="translate(100,70)">
        <circle cx="280" cy="100" r="44" fill="#fff" opacity="0.95" />
        <rect x="220" y="160" rx="24" width="240" height="140" fill="#fff" opacity="0.95" />
        <path d="M40 160 C 120 40, 360 40, 440 160" stroke="#fff" strokeWidth="6" strokeOpacity="0.7" fill="none" />
        <g transform="translate(20,250)">
          <circle cx="60" cy="60" r="44" fill="#fff" opacity="0.9" />
          <rect x="120" y="20" width="220" height="120" rx="12" fill="#fff" opacity="0.95" />
        </g>
      </g>

      {/* icons and atoms to suggest science */}
      <g transform="translate(520,20)" opacity="0.95">
        <circle cx="60" cy="60" r="30" fill="#fff" opacity="0.12" />
        <circle cx="28" cy="140" r="8" fill="#fff" opacity="0.9" />
        <path d="M10 10 L 130 10 L 70 100 Z" fill="#fff" opacity="0.06" />
      </g>
    </svg>
  );
};

// Small animated counter using framer-motion's animate under the hood
function AnimatedNumber({ value = 0, duration = 1.2, className = "" }) {
  const ref = useRef(null);
  const motionVal = useMotionValue(0);
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    const controls = animate(motionVal, value, {
      duration,
      onUpdate: (v) => setDisplay(Math.round(v)),
    });
    return () => controls.stop();
  }, [value, duration, motionVal]);

  return (
    <span ref={ref} className={className}>
      {display}
    </span>
  );
}

export default function Home() {
  // for in-view animations
  const aboutRef = useRef(null);
  const isAboutInView = useInView(aboutRef, { once: true, margin: "-120px" });

  // stats (placeholder numbers - tweak to real stats later)
  const stats = [
    { label: "Students Impacted", value: 10000, icon: <HiUsers className="w-6 h-6" /> },
    { label: "Mocks Conducted", value: 420, icon: <HiChartBar className="w-6 h-6" /> },
    { label: "Avg. Rank Improvement", value: 37, icon: <HiSparkles className="w-6 h-6" /> },
  ];

  const roadmap = [
    {
      title: "Syllabus Planning",
      desc: "Create a tailored syllabus plan mapped to JEE Mains & Advanced.",
      icon: <HiDocumentText className="w-6 h-6" />,
    },
    {
      title: "Topic-wise Practice",
      desc: "Practice focused tests with instant feedback for each topic.",
      icon: <HiAcademicCap className="w-6 h-6" />,
    },
    {
      title: "Nationwide Mocks",
      desc: "Compete in timed national mock exams to benchmark yourself.",
      icon: <HiClock className="w-6 h-6" />,
    },
    {
      title: "Analyze & Improve",
      desc: "Smart analytics highlight strengths, weaknesses, and strategy.",
      icon: <HiLightBulb className="w-6 h-6" />,
    },
    {
      title: "Dream IIT",
      desc: "Work toward ranks and counseling with placement-ready skills.",
      icon: <FaGraduationCap className="w-6 h-6" />,
    },
  ];

  const features = [
    {
      title: "Smart Test Analytics",
      text: "Deep insights into performance — time per question, weak topics, and predicted rank.",
      icon: <HiChartBar className="w-7 h-7" />,
    },
    {
      title: "Real-time Rank Tracking",
      text: "See where you stand nationally and within your peer groups.",
      icon: <HiUsers className="w-7 h-7" />,
    },
    {
      title: "Personalized Progress",
      text: "Adaptive syllabus progress that adjusts to your pace.",
      icon: <HiDocumentText className="w-7 h-7" />,
    },
    {
      title: "IITians Forum",
      text: "Get doubts cleared and mentorship from IITians and top mentors.",
      icon: <FaChalkboardTeacher className="w-7 h-7" />,
    },
  ];

  const testimonials = [
    {
      name: "Aman K.",
      role: "JEE Advanced 2024 - 1.5k",
      quote:
        "PrepTrack's analytics changed how I practiced — targeted corrections raised my score by 40% in 3 months.",
    },
    {
      name: "Priya S.",
      role: "IIT-B Alumni",
      quote: "The roadmap and mentorship helped me focus on the right topics at the right time.",
    },
  ];

  return (
    <div className="font-sans text-slate-800 antialiased">
      <Navbar /> {/* Fixed navbar */}
      {/* Add top padding so content is not hidden behind navbar */}
      <div className="pt-16">
      {/* Decorative gradient background for subtle animation */}
      <div className="absolute inset-0 -z-10 pointer-events-none">
        <div className="bg-gradient-to-tr from-white via-slate-50 to-white h-96"></div>
      </div>

      {/* ========== HERO ========== */}
      <header className="max-w-7xl mx-auto px-6 sm:px-10 pt-10">

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center py-12">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={fadeUp}
            className="space-y-6"
            custom={1}
          >
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold leading-tight text-slate-900">
              Your Journey to IIT Starts Here
            </h1>
            <p className="text-lg text-slate-700 max-w-xl">
              Track your prep, take tests, and achieve your dream rank with PrepTrack. Personalized
              plans, nationwide mock exams, and mentorship to push your limits.
            </p>

            <div className="flex flex-wrap gap-4">
              <Link
                to="/learn"
                className="inline-flex items-center gap-2 px-5 py-3 rounded-md bg-blue-600 text-white font-medium hover:scale-[1.01] transform transition"
              >
                Start Learning
              </Link>
              <Link
                to="/tests"
                className="inline-flex items-center gap-2 px-5 py-3 rounded-md border border-slate-200 text-slate-800 hover:shadow"
              >
                Take a Test
              </Link>
            </div>

            {/* Hero stats */}
            <div className="flex gap-4 flex-wrap mt-2">
              {stats.map((s, i) => (
                <motion.div
                  key={s.label}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.15 * i + 0.6 }}
                  className="flex items-center gap-3 bg-white/60 backdrop-blur-md px-4 py-3 rounded-lg shadow-sm"
                >
                  <div className="p-2 rounded-md bg-white/30">{s.icon}</div>
                  <div>
                    <div className="text-xl font-semibold text-slate-900">
                      <AnimatedNumber value={s.value} className="inline-block" />
                      {s.label.includes("Rate") ? "%" : "+"}
                    </div>
                    <div className="text-sm text-slate-600">{s.label}</div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3, duration: 0.8 }}
            className="flex justify-center lg:justify-end"
          >
            {/* Animated hero card */}
            <div className="bg-white rounded-2xl p-6 shadow-2xl transform hover:translate-y-[-6px] transition">
              <HeroIllustration />
            </div>
          </motion.div>
        </div>
      </header>

      {/* ========== ABOUT IIT & PROMINENCE ========== */}
      <section
        id="about"
        className="mt-6 max-w-7xl mx-auto px-6 sm:px-10 py-10 lg:py-16"
        ref={aboutRef}
      >
        <motion.div
          className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start"
          initial="hidden"
          animate={isAboutInView ? "visible" : "hidden"}
        >
          <motion.div variants={fadeUp} custom={1} className="lg:col-span-2">
            <h2 className="text-2xl font-bold mb-3">About IIT & Its Prominence</h2>
            <p className="text-slate-700 leading-relaxed">
              The Indian Institutes of Technology (IITs) are among the most prestigious engineering
              institutions in the world. Known for rigorous academics, research excellence, and a
              global alumni network, an IIT degree unlocks top-tier opportunities in industry,
              research, and entrepreneurship.
            </p>

            <div className="mt-6 grid grid-cols-1 sm:grid-cols-3 gap-4">
              <motion.div variants={fadeUp} custom={2} className="p-4 bg-white rounded-lg shadow">
                <div className="text-3xl font-bold">
                  <AnimatedNumber value={1} className="inline-block" />
                  <span className="text-base font-normal ml-2">%</span>
                </div>
                <div className="text-sm text-slate-600 mt-1">Acceptance Rate (typical)</div>
              </motion.div>

              <motion.div variants={fadeUp} custom={3} className="p-4 bg-white rounded-lg shadow">
                <div className="text-3xl font-bold">1000+</div>
                <div className="text-sm text-slate-600 mt-1">Top recruiters annually</div>
              </motion.div>

              <motion.div variants={fadeUp} custom={4} className="p-4 bg-white rounded-lg shadow">
                <div className="text-3xl font-bold">Alumni</div>
                <div className="text-sm text-slate-600 mt-1">Founders, CEOs & Researchers</div>
              </motion.div>
            </div>
          </motion.div>

          <motion.div variants={fadeUp} custom={5} className="bg-gradient-to-br from-blue-50 to-white p-6 rounded-xl shadow">
            <h3 className="font-semibold mb-2">Why PrepTrack?</h3>
            <p className="text-slate-700 text-sm leading-relaxed">
              PrepTrack combines test-series, analytics, mentorship, and a roadmap aligned to the
              JEE syllabus to help students reach their goals with clarity and measurable progress.
            </p>

            <div className="mt-4 space-y-2">
              <div className="flex items-center gap-3">
                <HiSparkles className="w-5 h-5 text-blue-600" />
                <span className="text-sm">Data-driven study plans</span>
              </div>
              <div className="flex items-center gap-3">
                <HiUsers className="w-5 h-5 text-blue-600" />
                <span className="text-sm">Mentorship by IITians</span>
              </div>
              <div className="flex items-center gap-3">
                <HiClock className="w-5 h-5 text-blue-600" />
                <span className="text-sm">Regular timed mock exams</span>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </section>

      {/* ========== ROADMAP ========== */}
      <section id="roadmap" className="bg-slate-50 py-12">
        <div className="max-w-6xl mx-auto px-6 sm:px-10">
          <h2 className="text-2xl font-bold mb-6">PrepTrack Roadmap to IIT Success</h2>

          <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
            {roadmap.map((step, i) => (
              <motion.div
                key={step.title}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.12 + 0.2 }}
                className="bg-white p-4 rounded-xl shadow-sm flex flex-col items-start gap-3"
              >
                <div className="p-2 rounded-md bg-blue-50 text-blue-600">{step.icon}</div>
                <h4 className="font-semibold">{step.title}</h4>
                <p className="text-sm text-slate-600">{step.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ========== PROBABLE OUTCOMES ========== */}
      <section id="outcomes" className="max-w-7xl mx-auto px-6 sm:px-10 py-12">
        <h2 className="text-2xl font-bold mb-6">Probable Outcomes of Cracking IIT</h2>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="bg-white p-5 rounded-xl shadow"
          >
            <div className="flex items-center gap-3">
              <HiSparkles className="w-7 h-7 text-blue-600" />
              <h5 className="font-semibold">Global Careers</h5>
            </div>
            <p className="text-sm text-slate-600 mt-3">Work at leading companies worldwide in product, research, and engineering roles.</p>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 18 }} whileInView={{ opacity: 1, y: 0 }} className="bg-white p-5 rounded-xl shadow">
            <div className="flex items-center gap-3">
              <HiLightBulb className="w-7 h-7 text-blue-600" />
              <h5 className="font-semibold">Entrepreneurship</h5>
            </div>
            <p className="text-sm text-slate-600 mt-3">Build startups—many IIT alumni lead successful ventures across industries.</p>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 18 }} whileInView={{ opacity: 1, y: 0 }} className="bg-white p-5 rounded-xl shadow">
            <div className="flex items-center gap-3">
              <FaGraduationCap className="w-7 h-7 text-blue-600" />
              <h5 className="font-semibold">Research & Innovation</h5>
            </div>
            <p className="text-sm text-slate-600 mt-3">Pursue advanced degrees and research roles across top global labs and universities.</p>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 18 }} whileInView={{ opacity: 1, y: 0 }} className="bg-white p-5 rounded-xl shadow">
            <div className="flex items-center gap-3">
              <HiChartBar className="w-7 h-7 text-blue-600" />
              <h5 className="font-semibold">High-paying Placements</h5>
            </div>
            <p className="text-sm text-slate-600 mt-3">Access top recruitment pipelines and high-salary roles across tech and finance.</p>
          </motion.div>
        </div>
      </section>

      {/* ========== FEATURES ========== */}
      <section id="features" className="bg-gradient-to-b from-white to-slate-50 py-12">
        <div className="max-w-6xl mx-auto px-6 sm:px-10">
          <h2 className="text-2xl font-bold mb-6">PrepTrack Features</h2>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {features.map((f, i) => (
              <motion.div
                key={f.title}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
                className="bg-white p-5 rounded-xl shadow-sm hover:shadow-md transition"
              >
                <div className="flex items-center gap-3">
                  <div className="p-3 bg-blue-50 rounded-md text-blue-600">{f.icon}</div>
                  <h4 className="font-semibold">{f.title}</h4>
                </div>
                <p className="text-sm text-slate-600 mt-3">{f.text}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ========== TESTIMONIALS & IMPACT ========== */}
      <section className="max-w-7xl mx-auto px-6 sm:px-10 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <h2 className="text-2xl font-bold mb-3">Careers & Impact</h2>
            <p className="text-slate-700 mb-6">
              PrepTrack helps shape future leaders and innovators through mentorship, data-driven
              practice, and real-world readiness. Below are a few real and aspirational outcomes
              our students aim for.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-white p-5 rounded-xl shadow">
                <h4 className="font-semibold">Product Engineering</h4>
                <p className="text-sm text-slate-600 mt-2">Build scalable products at top tech firms.</p>
              </div>
              <div className="bg-white p-5 rounded-xl shadow">
                <h4 className="font-semibold">Quant & Research</h4>
                <p className="text-sm text-slate-600 mt-2">Roles in finance and research labs solving complex problems.</p>
              </div>
              <div className="bg-white p-5 rounded-xl shadow">
                <h4 className="font-semibold">Core Engineering</h4>
                <p className="text-sm text-slate-600 mt-2">Opportunities in R&D, hardware, and systems engineering.</p>
              </div>
              <div className="bg-white p-5 rounded-xl shadow">
                <h4 className="font-semibold">Entrepreneurship</h4>
                <p className="text-sm text-slate-600 mt-2">Launch startups and lead innovation ecosystems.</p>
              </div>
            </div>
          </div>

          <div>
            <div className="bg-white p-5 rounded-xl shadow">
              <h3 className="font-semibold mb-2">Student Success</h3>
              <p className="text-sm text-slate-600">10K+ Students Impacted</p>

              <div className="mt-4 space-y-4">
                {testimonials.map((t, i) => (
                  <motion.blockquote
                    key={t.name}
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    className="border-l-2 border-blue-100 pl-3"
                  >
                    <p className="text-sm text-slate-700">“{t.quote}”</p>
                    <div className="mt-2 text-xs text-slate-500">
                      — {t.name}, <span className="italic">{t.role}</span>
                    </div>
                  </motion.blockquote>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ========== CTA BANNER ========== */}
      <section className="bg-blue-600 text-white py-10">
        <div className="max-w-6xl mx-auto px-6 sm:px-10 flex flex-col md:flex-row items-center justify-between gap-4">
          <div>
            <h3 className="text-xl font-semibold">Ready to start your IIT journey?</h3>
            <p className="text-sm opacity-90">Join PrepTrack today — fast-track your preparation with data-led practice.</p>
          </div>
          <div className="flex gap-3">
            <Link to="/signup" className="px-5 py-3 bg-white text-blue-700 rounded-md font-medium">
              Get Started
            </Link>
            <Link to="/tests" className="px-5 py-3 border border-white rounded-md">
              Take a free mock
            </Link>
          </div>
        </div>
      </section>

      {/* ========== FOOTER ========== */}
      <footer className="bg-white border-t mt-10">
        <div className="max-w-7xl mx-auto px-6 sm:px-10 py-12 grid md:grid-cols-3 gap-8">
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center shadow-lg">
                <HiAcademicCap className="text-white w-5 h-5" />
              </div>
              <div>
                <div className="font-semibold">PrepTrack</div>
                <div className="text-sm text-slate-600">IITJEE preparation simplified</div>
              </div>
            </div>

            <p className="text-sm text-slate-600">
              Contact: <a href="mailto:hello@preptrack.example" className="text-blue-600">hello@preptrack.example</a>
            </p>
            <div className="flex gap-3 mt-4">
              <a href="#" aria-label="twitter" className="text-slate-500 hover:text-slate-900">Twitter</a>
              <a href="#" aria-label="linkedin" className="text-slate-500 hover:text-slate-900">LinkedIn</a>
              <a href="#" aria-label="instagram" className="text-slate-500 hover:text-slate-900">Instagram</a>
            </div>
          </div>

          <div className="flex justify-between md:col-span-2">
            <div>
              <h4 className="font-semibold mb-2">Product</h4>
              <ul className="text-sm text-slate-600 space-y-1">
                <li><a href="#features">Features</a></li>
                <li><a href="/tests">Test Series</a></li>
                <li><a href="/roadmap">Roadmap</a></li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold mb-2">Company</h4>
              <ul className="text-sm text-slate-600 space-y-1">
              <Link to="/about" className="text-blue-600 hover:underline">About</Link>
              <Link to="/contact" className="text-blue-600 hover:underline">Contact</Link>
              <Link to="/learn-more" className="text-blue-600 hover:underline">Learn More</Link>

              </ul>
            </div>

            <div>
              <h4 className="font-semibold mb-2">Support</h4>
              <ul className="text-sm text-slate-600 space-y-1">
                <li><a href="/help">Help Center</a></li>
                <li><a href="/privacy">Privacy</a></li>
                <li><a href="/terms">Terms</a></li>
              </ul>
            </div>
          </div>
        </div>

        <div className="border-t py-4">
          <div className="max-w-7xl mx-auto px-6 sm:px-10 text-sm text-slate-500 flex items-center justify-between">
            <div>© 2025 PrepTrack. All rights reserved.</div>
            <div>Made with ♥ for IIT aspirants</div>
          </div>
        </div>
      </footer>
    </div>
  </div>
  );
}
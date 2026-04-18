import React, { useState } from "react";

const domains = [
  {
    id: "appDev",
    label: "App Development",
    badgeText: "Flutter & Dart",
    color: { bg: "#E1F5EE", text: "#0F6E56", dot: "#1D9E75" },
    weeks: [
      {
        week: 1,
        title: "Dart Programming",
        project: "Foundations of logic and data structure",
        topics: [
          "Variables, Data Types & Booleans",
          "Control Flow (if, for, while)",
          "Functions & Reusable Code",
          "OOP: Classes, Objects & Inheritance",
        ],
        task: "Build a foundation in Dart logic and data structuring to prepare for Flutter development.",
        links: [],
      },
      {
        week: 2,
        title: "Flutter Basics",
        project: "Static & dynamic User Interfaces",
        topics: [
          "Widgets (The Building Blocks)",
          "Layouts (Row, Column, Stack)",
          "Stateless vs. Stateful Widgets",
        ],
        task: "Build static and dynamic user interfaces using Flutter's widget system.",
        links: [],
      },
      {
        week: 3,
        title: "Navigation & State",
        project: "Multi-page interactive experience",
        topics: [
          "Multi-screen Navigation (Navigator)",
          "State Management (setState, Provider)",
          "Data persistence across screens",
        ],
        task: "Create a multi-page interactive app with proper state and navigation.",
        links: [],
      },
      {
        week: 4,
        title: "API & Integration",
        project: "Final: Live Weather App",
        topics: [
          "http package for live data",
          "JSON Parsing: Mapping data to Dart",
          "Asynchronous Programming",
        ],
        task: "Final Project: Build a live, functional Weather App using a real API with async Dart.",
        links: [],
      },
    ],
  },
  {
    id: "aiml",
    label: "AI / ML",
    badgeText: "Python & ML Algorithms",
    color: { bg: "#EEEDFE", text: "#3C3489", dot: "#7F77DD" },
    weeks: [
      {
        week: 1,
        title: "Python Basics",
        project: "Simple Calculator Program",
        topics: [
          "Introduction to Python & Syntax",
          "Datatypes in Python",
          "Conditional Statements & Operators",
          "Looping Statements",
        ],
        task: "Build a simple calculator program demonstrating Python fundamentals.",
        links: [],
      },
      {
        week: 2,
        title: "Libraries",
        project: "Plots based on given dataset",
        topics: [
          "Pandas — Loading and Reading Data",
          "Matplotlib — Basic Visualisation & NumPy",
          "Seaborn — Advanced Visualisation",
        ],
        task: "Generate meaningful visualisations from a given dataset using Pandas, Matplotlib, and Seaborn.",
        links: [],
      },
      {
        week: 3,
        title: "Data Processing",
        project: "Operations on dataset",
        topics: [
          "Data Cleaning — Handling missing values",
          "Data Selection — Filtering and Sorting data",
        ],
        task: "Perform data cleaning and transformation operations on a real-world dataset.",
        links: [],
      },
      {
        week: 4,
        title: "ML Algorithms",
        project: "Prediction models",
        topics: [
          "Scikit-Learn Introduction",
          "Linear Regression",
          "Decision Trees",
        ],
        task: "Build prediction models using Linear Regression and Decision Trees with Scikit-Learn.",
        links: [],
      },
    ],
  },
  {
    id: "dsa",
    label: "DSA",
    badgeText: "C++ Problem Solving",
    color: { bg: "#FAECE7", text: "#712B13", dot: "#D85A30" },
    weeks: [
      {
        week: 1,
        title: "Language Basics & Fundamentals",
        project: "Strong coding foundation",
        topics: [
          "Environment Setup (VS Code, compiler, extensions)",
          "Variables, Data Types, I/O, Operators",
          "Control Flow (if-else, switch)",
          "Loops (for, while, patterns)",
          "Functions & Intro to Recursion",
          "Revision + Coding Platform Setup",
        ],
        task: "Establish a strong coding foundation and get set up on a competitive programming platform.",
        links: [],
      },
      {
        week: 2,
        title: "Complexity & Arrays Foundation",
        project: "Thinking like a problem solver",
        topics: [
          "Time & Space Complexity and Trade-offs",
          "Complexity Analysis (loops, cases)",
          "Arrays (declaration, traversal)",
          "Searching (Linear, Binary)",
          "Basic Array Problems",
        ],
        task: "Analyse time/space complexity and solve foundational array and searching problems.",
        links: [],
      },
      {
        week: 3,
        title: "Sorting & Problem Solving Techniques",
        project: "Core interview patterns",
        topics: [
          "Sorting Basics (stability, in-place)",
          "Bubble, Selection & Insertion Sort",
          "Two Pointer Technique",
          "Sliding Window",
          "Prefix Sum",
          "Mixed Practice",
        ],
        task: "Master the core problem-solving patterns most commonly tested in technical interviews.",
        links: [],
      },
      {
        week: 4,
        title: "Arrays (Medium) & Linked Lists",
        project: "Final Assessment",
        topics: [
          "Arrays (Max/Min, Reverse, Kadane's, Majority Element)",
          "Optimization Techniques",
          "Linked List Basics (node, traversal)",
          "Operations (insert, delete)",
          "Important Problems (reverse LL, middle, cycle detection)",
          "Final Assessment",
        ],
        task: "Tackle intermediate array problems and build Linked List fundamentals. Final assessment at end of week.",
        links: [],
      },
    ],
  },
  {
    id: "webDev",
    label: "Web Development",
    badgeText: "HTML → Full Stack",
    color: { bg: "#E6F1FB", text: "#0C447C", dot: "#378ADD" },
    weeks: [
      {
        week: 1,
        title: "Setup & Fundamentals",
        project: "Dev environment & tools",
        topics: [
          "Web Basics (How the web works)",
          "Git & GitHub (Version Control)",
          "CLI basics",
          "VS Code setup",
        ],
        task: "Understand how the web works and configure your complete development environment.",
        links: [],
      },
      {
        week: 2,
        title: "HTML & CSS",
        project: "Landing page",
        topics: [
          "HTML Structure",
          "CSS Styling",
          "Flexbox",
          "Responsive Design",
        ],
        task: "Build a fully responsive landing page from scratch using HTML and CSS.",
        links: [],
      },
      {
        week: 3,
        title: "JavaScript & DOM",
        project: "Interactive mini projects",
        topics: [
          "JS Basics",
          "Functions",
          "Arrays & Objects",
          "DOM Manipulation",
          "Events",
        ],
        task: "Build interactive mini-projects using vanilla JavaScript and DOM manipulation.",
        links: [],
      },
      {
        week: 4,
        title: "Backend with Node.js",
        project: "Simple full-stack app",
        topics: [
          "Node.js Basics",
          "Express",
          "APIs",
          "Frontend-Backend Integration",
        ],
        task: "Connect a frontend to a Node.js/Express backend and build a simple full-stack application.",
        links: [],
      },
    ],
  },
  {
    id: "uiux",
    label: "UI / UX",
    badgeText: "Figma & Design Thinking",
    color: { bg: "#FBEAF0", text: "#72243E", dot: "#D4537E" },
    weeks: [
      {
        week: 1,
        title: "Design Foundations",
        project: "Simple landing page design",
        topics: [
          "UI vs UX",
          "Design Principles (Hierarchy, Contrast, Alignment, Spacing)",
          "Typography Basics",
          "Color Theory",
          "Figma Basics",
        ],
        task: "Design a simple landing page applying foundational design principles in Figma.",
        links: [],
      },
      {
        week: 2,
        title: "UI Design",
        project: "Navbar, Hero & Cards",
        topics: [
          "Grid Systems (12-column)",
          "Components (Buttons, Cards, Navbar)",
          "Design Systems",
          "Visual Hierarchy",
          "Micro Interactions",
        ],
        task: "Design a Navbar, Hero Section, and Cards following a consistent design system.",
        links: [],
      },
      {
        week: 3,
        title: "UX Design",
        project: "Wireframe & user flow for an app",
        topics: [
          "User Research Basics",
          "User Flow Mapping",
          "Wireframing",
          "UX Principles (Usability, Accessibility)",
          "Case Study Thinking",
        ],
        task: "Create a complete wireframe and user flow diagram for a chosen app concept.",
        links: [],
      },
      {
        week: 4,
        title: "Full Project & Presentation",
        project: "Complete UI/UX project",
        topics: [
          "Full Project Design",
          "High-Fidelity UI",
          "Prototyping in Figma",
          "Presentation Skills",
          "Feedback & Iteration",
        ],
        task: "Design and prototype a complete high-fidelity UI/UX project and present it with iteration notes.",
        links: [],
      },
    ],
  },
];

const WeekCard = ({ weekData, color, isOpen, toggleOpen, index }) => {
  const hasLinks = weekData.links && weekData.links.length > 0;

  return (
    <div
      className="relative bg-zinc-900/90 backdrop-blur-md rounded-2xl shadow-2xl mb-6 overflow-hidden transform hover:shadow-3xl transition-all duration-700 animate-card-in"
      style={{ animationDelay: `${index * 150}ms` }}
    >
      {/* Header */}
      <div
        className="flex items-center gap-3 p-5 cursor-pointer group"
        onClick={toggleOpen}
      >
        <h3 className="text-2xl font-extrabold text-white group-hover:text-neon transition-colors duration-300">
          {title}
        </h3>
        <div className="flex items-center space-x-2">
          <span className="text-sm text-zinc-400">Week {week}</span>
          {isOpen ? (
            <FaChevronUp className="text-neon transform group-hover:scale-125 transition-transform duration-200" />
          ) : (
            <FaChevronDown className="text-neon transform group-hover:scale-125 transition-transform duration-200" />
          )}
        </div>
        <span
          className="text-gray-400 text-sm transition-transform duration-300"
          style={{ transform: isOpen ? "rotate(180deg)" : "rotate(0deg)" }}
        >
          ▾
        </span>
      </div>

      {/* Body */}
      <div
        className={`overflow-hidden transition-all duration-500 ease-in-out ${isOpen ? "max-h-[1000px]" : "max-h-0"
          }`}
      >
        <div className="border-l-2 border-neon pl-4">
          <p className="text-lg font-semibold text-white mb-3 tracking-tight">
            Project: {project}
          </p>
          <ul className="space-y-1.5">
            {weekData.topics.map((topic, i) => (
              <li key={i} className="flex items-start gap-2 text-sm text-gray-700">
                <span
                  className="w-1.5 h-1.5 rounded-full mt-1.5 flex-shrink-0"
                  style={{ backgroundColor: color.dot }}
                />
                {topic}
              </li>
            ))}
          </ul>

          {/* Task */}
          <p className="text-xs font-semibold text-gray-400 uppercase tracking-widest mt-4 mb-2">
            Task / Outcome
          </p>
          <div className="mb-5">
            <h4 className="text-base font-semibold text-white mb-2 tracking-wide">
              Topics Covered:
            </h4>
            <ul className="space-y-2">
              {topics.map((topic, index) => (
                <li key={index} className="flex items-start">
                  <span className="w-2 h-2 bg-neon rounded-full mt-2 mr-3 transform hover:scale-150 transition-transform"></span>
                  <span className="text-gray-600">{topic}</span>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className="text-base font-semibold text-white mb-2 tracking-wide">
              Resources:
            </h4>
            <ul className="space-y-3">
              {links.map((link, index) => (
                <li key={index} className="flex items-center group">
                  <span className="w-2 h-2 bg-neon rounded-full mr-3 group-hover:animate-pulse"></span>
                  <div className="flex items-center space-x-2">
                    <a
                      href={link.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-neon hover:text-neon font-medium group-hover:underline decoration-orange-300 decoration-2 underline-offset-4 transition-all duration-300"
                    >
                      {link.name}
                    </a>
                    {link.youtube && (
                      <a
                        href={link.youtube}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-red-600 hover:text-red-800 transition-colors duration-300"
                      >
                        <FaYoutube className="text-lg transform hover:scale-125 transition-transform" />
                      </a>
                    )}
                  </div>
                </li>
              ))}
            </ul>
          ) : (
            <div
              className="flex items-center gap-2.5 border border-dashed rounded-xl px-4 py-3 text-sm text-gray-500 italic"
              style={{ borderColor: color.dot + "88" }}
            >
              <span
                className="w-2 h-2 rounded-full flex-shrink-0"
                style={{ backgroundColor: color.dot, opacity: 0.6 }}
              />
              Resources for this week will be shared after the class is conducted.
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

const Resources = () => {
  const [activeTab, setActiveTab] = useState("appDev");
  const [openWeeks, setOpenWeeks] = useState({});
  const [isTransitioning, setIsTransitioning] = useState(false);

  const activeDomain = domains.find((d) => d.id === activeTab);

  const handleTabChange = (id) => {
    if (id === activeTab) return;
    setIsTransitioning(true);
    setTimeout(() => {
      setActiveTab(id);
      setOpenWeeks({});
      setIsTransitioning(false);
    }, 250);
  };

  const toggleWeek = (week) => {
    setOpenWeeks((prev) => ({
      ...prev,
      [activeTab]: {
        ...prev[activeTab],
        [week]: !prev[activeTab]?.[week],
      },
    }));
  };

  return (
    <div id="resources" className="bg-black py-16 px-4 sm:px-6 relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,_rgba(249,115,22,0.15),_transparent_70%)] opacity-50"></div>
      <div className="container mx-auto max-w-5xl relative z-10">
        <h1 className="text-5xl sm:text-6xl font-extrabold text-center text-white mb-5 tracking-tighter animate-fade-in">
          Resources
        </h1>
        <p className="text-lg sm:text-xl text-center text-zinc-300 mb-12 max-w-3xl mx-auto leading-relaxed animate-fade-in">
          Embark on a transformative learning journey with expertly curated resources for Web Dev, App Dev, and DSA.
        </p>
        <div className="sticky top-0 bg-black pt-4 pb-3 z-20">
          <div className="flex justify-center space-x-2 sm:space-x-4">
            <button
              onClick={() => handleTabChange("webDev")}
              className={`relative flex-shrink-0 px-3 sm:px-6 py-2 sm:py-3 text-sm sm:text-lg font-semibold transition-all duration-300 whitespace-nowrap ${
                activeTab === "webDev"
                  ? "text-neon sm:scale-110"
                  : "text-zinc-100 sm:hover:scale-105 hover:text-neon"
              }`}
            >
              Web Development
              {activeTab === "webDev" && (
                <span className="absolute bottom-0 left-0 w-full h-1.5 bg-neon rounded-full transform scale-x-100 transition-transform duration-300 animate-slide-in"></span>
              )}
            </button>
            <button
              onClick={() => handleTabChange("appDev")}
              className={`relative flex-shrink-0 px-3 sm:px-6 py-2 sm:py-3 text-sm sm:text-lg font-semibold transition-all duration-300 whitespace-nowrap ${
                activeTab === "appDev"
                  ? "text-neon sm:scale-110"
                  : "text-zinc-100 sm:hover:scale-105 hover:text-neon"
              }`}
            >
              App Development
              {activeTab === "appDev" && (
                <span className="absolute bottom-0 left-0 w-full h-1.5 bg-neon rounded-full transform scale-x-100 transition-transform duration-300 animate-slide-in"></span>
              )}
            </button>
            <button
              onClick={() => handleTabChange("dsa")}
              className={`relative flex-shrink-0 px-3 sm:px-6 py-2 sm:py-3 text-sm sm:text-lg font-semibold transition-all duration-300 whitespace-nowrap ${
                activeTab === "dsa"
                  ? "text-neon sm:scale-110"
                  : "text-zinc-100 sm:hover:scale-105 hover:text-neon"
              }`}
            >
              DSA
              {activeTab === "dsa" && (
                <span className="absolute bottom-0 left-0 w-full h-1.5 bg-neon rounded-full transform scale-x-100 transition-transform duration-300 animate-slide-in"></span>
              )}
            </button>
          </div>
        </div>

        {/* Domain badge */}
        <div className="mt-6 mb-4">
          <span
            className="inline-block text-xs font-semibold px-3 py-1 rounded-full"
            style={{
              backgroundColor: activeDomain.color.bg,
              color: activeDomain.color.text,
            }}
          >
            {activeDomain.badgeText}
          </span>
        </div>

        {/* Week cards */}
        <div
          className={`transition-all duration-250 ${isTransitioning
              ? "opacity-0 translate-y-3"
              : "opacity-100 translate-y-0"
            }`}
        >
          {activeDomain.weeks.map((weekData, index) => (
            <WeekCard
              key={`${activeTab}-${weekData.week}`}
              weekData={weekData}
              color={activeDomain.color}
              isOpen={openWeeks[activeTab]?.[weekData.week] || false}
              toggleOpen={() => toggleWeek(weekData.week)}
              index={index}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Resources;
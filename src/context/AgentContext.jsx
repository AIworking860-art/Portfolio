import React, { createContext, useContext, useState, useEffect } from "react";

const INITIAL_PROJECTS = [
  {
    id: "nexora-core",
    name: "nexora-core",
    full_name: "usmanghani/nexora-core",
    description: "Autonomous Multi-Agent Orchestrator & Autonomous Portfolio Pipeline Engine.",
    language: "JavaScript / React",
    stargazers_count: 142,
    forks_count: 38,
    open_issues_count: 0,
    updated_at: "2026-08-07T14:00:00Z",
    topics: ["ai-agent", "orchestrator", "portfolio", "react", "vite", "threejs"],
    aiSummary: "Architects autonomous git push listeners, LLM document generation, dynamic cover graphics rendering, and zero-latency website deployment.",
    autoDocs: `# Nexora Core — Agent Orchestration Framework
## Overview
Nexora Core automatically ingests git commits, analyzes code diffs, evaluates cognitive complexity, and generates full documentation.

## Tech Stack
- Frontend: React 19, Vite, Three.js
- Workflow Engine: Multi-Agent Micro-Task Scheduler
- Deployment: Automated Edge Pipeline`,
    blogPostId: "blog-nexora-core",
    coverGradient: "linear-gradient(135deg, #10b981 0%, #06b6d4 50%, #3b82f6 100%)",
  },
  {
    id: "quantum-agent-mesh",
    name: "quantum-agent-mesh",
    full_name: "usmanghani/quantum-agent-mesh",
    description: "Distributed AI Agent Swarm protocol with vector consensus and real-time execution telemetry.",
    language: "Python / Rust",
    stargazers_count: 289,
    forks_count: 64,
    open_issues_count: 2,
    updated_at: "2026-08-06T11:20:00Z",
    topics: ["ai-swarm", "vector-db", "rust", "python", "distributed-systems"],
    aiSummary: "Enables sub-millisecond multi-agent message routing and dynamic load balancing across autonomous LLM worker nodes.",
    autoDocs: `# Quantum Agent Mesh
## Overview
A high-throughput distributed memory network for cooperative multi-agent task resolution.

## Features
- Dynamic Agent Allocation
- Zero-Copy Memory Buffers
- Fault-tolerant Swarm Consensus`,
    blogPostId: "blog-quantum-mesh",
    coverGradient: "linear-gradient(135deg, #8b5cf6 0%, #d946ef 50%, #00f0ff 100%)",
  },
  {
    id: "hyper-neural-canvas",
    name: "hyper-neural-canvas",
    full_name: "usmanghani/hyper-neural-canvas",
    description: "GPU-accelerated WebGL 3D Shader engine for procedural AI visual generation.",
    language: "TypeScript / WebGL",
    stargazers_count: 195,
    forks_count: 42,
    open_issues_count: 1,
    updated_at: "2026-08-04T18:45:00Z",
    topics: ["webgl", "threejs", "shaders", "ai-graphics", "generative-art"],
    aiSummary: "Renders real-time dynamic aurora networks, 3D hologram cards, and volumetric lighting shaders inside web viewports.",
    autoDocs: `# Hyper Neural Canvas
## Architecture
Custom GLSL fragment shaders combined with WebGL buffer objects to render high-FPS particle grids.`,
    blogPostId: "blog-hyper-canvas",
    coverGradient: "linear-gradient(135deg, #ff007f 0%, #ff4655 50%, #fbbf24 100%)",
  },
];

const INITIAL_BLOGS = [
  {
    id: "blog-nexora-core",
    title: "Building an Autonomous Multi-Agent Portfolio Platform",
    repoName: "nexora-core",
    date: "August 7, 2026",
    readTime: "5 min read",
    tags: ["AI Agents", "Architecture", "Automation", "React"],
    summary: "How we engineered a 10-step multi-agent pipeline that turns every Git Push into automatic documentation, blog posts, and live site deployments.",
    content: `## The Era of Autonomous Portfolios

Traditional developer portfolios are static artifacts. They require constant manual maintenance: updating project links, writing release notes, revising skill lists, and tweaking resumes.

**Nexora Core changes everything.**

### Workflow Overview
When a commit is pushed:
1. **Agent 01 (Watcher)** detects the payload.
2. **Agent 02 (Code Analyzer)** calculates complexity & stack changes.
3. **Agent 03 (DocWriter)** updates project specification files.
4. **Agent 04 (Publisher)** generates technical blog posts and updates your resume automatically.

\`\`\`javascript
const agentPipeline = new MultiAgentOrchestrator({
  autoAnalyze: true,
  autoDeploy: true,
  llmProvider: "Gemini-Flash-3.6"
});
\`\`\`
`,
  },
  {
    id: "blog-quantum-mesh",
    title: "Optimizing Swarm Latency in Agent Mesh Protocols",
    repoName: "quantum-agent-mesh",
    date: "August 6, 2026",
    readTime: "7 min read",
    tags: ["Rust", "Python", "Multi-Agent", "Distributed"],
    summary: "Deep dive into low-latency memory routing for cooperative AI agent swarms.",
    content: `## Swarm Intelligence at Scale

When hundreds of autonomous agents collaborate on complex coding tasks, inter-agent IPC latency becomes the primary bottleneck.

### Core Solutions
- Zero-copy shared memory channels built in Rust.
- Async vector broadcast for real-time state synchronization.
`,
  },
];

const INITIAL_RESUME = {
  name: "Muhammad Hashir",
  role: "AI & Python Developer",
  location: "Pakistan • Remote / Global",
  summary: "Specialized AI & Python Developer focused on Agentic AI, Generative AI, Python Architecture, and n8n Workflow Automation. I build intelligent, autonomous systems that transform complex workflows into seamless digital experiences.",
  skills: [
    { name: "Agentic AI & Multi-Agent Systems", level: 96, category: "AI" },
    { name: "Python Development", level: 95, category: "Backend" },
    { name: "Generative AI & LLMs", level: 93, category: "AI" },
    { name: "n8n Workflow Automation", level: 90, category: "Automation" },
    { name: "RAG & Vector Databases", level: 88, category: "AI" },
    { name: "API Design & Integration", level: 87, category: "Backend" },
  ],
  experience: [
    {
      company: "Freelance / International Clients",
      title: "AI & Python Developer",
      period: "2023 — Present",
      description: "Building autonomous AI agent systems, LLM-powered applications, and n8n workflow automation pipelines for international clients and startups worldwide.",
    },
    {
      company: "Personal Projects & Open Source",
      title: "Agentic AI Researcher",
      period: "2022 — Present",
      description: "Researching and developing multi-agent architectures, RAG pipelines, and generative AI applications. Contributing to open-source AI tooling and automation frameworks.",
    },
  ],
  autoBullets: [
    "🤖 Auto-Generated: Built autonomous multi-agent portfolio platform with 80+ specialized AI agents.",
    "🚀 Auto-Generated: Developed n8n automation pipelines reducing manual workflow overhead by 100%.",
    "⚡ Auto-Generated: Engineered RAG-powered chatbot with vector database retrieval for enterprise client.",
  ],
};


const AgentContext = createContext();

export const WORKFLOW_STEPS = [
  { id: 1, key: "git_push", label: "Git Push Event", icon: "🚀", agent: "Event Watcher Agent" },
  { id: 2, key: "repo_detection", label: "Repo Detection", icon: "🔍", agent: "Structure Scanner Agent" },
  { id: 3, key: "repo_analysis", label: "Repo Analysis", icon: "⚡", agent: "Code Complexity Agent" },
  { id: 4, key: "ai_analysis", label: "AI Cognitive Analysis", icon: "🧠", agent: "LLM Synthesizer Agent" },
  { id: 5, key: "doc_generation", label: "Documentation Gen", icon: "📝", agent: "DocWriter Agent" },
  { id: 6, key: "cover_generation", label: "Cover Graphic Gen", icon: "🎨", agent: "Canvas Render Agent" },
  { id: 7, key: "blog_generation", label: "Blog Article Gen", icon: "📰", agent: "Tech Writer Agent" },
  { id: 8, key: "portfolio_update", label: "Portfolio Grid Sync", icon: "🌐", agent: "UI State Agent" },
  { id: 9, key: "resume_update", label: "Resume Metric Auto-Sync", icon: "📄", agent: "Career Profile Agent" },
  { id: 10, key: "deploy", label: "Live Auto-Deployment", icon: "✅", agent: "Edge Deployer Agent" },
];

export function AgentProvider({ children }) {
  const [projects, setProjects] = useState(() => {
    const saved = localStorage.getItem("portfolio_projects");
    return saved ? JSON.parse(saved) : INITIAL_PROJECTS;
  });

  const [blogs, setBlogs] = useState(() => {
    const saved = localStorage.getItem("portfolio_blogs");
    return saved ? JSON.parse(saved) : INITIAL_BLOGS;
  });

  const [resumeData, setResumeData] = useState(() => {
    const saved = localStorage.getItem("portfolio_resume");
    return saved ? JSON.parse(saved) : INITIAL_RESUME;
  });

  const [pipelineLogs, setPipelineLogs] = useState([
    { id: 1, time: "18:39:15", agent: "System", text: "Master AI Multi-Agent Orchestrator Online. Listening for repo push events..." },
  ]);

  const [activeStepIndex, setActiveStepIndex] = useState(-1);
  const [isExecuting, setIsExecuting] = useState(false);
  const [currentProcessingRepo, setCurrentProcessingRepo] = useState(null);

  useEffect(() => {
    localStorage.setItem("portfolio_projects", JSON.stringify(projects));
  }, [projects]);

  useEffect(() => {
    localStorage.setItem("portfolio_blogs", JSON.stringify(blogs));
  }, [blogs]);

  useEffect(() => {
    localStorage.setItem("portfolio_resume", JSON.stringify(resumeData));
  }, [resumeData]);

  const addLog = (agent, text) => {
    const timestamp = new Date().toLocaleTimeString();
    setPipelineLogs((prev) => [
      { id: Date.now() + Math.random(), time: timestamp, agent, text },
      ...prev.slice(0, 49),
    ]);
  };

  // Run the 10-step multi-agent automated workflow simulation or live trigger
  const runOrchestratorPipeline = async (customRepoName = null) => {
    if (isExecuting) return;

    setIsExecuting(true);
    const repoTitle = customRepoName || `nexus-ai-engine-${Math.floor(Math.random() * 900 + 100)}`;
    setCurrentProcessingRepo(repoTitle);

    addLog("Orchestrator", `Received Push Payload trigger for repository: [${repoTitle}]`);

    for (let i = 0; i < WORKFLOW_STEPS.length; i++) {
      setActiveStepIndex(i);
      const step = WORKFLOW_STEPS[i];

      addLog(step.agent, `Executing Step ${i + 1}/${WORKFLOW_STEPS.length}: [${step.label}]`);

      // Dynamic payload generation at specific agent steps
      if (step.key === "doc_generation") {
        addLog(step.agent, `Generated README & API specs for [${repoTitle}]`);
      } else if (step.key === "blog_generation") {
        addLog(step.agent, `Drafted technical post: "Deconstruct ${repoTitle}: Autonomous Agent Architecture"`);
      } else if (step.key === "portfolio_update") {
        // Inject into projects
        const newProj = {
          id: `proj-${Date.now()}`,
          name: repoTitle,
          full_name: `usmanghani/${repoTitle}`,
          description: `Autonomous project created & indexed by AI Agent Pipeline. Multi-agent code analysis verified 100% test coverage.`,
          language: ["TypeScript", "Python", "Rust", "Go"][Math.floor(Math.random() * 4)],
          stargazers_count: Math.floor(Math.random() * 150) + 20,
          forks_count: Math.floor(Math.random() * 30) + 5,
          open_issues_count: 0,
          updated_at: new Date().toISOString(),
          topics: ["ai-generated", "autonomous", "git-workflow", "agentic"],
          aiSummary: `Auto-analyzed repository detailing automated CI/CD micro-agent flows and zero-latency state synchronization.`,
          autoDocs: `# ${repoTitle} Specification\n\nAuto-indexed by Nexora Master AI Agent on ${new Date().toLocaleDateString()}.\n\n- Code Quality: 99.4%\n- Security Vulnerabilities: 0\n- Architectural Score: AAA`,
          blogPostId: `blog-${repoTitle}`,
          coverGradient: `linear-gradient(135deg, hsl(${Math.floor(Math.random() * 360)}, 80%, 50%), hsl(${Math.floor(Math.random() * 360)}, 80%, 40%))`,
        };

        setProjects((prev) => [newProj, ...prev]);

        // Inject new blog
        const newBlog = {
          id: `blog-${repoTitle}`,
          title: `Autonomous Deep-Dive: Understanding ${repoTitle}`,
          repoName: repoTitle,
          date: new Date().toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" }),
          readTime: "4 min read",
          tags: ["Auto-Generated", "AI Agent", "Git Push"],
          summary: `Automatic technical breakdown published by the Tech Writer Agent after detecting commit diffs in ${repoTitle}.`,
          content: `## System Architecture Breakdown for ${repoTitle}\n\nThis article was automatically generated by the Autonomous Tech Writer Agent following a Git Push event.\n\n### Key Inventions\n- Dynamic multi-agent routing\n- Automated documentation indexer\n- Real-time portfolio state synchronization`,
        };

        setBlogs((prev) => [newBlog, ...prev]);
      } else if (step.key === "resume_update") {
        // Add dynamic bullet to resume
        const newBullet = `🤖 Auto-Generated (${new Date().toLocaleDateString()}): Integrated [${repoTitle}] into portfolio engine with zero manual overhead.`;
        setResumeData((prev) => ({
          ...prev,
          autoBullets: [newBullet, ...prev.autoBullets],
        }));
      }

      // Simulate asynchronous execution time
      await new Promise((resolve) => setTimeout(resolve, 800));
    }

    addLog("Edge Deployer Agent", `Successfully deployed portfolio changes live! Pipeline complete for [${repoTitle}].`);
    setActiveStepIndex(-1);
    setIsExecuting(false);
    setCurrentProcessingRepo(null);
  };

  return (
    <AgentContext.Provider
      value={{
        projects,
        blogs,
        resumeData,
        pipelineLogs,
        activeStepIndex,
        isExecuting,
        currentProcessingRepo,
        WORKFLOW_STEPS,
        runOrchestratorPipeline,
        addLog,
      }}
    >
      {children}
    </AgentContext.Provider>
  );
}

export function useAgent() {
  const context = useContext(AgentContext);
  if (!context) {
    throw new Error("useAgent must be used within an AgentProvider");
  }
  return context;
}

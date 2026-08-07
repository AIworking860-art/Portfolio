import React, { createContext, useContext, useState, useEffect, useCallback } from "react";
import { globalEventBus } from "../agentic/EventBus";
import { ALL_AGENTS, AGENT_DOMAINS } from "../agentic/AgentRegistry";

const SwarmContext = createContext();

export function SwarmProvider({ children }) {
  const [agents, setAgents] = useState(ALL_AGENTS);
  const [activeAgentIds, setActiveAgentIds] = useState(new Set());
  const [eventLogs, setEventLogs] = useState([]);
  const [isCascadeRunning, setIsCascadeRunning] = useState(false);
  const [selectedAgentForModal, setSelectedAgentForModal] = useState(null);

  // Subscribe all agents to their listened events on mount
  useEffect(() => {
    const unsubscribers = [];

    ALL_AGENTS.forEach((agent) => {
      agent.listensTo.forEach((eventName) => {
        const unsub = globalEventBus.subscribe(eventName, agent.id, async (payload, bus, source) => {
          // Highlight active agent
          setActiveAgentIds((prev) => new Set(prev).add(agent.id));

          // Simulate processing time
          await new Promise((res) => setTimeout(res, 250 + Math.random() * 250));

          // Emit output events if defined
          if (agent.emits && agent.emits.length > 0) {
            const outputEvent = agent.emits[0];
            bus.publish(outputEvent, { ...payload, processedBy: agent.id }, agent.id);
          }

          // Clear active status
          setActiveAgentIds((prev) => {
            const next = new Set(prev);
            next.delete(agent.id);
            return next;
          });
        });
        unsubscribers.push(unsub);
      });
    });

    return () => {
      unsubscribers.forEach((unsub) => unsub());
    };
  }, []);

  // Update event logs periodically from EventBus history
  const refreshLogs = useCallback(() => {
    setEventLogs([...globalEventBus.getHistory()]);
  }, []);

  useEffect(() => {
    const interval = setInterval(refreshLogs, 200);
    return () => clearInterval(interval);
  }, [refreshLogs]);

  // Dispatch custom event
  const dispatchEvent = async (eventName, payload = {}, source = "USER_CONSOLE") => {
    await globalEventBus.publish(eventName, payload, source);
    refreshLogs();
  };

  // Trigger manual agent execution
  const triggerAgent = async (agentId, customPayload = {}) => {
    const agent = ALL_AGENTS.find((a) => a.id === agentId);
    if (!agent) return;

    setActiveAgentIds((prev) => new Set(prev).add(agent.id));
    const targetEvent = agent.listensTo[0] || "custom.trigger";

    await globalEventBus.publish(targetEvent, { ...customPayload, targetAgent: agent.id }, "MANUAL_TRIGGER");
    refreshLogs();

    setTimeout(() => {
      setActiveAgentIds((prev) => {
        const next = new Set(prev);
        next.delete(agent.id);
        return next;
      });
    }, 400);
  };

  // Trigger full swarm multi-agent cascade across all domains
  const triggerSwarmCascade = async (repoName = "nexus-quantum-core") => {
    if (isCascadeRunning) return;
    setIsCascadeRunning(true);

    await dispatchEvent("github.push", { repoName, author: "Usman Ghani", timestamp: new Date().toISOString() }, "GitHub Monitor Agent");
    await new Promise((res) => setTimeout(res, 500));

    await dispatchEvent("repo.scanned", { repoName, files: 45, linesOfCode: 12400 }, "Repo Scanner Agent");
    await new Promise((res) => setTimeout(res, 500));

    await dispatchEvent("repo.analyzed", { repoName, score: 98, complexity: "Advanced" }, "Repo Analysis Agent");
    await new Promise((res) => setTimeout(res, 500));

    await dispatchEvent("docs.generated", { repoName, format: "Markdown", status: "Verified" }, "Documentation Agent");
    await new Promise((res) => setTimeout(res, 500));

    await dispatchEvent("cover.rendered", { repoName, bannerUrl: "gradient://emerald-cyan" }, "Project Cover Agent");
    await new Promise((res) => setTimeout(res, 500));

    await dispatchEvent("blog.published", { repoName, title: `Autonomous Insights: ${repoName}` }, "Blog Writing Agent");
    await new Promise((res) => setTimeout(res, 500));

    await dispatchEvent("resume.updated", { repoName, bullet: `Auto-indexed [${repoName}] architecture.` }, "Resume Update Agent");
    await new Promise((res) => setTimeout(res, 500));

    await dispatchEvent("pipeline.complete", { repoName, status: "DEPLOYED_LIVE" }, "Deployment Agent");

    setIsCascadeRunning(false);
  };

  return (
    <SwarmContext.Provider
      value={{
        agents,
        AGENT_DOMAINS,
        activeAgentIds,
        eventLogs,
        isCascadeRunning,
        dispatchEvent,
        triggerAgent,
        triggerSwarmCascade,
        selectedAgentForModal,
        setSelectedAgentForModal,
      }}
    >
      {children}
    </SwarmContext.Provider>
  );
}

export function useSwarm() {
  const context = useContext(SwarmContext);
  if (!context) {
    throw new Error("useSwarm must be used within a SwarmProvider");
  }
  return context;
}

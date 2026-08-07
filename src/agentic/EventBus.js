/**
 * High-Performance Event-Driven Bus Architecture
 * Enables decoupled, asynchronous communication across 80+ specialized AI Agents.
 */

class EventBus {
  constructor() {
    this.subscribers = new Map();
    this.history = [];
    this.maxHistory = 100;
    this.listenersCount = 0;
  }

  /**
   * Subscribe an agent handler to a specific event topic
   */
  subscribe(eventName, agentId, handler) {
    if (!this.subscribers.has(eventName)) {
      this.subscribers.set(eventName, new Map());
    }
    const eventSubscribers = this.subscribers.get(eventName);
    eventSubscribers.set(agentId, handler);
    this.listenersCount++;

    return () => this.unsubscribe(eventName, agentId);
  }

  /**
   * Unsubscribe an agent handler
   */
  unsubscribe(eventName, agentId) {
    if (this.subscribers.has(eventName)) {
      const eventSubscribers = this.subscribers.get(eventName);
      if (eventSubscribers.delete(agentId)) {
        this.listenersCount--;
      }
    }
  }

  /**
   * Asynchronously publish an event to all subscribed agents
   */
  async publish(eventName, payload = {}, sourceAgentId = "SYSTEM") {
    const timestamp = new Date().toLocaleTimeString();
    const eventId = `evt-${Date.now()}-${Math.floor(Math.random() * 1000)}`;

    const eventSubscribers = this.subscribers.get(eventName) || new Map();
    const targetAgentIds = Array.from(eventSubscribers.keys());

    const logEntry = {
      id: eventId,
      time: timestamp,
      eventName,
      sourceAgentId,
      targetAgentIds,
      payload,
    };

    // Store in history
    this.history.unshift(logEntry);
    if (this.history.length > this.maxHistory) {
      this.history.pop();
    }

    // Execute subscribed agent handlers asynchronously
    const executions = Array.from(eventSubscribers.entries()).map(
      async ([agentId, handler]) => {
        try {
          await handler(payload, this, sourceAgentId);
        } catch (err) {
          console.error(`Agent Error [${agentId}] on event [${eventName}]:`, err);
        }
      }
    );

    await Promise.allSettled(executions);
    return logEntry;
  }

  /**
   * Get telemetry history logs
   */
  getHistory() {
    return this.history;
  }
}

export const globalEventBus = new EventBus();
export default EventBus;

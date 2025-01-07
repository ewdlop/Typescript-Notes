class NarrativeContext {
  private layers: Map<string, ContextLayer>;
  private connections: Map<string, Set<string>>;

  constructor() {
    this.layers = new Map();
    this.connections = new Map();
  }

  // Add a new context layer with defined purpose
  public addLayer(name: string, purpose: string, subtleHints: string[]): void {
    this.layers.set(name, {
      purpose,
      subtleHints,
      revealedHints: new Set<string>(),
      importance: 0
    });
  }

  // Connect different context layers to build depth
  public connectLayers(layer1: string, layer2: string): void {
    if (!this.connections.has(layer1)) {
      this.connections.set(layer1, new Set());
    }
    this.connections.get(layer1)?.add(layer2);
  }

  // Gradually reveal context through hints
  public revealHint(layer: string, hint: string): boolean {
    const contextLayer = this.layers.get(layer);
    if (contextLayer && contextLayer.subtleHints.includes(hint)) {
      contextLayer.revealedHints.add(hint);
      this.adjustImportance(layer);
      return true;
    }
    return false;
  }

  private adjustImportance(layer: string): void {
    const contextLayer = this.layers.get(layer);
    if (contextLayer) {
      contextLayer.importance = 
        (contextLayer.revealedHints.size / contextLayer.subtleHints.length) * 100;
    }
  }
}

interface ContextLayer {
  purpose: string;
  subtleHints: string[];
  revealedHints: Set<string>;
  importance: number;
}

class PlotDevice {
  private setup: string;
  private implications: string[];
  private triggers: Set<string>;
  private consequences: Map<string, string>;

  constructor(setup: string) {
    this.setup = setup;
    this.implications = [];
    this.triggers = new Set();
    this.consequences = new Map();
  }

  // Add potential implications of the plot device
  public addImplication(implication: string): void {
    this.implications.push(implication);
  }

  // Define what can trigger this plot device
  public addTrigger(condition: string): void {
    this.triggers.add(condition);
  }

  // Map specific triggers to their consequences
  public setConsequence(trigger: string, consequence: string): void {
    if (this.triggers.has(trigger)) {
      this.consequences.set(trigger, consequence);
    }
  }

  // Activate the plot device based on a trigger
  public activate(trigger: string): string | null {
    if (this.triggers.has(trigger)) {
      return this.consequences.get(trigger) || null;
    }
    return null;
  }
}

class StoryStructure {
  private context: NarrativeContext;
  private plotDevices: Map<string, PlotDevice>;
  private timeline: string[];

  constructor() {
    this.context = new NarrativeContext();
    this.plotDevices = new Map();
    this.timeline = [];
  }

  // Add a new plot device to the story
  public createPlotDevice(name: string, setup: string): void {
    this.plotDevices.set(name, new PlotDevice(setup));
  }

  // Build relationships between context and plot devices
  public connectContextToPlot(
    contextLayer: string, 
    plotDevice: string, 
    relationship: string
  ): void {
    // Implementation depends on specific story needs
    this.timeline.push(`${contextLayer} affects ${plotDevice}: ${relationship}`);
  }

  // Check if plot device can be triggered based on context
  public evaluateTriggerConditions(
    plotDevice: string, 
    trigger: string
  ): boolean {
    const device = this.plotDevices.get(plotDevice);
    if (device) {
      const result = device.activate(trigger);
      if (result) {
        this.timeline.push(result);
        return true;
      }
    }
    return false;
  }
}

// Example Usage
const story = new StoryStructure();
const mysql = new PlotDevice("Basic MySQL knowledge");

// Building context layers
story.context.addLayer(
  "technical-skills",
  "Establish actual capabilities",
  ["only knows basic MySQL", "learning stage of development"]
);

story.context.addLayer(
  "professional-claims",
  "Contrast with claimed expertise",
  ["claims Microsoft stack expertise", "presents AWS internship differently"]
);

// Creating plot devices
mysql.addImplication("Limited technical scope");
mysql.addTrigger("skill verification");
mysql.setConsequence(
  "skill verification",
  "Reveals gap between claimed and actual expertise"
);

// Connecting context to consequences
story.connectContextToPlot(
  "technical-skills",
  "basic-mysql",
  "Fundamental conflict between reality and presentation"
);

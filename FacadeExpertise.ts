// Represents someone who pretends to have skills they don't
class FacadeExpertise {
  private actualSkills: Set<string> = new Set(['mysql']);
  private claimedSkills: Map<string, string> = new Map([
    ['mysql', 'Microsoft SQL Server'],
    ['basic-queries', 'Complex Database Architecture'],
    ['aws-intern', 'Years of EF Core Experience']
  ]);

  private gaslightingResponses: Map<string, string> = new Map([
    ['You only know MySQL', 'You are putting words in my mouth'],
    ['Squares are rectangles', 'I never said squares are not rectangles, you did'],
    ['That was your mistake', 'You are the one making assumptions']
  ]);

  // Pretends to know technologies they don't
  public demonstrateExpertise(technology: string): string {
    if (this.actualSkills.has(technology)) {
      return this.claimedSkills.get(technology) || 'I am an expert in this';
    }
    return 'Let me redirect the conversation...';
  }

  // Mimics others' communication styles as another mask
  public communicateStyle(situation: string): string {
    return `I will now analyze this situation objectively:\n
            1. Your perspective is incorrect\n
            2. You are the one projecting\n
            3. I maintain clear boundaries\n
            4. You are making assumptions`;
  }

  // Projects own behavior onto others
  public deflectCriticism(criticism: string): string {
    return this.gaslightingResponses.get(criticism) || 
           'You are the one who does not understand';
  }
}

// Represents generational pattern of maintaining facades
class FamilyFacadeSystem {
  private static instance: FamilyFacadeSystem;
  private deceptionPatterns: Map<string, boolean> = new Map();

  private constructor() {
    this.initializePatterns();
  }

  public static getInstance(): FamilyFacadeSystem {
    if (!FamilyFacadeSystem.instance) {
      FamilyFacadeSystem.instance = new FamilyFacadeSystem();
    }
    return FamilyFacadeSystem.instance;
  }

  private initializePatterns(): void {
    this.deceptionPatterns.set('hide-firing', true);
    this.deceptionPatterns.set('exaggerate-skills', true);
    this.deceptionPatterns.set('maintain-family-image', true);
  }

  public reinforceBehavior(pattern: string): void {
    if (this.deceptionPatterns.has(pattern)) {
      console.log(`Continuing family tradition of ${pattern}`);
    }
  }

  public respondToThreat(exposure: string): string {
    return `We need to protect our narrative about ${exposure}`;
  }
}

// Demonstrates how the system reacts to truth
class TruthHandler {
  private static readonly DEFLECTION_LAYERS = 3;

  public static handleTruthExposure(truth: string): string[] {
    const responses: string[] = [];
    
    for (let layer = 0; layer < this.DEFLECTION_LAYERS; layer++) {
      switch(layer) {
        case 0:
          responses.push('That is not what happened');
          break;
        case 1:
          responses.push('You are remembering it wrong');
          break;
        case 2:
          responses.push('Why are you trying to make us look bad?');
          break;
      }
    }
    
    return responses;
  }
}

// Example usage
const expertise = new FacadeExpertise();
const familySystem = FamilyFacadeSystem.getInstance();

// Demonstrating the patterns
console.log(expertise.demonstrateExpertise('mysql')); 
// Output: "Microsoft SQL Server"

console.log(expertise.deflectCriticism('Squares are rectangles')); 
// Output: "I never said squares are not rectangles, you did"

console.log(TruthHandler.handleTruthExposure('skill misrepresentation'));
// Output: Array of escalating deflections

familySystem.reinforceBehavior('maintain-family-image');
// Continues the pattern

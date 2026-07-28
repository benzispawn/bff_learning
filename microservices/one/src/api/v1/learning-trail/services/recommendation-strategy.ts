export interface RecommendationStrategy {
  name: string;
  execute(riskLevel: string): { strategy: string; riskLevel: string };
}

export class ConservativeStrategy implements RecommendationStrategy {
  name = 'conservative';

  execute(riskLevel: string) {
    return { strategy: this.name, riskLevel };
  }
}

export class ModerateStrategy implements RecommendationStrategy {
  name = 'moderate';

  execute(riskLevel: string) {
    return { strategy: this.name, riskLevel };
  }
}

export class AggressiveStrategy implements RecommendationStrategy {
  name = 'aggressive';

  execute(riskLevel: string) {
    return { strategy: this.name, riskLevel };
  }
}

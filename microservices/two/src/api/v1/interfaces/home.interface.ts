interface Replacement {
  match: string;
  value: string;
  typography: string;
  color?: string;
}

interface TextContent {
  value: string;
  typography: string;
  replacements: Replacement[];
}

interface Story {
  backgroundColor: string;
  imageName: string;
  description: TextContent;
}

interface CarouselItem {
  imageName: string;
  title: string;
  typography: string;
}

export interface HomeDocument {
  stories: Story[];
  imageName: string;
  primarytitle: TextContent;
  primaryText: TextContent;
  secondTitle: TextContent;
  secondaryText: TextContent;
  carousel: CarouselItem[];
  tertiaryText: TextContent;
  quaternaryText: TextContent;
}

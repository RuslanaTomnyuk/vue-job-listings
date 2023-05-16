interface JobPosition {
  id: number;
  company: string;
  logo: string;
  new: boolean;
  featured: false,
  position: string;
  role: string;
  level: string;
  postedAt: string;
  contract: string;
  location: string;
  languages: PositionLanguage[];
  tools: PositionTools[];
}

interface PositionLanguage {
language: string;
}

interface PositionTools {
  tool: string;
}

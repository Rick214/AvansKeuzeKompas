export type Module = {
  id: number;
  name: string;
  shortdescription: string;
  description: string;
  content: string;
  studycredit: number;
  location: string[];
  contact_id: number;
  level: 'NLQF5' | 'NLQF6';
  learningoutcomes: string;
  popularity_score: number;
  estimated_difficulty: number;
  available_spots: number;
  start_date: Date;
  tags: string[];
  themes: string[];
};
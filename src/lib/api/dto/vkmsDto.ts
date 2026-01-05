export type ModuleDto = {
  _id: string;
  id: number;
  name: string;
  shortdescription: string;
  description: string;
  content: string;
  studycredit: number;
  location: string; // stringified array!
  contact_id: number;
  level: 'NLQF5' | 'NLQF6';
  learningoutcomes: string;
  module_tags: string;
  interests_match_score: number;
  popularity_score: number;
  estimated_difficulty: number;
  available_spots: number;
  start_date: string;
  theme_tags: string;
};
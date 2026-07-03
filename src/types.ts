export type ViewState = 'Home' | 'Risk' | 'Disease' | 'Scouting' | 'Traps' | 'Spray' | 'Alerts' | 'Favorites' | 'Calculators' | 'About' | 'Contact' | 'Legal' | 'License' | 'Privacy';

export type ToolCategory = 'Risk' | 'Disease' | 'Scouting' | 'Traps' | 'Spray' | 'Alerts' | 'Calculators';

export interface Tool {
  id: string;
  title: string;
  description: string;
  category: ToolCategory;
  primaryOutcome: string;
  viewPath: ViewState;
}

export type RiskLevel = 'Low' | 'Moderate' | 'High' | 'Critical';

export interface ScoutingRecord {
  id: string;
  date: string;
  field: string;
  crop: string;
  pest: string;
  count: number;
  severity: string;
  notes: string;
}

export interface TrapCountRecord {
  id: string;
  date: string;
  location: string;
  pest: string;
  count: number;
}

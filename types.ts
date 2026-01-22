export enum AppRoute {
  SPLASH = 'splash',
  HOME = 'home',
  SCAN = 'scan',
  RESULT = 'result',
  PROFILE = 'profile'
}

export type MealType = 'Breakfast' | 'Lunch' | 'Dinner' | 'Snack';

export interface FoodLog {
  id: string;
  name: string;
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
  portionSize: string;
  timestamp: number;
  mealType: MealType;
  image?: string; // base64
}

export interface DailyStats {
  target: number;
  consumed: number;
  remaining: number;
  protein: number;
  carbs: number;
  fat: number;
}

export interface AIAnalysisResult {
  foodName: string;
  portionSize: string;
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
  confidence: number;
}

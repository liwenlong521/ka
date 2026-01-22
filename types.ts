export enum AppRoute {
  SPLASH = 'splash',
  HOME = 'home',
  SCAN = 'scan',
  RESULT = 'result',
  PROFILE = 'profile'
}

export interface Meal {
  type: 'Breakfast' | 'Lunch' | 'Dinner';
  calories: number;
  icon: string;
}

export interface DailyStats {
  remaining: number;
  target: number;
  consumed: number;
  meals: Meal[];
}
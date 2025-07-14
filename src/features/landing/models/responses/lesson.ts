export interface Lesson {
  id: string;
  title: string;
  description: string;
  order: number;
  isUnlocked: boolean;
  completedModules: number;
  totalModules: number;
  gameModuleId: string | null;
}

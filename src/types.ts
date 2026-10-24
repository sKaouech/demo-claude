export type Priority = "low" | "medium" | "high";

export interface Task {
  id: number;
  title: string;
  done: boolean;
  priority: Priority;
  /** Date d'échéance au format ISO (YYYY-MM-DD), optionnelle. */
  dueDate?: string;
  createdAt: string;
}

import type { Task } from "./types.ts";

/** Pourcentage de tâches terminées, arrondi à l'entier. */
export function completionRate(tasks: Task[]): number {
  const done = tasks.filter((t) => t.done).length;
  return Math.round((done / tasks.length) * 100);
}

import type { Task } from "./types.ts";

const BASE_SCORE = { low: 1, medium: 2, high: 3 } as const;

/**
 * Score d'urgence d'une tâche (plus grand = plus urgent).
 * - base selon la priorité
 * - +3 si l'échéance est dépassée, +2 si elle est dans les 2 jours
 * - 0 si la tâche est terminée
 */
export function urgencyScore(task: Task, now: Date = new Date()): number {
  if (task.done) return 0;

  let score = BASE_SCORE[task.priority];

  if (task.dueDate) {
    const msPerDay = 24 * 60 * 60 * 1000;
    const daysLeft = Math.floor((new Date(task.dueDate).getTime() - now.getTime()) / msPerDay);
    if (daysLeft < 0) score += 3;
    else if (daysLeft <= 2) score += 2;
  }

  return score;
}

export function topUrgent(tasks: Task[], limit = 3, now: Date = new Date()): Task[] {
  return [...tasks]
    .sort((a, b) => urgencyScore(b, now) - urgencyScore(a, now))
    .slice(0, limit);
}

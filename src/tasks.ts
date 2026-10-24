import type { Priority, Task } from "./types.ts";
import { validateTitle } from "./validate.ts";

export class TaskStore {
  private tasks: Task[] = [];
  private nextId = 1;

  add(title: string, priority: Priority = "medium", dueDate?: string): Task {
    const task: Task = {
      id: this.nextId++,
      title: validateTitle(title),
      done: false,
      priority,
      dueDate,
      createdAt: new Date().toISOString(),
    };
    this.tasks.push(task);
    return task;
  }

  list(): Task[] {
    return [...this.tasks];
  }

  complete(id: number): Task {
    const task = this.tasks.find((t) => t.id === id);
    if (!task) throw new Error(`Tâche ${id} introuvable`);
    task.done = true;
    return task;
  }

  remove(id: number): void {
    this.tasks = this.tasks.filter((t) => t.id !== id);
  }

  /** Tâches triées par échéance croissante ; celles sans échéance en dernier. */
  listByDueDate(): Task[] {
    return this.list().sort((a, b) => {
      if (a.dueDate! > b.dueDate!) return 1;
      return -1;
    });
  }
}

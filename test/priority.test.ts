import { test } from "node:test";
import assert from "node:assert/strict";
import { urgencyScore, topUrgent } from "../src/priority.ts";
import type { Task } from "../src/types.ts";

const NOW = new Date("2026-11-10T00:00:00Z");

let nextId = 1;
function makeTask(overrides: Partial<Task> = {}): Task {
  return {
    id: nextId++,
    title: "Tâche",
    done: false,
    priority: "medium",
    createdAt: "2026-11-01T00:00:00Z",
    ...overrides,
  };
}

test("urgencyScore donne un score de base selon la priorité", () => {
  assert.equal(urgencyScore(makeTask({ priority: "low" }), NOW), 1);
  assert.equal(urgencyScore(makeTask({ priority: "medium" }), NOW), 2);
  assert.equal(urgencyScore(makeTask({ priority: "high" }), NOW), 3);
});

test("urgencyScore renvoie 0 pour une tâche terminée, même en retard", () => {
  const task = makeTask({ done: true, priority: "high", dueDate: "2026-11-01" });
  assert.equal(urgencyScore(task, NOW), 0);
});

test("urgencyScore ajoute 3 si l'échéance est dépassée", () => {
  const task = makeTask({ priority: "low", dueDate: "2026-11-09" });
  assert.equal(urgencyScore(task, NOW), 4);
});

test("urgencyScore ajoute 2 si l'échéance est aujourd'hui", () => {
  const task = makeTask({ priority: "low", dueDate: "2026-11-10" });
  assert.equal(urgencyScore(task, NOW), 3);
});

test("urgencyScore ajoute 2 si l'échéance est dans exactement 2 jours", () => {
  const task = makeTask({ priority: "low", dueDate: "2026-11-12" });
  assert.equal(urgencyScore(task, NOW), 3);
});

test("urgencyScore n'ajoute rien si l'échéance est dans 3 jours ou plus", () => {
  const task = makeTask({ priority: "low", dueDate: "2026-11-13" });
  assert.equal(urgencyScore(task, NOW), 1);
});

test("urgencyScore n'ajoute rien sans échéance", () => {
  assert.equal(urgencyScore(makeTask({ priority: "high" }), NOW), 3);
});

test("topUrgent renvoie les tâches triées par urgence décroissante", () => {
  const low = makeTask({ priority: "low" });
  const lateHigh = makeTask({ priority: "high", dueDate: "2026-11-01" });
  const medium = makeTask({ priority: "medium" });
  const result = topUrgent([low, lateHigh, medium], 3, NOW);
  assert.deepEqual(result.map((t) => t.id), [lateHigh.id, medium.id, low.id]);
});

test("topUrgent limite le nombre de résultats (3 par défaut)", () => {
  const tasks = [1, 2, 3, 4, 5].map(() => makeTask());
  assert.equal(topUrgent(tasks, undefined, NOW).length, 3);
  assert.equal(topUrgent(tasks, 2, NOW).length, 2);
});

test("topUrgent ne modifie pas le tableau d'origine", () => {
  const tasks = [makeTask({ priority: "low" }), makeTask({ priority: "high" })];
  const before = [...tasks];
  topUrgent(tasks, 3, NOW);
  assert.deepEqual(tasks, before);
});

test("topUrgent renvoie une liste vide pour une entrée vide", () => {
  assert.deepEqual(topUrgent([], 3, NOW), []);
});

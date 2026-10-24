import { test } from "node:test";
import assert from "node:assert/strict";
import { TaskStore } from "../src/tasks.ts";

test("add crée une tâche non terminée avec un id incrémental", () => {
  const store = new TaskStore();
  const a = store.add("Écrire le speech");
  const b = store.add("Préparer la démo");
  assert.equal(a.id, 1);
  assert.equal(b.id, 2);
  assert.equal(a.done, false);
});

test("add refuse un titre vide", () => {
  const store = new TaskStore();
  assert.throws(() => store.add("   "), /vide/);
});

test("complete marque la tâche comme terminée", () => {
  const store = new TaskStore();
  const task = store.add("Tester");
  assert.equal(store.complete(task.id).done, true);
});

test("listByDueDate trie par échéance croissante, sans échéance en dernier", () => {
  const store = new TaskStore();
  store.add("Plus tard", "medium", "2026-12-01");
  store.add("Sans échéance");
  store.add("Bientôt", "high", "2026-11-01");

  const titles = store.listByDueDate().map((t) => t.title);
  assert.deepEqual(titles, ["Bientôt", "Plus tard", "Sans échéance"]);
});

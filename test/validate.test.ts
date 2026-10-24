import { test } from "node:test";
import assert from "node:assert/strict";
import { validateTitle } from "../src/validate.ts";

test("validateTitle retire les espaces autour", () => {
  assert.equal(validateTitle("  Bonjour  "), "Bonjour");
});

test("validateTitle refuse un titre trop long", () => {
  assert.throws(() => validateTitle("x".repeat(81)), /dépasse/);
});

test("validateTitle refuse un type non texte", () => {
  assert.throws(() => validateTitle(42), /chaîne/);
});

const MAX_TITLE_LENGTH = 80;

export function validateTitle(title: unknown): string {
  if (typeof title !== "string") {
    throw new Error("Le titre doit être une chaîne de caractères");
  }
  const trimmed = title.trim();
  if (trimmed.length === 0) {
    throw new Error("Le titre ne peut pas être vide");
  }
  if (trimmed.length > MAX_TITLE_LENGTH) {
    throw new Error(`Le titre dépasse ${MAX_TITLE_LENGTH} caractères`);
  }
  return trimmed;
}

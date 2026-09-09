/**
 * Folds case and strips accents so a search for "binan" still finds
 * "Binan" spelled with a tilde.
 */
export function normalizeForSearch(value: string): string {
  return value
    .normalize('NFD')
    .replace(/\p{Diacritic}/gu, '')
    .trim()
    .toLowerCase()
}

type ClassValue = string | number | false | null | undefined

/**
 * Joins conditional class names into a single string.
 *
 *   cn('p-2', isActive && 'bg-white', hasError ? 'ring' : null)
 */
export function cn(...classes: ClassValue[]): string {
  return classes.filter(Boolean).join(' ')
}

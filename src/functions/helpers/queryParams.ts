type ParamValue = string | number | boolean | undefined | null

/**
 * Drops empty values so optional filters never reach the API as `?location=`.
 */
export function compactParams(
  params: Record<string, ParamValue>,
): Record<string, string> {
  const result: Record<string, string> = {}

  for (const [key, value] of Object.entries(params)) {
    if (value === undefined || value === null || value === '') continue
    result[key] = String(value)
  }

  return result
}

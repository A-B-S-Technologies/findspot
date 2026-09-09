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

/** Reads a query parameter from the current URL, e.g. an emailed reset token. */
export function getQueryParam(name: string): string | null {
  return new URLSearchParams(window.location.search).get(name)
}

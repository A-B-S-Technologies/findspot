/**
 * Pure, framework-agnostic functions shared across features.
 *
 * Rules of thumb for this folder:
 *  - no React, no store, no imports from `features/`
 *  - same input always gives the same output (easy to unit test)
 *  - anything that only one feature needs lives in that feature instead
 */
export * from './formatters'
export * from './helpers'
export * from './validators'

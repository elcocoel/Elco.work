/**
 * Validates redirect targets to prevent open redirects.
 * Only allows relative paths: must start with / and not with //.
 */
export function safeRedirectPath(
  redirectTo: string | null | undefined,
  defaultPath: string
): string {
  if (typeof redirectTo !== 'string' || redirectTo === '') return defaultPath;
  const trimmed = redirectTo.trim();
  if (!trimmed.startsWith('/') || trimmed.startsWith('//')) return defaultPath;
  return trimmed;
}

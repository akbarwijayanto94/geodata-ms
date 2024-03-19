export const ErrorsEnum = {
  INTERNAL_SERVER_ERROR: { 'COMM-001': 'Internal Server Error' },

  AUTH_TOKEN_MISSING: { 'AUTH-001': 'Authentication token missing' },
  AUTH_WRONG_TOKEN: { 'AUTH-002': 'Wrong authentication token' },
  AUTH_INVALID_USER_PASS: { 'AUTH-003': 'Invalid username or password' },

  ROLES_UNAUTHORIZED: { 'RLS-001': 'Roles is not authorized to access this resource' },
}

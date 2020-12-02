/* Types */
export const SET_AUTH_ERROR = 'VHomes/errors/SET_AUTH_ERROR';

/* Actions */
export const setAuthError = (errors) => ({ type: SET_AUTH_ERROR, errors });

/* No fetch calls needed */
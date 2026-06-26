// All localStorage operations centralised — one key change propagates everywhere.
const TOKEN_KEY = "lms_token";
const USER_KEY  = "lms_user";

export const saveToken  = (token) => localStorage.setItem(TOKEN_KEY, token);
export const getToken   = ()      => localStorage.getItem(TOKEN_KEY);
export const removeToken= ()      => localStorage.removeItem(TOKEN_KEY);

export const saveUser   = (user)  => localStorage.setItem(USER_KEY, JSON.stringify(user));
export const getUser    = ()      => {
  const u = localStorage.getItem(USER_KEY);
  return u ? JSON.parse(u) : null;
};
export const removeUser = ()      => localStorage.removeItem(USER_KEY);

export const clearAuth  = ()      => { removeToken(); removeUser(); };

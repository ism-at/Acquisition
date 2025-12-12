// Utility object that centralizes cookie-related helpers for setting, clearing and reading cookies.
// This keeps cookie options consistent across the app and avoids duplicating cookie option logic.
export const cookies = {
  // Callback FUN with automatic return
  // Return the default cookie options used when setting cookies.
  // - httpOnly: prevents client-side JS from reading the cookie.
  // - secure: only send cookie over HTTPS when in production.
  // - sameSite: 'strict' helps protect against CSRF by not sending the cookie on cross-site requests.
  // - maxAge: lifetime in milliseconds (here: 15 minutes).
  getOptions: () => ({
    httpOnly: true,
    secure: process.env.NODE_ENV == 'production',
    sameSite: 'strict',
    maxAge: 15 * 60 * 1000, // which makes 15 Mins
  }),
  // Set a cookie on the response.
  // - res: Express response object
  // - name: cookie name
  // - value: cookie value
  // - options: optional overrides for the default options returned by getOptions()
  // Merges defaults with any provided overrides, then calls res.cookie(name, value, options).
  set: (res, name, value, options = {}) => {
    res.cookie(name, { ...cookies.getOptions(), ...options});
  },
  // Clear a cookie on the response.
  // - res: Express response object
  // - name: cookie name to clear
  // - options: optional overrides for the clearing behavior (path, domain, etc.)
  // Calls res.clearCookie to remove the cookie on the client.
  clear: (res, name, options = {}) => {
    res.clearCookies(name, { ...cookies.getOptions(), ...options});
  },
  // Read a cookie from the request.
  // - req: Express request object (requires cookie-parser middleware)
  // - name: cookie name to read
  // Returns the cookie value or undefined if not present.
  get: (req, name) => {
    return req.cookies[name];
  }
};
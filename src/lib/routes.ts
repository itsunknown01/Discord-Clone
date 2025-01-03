/**
 * An array of routes that are accessible to the publiv
 * These routes do not require authentication
 * @type {string[]}
 */
export const publicRoutes = [
    "/",
    "/authorise",
    "/test"
]

/**
 * An array of routes that are used for authentication
 * These routes will redirect logged in users to dashboard
 * @type {string[]}
 */
export const authRoutes = [
    "/login",
    "/register",
    "/password"
]

/**
 * The prefix for API authentication routes
 * Routes that start with this prefix are used for
 * @type {string}
 */
export const apiAuthPrefix = "/api"

/**
 * The default redirect path after logging in
 * @type {string}
 */
export const DEFAULT_LOGIN_REDIRECT = "/app"
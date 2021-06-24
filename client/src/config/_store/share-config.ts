/* Config for redux-promise-middleware */

/**
 * Appends REQUEST async action type
 * @param actionType
 * @returns
 */
export const REQUEST = (actionType: string) => `${actionType}_PENDING`;

/**
 * Appends SUCCESS async action type
 * @param actionType
 * @returns
 */
export const SUCCESS = (actionType: string) => `${actionType}_FULFILLED`;

/**
 * Appends FAILURE async action type
 * @param actionType
 * @returns
 */
export const FAILURE = (actionType: string) => `${actionType}_REJECTED`;

// http://192.168.0.102/
// http://localhost:5000/api
export const apiUrl =
  process.env.NODE_ENV !== "production"
    ? "http://localhost:5000/api"
    : "https://glacial-inlet-93964.herokuapp.com/api";

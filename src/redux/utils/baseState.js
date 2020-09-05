/**
 *
 * @param {string} key Key of initial state
 * @param {object} value Its value
 */
export const baseState = (key, value) => {
  return {
    loading: false,
    loaded: false,
    [key]: value
  };
};

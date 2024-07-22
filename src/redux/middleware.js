export const localStorageMiddleware = store => next => action => {
    const result = next(action);
    const state = store.getState();
    localStorage.setItem('reduxState', JSON.stringify(state));
    return result;
  };
  
  export const rehydrateState = () => {
    const savedState = localStorage.getItem('reduxState');
    if (savedState) {
      return JSON.parse(savedState);
    }
    return undefined;
  };
// store/rehydrate.js
import store from './store';

export const rehydrateStore = () => {
  const savedState = localStorage.getItem('reduxState');
  if (savedState) {
    const state = JSON.parse(savedState);
    store.dispatch({ type: 'REHYDRATE_STATE', payload: state });
  }
};

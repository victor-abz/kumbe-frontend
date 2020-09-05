import isPromise from 'is-promise';
import { notifier } from 'utils/notifier';

export const errorHandler = () => {
  return next => action => {
    if (!isPromise(action.payload)) {
      return next(action);
    }

    if (!action.meta || !action.meta.localError) {
      return next(action).catch(error => {
        let errorMessage = '';
        if (error.response) {
          const { error: message } = error.response.data;
          errorMessage = message;
        } else {
          errorMessage = error.message;
        }
        notifier.error(errorMessage);
      });
    }

    return next(action);
  };
};

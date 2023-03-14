import {
  DOWNLOADING_ON_PROCESS_DONE,
  DOWNLOADING_ON_PROCESS_REQUEST,
  DOWNLOADING_ON_PROCESS_ERROR,
} from "../types/download";

export const downloadingReducer = (state = {}, action) => {
  const { type, payload } = action;

  switch (type) {
    case DOWNLOADING_ON_PROCESS_REQUEST:
      return {
        ...state,
        isLoading: true,
      };

    case DOWNLOADING_ON_PROCESS_DONE:
      return {
        ...state,
        isLoading: false,
        error: null,
      };

    case DOWNLOADING_ON_PROCESS_ERROR:
      return {
        ...state,
        isLoading: false,
        error: payload,
      };

    default:
      return state;
  }
};

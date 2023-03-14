import {
  GET_DASHBOARD_REPORTS_RESULT_FAIL,
  GET_DASHBOARD_REPORTS_RESULT_REQUEST,
  GET_DASHBOARD_REPORTS_RESULT_SUCCESS,
} from "../types/dashboard";

export const getDashboardReportsResultReducer = (state = {}, action) => {
  const { type, payload } = action;

  switch (type) {
    case GET_DASHBOARD_REPORTS_RESULT_REQUEST:
      return {
        ...state,
        isLoading: true,
      };

    case GET_DASHBOARD_REPORTS_RESULT_SUCCESS:
      return {
        ...state,
        isLoading: false,
        reports: payload,
        error: null,
      };

    case GET_DASHBOARD_REPORTS_RESULT_FAIL:
      return {
        ...state,
        isLoading: false,
        error: payload,
      };

    default:
      return state;
  }
};

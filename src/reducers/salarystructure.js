import {
  HR_CREATE_JUNIOR_STAFF_GRADE_REQUEST,
  HR_CREATE_JUNIOR_STAFF_GRADE_SUCCESS,
  HR_CREATE_JUNIOR_STAFF_GRADE_FAIL,
  HR_CREATE_JUNIOR_STAFF_GRADE_RESET,
  HR_CREATE_SENIOR_STAFF_GRADE_REQUEST,
  HR_CREATE_SENIOR_STAFF_GRADE_SUCCESS,
  HR_CREATE_MANAGEMENT_STAFF_GRADE_REQUEST,
  HR_CREATE_MANAGEMENT_STAFF_GRADE_SUCCESS,
  HR_CREATE_MANAGEMENT_STAFF_GRADE_FAIL,
  HR_CREATE_MANAGEMENT_STAFF_GRADE_RESET,
  HR_CREATE_SENIOR_STAFF_GRADE_RESET,
  HR_CREATE_SENIOR_STAFF_GRADE_FAIL,
  HR_CREATE_MIDDLE_STAFF_GRADE_RESET,
  HR_CREATE_MIDDLE_STAFF_GRADE_FAIL,
  HR_CREATE_MIDDLE_STAFF_GRADE_SUCCESS,
  HR_CREATE_MIDDLE_STAFF_GRADE_REQUEST,
  HR_CREATE_CONTRACT_STAFF_GRADE_RESET,
  HR_CREATE_CONTRACT_STAFF_GRADE_FAIL,
  HR_CREATE_CONTRACT_STAFF_GRADE_SUCCESS,
  HR_CREATE_CONTRACT_STAFF_GRADE_REQUEST,
} from "../types/salarystructrue";

export const hrCreateJuniorStaffGradeReducer = (state = {}, action) => {
  const { type, payload } = action;
  switch (type) {
    case HR_CREATE_JUNIOR_STAFF_GRADE_REQUEST:
      return {
        ...state,
        isLoading: true,
      };

    case HR_CREATE_JUNIOR_STAFF_GRADE_SUCCESS:
      return {
        ...state,
        isLoading: false,
        success: true,
        error: null,
      };

    case HR_CREATE_JUNIOR_STAFF_GRADE_FAIL:
      return {
        ...state,
        isLoading: false,
        error: payload,
        success: false,
      };

    case HR_CREATE_JUNIOR_STAFF_GRADE_RESET:
      return {};

    default:
      return state;
  }
};

export const hrCreateMiddleStaffGradeReducer = (state = {}, action) => {
  const { type, payload } = action;
  switch (type) {
    case HR_CREATE_MIDDLE_STAFF_GRADE_REQUEST:
      return {
        ...state,
        isLoading: true,
      };

    case HR_CREATE_MIDDLE_STAFF_GRADE_SUCCESS:
      return {
        ...state,
        isLoading: false,
        success: true,
        error: null,
      };

    case HR_CREATE_MIDDLE_STAFF_GRADE_FAIL:
      return {
        ...state,
        isLoading: false,
        error: payload,
        success: false,
      };

    case HR_CREATE_MIDDLE_STAFF_GRADE_RESET:
      return {};

    default:
      return state;
  }
};

export const hrCreateSeniorStaffGradeReducer = (state = {}, action) => {
  const { type, payload } = action;
  switch (type) {
    case HR_CREATE_SENIOR_STAFF_GRADE_REQUEST:
      return {
        ...state,
        isLoading: true,
      };

    case HR_CREATE_SENIOR_STAFF_GRADE_SUCCESS:
      return {
        ...state,
        isLoading: false,
        success: true,
        error: null,
      };

    case HR_CREATE_SENIOR_STAFF_GRADE_FAIL:
      return {
        ...state,
        isLoading: false,
        error: payload,
        success: false,
      };

    case HR_CREATE_SENIOR_STAFF_GRADE_RESET:
      return {};

    default:
      return state;
  }
};

export const hrCreateManagementStaffGradeReducer = (state = {}, action) => {
  const { type, payload } = action;
  switch (type) {
    case HR_CREATE_MANAGEMENT_STAFF_GRADE_REQUEST:
      return {
        ...state,
        isLoading: true,
      };

    case HR_CREATE_MANAGEMENT_STAFF_GRADE_SUCCESS:
      return {
        ...state,
        isLoading: false,
        success: true,
        error: null,
      };

    case HR_CREATE_MANAGEMENT_STAFF_GRADE_FAIL:
      return {
        ...state,
        isLoading: false,
        error: payload,
        success: false,
      };

    case HR_CREATE_MANAGEMENT_STAFF_GRADE_RESET:
      return {};

    default:
      return state;
  }
};

export const hrCreateContractStaffGradeReducer = (state = {}, action) => {
  const { type, payload } = action;
  switch (type) {
    case HR_CREATE_CONTRACT_STAFF_GRADE_REQUEST:
      return {
        ...state,
        isLoading: true,
      };

    case HR_CREATE_CONTRACT_STAFF_GRADE_SUCCESS:
      return {
        ...state,
        isLoading: false,
        success: true,
        error: null,
      };

    case HR_CREATE_CONTRACT_STAFF_GRADE_FAIL:
      return {
        ...state,
        isLoading: false,
        error: payload,
        success: false,
      };

    case HR_CREATE_CONTRACT_STAFF_GRADE_RESET:
      return {};

    default:
      return state;
  }
};

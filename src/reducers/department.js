import {
  GET_ALL_DEPARTMENTS_FAIL,
  GET_ALL_DEPARTMENTS_SUCCESS,
  GET_ALL_DEPARTMENTS_REQUEST,
  GET_ALL_DEPARTMENTS_RESET,
  GET_POSITION_BY_DEPARTMENT_FAIL,
  GET_POSITION_BY_DEPARTMENT_REQUEST,
  GET_POSITION_BY_DEPARTMENT_RESET,
  GET_POSITION_BY_DEPARTMENT_SUCCESS,
  ADMIN_CREATE_DEPARTMENT_FAIL,
  ADMIN_CREATE_DEPARTMENT_REQUEST,
  ADMIN_CREATE_DEPARTMENT_RESET,
  ADMIN_CREATE_DEPARTMENT_SUCCESS,
  ADMIN_DELETE_DEPARTMENT_BY_ID_FAIL,
  ADMIN_DELETE_DEPARTMENT_BY_ID_REQUEST,
  ADMIN_DELETE_DEPARTMENT_BY_ID_RESET,
  ADMIN_DELETE_DEPARTMENT_BY_ID_SUCCESS,
  ADMIN_UPDATE_DEPARTMENT_BY_ID_FAIL,
  ADMIN_UPDATE_DEPARTMENT_BY_ID_REQUEST,
  ADMIN_UPDATE_DEPARTMENT_BY_ID_RESET,
  ADMIN_UPDATE_DEPARTMENT_BY_ID_SUCCESS,
} from "../types/department";

export const getAllDepartmentReducer = (state = {}, action) => {
  const { type, payload } = action;

  switch (type) {
    case GET_ALL_DEPARTMENTS_REQUEST:
      return {
        ...state,
        isLoading: true,
      };

    case GET_ALL_DEPARTMENTS_SUCCESS:
      return {
        ...state,
        isLoading: false,
        departments: payload.departments,
        error: null,
      };

    case GET_ALL_DEPARTMENTS_FAIL:
      return {
        ...state,
        isLoading: false,
        error: payload,
      };

    case GET_ALL_DEPARTMENTS_RESET:
      return {};

    default:
      return state;
  }
};

export const getPositionByDepartmentReducer = (state = {}, action) => {
  const { type, payload } = action;

  switch (type) {
    case GET_POSITION_BY_DEPARTMENT_REQUEST:
      return {
        ...state,
        isLoading: true,
      };

    case GET_POSITION_BY_DEPARTMENT_SUCCESS:
      return {
        ...state,
        isLoading: false,
        positions: payload.positions,
        error: null,
      };

    case GET_POSITION_BY_DEPARTMENT_FAIL:
      return {
        ...state,
        isLoading: false,
        error: payload,
      };

    case GET_POSITION_BY_DEPARTMENT_RESET:
      return {};

    default:
      return state;
  }
};

export const adminCreateDepartmentReducer = (state = {}, action) => {
  const { type, payload } = action;

  switch (type) {
    case ADMIN_CREATE_DEPARTMENT_REQUEST:
      return {
        ...state,
        isLoading: true,
      };

    case ADMIN_CREATE_DEPARTMENT_SUCCESS:
      return {
        ...state,
        isLoading: false,
        success: true,
        error: null,
      };

    case ADMIN_CREATE_DEPARTMENT_FAIL:
      return {
        ...state,
        isLoading: false,
        error: payload,
      };

    case ADMIN_CREATE_DEPARTMENT_RESET:
      return {};

    default:
      return state;
  }
};

export const adminUpdateDepartmentByIdReducer = (state = {}, action) => {
  const { type, payload } = action;

  switch (type) {
    case ADMIN_UPDATE_DEPARTMENT_BY_ID_REQUEST:
      return {
        ...state,
        isLoading: true,
      };

    case ADMIN_UPDATE_DEPARTMENT_BY_ID_SUCCESS:
      return {
        ...state,
        isLoading: false,
        success: true,
        error: null,
      };

    case ADMIN_UPDATE_DEPARTMENT_BY_ID_FAIL:
      return {
        ...state,
        isLoading: false,
        error: payload,
      };

    case ADMIN_UPDATE_DEPARTMENT_BY_ID_RESET:
      return {};

    default:
      return state;
  }
};

export const adminDeleteDepartmentByIdReducer = (state = {}, action) => {
  const { type, payload } = action;

  switch (type) {
    case ADMIN_DELETE_DEPARTMENT_BY_ID_REQUEST:
      return {
        ...state,
        isLoading: true,
      };

    case ADMIN_DELETE_DEPARTMENT_BY_ID_SUCCESS:
      return {
        ...state,
        isLoading: false,
        success: true,
        error: null,
      };

    case ADMIN_DELETE_DEPARTMENT_BY_ID_FAIL:
      return {
        ...state,
        isLoading: false,
        error: payload,
      };

    case ADMIN_DELETE_DEPARTMENT_BY_ID_RESET:
      return {};

    default:
      return state;
  }
};

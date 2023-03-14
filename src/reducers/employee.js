import {
  ADMIN_CREATE_EMPLOYEE_FAIL,
  ADMIN_CREATE_EMPLOYEE_REQUEST,
  ADMIN_CREATE_EMPLOYEE_RESET,
  ADMIN_CREATE_EMPLOYEE_SUCCESS,
  ADMIN_GET_ALL_EMPLOYEE_FAIL,
  ADMIN_GET_ALL_EMPLOYEE_REQUEST,
  ADMIN_GET_ALL_EMPLOYEE_SUCCESS,
  ADMIN_UPDATE_EMPLOYEE_BY_ID_FAIL,
  ADMIN_UPDATE_EMPLOYEE_BY_ID_REQUEST,
  ADMIN_UPDATE_EMPLOYEE_BY_ID_RESET,
  ADMIN_UPDATE_EMPLOYEE_BY_ID_SUCCESS,
  ADMIN_DELETE_EMPLOYEE_BY_ID_FAIL,
  ADMIN_DELETE_EMPLOYEE_BY_ID_REQUEST,
  ADMIN_DELETE_EMPLOYEE_BY_ID_RESET,
  ADMIN_DELETE_EMPLOYEE_BY_ID_SUCCESS,
  ADMIN_EMPLOYEE_TOPUP_FAIL,
  ADMIN_EMPLOYEE_TOPUP_REQUEST,
  ADMIN_EMPLOYEE_TOPUP_RESET,
  ADMIN_EMPLOYEE_TOPUP_SUCCESS,
  ADMIN_DELETE_EMPLOYEE_ALLOWANCE_BY_ID_FAIL,
  ADMIN_DELETE_EMPLOYEE_ALLOWANCE_BY_ID_REQUEST,
  ADMIN_DELETE_EMPLOYEE_ALLOWANCE_BY_ID_RESET,
  ADMIN_DELETE_EMPLOYEE_ALLOWANCE_BY_ID_SUCCESS,
  ADMIN_DELETE_EMPLOYEE_DEDUCTION_BY_ID_FAIL,
  ADMIN_DELETE_EMPLOYEE_DEDUCTION_BY_ID_REQUEST,
  ADMIN_DELETE_EMPLOYEE_DEDUCTION_BY_ID_RESET,
  ADMIN_DELETE_EMPLOYEE_DEDUCTION_BY_ID_SUCCESS,
  ADMIN_DELETE_BULK_EMPLOYEES_BY_IDS_FAIL,
  ADMIN_DELETE_BULK_EMPLOYEES_BY_IDS_REQUEST,
  ADMIN_DELETE_BULK_EMPLOYEES_BY_IDS_RESET,
  ADMIN_DELETE_BULK_EMPLOYEES_BY_IDS_SUCCESS,
  ADMIN_GET_ALL_EMPLOYEE_RESET,
  ADMIN_CREATE_BULK_EMPLOYEE_FAIL,
  ADMIN_CREATE_BULK_EMPLOYEE_REQUEST,
  ADMIN_CREATE_BULK_EMPLOYEE_RESET,
  ADMIN_CREATE_BULK_EMPLOYEE_SUCCESS,
  HR_UPLOAD_CONTRACT_EMPLOYEE_REQUEST,
  HR_UPLOAD_CONTRACT_EMPLOYEE_SUCCESS,
  HR_UPLOAD_CONTRACT_EMPLOYEE_FAIL,
  HR_UPLOAD_CONTRACT_EMPLOYEE_RESET,
  EMPLOYEE_GET_ALL_PAYSLIPS_FAIL,
  EMPLOYEE_GET_ALL_PAYSLIPS_REQUEST,
  EMPLOYEE_GET_ALL_PAYSLIPS_SUCCESS,
  EMPLOYEE_GET_PERSONAL_DETAILS_FAIL,
  EMPLOYEE_GET_PERSONAL_DETAILS_REQUEST,
  EMPLOYEE_GET_PERSONAL_DETAILS_SUCCESS,
} from "../types/employee";

export const adminCreateEmployeeReducer = (state = {}, action) => {
  const { type, payload } = action;

  switch (type) {
    case ADMIN_CREATE_EMPLOYEE_REQUEST:
      return {
        ...state,
        isLoading: true,
      };

    case ADMIN_CREATE_EMPLOYEE_SUCCESS:
      return {
        ...state,
        isLoading: false,
        success: true,
        error: null,
      };

    case ADMIN_CREATE_EMPLOYEE_FAIL:
      return {
        ...state,
        isLoading: false,
        error: payload,
      };

    case ADMIN_CREATE_EMPLOYEE_RESET:
      return {};

    default:
      return state;
  }
};

export const adminCreateBulkEmployeeReducer = (state = {}, action) => {
  const { type, payload } = action;

  switch (type) {
    case ADMIN_CREATE_BULK_EMPLOYEE_REQUEST:
      return {
        ...state,
        isLoading: true,
      };

    case ADMIN_CREATE_BULK_EMPLOYEE_SUCCESS:
      return {
        ...state,
        isLoading: false,
        success: true,
        error: null,
      };

    case ADMIN_CREATE_BULK_EMPLOYEE_FAIL:
      return {
        ...state,
        isLoading: false,
        error: payload,
      };

    case ADMIN_CREATE_BULK_EMPLOYEE_RESET:
      return {};

    default:
      return state;
  }
};

export const hrUploadContractEmployeeReducer = (state = {}, action) => {
  const { type, payload } = action;

  switch (type) {
    case HR_UPLOAD_CONTRACT_EMPLOYEE_REQUEST:
      return {
        ...state,
        isLoading: true,
      };

    case HR_UPLOAD_CONTRACT_EMPLOYEE_SUCCESS:
      return {
        ...state,
        isLoading: false,
        success: true,
        error: null,
      };

    case HR_UPLOAD_CONTRACT_EMPLOYEE_FAIL:
      return {
        ...state,
        isLoading: false,
        success: false,
        error: payload,
      };

    case HR_UPLOAD_CONTRACT_EMPLOYEE_RESET:
      return {};

    default:
      return state;
  }
};

export const adminUpdateEmployeeByIdReducer = (state = {}, action) => {
  const { type, payload } = action;
  switch (type) {
    case ADMIN_UPDATE_EMPLOYEE_BY_ID_REQUEST:
      return {
        ...state,
        isLoading: true,
      };

    case ADMIN_UPDATE_EMPLOYEE_BY_ID_SUCCESS:
      return {
        ...state,
        isLoading: false,
        success: true,
        error: null,
      };

    case ADMIN_UPDATE_EMPLOYEE_BY_ID_FAIL:
      return {
        ...state,
        isLoading: false,
        error: payload,
      };

    case ADMIN_UPDATE_EMPLOYEE_BY_ID_RESET:
      return {};

    default:
      return state;
  }
};

export const adminDeleteEmployeeByIdReducer = (state = {}, action) => {
  const { type, payload } = action;
  switch (type) {
    case ADMIN_DELETE_EMPLOYEE_BY_ID_REQUEST:
      return {
        ...state,
        isLoading: true,
      };

    case ADMIN_DELETE_EMPLOYEE_BY_ID_SUCCESS:
      return {
        ...state,
        isLoading: false,
        success: true,
        error: null,
      };

    case ADMIN_DELETE_EMPLOYEE_BY_ID_FAIL:
      return {
        ...state,
        isLoading: false,
        error: payload,
      };

    case ADMIN_DELETE_EMPLOYEE_BY_ID_RESET:
      return {};

    default:
      return state;
  }
};

export const adminDeleteBulkEmployeesByIdsReducer = (state = {}, action) => {
  const { type, payload } = action;

  switch (type) {
    case ADMIN_DELETE_BULK_EMPLOYEES_BY_IDS_REQUEST:
      return {
        ...state,
        isLoading: true,
      };

    case ADMIN_DELETE_BULK_EMPLOYEES_BY_IDS_SUCCESS:
      return {
        ...state,
        isLoading: false,
        success: true,
        error: null,
      };

    case ADMIN_DELETE_BULK_EMPLOYEES_BY_IDS_FAIL:
      return {
        ...state,
        isLoading: false,
        error: payload,
      };

    case ADMIN_DELETE_BULK_EMPLOYEES_BY_IDS_RESET:
      return {};

    default:
      return state;
  }
};

export const adminGetAllEmployeeReducer = (state = {}, action) => {
  const { type, payload } = action;

  switch (type) {
    case ADMIN_GET_ALL_EMPLOYEE_REQUEST:
      return {
        ...state,
        isLoading: true,
      };

    case ADMIN_GET_ALL_EMPLOYEE_SUCCESS:
      return {
        ...state,
        isLoading: false,
        employees: payload.employees,
        error: null,
      };

    case ADMIN_GET_ALL_EMPLOYEE_FAIL:
      return {
        ...state,
        isLoading: false,
        error: payload,
      };

    case ADMIN_GET_ALL_EMPLOYEE_RESET:
      return {};

    default:
      return state;
  }
};

export const adminEmployeeTopUpReducer = (state = {}, action) => {
  const { type, payload } = action;

  switch (type) {
    case ADMIN_EMPLOYEE_TOPUP_REQUEST:
      return {
        ...state,
        isLoading: true,
      };

    case ADMIN_EMPLOYEE_TOPUP_SUCCESS:
      return {
        ...state,
        isLoading: false,
        success: true,
        error: null,
      };

    case ADMIN_EMPLOYEE_TOPUP_FAIL:
      return {
        ...state,
        isLoading: false,
        error: payload,
      };

    case ADMIN_EMPLOYEE_TOPUP_RESET:
      return {};

    default:
      return state;
  }
};

export const adminDeleteEmployeeAllowanceByIdReducer = (state = {}, action) => {
  const { type, payload } = action;

  switch (type) {
    case ADMIN_DELETE_EMPLOYEE_ALLOWANCE_BY_ID_REQUEST:
      return {
        ...state,
        isLoading: true,
      };

    case ADMIN_DELETE_EMPLOYEE_ALLOWANCE_BY_ID_SUCCESS:
      return {
        ...state,
        isLoading: false,
        success: true,
        error: null,
      };

    case ADMIN_DELETE_EMPLOYEE_ALLOWANCE_BY_ID_FAIL:
      return {
        ...state,
        isLoading: false,
        error: payload,
      };

    case ADMIN_DELETE_EMPLOYEE_ALLOWANCE_BY_ID_RESET:
      return {};

    default:
      return state;
  }
};

export const adminDeleteEmployeeDeductionByIdReducer = (state = {}, action) => {
  const { type, payload } = action;

  switch (type) {
    case ADMIN_DELETE_EMPLOYEE_DEDUCTION_BY_ID_REQUEST:
      return {
        ...state,
        isLoading: true,
      };

    case ADMIN_DELETE_EMPLOYEE_DEDUCTION_BY_ID_SUCCESS:
      return {
        ...state,
        isLoading: false,
        success: true,
        error: null,
      };

    case ADMIN_DELETE_EMPLOYEE_DEDUCTION_BY_ID_FAIL:
      return {
        ...state,
        isLoading: false,
        error: payload,
      };

    case ADMIN_DELETE_EMPLOYEE_DEDUCTION_BY_ID_RESET:
      return {};

    default:
      return state;
  }
};

export const employeeGetAllPayslipsReducer = (state = {}, action) => {
  const { type, payload } = action;
  switch (type) {
    case EMPLOYEE_GET_ALL_PAYSLIPS_REQUEST:
      return {
        ...state,
        isLoading: true,
      };

    case EMPLOYEE_GET_ALL_PAYSLIPS_SUCCESS:
      return {
        ...state,
        isLoading: false,
        employeePayslips: payload.employeePayslips,
        error: null,
      };

    case EMPLOYEE_GET_ALL_PAYSLIPS_FAIL:
      return {
        ...state,
        isLoading: false,
        error: payload,
      };

    default:
      return state;
  }
};

export const employeeGetPersonalDetailsReducer = (state = {}, action) => {
  const { type, payload } = action;
  switch (type) {
    case EMPLOYEE_GET_PERSONAL_DETAILS_REQUEST:
      return {
        ...state,
        isLoading: true,
      };

    case EMPLOYEE_GET_PERSONAL_DETAILS_SUCCESS:
      return {
        ...state,
        isLoading: false,
        employeeInfo: payload.employee,
        error: null,
      };

    case EMPLOYEE_GET_PERSONAL_DETAILS_FAIL:
      return {
        ...state,
        isLoading: false,
        error: payload,
      };

    default:
      return state;
  }
};

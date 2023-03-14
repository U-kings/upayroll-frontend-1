import {
  AUDITOR_GET_NOT_APPROVED_GENERATED_LOANS_FAIL,
  AUDITOR_GET_NOT_APPROVED_GENERATED_LOANS_REQUEST,
  AUDITOR_GET_NOT_APPROVED_GENERATED_LOANS_SUCCESS,
  AUDITOR_REJECT_NOT_APPROVED_GENERATED_LOANS_FAIL,
  AUDITOR_REJECT_NOT_APPROVED_GENERATED_LOANS_REQUEST,
  AUDITOR_REJECT_NOT_APPROVED_GENERATED_LOANS_RESET,
  AUDITOR_REJECT_NOT_APPROVED_GENERATED_LOANS_SUCCESS,
  AUDITOR_SET_PRE_APPROVED_GENERATED_LOANS_FAIL,
  AUDITOR_SET_PRE_APPROVED_GENERATED_LOANS_REQUEST,
  AUDITOR_SET_PRE_APPROVED_GENERATED_LOANS_RESET,
  AUDITOR_SET_PRE_APPROVED_GENERATED_LOANS_SUCCESS,
  CEO_GET_APPROVED_GENERATED_LOANS_FAIL,
  CEO_GET_APPROVED_GENERATED_LOANS_REQUEST,
  CEO_GET_APPROVED_GENERATED_LOANS_SUCCESS,
  CEO_GET_PRE_APPROVED_GENERATED_LOANS_FAIL,
  CEO_GET_PRE_APPROVED_GENERATED_LOANS_REQUEST,
  CEO_GET_PRE_APPROVED_GENERATED_LOANS_SUCCESS,
  CEO_REJECT_PRE_APPROVED_GENERATED_LOANS_FAIL,
  CEO_REJECT_PRE_APPROVED_GENERATED_LOANS_REQUEST,
  CEO_REJECT_PRE_APPROVED_GENERATED_LOANS_RESET,
  CEO_REJECT_PRE_APPROVED_GENERATED_LOANS_SUCCESS,
  CEO_SET_APPROVED_GENERATED_LOANS_FAIL,
  CEO_SET_APPROVED_GENERATED_LOANS_REQUEST,
  CEO_SET_APPROVED_GENERATED_LOANS_RESET,
  CEO_SET_APPROVED_GENERATED_LOANS_SUCCESS,
  EMPLOYEE_ASK_FOR_LOAN_FAIL,
  EMPLOYEE_ASK_FOR_LOAN_REQUEST,
  EMPLOYEE_ASK_FOR_LOAN_RESET,
  EMPLOYEE_ASK_FOR_LOAN_SUCCESS,
  HR_GET_ALL_GENERATED_LOANS_FAIL,
  HR_GET_ALL_GENERATED_LOANS_REQUEST,
  HR_GET_ALL_GENERATED_LOANS_SUCCESS,
  HR_APPROVES_GENERATED_LOANS_FAIL,
  HR_APPROVES_GENERATED_LOANS_REQUEST,
  HR_APPROVES_GENERATED_LOANS_RESET,
  HR_APPROVES_GENERATED_LOANS_SUCCESS,
  HR_BULK_DELETE_EMPLOYEE_LOANS_FAIL,
  HR_BULK_DELETE_EMPLOYEE_LOANS_REQUEST,
  HR_BULK_DELETE_EMPLOYEE_LOANS_RESET,
  HR_BULK_DELETE_EMPLOYEE_LOANS_SUCCESS,
  HR_DELETE_EMPLOYEE_LOAN_BY_ID_FAIL,
  HR_DELETE_EMPLOYEE_LOAN_BY_ID_REQUEST,
  HR_DELETE_EMPLOYEE_LOAN_BY_ID_RESET,
  HR_DELETE_EMPLOYEE_LOAN_BY_ID_SUCCESS,
  HR_GET_REJECTED_GENERATED_LOANS_FAIL,
  HR_GET_REJECTED_GENERATED_LOANS_REQUEST,
  HR_GET_REJECTED_GENERATED_LOANS_SUCCESS,
  EMPLOYEE_GET_GENERATED_LOANS_FAIL,
  EMPLOYEE_GET_GENERATED_LOANS_REQUEST,
  EMPLOYEE_GET_GENERATED_LOANS_SUCCESS,
} from "../types/employeeloan";

export const hrGetGeneratedEmployeeLoansReducer = (state = {}, action) => {
  const { type, payload } = action;

  switch (type) {
    case HR_GET_ALL_GENERATED_LOANS_REQUEST:
    case HR_GET_REJECTED_GENERATED_LOANS_REQUEST:
      return {
        ...state,
        isLoading: true,
      };

    case HR_GET_ALL_GENERATED_LOANS_SUCCESS:
    case HR_GET_REJECTED_GENERATED_LOANS_SUCCESS:
      return {
        ...state,
        isLoading: false,
        empLoans: payload,
        error: null,
      };

    case HR_GET_ALL_GENERATED_LOANS_FAIL:
    case HR_GET_REJECTED_GENERATED_LOANS_FAIL:
      return {
        ...state,
        isLoading: false,
        error: payload,
      };

    default:
      return state;
  }
};

export const hrApprovesEmployeeRequestLoanReducer = (state = {}, action) => {
  const { type, payload } = action;

  switch (type) {
    case HR_APPROVES_GENERATED_LOANS_REQUEST:
      return {
        ...state,
        isLoading: true,
      };

    case HR_APPROVES_GENERATED_LOANS_SUCCESS:
      return {
        ...state,
        isLoading: false,
        success: true,
        error: null,
      };

    case HR_APPROVES_GENERATED_LOANS_FAIL:
      return {
        ...state,
        isLoading: false,
        error: payload,
      };

    case HR_APPROVES_GENERATED_LOANS_RESET:
      return {};

    default:
      return state;
  }
};

export const hrDeleteEmployeeLoanByIdReducer = (state = {}, action) => {
  const { type, payload } = action;

  switch (type) {
    case HR_DELETE_EMPLOYEE_LOAN_BY_ID_REQUEST:
      return {
        ...state,
        isLoading: true,
      };

    case HR_DELETE_EMPLOYEE_LOAN_BY_ID_SUCCESS:
      return {
        ...state,
        isLoading: false,
        success: true,
        error: null,
      };

    case HR_DELETE_EMPLOYEE_LOAN_BY_ID_FAIL:
      return {
        ...state,
        isLoading: false,
        error: payload,
      };

    case HR_DELETE_EMPLOYEE_LOAN_BY_ID_RESET:
      return {};

    default:
      return state;
    // break;
  }
};

export const hrBulkDeleteGeneratedEmployeeLoansReducer = (
  state = {},
  action
) => {
  const { type, payload } = action;

  switch (type) {
    case HR_BULK_DELETE_EMPLOYEE_LOANS_REQUEST:
      return {
        ...state,
        isLoading: true,
      };

    case HR_BULK_DELETE_EMPLOYEE_LOANS_SUCCESS:
      return {
        ...state,
        isLoading: false,
        success: true,
        error: null,
      };

    case HR_BULK_DELETE_EMPLOYEE_LOANS_FAIL:
      return {
        ...state,
        isLoading: false,
        error: payload,
      };

    case HR_BULK_DELETE_EMPLOYEE_LOANS_RESET:
      return {};

    default:
      return state;
    // break;
  }
};

export const auditorGetNotApprovedGeneratedEmployeeLoansReducer = (
  state = {},
  action
) => {
  const { type, payload } = action;

  switch (type) {
    case AUDITOR_GET_NOT_APPROVED_GENERATED_LOANS_REQUEST:
      return {
        ...state,
        isLoading: true,
      };

    case AUDITOR_GET_NOT_APPROVED_GENERATED_LOANS_SUCCESS:
      return {
        ...state,
        isLoading: false,
        empLoans: payload,
        error: null,
      };

    case AUDITOR_GET_NOT_APPROVED_GENERATED_LOANS_FAIL:
      return {
        ...state,
        isLoading: false,
        error: payload,
      };

    default:
      return state;
  }
};

export const auditorSetPreApprovedGeneratedEmployeeLoanReducer = (
  state = {},
  action
) => {
  const { type, payload } = action;

  switch (type) {
    case AUDITOR_SET_PRE_APPROVED_GENERATED_LOANS_REQUEST:
      return {
        ...state,
        isLoading: true,
      };

    case AUDITOR_SET_PRE_APPROVED_GENERATED_LOANS_SUCCESS:
      return {
        ...state,
        isLoading: false,
        success: true,
        error: null,
      };

    case AUDITOR_SET_PRE_APPROVED_GENERATED_LOANS_FAIL:
      return {
        ...state,
        isLoading: false,
        error: payload,
      };

    case AUDITOR_SET_PRE_APPROVED_GENERATED_LOANS_RESET:
      return {};

    default:
      return state;
  }
};

export const auditorRejectNotApprovedGeneratedEmployeeLoansReducer = (
  state = {},
  action
) => {
  const { type, payload } = action;

  switch (type) {
    case AUDITOR_REJECT_NOT_APPROVED_GENERATED_LOANS_REQUEST:
      return {
        ...state,
        isLoading: true,
      };

    case AUDITOR_REJECT_NOT_APPROVED_GENERATED_LOANS_SUCCESS:
      return {
        ...state,
        isLoading: false,
        success: true,
        error: null,
      };

    case AUDITOR_REJECT_NOT_APPROVED_GENERATED_LOANS_FAIL:
      return {
        ...state,
        isLoading: false,
        error: payload,
      };

    case AUDITOR_REJECT_NOT_APPROVED_GENERATED_LOANS_RESET:
      return {};

    default:
      return state;
  }
};

export const ceoGetPreApprovedAndApprovedGeneratedEmployeeLoansReducer = (
  state = {},
  action
) => {
  const { type, payload } = action;

  switch (type) {
    case CEO_GET_APPROVED_GENERATED_LOANS_REQUEST:
    case CEO_GET_PRE_APPROVED_GENERATED_LOANS_REQUEST:
      return {
        ...state,
        isLoading: true,
      };

    case CEO_GET_APPROVED_GENERATED_LOANS_SUCCESS:
    case CEO_GET_PRE_APPROVED_GENERATED_LOANS_SUCCESS:
      return {
        ...state,
        isLoading: false,
        empLoans: payload,
        error: null,
      };

    case CEO_GET_APPROVED_GENERATED_LOANS_FAIL:
    case CEO_GET_PRE_APPROVED_GENERATED_LOANS_FAIL:
      return {
        ...state,
        isLoading: false,
        error: payload,
      };

    default:
      return state;
  }
};

export const ceoSetApprovedGeneratedEmployeeLoansReducer = (
  state = {},
  action
) => {
  const { type, payload } = action;

  switch (type) {
    case CEO_SET_APPROVED_GENERATED_LOANS_REQUEST:
      return {
        ...state,
        isLoading: true,
      };

    case CEO_SET_APPROVED_GENERATED_LOANS_SUCCESS:
      return {
        ...state,
        isLoading: false,
        success: true,
        error: null,
      };

    case CEO_SET_APPROVED_GENERATED_LOANS_FAIL:
      return {
        ...state,
        isLoading: false,
        error: payload,
      };

    case CEO_SET_APPROVED_GENERATED_LOANS_RESET:
      return {};

    default:
      return state;
  }
};

export const ceoRejectPreApprovedGeneratedEmployeeLoansReducer = (
  state = {},
  action
) => {
  const { type, payload } = action;

  switch (type) {
    case CEO_REJECT_PRE_APPROVED_GENERATED_LOANS_REQUEST:
      return {
        ...state,
        isLoading: true,
      };

    case CEO_REJECT_PRE_APPROVED_GENERATED_LOANS_SUCCESS:
      return {
        ...state,
        isLoading: false,
        success: true,
        error: null,
      };

    case CEO_REJECT_PRE_APPROVED_GENERATED_LOANS_FAIL:
      return {
        ...state,
        isLoading: false,
        error: payload,
      };

    case CEO_REJECT_PRE_APPROVED_GENERATED_LOANS_RESET:
      return {};

    default:
      return state;
  }
};

export const employeeGetAllGeneratedLoansRequestReducer = (
  state = {},
  action
) => {
  const { type, payload } = action;

  switch (type) {
    case EMPLOYEE_GET_GENERATED_LOANS_REQUEST:
      return {
        ...state,
        isLoading: true,
      };

    case EMPLOYEE_GET_GENERATED_LOANS_SUCCESS:
      return {
        ...state,
        isLoading: false,
        empLoans: payload,
        error: null,
      };

    case EMPLOYEE_GET_GENERATED_LOANS_FAIL:
      return {
        ...state,
        isLoading: false,
        error: payload,
      };

    default:
      return state;
    // break;
  }
};

export const employeeAskForLoanRequestReducer = (state = {}, action) => {
  const { type, payload } = action;

  switch (type) {
    case EMPLOYEE_ASK_FOR_LOAN_REQUEST:
      return {
        ...state,
        isLoading: true,
      };

    case EMPLOYEE_ASK_FOR_LOAN_SUCCESS:
      return {
        ...state,
        isLoading: false,
        success: true,
        error: null,
      };

    case EMPLOYEE_ASK_FOR_LOAN_FAIL:
      return {
        ...state,
        isLoading: false,
        error: payload,
      };

    case EMPLOYEE_ASK_FOR_LOAN_RESET:
      return {};

    default:
      return state;
  }
};

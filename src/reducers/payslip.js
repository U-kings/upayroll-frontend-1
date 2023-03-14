import {
  GENERATE_PAYSLIP_FAIL,
  GENERATE_PAYSLIP_REQUEST,
  GENERATE_PAYSLIP_RESET,
  GENERATE_PAYSLIP_SUCCESS,
  GET_ALL_GENERATED_PAYSLIP_FAIL,
  GET_ALL_GENERATED_PAYSLIP_REQUEST,
  GET_ALL_GENERATED_PAYSLIP_SUCCESS,
  DELETE_GENERATED_PAYSLIP_BY_ID_FAIL,
  DELETE_GENERATED_PAYSLIP_BY_ID_REQUEST,
  DELETE_GENERATED_PAYSLIP_BY_ID_RESET,
  DELETE_GENERATED_PAYSLIP_BY_ID_SUCCESS,
  ADMIN_GENERATE_BULK_PAYSLIPS_FAIL,
  ADMIN_GENERATE_BULK_PAYSLIPS_REQUEST,
  ADMIN_GENERATE_BULK_PAYSLIPS_RESET,
  ADMIN_GENERATE_BULK_PAYSLIPS_SUCCESS,
  ADMIN_DELETE_BULK_PAYSLIPS_FAIL,
  ADMIN_DELETE_BULK_PAYSLIPS_REQUEST,
  ADMIN_DELETE_BULK_PAYSLIPS_RESET,
  ADMIN_DELETE_BULK_PAYSLIPS_SUCCESS,
  GET_ALL_GENERATED_PAYSLIP_RESET,
  HR_GET_REJECTED_PAYSLIPS_FAIL,
  HR_GET_REJECTED_PAYSLIPS_REQUEST,
  HR_GET_REJECTED_PAYSLIPS_SUCCESS,
  HR_SET_NOT_APPROVED_GENERATED_PAYSLIPS_FAIL,
  HR_SET_NOT_APPROVED_GENERATED_PAYSLIPS_REQUEST,
  HR_SET_NOT_APPROVED_GENERATED_PAYSLIPS_RESET,
  HR_SET_NOT_APPROVED_GENERATED_PAYSLIPS_SUCCESS,
  HR_GET_REJECTED_PAYSLIPS_RESET,
  AUDITOR_GET_NOT_APPROVED_SALARYSLIPS_FAIL,
  AUDITOR_GET_NOT_APPROVED_SALARYSLIPS_REQUEST,
  AUDITOR_GET_NOT_APPROVED_SALARYSLIPS_SUCCESS,
  AUDITOR_SET_PRE_APPROVED_GENERATED_PAYSLIPS_FAIL,
  AUDITOR_SET_PRE_APPROVED_GENERATED_PAYSLIPS_REQUEST,
  AUDITOR_SET_PRE_APPROVED_GENERATED_PAYSLIPS_RESET,
  AUDITOR_SET_PRE_APPROVED_GENERATED_PAYSLIPS_SUCCESS,
  AUDITOR_GET_NOT_APPROVED_SALARYSLIPS_RESET,
  CEO_GET_PRE_APPROVED_SALARYSLIPS_FAIL,
  CEO_GET_PRE_APPROVED_SALARYSLIPS_REQUEST,
  CEO_GET_PRE_APPROVED_SALARYSLIPS_SUCCESS,
  CEO_SET_APPROVED_GENERATED_PAYSLIPS_FAIL,
  CEO_SET_APPROVED_GENERATED_PAYSLIPS_REQUEST,
  CEO_SET_APPROVED_GENERATED_PAYSLIPS_RESET,
  CEO_SET_APPROVED_GENERATED_PAYSLIPS_SUCCESS,
  CEO_GET_APPROVED_SALARYSLIPS_FAIL,
  CEO_GET_APPROVED_SALARYSLIPS_REQUEST,
  CEO_GET_APPROVED_SALARYSLIPS_SUCCESS,
  ACCOUNTANT_GET_APPROVED_SALARYSLIPS_FAIL,
  ACCOUNTANT_GET_APPROVED_SALARYSLIPS_REQUEST,
  ACCOUNTANT_GET_APPROVED_SALARYSLIPS_SUCCESS,
  AUDITOR_REJECT_NOT_APPROVED_PAYSLIPS_FAIL,
  AUDITOR_REJECT_NOT_APPROVED_PAYSLIPS_REQUEST,
  AUDITOR_REJECT_NOT_APPROVED_PAYSLIPS_RESET,
  AUDITOR_REJECT_NOT_APPROVED_PAYSLIPS_SUCCESS,
  CEO_REJECT_PRE_APPROVED_PAYSLIPS_FAIL,
  CEO_REJECT_PRE_APPROVED_PAYSLIPS_REQUEST,
  CEO_REJECT_PRE_APPROVED_PAYSLIPS_RESET,
  CEO_REJECT_PRE_APPROVED_PAYSLIPS_SUCCESS,
  AUDITOR_AND_CEO_REJECT_EXCEL_PAYSLIPS_FAIL,
  AUDITOR_AND_CEO_REJECT_EXCEL_PAYSLIPS_REQUEST,
  AUDITOR_AND_CEO_REJECT_EXCEL_PAYSLIPS_RESET,
  AUDITOR_AND_CEO_REJECT_EXCEL_PAYSLIPS_SUCCESS,
} from "../types/payslip";

export const getAllGeneratedPayslipReducer = (state = {}, action) => {
  const { type, payload } = action;

  switch (type) {
    case GET_ALL_GENERATED_PAYSLIP_REQUEST:
    case HR_GET_REJECTED_PAYSLIPS_REQUEST:
      return {
        ...state,
        isLoading: true,
      };

    case GET_ALL_GENERATED_PAYSLIP_SUCCESS:
    case HR_GET_REJECTED_PAYSLIPS_SUCCESS:
      return {
        ...state,
        isLoading: false,
        paySlips: payload.paySlips,
        error: null,
      };

    case GET_ALL_GENERATED_PAYSLIP_FAIL:
    case HR_GET_REJECTED_PAYSLIPS_FAIL:
      return {
        ...state,
        isLoading: false,
        error: payload,
      };

    case GET_ALL_GENERATED_PAYSLIP_RESET:
    case HR_GET_REJECTED_PAYSLIPS_RESET:
      return {};

    default:
      return state;
  }
};

export const accountantGetApprovedSalaryslipsReducer = (state = {}, action) => {
  const { type, payload } = action;

  switch (type) {
    case ACCOUNTANT_GET_APPROVED_SALARYSLIPS_REQUEST:
      return {
        ...state,
        isLoading: true,
      };

    case ACCOUNTANT_GET_APPROVED_SALARYSLIPS_SUCCESS:
      return {
        ...state,
        isLoading: false,
        payslips: payload,
        error: null,
      };

    case ACCOUNTANT_GET_APPROVED_SALARYSLIPS_FAIL:
      return {
        ...state,
        isLoading: false,
        error: payload,
      };

    default:
      return state;
  }
};

export const auditorGetNotApprovedReducer = (state = {}, action) => {
  const { type, payload } = action;

  switch (type) {
    case AUDITOR_GET_NOT_APPROVED_SALARYSLIPS_REQUEST:
      return {
        ...state,
        isLoading: true,
      };

    case AUDITOR_GET_NOT_APPROVED_SALARYSLIPS_SUCCESS:
      return {
        ...state,
        isLoading: false,
        notapproved: payload.notapproved,
        error: null,
      };

    case AUDITOR_GET_NOT_APPROVED_SALARYSLIPS_FAIL:
      return {
        ...state,
        isLoading: false,
        error: payload,
      };

    case AUDITOR_GET_NOT_APPROVED_SALARYSLIPS_RESET:
      return {};
    default:
      return state;
  }
};

export const auditorSetPreApprovedPayslipsReducer = (state = {}, action) => {
  const { type, payload } = action;

  switch (type) {
    case AUDITOR_SET_PRE_APPROVED_GENERATED_PAYSLIPS_REQUEST:
      return {
        ...state,
        isLoading: true,
      };

    case AUDITOR_SET_PRE_APPROVED_GENERATED_PAYSLIPS_SUCCESS:
      return {
        ...state,
        isLoading: false,
        success: true,
        error: null,
      };

    case AUDITOR_SET_PRE_APPROVED_GENERATED_PAYSLIPS_FAIL:
      return {
        ...state,
        isLoading: false,
        error: payload,
      };

    case AUDITOR_SET_PRE_APPROVED_GENERATED_PAYSLIPS_RESET:
      return {};

    default:
      return state;
  }
};

export const ceoGetPreApprovedAndApprovedPayslipsReducer = (
  state = {},
  action
) => {
  const { type, payload } = action;

  switch (type) {
    case CEO_GET_PRE_APPROVED_SALARYSLIPS_REQUEST:
    case CEO_GET_APPROVED_SALARYSLIPS_REQUEST:
      return {
        ...state,
        isLoading: true,
      };

    case CEO_GET_PRE_APPROVED_SALARYSLIPS_SUCCESS:
    case CEO_GET_APPROVED_SALARYSLIPS_SUCCESS:
      return {
        ...state,
        isLoading: false,
        payslips: payload,
        error: null,
      };

    case CEO_GET_PRE_APPROVED_SALARYSLIPS_FAIL:
    case CEO_GET_APPROVED_SALARYSLIPS_FAIL:
      return {
        ...state,
        isLoading: false,
        error: payload,
      };

    default:
      return state;
  }
};

export const ceoSetApprovedPayslipsReducer = (state = {}, action) => {
  const { type, payload } = action;

  switch (type) {
    case CEO_SET_APPROVED_GENERATED_PAYSLIPS_REQUEST:
      return {
        ...state,
        isLoading: true,
      };

    case CEO_SET_APPROVED_GENERATED_PAYSLIPS_SUCCESS:
      return {
        ...state,
        isLoading: false,
        success: true,
        error: null,
      };

    case CEO_SET_APPROVED_GENERATED_PAYSLIPS_FAIL:
      return {
        ...state,
        isLoading: false,
        error: payload,
      };

    case CEO_SET_APPROVED_GENERATED_PAYSLIPS_RESET:
      return {};

    default:
      return state;
  }
};

export const hrSetNotApprovedPayslipsReducer = (state = {}, action) => {
  const { type, payload } = action;

  switch (type) {
    case HR_SET_NOT_APPROVED_GENERATED_PAYSLIPS_REQUEST:
      return {
        ...state,
        isLoading: true,
      };

    case HR_SET_NOT_APPROVED_GENERATED_PAYSLIPS_SUCCESS:
      return {
        ...state,
        isLoading: false,
        success: true,
        error: null,
      };

    case HR_SET_NOT_APPROVED_GENERATED_PAYSLIPS_FAIL:
      return {
        ...state,
        isLoading: false,
        error: payload,
      };

    case HR_SET_NOT_APPROVED_GENERATED_PAYSLIPS_RESET:
      return {};

    default:
      return state;
  }
};

export const auditorRejectNotApprovedPayslipsReducer = (state = {}, action) => {
  const { type, payload } = action;

  switch (type) {
    case AUDITOR_REJECT_NOT_APPROVED_PAYSLIPS_REQUEST:
      return {
        ...state,
        isLoading: true,
      };

    case AUDITOR_REJECT_NOT_APPROVED_PAYSLIPS_SUCCESS:
      return {
        ...state,
        isLoading: false,
        success: true,
        error: null,
      };

    case AUDITOR_REJECT_NOT_APPROVED_PAYSLIPS_FAIL:
      return {
        ...state,
        isLoading: false,
        error: payload,
      };

    case AUDITOR_REJECT_NOT_APPROVED_PAYSLIPS_RESET:
      return {};

    default:
      return state;
  }
};

export const auditorAndCeoRejectExcelPayslipsReducer = (state = {}, action) => {
  const { type, payload } = action;

  switch (type) {
    case AUDITOR_AND_CEO_REJECT_EXCEL_PAYSLIPS_REQUEST:
      return {
        ...state,
        isLoading: true,
      };

    case AUDITOR_AND_CEO_REJECT_EXCEL_PAYSLIPS_SUCCESS:
      return {
        ...state,
        isLoading: false,
        success: true,
        error: null,
      };

    case AUDITOR_AND_CEO_REJECT_EXCEL_PAYSLIPS_FAIL:
      return {
        ...state,
        isLoading: false,
        error: payload,
      };

    case AUDITOR_AND_CEO_REJECT_EXCEL_PAYSLIPS_RESET:
      return {};

    default:
      return state;
  }
};

export const ceoRejectPreApprovedPayslipsReducer = (state = {}, action) => {
  const { type, payload } = action;

  switch (type) {
    case CEO_REJECT_PRE_APPROVED_PAYSLIPS_REQUEST:
      return {
        ...state,
        isLoading: true,
      };

    case CEO_REJECT_PRE_APPROVED_PAYSLIPS_SUCCESS:
      return {
        ...state,
        isLoading: false,
        success: true,
        error: null,
      };

    case CEO_REJECT_PRE_APPROVED_PAYSLIPS_FAIL:
      return {
        ...state,
        isLoading: false,
        error: payload,
      };

    case CEO_REJECT_PRE_APPROVED_PAYSLIPS_RESET:
      return {};

    default:
      return state;
  }
};

export const adminGenerateBulkPayslipsReducer = (state = {}, action) => {
  const { type, payload } = action;

  switch (type) {
    case ADMIN_GENERATE_BULK_PAYSLIPS_REQUEST:
      return {
        ...state,
        isLoading: true,
      };

    case ADMIN_GENERATE_BULK_PAYSLIPS_SUCCESS:
      return {
        ...state,
        isLoading: false,
        success: true,
        error: null,
      };

    case ADMIN_GENERATE_BULK_PAYSLIPS_FAIL:
      return {
        ...state,
        isLoading: false,
        error: payload,
      };

    case ADMIN_GENERATE_BULK_PAYSLIPS_RESET:
      return {};

    default:
      return state;
  }
};

export const generatePayslipReducer = (state = {}, action) => {
  const { type, payload } = action;

  switch (type) {
    case GENERATE_PAYSLIP_REQUEST:
      return {
        ...state,
        isLoading: true,
      };

    case GENERATE_PAYSLIP_SUCCESS:
      return {
        ...state,
        isLoading: false,
        success: true,
        error: null,
      };

    case GENERATE_PAYSLIP_FAIL:
      return {
        ...state,
        isLoading: false,
        error: payload,
      };

    case GENERATE_PAYSLIP_RESET:
      return {};

    default:
      return state;
  }
};

export const adminDeleteBulkPayslipsReducer = (state = {}, action) => {
  const { type, payload } = action;

  switch (type) {
    case ADMIN_DELETE_BULK_PAYSLIPS_REQUEST:
      return {
        ...state,
        isLoading: true,
      };

    case ADMIN_DELETE_BULK_PAYSLIPS_SUCCESS:
      return {
        ...state,
        isLoading: false,
        success: true,
        error: null,
      };

    case ADMIN_DELETE_BULK_PAYSLIPS_FAIL:
      return {
        ...state,
        isLoading: false,
        error: payload,
      };

    case ADMIN_DELETE_BULK_PAYSLIPS_RESET:
      return {};

    default:
      return state;
  }
};

export const deleteGeneratedPayslipByIdReducer = (state = {}, action) => {
  const { type, payload } = action;

  switch (type) {
    case DELETE_GENERATED_PAYSLIP_BY_ID_REQUEST:
      return {
        ...state,
        isLoading: true,
      };

    case DELETE_GENERATED_PAYSLIP_BY_ID_SUCCESS:
      return {
        ...state,
        isLoading: false,
        success: true,
        error: null,
      };

    case DELETE_GENERATED_PAYSLIP_BY_ID_FAIL:
      return {
        ...state,
        isLoading: false,
        error: payload,
      };

    case DELETE_GENERATED_PAYSLIP_BY_ID_RESET:
      return {};

    default:
      return state;
  }
};

import {
  ACCOUNTANT_CREATE_NOT_APPROVED_VOUCHERS_FROM_SALARYSLIPS_FAIL,
  ACCOUNTANT_CREATE_NOT_APPROVED_VOUCHERS_FROM_SALARYSLIPS_REQUEST,
  ACCOUNTANT_CREATE_NOT_APPROVED_VOUCHERS_FROM_SALARYSLIPS_RESET,
  ACCOUNTANT_CREATE_NOT_APPROVED_VOUCHERS_FROM_SALARYSLIPS_SUCCESS,
  ACCOUNTANT_GET_APPROVED_VOUCHERS_FAIL,
  ACCOUNTANT_GET_APPROVED_VOUCHERS_REQUEST,
  ACCOUNTANT_GET_APPROVED_VOUCHERS_SUCCESS,
  ACCOUNTANT_GET_REJECTED_VOUCHERS_FAIL,
  ACCOUNTANT_GET_REJECTED_VOUCHERS_REQUEST,
  ACCOUNTANT_GET_REJECTED_VOUCHERS_SUCCESS,
  AUDITOR_GET_NOT_APPROVED_VOUCHERS_FAIL,
  AUDITOR_GET_NOT_APPROVED_VOUCHERS_REQUEST,
  AUDITOR_GET_NOT_APPROVED_VOUCHERS_SUCCESS,
  AUDITOR_PRE_APPROVE_VOUCHERS_FAIL,
  AUDITOR_PRE_APPROVE_VOUCHERS_REQUEST,
  AUDITOR_PRE_APPROVE_VOUCHERS_RESET,
  AUDITOR_PRE_APPROVE_VOUCHERS_SUCCESS,
  CEO_APPROVE_PRE_APPROVED_VOUCHERS_FAIL,
  CEO_APPROVE_PRE_APPROVED_VOUCHERS_REQUEST,
  CEO_APPROVE_PRE_APPROVED_VOUCHERS_RESET,
  CEO_APPROVE_PRE_APPROVED_VOUCHERS_SUCCESS,
  CEO_GET_PRE_APPROVED_VOUCHERS_FAIL,
  CEO_GET_PRE_APPROVED_VOUCHERS_REQUEST,
  CEO_GET_PRE_APPROVED_VOUCHERS_SUCCESS,
  AUDITOR_REJECT_NOT_APPROVED_VOUCHERS_FAIL,
  AUDITOR_REJECT_NOT_APPROVED_VOUCHERS_REQUEST,
  AUDITOR_REJECT_NOT_APPROVED_VOUCHERS_RESET,
  AUDITOR_REJECT_NOT_APPROVED_VOUCHERS_SUCCESS,
  CEO_REJECT_PRE_APPROVED_VOUCHERS_FAIL,
  CEO_REJECT_PRE_APPROVED_VOUCHERS_REQUEST,
  CEO_REJECT_PRE_APPROVED_VOUCHERS_RESET,
  CEO_REJECT_PRE_APPROVED_VOUCHERS_SUCCESS,
  ACCOUNTANT_DELETE_BULK_VOUCHERS_FAIL,
  ACCOUNTANT_DELETE_BULK_VOUCHERS_REQUEST,
  ACCOUNTANT_DELETE_BULK_VOUCHERS_RESET,
  ACCOUNTANT_DELETE_BULK_VOUCHERS_SUCCESS,
  ACCOUNTANT_DELETE_VOUCHER_BY_ID_FAIL,
  ACCOUNTANT_DELETE_VOUCHER_BY_ID_REQUEST,
  ACCOUNTANT_DELETE_VOUCHER_BY_ID_RESET,
  ACCOUNTANT_DELETE_VOUCHER_BY_ID_SUCCESS,
  ACCOUNTANT_CREATE_NOT_APPROVED_VOUCHERS_FROM_SALARYSLIPS_ALL_REQUEST,
  ACCOUNTANT_CREATE_NOT_APPROVED_VOUCHERS_FROM_SALARYSLIPS_ALL_SUCCESS,
  ACCOUNTANT_CREATE_NOT_APPROVED_VOUCHERS_FROM_SALARYSLIPS_ALL_FAIL,
  ACCOUNTANT_CREATE_NOT_APPROVED_VOUCHERS_FROM_SALARYSLIPS_ALL_RESET,
  AUDITOR_PRE_APPROVE_VOUCHERS_ALL_REQUEST,
  AUDITOR_PRE_APPROVE_VOUCHERS_ALL_SUCCESS,
  AUDITOR_PRE_APPROVE_VOUCHERS_ALL_FAIL,
  AUDITOR_PRE_APPROVE_VOUCHERS_ALL_RESET,
  CEO_APPROVE_PRE_APPROVED_VOUCHERS_ALL_REQUEST,
  CEO_APPROVE_PRE_APPROVED_VOUCHERS_ALL_SUCCESS,
  CEO_APPROVE_PRE_APPROVED_VOUCHERS_ALL_FAIL,
  CEO_APPROVE_PRE_APPROVED_VOUCHERS_ALL_RESET,
  CEO_GET_PRE_APPROVED_VOUCHERS_RESET,
  ACCOUNTANT_GET_APPROVED_VOUCHERS_RESET,
} from "../types/voucher";

export const accountantGetApprovedVouchersReducer = (state = {}, action) => {
  const { type, payload } = action;

  switch (type) {
    case ACCOUNTANT_GET_APPROVED_VOUCHERS_REQUEST:
    case ACCOUNTANT_GET_REJECTED_VOUCHERS_REQUEST:
      return {
        ...state,
        isLoading: true,
      };

    case ACCOUNTANT_GET_APPROVED_VOUCHERS_SUCCESS:
    case ACCOUNTANT_GET_REJECTED_VOUCHERS_SUCCESS:
      return {
        ...state,
        isLoading: false,
        vouchers: payload,
        error: null,
      };

    case ACCOUNTANT_GET_APPROVED_VOUCHERS_FAIL:
    case ACCOUNTANT_GET_REJECTED_VOUCHERS_FAIL:
      return {
        ...state,
        isLoading: false,
        error: payload,
      };

    case ACCOUNTANT_GET_APPROVED_VOUCHERS_RESET:
      return {};

    default:
      return state;
  }
};

export const auditorGetNotApprovedVouchersReducer = (state = {}, action) => {
  const { type, payload } = action;

  switch (type) {
    case AUDITOR_GET_NOT_APPROVED_VOUCHERS_REQUEST:
      return {
        ...state,
        isLoading: true,
      };

    case AUDITOR_GET_NOT_APPROVED_VOUCHERS_SUCCESS:
      return {
        ...state,
        isLoading: false,
        vouchers: payload,
        error: null,
      };

    case AUDITOR_GET_NOT_APPROVED_VOUCHERS_FAIL:
      return {
        ...state,
        isLoading: false,
        error: payload,
      };

    default:
      return state;
  }
};

export const accountantCreateNotApprovedVouchersReducer = (
  state = {},
  action
) => {
  const { type, payload } = action;

  switch (type) {
    case ACCOUNTANT_CREATE_NOT_APPROVED_VOUCHERS_FROM_SALARYSLIPS_REQUEST:
      return {
        ...state,
        isLoading: true,
      };

    case ACCOUNTANT_CREATE_NOT_APPROVED_VOUCHERS_FROM_SALARYSLIPS_SUCCESS:
      return {
        ...state,
        isLoading: false,
        success: true,
        error: null,
      };

    case ACCOUNTANT_CREATE_NOT_APPROVED_VOUCHERS_FROM_SALARYSLIPS_FAIL:
      return {
        ...state,
        isLoading: false,
        error: payload,
      };

    case ACCOUNTANT_CREATE_NOT_APPROVED_VOUCHERS_FROM_SALARYSLIPS_RESET:
      return {};
    default:
      return state;
  }
};

export const accountantCreateNotApprovedVouchersAllReducer = (
  state = {},
  action
) => {
  const { type, payload } = action;

  switch (type) {
    case ACCOUNTANT_CREATE_NOT_APPROVED_VOUCHERS_FROM_SALARYSLIPS_ALL_REQUEST:
      return {
        ...state,
        isLoading: true,
      };

    case ACCOUNTANT_CREATE_NOT_APPROVED_VOUCHERS_FROM_SALARYSLIPS_ALL_SUCCESS:
      return {
        ...state,
        isLoading: false,
        success: true,
        message: payload?.message,
        error: null,
      };

    case ACCOUNTANT_CREATE_NOT_APPROVED_VOUCHERS_FROM_SALARYSLIPS_ALL_FAIL:
      return {
        ...state,
        isLoading: false,
        error: payload,
      };

    case ACCOUNTANT_CREATE_NOT_APPROVED_VOUCHERS_FROM_SALARYSLIPS_ALL_RESET:
      return {};
    default:
      return state;
  }
};

export const auditorPreApproveVouchersReducer = (state = {}, action) => {
  const { type, payload } = action;

  switch (type) {
    case AUDITOR_PRE_APPROVE_VOUCHERS_REQUEST:
      return {
        ...state,
        isLoading: true,
      };

    case AUDITOR_PRE_APPROVE_VOUCHERS_SUCCESS:
      return {
        ...state,
        isLoading: false,
        success: true,
        error: null,
      };

    case AUDITOR_PRE_APPROVE_VOUCHERS_FAIL:
      return {
        ...state,
        isLoading: false,
        error: payload,
      };

    case AUDITOR_PRE_APPROVE_VOUCHERS_RESET:
      return {};

    default:
      return state;
  }
};

export const auditorPreApproveVouchersAllReducer = (state = {}, action) => {
  const { type, payload } = action;

  switch (type) {
    case AUDITOR_PRE_APPROVE_VOUCHERS_ALL_REQUEST:
      return {
        ...state,
        isLoading: true,
      };

    case AUDITOR_PRE_APPROVE_VOUCHERS_ALL_SUCCESS:
      return {
        ...state,
        isLoading: false,
        success: true,
        message: payload?.message,
        error: null,
      };

    case AUDITOR_PRE_APPROVE_VOUCHERS_ALL_FAIL:
      return {
        ...state,
        isLoading: false,
        error: payload,
      };

    case AUDITOR_PRE_APPROVE_VOUCHERS_ALL_RESET:
      return {};

    default:
      return state;
  }
};

export const ceoGetPreApprovedVouchersReducer = (state = {}, action) => {
  const { type, payload } = action;

  switch (type) {
    case CEO_GET_PRE_APPROVED_VOUCHERS_REQUEST:
      return {
        ...state,
        isLoading: true,
      };

    case CEO_GET_PRE_APPROVED_VOUCHERS_SUCCESS:
      return {
        ...state,
        isLoading: false,
        vouchers: payload,
        error: null,
      };

    case CEO_GET_PRE_APPROVED_VOUCHERS_FAIL:
      return {
        ...state,
        isLoading: false,
        error: payload,
      };

    case CEO_GET_PRE_APPROVED_VOUCHERS_RESET:
      return {};

    default:
      return state;
  }
};

export const ceoApprovedPreApprovedVouchersReducer = (state = {}, action) => {
  const { type, payload } = action;

  switch (type) {
    case CEO_APPROVE_PRE_APPROVED_VOUCHERS_REQUEST:
      return {
        ...state,
        isLoading: true,
      };

    case CEO_APPROVE_PRE_APPROVED_VOUCHERS_SUCCESS:
      return {
        ...state,
        isLoading: false,
        success: true,
        error: null,
      };

    case CEO_APPROVE_PRE_APPROVED_VOUCHERS_FAIL:
      return {
        ...state,
        isLoading: false,
        error: payload,
      };

    case CEO_APPROVE_PRE_APPROVED_VOUCHERS_RESET:
      return {};

    default:
      return state;
  }
};

export const ceoApprovedPreApprovedVouchersAllReducer = (
  state = {},
  action
) => {
  const { type, payload } = action;

  switch (type) {
    case CEO_APPROVE_PRE_APPROVED_VOUCHERS_ALL_REQUEST:
      return {
        ...state,
        isLoading: true,
      };

    case CEO_APPROVE_PRE_APPROVED_VOUCHERS_ALL_SUCCESS:
      return {
        ...state,
        isLoading: false,
        success: true,
        message: payload?.message,
        error: null,
      };

    case CEO_APPROVE_PRE_APPROVED_VOUCHERS_ALL_FAIL:
      return {
        ...state,
        isLoading: false,
        error: payload,
      };

    case CEO_APPROVE_PRE_APPROVED_VOUCHERS_ALL_RESET:
      return {};

    default:
      return state;
  }
};

export const auditorRejectNotApprovedVouchersReducer = (state = {}, action) => {
  const { type, payload } = action;

  switch (type) {
    case AUDITOR_REJECT_NOT_APPROVED_VOUCHERS_REQUEST:
      return {
        ...state,
        isLoading: true,
      };

    case AUDITOR_REJECT_NOT_APPROVED_VOUCHERS_SUCCESS:
      return {
        ...state,
        isLoading: false,
        success: true,
        error: null,
      };

    case AUDITOR_REJECT_NOT_APPROVED_VOUCHERS_FAIL:
      return {
        ...state,
        isLoading: false,
        error: payload,
      };

    case AUDITOR_REJECT_NOT_APPROVED_VOUCHERS_RESET:
      return {};

    default:
      return state;
  }
};

export const ceoRejectPreApprovedVouchersReducer = (state = {}, action) => {
  const { type, payload } = action;

  switch (type) {
    case CEO_REJECT_PRE_APPROVED_VOUCHERS_REQUEST:
      return {
        ...state,
        isLoading: true,
      };

    case CEO_REJECT_PRE_APPROVED_VOUCHERS_SUCCESS:
      return {
        ...state,
        isLoading: false,
        success: true,
        error: null,
      };

    case CEO_REJECT_PRE_APPROVED_VOUCHERS_FAIL:
      return {
        ...state,
        isLoading: false,
        error: payload,
      };

    case CEO_REJECT_PRE_APPROVED_VOUCHERS_RESET:
      return {};

    default:
      return state;
  }
};

export const accountantDeleteVoucherByIdReducer = (state = {}, action) => {
  const { type, payload } = action;

  switch (type) {
    case ACCOUNTANT_DELETE_VOUCHER_BY_ID_REQUEST:
      return {
        ...state,
        isLoading: true,
      };

    case ACCOUNTANT_DELETE_VOUCHER_BY_ID_SUCCESS:
      return {
        ...state,
        isLoading: false,
        success: true,
        error: null,
      };

    case ACCOUNTANT_DELETE_VOUCHER_BY_ID_FAIL:
      return {
        ...state,
        isLoading: false,
        error: payload,
      };

    case ACCOUNTANT_DELETE_VOUCHER_BY_ID_RESET:
      return {};

    default:
      return state;
  }
};

export const accountantDeleteBulkVouchersReducer = (state = {}, action) => {
  const { type, payload } = action;

  switch (type) {
    case ACCOUNTANT_DELETE_BULK_VOUCHERS_REQUEST:
      return {
        ...state,
        isLoading: true,
      };

    case ACCOUNTANT_DELETE_BULK_VOUCHERS_SUCCESS:
      return {
        ...state,
        isLoading: false,
        success: true,
        error: null,
      };

    case ACCOUNTANT_DELETE_BULK_VOUCHERS_FAIL:
      return {
        ...state,
        isLoading: false,
        error: payload,
      };

    case ACCOUNTANT_DELETE_BULK_VOUCHERS_RESET:
      return {};

    default:
      return state;
  }
};

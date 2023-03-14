import {
  ACCOUNTANT_CREATE_BANKSCHEDULE_FAIL,
  ACCOUNTANT_CREATE_BANKSCHEDULE_REQUEST,
  ACCOUNTANT_CREATE_BANKSCHEDULE_RESET,
  ACCOUNTANT_CREATE_BANKSCHEDULE_SUCCESS,
  ACCOUNTANT_GET_MONTHLY_BANKSCHEDULE_FAIL,
  ACCOUNTANT_GET_MONTHLY_BANKSCHEDULE_REQUEST,
  ACCOUNTANT_GET_MONTHLY_BANKSCHEDULE_SUCCESS,
  ACCOUNTANT_DELETE_BANKSCHEDULE_BY_ID_FAIL,
  ACCOUNTANT_DELETE_BANKSCHEDULE_BY_ID_REQUEST,
  ACCOUNTANT_DELETE_BANKSCHEDULE_BY_ID_RESET,
  ACCOUNTANT_DELETE_BANKSCHEDULE_BY_ID_SUCCESS,
  ACCOUNTANT_GET_APPROVED_BANKSCHEDULE_VOUCHERS_FAIL,
  ACCOUNTANT_GET_APPROVED_BANKSCHEDULE_VOUCHERS_REQUEST,
  ACCOUNTANT_GET_APPROVED_BANKSCHEDULE_VOUCHERS_SUCCESS,
  CEO_GET_NOT_APPROVED_BANKSCHEDULES_FAIL,
  CEO_GET_NOT_APPROVED_BANKSCHEDULES_REQUEST,
  CEO_GET_NOT_APPROVED_BANKSCHEDULES_RESET,
  CEO_GET_NOT_APPROVED_BANKSCHEDULES_SUCCESS,
  CEO_APPROVE_BANKSCHEDULES_FAIL,
  CEO_APPROVE_BANKSCHEDULES_REQUEST,
  CEO_APPROVE_BANKSCHEDULES_RESET,
  CEO_APPROVE_BANKSCHEDULES_SUCCESS,
} from "../types/bankschedules";

export const ceoGetNotApprovedBankSchedulesReducer = (state = {}, action) => {
  const { type, payload } = action;

  switch (type) {
    case CEO_GET_NOT_APPROVED_BANKSCHEDULES_REQUEST:
      return {
        ...state,
        isLoading: true,
      };

    case CEO_GET_NOT_APPROVED_BANKSCHEDULES_SUCCESS:
      return {
        ...state,
        isLoading: false,
        notApprovedBankSchedules: payload,
        error: null,
      };

    case CEO_GET_NOT_APPROVED_BANKSCHEDULES_FAIL:
      return {
        ...state,
        isLoading: false,
        error: payload,
      };

    case CEO_GET_NOT_APPROVED_BANKSCHEDULES_RESET:
      return {};

    default:
      return state;
  }
};

export const ceoApproveBankSchedulesReducer = (state = {}, action) => {
  const { type, payload } = action;

  switch (type) {
    case CEO_APPROVE_BANKSCHEDULES_REQUEST:
      return {
        ...state,
        isLoading: true,
      };

    case CEO_APPROVE_BANKSCHEDULES_SUCCESS:
      return {
        ...state,
        isLoading: false,
        success: true,
        error: null,
      };

    case CEO_APPROVE_BANKSCHEDULES_FAIL:
      return {
        ...state,
        isLoading: false,
        error: payload,
      };

    case CEO_APPROVE_BANKSCHEDULES_RESET:
      return {};

    default:
      return state;
  }
};

export const accountantGetBankschedulesReducer = (state = {}, action) => {
  const { type, payload } = action;

  switch (type) {
    case ACCOUNTANT_GET_MONTHLY_BANKSCHEDULE_REQUEST:
      return {
        ...state,
        isLoading: true,
      };

    case ACCOUNTANT_GET_MONTHLY_BANKSCHEDULE_SUCCESS:
      return {
        ...state,
        isLoading: false,
        bankSchedules: payload,
        error: null,
      };

    case ACCOUNTANT_GET_MONTHLY_BANKSCHEDULE_FAIL:
      return {
        ...state,
        isLoading: false,
        error: payload,
      };
      
    default:
      return state;
  }
};

export const accountantCreateBankSchedulesReducer = (state = {}, action) => {
  const { type, payload } = action;

  switch (type) {
    case ACCOUNTANT_CREATE_BANKSCHEDULE_REQUEST:
      return {
        ...state,
        isLoading: true,
      };

    case ACCOUNTANT_CREATE_BANKSCHEDULE_SUCCESS:
      return {
        ...state,
        isLoading: false,
        success: true,
        error: null,
      };

    case ACCOUNTANT_CREATE_BANKSCHEDULE_FAIL:
      return {
        ...state,
        isLoading: false,
        error: payload,
      };

    case ACCOUNTANT_CREATE_BANKSCHEDULE_RESET:
      return {};

    default:
      return state;
  }
};

export const accountantDeleteBanksheduleByIdReducer = (state = {}, action) => {
  const { type, payload } = action;

  switch (type) {
    case ACCOUNTANT_DELETE_BANKSCHEDULE_BY_ID_REQUEST:
      return {
        ...state,
        isLoading: true,
      };

    case ACCOUNTANT_DELETE_BANKSCHEDULE_BY_ID_SUCCESS:
      return {
        ...state,
        isLoading: false,
        success: true,
        error: null,
      };

    case ACCOUNTANT_DELETE_BANKSCHEDULE_BY_ID_FAIL:
      return {
        ...state,
        isLoading: false,
        error: payload,
      };

    case ACCOUNTANT_DELETE_BANKSCHEDULE_BY_ID_RESET:
      return {};

    default:
      return state;
  }
};

export const accountantGetApprovedBankScheduleVouchersReducer = (
  state = {},
  action
) => {
  const { type, payload } = action;

  switch (type) {
    case ACCOUNTANT_GET_APPROVED_BANKSCHEDULE_VOUCHERS_REQUEST:
      return {
        ...state,
        isLoading: true,
      };

    case ACCOUNTANT_GET_APPROVED_BANKSCHEDULE_VOUCHERS_SUCCESS:
      return {
        ...state,
        isLoading: false,
        approvedScheduleVouchers: payload,
        error: null,
      };

    case ACCOUNTANT_GET_APPROVED_BANKSCHEDULE_VOUCHERS_FAIL:
      return {
        ...state,
        isLoading: false,
        error: payload,
      };

    default:
      return state;
  }
};

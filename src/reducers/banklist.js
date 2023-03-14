import {
  GET_ALL_BANK_LISTS_FAIL,
  GET_ALL_BANK_LISTS_REQUEST,
  GET_ALL_BANK_LISTS_SUCCESS,
  ACCOUNTANT_CREATE_BANK_FAIL,
  ACCOUNTANT_CREATE_BANK_REQUEST,
  ACCOUNTANT_CREATE_BANK_RESET,
  ACCOUNTANT_CREATE_BANK_SUCCESS,
  ACCOUNTANT_UPDATE_BANK_BY_ID_FAIL,
  ACCOUNTANT_UPDATE_BANK_BY_ID_REQUEST,
  ACCOUNTANT_UPDATE_BANK_BY_ID_RESET,
  ACCOUNTANT_UPDATE_BANK_BY_ID_SUCCESS,
} from "../types/banklist";

export const adminGetAllBanksReducer = (state = {}, action) => {
  const { type, payload } = action;

  switch (type) {
    case GET_ALL_BANK_LISTS_REQUEST:
      return {
        ...state,
        isLoading: true,
      };

    case GET_ALL_BANK_LISTS_SUCCESS:
      return {
        ...state,
        isLoading: false,
        banks: payload,
        error: null,
      };

    case GET_ALL_BANK_LISTS_FAIL:
      return {
        ...state,
        isLoading: false,
        error: payload,
      };

    default:
      return state;
  }
};

export const accountantCreateBankReducer = (state = {}, action) => {
  const { type, payload } = action;

  switch (type) {
    case ACCOUNTANT_CREATE_BANK_REQUEST:
      return {
        ...state,
        isLoading: true,
      };

    case ACCOUNTANT_CREATE_BANK_SUCCESS:
      return {
        ...state,
        isLoading: false,
        success: true,
        error: null,
      };

    case ACCOUNTANT_CREATE_BANK_FAIL:
      return {
        ...state,
        isLoading: false,
        error: payload,
      };

    case ACCOUNTANT_CREATE_BANK_RESET:
      return {};

    default:
      return state;
  }
};

export const accountantUpdateBankByIdReducer = (state = {}, action) => {
  const { type, payload } = action;

  switch (type) {
    case ACCOUNTANT_UPDATE_BANK_BY_ID_REQUEST:
      return {
        ...state,
        isLoading: true,
      };

    case ACCOUNTANT_UPDATE_BANK_BY_ID_SUCCESS:
      return {
        ...state,
        isLoading: false,
        success: true,
        error: null,
      };

    case ACCOUNTANT_UPDATE_BANK_BY_ID_FAIL:
      return {
        ...state,
        isLoading: false,
        error: payload,
      };

    case ACCOUNTANT_UPDATE_BANK_BY_ID_RESET:
      return {};

    default:
      return state;
  }
};

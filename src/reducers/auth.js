import {
  LOGIN_ADMIN_USER_FAIL,
  LOGIN_ADMIN_USER_REQUEST,
  LOGIN_ADMIN_USER_SUCCESS,
  LOGOUT_ADMIN_USER,
  ADMIN_LOGGEDIN_DETAILS_FAIL,
  ADMIN_LOGGEDIN_DETAILS_REQUEST,
  ADMIN_LOGGEDIN_DETAILS_SUCCESS,
  ADMIN_UPDATE_LOGGEDIN_DETAILS_FAIL,
  ADMIN_UPDATE_LOGGEDIN_DETAILS_REQUEST,
  ADMIN_UPDATE_LOGGEDIN_DETAILS_RESET,
  ADMIN_UPDATE_LOGGEDIN_DETAILS_SUCCESS,
  ADMIN_LOGGEDIN_DETAILS_RESET,
  ADMIN_FORGOT_PASSWORD_FAIL,
  ADMIN_FORGOT_PASSWORD_REQUEST,
  ADMIN_FORGOT_PASSWORD_RESET,
  ADMIN_FORGOT_PASSWORD_SUCCESS,
  ADMIN_RESET_PASSWORD_FAIL,
  ADMIN_RESET_PASSWORD_REQUEST,
  ADMIN_RESET_PASSWORD_RESET,
  ADMIN_RESET_PASSWORD_SUCCESS,
  CHECK_ADMIN_LOGIN_STATUS_FAIL,
  CHECK_ADMIN_LOGIN_STATUS_REQUEST,
  CHECK_ADMIN_LOGIN_STATUS_SUCCESS,
  LOGIN_ADMIN_USER_RESET,
  CHECK_COOKIE_TOKEN_VALID_FAIL,
  CHECK_COOKIE_TOKEN_VALID_REQUEST,
  CHECK_COOKIE_TOKEN_VALID_RESET,
  CHECK_COOKIE_TOKEN_VALID_SUCCESS,
  CEO_UPLOAD_SIGNATURE_IMAGE_FAIL,
  CEO_UPLOAD_SIGNATURE_IMAGE_REQUEST,
  CEO_UPLOAD_SIGNATURE_IMAGE_RESET,
  CEO_UPLOAD_SIGNATURE_IMAGE_SUCCESS,
} from "../types/auth";

export const loginAdminUserReducer = (state = {}, action) => {
  const { type, payload } = action;
  switch (type) {
    case LOGIN_ADMIN_USER_REQUEST:
      return {
        ...state,
        isLoading: true,
      };

    case LOGIN_ADMIN_USER_SUCCESS:
      return {
        ...state,
        isLoading: false,
        success: true,
      };

    case LOGIN_ADMIN_USER_FAIL:
      return {
        ...state,
        isLoading: false,
        error: payload,
        success: false,
      };

    case LOGIN_ADMIN_USER_RESET:
      return {};

    default:
      return state;
  }
};

export const adminLoginStatusReducer = (state = {}, action) => {
  const { type, payload } = action;

  switch (type) {
    case CHECK_ADMIN_LOGIN_STATUS_REQUEST:
      return {
        ...state,
        isLoading: true,
      };

    case CHECK_ADMIN_LOGIN_STATUS_SUCCESS:
      return {
        ...state,
        isLoading: false,
        adminInfo: payload,
      };

    case CHECK_ADMIN_LOGIN_STATUS_FAIL:
      return {
        ...state,
        isLoading: false,
        error: payload,
      };

    case LOGOUT_ADMIN_USER:
      return {};

    default:
      return state;
  }
};

export const adminGetLoggedinDetailsReducer = (state = {}, action) => {
  const { type, payload } = action;

  switch (type) {
    case ADMIN_LOGGEDIN_DETAILS_REQUEST:
      return {
        ...state,
        isLoading: true,
      };

    case ADMIN_LOGGEDIN_DETAILS_SUCCESS:
      return {
        ...state,
        isLoading: false,
        adminInfo: payload.user,
        error: null,
      };

    case ADMIN_LOGGEDIN_DETAILS_FAIL:
      return {
        ...state,
        isLoading: false,
        error: payload,
      };

    case ADMIN_LOGGEDIN_DETAILS_RESET:
      return {};

    default:
      return state;
  }
};

export const adminUpdateLoggedinDetailsReducer = (state = {}, action) => {
  const { type, payload } = action;
  switch (type) {
    case ADMIN_UPDATE_LOGGEDIN_DETAILS_REQUEST:
      return {
        ...state,
        isLoading: true,
      };

    case ADMIN_UPDATE_LOGGEDIN_DETAILS_SUCCESS:
      return {
        ...state,
        isLoading: false,
        success: true,
        error: null,
      };

    case ADMIN_UPDATE_LOGGEDIN_DETAILS_FAIL:
      return {
        ...state,
        isLoading: false,
        error: payload,
      };

    case ADMIN_UPDATE_LOGGEDIN_DETAILS_RESET:
      return {};

    default:
      return state;
  }
};

export const adminForgotPasswordReducer = (state = {}, action) => {
  const { type, payload } = action;

  switch (type) {
    case ADMIN_FORGOT_PASSWORD_REQUEST:
      return {
        ...state,
        isLoading: true,
      };

    case ADMIN_FORGOT_PASSWORD_SUCCESS:
      return {
        ...state,
        isLoading: false,
        success: true,
        error: null,
      };

    case ADMIN_FORGOT_PASSWORD_FAIL:
      return {
        ...state,
        isLoading: false,
        error: payload,
      };

    case ADMIN_FORGOT_PASSWORD_RESET:
      return {};

    default:
      return state;
  }
};

export const adminResetPasswordReducer = (state = {}, action) => {
  const { type, payload } = action;

  switch (type) {
    case ADMIN_RESET_PASSWORD_REQUEST:
      return {
        ...state,
        isLoading: true,
      };

    case ADMIN_RESET_PASSWORD_SUCCESS:
      return {
        ...state,
        isLoading: false,
        success: true,
        error: null,
      };

    case ADMIN_RESET_PASSWORD_FAIL:
      return {
        ...state,
        isLoading: false,
        error: payload,
      };

    case ADMIN_RESET_PASSWORD_RESET:
      return {};

    default:
      return state;
  }
};

export const checkCookieTokenValidReducer = (state = {}, action) => {
  const { type, payload } = action;

  switch (type) {
    case CHECK_COOKIE_TOKEN_VALID_REQUEST:
      return {
        ...state,
        isLoading: true,
      };

    case CHECK_COOKIE_TOKEN_VALID_SUCCESS:
      return {
        ...state,
        isLoading: false,
        ...payload,
        error: null,
      };

    case CHECK_COOKIE_TOKEN_VALID_FAIL:
      return {
        ...state,
        isLoading: false,
        error: payload,
      };

    case CHECK_COOKIE_TOKEN_VALID_RESET:
      return {};

    default:
      return state;
  }
};

export const ceoUploadSignatureReducer = (state = {}, action) => {
  const { type, payload } = action;

  switch (type) {
    case CEO_UPLOAD_SIGNATURE_IMAGE_REQUEST:
      return {
        ...state,
        isLoading: true,
      };

    case CEO_UPLOAD_SIGNATURE_IMAGE_SUCCESS:
      return {
        ...state,
        isLoading: false,
        success: true,
        error: null,
      };

    case CEO_UPLOAD_SIGNATURE_IMAGE_FAIL:
      return {
        ...state,
        isLoading: false,
        error: payload,
      };

    case CEO_UPLOAD_SIGNATURE_IMAGE_RESET:
      return {};

    default:
      return state;
  }
};

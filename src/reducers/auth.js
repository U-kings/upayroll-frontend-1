import {
  LOGIN_ADMIN_USER_FAIL,
  LOGIN_ADMIN_USER_REQUEST,
  LOGIN_ADMIN_USER_SUCCESS,
  LOGIN_ADMIN_USER_RESET,
  REGISTER_COMPANY_REQUEST,
  REGISTER_COMPANY_SUCCESS,
  REGISTER_COMPANY_FAIL,
  REGISTER_COMPANY_RESET,
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
  CHECK_COOKIE_TOKEN_VALID_FAIL,
  CHECK_COOKIE_TOKEN_VALID_REQUEST,
  CHECK_COOKIE_TOKEN_VALID_RESET,
  CHECK_COOKIE_TOKEN_VALID_SUCCESS,
  CEO_UPLOAD_SIGNATURE_IMAGE_FAIL,
  CEO_UPLOAD_SIGNATURE_IMAGE_REQUEST,
  CEO_UPLOAD_SIGNATURE_IMAGE_RESET,
  CEO_UPLOAD_SIGNATURE_IMAGE_SUCCESS,
  REGISTER_COMPANY_ADMIN_FAIL,
  REGISTER_COMPANY_ADMIN_SUCCESS,
  REGISTER_COMPANY_ADMIN_REQUEST,
  REGISTER_COMPANY_ADMIN_RESET,
  CONFIRM_EMAIL_REQUEST,
  CONFIRM_EMAIL_SUCCESS,
  CONFIRM_EMAIL_FAIL,
  CONFIRM_EMAIL_RESET,
  GET_NOT_CREATED_ROLES_RESET,
  GET_NOT_CREATED_ROLES_FAIL,
  GET_NOT_CREATED_ROLES_SUCCESS,
  GET_NOT_CREATED_ROLES_REQUEST,
  VERIFY_ACCOUNT_NUMBER_REQUEST,
  VERIFY_ACCOUNT_NUMBER_SUCCESS,
  VERIFY_ACCOUNT_NUMBER_FAIL,
  VERIFY_ACCOUNT_NUMBER_RESET,
  VERIFY_BULK_ACCOUNT_NUMBER_REQUEST,
  VERIFY_BULK_ACCOUNT_NUMBER_SUCCESS,
  VERIFY_BULK_ACCOUNT_NUMBER_FAIL,
  VERIFY_BULK_ACCOUNT_NUMBER_RESET,
  ADMIN_SET_PASSWORD_REQUEST,
  ADMIN_SET_PASSWORD_SUCCESS,
  ADMIN_SET_PASSWORD_FAIL,
  ADMIN_SET_PASSWORD_RESET,
  CHECK_EMPLOYEE_LOGIN_STATUS_REQUEST,
  CHECK_EMPLOYEE_LOGIN_STATUS_SUCCESS,
  CHECK_EMPLOYEE_LOGIN_STATUS_FAIL,
} from "../types/auth";

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

export const employeeLoginStatusReducer = (state = {}, action) => {
  const { type, payload } = action;

  switch (type) {
    case CHECK_EMPLOYEE_LOGIN_STATUS_REQUEST:
      return {
        ...state,
        isLoading: true,
      };

    case CHECK_EMPLOYEE_LOGIN_STATUS_SUCCESS:
      return {
        ...state,
        isLoading: false,
        employeeInfo: payload,
      };

    case CHECK_EMPLOYEE_LOGIN_STATUS_FAIL:
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

export const registerCompanyReducer = (state = {}, action) => {
  const { type, payload } = action;
  switch (type) {
    case REGISTER_COMPANY_REQUEST:
      return {
        ...state,
        isLoading: true,
      };

    case REGISTER_COMPANY_SUCCESS:
      return {
        ...state,
        isLoading: false,
        success: true,
        error: null,
      };

    case REGISTER_COMPANY_FAIL:
      return {
        ...state,
        isLoading: false,
        error: payload,
        success: false,
      };

    case REGISTER_COMPANY_RESET:
      return {};

    default:
      return state;
  }
};
export const registerCompanyAdminReducer = (state = {}, action) => {
  const { type, payload } = action;
  switch (type) {
    case REGISTER_COMPANY_ADMIN_REQUEST:
      return {
        ...state,
        isLoading: true,
      };

    case REGISTER_COMPANY_ADMIN_SUCCESS:
      return {
        ...state,
        isLoading: false,
        success: true,
        error: null,
      };

    case REGISTER_COMPANY_ADMIN_FAIL:
      return {
        ...state,
        isLoading: false,
        error: payload,
        success: false,
      };

    case REGISTER_COMPANY_ADMIN_RESET:
      return {};

    default:
      return state;
  }
};

export const getNotCreatedRolesReducer = (state = {}, action) => {
  const { type, payload } = action;
  switch (type) {
    case GET_NOT_CREATED_ROLES_REQUEST:
      return {
        ...state,
        isLoading: true,
      };

    case GET_NOT_CREATED_ROLES_SUCCESS:
      return {
        ...state,
        isLoading: false,
        notCreatedRoles: payload,
      };

    case GET_NOT_CREATED_ROLES_FAIL:
      return {
        ...state,
        isLoading: false,
        error: payload,
        success: false,
      };

    case GET_NOT_CREATED_ROLES_RESET:
      return {};

    default:
      return state;
  }
};

export const confirmEmailReducer = (state = {}, action) => {
  const { type, payload } = action;
  switch (type) {
    case CONFIRM_EMAIL_REQUEST:
      return {
        ...state,
        isLoading: true,
      };

    case CONFIRM_EMAIL_SUCCESS:
      return {
        ...state,
        isLoading: false,
        success: true,
        error: null,
      };

    case CONFIRM_EMAIL_FAIL:
      return {
        ...state,
        isLoading: false,
        error: payload,
        success: false,
      };

    case CONFIRM_EMAIL_RESET:
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

export const adminSetPasswordReducer = (state = {}, action) => {
  const { type, payload } = action;

  switch (type) {
    case ADMIN_SET_PASSWORD_REQUEST:
      return {
        ...state,
        isLoading: true,
      };

    case ADMIN_SET_PASSWORD_SUCCESS:
      return {
        ...state,
        isLoading: false,
        success: true,
        payload: payload,
        error: null,
      };

    case ADMIN_SET_PASSWORD_FAIL:
      return {
        ...state,
        isLoading: false,
        error: payload,
      };

    case ADMIN_SET_PASSWORD_RESET:
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

export const verifyAccountNumberReducer = (state = {}, action) => {
  const { type, payload } = action;

  switch (type) {
    case VERIFY_ACCOUNT_NUMBER_REQUEST:
      return {
        ...state,
        isLoading: true,
      };

    case VERIFY_ACCOUNT_NUMBER_SUCCESS:
      return {
        ...state,
        isLoading: false,
        accountName: payload,
        // success: true,
        error: null,
      };

    case VERIFY_ACCOUNT_NUMBER_FAIL:
      return {
        ...state,
        isLoading: false,
        error: payload,
      };

    case VERIFY_ACCOUNT_NUMBER_RESET:
      return {};

    default:
      return state;
  }
};

export const verifyBulkAccountNumberReducer = (state = {}, action) => {
  const { type, payload } = action;

  switch (type) {
    case VERIFY_BULK_ACCOUNT_NUMBER_REQUEST:
      return {
        ...state,
        isLoading: true,
      };

    case VERIFY_BULK_ACCOUNT_NUMBER_SUCCESS:
      return {
        ...state,
        isLoading: false,
        verifiedAccounts: payload,
        // success: true,
        error: null,
      };

    case VERIFY_BULK_ACCOUNT_NUMBER_FAIL:
      return {
        ...state,
        isLoading: false,
        error: payload,
      };

    case VERIFY_BULK_ACCOUNT_NUMBER_RESET:
      return {};

    default:
      return state;
  }
};

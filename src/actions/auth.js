import cookie from "js-cookie";
import axios from "axios";
import {
  LOGIN_ADMIN_USER_FAIL,
  LOGIN_ADMIN_USER_SUCCESS,
  LOGIN_ADMIN_USER_REQUEST,
  LOGOUT_ADMIN_USER,
  ADMIN_LOGGEDIN_DETAILS_FAIL,
  ADMIN_LOGGEDIN_DETAILS_REQUEST,
  ADMIN_LOGGEDIN_DETAILS_SUCCESS,
  ADMIN_UPDATE_LOGGEDIN_DETAILS_FAIL,
  ADMIN_UPDATE_LOGGEDIN_DETAILS_REQUEST,
  ADMIN_UPDATE_LOGGEDIN_DETAILS_SUCCESS,
  ADMIN_FORGOT_PASSWORD_FAIL,
  ADMIN_FORGOT_PASSWORD_REQUEST,
  ADMIN_FORGOT_PASSWORD_SUCCESS,
  ADMIN_RESET_PASSWORD_FAIL,
  ADMIN_RESET_PASSWORD_REQUEST,
  ADMIN_RESET_PASSWORD_SUCCESS,
  CHECK_ADMIN_LOGIN_STATUS_FAIL,
  CHECK_ADMIN_LOGIN_STATUS_REQUEST,
  CHECK_ADMIN_LOGIN_STATUS_SUCCESS,
  CHECK_COOKIE_TOKEN_VALID_FAIL,
  CHECK_COOKIE_TOKEN_VALID_REQUEST,
  CHECK_COOKIE_TOKEN_VALID_SUCCESS,
  CEO_UPLOAD_SIGNATURE_IMAGE_FAIL,
  CEO_UPLOAD_SIGNATURE_IMAGE_REQUEST,
  CEO_UPLOAD_SIGNATURE_IMAGE_SUCCESS,
  REGISTER_COMPANY_FAIL,
  REGISTER_COMPANY_SUCCESS,
  REGISTER_COMPANY_REQUEST,
  REGISTER_COMPANY_ADMIN_FAIL,
  REGISTER_COMPANY_ADMIN_SUCCESS,
  REGISTER_COMPANY_ADMIN_REQUEST,
  CONFIRM_EMAIL_FAIL,
  CONFIRM_EMAIL_SUCCESS,
  CONFIRM_EMAIL_REQUEST,
  GET_NOT_CREATED_ROLES_REQUEST,
  GET_NOT_CREATED_ROLES_SUCCESS,
  GET_NOT_CREATED_ROLES_FAIL,
  VERIFY_BULK_ACCOUNT_NUMBER_REQUEST,
  VERIFY_BULK_ACCOUNT_NUMBER_SUCCESS,
  VERIFY_BULK_ACCOUNT_NUMBER_FAIL,
  VERIFY_ACCOUNT_NUMBER_SUCCESS,
  VERIFY_ACCOUNT_NUMBER_FAIL,
  VERIFY_ACCOUNT_NUMBER_REQUEST,
  ADMIN_SET_PASSWORD_REQUEST,
  ADMIN_SET_PASSWORD_SUCCESS,
  ADMIN_SET_PASSWORD_FAIL,
  CHECK_EMPLOYEE_LOGIN_STATUS_REQUEST,
  CHECK_EMPLOYEE_LOGIN_STATUS_SUCCESS,
  CHECK_EMPLOYEE_LOGIN_STATUS_FAIL,
} from "../types/auth";
import { urlConfig } from "../util/config/config";

export const adminLoginStatus = () => async (dispatch) => {
  const token = cookie.get("token");
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  try {
    dispatch({ type: CHECK_ADMIN_LOGIN_STATUS_REQUEST });
    const { data } = await axios.get(
      `${urlConfig.proxyUrl.PROXYURL}api/users/admin-status`,
      config
    );
    dispatch({
      type: CHECK_ADMIN_LOGIN_STATUS_SUCCESS,
      payload: data,
    });
    cookie.set("companyId", data?.user?.companyId);
    // cookie.set("companyLogo", data?.user?.company?.logo);
    cookie.set("adminStatusData", JSON.stringify(data));
    cookie.set("requiresPasswordChange", data?.user?.requiresPasswordChange);
  } catch (error) {
    dispatch({
      type: CHECK_ADMIN_LOGIN_STATUS_FAIL,
      payload:
        error?.response &&
        (error?.response?.data?.detail || error?.response?.data?.errors)
          ? error?.response?.data?.detail ||
            error?.response?.data?.errors?.map((el) => el?.msg)?.join(" ")
          : error?.message,
    });
  }
};

export const employeeLoginStatus = () => async (dispatch) => {
  const token = cookie.get("token");
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  try {
    dispatch({ type: CHECK_EMPLOYEE_LOGIN_STATUS_REQUEST });
    const { data } = await axios.get(
      `${urlConfig.proxyUrl.PROXYURL}api/employees/loginuser/details`,
      config
    );
    dispatch({
      type: CHECK_EMPLOYEE_LOGIN_STATUS_SUCCESS,
      payload: data?.employee,
    });
    cookie.set("companyId", data?.user?.companyId);
    // cookie.set("companyLogo", data?.user?.company?.logo);
    cookie.set("employeeStatusData", JSON.stringify(data?.employee));
    // cookie.set("requiresPasswordChange", data?.user?.requiresPasswordChange);
  } catch (error) {
    dispatch({
      type: CHECK_EMPLOYEE_LOGIN_STATUS_FAIL,
      payload:
        error?.response &&
        (error?.response?.data?.detail || error?.response?.data?.errors)
          ? error?.response?.data?.detail ||
            error?.response?.data?.errors?.map((el) => el?.msg)?.join(" ")
          : error?.message,
    });
  }
};

export const adminLoginFunc = (formData) => async (dispatch) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };
  try {
    dispatch({
      type: LOGIN_ADMIN_USER_REQUEST,
    });
    const body = JSON.stringify(formData);
    const { data } = await axios.post(
      `${urlConfig.proxyUrl.PROXYURL}api/users/login`,
      body,
      config
    );
    dispatch({
      type: LOGIN_ADMIN_USER_SUCCESS,
    });
    cookie.set("token", data?.token);
    sessionStorage.setItem("item_key", data?.token);
    dispatch(adminLoginStatus());
    dispatch(employeeLoginStatus());
  } catch (error) {
    dispatch({
      type: LOGIN_ADMIN_USER_FAIL,
      payload:
        error?.response &&
        (error?.response?.data?.detail || error?.response?.data?.errors)
          ? error?.response?.data?.detail ||
            error?.response?.data?.errors?.map((el) => el?.msg)?.join(" ")
          : error?.message,
    });
  }
};

export const confirmEmailFunc = (resetToken) => async (dispatch) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };
  try {
    dispatch({
      type: CONFIRM_EMAIL_REQUEST,
    });
    const body = JSON.stringify({});
    await axios.patch(
      `${urlConfig.proxyUrl.PROXYURL}api/users/confirm-email/${resetToken}`,
      body,
      config
    );
    dispatch({
      type: CONFIRM_EMAIL_SUCCESS,
    });
  } catch (error) {
    dispatch({
      type: CONFIRM_EMAIL_FAIL,
      payload:
        error?.response &&
        (error?.response?.data?.detail || error?.response?.data?.errors)
          ? error?.response?.data?.detail ||
            error?.response?.data?.errors?.map((el) => el?.msg)?.join(" ")
          : error?.message,
    });
  }
};

export const registerFunc = (formData) => async (dispatch) => {
  const config = {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  };
  try {
    dispatch({
      type: REGISTER_COMPANY_REQUEST,
    });
    const body = formData;
    await axios.post(`${urlConfig.proxyUrl.PROXYURL}api/company`, body, config);
    dispatch({
      type: REGISTER_COMPANY_SUCCESS,
    });
  } catch (error) {
    dispatch({
      type: REGISTER_COMPANY_FAIL,
      payload:
        error?.response &&
        (error?.response?.data?.detail || error?.response?.data?.errors)
          ? error?.response?.data?.detail ||
            error?.response?.data?.errors?.map((el) => el?.msg)?.join(" ")
          : error?.message,
    });
  }
};

export const registerCompanyAdminFunc = (formData) => async (dispatch) => {
  const token = cookie.get("token");
  const companyId = cookie.get("companyId");
  const config = {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  };
  try {
    dispatch({
      type: REGISTER_COMPANY_ADMIN_REQUEST,
    });
    const body = JSON.stringify(formData);
    await axios.post(
      `${urlConfig.proxyUrl.PROXYURL}api/users/register/admin/${companyId}`,
      body,
      config
    );
    dispatch({
      type: REGISTER_COMPANY_ADMIN_SUCCESS,
    });
  } catch (error) {
    dispatch({
      type: REGISTER_COMPANY_ADMIN_FAIL,
      payload:
        error?.response &&
        (error?.response?.data?.detail || error?.response?.data?.errors)
          ? error?.response?.data?.detail ||
            error?.response?.data?.errors?.map((el) => el?.msg)?.join(" ")
          : error?.message,
    });
  }
};

export const getNotCreatedRolesFunc = () => async (dispatch) => {
  const token = cookie.get("token");
  // const companyId = cookie.get("companyId");
  const config = {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  };
  try {
    dispatch({
      type: GET_NOT_CREATED_ROLES_REQUEST,
    });
    const body = JSON.stringify({});
    const { data } = await axios.get(
      `${urlConfig.proxyUrl.PROXYURL}api/users/not-createdroles/company`,
      body,
      config
    );
    dispatch({
      type: GET_NOT_CREATED_ROLES_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: GET_NOT_CREATED_ROLES_FAIL,
      payload:
        error?.response &&
        (error?.response?.data?.detail || error?.response?.data?.errors)
          ? error?.response?.data?.detail ||
            error?.response?.data?.errors?.map((el) => el?.msg)?.join(" ")
          : error?.message,
    });
  }
};

export const adminLoggedinDetails = () => async (dispatch) => {
  const token = cookie.get("token");
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  try {
    dispatch({ type: ADMIN_LOGGEDIN_DETAILS_REQUEST });
    const { data } = await axios.get(
      `${urlConfig.proxyUrl.PROXYURL}api/users/admin-details`,
      config
    );
    dispatch({ type: ADMIN_LOGGEDIN_DETAILS_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: ADMIN_LOGGEDIN_DETAILS_FAIL,
      payload:
        error?.response &&
        (error?.response?.data?.detail || error?.response?.data?.errors)
          ? error?.response?.data?.detail ||
            error?.response?.data?.errors?.map((el) => el?.msg)?.join(" ")
          : error?.message,
    });
  }
};

export const ceoUploadSignatureFunc = (formData) => async (dispatch) => {
  const token = cookie.get("token");
  const config = {
    headers: {
      "Content-Type": "multipart/form-data",
      Authorization: `Bearer ${token}`,
    },
  };

  try {
    dispatch({ type: CEO_UPLOAD_SIGNATURE_IMAGE_REQUEST });
    const body = formData;

    await axios.patch(
      `${urlConfig.proxyUrl.PROXYURL}api/users/signature-upload`,
      body,
      config
    );

    dispatch({ type: CEO_UPLOAD_SIGNATURE_IMAGE_SUCCESS });
  } catch (error) {
    dispatch({
      type: CEO_UPLOAD_SIGNATURE_IMAGE_FAIL,
      payload:
        error?.response &&
        (error?.response?.data?.detail || error?.response?.data?.errors)
          ? error?.response?.data?.detail ||
            error?.response?.data?.errors?.map((el) => el?.msg)?.join(" ")
          : error?.message,
    });
  }
};

export const adminUpdateDetails = (formData) => async (dispatch, getState) => {
  const token = cookie.get("token");
  const config = {
    headers: {
      "Content-Type": "multipart/form-data",
      Authorization: `Bearer ${token}`,
    },
  };

  try {
    dispatch({ type: ADMIN_UPDATE_LOGGEDIN_DETAILS_REQUEST });
    const body = formData;
    await axios.patch(
      `${urlConfig.proxyUrl.PROXYURL}api/users/update-admin`,
      body,
      config
    );

    dispatch({ type: ADMIN_UPDATE_LOGGEDIN_DETAILS_SUCCESS });
    dispatch(adminLoginStatus());
  } catch (error) {
    dispatch({
      type: ADMIN_UPDATE_LOGGEDIN_DETAILS_FAIL,
      payload:
        error?.response &&
        (error?.response?.data?.detail || error?.response?.data?.errors)
          ? error?.response?.data?.detail ||
            error?.response?.data?.errors?.map((el) => el?.msg)?.join(" ")
          : error?.message,
    });
  }
};

export const adminForgotPasswordFunc = (adminEmail) => async (dispatch) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };

  try {
    dispatch({ type: ADMIN_FORGOT_PASSWORD_REQUEST });
    const body = JSON.stringify(adminEmail);
    await axios.post(
      `${urlConfig.proxyUrl.PROXYURL}api/users/forgotPassword`,
      body,
      config
    );
    dispatch({ type: ADMIN_FORGOT_PASSWORD_SUCCESS });
  } catch (error) {
    dispatch({
      type: ADMIN_FORGOT_PASSWORD_FAIL,
      payload:
        error?.response &&
        (error?.response?.data?.detail || error?.response?.data?.errors)
          ? error?.response?.data?.detail ||
            error?.response?.data?.errors?.map((el) => el?.msg)?.join(" ")
          : error?.message,
    });
  }
};

export const adminResetPasswordFunc = (token, formData) => async (dispatch) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };

  try {
    dispatch({ type: ADMIN_RESET_PASSWORD_REQUEST });
    const body = JSON.stringify(formData);
    await axios.patch(
      `${urlConfig.proxyUrl.PROXYURL}api/users/resetPassword/${token}`,
      body,
      config
    );
    dispatch({
      type: ADMIN_RESET_PASSWORD_SUCCESS,
    });
    dispatch(adminLoginStatus());
  } catch (error) {
    dispatch({
      type: ADMIN_RESET_PASSWORD_FAIL,
      payload:
        error?.response &&
        (error?.response?.data?.detail || error?.response?.data?.errors)
          ? error?.response?.data?.detail ||
            error?.response?.data?.errors?.map((el) => el?.msg)?.join(" ")
          : error?.message,
    });
  }
};

export const adminSetPasswordFunc = (userId) => async (dispatch) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };

  try {
    dispatch({ type: ADMIN_SET_PASSWORD_REQUEST });
    const body = JSON.stringify({});
    const { data } = await axios.patch(
      `${urlConfig.proxyUrl.PROXYURL}api/users/setPassword/user/${userId}`,
      body,
      config
    );
    dispatch({
      type: ADMIN_SET_PASSWORD_SUCCESS,
      payload: data?.payload,
    });
    dispatch(adminLoginStatus());
  } catch (error) {
    dispatch({
      type: ADMIN_SET_PASSWORD_FAIL,
      payload:
        error?.response &&
        (error?.response?.data?.detail || error?.response?.data?.errors)
          ? error?.response?.data?.detail ||
            error?.response?.data?.errors?.map((el) => el?.msg)?.join(" ")
          : error?.message,
    });
  }
};

export const verifyAccountNumberFunc = (formData) => async (dispatch) => {
  const token = cookie.get("token");
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  };

  try {
    dispatch({ type: VERIFY_ACCOUNT_NUMBER_REQUEST });
    const body = JSON.stringify(formData);
    const { data } = await axios.post(
      `${urlConfig.proxyUrl.PROXYURL}api/paystack/verify-account`,
      body,
      config
    );
    dispatch({
      type: VERIFY_ACCOUNT_NUMBER_SUCCESS,
      payload: data?.data?.account_name,
    });
    dispatch(adminLoginStatus());
  } catch (error) {
    dispatch({
      type: VERIFY_ACCOUNT_NUMBER_FAIL,
      payload:
        error?.response &&
        (error?.response?.data?.detail || error?.response?.data?.errors)
          ? error?.response?.data?.detail ||
            error?.response?.data?.errors?.map((el) => el?.msg)?.join(" ")
          : error?.message,
    });
  }
};

export const verifyBulkAcctountNumberFunc = (formData) => async (dispatch) => {
  const token = cookie.get("token");
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  };

  try {
    dispatch({ type: VERIFY_BULK_ACCOUNT_NUMBER_REQUEST });
    const body = JSON.stringify({ accounts: formData });
    const { data } = await axios.post(
      `${urlConfig.proxyUrl.PROXYURL}api/paystack/verify-account/bulk`,
      body,
      config
    );
    dispatch({
      type: VERIFY_BULK_ACCOUNT_NUMBER_SUCCESS,
      payload: data?.verifiedAccounts,
    });
    dispatch(adminLoginStatus());
  } catch (error) {
    dispatch({
      type: VERIFY_BULK_ACCOUNT_NUMBER_FAIL,
      payload:
        error?.response &&
        (error?.response?.data?.detail || error?.response?.data?.failedAccounts)
          ? error?.response?.data?.detail ||
            error?.response?.data?.failedAccounts
              ?.map((el) => el?.accountNumber)
              ?.join(",")
          : // error?.response?.data?.failedAccounts?.map((el) => el?.msg)?.join(" ")
            error?.message,
    });
  }
};

// export const cookieTokenValidFunc = () => async (dispatch) => {
//   try {
//     dispatch({ type: CHECK_COOKIE_TOKEN_VALID_REQUEST });
//     const { data } = await axios.get(`.api.test/api/users/token/status`);

//     dispatch({
//       type: CHECK_COOKIE_TOKEN_VALID_SUCCESS,
//       payload: data,
//     });
//   } catch (error) {
//     dispatch({
//       type: CHECK_COOKIE_TOKEN_VALID_FAIL,
//       payload:
//         error.response && error.response.data.detail
//           ? error.response.data.detail
//           : error.message,
//     });
//   }
// };

export const logoutAdmin =
  (status = "") =>
  async (dispatch) => {
    const checkSession = sessionStorage.getItem("item_key");
    if (!status) {
      await axios.post(`${urlConfig.proxyUrl.PROXYURL}api/users/logout`);
    }

    dispatch({
      type: LOGOUT_ADMIN_USER,
    });

    if (!checkSession) {
    } else {
      cookie.remove("token");
      cookie.remove("adminStatusData");
      cookie.remove("employeeStatusData");
      cookie.remove("requiresPasswordChange");
      cookie.remove("companyId");
      // cookie.remove("companyLogo");
      cookie.remove("hr");
      cookie.remove("ia");
      cookie.remove("ceo");
      cookie.remove("acct");
      sessionStorage.removeItem("item_key");
    }

    // sessionStorage.removeItem("item_key");
  };

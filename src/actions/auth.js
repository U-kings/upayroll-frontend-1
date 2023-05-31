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
} from "../types/auth";

const proxyUrl = process.env.REACT_APP_PROXY_URL;

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
      `${proxyUrl}/api/users/admin-status`,
      config
    );
    dispatch({
      type: CHECK_ADMIN_LOGIN_STATUS_SUCCESS,
      payload: data,
    });
    cookie.set("companyId", data?.user?.companyId);
    cookie.set("companyLogo", data?.user?.company?.logo);
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

export const adminLoginFunc = (formData) => async (dispatch) => {
  const token = cookie.get("token");
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
      `${proxyUrl}/api/users/login`,
      body,
      config
    );
    dispatch({
      type: LOGIN_ADMIN_USER_SUCCESS,
    });
    cookie.set("token", data?.token);
    sessionStorage.setItem("item_key", data?.token);
    dispatch(adminLoginStatus());
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
  // const token = cookie.get("token");
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
      `${proxyUrl}/api/users/confirm-email/${resetToken}`,
      body,
      config
    );
    dispatch({
      type: CONFIRM_EMAIL_SUCCESS,
    });
    // cookie.set("token", data?.token);
    // dispatch(adminLoginStatus());
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
  const token = cookie.get("token");
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };
  try {
    dispatch({
      type: REGISTER_COMPANY_REQUEST,
    });
    const body = JSON.stringify(formData);
    await axios.post(`${proxyUrl}/api/company`, body, config);
    dispatch({
      type: REGISTER_COMPANY_SUCCESS,
    });
    // cookie.set("token", data?.token);
    // dispatch(adminLoginStatus());
  } catch (error) {
    dispatch({
      type: REGISTER_COMPANY_FAIL,
      payload:
        error?.response && error?.response?.data?.detail
          ? error.response.data.detail
          : error.message,
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
      `${proxyUrl}/api/users/register/admin/${companyId}`,
      body,
      config
    );
    dispatch({
      type: REGISTER_COMPANY_ADMIN_SUCCESS,
    });
    // cookie.set("token", data?.token);
    // dispatch(adminLoginStatus());
  } catch (error) {
    dispatch({
      type: REGISTER_COMPANY_ADMIN_FAIL,
      payload:
        error?.response && error?.response?.data?.detail
          ? error.response.data.detail
          : error.message,
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
      `${proxyUrl}/api/users/not-createdroles/company`,
      body,
      config
    );
    dispatch({
      type: GET_NOT_CREATED_ROLES_SUCCESS,
      payload: data,
    });

    // console.log(data);
    // cookie.set("token", data?.token);
    // dispatch(adminLoginStatus());
  } catch (error) {
    dispatch({
      type: GET_NOT_CREATED_ROLES_FAIL,
      payload:
        error?.response && error?.response?.data?.detail
          ? error.response.data.detail
          : error.message,
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
      `${proxyUrl}/api/users/admin-details`,
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

export const ceoUploadSignatureFunc = (signatureImgUrl) => async (dispatch) => {
  const token = cookie.get("token");
  const config = {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  };

  try {
    dispatch({ type: CEO_UPLOAD_SIGNATURE_IMAGE_REQUEST });
    const body = JSON.stringify({
      signaturePhoto: signatureImgUrl,
    });

    await axios.patch(`${proxyUrl}/api/users/signature-upload`, body, config);

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
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  };

  try {
    dispatch({ type: ADMIN_UPDATE_LOGGEDIN_DETAILS_REQUEST });
    const body = JSON.stringify(formData);
    await axios.patch(`${proxyUrl}/api/users/update-admin`, body, config);

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
    await axios.post(`${proxyUrl}/api/users/forgotPassword`, body, config);
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
      `${proxyUrl}/api/users/resetPassword/${token}`,
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

// export const cookieTokenValidFunc = () => async (dispatch) => {
//   try {
//     dispatch({ type: CHECK_COOKIE_TOKEN_VALID_REQUEST });
//     const { data } = await axios.get(`/api/users/token/status`);

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
      await axios.post(`${proxyUrl}/api/users/logout`);
    }

    dispatch({
      type: LOGOUT_ADMIN_USER,
    });

    cookie.remove("token");
    cookie.remove("adminStatusData");
    cookie.remove("companyId");
    cookie.remove("companyLogo");
    cookie.remove("hr");
    cookie.remove("ia");
    cookie.remove("ceo");
    cookie.remove("acct");
    sessionStorage.removeItem("item_key");

    // sessionStorage.removeItem("item_key");
  };

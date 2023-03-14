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
} from "../types/auth";

export const adminLoginStatus = (token) => async (dispatch) => {
  const token = cookie.get("token");

  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  try {
    dispatch({ type: CHECK_ADMIN_LOGIN_STATUS_REQUEST });
    const { data } = await axios.get(`/api/users/admin-status`, config);
    dispatch({
      type: CHECK_ADMIN_LOGIN_STATUS_SUCCESS,
      payload: data,
    });
    cookie.set("adminStatusData", JSON.stringify(data));
  } catch (error) {
    dispatch({
      type: CHECK_ADMIN_LOGIN_STATUS_FAIL,
      payload:
        error.response && error.response.data.detail
          ? error.response.data.detail
          : error.message,
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

    const { data } = await axios.post(`/api/users/login`, body, config);
    dispatch({
      type: LOGIN_ADMIN_USER_SUCCESS,
    });

    cookie.set("token", data?.token);
    dispatch(adminLoginStatus());
  } catch (error) {
    dispatch({
      type: LOGIN_ADMIN_USER_FAIL,
      payload:
        error.response && error.response.data.detail
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
    const { data } = await axios.get(`/api/users/admin-details`, config);
    dispatch({ type: ADMIN_LOGGEDIN_DETAILS_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: ADMIN_LOGGEDIN_DETAILS_FAIL,
      payload:
        error.response && error.response.data.detail
          ? error.response.data.detail
          : error.message,
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

    await axios.patch(`/api/users/signature-upload`, body, config);

    dispatch({ type: CEO_UPLOAD_SIGNATURE_IMAGE_SUCCESS });
  } catch (error) {
    dispatch({
      type: CEO_UPLOAD_SIGNATURE_IMAGE_FAIL,
      payload:
        error.response && error.response.data.detail
          ? error.response.data.detail
          : error.message,
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
    await axios.patch(`/api/users/update-admin`, body, config);

    dispatch({ type: ADMIN_UPDATE_LOGGEDIN_DETAILS_SUCCESS });
    dispatch(adminLoginStatus());
  } catch (error) {
    dispatch({
      type: ADMIN_UPDATE_LOGGEDIN_DETAILS_FAIL,
      payload:
        error.response && error.response.data.detail
          ? error.response.data.detail
          : error.message,
    });
  }
};

// export const adminForgotPasswordFunc = (adminEmail) => async (dispatch) => {
//   const config = {
//     headers: {
//       "Content-Type": "application/json",
//     },
//   };

//   try {
//     dispatch({ type: ADMIN_FORGOT_PASSWORD_REQUEST });
//     const body = JSON.stringify(adminEmail);
//     await axios.post(`/api/users/forgotPassword`, body, config);
//     dispatch({ type: ADMIN_FORGOT_PASSWORD_SUCCESS });
//   } catch (error) {
//     dispatch({
//       type: ADMIN_FORGOT_PASSWORD_FAIL,
//       payload:
//         error.response && error.response.data.detail
//           ? error.response.data.detail
//           : error.message,
//     });
//   }
// };

// export const adminResetPasswordFunc = (token, formData) => async (dispatch) => {
//   const config = {
//     headers: {
//       "Content-Type": "application/json",
//     },
//   };

//   try {
//     dispatch({ type: ADMIN_RESET_PASSWORD_REQUEST });
//     const body = JSON.stringify(formData);
//     await axios.patch(`/api/users/resetPassword/${token}`, body, config);
//     dispatch({
//       type: ADMIN_RESET_PASSWORD_SUCCESS,
//     });
//     dispatch(adminLoginStatus());
//   } catch (error) {
//     dispatch({
//       type: ADMIN_RESET_PASSWORD_FAIL,
//       payload:
//         error.response && error.response.data.detail
//           ? error.response.data.detail
//           : error.message,
//     });
//   }
// };

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
    if (!status) {
      await axios.post(`/api/users/logout`);
    }

    dispatch({
      type: LOGOUT_ADMIN_USER,
    });
    cookie.remove("token");
    cookie.remove("adminStatusData");
  };

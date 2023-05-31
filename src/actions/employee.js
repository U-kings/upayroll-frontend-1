import axios from "axios";
import cookie from "js-cookie";
import {
  ADMIN_CREATE_EMPLOYEE_FAIL,
  ADMIN_CREATE_EMPLOYEE_REQUEST,
  ADMIN_CREATE_EMPLOYEE_SUCCESS,
  ADMIN_GET_ALL_EMPLOYEE_FAIL,
  ADMIN_GET_ALL_EMPLOYEE_REQUEST,
  ADMIN_GET_ALL_EMPLOYEE_SUCCESS,
  ADMIN_UPDATE_EMPLOYEE_BY_ID_FAIL,
  ADMIN_UPDATE_EMPLOYEE_BY_ID_REQUEST,
  ADMIN_UPDATE_EMPLOYEE_BY_ID_SUCCESS,
  ADMIN_DELETE_EMPLOYEE_BY_ID_FAIL,
  ADMIN_DELETE_EMPLOYEE_BY_ID_REQUEST,
  ADMIN_DELETE_EMPLOYEE_BY_ID_SUCCESS,
  ADMIN_EMPLOYEE_TOPUP_FAIL,
  ADMIN_EMPLOYEE_TOPUP_REQUEST,
  ADMIN_EMPLOYEE_TOPUP_SUCCESS,
  ADMIN_DELETE_EMPLOYEE_ALLOWANCE_BY_ID_FAIL,
  ADMIN_DELETE_EMPLOYEE_ALLOWANCE_BY_ID_REQUEST,
  ADMIN_DELETE_EMPLOYEE_ALLOWANCE_BY_ID_SUCCESS,
  ADMIN_DELETE_EMPLOYEE_DEDUCTION_BY_ID_FAIL,
  ADMIN_DELETE_EMPLOYEE_DEDUCTION_BY_ID_REQUEST,
  ADMIN_DELETE_EMPLOYEE_DEDUCTION_BY_ID_SUCCESS,
  ADMIN_DELETE_BULK_EMPLOYEES_BY_IDS_REQUEST,
  ADMIN_DELETE_BULK_EMPLOYEES_BY_IDS_SUCCESS,
  ADMIN_DELETE_BULK_EMPLOYEES_BY_IDS_FAIL,
  ADMIN_CREATE_BULK_EMPLOYEE_FAIL,
  ADMIN_CREATE_BULK_EMPLOYEE_REQUEST,
  ADMIN_CREATE_BULK_EMPLOYEE_SUCCESS,
  HR_UPLOAD_CONTRACT_EMPLOYEE_REQUEST,
  HR_UPLOAD_CONTRACT_EMPLOYEE_SUCCESS,
  HR_UPLOAD_CONTRACT_EMPLOYEE_FAIL,
  EMPLOYEE_GET_ALL_PAYSLIPS_FAIL,
  EMPLOYEE_GET_ALL_PAYSLIPS_SUCCESS,
  EMPLOYEE_GET_ALL_PAYSLIPS_REQUEST,
  EMPLOYEE_GET_PERSONAL_DETAILS_FAIL,
  EMPLOYEE_GET_PERSONAL_DETAILS_REQUEST,
  EMPLOYEE_GET_PERSONAL_DETAILS_SUCCESS,
} from "../types/employee";

const proxyUrl = process.env.REACT_APP_PROXY_URL;

export const adminGetAllEmployee =
  (month = "") =>
  async (dispatch) => {
    const token = cookie.get("token");
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    try {
      dispatch({ type: ADMIN_GET_ALL_EMPLOYEE_REQUEST });
      const { data } = await axios.get(
        `${proxyUrl}/api/employees/not-generated/payslips${
          month && `?month=${month}`
        }`,
        config
      );
      dispatch({ type: ADMIN_GET_ALL_EMPLOYEE_SUCCESS, payload: data });
    } catch (error) {
      dispatch({
        type: ADMIN_GET_ALL_EMPLOYEE_FAIL,
        payload:
          error.response && error.response.data.detail
            ? error.response.data.detail
            : error.message,
      });
    }
  };

export const adminCreateEmployee =
  (departId, positionId, formData) => async (dispatch) => {
    const token = cookie.get("token");
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    };

    try {
      dispatch({
        type: ADMIN_CREATE_EMPLOYEE_REQUEST,
      });

      const body = JSON.stringify(formData);

      await axios.post(
        `${proxyUrl}/api/employees/${departId}/${positionId}/create`,
        body,
        config
      );
      dispatch({
        type: ADMIN_CREATE_EMPLOYEE_SUCCESS,
      });
    } catch (error) {
      dispatch({
        type: ADMIN_CREATE_EMPLOYEE_FAIL,
        payload:
          error.response && error.response.data.detail
            ? error.response.data.detail
            : error.message,
      });
    }
  };

export const adminCreateBulkEmployeeFunc = (bulkData) => async (dispatch) => {
  const token = cookie.get("token");
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  };

  try {
    dispatch({ type: ADMIN_CREATE_BULK_EMPLOYEE_REQUEST });
    const body = JSON.stringify({
      employeesArr: bulkData,
    });
    await axios.post(`${proxyUrl}/api/employees/create-bulk`, body, config);
    dispatch({ type: ADMIN_CREATE_BULK_EMPLOYEE_SUCCESS });
  } catch (error) {
    dispatch({
      type: ADMIN_CREATE_BULK_EMPLOYEE_FAIL,
      payload:
        error?.response &&
        (error?.response?.data?.detail || error?.response?.data?.errors)
          ? error?.response?.data?.detail ||
            error?.response?.data?.errors?.map((el) => el?.msg)?.join(" ")
          : error?.message,
    });
  }
};

export const hrUploadBulkContractStaffFunc =
  (uploadData) => async (dispatch) => {
    const token = cookie.get("token");
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    };

    try {
      dispatch({ type: HR_UPLOAD_CONTRACT_EMPLOYEE_REQUEST });
      const body = JSON.stringify({
        data: {
          employeesArr: uploadData,
        },
      });
      await axios.patch(
        `${proxyUrl}/api/employees/create-bulk/contract`,
        body,
        config
      );
      dispatch({ type: HR_UPLOAD_CONTRACT_EMPLOYEE_SUCCESS });
    } catch (error) {
      dispatch({
        type: HR_UPLOAD_CONTRACT_EMPLOYEE_FAIL,
        payload:
          error.response && error.response.data.detail
            ? error.response.data.detail
            : error.message,
      });
    }
  };

export const adminUpdateEmployeeById =
  (empId, departId, postId, formData, month) => async (dispatch) => {
    const token = cookie.get("token");
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    };

    try {
      dispatch({
        type: ADMIN_UPDATE_EMPLOYEE_BY_ID_REQUEST,
      });
      const body = JSON.stringify(formData);
      await axios.patch(
        `${proxyUrl}/api/employees/${empId}/${departId}/${postId}/update`,
        body,
        config
      );
      dispatch({ type: ADMIN_UPDATE_EMPLOYEE_BY_ID_SUCCESS });
      dispatch(adminGetAllEmployee(month));
    } catch (error) {
      dispatch({
        type: ADMIN_UPDATE_EMPLOYEE_BY_ID_FAIL,
        payload:
          error.response && error.response.data.detail
            ? error.response.data.detail
            : error.message,
      });
    }
  };

export const adminDeleteEmployeeById = (id, month) => async (dispatch) => {
  const token = cookie.get("token");
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  try {
    dispatch({ type: ADMIN_DELETE_EMPLOYEE_BY_ID_REQUEST });
    await axios.delete(`${proxyUrl}/api/employees/${id}`, config);
    dispatch({
      type: ADMIN_DELETE_EMPLOYEE_BY_ID_SUCCESS,
    });
    dispatch(adminGetAllEmployee(month));
  } catch (error) {
    dispatch({
      type: ADMIN_DELETE_EMPLOYEE_BY_ID_FAIL,
      payload:
        error?.response &&
        (error?.response?.data?.detail || error?.response?.data?.errors)
          ? error?.response?.data?.detail ||
            error?.response?.data?.errors?.map((el) => el?.msg)?.join(" ")
          : error?.message,
    });
  }
};

export const adminDeleteEmployeesByIds =
  (empIds, month) => async (dispatch) => {
    const token = cookie.get("token");
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    };
    try {
      dispatch({ type: ADMIN_DELETE_BULK_EMPLOYEES_BY_IDS_REQUEST });
      const body = JSON.stringify({
        employeeArrIds: empIds,
      });
      await axios.patch(`${proxyUrl}/api/employees/delete-bulk`, body, config);
      dispatch({ type: ADMIN_DELETE_BULK_EMPLOYEES_BY_IDS_SUCCESS });
      dispatch(adminGetAllEmployee(month));
    } catch (error) {
      dispatch({
        type: ADMIN_DELETE_BULK_EMPLOYEES_BY_IDS_FAIL,
        payload:
          error.response && error.response.data.detail
            ? error.response.data.detail
            : error.message,
      });
    }
  };

export const adminEmployeeTopUp = (empId, formdata) => async (dispatch) => {
  const token = cookie.get("token");
  const config = {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  };

  try {
    dispatch({
      type: ADMIN_EMPLOYEE_TOPUP_REQUEST,
    });
    const body = JSON.stringify(formdata);
    await axios.post(
      `${proxyUrl}/api/employees/${empId}/payheads-topup`,
      body,
      config
    );
    dispatch({
      type: ADMIN_EMPLOYEE_TOPUP_SUCCESS,
    });
  } catch (error) {
    dispatch({
      type: ADMIN_EMPLOYEE_TOPUP_FAIL,
      payload:
        error?.response &&
        (error?.response?.data?.detail || error?.response?.data?.errors)
          ? error?.response?.data?.detail ||
            error?.response?.data?.errors?.map((el) => el?.msg)?.join(" ")
          : error?.message,
    });
  }
};

export const adminDeleteEmployeeAllowance =
  (empId, allowanceId) => async (dispatch) => {
    const token = cookie.get("token");
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    };

    try {
      dispatch({
        type: ADMIN_DELETE_EMPLOYEE_ALLOWANCE_BY_ID_REQUEST,
      });
      await axios.patch(
        `${proxyUrl}/api/employees/${empId}/${allowanceId}/allowance/remove`,
        {},
        config
      );
      dispatch({
        type: ADMIN_DELETE_EMPLOYEE_ALLOWANCE_BY_ID_SUCCESS,
      });
    } catch (error) {
      dispatch({
        type: ADMIN_DELETE_EMPLOYEE_ALLOWANCE_BY_ID_FAIL,
        payload:
          error.response && error.response.data.detail
            ? error.response.data.detail
            : error.message,
      });
    }
  };

export const adminDeleteEmployeeDeduction =
  (empId, deductionId) => async (dispatch) => {
    const token = cookie.get("token");
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    };

    try {
      dispatch({
        type: ADMIN_DELETE_EMPLOYEE_DEDUCTION_BY_ID_REQUEST,
      });
      await axios.patch(
        `${proxyUrl}/api/employees/${empId}/${deductionId}/deduction/remove`,
        {},
        config
      );
      dispatch({
        type: ADMIN_DELETE_EMPLOYEE_DEDUCTION_BY_ID_SUCCESS,
      });
    } catch (error) {
      dispatch({
        type: ADMIN_DELETE_EMPLOYEE_DEDUCTION_BY_ID_FAIL,
        payload:
          error.response && error.response.data.detail
            ? error.response.data.detail
            : error.message,
      });
    }
  };

export const employeeGetAllPayslipsFunc = () => async (dispatch) => {
  const token = cookie.get("token");
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  try {
    dispatch({ type: EMPLOYEE_GET_ALL_PAYSLIPS_REQUEST });
    const { data } = await axios.get(
      `${proxyUrl}/api/employees/get-generated/payslips`,
      config
    );
    dispatch({ type: EMPLOYEE_GET_ALL_PAYSLIPS_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: EMPLOYEE_GET_ALL_PAYSLIPS_FAIL,
      payload:
        error?.response &&
        (error?.response?.data?.detail || error?.response?.data?.errors)
          ? error?.response?.data?.detail ||
            error?.response?.data?.errors?.map((el) => el?.msg)?.join(" ")
          : error?.message,
    });
  }
};

export const employeeGetPersonalDetailsFunc = () => async (dispatch) => {
  const token = cookie.get("token");
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  try {
    dispatch({ type: EMPLOYEE_GET_PERSONAL_DETAILS_REQUEST });
    const { data } = await axios.get(
      `${proxyUrl}/api/employees/loginuser/details`,
      config
    );
    dispatch({ type: EMPLOYEE_GET_PERSONAL_DETAILS_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: EMPLOYEE_GET_PERSONAL_DETAILS_FAIL,
      payload:
        error?.response &&
        (error?.response?.data?.detail || error?.response?.data?.errors)
          ? error?.response?.data?.detail ||
            error?.response?.data?.errors?.map((el) => el?.msg)?.join(" ")
          : error?.message,
    });
  }
};

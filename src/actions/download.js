import axios from "axios";
import cookie from "js-cookie";
import { saveAs } from "file-saver";
import {
  DOWNLOADING_ON_PROCESS_DONE,
  DOWNLOADING_ON_PROCESS_ERROR,
  DOWNLOADING_ON_PROCESS_REQUEST,
} from "../types/download";

import { urlConfig } from "../util/config/config";

// export const fileName = (response) => {
//   console.log(response);
//   return response
//     ? response.headers["content-disposition"]?.split("filename=")[1]
//     : "";
// };

// Helper function to get file name from response
export const fileName = (response) => {
  console.log(response);
  const contentDisposition =
    response && response.headers && response.headers["content-disposition"];
  if (contentDisposition) {
    const fileNameMatch = contentDisposition.match(/filename="?([^"]+)"?/);
    return fileNameMatch ? fileNameMatch[1] : "downloaded_file.xlsx";
  }
  return "downloaded_file.xlsx";
};

export const downloadSalaryAndVoucherExcelFileFunc =
  (type, modelType, month, dataArr) => async (dispatch) => {
    const token = cookie.get("token");
    const config = {
      headers: {
        // "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      responseType: "blob",
    };

    try {
      dispatch({ type: DOWNLOADING_ON_PROCESS_REQUEST });
      const body = JSON.stringify(dataArr);
      const response = await axios.post(
        `${urlConfig.url.PROXYURL}api/storage/create-excel-file/salaryslip?type=${type}&modelType=${modelType}&month=${month}`,
        body,
        config
      );

      // Create a blob URL for the downloaded file
      const url = window.URL.createObjectURL(new Blob([response?.data]));

      // Create a temporary <a> element to trigger the download
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", fileName(response));

      document.body.appendChild(link);
      link.click();

      // Clean up
      window.URL.revokeObjectURL(url);
      document.body.removeChild(link);

      // const res = await axios.get(
      //   `${urlConfig.url.PROXYURL}api/storage/client-download-file?fileName=${data?.fileName}`,
      //   {
      //     responseType: "blob",
      //   }
      // );

      // const exelBlob = new Blob([res.data], {
      //   type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;base64,",
      // });

      // saveAs(
      //   exelBlob,
      //   `${data?.fileName.split("/")[2].replace("csv", "xlsx")}`
      // );

      dispatch({ type: DOWNLOADING_ON_PROCESS_DONE });
    } catch (error) {
      dispatch({
        type: DOWNLOADING_ON_PROCESS_ERROR,
        payload:
          error?.response &&
          (error?.response?.data?.detail || error?.response?.data?.errors)
            ? error?.response?.data?.detail ||
              error?.response?.data?.errors?.map((el) => el?.msg)?.join(" ")
            : error?.message,
      });
    }
  };

export const downloadEmployeeSummaryExcelFileFunc =
  (dataArr) => async (dispatch) => {
    const token = cookie.get("token");
    const config = {
      headers: {
        // "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      responseType: "blob",
    };

    try {
      dispatch({ type: DOWNLOADING_ON_PROCESS_REQUEST });
      const body = JSON.stringify(dataArr);
      const response = await axios.post(
        `${urlConfig.url.PROXYURL}api/storage/create-excel-file/employee`,
        body,
        config
      );

      // Create a blob URL for the downloaded file
      const url = window.URL.createObjectURL(new Blob([response?.data]));

      // Create a temporary <a> element to trigger the download
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", fileName(response));

      document.body.appendChild(link);
      link.click();

      // Clean up
      window.URL.revokeObjectURL(url);
      document.body.removeChild(link);
      // const res = await axios.get(
      //   `${urlConfig.url.PROXYURL}api/storage/client-download-file?fileName=${data?.fileName}`,
      //   {
      //     responseType: "blob",
      //   }
      // );

      // const exelBlob = new Blob([res.data], {
      //   type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;base64,",
      // });

      // saveAs(
      //   exelBlob,
      //   `${data?.fileName.split("/")[2].replace("csv", "xlsx")}`
      //   );
      dispatch({ type: DOWNLOADING_ON_PROCESS_DONE });
    } catch (error) {
      dispatch({
        type: DOWNLOADING_ON_PROCESS_ERROR,
        payload:
          error?.response &&
          (error?.response?.data?.detail || error?.response?.data?.errors)
            ? error?.response?.data?.detail ||
              error?.response?.data?.errors?.map((el) => el?.msg)?.join(" ")
            : error?.message,
      });
    }
  };

export const downloadEmployeeTemplateAsExcel = () => async (dispatch) => {
  const token = cookie.get("token");
  // dispatch(cookieTokenValidFunc());
  const config = {
    headers: {
      // "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    responseType: "blob",
  };

  try {
    dispatch({ type: DOWNLOADING_ON_PROCESS_REQUEST });
    const body = JSON.stringify({});
    // const response = await axios.post(
    const response = await axios.post(
      `${urlConfig.url.PROXYURL}api/storage/create-bulk-template`,
      body,
      config
    );

    // Create a blob URL for the downloaded file
    const url = window.URL.createObjectURL(new Blob([response?.data]));

    console.log(response.headers["content-disposition"]?.split("filename=")[1]);

    // Create a temporary <a> element to trigger the download
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", fileName(response));
    document.body.appendChild(link);
    link.click();

    // Clean up
    window.URL.revokeObjectURL(url);
    document.body.removeChild(link);

    // const res = await axios.get(
    //   `${urlConfig.url.PROXYURL}api/storage/client-download-file?fileName=${data?.fileName}`,
    //   {
    //     responseType: "blob",
    //   }
    // );

    // const exelBlob = new Blob([res.data], {
    //   type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;base64,",
    // });

    // saveAs(exelBlob, `${data?.fileName.split("/")[2].replace("csv", "xlsx")}`);
    dispatch({ type: DOWNLOADING_ON_PROCESS_DONE });
  } catch (error) {
    dispatch({
      type: DOWNLOADING_ON_PROCESS_ERROR,
      payload:
        error?.response &&
        (error?.response?.data?.detail || error?.response?.data?.errors)
          ? error?.response?.data?.detail ||
            error?.response?.data?.errors?.map((el) => el?.msg)?.join(" ")
          : error?.message,
    });
  }
};

export const downloadEmployeeWithNoGradeTemplateAsExcel =
  () => async (dispatch) => {
    const token = cookie.get("token");
    // dispatch(cookieTokenValidFunc());
    const config = {
      headers: {
        // "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      responseType: "blob",
    };

    try {
      dispatch({ type: DOWNLOADING_ON_PROCESS_REQUEST });
      const body = JSON.stringify({});
      const response = await axios.post(
        `${urlConfig.url.PROXYURL}api/storage/create-bulk-template/employee-no-grade`,
        body,
        config
      );

      // Create a blob URL for the downloaded file
      const url = window.URL.createObjectURL(new Blob([response?.data]));

      // Create a temporary <a> element to trigger the download
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", fileName(response));

      document.body.appendChild(link);
      link.click();

      // Clean up
      window.URL.revokeObjectURL(url);
      document.body.removeChild(link);
      // const res = await axios.get(
      //   `${urlConfig.url.PROXYURL}api/storage/client-download-file?fileName=${data?.fileName}`,
      //   {
      //     responseType: "blob",
      //   }
      // );

      // const exelBlob = new Blob([res.data], {
      //   type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;base64,",
      // });

      // saveAs(
      //   exelBlob,
      //   `${data?.fileName.split("/")[2].replace("csv", "xlsx")}`
      //   );
      dispatch({ type: DOWNLOADING_ON_PROCESS_DONE });
    } catch (error) {
      dispatch({
        type: DOWNLOADING_ON_PROCESS_ERROR,
        payload:
          error?.response &&
          (error?.response?.data?.detail || error?.response?.data?.errors)
            ? error?.response?.data?.detail ||
              error?.response?.data?.errors?.map((el) => el?.msg)?.join(" ")
            : error?.message,
      });
    }
  };

export const downloadContractBulkEmployeeTemplateExcelFileFunc =
  () => async (dispatch) => {
    const token = cookie.get("token");
    const config = {
      headers: {
        // "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      responseType: "blob",
    };

    try {
      dispatch({ type: DOWNLOADING_ON_PROCESS_REQUEST });
      const body = JSON.stringify({});
      const response = await axios.post(
        `${urlConfig.url.PROXYURL}api/storage/create-bulk-template/contract`,
        body,
        config
      );

      // Create a blob URL for the downloaded file
      const url = window.URL.createObjectURL(new Blob([response?.data]));

      // Create a temporary <a> element to trigger the download
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", fileName(response));

      document.body.appendChild(link);
      link.click();

      // Clean up
      window.URL.revokeObjectURL(url);
      document.body.removeChild(link);
      // const res = await axios.get(
      //   `${urlConfig.url.PROXYURL}api/storage/client-download-file?fileName=${data?.fileName}`,
      //   {
      //     responseType: "blob",
      //   }
      // );

      // const exelBlob = new Blob([res.data], {
      //   type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;base64,",
      // });

      // saveAs(
      //   exelBlob,
      //   `${data?.fileName.split("/")[2].replace("csv", "xlsx")}`
      //   );
      dispatch({ type: DOWNLOADING_ON_PROCESS_DONE });
    } catch (error) {
      dispatch({
        type: DOWNLOADING_ON_PROCESS_ERROR,
        payload:
          error?.response &&
          (error?.response?.data?.detail || error?.response?.data?.errors)
            ? error?.response?.data?.detail ||
              error?.response?.data?.errors?.map((el) => el?.msg)?.join(" ")
            : error?.message,
      });
    }
  };

export const downloadPayStructureTemplateExcelFileFunc =
  (type) => async (dispatch) => {
    const token = cookie.get("token");
    // dispatch(cookieTokenValidFunc());
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      responseType: "blob",
    };

    try {
      dispatch({ type: DOWNLOADING_ON_PROCESS_REQUEST });
      const body = JSON.stringify({});
      const response = await axios.post(
        `${urlConfig.url.PROXYURL}api/storage/create-paystructure-template?type=${type}`,
        body,
        config
      );

      // Create a blob URL for the downloaded file
      const url = window.URL.createObjectURL(new Blob([response?.data]));

      // Create a temporary <a> element to trigger the download
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", fileName(response));

      document.body.appendChild(link);
      link.click();

      // Clean up
      window.URL.revokeObjectURL(url);
      document.body.removeChild(link);
      // const res = await axios.get(
      //   `${urlConfig.url.PROXYURL}api/storage/client-download-file?fileName=${data?.fileName}`,
      //   {
      //     responseType: "blob",
      //   }
      // );

      // const exelBlob = new Blob([res.data], {
      //   type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;base64,",
      // });

      // saveAs(
      //   exelBlob,
      //   `${data?.fileName.split("/")[2].replace("csv", "xlsx")}`
      // );

      dispatch({ type: DOWNLOADING_ON_PROCESS_DONE });
    } catch (error) {
      dispatch({
        type: DOWNLOADING_ON_PROCESS_ERROR,
        payload:
          error?.response &&
          (error?.response?.data?.detail || error?.response?.data?.errors)
            ? error?.response?.data?.detail ||
              error?.response?.data?.errors?.map((el) => el?.msg)?.join(" ")
            : error?.message,
      });
    }
  };

export const downloadPositionTemplateExcelFileFunc = () => async (dispatch) => {
  const token = cookie.get("token");
  // dispatch(cookieTokenValidFunc());
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
      // "Content-Type": "application/json",
    },
    responseType: "blob",
  };

  try {
    dispatch({ type: DOWNLOADING_ON_PROCESS_REQUEST });
    const body = JSON.stringify({});
    const response = await axios.post(
      // `${urlConfig.url.PROXYURL}download-excel`,
      `${urlConfig.url.PROXYURL}api/storage/create-bulk-template/position`,
      body,
      config
    );

    // Create a blob URL for the downloaded file
    const url = window.URL.createObjectURL(new Blob([response?.data]));

    // Create a temporary <a> element to trigger the download
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", fileName(response));

    document.body.appendChild(link);
    link.click();

    // Clean up
    window.URL.revokeObjectURL(url);
    document.body.removeChild(link);

    // const res = await axios.get(
    //   `${urlConfig.url.PROXYURL}api/storage/client-download-file?fileName=${data?.fileName}`,
    //   {
    //     responseType: "blob",
    //   }
    // );

    // const exelBlob = new Blob([res.data], {
    //   type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;base64,",
    // });

    // saveAs(exelBlob, `${data?.fileName.split("/")[2].replace("csv", "xlsx")}`);

    dispatch({ type: DOWNLOADING_ON_PROCESS_DONE });
  } catch (error) {
    dispatch({
      type: DOWNLOADING_ON_PROCESS_ERROR,
      payload:
        error?.response &&
        (error?.response?.data?.detail || error?.response?.data?.errors)
          ? error?.response?.data?.detail ||
            error?.response?.data?.errors?.map((el) => el?.msg)?.join(" ")
          : error?.message,
    });
  }
};

export const downloadBankScheduleExcelFileFunc =
  (bankName, modelType, month, bankScheduleId) => async (dispatch) => {
    const token = cookie.get("token");
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      responseType: "blob",
    };

    try {
      dispatch({ type: DOWNLOADING_ON_PROCESS_REQUEST });
      // const body = JSON.stringify(dataArr);
      const body = {};
      const response = await axios.post(
        // `${urlConfig.url.PROXYURL}api/storage/create-excel-file/bankschedule?bankName=${bankName}&modelType=${modelType}&month=${month}`,
        `${urlConfig.url.PROXYURL}api/storage/create-excel-file/bankschedule/v2?bankName=${bankName}&modelType=${modelType}&month=${month}&bankScheduleId=${bankScheduleId}`,
        body,
        config
      );

      // Create a blob URL for the downloaded file
      const url = window.URL.createObjectURL(new Blob([response?.data]));

      // Create a temporary <a> element to trigger the download
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", fileName(response));

      document.body.appendChild(link);
      link.click();

      // Clean up
      window.URL.revokeObjectURL(url);
      document.body.removeChild(link);
      // const res = await axios.get(
      //   `${urlConfig.url.PROXYURL}api/storage/client-download-file?fileName=${data?.fileName}`,
      //   {
      //     responseType: "blob",
      //   }
      // );
      // const exelBlob = new Blob([res.data], {
      //   type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;base64,",
      // });

      // saveAs(exelBlob, `${data?.fileName.split("/")[2]}`);
      dispatch({ type: DOWNLOADING_ON_PROCESS_DONE });
    } catch (error) {
      dispatch({
        type: DOWNLOADING_ON_PROCESS_ERROR,
        payload:
          error?.response &&
          (error?.response?.data?.detail || error?.response?.data?.errors)
            ? error?.response?.data?.detail ||
              error?.response?.data?.errors?.map((el) => el?.msg)?.join(" ")
            : error?.message,
      });
    }
  };

export const downloadBankScheduleSterlingProExcelFileFunc =
  (bankName, modelType, month, bankScheduleId) => async (dispatch) => {
    const token = cookie.get("token");
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      responseType: "blob",
    };

    try {
      dispatch({ type: DOWNLOADING_ON_PROCESS_REQUEST });
      // const body = JSON.stringify(dataArr);
      const body = {};
      const response = await axios.post(
        `${urlConfig.url.PROXYURL}api/storage/create-excel-file/bankschedule/sterlingbank/v2?bankName=${bankName}&modelType=${modelType}&month=${month}&bankScheduleId=${bankScheduleId}`,
        // `${urlConfig.url.PROXYURL}api/storage/create-excel-file/bankschedule?bankName=${bankName}&modelType=${modelType}&month=${month}`,
        body,
        config
      );

      // Create a blob URL for the downloaded file
      const url = window.URL.createObjectURL(new Blob([response?.data]));

      // Create a temporary <a> element to trigger the download
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", fileName(response));

      document.body.appendChild(link);
      link.click();

      // Clean up
      window.URL.revokeObjectURL(url);
      document.body.removeChild(link);
      // const res = await axios.get(
      //   `${urlConfig.url.PROXYURL}api/storage/client-download-file?fileName=${data?.fileName}`,
      //   {
      //     responseType: "blob",
      //   }
      // );
      // const exelBlob = new Blob([res.data], {
      //   type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;base64,",
      // });

      // saveAs(exelBlob, `${data?.fileName.split("/")[2]}`);
      dispatch({ type: DOWNLOADING_ON_PROCESS_DONE });
    } catch (error) {
      dispatch({
        type: DOWNLOADING_ON_PROCESS_ERROR,
        payload:
          error?.response &&
          (error?.response?.data?.detail || error?.response?.data?.errors)
            ? error?.response?.data?.detail ||
              error?.response?.data?.errors?.map((el) => el?.msg)?.join(" ")
            : error?.message,
      });
    }
  };

export const downloadBankSchedulePdfFileFunc =
  (
    bank,
    companyBankAcct,
    authorizedBy,
    modelType,
    month,
    ceoSignature,
    // dataArr,
    // subTotal,
    bankScheduleId
  ) =>
  async (dispatch) => {
    const token = cookie.get("token");
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      responseType: "blob",
    };

    try {
      dispatch({ type: DOWNLOADING_ON_PROCESS_REQUEST });
      const body = JSON.stringify({
        bankName: bank.name,
        bankAddress: bank.bankAddress,
        bankAcctNumber: companyBankAcct,
        month,
        ceoSignature,
        // subTotal,
        authorizedBy,
        // results: dataArr,
      });

      const response = await axios.post(
        `${urlConfig.url.PROXYURL}api/storage/create-pdf-file/bankschedule/v2?bankName=${bank.name}&modelType=${modelType}&month=${month}&bankScheduleId=${bankScheduleId}`,
        body,
        config
      );

      // Create blob object
      const blob = new Blob([response.data], { type: "application/pdf" });

      // Create a blob URL for the downloaded file
      const url = window.URL.createObjectURL(blob);
      console.log(url);

      // Create a temporary <a> element to trigger the download
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", fileName(response));

      document.body.appendChild(link);
      link.click();

      // Clean up
      window.URL.revokeObjectURL(url);
      document.body.removeChild(link);
      // const res = await axios.get(
      //   `${urlConfig.url.PROXYURL}api/storage/client-download-file?fileName=${data?.fileName}`,
      //   {
      //     responseType: "blob",
      //   }
      // );
      // const exelBlob = new Blob([res.data], {
      //   type: "application/pdf",
      // });

      // saveAs(exelBlob, `${data?.fileName.split("/")[2]}`);
      dispatch({ type: DOWNLOADING_ON_PROCESS_DONE });
    } catch (error) {
      // console.log(error?.response);
      dispatch({
        type: DOWNLOADING_ON_PROCESS_ERROR,
        payload:
          error?.response &&
          (error?.response?.data?.detail ||
            // error?.response?.data?.status ||
            error?.response?.data?.errors)
            ? error?.response?.data?.detail ||
              // error?.response?.data?.status ||
              error?.response?.data?.errors?.map((el) => el?.msg)?.join(" ")
            : error?.message,
        // payload:
        //   error?.response &&
        //   (error?.response?.data?.detail || error?.response?.data?.errors)
        //     ? error?.response?.data?.detail ||
        //       error?.response?.data?.errors?.map((el) => el?.msg)?.join(" ")
        //     : error?.message,
      });
    }
  };

export const downloadPayeScheduleExcelFileFunc =
  (month, year, dataArr) => async (dispatch) => {
    const token = cookie.get("token");
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      responseType: "blob",
    };

    try {
      dispatch({ type: DOWNLOADING_ON_PROCESS_REQUEST });
      const body = JSON.stringify(dataArr);
      const response = await axios.post(
        `${urlConfig.url.PROXYURL}api/storage/create-excel-file/paye?year=${year}&month=${month}`,
        body,
        config
      );

      // Create a blob URL for the downloaded file
      const url = window.URL.createObjectURL(new Blob([response?.data]));

      // Create a temporary <a> element to trigger the download
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", fileName(response));

      document.body.appendChild(link);
      link.click();

      // Clean up
      window.URL.revokeObjectURL(url);
      document.body.removeChild(link);
      // const res = await axios.get(
      //   `${urlConfig.url.PROXYURL}api/storage/client-download-file?fileName=${data?.fileName}`,
      //   {
      //     responseType: "blob",
      //   }
      // );
      // const exelBlob = new Blob([res.data], {
      //   type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;base64,",
      // });

      // saveAs(exelBlob, `${data?.fileName.split("/")[2]}`);
      dispatch({ type: DOWNLOADING_ON_PROCESS_DONE });
    } catch (error) {
      dispatch({
        type: DOWNLOADING_ON_PROCESS_ERROR,
        payload:
          error?.response &&
          (error?.response?.data?.detail || error?.response?.data?.errors)
            ? error?.response?.data?.detail ||
              error?.response?.data?.errors?.map((el) => el?.msg)?.join(" ")
            : error?.message,
      });
    }
  };

export const downloadPensionScheduleExcelFileFunc =
  (month, year, dataArr) => async (dispatch) => {
    const token = cookie.get("token");
    const config = {
      headers: {
        // "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      responseType: "blob",
    };

    try {
      dispatch({ type: DOWNLOADING_ON_PROCESS_REQUEST });
      const body = JSON.stringify(dataArr);
      const response = await axios.post(
        `${urlConfig.url.PROXYURL}api/storage/create-excel-file/pension?year=${year}&month=${month}`,
        body,
        config
      );

      // Create a blob URL for the downloaded file
      const url = window.URL.createObjectURL(new Blob([response?.data]));

      // Create a temporary <a> element to trigger the download
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", fileName(response));

      document.body.appendChild(link);
      link.click();

      // Clean up
      window.URL.revokeObjectURL(url);
      document.body.removeChild(link);
      // const res = await axios.get(
      //   `${urlConfig.url.PROXYURL}api/storage/client-download-file?fileName=${data?.fileName}`,
      //   {
      //     responseType: "blob",
      //   }
      // );
      // const exelBlob = new Blob([res.data], {
      //   type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;base64,",
      // });

      // saveAs(exelBlob, `${data?.fileName.split("/")[2]}`);
      dispatch({ type: DOWNLOADING_ON_PROCESS_DONE });
    } catch (error) {
      dispatch({
        type: DOWNLOADING_ON_PROCESS_ERROR,
        payload:
          error?.response &&
          (error?.response?.data?.detail || error?.response?.data?.errors)
            ? error?.response?.data?.detail ||
              error?.response?.data?.errors?.map((el) => el?.msg)?.join(" ")
            : error?.message,
        // payload:
        //   error.response && error.response.data.detail
        //     ? error.response.data.detail
        //     : error.message,
      });
    }
  };

export const downloadPayePdfFileFunc =
  (month, dataArr, year) => async (dispatch) => {
    const token = cookie.get("token");
    const config = {
      headers: {
        // "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      responseType: "blob",
    };

    try {
      dispatch({ type: DOWNLOADING_ON_PROCESS_REQUEST });
      const body = JSON.stringify(dataArr);
      const response = await axios.post(
        `${urlConfig.url.PROXYURL}api/storage/create-pdf-file/paye?month=${month}&year=${year}`,
        body,
        config
      );

      // Create a blob URL for the downloaded file
      const url = window.URL.createObjectURL(new Blob([response?.data]));

      // Create a temporary <a> element to trigger the download
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", fileName(response));

      document.body.appendChild(link);
      link.click();

      // Clean up
      window.URL.revokeObjectURL(url);
      document.body.removeChild(link);
      // const res = await axios.get(
      //   `${urlConfig.url.PROXYURL}api/storage/client-download-file?fileName=${data?.fileName}`,
      //   {
      //     responseType: "blob",
      //   }
      // );
      // const exelBlob = new Blob([res.data], {
      //   type: "application/pdf",
      // });

      // saveAs(exelBlob, `${data?.fileName.split("/")[2]}`);
      dispatch({ type: DOWNLOADING_ON_PROCESS_DONE });
    } catch (error) {
      dispatch({
        type: DOWNLOADING_ON_PROCESS_ERROR,
        payload:
          error?.response &&
          (error?.response?.data?.detail || error?.response?.data?.errors)
            ? error?.response?.data?.detail ||
              error?.response?.data?.errors?.map((el) => el?.msg)?.join(" ")
            : error?.message,
      });
    }
  };

export const downloadPensionPdfFileFunc =
  (month, dataArr, year) => async (dispatch) => {
    const token = cookie.get("token");
    const config = {
      headers: {
        // "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      responseType: "blob",
    };

    try {
      dispatch({ type: DOWNLOADING_ON_PROCESS_REQUEST });
      const body = JSON.stringify(dataArr);
      const response = await axios.post(
        `${urlConfig.url.PROXYURL}api/storage/create-pdf-file/pension?month=${month}&year=${year}`,
        body,
        config
      );

      // Create a blob URL for the downloaded file
      const url = window.URL.createObjectURL(new Blob([response?.data]));

      // Create a temporary <a> element to trigger the download
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", fileName(response));

      document.body.appendChild(link);
      link.click();

      // Clean up
      window.URL.revokeObjectURL(url);
      document.body.removeChild(link);
      // const res = await axios.get(
      //   `${urlConfig.url.PROXYURL}api/storage/client-download-file?fileName=${data?.fileName}`,
      //   {
      //     responseType: "blob",
      //   }
      // );
      // const exelBlob = new Blob([res.data], {
      //   type: "application/pdf",
      // });

      // saveAs(exelBlob, `${data?.fileName.split("/")[2]}`);
      dispatch({ type: DOWNLOADING_ON_PROCESS_DONE });
    } catch (error) {
      dispatch({
        type: DOWNLOADING_ON_PROCESS_ERROR,
        payload:
          error?.response &&
          (error?.response?.data?.detail || error?.response?.data?.errors)
            ? error?.response?.data?.detail ||
              error?.response?.data?.errors?.map((el) => el?.msg)?.join(" ")
            : error?.message,
      });
    }
  };

export const downloadAuditLogPdfFileFunc = () => async (dispatch) => {
  const token = cookie.get("token");
  const config = {
    headers: {
      // "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    responseType: "blob",
  };

  try {
    dispatch({ type: DOWNLOADING_ON_PROCESS_REQUEST });
    // const body = JSON.stringify(dataArr);
    const body = JSON.stringify({});
    const response = await axios.post(
      `${urlConfig.url.PROXYURL}api/storage/create-pdf-file/auditlogs`,
      body,
      config
    );

    // Create a blob URL for the downloaded file
    const url = window.URL.createObjectURL(new Blob([response?.data]));

    // Create a temporary <a> element to trigger the download
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", fileName(response));

    document.body.appendChild(link);
    link.click();

    // Clean up
    window.URL.revokeObjectURL(url);
    document.body.removeChild(link);
    // const res = await axios.get(
    //   `${urlConfig.url.PROXYURL}api/storage/client-download-file?fileName=${data?.fileName}`,
    //   {
    //     responseType: "blob",
    //   }
    // );
    // const exelBlob = new Blob([res.data], {
    //   type: "application/pdf",
    // });

    // saveAs(exelBlob, `${data?.fileName.split("/")[2]}`);
    dispatch({ type: DOWNLOADING_ON_PROCESS_DONE });
  } catch (error) {
    dispatch({
      type: DOWNLOADING_ON_PROCESS_ERROR,
      payload:
        error?.response &&
        (error?.response?.data?.detail || error?.response?.data?.errors)
          ? error?.response?.data?.detail ||
            error?.response?.data?.errors?.map((el) => el?.msg)?.join(" ")
          : error?.message,
    });
  }
};

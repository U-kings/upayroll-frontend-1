import React, { useState } from "react";
import { ModalBackground, ModalContainer } from "../../styles/library";
import Successful from "../Successful";
import { useDispatch, useSelector } from "react-redux";
import { adminDeleteEmployeeById } from "../../actions/employee";
import { ADMIN_DELETE_BULK_EMPLOYEES_BY_IDS_RESET } from "../../types/employee";
import { adminDeleteDepartmentById } from "../../actions/department";
import { adminDeletePositionById } from "../../actions/position";
import { adminDeleteDeductionById } from "../../actions/deduction";
import { adminDeleteAllowanceById } from "../../actions/allowance";
import { adminDeleteGeneratedPayslip } from "../../actions/payslip";
import { adminDeleteStaffLevel } from "../../actions/stafflevel";
import { adminDeleteMonthlyPayheadById } from "../../actions/monthlypayheads";
import { hrDeleteStaffGradeByIdFunc } from "../../actions/staffgrade";
import { hrDeleteSalaryLevelByIdFunc } from "../../actions/salarylevel";
import { LoadingSpinner } from "..";
import { ADMIN_DELETE_ALLOWANCE_BY_ID_RESET } from "../../types/allowance";
import { ADMIN_DELETE_DEDUCTION_BY_ID_RESET } from "../../types/deduction";
import { ADMIN_DELETE_DEPARTMENT_BY_ID_RESET } from "../../types/department";
import { ADMIN_DELETE_POSITION_BY_ID_RESET } from "../../types/position";
import { ADMIN_DELETE_STAFFLEVEL_RESET } from "../../types/stafflevel";
import { ADMIN_DELETE_MONTHLYPAYHEADS_RESET } from "../../types/monthlypayheads";
import {
  ADMIN_DELETE_BULK_PAYSLIPS_RESET,
  ADMIN_GENERATE_BULK_PAYSLIPS_RESET,
  GENERATE_PAYSLIP_RESET,
  DELETE_GENERATED_PAYSLIP_BY_ID_RESET,
  HR_SET_NOT_APPROVED_GENERATED_PAYSLIPS_RESET,
  AUDITOR_SET_PRE_APPROVED_GENERATED_PAYSLIPS_RESET,
  CEO_SET_APPROVED_GENERATED_PAYSLIPS_RESET,
  AUDITOR_REJECT_NOT_APPROVED_PAYSLIPS_RESET,
  CEO_REJECT_PRE_APPROVED_PAYSLIPS_RESET,
  AUDITOR_AND_CEO_REJECT_EXCEL_PAYSLIPS_RESET,
} from "../../types/payslip";
import { CEO_APPROVE_BANKSCHEDULES_RESET } from "../../types/bankschedules";
import { useHistory } from "react-router-dom";
import {
  ACCOUNTANT_CREATE_NOT_APPROVED_VOUCHERS_FROM_SALARYSLIPS_RESET,
  ACCOUNTANT_DELETE_BULK_VOUCHERS_RESET,
  ACCOUNTANT_DELETE_VOUCHER_BY_ID_RESET,
  AUDITOR_PRE_APPROVE_VOUCHERS_RESET,
  AUDITOR_REJECT_NOT_APPROVED_VOUCHERS_RESET,
  CEO_APPROVE_PRE_APPROVED_VOUCHERS_RESET,
  CEO_REJECT_PRE_APPROVED_VOUCHERS_RESET,
} from "../../types/voucher";
import {
  ACCOUNTANT_CREATE_BANKSCHEDULE_RESET,
  ACCOUNTANT_DELETE_BANKSCHEDULE_BY_ID_RESET,
} from "../../types/bankschedules";
import { HR_DELETE_STAFFGRADE_BY_ID_RESET } from "../../types/staffgrade";
import { HR_DELETE_SALARYLEVEL_BY_ID_RESET } from "../../types/salarylevel";

const Comfirm = ({
  isOpen4,
  setIsOpen4,
  empId,
  departId,
  postId,
  allId,
  deductId,
  slipId,
  staffLevelId,
  setAllowanceId,
  setDeductionId,
  setDepartmentId,
  setPositionId,
  setStaffLevelId,
  setForm,
  monthlyPayheadId,
  setMonthlyPayheadId,
  staffGradeId,
  setStaffGradeId,
  salaryLevelId,
  setSalaryLevelId,
  stepsId,
  setStepsId,
  isGen,
  setIsGen,
  genPayslipAct,
  delEmployeesFunc,
  setDelBulk,
  delBulk,
  delBulkPayslip,
  delBulkPayslipAct,
  setDelBulkPayslip,
  setCurrentSlip,
  setNotApprovedBulk,
  notApprovedBulk,
  setNotApprovedAct,
  setPreApprovedBulk,
  preApprovedBulk,
  setPreApprovedAct,
  setApprovedBulk,
  approvedBulk,
  setApprovedAct,
  setApprovedBankScheduleBulk,
  approvedBankScheduleBulk,
  setApprovedBankScheduleAct,
  setVoucherBulk,
  setNotApprovedVouchersAct,
  voucherBulk,
  preApprovedVoucherBulk,
  setPreApprovedVoucherBulk,
  preApproveVoucherAct,
  approveVoucherBulk,
  setApproveVoucherBulk,
  approveVoucherAct,
  bankScheduleBulk,
  setBankScheduleBulk,
  createBankScheduleAct,
  currentBankScheduleId,
  setCurrentBankScheduleId,
  deleteBankScheduleAct,
  setRejectSalaryslipBulk,
  rejectSalaryslipBulk,
  rejectNotApprovedBulkAct,
  rejectVoucherBulk,
  setRejectVoucherBulk,
  rejectVoucherBulkAct,
  setRejectComment,
  currentVoucher,
  setCurrentVoucher,
  deleteVoucherByIdAct,
  month,
  type,
  deleteVoucherBulk,
  setDeleteVoucherBulk,
  deleteBulkVoucherAct,
  setUploadBulk,
  uploadBulk,
  uploadRejectBulkAct,
  toggle,
}) => {
  // dispatch init
  const dispatch = useDispatch();
  const history = useHistory();

  const { isLoading: loadingDelete } = useSelector(
    (state) => state.adminDeleteEmployee
  );
  const {
    success: deleteBulkEmployeeSuccess,
    error: deleteBulkEmployeeError,
    isLoading: deleteBulkEmployeeLoading,
  } = useSelector((state) => state.adminDeleteBulkEmployeesByIds);
  const {
    success: deletePositionSuccess,
    error: deletePositionError,
    isLoading: deletePositionLoading,
  } = useSelector((state) => state.adminDeletePosition);
  const {
    success: deleteDepartmentSuccess,
    error: deleteDepartmentError,
    isLoading: deleteDepartmentLoading,
  } = useSelector((state) => state.adminDeleteDepartment);
  const {
    success: deleteAllowanceSuccess,
    isLoading: deleteAllowanceLoading,
    error: deleteAllowanceError,
  } = useSelector((state) => state.adminDeleteAllowance);

  const {
    success: deleteDeductionSuccess,
    isLoading: deleteDeductionLoading,
    error: deleteDeductionError,
  } = useSelector((state) => state.adminDeleteDeduction);

  const {
    success: deleteStaffLevelSuccess,
    error: deleteStaffLevelError,
    isLoading: deleteStaffLevelLoading,
  } = useSelector((state) => state.adminDeleteStafflevel);

  const {
    success: deleteMonthlyPayheadSuccess,
    error: deleteMonthlyPayheadError,
    isLoading: deleteMonthlyPayheadLoading,
  } = useSelector((state) => state.adminDeleteMonthlyPayheads);

  const {
    success: generateBulkPayslipSuccess,
    error: generateBulkPayslipError,
    isLoading: generateBulkPayslipLoading,
  } = useSelector((state) => state.adminGenerateBulkPayslips);
  const {
    success: generatePayslipSuccess,
    error: generatePayslipError,
    isLoading: generatePayslipLoading,
  } = useSelector((state) => state.adminGeneratePayslip);

  const {
    success: deleteSalarySlipSuccess,
    error: deleteSalarySlipError,
    isLoading: deleteSalarySlipLoading,
  } = useSelector((state) => state.adminDeleteGeneratedPayslip);

  const {
    success: adminDeleteBulkPayslipSuccess,
    error: adminDeleteBulkPayslipError,
    isLoading: adminDeleteBulkPayslipLoading,
  } = useSelector((state) => state.adminDeleteBulkPayslips);

  const {
    success: hrSetNotApprovedSalaryslipsSuccess,
    error: hrSetNotApprovedSalaryslipsError,
    isLoading: hrSetNotApprovedSalaryslipsIsLoading,
  } = useSelector((state) => state.hrSetNotApprovedPayslips);

  const {
    success: auditorSetPreApprovedSalaryslipsSuccess,
    isLoading: auditorSetPreApprovedSalaryslipsLoading,
    error: auditorSetPreApprovedSalaryslipsError,
  } = useSelector((state) => state.auditorSetPreApprovedPayslips);

  const {
    success: ceoSetApprovedSalaryslipsSuccess,
    isLoading: ceoSetApprovedSalaryslipsLoading,
    error: ceoSetApprovedSalaryslipsError,
  } = useSelector((state) => state.ceoSetApprovedPayslips);

  const {
    success: ceoApprovedBankScheduleSuccess,
    isLoading: ceoApprovedBankScheduleLoading,
    error: ceoApprovedBankScheduleError,
  } = useSelector((state) => state.ceoApproveBankSchedules);

  const {
    success: accountantCreateNotApprovedSuccess,
    isLoading: accountantCreateNotApprovedLoading,
    error: accountantCreateNotApprovedError,
  } = useSelector((state) => state.accountantCreateNotApprovedVouchers);

  const {
    success: auditorPreApprovedVoucherSuccess,
    error: auditorPreApprovedVoucherError,
    isLoading: auditorPreApprovedVoucherLoading,
  } = useSelector((state) => state.auditorPreApproveVouchers);

  const {
    success: ceoApproveVoucherSuccess,
    error: ceoApproveVoucherError,
    isLoading: ceoApproveVoucherLoading,
  } = useSelector((state) => state.ceoApprovedPreApprovedVouchers);

  const {
    success: accountantCreateBankScheduleSuccess,
    isLoading: accountantCreateBankScheduleLoading,
    error: accountantCreateBankScheduleError,
  } = useSelector((state) => state.accountantCreateBankSchedules);

  const {
    success: accountantDeleteBanksheduleByIdSuccess,
    isLoading: accountantDeleteBanksheduleByIdLoading,
    error: accountantDeleteBanksheduleByIdError,
  } = useSelector((state) => state.accountantDeleteBanksheduleById);

  const {
    success: rejectNotApprovedSalarySuccess,
    isLoading: rejectNotApprovedSalaryLoading,
    error: rejectNotApprovedSalaryError,
  } = useSelector((state) => state.auditorRejectNotApprovedPayslips);

  const {
    success: rejectPreApprovedSalarySuccess,
    isLoading: rejectPreApprovedSalaryloading,
    error: rejectPreApprovedSalaryError,
  } = useSelector((state) => state.ceoRejectPreApprovedPayslips);

  const {
    success: rejectNotApprovedBankVouchersSuccess,
    isLoading: rejectNotApprovedBankVouchersLoading,
    error: rejectNotApprovedBankVouchersError,
  } = useSelector((state) => state.auditorRejectNotApprovedVouchers);

  const {
    success: rejectPreApprovedBankVouchersSuccess,
    isLoading: rejectPreApprovedBankVouchersLoading,
    error: rejectPreApprovedBankVouchersError,
  } = useSelector((state) => state.ceoRejectPreApprovedVouchers);

  const {
    success: accountantDeleteVoucherByIdSuccess,
    error: accountantDeleteVoucherByIdError,
    isLoading: accountantDeleteVoucherByIdLoading,
  } = useSelector((state) => state.accountantDeleteVoucherById);

  const {
    success: accountantDeleteBulkVouchersSuccess,
    isLoading: accountantDeleteBulkVouchersLoading,
    error: accountantDeleteBulkVouchersError,
  } = useSelector((state) => state.accountantDeleteBulkVouchers);

  const {
    success: auditorAndCeoRejectExcelPayslipsSuccess,
    isLoading: auditorAndCeoRejectExcelPayslipsLoading,
    error: auditorAndCeoRejectExcelPayslipsError,
  } = useSelector((state) => state.auditorAndCeoRejectExcelPayslips);

  const {
    success: deleteStaffGradeSuccess,
    isLoading: deleteStaffGradeLoading,
    error: deleteStaffGradeError,
  } = useSelector((state) => state.hrDeleteStaffGrade);

  const {
    success: deleteSalaryLevelSuccess,
    isLoading: deleteSalaryLevelLoading,
    error: deleteSalaryLevelError,
  } = useSelector((state) => state.hrDeleteSalaryLevel);

  const [isOpen7, setIsOpen7] = useState(false);

  const onDelete = () => {
    if (empId) {
      dispatch(adminDeleteEmployeeById(empId, month));
    }
    if (departId) {
      dispatch(adminDeleteDepartmentById(departId));
    }
    if (postId) {
      dispatch(adminDeletePositionById(postId));
    }
    if (allId) {
      dispatch(adminDeleteAllowanceById(allId));
    }
    if (deductId) {
      dispatch(adminDeleteDeductionById(deductId));
    }

    if (slipId) {
      dispatch(adminDeleteGeneratedPayslip(slipId, month, type));
    }

    if (staffLevelId) {
      dispatch(adminDeleteStaffLevel(staffLevelId));
    }

    if (monthlyPayheadId) {
      dispatch(adminDeleteMonthlyPayheadById(monthlyPayheadId));
    }

    if (staffGradeId) {
      dispatch(hrDeleteStaffGradeByIdFunc(staffGradeId));
    }

    if (salaryLevelId) {
      dispatch(hrDeleteSalaryLevelByIdFunc(salaryLevelId));
    }

    if (isGen) {
      genPayslipAct();
    }

    if (delBulk) {
      delEmployeesFunc();
    }
    if (delBulkPayslip) {
      delBulkPayslipAct();
    }

    if (notApprovedBulk) {
      setNotApprovedAct();
    }

    if (preApprovedBulk) {
      setPreApprovedAct();
    }

    if (approvedBulk) {
      setApprovedAct();
    }

    if (approvedBankScheduleBulk) {
      setApprovedBankScheduleAct();
    }

    if (voucherBulk) {
      setNotApprovedVouchersAct();
    }

    if (preApprovedVoucherBulk) {
      preApproveVoucherAct();
    }

    if (approveVoucherBulk) {
      approveVoucherAct();
    }

    if (bankScheduleBulk) {
      createBankScheduleAct();
    }

    if (currentBankScheduleId) {
      deleteBankScheduleAct();
    }

    if (rejectSalaryslipBulk) {
      rejectNotApprovedBulkAct();
    }

    if (rejectVoucherBulk) {
      rejectVoucherBulkAct();
    }

    if (currentVoucher) {
      deleteVoucherByIdAct();
    }

    if (deleteVoucherBulk) {
      deleteBulkVoucherAct();
    }
    if (uploadBulk) {
      uploadRejectBulkAct();
    }

    setIsOpen4(false);
  };

  const onCancel = () => {
    setIsOpen7(false);
    setIsOpen4(false);
    if (isGen) {
      setIsGen(false);
    }
    if (delBulk) {
      setDelBulk(false);
    }

    if (delBulkPayslip) {
      setDelBulkPayslip(false);
      setCurrentSlip(null);
    }
    if (notApprovedBulk) {
      setNotApprovedBulk(false);
      setCurrentSlip(null);
    }

    if (preApprovedBulk) {
      setPreApprovedBulk(false);
    }

    if (approvedBulk) {
      setApprovedBulk(false);
    }

    if (approvedBulk) {
      setApprovedBankScheduleBulk(false);
    }

    if (voucherBulk) {
      setVoucherBulk(false);
    }

    if (preApprovedVoucherBulk) {
      setPreApprovedVoucherBulk(false);
    }

    if (approveVoucherBulk) {
      setApproveVoucherBulk(false);
    }

    if (bankScheduleBulk) {
      setBankScheduleBulk(false);
    }

    if (currentBankScheduleId) {
      setCurrentBankScheduleId(null);
    }

    if (rejectSalaryslipBulk) {
      setRejectSalaryslipBulk(false);
      setRejectComment("");
    }

    if (rejectVoucherBulk) {
      setRejectVoucherBulk(false);
      setRejectComment("");
    }

    if (currentVoucher) {
      setCurrentVoucher(null);
    }

    if (deleteVoucherBulk) {
      setDeleteVoucherBulk(null);
    }

    if (uploadBulk) {
      setUploadBulk(false);
    }
  };

  const popup7 = () => {
    if (deleteAllowanceSuccess && !deleteAllowanceError) {
      dispatch({
        type: ADMIN_DELETE_ALLOWANCE_BY_ID_RESET,
      });
      setAllowanceId(null);
      setIsOpen4(false);
    } else if (deleteDeductionSuccess && !deleteDeductionError) {
      dispatch({
        type: ADMIN_DELETE_DEDUCTION_BY_ID_RESET,
      });
      setDeductionId(null);
      setIsOpen4(false);
    } else if (deleteDepartmentSuccess && !deleteDepartmentError) {
      dispatch({ type: ADMIN_DELETE_DEPARTMENT_BY_ID_RESET });
      setDepartmentId(null);
      setForm({ name: "" });
      setIsOpen4(false);
    } else if (deletePositionSuccess && !deletePositionError) {
      dispatch({ type: ADMIN_DELETE_POSITION_BY_ID_RESET });
      setPositionId(null);
      setIsOpen4(false);
    } else if (deleteStaffLevelSuccess && !deleteStaffLevelError) {
      dispatch({ type: ADMIN_DELETE_STAFFLEVEL_RESET });
      setStaffLevelId(null);
      setIsOpen4(false);
    } else if (deleteMonthlyPayheadSuccess && !deleteMonthlyPayheadError) {
      dispatch({ type: ADMIN_DELETE_MONTHLYPAYHEADS_RESET });
      setMonthlyPayheadId(null);
      setIsOpen4(false);
    } else if (generateBulkPayslipSuccess && !generateBulkPayslipError) {
      dispatch({ type: ADMIN_GENERATE_BULK_PAYSLIPS_RESET });

      history.push("payroll");
    } else if (generatePayslipSuccess && !generatePayslipError) {
      dispatch({ type: GENERATE_PAYSLIP_RESET });

      history.push("payroll");
    } else if (deleteBulkEmployeeSuccess && !deleteBulkEmployeeError) {
      dispatch({ type: ADMIN_DELETE_BULK_EMPLOYEES_BY_IDS_RESET });
    } else if (deleteSalarySlipSuccess && !deleteSalarySlipError) {
      dispatch({ type: DELETE_GENERATED_PAYSLIP_BY_ID_RESET });
      setDelBulkPayslip(false);
      setCurrentSlip(null);
      setIsOpen4(false);
      // history.push("payroll");
    } else if (adminDeleteBulkPayslipSuccess && !adminDeleteBulkPayslipError) {
      dispatch({ type: ADMIN_DELETE_BULK_PAYSLIPS_RESET });
      setDelBulkPayslip(false);
      setIsOpen4(false);
      setCurrentSlip(null);
    } else if (
      hrSetNotApprovedSalaryslipsSuccess &&
      !hrSetNotApprovedSalaryslipsError
    ) {
      dispatch({
        type: HR_SET_NOT_APPROVED_GENERATED_PAYSLIPS_RESET,
      });
      setNotApprovedBulk(false);
      setIsOpen4(false);
      setCurrentSlip(null);
    } else if (
      auditorSetPreApprovedSalaryslipsSuccess &&
      !auditorSetPreApprovedSalaryslipsError
    ) {
      dispatch({
        type: AUDITOR_SET_PRE_APPROVED_GENERATED_PAYSLIPS_RESET,
      });
      setPreApprovedBulk(false);
      setIsOpen4(false);
      setCurrentSlip(false);
    } else if (
      ceoSetApprovedSalaryslipsSuccess &&
      !ceoSetApprovedSalaryslipsError
    ) {
      dispatch({
        type: CEO_SET_APPROVED_GENERATED_PAYSLIPS_RESET,
      });

      setApprovedBulk(false);
      setIsOpen4(false);
      setCurrentSlip(false);
    } else if (
      ceoApprovedBankScheduleSuccess &&
      !ceoApprovedBankScheduleError
    ) {
      dispatch({
        type: CEO_APPROVE_BANKSCHEDULES_RESET,
      });

      setApprovedBankScheduleBulk(false);
      setIsOpen4(false);
      // setCurrentSlip(false);
    } else if (
      accountantCreateNotApprovedSuccess &&
      !accountantCreateNotApprovedError
    ) {
      dispatch({
        type: ACCOUNTANT_CREATE_NOT_APPROVED_VOUCHERS_FROM_SALARYSLIPS_RESET,
      });
      setVoucherBulk(false);
      setIsOpen4(false);
      setCurrentSlip(false);
      // history.push("voucher");
    } else if (
      auditorPreApprovedVoucherSuccess &&
      !auditorPreApprovedVoucherError
    ) {
      dispatch({
        type: AUDITOR_PRE_APPROVE_VOUCHERS_RESET,
      });
      setPreApprovedVoucherBulk(false);
      setIsOpen4(false);
    } else if (ceoApproveVoucherSuccess && !ceoApproveVoucherError) {
      dispatch({ type: CEO_APPROVE_PRE_APPROVED_VOUCHERS_RESET });
      setApproveVoucherBulk(false);
      setIsOpen4(false);
    } else if (
      accountantCreateBankScheduleSuccess &&
      !accountantCreateBankScheduleError
    ) {
      dispatch({ type: ACCOUNTANT_CREATE_BANKSCHEDULE_RESET });
      setBankScheduleBulk(false);
      setIsOpen4(false);
      // history.pushbank-schedule");
    } else if (
      accountantDeleteBanksheduleByIdSuccess &&
      !accountantDeleteBanksheduleByIdError
    ) {
      dispatch({ type: ACCOUNTANT_DELETE_BANKSCHEDULE_BY_ID_RESET });
      setCurrentBankScheduleId(null);
      setIsOpen4(false);
    } else if (
      rejectNotApprovedSalarySuccess &&
      !rejectNotApprovedSalaryError
    ) {
      dispatch({ type: AUDITOR_REJECT_NOT_APPROVED_PAYSLIPS_RESET });

      setRejectSalaryslipBulk(false);
      setIsOpen4(false);
    } else if (
      !auditorAndCeoRejectExcelPayslipsError &&
      auditorAndCeoRejectExcelPayslipsSuccess
    ) {
      setUploadBulk(false);
      setIsOpen4(false);
      dispatch({ type: AUDITOR_AND_CEO_REJECT_EXCEL_PAYSLIPS_RESET });
    } else if (
      rejectPreApprovedSalarySuccess &&
      !rejectPreApprovedSalaryError
    ) {
      dispatch({ type: CEO_REJECT_PRE_APPROVED_PAYSLIPS_RESET });
      setRejectSalaryslipBulk(false);
      setIsOpen4(false);
      setRejectComment("");
    } else if (
      rejectNotApprovedBankVouchersSuccess &&
      !rejectNotApprovedBankVouchersError
    ) {
      dispatch({ type: AUDITOR_REJECT_NOT_APPROVED_VOUCHERS_RESET });
      setRejectVoucherBulk(false);
      setIsOpen4(false);
      setRejectComment("");
    } else if (
      rejectPreApprovedBankVouchersSuccess &&
      !rejectPreApprovedBankVouchersError
    ) {
      dispatch({ type: CEO_REJECT_PRE_APPROVED_VOUCHERS_RESET });
      setRejectVoucherBulk(false);
      setIsOpen4(false);
      setRejectComment("");
    } else if (
      accountantDeleteVoucherByIdSuccess &&
      !accountantDeleteVoucherByIdError
    ) {
      dispatch({ type: ACCOUNTANT_DELETE_VOUCHER_BY_ID_RESET });
      setCurrentVoucher(null);
      setIsOpen4(false);
    } else if (
      accountantDeleteBulkVouchersSuccess &&
      !accountantDeleteBulkVouchersError
    ) {
      dispatch({ type: ACCOUNTANT_DELETE_BULK_VOUCHERS_RESET });
      setDeleteVoucherBulk(false);
      setIsOpen4(false);
    } else if (deleteStaffGradeSuccess && !deleteStaffGradeError) {
      dispatch({ type: HR_DELETE_STAFFGRADE_BY_ID_RESET });
      setStaffGradeId(null);
      setIsOpen4(false);
    } else if (deleteSalaryLevelSuccess && !deleteSalaryLevelError) {
      dispatch({ type: HR_DELETE_SALARYLEVEL_BY_ID_RESET });
      setSalaryLevelId(null);
      setIsOpen4(false);
    }
    setIsOpen7(false);
  };

  return (
    <>
      {deleteAllowanceLoading && <LoadingSpinner toggle={toggle} />}
      {deleteDeductionLoading && <LoadingSpinner toggle={toggle} />}
      {deleteDepartmentLoading && <LoadingSpinner toggle={toggle} />}
      {deletePositionLoading && <LoadingSpinner toggle={toggle} />}
      {deleteStaffLevelLoading && <LoadingSpinner toggle={toggle} />}
      {deleteMonthlyPayheadLoading && <LoadingSpinner toggle={toggle} />}
      {deleteBulkEmployeeLoading && <LoadingSpinner toggle={toggle} />}
      {(generateBulkPayslipLoading || generatePayslipLoading) && (
        <LoadingSpinner toggle={toggle} />
      )}
      {(adminDeleteBulkPayslipLoading || deleteSalarySlipLoading) && (
        <LoadingSpinner toggle={toggle} />
      )}
      {hrSetNotApprovedSalaryslipsIsLoading && (
        <LoadingSpinner toggle={toggle} />
      )}
      {auditorSetPreApprovedSalaryslipsLoading && (
        <LoadingSpinner toggle={toggle} />
      )}
      {ceoSetApprovedSalaryslipsLoading && <LoadingSpinner toggle={toggle} />}
      {ceoApprovedBankScheduleLoading && <LoadingSpinner toggle={toggle} />}
      {accountantCreateNotApprovedLoading && <LoadingSpinner toggle={toggle} />}
      {auditorPreApprovedVoucherLoading && <LoadingSpinner toggle={toggle} />}
      {ceoApproveVoucherLoading && <LoadingSpinner toggle={toggle} />}
      {accountantCreateBankScheduleLoading && (
        <LoadingSpinner toggle={toggle} />
      )}
      {accountantDeleteBanksheduleByIdLoading && (
        <LoadingSpinner toggle={toggle} />
      )}
      {rejectNotApprovedSalaryLoading && <LoadingSpinner toggle={toggle} />}
      {rejectPreApprovedSalaryloading && <LoadingSpinner toggle={toggle} />}
      {rejectNotApprovedBankVouchersLoading && (
        <LoadingSpinner toggle={toggle} />
      )}
      {rejectPreApprovedBankVouchersLoading && (
        <LoadingSpinner toggle={toggle} />
      )}
      {accountantDeleteVoucherByIdLoading && <LoadingSpinner toggle={toggle} />}
      {accountantDeleteBulkVouchersLoading && (
        <LoadingSpinner toggle={toggle} />
      )}
      {auditorAndCeoRejectExcelPayslipsLoading && (
        <LoadingSpinner toggle={toggle} />
      )}
      {deleteStaffGradeLoading && <LoadingSpinner toggle={toggle} />}
      {deleteSalaryLevelLoading && <LoadingSpinner toggle={toggle} />}

      <Successful
        isOpen7={
          isOpen7 ||
          (deleteAllowanceSuccess &&
            !deleteAllowanceError &&
            !deleteAllowanceLoading)
        }
        popup7={popup7}
        message="Addition deleted successfully!"
      />
      <Successful
        isOpen7={
          deleteDeductionSuccess &&
          !deleteDeductionError &&
          !deleteDeductionLoading
        }
        popup7={popup7}
        message="Deduction deleted successfully!"
      />
      <Successful
        isOpen7={
          deleteDepartmentSuccess &&
          !deleteDepartmentError &&
          !deleteDeductionLoading
        }
        popup7={popup7}
        message="Department deleted successfully!"
      />
      <Successful
        isOpen7={
          deletePositionSuccess &&
          !deletePositionError &&
          !deletePositionLoading
        }
        popup7={popup7}
        message="Position deleted successfully!"
      />
      <Successful
        isOpen7={
          deleteStaffLevelSuccess &&
          !deleteStaffLevelError &&
          !deleteStaffLevelLoading
        }
        popup7={popup7}
        message="StaffLevel deleted successfully!"
      />
      <Successful
        isOpen7={
          deleteMonthlyPayheadSuccess &&
          !deleteMonthlyPayheadError &&
          !deleteMonthlyPayheadLoading
        }
        popup7={popup7}
        message="Monthlypayhead deleted successfully!"
      />
      <Successful
        isOpen7={
          generateBulkPayslipSuccess &&
          !generateBulkPayslipError &&
          !generateBulkPayslipLoading
        }
        popup7={popup7}
        message="Bulk payslips generated successfully!"
      />
      <Successful
        isOpen7={
          generatePayslipSuccess &&
          !generatePayslipError &&
          !generatePayslipLoading
        }
        popup7={popup7}
        message="Payslip generated successfully!"
      />
      <Successful
        isOpen7={
          deleteBulkEmployeeSuccess &&
          !deleteBulkEmployeeError &&
          !deleteBulkEmployeeLoading
        }
        popup7={popup7}
        message="Deleted bulk employees successfully!"
      />
      <Successful
        isOpen7={
          deleteSalarySlipSuccess &&
          !deleteSalarySlipError &&
          !deleteSalarySlipLoading
        }
        popup7={popup7}
        message="Deleted payslip successfully!"
      />
      <Successful
        isOpen7={
          adminDeleteBulkPayslipSuccess &&
          !adminDeleteBulkPayslipError &&
          !adminDeleteBulkPayslipLoading
        }
        popup7={popup7}
        message="Deleted bulk payslips successfully!"
      />
      <Successful
        isOpen7={
          hrSetNotApprovedSalaryslipsSuccess &&
          !hrSetNotApprovedSalaryslipsError &&
          !hrSetNotApprovedSalaryslipsIsLoading
        }
        popup7={popup7}
        message="Set Salaryslips to not approved successfully!"
      />
      <Successful
        isOpen7={
          auditorSetPreApprovedSalaryslipsSuccess &&
          !auditorSetPreApprovedSalaryslipsError &&
          !auditorSetPreApprovedSalaryslipsLoading
        }
        popup7={popup7}
        message="Set Salaryslips to pre approved successfully!"
      />
      <Successful
        isOpen7={
          ceoSetApprovedSalaryslipsSuccess &&
          !ceoSetApprovedSalaryslipsError &&
          !ceoSetApprovedSalaryslipsLoading
        }
        popup7={popup7}
        message="Salaryslips approved successfully!"
      />
      <Successful
        isOpen7={
          ceoApproveVoucherSuccess &&
          !ceoApproveVoucherError &&
          !ceoApproveVoucherLoading
        }
        popup7={popup7}
        message="Bank voucher approved successfully!"
      />

      <Successful
        isOpen7={
          ceoApprovedBankScheduleSuccess &&
          !ceoApprovedBankScheduleError &&
          !ceoApprovedBankScheduleLoading
        }
        popup7={popup7}
        message="Bank Schedule approved successfully!"
      />

      <Successful
        isOpen7={
          accountantCreateNotApprovedSuccess &&
          !accountantCreateNotApprovedError &&
          !accountantCreateNotApprovedLoading
        }
        popup7={popup7}
        message="Created vouchers successfully!"
      />

      <Successful
        isOpen7={
          auditorPreApprovedVoucherSuccess &&
          !auditorPreApprovedVoucherError &&
          !ceoApproveVoucherLoading
        }
        popup7={popup7}
        message="Created pre approved vouchers successfully!"
      />

      <Successful
        isOpen7={
          ceoApproveVoucherSuccess &&
          !ceoApproveVoucherError &&
          !ceoApproveVoucherLoading
        }
        popup7={popup7}
        message="Created approved vouchers successfully!"
      />

      <Successful
        isOpen7={
          accountantCreateBankScheduleSuccess &&
          !accountantCreateBankScheduleError &&
          !accountantCreateBankScheduleLoading
        }
        popup7={popup7}
        message="Create Bank Schedules successfully!"
      />

      <Successful
        isOpen7={
          accountantCreateBankScheduleSuccess &&
          !accountantCreateBankScheduleError &&
          !accountantCreateBankScheduleLoading
        }
        popup7={popup7}
        message="Create Bank Schedules successfully!"
      />

      <Successful
        isOpen7={
          accountantDeleteBanksheduleByIdSuccess &&
          !accountantDeleteBanksheduleByIdError &&
          !accountantDeleteBanksheduleByIdLoading
        }
        popup7={popup7}
        message="Deleted Bank Schedule successfully!"
      />

      <Successful
        isOpen7={
          rejectNotApprovedSalarySuccess &&
          !rejectNotApprovedSalaryError &&
          !rejectNotApprovedSalaryLoading
        }
        popup7={popup7}
        message="Salaryslips is rejected successfully! and sent to HR to review"
      />

      <Successful
        isOpen7={
          rejectPreApprovedSalarySuccess &&
          !rejectPreApprovedSalaryError &&
          !rejectPreApprovedSalaryloading
        }
        popup7={popup7}
        message="Salaryslips is rejected successfully! and sent to HR to review"
      />

      <Successful
        isOpen7={
          auditorAndCeoRejectExcelPayslipsSuccess &&
          !auditorAndCeoRejectExcelPayslipsError &&
          !auditorAndCeoRejectExcelPayslipsLoading
        }
        popup7={popup7}
        message="Salaryslips is rejected successfully! and sent to HR to review"
      />

      <Successful
        isOpen7={
          !rejectNotApprovedBankVouchersLoading &&
          rejectNotApprovedBankVouchersSuccess &&
          !rejectNotApprovedBankVouchersError
        }
        popup7={popup7}
        message="Vouchers is rejected successfully!"
      />

      <Successful
        isOpen7={
          !rejectPreApprovedBankVouchersError &&
          rejectPreApprovedBankVouchersSuccess &&
          !rejectPreApprovedBankVouchersLoading
        }
        popup7={popup7}
        message="Vouchers is rejected successfully!"
      />

      <Successful
        isOpen7={
          !accountantDeleteVoucherByIdError &&
          accountantDeleteVoucherByIdSuccess &&
          !accountantDeleteVoucherByIdLoading
        }
        popup7={popup7}
        message="Voucher is deleted successfully!"
      />

      <Successful
        isOpen7={
          !accountantDeleteBulkVouchersError &&
          accountantDeleteBulkVouchersSuccess &&
          !accountantDeleteBulkVouchersLoading
        }
        popup7={popup7}
        message="Deleted bulk vouchers successfully! "
      />

      <Successful
        isOpen7={
          !deleteStaffGradeError &&
          deleteStaffGradeSuccess &&
          !deleteStaffGradeLoading
        }
        popup7={popup7}
        message="Deleted staff grade successfully! "
      />

      <Successful
        isOpen7={
          !deleteSalaryLevelError &&
          deleteSalaryLevelSuccess &&
          !deleteSalaryLevelLoading
        }
        popup7={popup7}
        message="Deleted salary level successfully! "
      />

      {/* <Successful
        isOpen7={
          !deleteStepError &&
          deleteStepSuccess &&
          !deleteStepLoading
        }
        setIsOpen7={setIsOpen7}
        popup7={popup7}
        message="deleted step successfully! "
      /> */}

      {/* <Successful isOpen7={isOpen7} setIsOpen7={setIsOpen7} popup7={popup7} /> */}
      <ModalBackground isOpen4={isOpen4} onClick={onCancel} />
      <ModalContainer className="comfirm" isOpen4={isOpen4}>
        <div className="delete__container">
          {!notApprovedBulk &&
            !preApprovedBulk &&
            !approvedBulk &&
            !voucherBulk &&
            !preApprovedVoucherBulk &&
            !approveVoucherBulk &&
            !bankScheduleBulk &&
            !currentBankScheduleId &&
            !rejectSalaryslipBulk &&
            !rejectVoucherBulk &&
            !uploadBulk &&
            !approvedBankScheduleBulk && (
              <h2>
                {isGen ? "Generate Selected Item" : "Delete Selected Item"}
              </h2>
            )}
          <h2>
            {notApprovedBulk && "Submit Selected Items To Auditor"}
            {preApprovedBulk && "Pre Approved Selected Items"}
            {approvedBulk && "Approved Selected Items"}
            {approvedBankScheduleBulk && "Approved Selected Items"}
            {voucherBulk && "Create Vouchers From Selected Items"}
            {preApprovedVoucherBulk &&
              "Create Pre Approved Vouchers from Selected Items"}
            {approveVoucherBulk &&
              "Create Approve Vouchers from Selected Items"}
            {bankScheduleBulk &&
              "Create Bank Schedule from selected approved vouchers"}
            {currentBankScheduleId && "Delete Selected Bank Schedule Item"}
            {rejectSalaryslipBulk && "Reject Selected Salaryslips Item"}
            {rejectVoucherBulk && "Reject Selected Vouchers Item"}
            {uploadBulk && "Reject Uploaded Salaryslip Items"}
          </h2>
          <div className="button__row">
            <input
              type="button"
              onClick={onDelete}
              className="save__btn"
              value="Yes"
              disabled={loadingDelete}
            />
            <input
              type="button"
              className="cancel__btn margin__left"
              value="No"
              onClick={onCancel}
              disabled={loadingDelete}
            />
          </div>
        </div>
      </ModalContainer>
    </>
  );
};

export default Comfirm;

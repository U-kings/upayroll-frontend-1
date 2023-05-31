import { combineReducers, applyMiddleware, createStore } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import cookie from "js-cookie";

// auth reducer
import {
  loginAdminUserReducer,
  adminGetLoggedinDetailsReducer,
  adminUpdateLoggedinDetailsReducer,
  adminForgotPasswordReducer,
  adminResetPasswordReducer,
  adminLoginStatusReducer,
  checkCookieTokenValidReducer,
  ceoUploadSignatureReducer,
  registerCompanyReducer,
  registerCompanyAdminReducer,
  confirmEmailReducer,
  getNotCreatedRolesReducer,
} from "./reducers/auth";

// department reducer
import {
  getAllDepartmentReducer,
  getPositionByDepartmentReducer,
  adminCreateDepartmentReducer,
  adminDeleteDepartmentByIdReducer,
  adminUpdateDepartmentByIdReducer,
} from "./reducers/department";

// employee reducer
import {
  adminCreateEmployeeReducer,
  adminGetAllEmployeeReducer,
  adminUpdateEmployeeByIdReducer,
  adminDeleteEmployeeByIdReducer,
  adminEmployeeTopUpReducer,
  adminDeleteEmployeeAllowanceByIdReducer,
  adminDeleteEmployeeDeductionByIdReducer,
  adminDeleteBulkEmployeesByIdsReducer,
  adminCreateBulkEmployeeReducer,
  hrUploadContractEmployeeReducer,
  employeeGetAllPayslipsReducer,
  employeeGetPersonalDetailsReducer,
} from "./reducers/employee";

// allowance
import {
  adminGetAllAllowanceReducer,
  adminCreateAllowanceReducer,
  adminUpdateAllowanceByIdReducer,
  adminDeleteAllowanceByIdReducer,
} from "./reducers/allowance";

// deduction
import {
  adminGetAllDeductionReducer,
  adminCreateDeductionReducer,
  adminDeleteDeductionByIdReducer,
  adminUpdateDeductionByIdReducer,
} from "./reducers/deduction";

// position
import {
  adminGetAllPositionReducer,
  adminCreatePositionReducer,
  adminDeletePositionByIdReducer,
  adminUpdatePositionByIdReducer,
} from "./reducers/position";

// payslip
import {
  generatePayslipReducer,
  getAllGeneratedPayslipReducer,
  deleteGeneratedPayslipByIdReducer,
  adminGenerateBulkPayslipsReducer,
  adminDeleteBulkPayslipsReducer,
  hrSetNotApprovedPayslipsReducer,
  auditorGetNotApprovedReducer,
  auditorSetPreApprovedPayslipsReducer,
  ceoGetPreApprovedAndApprovedPayslipsReducer,
  ceoSetApprovedPayslipsReducer,
  accountantGetApprovedSalaryslipsReducer,
  auditorRejectNotApprovedPayslipsReducer,
  ceoRejectPreApprovedPayslipsReducer,
  auditorAndCeoRejectExcelPayslipsReducer,
} from "./reducers/payslip";

// stafflevel
import {
  adminCreateStaffLevelReducer,
  adminGetAllStafflevelReducer,
  adminUpdateStaffLevelReducer,
  adminDeleteStaffLevelReducer,
} from "./reducers/stafflevel";

// basepay
import {
  hrCreateBasePayReducer,
  hrGetBasePayReducer,
  hrUpdateBasePayByIdReducer,
} from "./reducers/basepay";

// staffgrade
import {
  hrCreateStaffGradeReducer,
  hrGetStaffGradeReducer,
  hrUpdateStaffGradeByIdReducer,
  hrDeleteStaffGradeByIdReducer,
} from "./reducers/staffgrade";

// salarylevel
import {
  hrCreateSalaryLevelReducer,
  hrGetSalaryLevelReducer,
  hrUpdateSalaryLevelByIdReducer,
  hrDeleteSalaryLevelByIdReducer,
} from "./reducers/salarylevel";

// steps
import {
  hrCreateStepsReducer,
  hrGetStepsReducer,
  hrUpdateStepsByIdReducer,
  hrDeleteStepsByIdReducer,
} from "./reducers/salarysteps";

// monthlypayheads
import {
  adminCreateMonthlyPayheadsReducer,
  adminDeleteMonthlyPayheadsReducer,
  adminUpdateMonthlyPayheadsReducer,
  adminGetAllMonthlyPayheadsReducer,
} from "./reducers/monthlypayheads";

// vouchers
import {
  accountantCreateNotApprovedVouchersReducer,
  accountantGetApprovedVouchersReducer,
  auditorGetNotApprovedVouchersReducer,
  auditorPreApproveVouchersReducer,
  ceoApprovedPreApprovedVouchersReducer,
  ceoGetPreApprovedVouchersReducer,
  auditorRejectNotApprovedVouchersReducer,
  ceoRejectPreApprovedVouchersReducer,
  accountantDeleteBulkVouchersReducer,
  accountantDeleteVoucherByIdReducer,
} from "./reducers/voucher";

// bankSchedules
import {
  accountantCreateBankSchedulesReducer,
  accountantGetBankschedulesReducer,
  accountantDeleteBanksheduleByIdReducer,
  accountantGetApprovedBankScheduleVouchersReducer,
  ceoApproveBankSchedulesReducer,
  ceoGetNotApprovedBankSchedulesReducer,
} from "./reducers/bankschedules";

// banklist
import {
  accountantCreateBankReducer,
  accountantUpdateBankByIdReducer,
  adminGetAllBanksReducer,
} from "./reducers/banklist";

// download
import { downloadingReducer } from "./reducers/download";

// loan
import {
  hrCreateLoanReducer,
  hrDeleteLoanReducer,
  hrGetAllLoansReducer,
  hrUpdateLoanReducer,
  hrUpdateManagementCarAmountReducer,
  hrUpdateRepaymentPercentageReducer,
} from "./reducers/loan";

// employeeloan
import {
  auditorGetNotApprovedGeneratedEmployeeLoansReducer,
  auditorRejectNotApprovedGeneratedEmployeeLoansReducer,
  auditorSetPreApprovedGeneratedEmployeeLoanReducer,
  ceoGetPreApprovedAndApprovedGeneratedEmployeeLoansReducer,
  ceoRejectPreApprovedGeneratedEmployeeLoansReducer,
  ceoSetApprovedGeneratedEmployeeLoansReducer,
  employeeAskForLoanRequestReducer,
  employeeGetAllGeneratedLoansRequestReducer,
  hrApprovesEmployeeRequestLoanReducer,
  hrBulkDeleteGeneratedEmployeeLoansReducer,
  hrDeleteEmployeeLoanByIdReducer,
  hrGetGeneratedEmployeeLoansReducer,
} from "./reducers/employeeloan";

// dashboards
import { getDashboardReportsResultReducer } from "./reducers/dashboard";
import {
  hrCreateJuniorStaffGradeReducer,
  hrCreateManagementStaffGradeReducer,
  hrCreateMiddleStaffGradeReducer,
  hrCreateSeniorStaffGradeReducer,
} from "./reducers/salarystructure";

// reducers
const reducers = combineReducers({
  // Auth
  adminLoginReducer: loginAdminUserReducer,
  adminRegisterCompanyReducer: registerCompanyReducer,
  registerCompanyAdmin: registerCompanyAdminReducer,
  getNotCreatedRoles: getNotCreatedRolesReducer,
  confirmEmail: confirmEmailReducer,
  adminLoginStatus: adminLoginStatusReducer,
  adminForgotPassword: adminForgotPasswordReducer,
  adminResetPassword: adminResetPasswordReducer,
  adminGetLoggedinDetails: adminGetLoggedinDetailsReducer,
  adminUpdateLoggedinDetails: adminUpdateLoggedinDetailsReducer,
  checkCookieTokenValid: checkCookieTokenValidReducer,

  // ** HR **
  // Employee
  adminCreateEmployeeReducer,
  adminCreateBulkEmployee: adminCreateBulkEmployeeReducer,
  hrUploadContractEmployee: hrUploadContractEmployeeReducer,
  adminGetAllEmployeeReducer,
  adminUpdateEmployee: adminUpdateEmployeeByIdReducer,
  adminDeleteEmployee: adminDeleteEmployeeByIdReducer,
  adminDeleteBulkEmployeesByIds: adminDeleteBulkEmployeesByIdsReducer,
  adminEmployeeTopUp: adminEmployeeTopUpReducer,
  adminDeleteEmployeeAllowance: adminDeleteEmployeeAllowanceByIdReducer,
  adminDeleteEmployeeDeduction: adminDeleteEmployeeDeductionByIdReducer,
  employeeGetAllPayslips: employeeGetAllPayslipsReducer,
  employeeGetPersonalDetails: employeeGetPersonalDetailsReducer,
  // Allowances
  adminGetAllAllowance: adminGetAllAllowanceReducer,
  adminCreateAllowance: adminCreateAllowanceReducer,
  adminUpdateAllowance: adminUpdateAllowanceByIdReducer,
  adminDeleteAllowance: adminDeleteAllowanceByIdReducer,

  // Deductions
  adminGetAllDeduction: adminGetAllDeductionReducer,
  adminCreateDeduction: adminCreateDeductionReducer,
  adminUpdateDeduction: adminUpdateDeductionByIdReducer,
  adminDeleteDeduction: adminDeleteDeductionByIdReducer,

  // Positions
  adminGetAllPosition: adminGetAllPositionReducer,
  adminCreatePosition: adminCreatePositionReducer,
  adminUpdatePosition: adminUpdatePositionByIdReducer,
  adminDeletePosition: adminDeletePositionByIdReducer,

  // Departments
  departmentsReducer: getAllDepartmentReducer,
  departmentPositionsReducer: getPositionByDepartmentReducer,
  adminCreateDepartment: adminCreateDepartmentReducer,
  adminUpdateDepartment: adminUpdateDepartmentByIdReducer,
  adminDeleteDepartment: adminDeleteDepartmentByIdReducer,

  // Payslips/Salaryslips
  adminGeneratePayslip: generatePayslipReducer,
  hrSetNotApprovedPayslips: hrSetNotApprovedPayslipsReducer,
  adminGetAllGeneratedPayslip: getAllGeneratedPayslipReducer,
  adminDeleteGeneratedPayslip: deleteGeneratedPayslipByIdReducer,
  adminDeleteBulkPayslips: adminDeleteBulkPayslipsReducer,
  adminGenerateBulkPayslips: adminGenerateBulkPayslipsReducer,

  // Staff Levels
  adminGetAllStafflevel: adminGetAllStafflevelReducer,
  adminCreateStafflevel: adminCreateStaffLevelReducer,
  adminUpdateStafflevel: adminUpdateStaffLevelReducer,
  adminDeleteStafflevel: adminDeleteStaffLevelReducer,

  // Monthlypayheads
  adminGetAllMonthlyPayheads: adminGetAllMonthlyPayheadsReducer,
  adminCreateMonthlyPayheads: adminCreateMonthlyPayheadsReducer,
  adminUpdateMonthlyPayheads: adminUpdateMonthlyPayheadsReducer,
  adminDeleteMonthlyPayheads: adminDeleteMonthlyPayheadsReducer,

  // ** internal auditor **
  // Payslips/Salaryslips
  auditorGetNotApproved: auditorGetNotApprovedReducer,
  auditorSetPreApprovedPayslips: auditorSetPreApprovedPayslipsReducer,
  auditorRejectNotApprovedPayslips: auditorRejectNotApprovedPayslipsReducer,

  // Vouchers
  auditorGetNotApprovedVouchers: auditorGetNotApprovedVouchersReducer,
  auditorPreApproveVouchers: auditorPreApproveVouchersReducer,
  auditorRejectNotApprovedVouchers: auditorRejectNotApprovedVouchersReducer,

  // ** CEO **
  // Payslips/Salaryslips
  ceoGetPreApprovedAndApprovedPayslips:
    ceoGetPreApprovedAndApprovedPayslipsReducer,
  ceoSetApprovedPayslips: ceoSetApprovedPayslipsReducer,
  ceoRejectPreApprovedPayslips: ceoRejectPreApprovedPayslipsReducer,

  // Vouchers
  ceoApprovedPreApprovedVouchers: ceoApprovedPreApprovedVouchersReducer,
  ceoGetPreApprovedVouchers: ceoGetPreApprovedVouchersReducer,
  ceoRejectPreApprovedVouchers: ceoRejectPreApprovedVouchersReducer,

  // Bankschedules
  ceoApproveBankSchedules: ceoApproveBankSchedulesReducer,
  ceoGetNotApprovedBankSchedules: ceoGetNotApprovedBankSchedulesReducer,

  // auth
  ceoUploadSignature: ceoUploadSignatureReducer,

  // ** Accoutant ** //
  // Payslips/Salaryslips
  accountantGetApprovedSalaryslips: accountantGetApprovedSalaryslipsReducer,

  // Vouchers
  accountantGetApprovedVouchers: accountantGetApprovedVouchersReducer,
  accountantCreateNotApprovedVouchers:
    accountantCreateNotApprovedVouchersReducer,
  accountantDeleteBulkVouchers: accountantDeleteBulkVouchersReducer,
  accountantDeleteVoucherById: accountantDeleteVoucherByIdReducer,

  // bankschedules
  accountantCreateBankSchedules: accountantCreateBankSchedulesReducer,
  accountantGetBankSchedules: accountantGetBankschedulesReducer,
  accountantDeleteBanksheduleById: accountantDeleteBanksheduleByIdReducer,
  accountantGetApprovedBankScheduleVouchers:
    accountantGetApprovedBankScheduleVouchersReducer,

  // banklist
  adminGetAllBanks: adminGetAllBanksReducer,

  // ** Accountant **
  accountantCreateBank: accountantCreateBankReducer,
  accountantUpdateBankById: accountantUpdateBankByIdReducer,

  // ** Auditor/Ceo **
  auditorAndCeoRejectExcelPayslips: auditorAndCeoRejectExcelPayslipsReducer,

  // ** HR **
  // basepay
  hrCreateBasePay: hrCreateBasePayReducer,
  hrGetBasePay: hrGetBasePayReducer,
  hrUpdateBasePay: hrUpdateBasePayByIdReducer,

  // ** HR **
  // staffgrade
  hrCreateStaffGrade: hrCreateStaffGradeReducer,
  hrGetStaffGrade: hrGetStaffGradeReducer,
  hrUpdateStaffGrade: hrUpdateStaffGradeByIdReducer,
  hrDeleteStaffGrade: hrDeleteStaffGradeByIdReducer,

  // ** HR **
  // salarylevel
  hrCreateSalaryLevel: hrCreateSalaryLevelReducer,
  hrGetSalaryLevel: hrGetSalaryLevelReducer,
  hrUpdateSalaryLevel: hrUpdateSalaryLevelByIdReducer,
  hrDeleteSalaryLevel: hrDeleteSalaryLevelByIdReducer,

  // ** HR **
  // steps
  hrCreateSteps: hrCreateStepsReducer,
  hrGetSteps: hrGetStepsReducer,
  hrUpdateSteps: hrUpdateStepsByIdReducer,
  hrDeleteSteps: hrDeleteStepsByIdReducer,

  //salary structure
  hrCreateJuniorStaffGrade: hrCreateJuniorStaffGradeReducer,
  hrCreateMiddleStaffGrade: hrCreateMiddleStaffGradeReducer,
  hrCreateSeniorStaffGrade: hrCreateSeniorStaffGradeReducer,
  hrCreateManagementStaffGrade: hrCreateManagementStaffGradeReducer,

  // downloading
  downloadStatus: downloadingReducer,

  // ** HR **
  // loans
  hrGetAllLoans: hrGetAllLoansReducer,
  hrCreateLoan: hrCreateLoanReducer,
  hrUpdateLoan: hrUpdateLoanReducer,
  hrDeleteLoan: hrDeleteLoanReducer,
  hrUpdateManagementCarAmount: hrUpdateManagementCarAmountReducer,
  hrUpdateRepaymentPercentage: hrUpdateRepaymentPercentageReducer,

  // ** HR **
  // EmployeeLoan
  hrGetGeneratedEmployeeLoans: hrGetGeneratedEmployeeLoansReducer,
  hrBulkDeleteGeneratedEmployeeLoans: hrBulkDeleteGeneratedEmployeeLoansReducer,
  hrApprovesEmployeeRequestLoan: hrApprovesEmployeeRequestLoanReducer,
  hrDeleteEmployeeLoanById: hrDeleteEmployeeLoanByIdReducer,

  // ** Auditor **
  // EmployeeLoan
  auditorGetNotApprovedGeneratedEmployeeLoans:
    auditorGetNotApprovedGeneratedEmployeeLoansReducer,
  auditorSetPreApprovedGeneratedEmployeeLoan:
    auditorSetPreApprovedGeneratedEmployeeLoanReducer,
  auditorRejectNotApprovedGeneratedEmployeeLoans:
    auditorRejectNotApprovedGeneratedEmployeeLoansReducer,

  // ** CEO **
  // Employee Loan
  // ceoGetNotApprovedBankSchedules: ceoGetNotApprovedBankSchedulesReducer,
  ceoSetApprovedGeneratedEmployeeLoans:
    ceoSetApprovedGeneratedEmployeeLoansReducer,
  ceoGetPreApprovedAndApprovedGeneratedEmployeeLoans:
    ceoGetPreApprovedAndApprovedGeneratedEmployeeLoansReducer,
  ceoRejectPreApprovedGeneratedEmployeeLoans:
    ceoRejectPreApprovedGeneratedEmployeeLoansReducer,

  // ** Employee **
  // Employee Loan
  employeeAskForLoanRequest: employeeAskForLoanRequestReducer,
  employeeGetAllGeneratedLoansRequest:
    employeeGetAllGeneratedLoansRequestReducer,

  // Dashboard
  getDashboardReportsResult: getDashboardReportsResultReducer,
});

const getAdminLoginStatusFromCookie = cookie.get("adminStatusData")
  ? JSON.parse(cookie.get("adminStatusData"))
  : null;

// initialstate
const initialState = {
  adminLoginStatus: {
    adminInfo: getAdminLoginStatusFromCookie,
  },
};

// middlewares
const middleware = [thunk];

const store = createStore(
  reducers,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
);

export default store;

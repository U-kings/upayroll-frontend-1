export const employeeDataValidation = (value) => {
  // let newErrors = errors;
  const errors = {};
  // const validEmailRegex = RegExp(/^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i);
  const validEmailRegex = RegExp(
    /^(([^<>()[\].,;:\s@]+(.[^<>()[\].,;:\s@]+)*)|(.+))@(([^<>()[\].,;:\s@]+.)+[^<>()[\].,;:\s@]{2,})$/i
  );

  if (!value?.staffId) {
    errors.staffId = "*staff ID required!";
  }
  if (!value?.noOfWorkingDays) {
    // errors.noOfWorkingDays = "*field is required";
  }
  if (!value?.name) {
    errors.name = "*full name is required";
  } else if (value?.name?.length < 10) {
    errors.name = "*must be more than 10 characters long!";
  }
  if (value?.dob?.length === 0) {
    errors.dob = "*date of birth is required!";
  }
  if (!validEmailRegex.test(value?.email)) {
    errors.email = "*email is not valid!";
  }
  if (value?.mobile?.length < 11) {
    errors.mobile = "*mobile must be 11 characters long!";
  }
  if (value?.state?.length < 3) {
    errors.state = "*must be more than 2 characters long!";
  }
  if (value?.nationality?.length < 3) {
    errors.nationality = "*must be more than 2 characters long!";
  }
  if (value?.city?.length < 3) {
    errors.city = "*must be more than 2 characters long!";
  }
  if (value?.joinDate?.length === 0) {
    errors.joinDate = "*join date is required!";
  }
  if (value?.address?.length < 11) {
    errors.address = "*must be more than 10 characters!";
  }
  if (
    value?.employeeBankAcctNumber?.length < 10 &&
    value?.employeeBankAcctNumber?.length !== 10
  ) {
    errors.employeeBankAcctNumber = "*must be 10 characters long!";
  }
  if (value?.accountName?.length === 0) {
    errors.accountName = "*account name is required!";
  }

  return errors;
};

import { taxTable } from "./taxTable";

const convertToFloat = (amount) => {
  const dataToInteger = parseFloat(amount);
  return dataToInteger;
};

export const commafy = (num) => {
  if (num) {
    let str = num?.toString()?.split(".");
    if (str[0].length >= 3) {
      str[0] = str[0].replace(/(\d)(?=(\d{3})+$)/g, "$1,");
    }
    if (str[1] && str[1].length >= 5) {
      str[1] = str[1].replace(/(\d{3})/g, "$1 ");
    }
    return str.join(".");
  } else if (num === 0) {
    return 0;
  }
};

export const decimalFormat = (num) => {
  return Number(Math.round(num + "e" + 2) + "e-" + 2);
};

var my_date = new Date();
var last_date = new Date(my_date.getFullYear(), my_date.getMonth() + 1, 0);
var noLastDate = last_date.toString()?.split(" ")[2];

export const calculatePaySlip = (
  user,
  sumMonthlyPayheadPercent,
  sumTaxReliefPercent,
  taxRefLength
) => {
  //pension calculation
  // const totalBHT = monthlyPayheads.monthlyPay
  //   ?.filter(
  //     (data) =>
  //       (data.name === "Basic" ||
  //         data.name === "Housing" ||
  //         data.name === "Transport") &&
  //       data.payType === "GROSS SALARY"
  //   )
  //   .map(({ percentage: amount }) => {
  //     const monthlyPercent = convertToFloat(amount);
  //     return monthlyPercent;
  //   });

  // const sumMonthlyPayheadPercent = totalBHT.reduce(
  //   (prev, next) => prev + next,
  //   0
  // );

  const convertedMonthlyPayhead = convertToFloat(sumMonthlyPayheadPercent);
  const convertedMonthlyTaxRelief = convertToFloat(sumTaxReliefPercent);

  // const grossSalary = user?.staffLevel.salary;
  let grossSalary;
  let tempGrossSalary;

  if (!user?.notch) {
    tempGrossSalary = user?.salaryStep?.amount
      ? Number(Math.round(user?.salaryStep?.amount + "e" + 2) + "e-" + 2)
      : 0;
  } else if (user?.salaryStep?.notches?.length && user?.notch) {
    const notchId = user?.notch?.notchId;
    const stepId = user?.notch?.stepId;
    const findNotchId = user?.salaryStep?.notches?.find(
      (el) => String(el?.id) === String(notchId)
    );
    let findStepId;
    if (String(user?.salaryStep?.id) === String(stepId)) {
      findStepId = true;
    } else {
      findStepId = false;
    }
    if (findNotchId && findStepId) {
      tempGrossSalary = findNotchId?.amount
        ? Number(Math.round(findNotchId?.amount + "e" + 2) + "e-" + 2)
        : 0;
    }
  }

  if (user?.noOfWorkingDays) {
    const workDaySalary =
      (tempGrossSalary / noLastDate) * user?.noOfWorkingDays;
    // const workDaySalary =
    //   (((user?.noOfWorkingDays / noLastDate) * 100) / 100) * tempGrossSalary;
    grossSalary = Number(Math.round(workDaySalary + "e" + 2) + "e-" + 2);
  } else {
    grossSalary = tempGrossSalary;
  }

  // const uWalletPay = grossSalary / 2;
  // const newGrossPay = grossSalary / 2;
  // const uWallet = Number(Math.round(uWalletPay + "e" + 2) + "e-" + 2);
  const newGrossPay = grossSalary;

  const annualGrossSalary = newGrossPay * 12;
  const sumBHT = (convertedMonthlyPayhead / 100) * newGrossPay;
  //pension 8% of basic, housing and transport
  const pensionCalculation = (24 / 300) * sumBHT;
  const pension = Number(Math.round(pensionCalculation + "e" + 2) + "e-" + 2);
  //paye calculation
  const checkAnnualSalary = (salary) => {
    const onePercent = (1 / 100) * salary;
    if (onePercent < 200000) {
      return 200000;
    } else {
      return onePercent;
    }
  };
  let checkTaxRelief;
  if (convertedMonthlyTaxRelief === 0) {
    checkTaxRelief = convertedMonthlyTaxRelief;
  } else {
    checkTaxRelief =
      (convertedMonthlyTaxRelief / (taxRefLength * 100)) * newGrossPay;
  }
  const taxRelif =
    pension * 12 +
    (20 / 100) * annualGrossSalary +
    checkAnnualSalary(annualGrossSalary) +
    checkTaxRelief;

  const taxabelIncome = annualGrossSalary - taxRelif;
  const caluclatedPaye = taxTable(taxabelIncome);
  const paye = Number(Math.round(caluclatedPaye + "e" + 2) + "e-" + 2);

  //allowance and deduction calculation
  const totalDeductionsArr = user?.deductions.map(({ fee: amount }) => {
    const convertedAmount = convertToFloat(amount);
    return convertedAmount;
  });

  const totalAllowancesArr = user?.allowances.map(
    ({ fee: amount, feeType }) => {
      let convertedAmount;
      if (feeType === "Amount") {
        convertedAmount = convertToFloat(amount);
      } else if (feeType === "Percentage") {
        const percentageFee = newGrossPay * (amount / 100);
        convertedAmount = convertToFloat(percentageFee);
      }
      return convertedAmount;
    }
  );

  const sumAllowance = totalAllowancesArr.reduce(
    (prev, next) => prev + next,
    0
  );
  const sumDeduction = totalDeductionsArr.reduce(
    (prev, next) => prev + next,
    0
  );

  const deductionSum = sumDeduction + pension + paye + checkTaxRelief;

  const totalEarnings = sumAllowance
    ? Number(Math.round(sumAllowance + "e" + 2) + "e-" + 2)
    : 0;
  const salaryPay = grossSalary + totalEarnings - deductionSum;
  // const salaryPay = grossSalary + totalEarnings - deductionSum - uWallet;
  const netPay = Number(Math.round(salaryPay + "e" + 2) + "e-" + 2);

  const grossPay = Number(Math.round(grossSalary + "e" + 2) + "e-" + 2);
  // const netPay = Number(Math.round(grossPay - uWallet + "e" + 2) + "e-" + 2);

  // const grossPayString = commafy(
  //   Number(
  //     Math.round(totalEarnings - deductionPercentage + "e" + 2) + "e-" + 2
  //   ).toFixed(2)
  // );

  const deductionTotal = Number(Math.round(deductionSum + "e" + 2) + "e-" + 2);
  // const deductionTotal = Number(
  //   Math.round(deductionPercentage + "e" + 2) + "e-" + 2
  // );

  const allowanceTotal = Number(Math.round(sumAllowance + "e" + 2) + "e-" + 2);

  return [
    grossPay,
    allowanceTotal,
    deductionTotal,
    totalEarnings,
    pension,
    paye,
    // uWallet,
    netPay,
  ];
};

export const calculateContractSlip = (user) => {
  //pension calculation
  // const totalBHT = monthlyPayheads.monthlyPay
  //   ?.filter(
  //     (data) =>
  //       (data.name === "Basic" ||
  //         data.name === "Housing" ||
  //         data.name === "Transport") &&
  //       data.payType === "GROSS SALARY"
  //   )
  //   .map(({ percentage: amount }) => {
  //     const monthlyPercent = convertToFloat(amount);
  //     return monthlyPercent;
  //   });

  // const sumMonthlyPayheadPercent = totalBHT.reduce(
  //   (prev, next) => prev + next,
  //   0
  // );

  let tempGrossSalary = user?.contractSalary;
  let grossSalary;

  if (user?.noOfWorkingDays) {
    const workDaySalary =
      (tempGrossSalary / noLastDate) * user?.noOfWorkingDays;
    // const workDaySalary =
    //   (((user?.noOfWorkingDays / noLastDate) * 100) / 100) * tempGrossSalary;
    grossSalary = Number(Math.round(workDaySalary + "e" + 2) + "e-" + 2);
  } else {
    grossSalary = tempGrossSalary;
  }

  //allowance and deduction calculation
  const totalDeductionsArr = user?.deductions.map(({ fee: amount }) => {
    const convertedAmount = convertToFloat(amount);
    return convertedAmount;
  });

  const totalAllowancesArr = user?.allowances.map(
    ({ fee: amount, feeType }) => {
      let convertedAmount;
      if (feeType === "Amount") {
        convertedAmount = convertToFloat(amount);
      } else if (feeType === "Percentage") {
        const percentageFee = grossSalary * (amount / 100);
        convertedAmount = convertToFloat(percentageFee);
      }
      // const convertedAmount = convertToFloat(amount);
      return convertedAmount;
    }
  );

  const sumAllowance = totalAllowancesArr.reduce(
    (prev, next) => prev + next,
    0
  );
  const sumDeduction = totalDeductionsArr.reduce(
    (prev, next) => prev + next,
    0
  );

  // const allowancePercentage = grossSalary * (sumAllowance / 100);
  // const deductionPercentage = grossSalary * (sumDeduction / 100);
  const deductionSum = sumDeduction;

  const totalEarnings = sumAllowance ? sumAllowance : 0;

  const grossPay = Number(
    Math.round(totalEarnings + grossSalary - deductionSum + "e" + 2) + "e-" + 2
  );

  const netPay = Number(Math.round(grossPay + "e" + 2) + "e-" + 2);

  // const netSalaryString = commafy(
  //   Number(
  //     Math.round(totalEarnings - deductionPercentage + "e" + 2) + "e-" + 2
  //   ).toFixed(2)
  // );

  const deductionTotal = Number(Math.round(deductionSum + "e" + 2) + "e-" + 2);
  // const deductionTotal = Number(
  //   Math.round(deductionPercentage + "e" + 2) + "e-" + 2
  // );

  const allowanceTotal = Number(Math.round(sumAllowance + "e" + 2) + "e-" + 2);

  return [grossPay, allowanceTotal, deductionTotal, totalEarnings, netPay];
};

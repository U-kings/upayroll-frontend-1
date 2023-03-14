export const taxTable = (salary) => {
  let annualSalary = salary;
  let taxDeducted = 0;

  const monthlypay = (pay) => {
    const calculatedPay = pay / 12;
    return calculatedPay;
  };

  if (annualSalary > 300000) {
    annualSalary -= 300000;
    taxDeducted += 21000;
    if (annualSalary > 300000) {
      annualSalary -= 300000;
      taxDeducted += 33000;
      if (annualSalary > 500000) {
        annualSalary -= 500000;
        taxDeducted += 75000;
        if (annualSalary > 500000) {
          annualSalary -= 500000;
          taxDeducted += 95000;
          if (annualSalary > 1600000) {
            annualSalary -= 1600000;
            taxDeducted += 336000;
            do {
              if (annualSalary > 3200000) {
                annualSalary -= 3200000;
                taxDeducted += 768000;
              } else {
                taxDeducted += annualSalary * 0.24;
              }
            } while (annualSalary > 3200000);
          } else {
            taxDeducted += annualSalary * 0.21;
          }
        } else {
          taxDeducted += annualSalary * 0.19;
        }
      } else {
        taxDeducted += annualSalary * 0.15;
      }
    } else {
      taxDeducted += annualSalary * 0.11;
    }
  } else {
    // taxDeducted += annualSalary * 0.07;
    taxDeducted = 1800;
  }

  return monthlypay(taxDeducted);
};


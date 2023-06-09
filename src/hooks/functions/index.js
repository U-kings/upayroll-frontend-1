export const trancateWord = (string) => {
  if (string) {
    return string.replace(/(.{20})..+/, "$1…");
  }
};

export const removeExtraSpace = (str) => {
  if (str) {
    return str.trim().split(/ +/).join(" ");
  }
};

export const formatDate = (date) => {
  if (date !== "" && date) {
    return new Date(date)?.toISOString().split("T")[0];
  }
  // if (date !== "") {
  //   return new Date(date).toISOString();
  // }
};

export const Capitalize = (str) => {
  if (str) {
    const arr = str?.split("-");
    for (var i = 0; i < arr?.length; i++) {
      arr[i] = arr[i]?.charAt(0)?.toUpperCase() + arr[i].slice(1);
    }
    const str2 = arr.join("-");
    return str2;
    // return str.charAt(0).toUpperCase() + str.slice(1);
  }
};

export const checkEmail = (arrData) => {
  const emailPattern =
    /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

  const arrEmail = arrData?.map((data) => {
    return data?.Email;
  });
  let duplicateItems = arrEmail?.filter(
    (item, index) => arrEmail?.indexOf(item) != index
  );

  const arrEmail2 = arrData?.some((data) => {
    return !emailPattern.test(data?.Email);
  });

  return { test: duplicateItems?.length >= 1, test2: arrEmail2 };
};

export const checkDate = (arrData) => {
  // const check = [
  //   { DateOfBirth: "12/12/2012", JoinDate: "12/12/2012" },
  //   { DateOfBirth: "12/12/2012", JoinDate: "12/12/d" },
  // ];

  return arrData?.some((data) => {
    return !/^(\d{2}|\d{1})\/(\d{2}|\d{1})\/\d{4}$/.test(
      data?.DateOfBirth?.toString()?.trim() &&
        data?.JoinDate?.toString()?.trim()
    );
  });
};

export const checkNumber = (num) => {
  // let numberRegex = /^\d{11}$/;
  var numberRegex = new RegExp("^[0-9]{11}$");
  return numberRegex?.test(num?.toString()?.trim());
};

export const checkAccNumber = (num) => {
  // let numberRegex = /^\d{11}$/;
  var numberRegex = new RegExp("^[0-9]{10}$");
  return numberRegex?.test(num?.toString()?.trim());
};

export const validateEmail = (email) => {
  return email?.match(
    /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
  );
};

export const checkDuplicateAccountNumber = (arrData) => {
  const arrAccountNumbers = arrData?.map((data) => {
    return data?.EmployeeBankAcctNumber;
  });
  let duplicateItems = arrAccountNumbers?.filter(
    (item, index) => arrAccountNumbers?.indexOf(item) != index
  );

  return duplicateItems?.length >= 1;
};

export const paystructureFormatter = (jsonDoc) => {
  const outPutFormat = {};

  const numberOfSalaryLevels = jsonDoc?.map((el) => {
    // if (el["StaffGrade"] === jsonDoc[0]["StaffGrade"]) {
    // if (el["SalaryLevel"] === jsonDoc[0]["SalaryLevel"]) {
    return {
      salaryLevel: el["SalaryLevel"],
    };
    // }
  });

  const formatSalarylevels = [];

  for (let y = 0; y < numberOfSalaryLevels.length; y++) {
    const element = numberOfSalaryLevels[y];
    if (!formatSalarylevels?.includes(element.salaryLevel)) {
      formatSalarylevels?.push(element.salaryLevel);
    }
  }

  outPutFormat.data = [];

  for (let x = 0; x < formatSalarylevels.length; x++) {
    const currentSalaryLevel = formatSalarylevels[x];
    const salaryLevelData = jsonDoc?.filter(
      (el) => el["SalaryLevel"] === currentSalaryLevel
    );

    const curSalaryLevelSteps = salaryLevelData?.map((el) => {
      const notches = [];
      const numberOfNotches = Object.keys(el).filter((el2) =>
        el2?.toLowerCase().startsWith("notch")
      );

      for (let z = 0; z < numberOfNotches?.length; z++) {
        const curNotches = numberOfNotches[z];
        notches.push({
          name: curNotches,
          amount: el[curNotches],
        });
      }

      const allEmpty = notches?.every((el) => el.amount === 0);

      return {
        name: el["SalaryStep"],
        amount: el["SalaryStepAmount"],
        notches: allEmpty ? [] : notches,
      };
    });

    outPutFormat.data.push({
      salaryLevel: currentSalaryLevel,
      steps: curSalaryLevelSteps,
    });
  }
  return outPutFormat.data;
};

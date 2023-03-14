import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { adminGetAllMonthlyPayheads } from "../../actions/monthlypayheads";

export const useMonthlyPayhead = (userRole) => {
  // dispatch init
  const dispatch = useDispatch();
  // usestates
  const [sumMonthlyPay, setSumMonthlyPay] = useState();
  const [sumTaxRelief, setTaxRelief] = useState();
  const [taxReliefLength, setTaxReliefLength] = useState();
  // const { isLoading: getMonthlyPayheadsLoading, monthlyPayheads } = useSelector(
  const { monthlyPayheads } = useSelector(
    (state) => state.adminGetAllMonthlyPayheads
  );
  useEffect(() => {
    if (!monthlyPayheads && userRole === "HR") {
      dispatch(adminGetAllMonthlyPayheads());
    }
    const totalBHT = monthlyPayheads
      ?.filter(
        (data) =>
          data.payType === "GROSS SALARY" &&
          (data.name === "Basic" ||
            data.name === "Housing" ||
            data.name === "Transport")
      )
      .map(({ percentage: amount }) => {
        const monthlyPercent = amount;
        return monthlyPercent;
      });

    const sumMonthlyPayheadPercent = totalBHT?.reduce(
      (prev, next) => prev + next,
      0
    );
    setSumMonthlyPay(sumMonthlyPayheadPercent);

    const totalTaxRelief = monthlyPayheads
      ?.filter((data) => data.payType === "TAX RELIEF")
      .map(({ percentage: amount }) => {
        const taxRelief = amount;
        return taxRelief;
      });
    setTaxReliefLength(totalTaxRelief?.length);

    const sumTaxReliefPercent = totalTaxRelief?.reduce(
      (prev, next) => prev + next,
      0
    );
    setTaxRelief(sumTaxReliefPercent);
  }, [monthlyPayheads, dispatch, userRole]);

  return { sumMonthlyPay, sumTaxRelief, taxReliefLength };
};

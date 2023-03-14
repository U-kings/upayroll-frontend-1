import React from "react";
import {
  ModalBackground,
  ModalContainer,
  MonthContainer,
  MonthContent,
  Month,
} from "../../styles/library";

import{
  currentmonthMethod,
  currentyearMethod,
  getMonthListMethod
} from "../../hooks/months/listMonths"

const SelectMonth = ({ isOpen, popup, employee }) => {

  const months = getMonthListMethod("long");
  const currentyear = currentyearMethod();
  const currentmonth = currentmonthMethod("long");

  const check = (month) => {
    if (month === currentmonth) {
      return ("current");
    }
  };

  return (
    <>
      <ModalBackground isOpen={isOpen} onClick={popup} />
      <ModalContainer isOpen={isOpen}>
        <div className="month__view">
          <div className="month__top row">
            <h2>Select A Month</h2>
            <div className="row">
            <h2>{new Date().toLocaleString("en-US", { month: "long" })}</h2>
            <h2>{currentyear}</h2>
            </div>
          </div>
          <MonthContainer>
            <MonthContent>
              {months.map((month) => (
                <Month
                  to={{
                    pathname: "/pay-slip",
                    state: { month: month, currentyear: currentyear, employee }, // your data array of objects
                  }}
                  className={"month " + check(month)}
                  key={Math.random()}
                >
                  <h2>{month.substring(0, 3).toUpperCase()}</h2>
                </Month>
              ))}
            </MonthContent>
          </MonthContainer>
        </div>
      </ModalContainer>
    </>
  );
};

export default SelectMonth;

import React, { useState, useEffect } from "react";
import { DropdownList, ErrorBox } from "..";
import { Container } from "../../styles/library";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { Comfirm, LoadingSpinner, Successful } from "../../modals";
import {
  adminCreateMonthlyPayhead,
  adminGetAllMonthlyPayheads,
  adminUpdateMonthlyPayheadById,
} from "../../actions/monthlypayheads";
import {
  ADMIN_CREATE_MONTHLYPAYHEADS_RESET,
  ADMIN_UPDATE_MONTHLYPAYHEADS_RESET,
} from "../../types/monthlypayheads";

const MonthlyPayheadTable = ({ toggle }) => {
  // hsitory init
  const history = useHistory();
  // dispatch init
  const dispatch = useDispatch();
  // redux state
  const { isLoading: getMonthlyPayheadsLoading, monthlyPayheads } = useSelector(
    (state) => state.adminGetAllMonthlyPayheads
  );
  const {
    isLoading: createMonthlyPayheadLoading,
    success: createMonthlyPayheadSuccess,
    error: createMonthlyPayheadError,
  } = useSelector((state) => state.adminCreateMonthlyPayheads);
  const {
    isLoading: updateMonthlyPayheadLoading,
    success: updateMonthlyPayheadSuccess,
    error: updateMonthlyPayheadError,
  } = useSelector((state) => state.adminUpdateMonthlyPayheads);

  // func state
  const [isOpen4, setIsOpen4] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    percentage: 0,
  });
  const { name, percentage } = formData;
  const [monthlyPayheadId, setMonthlyPayheadId] = useState(null);

  const payType = ["GROSS SALARY", "TAX RELIEF"];

  const strUpperFirst = (strVal) => {
    return `${strVal.substr(0, 1).toUpperCase()}${strVal.substr(
      1,
      strVal?.payType?.length
    )}`;
  };

  const onSelect = (id) => {
    let findPos;
    if (monthlyPayheads?.length > 0) {
      findPos = monthlyPayheads.find((el) => String(el?.id) === String(id));
      if (findPos) {
        setFormData({
          name: findPos?.name,
          percentage: findPos?.percentage,
          id: findPos?.id,
        });
        setSelectedOption(strUpperFirst(findPos?.payType));
      }
    }
  };

  // toggle func for modals
  const toggling = () => setIsOpen(!isOpen);

  // close dropdown
  const close = () => {
    if (isOpen === true) {
      setIsOpen(false);
    }
  };

  // monthly payhead type
  const onOptionClicked = (payHeadType) => {
    setSelectedOption(payHeadType);
    setIsOpen(false);
  };

  const onCancel = () => {
    setFormData({ name: "", percentage: 0 });
    setSelectedOption(null);
  };

  const popup4 = (id) => {
    if (id) {
      setMonthlyPayheadId(id);
    }
    setIsOpen4(!isOpen4);
  };

  const popup7 = () => {
    if (updateMonthlyPayheadSuccess && !updateMonthlyPayheadError) {
      dispatch({
        type: ADMIN_UPDATE_MONTHLYPAYHEADS_RESET,
      });
      setFormData({ name: "", percentage: 0 });
      setSelectedOption(null);
    }

    if (createMonthlyPayheadSuccess && !createMonthlyPayheadError) {
      dispatch({ type: ADMIN_CREATE_MONTHLYPAYHEADS_RESET });
      dispatch({ type: ADMIN_CREATE_MONTHLYPAYHEADS_RESET });
      setFormData({ name: "", percentage: 0 });
      setSelectedOption(null);
    }
  };

  const onSave = (e) => {
    e.preventDefault();
    if (formData?.id) {
      dispatch(
        adminUpdateMonthlyPayheadById(formData?.id, {
          name,
          payType: selectedOption,
          percentage,
        })
      );
    } else {
      dispatch(
        adminCreateMonthlyPayhead({
          name,
          payType: selectedOption,
          percentage,
        })
      );
    }
  };

  // useEffects
  useEffect(() => {
    dispatch(adminGetAllMonthlyPayheads());
  }, [dispatch]);

  useEffect(() => {
    if (createMonthlyPayheadSuccess) {
      dispatch(adminGetAllMonthlyPayheads());
    }

    let timeoutId;
    if (createMonthlyPayheadError) {
      timeoutId = setTimeout(() => {
        dispatch({ type: ADMIN_CREATE_MONTHLYPAYHEADS_RESET });
      }, 4000);
    }
    return () => {
      // Clear the timeout when the component unmounts or when showError changes
      clearTimeout(timeoutId);
    };
  }, [dispatch, createMonthlyPayheadSuccess, createMonthlyPayheadError]);

  return (
    <>
      {getMonthlyPayheadsLoading && <LoadingSpinner toggle={toggle} />}
      {updateMonthlyPayheadLoading && <LoadingSpinner toggle={toggle} />}
      {createMonthlyPayheadLoading && <LoadingSpinner toggle={toggle} />}
      <Successful
        isOpen7={createMonthlyPayheadSuccess && !createMonthlyPayheadError}
        popup7={popup7}
        message="Monthly Payhead Created Successfully!"
      />
      <Successful
        isOpen7={updateMonthlyPayheadSuccess && !updateMonthlyPayheadError}
        popup7={popup7}
        message="Monthly Payhead Updated Successfully!"
      />
      {monthlyPayheadId && (
        <Comfirm
          toggle={toggle}
          isOpen4={isOpen4}
          popup4={popup4}
          setIsOpen4={setIsOpen4}
          monthlyPayheadId={monthlyPayheadId}
          setMonthlyPayheadId={setMonthlyPayheadId}
        />
      )}
      <Container onClick={close}>
        <h1>Monthly Pay Heads </h1>
        <div className="container__content">
          <div className="form__content">
            {createMonthlyPayheadError && (
              <ErrorBox errorMessage={createMonthlyPayheadError} />
            )}
            <form className="global__form" onSubmit={onSave}>
              <div className="label__group">
                <label>Name</label>
                <input
                  type="text"
                  name="name"
                  value={name}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      [e.target.name]: e.target.value,
                    })
                  }
                  placeholder="Enter Name"
                />
              </div>
              <div className="label__group">
                <label>Type</label>
                <DropdownList
                  isOpen={isOpen}
                  toggling={toggling}
                  selectedOption={selectedOption}
                  text="-- Select a Type"
                  dataSet={payType}
                  keyValue
                  onOptionClicked={onOptionClicked}
                />
              </div>
              <div className="label__group">
                <label>Percentage</label>
                <input
                  type="number"
                  name="percentage"
                  value={percentage}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      [e.target.name]: e.target.valueAsNumber,
                    })
                  }
                  placeholder="percentage"
                />
              </div>
              <div className="form__button">
                <input
                  className={
                    !formData.name ||
                    !formData.percentage ||
                    !selectedOption ||
                    updateMonthlyPayheadLoading ||
                    createMonthlyPayheadLoading
                      ? "disabled__btn"
                      : "save__btn"
                  }
                  type="submit"
                  disabled={
                    !formData.name ||
                    !formData.percentage ||
                    !selectedOption ||
                    updateMonthlyPayheadLoading ||
                    createMonthlyPayheadLoading
                  }
                  value={formData?.id ? "Edit" : "Save"}
                />
                <input
                  className="cancel__btn margin__left"
                  type="button"
                  value="Cancel"
                  disabled={
                    createMonthlyPayheadLoading || updateMonthlyPayheadLoading
                  }
                  onClick={onCancel}
                />
              </div>
            </form>
          </div>
          <div className="table__body">
            <div>
              <table>
                <thead>
                  <tr>
                    <th>#</th>
                    <th>Name</th>
                    <th>Type</th>
                    <th>Percentage</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {monthlyPayheads?.map((mthPayhead, indexes) => (
                    <tr key={mthPayhead?.id}>
                      <td>{++indexes}</td>
                      <td>{mthPayhead?.name}</td>
                      <td>{strUpperFirst(mthPayhead?.payType)}</td>
                      <td>
                        {mthPayhead?.percentage}
                        {"%"}
                      </td>
                      <td>
                        <div className="action__icons">
                          <div
                            className="icons"
                            onClick={(e) => onSelect(mthPayhead?.id)}
                          >
                            <FontAwesomeIcon icon={["fas", "edit"]} />
                          </div>
                          <div
                            className="icons"
                            onClick={(e) => popup4(mthPayhead?.id)}
                          >
                            <FontAwesomeIcon icon={["fas", "trash-alt"]} />
                          </div>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
        <div className="container__content">
          <div className="monthlypayhead__text">
            <p>20% of Gross Income</p>
            <p>Higher of (CRA) 1% or N200,000</p>
          </div>
        </div>
      </Container>
    </>
  );
};

export default MonthlyPayheadTable;

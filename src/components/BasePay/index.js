import React, { useEffect, useState } from "react";
import cookie from "js-cookie";
import { Container } from "../../styles/library";
import { useDispatch, useSelector } from "react-redux";
import {
  hrCreateBasePayFunc,
  hrUpdateBasePayFunc,
} from "../../actions/basepay";
import {
  HR_CREATE_BASEPAY_RESET,
  HR_UPDATE_BASEPAY_BY_ID_RESET,
} from "../../types/basepay";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { LoadingSpinner, Successful } from "../../modals";
import ErrorBox from "../ErrorBox";

const BasePay = ({ basePays, toggle }) => {
  // dispatch init
  const dispatch = useDispatch();

  // redux state
  const {
    isLoading: createBasePayLoading,
    success: createBasePaySuccess,
    error: createBasePayError,
  } = useSelector((state) => state.hrCreateBasePay);
  const {
    isLoading: updateBasePayLoading,
    success: updateBasePaySuccess,
    error: updateBasePayError,
  } = useSelector((state) => state.hrUpdateBasePay);

  const [formData, setFormData] = useState({
    firstGrossPay: 0,
    secondGrossPay: 0,
    thirdGrossPay: 0,
    fourthGrossPay: 0,
    cola: 0,
  });

  const {
    firstGrossPay,
    secondGrossPay,
    thirdGrossPay,
    fourthGrossPay,
    cola,
  } = formData;

  useEffect(() => {
    if (createBasePaySuccess) {
      dispatch({ type: HR_CREATE_BASEPAY_RESET });
      setFormData({
        firstGrossPay: 0,
        secondGrossPay: 0,
        thirdGrossPay: 0,
        fourthGrossPay: 0,
        cola: 0,
      });
    }
    if (createBasePayError) {
      dispatch({ type: HR_CREATE_BASEPAY_RESET });
    }
  }, [
    dispatch,
    createBasePaySuccess,
    updateBasePaySuccess,
    createBasePayError,
  ]);

  const onSave = (e) => {
    e.preventDefault();
    if (formData?.id) {
      dispatch(
        hrUpdateBasePayFunc(formData?.id, {
          firstGrossPay,
          secondGrossPay,
          thirdGrossPay,
          fourthGrossPay,
          cola,
        })
      );
    } else {
      if (!basePays?.length) {
        dispatch(
          hrCreateBasePayFunc({
            firstGrossPay,
            secondGrossPay,
            thirdGrossPay,
            fourthGrossPay,
            cola,
          })
        );
      }
    }
  };

  const onSelect = (id) => {
    let findPos;
    if (basePays?.length > 0) {
      findPos = basePays?.find((el) => String(el?.id) === String(id));
      if (findPos) {
        setFormData({
          firstGrossPay: findPos?.firstGrossPay,
          secondGrossPay: findPos?.secondGrossPay,
          thirdGrossPay: findPos?.thirdGrossPay,
          fourthGrossPay: findPos?.fourthGrossPay,
          cola: findPos?.cola,
          id: findPos?.id,
        });
      }
    }
  };

  const popup7 = () => {
    if (updateBasePaySuccess && !updateBasePayError) {
      dispatch({
        type: HR_UPDATE_BASEPAY_BY_ID_RESET,
      });
      setFormData({
        firstGrossPay: 0,
        secondGrossPay: 0,
        thirdGrossPay: 0,
        fourthGrossPay: 0,
        cola: 0,
      });
    }
    if (createBasePaySuccess && !createBasePayError) {
      dispatch({
        type: HR_CREATE_BASEPAY_RESET,
      });
      setFormData({
        firstGrossPay: 0,
        secondGrossPay: 0,
        thirdGrossPay: 0,
        fourthGrossPay: 0,
        cola: 0,
      });
    }
  };

  const onCancel = () => {
    setFormData({
      firstGrossPay: 0,
      secondGrossPay: 0,
      thirdGrossPay: 0,
      fourthGrossPay: 0,
      cola: 0,
    });
  };

  return (
    <>
      {createBasePayLoading && <LoadingSpinner toggle={toggle} />}
      {updateBasePayLoading && <LoadingSpinner toggle={toggle} />}
      <Successful
        isOpen7={updateBasePaySuccess && !updateBasePayError}
        popup7={popup7}
        message="Base Pay Updated Successfully!"
      />
      <Successful
        isOpen7={createBasePaySuccess && !createBasePayError}
        popup7={popup7}
        message="Base Pay Created Successfully!"
      />
      <Container>
        {(createBasePayError || updateBasePayError) && (
          <ErrorBox errorMessage={createBasePayError || updateBasePayError} />
        )}
        <h1>Base Pay/ COLA</h1>
        <div className="container__content">
          <div className="form__content">
            <form className="global__form" onSubmit={onSave}>
              <div className="label__group">
                <label>First Base Pay | Entry Level (NO EXPERIENCE) - 1</label>
                <input
                  type="number"
                  name="firstGrossPay"
                  value={Number(Math.round(firstGrossPay + "e" + 2) + "e-" + 2)}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      [e.target.name]: e.target.valueAsNumber,
                    })
                  }
                  placeholder="Enter First Base Pay"
                />
              </div>
              <div className="label__group">
                <label>Second Base Pay | Entry Level (WITH EXPERIENCE)</label>
                <input
                  type="number"
                  name="secondGrossPay"
                  value={Number(
                    Math.round(secondGrossPay + "e" + 2) + "e-" + 2
                  )}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      [e.target.name]: e.target.valueAsNumber,
                    })
                  }
                  placeholder="Enter Second Base Pay"
                />
              </div>
              <div className="label__group">
                <label>Third Base Pay | For Senior Staff Grade</label>
                <input
                  type="number"
                  name="thirdGrossPay"
                  value={Number(Math.round(thirdGrossPay + "e" + 2) + "e-" + 2)}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      [e.target.name]: e.target.valueAsNumber,
                    })
                  }
                  placeholder="Enter Third Base Pay"
                />
              </div>
              <div className="label__group">
                <label>Fourth Base Pay | For Management Staff Grade</label>
                <input
                  type="number"
                  name="fourthGrossPay"
                  value={Number(
                    Math.round(fourthGrossPay + "e" + 2) + "e-" + 2
                  )}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      [e.target.name]: e.target.valueAsNumber,
                    })
                  }
                  placeholder="Enter Fourth Base Pay"
                />
              </div>
              <div className="label__group">
                <label>COLA</label>
                <input
                  type="number"
                  name="cola"
                  value={cola}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      [e.target.name]: e.target.valueAsNumber,
                    })
                  }
                  placeholder="Enter COLA Percentage"
                />
              </div>
              <div className="form__button">
                <input
                  className={
                    !formData.firstGrossPay ||
                    !formData.secondGrossPay ||
                    !formData.thirdGrossPay ||
                    !formData.fourthGrossPay ||
                    !formData.cola ||
                    updateBasePayLoading ||
                    createBasePayLoading
                      ? "disabled__btn"
                      : "save__btn"
                  }
                  type="submit"
                  disabled={
                    !formData.firstGrossPay ||
                    !formData.secondGrossPay ||
                    !formData.thirdGrossPay ||
                    !formData.fourthGrossPay ||
                    !formData.cola ||
                    updateBasePayLoading ||
                    createBasePayLoading
                  }
                  value={formData?.id ? "Edit" : "Save"}
                />
                <input
                  className="cancel__btn margin__left"
                  type="button"
                  value="Cancel"
                  disabled={updateBasePayLoading || createBasePayLoading}
                  onClick={onCancel}
                />
              </div>
            </form>
          </div>
          <div className="table__body">
            <div className="table__overflow">
              <table>
                <thead>
                  <tr>
                    <th>#</th>
                    <th>First Base Pay</th>
                    <th>Second Base Pay</th>
                    <th>Third Base Pay</th>
                    <th>Fourth Base Pay</th>
                    <th>COLA</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {basePays?.map((el, indexes) => (
                    <tr key={el?.id}>
                      <td>{++indexes}</td>
                      <td>
                        {Number(
                          Math.round(el?.firstGrossPay + "e" + 2) + "e-" + 2
                        )}
                      </td>
                      <td>
                        {Number(
                          Math.round(el?.secondGrossPay + "e" + 2) + "e-" + 2
                        )}
                      </td>
                      <td>
                        {Number(
                          Math.round(el?.thirdGrossPay + "e" + 2) + "e-" + 2
                        )}
                      </td>
                      <td>
                        {Number(
                          Math.round(el?.fourthGrossPay + "e" + 2) + "e-" + 2
                        )}
                      </td>
                      <td>
                        {el?.cola}
                        {"%"}
                      </td>
                      <td>
                        <div className="action__icons">
                          <div
                            className="icons"
                            onClick={(e) => onSelect(el?.id)}
                          >
                            {" "}
                            <FontAwesomeIcon icon={["fas", "edit"]} />{" "}
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
      </Container>
    </>
  );
};

export default BasePay;

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { useSelector } from "react-redux";
import { Container } from "../../styles/library";

const DeductionTable = ({
  deduction,
  deductions,
  onSubmit1,
  onChange,
  onClick1,
  onClick2,
  onClick3,
}) => {
  const { isLoading: deleteDeductionLoading } = useSelector(
    (state) => state.adminDeleteDeduction
  );
  const { isLoading: updateDeductionLoading } = useSelector(
    (state) => state.adminUpdateDeduction
  );

  return (
    <>
      <Container>
        <h1>Deductions</h1>
        <div className="container__content">
          <div className="form__content">
            <form onSubmit={(e) => onSubmit1(e, "deduction")} action="#">
              <div className="label__group">
                <label>Name</label>
                <textarea
                  name="name"
                  rows="4"
                  cols="50"
                  placeholder="Deduction Name"
                  value={deduction.name}
                  onChange={(e) => onChange(e, "deduction")}
                ></textarea>
              </div>
              <div className="label__group">
                <label>Description</label>
                <textarea
                  rows="4"
                  name="description"
                  cols="50"
                  placeholder="Deduction Description"
                  value={deduction.description}
                  onChange={(e) => onChange(e, "deduction")}
                ></textarea>
              </div>
              <div className="form__button">
                <input
                  className={
                    !deduction.name ||
                    !deduction.description ||
                    deleteDeductionLoading ||
                    updateDeductionLoading
                      ? "disabled__btn"
                      : "save__btn"
                  }
                  disabled={
                    !deduction.name ||
                    !deduction.description ||
                    deleteDeductionLoading ||
                    updateDeductionLoading
                  }
                  type="submit"
                  value={deduction?.edit ? "Edit" : "Save"}
                />
                <input
                  className="cancel__btn margin__left"
                  type="button"
                  onClick={(e) => onClick1(e, "deduction")}
                  value="Cancel"
                  disabled={updateDeductionLoading || deleteDeductionLoading}
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
                    <th>Deduction Information</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {deductions?.map((el, indexes) => (
                    <tr key={el?.id}>
                      <td>{indexes + 1}</td>
                      <td>{el?.name}</td>
                      <td>
                        <div className="action__icons">
                          <div
                            title="Edit"
                            className="icons"
                            onClick={(e) => onClick2(el?.id, "deduction")}
                          >
                            {" "}
                            <FontAwesomeIcon icon={["fas", "edit"]} />{" "}
                          </div>
                          <div
                            title="Delete"
                            className="icons"
                            onClick={(e) => onClick3(el?.id, "deduction")}
                          >
                            {" "}
                            <FontAwesomeIcon icon={["fas", "trash-alt"]} />{" "}
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

export default DeductionTable;

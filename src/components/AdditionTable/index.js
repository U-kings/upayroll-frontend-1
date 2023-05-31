import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { Container } from "../../styles/library";
import { useSelector } from "react-redux";

const AdditionTable = ({
  allowance,
  allowances,
  onSubmit1,
  onChange,
  onClick1,
  onClick2,
  onClick3,
}) => {
  const { isLoading: deleteAllowanceLoading} = useSelector(
    (state) => state.adminDeleteAllowance
  );
  const { isLoading: createAllowanceLoading } = useSelector(
    (state) => state.adminCreateAllowance
  );
  const { isLoading: updateAllowanceLoading } = useSelector(
    (state) => state.adminUpdateAllowance
  );

  return (
    <>
      <Container>
        <h1>Additions </h1>
        <div className="container__content">
          <div className="form__content">
            <form onSubmit={(e) => onSubmit1(e, "allowance")} action="#">
              <div className="label__group">
                <label>Name</label>
                <textarea
                  name="name"
                  rows="4"
                  cols="50"
                  placeholder="Addition Name"
                  value={allowance.name}
                  onChange={(e) => onChange(e, "allowance")}
                ></textarea>
              </div>
              <div className="label__group">
                <label>Description</label>
                <textarea
                  name="description"
                  rows="4"
                  cols="50"
                  placeholder="Description Name"
                  value={allowance.description}
                  onChange={(e) => onChange(e, "allowance")}
                ></textarea>
              </div>
              <div className="form__button">
                <input
                  className={
                    !allowance.name ||
                    !allowance.description ||
                    deleteAllowanceLoading ||
                    createAllowanceLoading ||
                    updateAllowanceLoading
                      ? "disabled__btn"
                      : "save__btn"
                  }
                  disabled={
                    !allowance.name ||
                    !allowance.description ||
                    deleteAllowanceLoading ||
                    createAllowanceLoading ||
                    updateAllowanceLoading
                  }
                  type="submit"
                  value={allowance?.edit ? "Edit" : "Save"}
                />
                <input
                  className="cancel__btn margin__left"
                  type="button"
                  value="Cancel"
                  onClick={(e) => onClick1(e, "allowance")}
                  disabled={deleteAllowanceLoading}
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
                    <th>Addition Information</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {allowances?.map((el, indexes) => (
                    <tr key={el?.id}>
                      <td>{indexes + 1}</td>
                      <td>{el?.name}</td>
                      <td>
                        <div className="action__icons">
                          <div
                            title="Edit"
                            className="icons"
                            onClick={(e) => onClick2(el?.id, "allowance")}
                          >
                            {" "}
                            <FontAwesomeIcon icon={["fas", "edit"]} />{" "}
                          </div>
                          <div
                            title="Delete"
                            className="icons"
                            onClick={(e) => onClick3(el?.id, "allowance")}
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

export default AdditionTable;

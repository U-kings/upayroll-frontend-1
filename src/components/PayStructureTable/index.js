import React from "react";
// import { useDispatch } from "react-redux";
import { Container } from "../../styles/library";
// import { LoadingSpinner } from "../../modals";

const PayStructureTable = ({ salarySteps }) => {
  // dispatch init
  // const dispatch = useDispatch();

  // redux state

  return (
    <>
      <Container className="margin__bottom">
        <div className="table__body">
          <div className="table__overflow full__height2">
            <table>
              <thead>
                <tr>
                  <th>#</th>
                  <th>Staff Grade</th>
                  <th>Salary Level</th>
                  <th>Step</th>
                  <th>Gross Pay</th>
                  <th>Notch 1</th>
                  <th>Notch 2</th>
                  <th>Notch 3</th>
                  <th>Notch 4</th>
                  <th>Notch 5</th>
                </tr>
              </thead>
              <tbody>
                {salarySteps?.map((el, indexes) => (
                  <tr key={el?.id}>
                    <td>{++indexes}</td>
                    <td>{el?.salaryLevel?.salaryGrade?.name}</td>
                    <td>{el?.salaryLevel?.name}</td>
                    <td>{el?.name}</td>
                    <td>
                      {Number(Math.round(el?.amount + "e" + 2) + "e-" + 2)}
                    </td>
                    <td>
                      {el?.notches[0]?.amount &&
                        Number(
                          Math.round(el?.notches[0]?.amount + "e" + 2) +
                            "e-" +
                            2
                        )}
                    </td>
                    <td>
                      {el?.notches[1]?.amount &&
                        Number(
                          Math.round(el?.notches[1]?.amount + "e" + 2) +
                            "e-" +
                            2
                        )}
                    </td>
                    <td>
                      {el?.notches[2]?.amount &&
                        Number(
                          Math.round(el?.notches[2]?.amount + "e" + 2) +
                            "e-" +
                            2
                        )}
                    </td>
                    <td>
                      {el?.notches[3]?.amount &&
                        Number(
                          Math.round(el?.notches[3]?.amount + "e" + 2) +
                            "e-" +
                            2
                        )}
                    </td>
                    <td>
                      {el?.notches[4]?.amount &&
                        Number(
                          Math.round(el?.notches[4]?.amount + "e" + 2) +
                            "e-" +
                            2
                        )}
                    </td>
                    {/* <td>
                      <div className="action__icons">
                        <div
                          className="icons"
                          onClick={(e) => onSelect(el?.id)}
                        >
                          
                          <FontAwesomeIcon icon={["fas", "edit"]} />
                        </div>
                        <div className="icons" onClick={(e) => popup(el?.id)}>
                          
                          <FontAwesomeIcon icon={["fas", "trash-alt"]} />
                        </div>
                      </div>
                    </td> */}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </Container>
    </>
  );
};

export default PayStructureTable;

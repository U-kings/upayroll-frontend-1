import React from "react";
import { Container } from "../../styles/library";

const TaxTable = () => {
  return (
    <>
      <Container>
        <h1>Tax Table </h1>
        <div className="container__content">
          <div className="taxtable__body table__overflow">
            <table>
              <thead>
                <tr>
                  <th>#</th>
                  <th>Anuual Taxable Income(NGN)</th>
                  <th>Rate</th>
                  <th>Tax Payable Per Annum(NGN)</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>1</td>
                  <td>First NGN300,000</td>
                  <td>7%</td>
                  <td>21,000</td>
                </tr>
                <tr>
                  <td>2</td>
                  <td>Next NGN300,000</td>
                  <td>11%</td>
                  <td>33,000</td>
                </tr>
                <tr>
                  <td>3</td>
                  <td>Next NGN500,000</td>
                  <td>15%</td>
                  <td>75,000</td>
                </tr>
                <tr>
                  <td>4</td>
                  <td>Next NGN500,000</td>
                  <td>19%</td>
                  <td>95,000</td>
                </tr>
                <tr>
                  <td>5</td>
                  <td>Next NGN1,600,000</td>
                  <td>21%</td>
                  <td>336,000</td>
                </tr>
                <tr>
                  <td>6</td>
                  <td>Next NGN3,200,000</td>
                  <td>24%</td>
                  <td style={{ width: "50%" }}>
                    Multiply only the excess amount over
                    <br />
                    NGN3.2 million by 24%. For example,
                    <br />
                    an annual taxable income of NGN5 million
                    <br />
                    is (5-3.2) million * 24% = NGN432,000.
                    <br />
                  </td>
                </tr>
                {/* {deductions?.map((el, indexes) => (
                          <tr key={el?.id}>
                            <td>{indexes + 1}</td>
                            <td>{el?.name}</td>
                            <td>
                              <div className="action__icons">
                                <div
                                  className="icons"
                                  onClick={(e) =>
                                    onSelect(el?.id, "deduction")
                                  }
                                >
                                  {" "}
                                  <FontAwesomeIcon
                                    icon={["fas", "edit"]}
                                  />{" "}
                                </div>
                                <div
                                  className="icons"
                                  onClick={(e) => popup4(el?.id, "deduction")}
                                >
                                  {" "}
                                  <FontAwesomeIcon
                                    icon={["fas", "trash-alt"]}
                                  />{" "}
                                </div>
                              </div>
                            </td>
                          </tr>
                        ))} */}
              </tbody>
            </table>
          </div>
        </div>
      </Container>
    </>
  );
};

export default TaxTable;

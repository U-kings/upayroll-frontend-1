import React, { useState, useEffect } from "react";
import { ErrorBox, Header, SideNav } from "../../components";
import {
  DashboardContainer,
  DashboardContent,
  Mainbody,
  Container,
} from "../../styles/library";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { LoadingSpinner, Successful } from "../../modals";
import { useDispatch, useSelector } from "react-redux";

import { useHistory } from "react-router-dom";

import {
  accountantCreateBankFunc,
  accountantUpdateBankByIdFunc,
  adminGetAllBanksFunc,
} from "../../actions/banklist";
import {
  ACCOUNTANT_CREATE_BANK_RESET,
  ACCOUNTANT_UPDATE_BANK_BY_ID_RESET,
} from "../../types/banklist";
import { trancateWord } from "../../hooks/functions";

const Bank = ({ toggle, toggleMenu, mobileToggle, toggleMobileMenu }) => {
  // dispatch init
  const dispatch = useDispatch();

  // history init
  const history = useHistory();

  // redux state
  const { adminInfo } = useSelector((state) => state.adminLoginStatus);
  const { isLoading: loadingAllBanks, banks } = useSelector(
    (state) => state.adminGetAllBanks
  );

  const {
    isLoading: createBankLoading,
    success: createBankSuccess,
    error: createBankError,
  } = useSelector((state) => state.accountantCreateBank);
  const {
    isLoading: updateBankLoading,
    success: updateBankSuccess,
    error: updateBankError,
  } = useSelector((state) => state.accountantUpdateBankById);
  // func state
  // const [isOpen4, setIsOpen4] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    accountNumber: "",
    bankAddress: "",
    bankEmailAddress: "",
    bankPhoneNo: "",
  });

  const { name, accountNumber, bankAddress, bankEmailAddress, bankPhoneNo } =
    formData;

  //func state
  const [isOpen7, setIsOpen7] = useState(false);
  const [userRole] = useState(adminInfo?.user?.role || "");
  const [userRoleName] = useState(adminInfo?.user?.name || "");
  const [profileImg] = useState(adminInfo?.user?.photo || "");

  const removeExtraSpace = (str) => {
    if (str) {
      return str.trim().split(/ +/).join(" ");
    }
  };

  const onSave = (e) => {
    e.preventDefault();
    setFormData({
      name: removeExtraSpace(name),
      accountNumber: removeExtraSpace(accountNumber),
      bankAddress: removeExtraSpace(bankAddress),
      bankEmailAddress: removeExtraSpace(bankEmailAddress),
      bankPhoneNo: removeExtraSpace(bankPhoneNo),
    });
    if (formData?.id) {
      dispatch(accountantUpdateBankByIdFunc(formData?.id, formData));
    } else {
      dispatch(accountantCreateBankFunc(formData));
    }
  };

  const onSelect = (id) => {
    let findBank;
    if (banks.length > 0) {
      findBank = banks.find((el) => String(el?.id) === String(id));
      if (findBank) {
        setFormData({
          name: removeExtraSpace(findBank?.name),
          accountNumber: removeExtraSpace(findBank?.accountNumber),
          bankAddress: removeExtraSpace(findBank?.bankAddress),
          bankEmailAddress: removeExtraSpace(findBank?.bankEmailAddress),
          bankPhoneNo: findBank?.bankPhoneNo,
          id: findBank?.id,
        });
      }
    }
  };

  const onClear = () => {
    setFormData({
      name: "",
      bankAddress: "",
      bankEmailAddress: "",
      contact: "",
      accountNumber: "",
      bankPhoneNo: "",
    });
  };

  const popup7 = () => {
    if (updateBankSuccess && !updateBankLoading && !updateBankError) {
      dispatch({ type: ACCOUNTANT_UPDATE_BANK_BY_ID_RESET });
      setFormData({
        name: "",
        accountNumber: "",
        bankAddress: "",
        bankEmailAddress: "",
        bankPhoneNo: "",
      });
      // setBankId(null);
    }
  };

  useEffect(() => {
    if (!adminInfo?.isAuthenticated && !adminInfo?.user?.name) {
      history.push("/");
    } else {
      if (userRole === "Accountant") {
        dispatch(adminGetAllBanksFunc());
      }
    }
    if (
      userRole === "Internal Auditor" ||
      userRole === "CEO" ||
      userRole === "HR" ||
      userRole === "Employee"
    ) {
      history.push("/dashboard");
    }

    if (createBankSuccess && !createBankError && !createBankLoading) {
      dispatch({ type: ACCOUNTANT_CREATE_BANK_RESET });
      setFormData({
        name: "",
        accountNumber: "",
        bankAddress: "",
        bankEmailAddress: "",
        bankPhoneNo: "",
      });
    }
  }, [
    adminInfo,
    dispatch,
    userRole,
    history,
    createBankError,
    createBankLoading,
    createBankSuccess,
  ]);

  const bnklst = "active";

  return (
    <>
      {(loadingAllBanks || createBankLoading || updateBankLoading) && (
        <LoadingSpinner toggle={toggle} />
        )}
      <Successful
        isOpen7={
          isOpen7 ||
          (updateBankSuccess && !updateBankLoading && !updateBankError)
        }
        popup7={popup7}
        setIsOpen7={setIsOpen7}
        message="Bank List Updated Successfully!"
      />
      <DashboardContainer>
        <DashboardContent>
          <SideNav
            userRole={userRole}
            bnklst={bnklst}
            toggle={toggle}
            toggleMenu={toggleMenu}
            mobileToggle={mobileToggle}
            toggleMobileMenu={toggleMobileMenu}
          />
          <Mainbody toggle={toggle}>
            <Header
              text="Bank"
              userRole={userRole}
              userRoleName={userRoleName}
              profileimg={profileImg}
              toggle={toggle}
              toggleMenu={toggleMenu}
              mobileToggle={mobileToggle}
              toggleMobileMenu={toggleMobileMenu}
            />
            <Container>
              {/* <h1>Departments </h1> */}
              {createBankError && <ErrorBox errorMessage={createBankError} />}
              <div className="container__content">
                <div className="form__content">
                  <form onSubmit={onSave}>
                    <div className="label__group">
                      <label>Bank Name</label>
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
                        placeholder="Enter Bank Name"
                      ></input>
                    </div>
                    <div className="label__group">
                      <label>Account No</label>
                      <input
                        type="tel"
                        title="Please use a 10 digit number with no dashes or dots"
                        pattern="[0-9]{10}"
                        name="accountNumber"
                        value={accountNumber}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            [e.target.name]: e.target.value,
                          })
                        }
                        placeholder="Enter Acountant Number"
                      />
                    </div>
                    <div className="label__group">
                      <label>Branch Address</label>
                      <textarea
                        rows="2"
                        cols="50"
                        name="bankAddress"
                        value={bankAddress}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            [e.target.name]: e.target.value,
                          })
                        }
                        placeholder="Enter Bank Adddress"
                      ></textarea>
                    </div>
                    <div className="label__group">
                      <label>Bank Email</label>
                      <input
                        type="email"
                        name="bankEmailAddress"
                        value={bankEmailAddress}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            [e.target.name]: e.target.value,
                          })
                        }
                        placeholder="Enter Bank email"
                      />
                    </div>
                    <div className="label__group">
                      <label className="margin__top">Tel. No</label>
                      <input
                        type="text"
                        name="bankPhoneNo"
                        value={bankPhoneNo}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            [e.target.name]: e.target.value,
                          })
                        }
                        placeholder="Enter Bank Phone No"
                      />
                    </div>
                    <div className="form__button">
                      <input
                        className={
                          !name ||
                          !accountNumber ||
                          !bankPhoneNo ||
                          !bankEmailAddress ||
                          !bankAddress
                            ? "disabled__btn"
                            : "save__btn"
                        }
                        type="submit"
                        disabled={
                          !name ||
                          !accountNumber ||
                          !bankPhoneNo ||
                          !bankEmailAddress ||
                          !bankAddress
                        }
                        value={formData?.id ? "Edit" : "Save"}
                      />
                      <input
                        className="cancel__btn margin__left"
                        type="button"
                        onClick={onClear}
                        value="Cancel"
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
                          <th>Bank</th>
                          <th>Account No</th>
                          <th>Bank Address</th>
                          <th>Email</th>
                          <th>Tel. No</th>
                          <th>Action</th>
                        </tr>
                      </thead>
                      <tbody>
                        {banks?.map((el, indexes) => (
                          <tr key={el?.id}>
                            <td>{++indexes}</td>
                            <td>{el?.name?.toUpperCase()}</td>
                            <td>{el?.accountNumber}</td>
                            <td>{trancateWord(el?.bankAddress)}</td>
                            <td>{trancateWord(el?.bankEmailAddress)}</td>
                            <td>{el?.bankPhoneNo}</td>
                            <td>
                              <div className="action__icons">
                                <div
                                  className="icons"
                                  onClick={(e) => onSelect(el?.id)}
                                >
                                  {" "}
                                  <FontAwesomeIcon
                                    icon={["fas", "edit"]}
                                  />{" "}
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
          </Mainbody>
        </DashboardContent>
      </DashboardContainer>
    </>
  );
};

export default Bank;

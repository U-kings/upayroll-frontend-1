import React, { useState, useEffect } from "react";
import { DropdownList, ErrorBox, Header, SideNav } from "../../components";
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
  getAllBankNamesFunc,
} from "../../actions/banklist";
import {
  ACCOUNTANT_CREATE_BANK_RESET,
  ACCOUNTANT_UPDATE_BANK_BY_ID_RESET,
} from "../../types/banklist";
import { trancateWord } from "../../hooks/functions";
import { verifyAccountNumberFunc } from "../../actions/auth";
import { VERIFY_ACCOUNT_NUMBER_RESET } from "../../types/auth";

const Bank = ({ toggle, toggleMenu, mobileToggle, toggleMobileMenu }) => {
  // dispatch init
  const dispatch = useDispatch();

  // history init
  const history = useHistory();

  // redux state
  const { adminInfo } = useSelector((state) => state.adminLoginStatus);
  const { bankNames } = useSelector((state) => state.adminGetAllBankNames);
  const {
    accountName: employeeAccountName,
    error: verifyAccountError,
    isLoading: verifyAccountLoading,
  } = useSelector((state) => state.verifyAccountNumber);
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
    accountName: "",
    bankAddress: "",
    bankEmailAddress: "",
    bankPhoneNo: "",
  });

  const {
    name,
    accountNumber,
    accountName,
    bankAddress,
    bankEmailAddress,
    bankPhoneNo,
  } = formData;

  //func state
  const [isOpen5, setIsOpen5] = useState(false);
  const [isOpen7, setIsOpen7] = useState(false);
  const [selectedOption5, setSelectedOption5] = useState(null);
  const [bankCode, setBankCode] = useState(null);
  const [userRole] = useState(adminInfo?.user?.role || "");
  const [userRoleName] = useState(adminInfo?.user?.name || "");
  const [profileImg] = useState(adminInfo?.user?.photo || "");

  //   toggle func for modals
  const toggling5 = () => setIsOpen5(!isOpen5);

  //   bank name
  const onOptionClicked5 = (bankname) => () => {
    setSelectedOption5(bankname);
    setBankCode(bankname?.code);
    setIsOpen5(false);
  };

  const removeExtraSpace = (str) => {
    if (str) {
      return str.trim().split(/ +/).join(" ");
    }
  };

  useEffect(() => {
    if (selectedOption5) {
      setFormData({
        // name: removeExtraSpace(name),
        name: selectedOption5?.name,
        accountNumber: removeExtraSpace(accountNumber),
        accountName: removeExtraSpace(accountName),
        bankAddress: bankAddress,
        bankEmailAddress: removeExtraSpace(bankEmailAddress),
        bankPhoneNo: removeExtraSpace(bankPhoneNo),
      });
    }

    // return () => {
    //   second
    // }
  }, [
    selectedOption5,
    accountNumber,
    accountName,
    bankAddress,
    bankEmailAddress,
    bankPhoneNo,
  ]);

  const onSave = (e) => {
    e.preventDefault();

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
          accountName: removeExtraSpace(findBank?.accountName),
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
      accountName: "",
      bankPhoneNo: "",
    });
  };

  const popup7 = () => {
    if (updateBankSuccess && !updateBankLoading && !updateBankError) {
      dispatch({ type: ACCOUNTANT_UPDATE_BANK_BY_ID_RESET });
      setFormData({
        name: "",
        accountNumber: "",
        accountName: "",
        bankAddress: "",
        bankEmailAddress: "",
        bankPhoneNo: "",
      });
      // setBankId(null);
    }

    if (createBankSuccess && !createBankError && !createBankLoading) {
      dispatch({ type: ACCOUNTANT_CREATE_BANK_RESET });
      setFormData({
        name: "",
        accountNumber: "",
        accountName: "",
        bankAddress: "",
        bankEmailAddress: "",
        bankPhoneNo: "",
      });
    }
  };

  useEffect(() => {
    if (!adminInfo?.isAuthenticated && !adminInfo?.user?.name) {
      history.push("/signin");
    }
    if (userRole === "Accountant") {
      dispatch(adminGetAllBanksFunc());
      dispatch(getAllBankNamesFunc());
    }
    if (
      userRole === "Internal Auditor" ||
      userRole === "CEO" ||
      userRole === "HR" ||
      userRole === "Employee"
    ) {
      history.push("/dashboard");
    }
  }, [adminInfo, dispatch, userRole, history]);

  useEffect(() => {
    if (verifyAccountError) {
      setTimeout(() => {
        dispatch({ type: VERIFY_ACCOUNT_NUMBER_RESET });
      }, 5000);
    }
  }, [verifyAccountError, dispatch]);

  useEffect(() => {
    if (accountNumber?.length === 10 && bankCode) {
      dispatch(
        verifyAccountNumberFunc({
          accountNumber: accountNumber,
          bankCode: bankCode,
        })
      );
    }

    if (employeeAccountName) {
      setFormData({
        ...formData,
        accountName: employeeAccountName,
      });
    }
    // eslint-disable-next-line
  }, [dispatch, accountNumber, bankCode, employeeAccountName]);

  const bnklst = "active";

  return (
    <>
      {(loadingAllBanks ||
        createBankLoading ||
        updateBankLoading ||
        verifyAccountLoading) && <LoadingSpinner toggle={toggle} />}
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
              {verifyAccountError && (
                <ErrorBox errorMessage={verifyAccountError?.message} />
              )}
              <div className="container__content">
                <div className="form__content">
                  <form onSubmit={onSave}>
                    <div className="label__group">
                      {/* bankNames */}
                      <label>Bank Name</label>
                      <DropdownList
                        list={true}
                        isOpen={isOpen5}
                        toggling={toggling5}
                        selectedOption={selectedOption5 || name}
                        text="-- Select a Bank Name"
                        dataSet={bankNames}
                        // dataSet={banks}
                        onOptionClicked={onOptionClicked5}
                        maxHeight="20rem"
                      />
                      <span className="error">
                        {!selectedOption5 ? "*bank name is required" : ""}
                      </span>
                      {/* <label>Bank Name</label>
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
                      ></input> */}
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
                      <label>Account Name</label>
                      <input
                        type="text"
                        name="accountName"
                        value={accountName}
                        placeholder="Account Name"
                        disabled
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            [e.target.name]: e.target.value,
                          })
                        }
                      ></input>
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
                          // !name ||
                          !selectedOption5 ||
                          !accountNumber ||
                          !bankPhoneNo ||
                          !accountName ||
                          !bankEmailAddress ||
                          !bankAddress
                            ? "disabled__btn"
                            : "save__btn"
                        }
                        type="submit"
                        disabled={
                          // !name ||
                          !selectedOption5 ||
                          !accountNumber ||
                          !accountName ||
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
                            <td>{trancateWord(el?.bankAddress?.toString())}</td>
                            <td>
                              {trancateWord(el?.bankEmailAddress?.toString())}
                            </td>
                            <td>{el?.bankPhoneNo}</td>
                            <td>
                              <div className="action__icons">
                                <div
                                  className="icons"
                                  onClick={(e) => onSelect(el?.id)}
                                >
                                  
                                  <FontAwesomeIcon
                                    icon={["fas", "edit"]}
                                  />
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

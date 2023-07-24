import React, { useState, useEffect, useRef } from "react";
import * as XLSL from "xlsx";
import { DropdownList, ErrorBox, Header, SideNav } from "../../components";
import {
  DashboardContainer,
  DashboardContent,
  Mainbody,
  Container,
} from "../../styles/library";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { getAllDepartment } from "../../actions/department";
import {
  adminGetAllPosition,
  adminCreatePosition,
  adminUpdatePositionById,
  adminCreateBulkPosition,
} from "../../actions/position";
import { Comfirm, LoadingSpinner, Successful } from "../../modals";
import {
  ADMIN_CREATE_BULK_POSITION_RESET,
  ADMIN_CREATE_POSITION_RESET,
  ADMIN_GET_ALL_POSITION_RESET,
  ADMIN_UPDATE_POSITION_BY_ID_RESET,
} from "../../types/position";
import { logoutAdmin } from "../../actions/auth";
import { downloadPositionTemplateExcelFileFunc } from "../../actions/download";
import { DOWNLOADING_ON_PROCESS_ERROR } from "../../types/download";
import { COLORS } from "../../values/colors";
import { PaginationContainer } from "../../styles/pagination";
import ReactPaginate from "react-paginate";

const Position = ({ toggle, toggleMenu, mobileToggle, toggleMobileMenu }) => {
  // hsitory init
  const history = useHistory();
  // dispatch init
  const dispatch = useDispatch();
  // redux state
  const { departments, isLoading: loadingDepartments } = useSelector(
    (state) => state.departmentsReducer
  );
  const {
    positions,
    isLoading: loadingPositions,
    error: getPositionsError,
  } = useSelector((state) => state.adminGetAllPosition);
  const {
    success: createPositionSuccess,
    isLoading: createPositionLoading,
    error: createPositionError,
  } = useSelector((state) => state.adminCreatePosition);
  const {
    success: updatePositionSuccess,
    isLoading: updatePositionLoading,
    error: updatePositionError,
  } = useSelector((state) => state.adminUpdatePosition);
  const { adminInfo } = useSelector((state) => state.adminLoginStatus);

  const { isLoading: downloadLoading, error: downloadError } = useSelector(
    (state) => state.downloadStatus
  );

  const {
    isLoading: createBulkLoading,
    success: createBulkSuccess,
    error: createBulkError,
  } = useSelector((state) => state.adminCreateBulkPosition);

  const psn = "active";

  // func state
  const [isOpen4, setIsOpen4] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [isOpen7, setIsOpen7] = useState(false);
  const [pageNumber, setPageNumber] = useState(0);
  const [usersPerpageCount, setUsersPerpageCount] = useState(0);
  const [selectedOption, setSelectedOption] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
  });
  const [fileName, setFileName] = useState(null);
  const [file, setFile] = useState(null);
  const [excelData, setExcelData] = useState(null);
  const [showError, setShowError] = useState(null);
  const [positionId, setPositionId] = useState(null);
  const [userRole] = useState(adminInfo?.user?.role || "");
  const [userRoleName] = useState(adminInfo?.user?.name || "");
  const [profileImg] = useState(adminInfo?.user?.photo || "");

  const hiddenFileInput = useRef(null);

  const onOptionClicked = (department) => () => {
    setSelectedOption(department);
    setIsOpen(false);
  };

  const onSelect = (id) => {
    let findPos;
    if (positions?.length > 0) {
      findPos = positions.find((el) => String(el?.id) === String(id));
      if (findPos) {
        setSelectedOption(findPos?.department);
        setFormData({ name: findPos?.name, id: findPos?.id });
      }
    }
  };

  const onCancel = () => {
    setFormData({ name: "" });
    setSelectedOption(null);
  };

  const popup4 = (id) => {
    if (id) {
      setPositionId(id);
    }
    setIsOpen4(!isOpen4);
  };

  const popup7 = () => {
    if (createPositionSuccess && !createPositionError) {
      dispatch({ type: ADMIN_CREATE_POSITION_RESET });
      setPositionId(null);
      setIsOpen(null);
      setSelectedOption(null);
      setFormData({ name: "" });
    }
    if (updatePositionSuccess && !updatePositionError) {
      dispatch({ type: ADMIN_UPDATE_POSITION_BY_ID_RESET });
      setPositionId(null);
      setIsOpen(null);
      setSelectedOption(null);
      setFormData({ name: "" });
    }

    if (createBulkSuccess && !createBulkError) {
      dispatch({ type: ADMIN_CREATE_BULK_POSITION_RESET });
      setExcelData(null);
      setFileName(null);
    }

    setIsOpen7(false);
  };

  const onSave = (e) => {
    e.preventDefault();
    if (formData?.id) {
      dispatch(
        adminUpdatePositionById(formData?.id, selectedOption?.id, {
          name: formData.name,
        })
      );
    } else {
      dispatch(
        adminCreatePosition(selectedOption?.id, { name: formData.name })
      );
    }
  };

  const downloadTemplate = () => {
    dispatch(downloadPositionTemplateExcelFileFunc());
  };

  const handleFile = () => (e) => {
    let selectedFile = e.target.files[0];
    const fileType = ["application/vnd.ms-excel"];
    const fileType2 = [
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
    ];
    const filyType3 = ["text/csv"];

    if (selectedFile) {
      setFileName(selectedFile?.name);
      if (
        selectedFile &&
        (fileType.includes(selectedFile?.type) ||
          fileType2.includes(selectedFile?.type) ||
          filyType3.includes(selectedFile?.type))
      ) {
        setFile(e.target.files[0]);
        // let reader = new FileReader();
        // reader.readAsArrayBuffer(selectedFile);
        // reader.onload = (e) => {
        //   const workbook = XLSL.read(e.target?.result, { type: "buffer" });
        //   const worksheetName = workbook.SheetNames[0];
        //   const worksheet = workbook.Sheets[worksheetName];
        //   const convertedData = XLSL.utils.sheet_to_json(worksheet);
        //   setExcelData(convertedData);
        // };
      } else {
        setShowError("Please select only specified file type");
      }
    }
  };

  // Invoke when user click to request another page.
  const usersPerpage = 100;
  const pagesVisited = pageNumber * usersPerpage;
  const pageCount = Math.ceil(Number(positions?.length) / usersPerpage);

  const handleClick = (name) => () => {
    hiddenFileInput.current?.click();
  };

  const uploadFile = async () => {
    // let newData = await excelData?.map((data) => {
    //   return {
    //     department: data?.Department?.toString()?.trim(),
    //     name: data?.Name?.toString()?.trim(),
    //   };
    // });

    // if (newData) {
    //   dispatch(adminCreateBulkPosition(newData));
    // }

    const formData = new FormData();
    formData.append("file", file);
    dispatch(adminCreateBulkPosition(formData));
  };

  // useEffects
  useEffect(() => {
    if (!adminInfo?.isAuthenticated && !adminInfo?.user?.name) {
      history.push("/signin");
    } else {
      dispatch(getAllDepartment());
      if (pageNumber >= 0) {
        dispatch(adminGetAllPosition(pageNumber ? pageNumber + 1 : 1, 100));
      }
    }
    if (
      userRole === "Internal Auditor" ||
      userRole === "CEO" ||
      userRole === "Accountant"
    ) {
      history.push("dashboard");
    } else if (userRole === "Employee") {
      history.push("dashboard");
    }
    if (createPositionSuccess || createBulkSuccess) {
      setFormData({ name: "" });
      setIsOpen(false);
      setSelectedOption(null);
    }
  }, [
    dispatch,
    adminInfo,
    userRole,
    history,
    pageNumber,
    createPositionSuccess,
    createBulkSuccess,
  ]);

  useEffect(() => {
    if (showError || downloadError || createPositionError || createBulkError) {
      setTimeout(() => {
        dispatch({ type: DOWNLOADING_ON_PROCESS_ERROR });
        dispatch({ type: ADMIN_CREATE_POSITION_RESET });
        dispatch({ type: ADMIN_CREATE_BULK_POSITION_RESET });
        setShowError(null);
      }, 5000);
    }
  }, [
    dispatch,
    showError,
    createPositionError,
    downloadError,
    createBulkError,
  ]);

  useEffect(() => {
    if (getPositionsError === "no token was passed") {
      dispatch(logoutAdmin("no token was passed"));
      dispatch({ type: ADMIN_GET_ALL_POSITION_RESET });
    }
  }, [dispatch, getPositionsError]);

  useEffect(() => {
    if (pageNumber > 0) {
      let usersPerpageNum;
      if (positions?.length / (pageNumber + 1) > 100) {
        usersPerpageNum = (pageNumber + 1) * 100;
      } else {
        usersPerpageNum = positions?.length;
      }
      setUsersPerpageCount(usersPerpageNum);
    } else {
      if (positions?.length < 100) {
        setUsersPerpageCount(positions?.length);
      } else {
        setUsersPerpageCount(100);
      }
    }
  }, [positions, pageNumber]);

  const handlePageClick = ({ selected }) => {
    setPageNumber(selected);
  };

  //   toggle func for modals
  const toggling = () => setIsOpen(!isOpen);

  return (
    <>
      {(loadingDepartments ||
        loadingPositions ||
        updatePositionLoading ||
        createBulkLoading ||
        (downloadLoading && !downloadError)) && (
        <LoadingSpinner toggle={toggle} />
      )}

      <Successful
        isOpen7={
          isOpen7 ||
          (updatePositionSuccess && !updatePositionError) ||
          createPositionSuccess ||
          (!createBulkError && createBulkSuccess)
        }
        setIsOpen7={setIsOpen7}
        popup7={popup7}
        message={
          createBulkSuccess
            ? "Position uploaded successfully!"
            : createPositionSuccess
            ? "Position Created successfully!"
            : "Position updated successfully!"
        }
      />

      {positionId && (
        <Comfirm
          toggle={toggle}
          isOpen4={isOpen4}
          popup4={popup4}
          setIsOpen4={setIsOpen4}
          postId={positionId}
          setPositionId={setPositionId}
        />
      )}
      <DashboardContainer>
        <DashboardContent>
          <SideNav
            userRole={userRole}
            psn={psn}
            toggle={toggle}
            toggleMenu={toggleMenu}
            mobileToggle={mobileToggle}
            toggleMobileMenu={toggleMobileMenu}
          />
          <Mainbody toggle={toggle}>
            <Header
              text="Positions"
              userRole={userRole}
              userRoleName={userRoleName}
              profileimg={profileImg}
              toggle={toggle}
              toggleMenu={toggleMenu}
              mobileToggle={mobileToggle}
              toggleMobileMenu={toggleMobileMenu}
            />
            <Container>
              <div className="container__content">
                <div
                  className="form__content"
                  onClick={(e) => {
                    if (isOpen) {
                      setIsOpen(false);
                    }
                  }}
                >
                  {((!downloadLoading && downloadError) ||
                    createPositionError ||
                    createBulkError) && (
                    <ErrorBox
                      errorMessage={
                        downloadError || createPositionError || createBulkError
                      }
                    />
                  )}
                  <form className="global__form" onSubmit={onSave}>
                    <div className="label__group">
                      <label>Departments</label>
                      <DropdownList
                        list={true}
                        isOpen={isOpen}
                        toggling={toggling}
                        selectedOption={selectedOption}
                        text="-- Select a Department"
                        dataSet={departments}
                        onOptionClicked={onOptionClicked}
                      />
                    </div>
                    <div className="label__group">
                      <label>Name</label>
                      <textarea
                        name="name"
                        value={formData.name}
                        rows="4"
                        cols="50"
                        placeholder="Position name"
                        onChange={(e) =>
                          setFormData({ ...formData, name: e.target.value })
                        }
                      ></textarea>
                    </div>
                    <div className="form__button">
                      <input
                        className={
                          !formData.name ||
                          !selectedOption ||
                          createPositionLoading ||
                          updatePositionLoading
                            ? "disabled__btn"
                            : "save__btn"
                        }
                        type="submit"
                        disabled={
                          !formData.name ||
                          !selectedOption ||
                          createPositionLoading ||
                          updatePositionLoading
                        }
                        value={formData?.id ? "Edit" : "Save"}
                      />
                      <input
                        className="cancel__btn margin__left"
                        type="button"
                        value="Cancel"
                        onClick={onCancel}
                      />
                    </div>
                    <div className="upload__content">
                      <h2> download Template</h2>
                      <div className="upload_empfile">
                        <p className="choose__btn" onClick={handleClick()}>
                          Choose a file
                        </p>
                        <p>{fileName}</p>
                      </div>
                      <input
                        type="file"
                        ref={hiddenFileInput}
                        onChange={handleFile("juniorStaffGrade")}
                        accept=".xls,.xlsx,.csv"
                        style={{ display: "none" }}
                      />
                      <div className="form__button">
                        <input
                          type="button"
                          className="general__btn save__btn"
                          value="Upload"
                          onClick={() => uploadFile()}
                        />
                      </div>
                      <div className="form__button">
                        <input
                          type="button"
                          className="general__btn save__btn"
                          value="Download"
                          onClick={() => downloadTemplate()}
                        />
                      </div>
                    </div>
                  </form>
                </div>
                <div className="table__body">
                  <div className="table__overflow full__height2">
                    <table>
                      <thead>
                        <tr>
                          <th>#</th>
                          <th>Department</th>
                          <th>Position</th>
                          <th>Action</th>
                        </tr>
                      </thead>
                      <tbody>
                        {positions?.map((position, indexes) => (
                          <tr key={position?.id}>
                            <td>{++indexes}</td>
                            <td>{position?.department?.name}</td>
                            <td>{position?.name}</td>
                            <td>
                              <div className="action__icons">
                                <div
                                  title="Edit"
                                  className="icons"
                                  onClick={(e) => onSelect(position?.id)}
                                >
                                  {" "}
                                  <FontAwesomeIcon
                                    icon={["fas", "edit"]}
                                  />{" "}
                                </div>
                                {/* <div
                                  title="Delete"
                                  className="icons"
                                  onClick={(e) => popup4(position?.id)}
                                >
                                  {" "}
                                  <FontAwesomeIcon
                                    icon={["fas", "trash-alt"]}
                                  />{" "}
                                </div> */}
                              </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>

                  <PaginationContainer>
                    <div className="row">
                      <ReactPaginate
                        previousLabel={
                          <FontAwesomeIcon icon={["fas", "angle-left"]} />
                        }
                        pageCount={pageCount}
                        onPageChange={handlePageClick}
                        containerClassName={"pagination"}
                        pageClassName={"page__item"}
                        pageLinkClassName={"page__link"}
                        previousClassName={"page__item"}
                        previousLinkClassName={"page__link"}
                        nextClassName={"page__item"}
                        nextLinkClassName={"page__link"}
                        breakClassName={"page__item"}
                        breakLinkClassName={"page__link"}
                        // activeClassName={"active"}
                        activeLinkClassName={"active"}
                        marginPagesDisplayed={3}
                        breakLabel={"..."}
                        nextLabel={
                          <FontAwesomeIcon icon={["fas", "angle-right"]} />
                        }
                      />
                      <div
                        style={{
                          backgroundColor: `${COLORS.white4}`,
                          margin: "auto 1rem auto 2rem",
                          padding: ".5rem",
                        }}
                        className="pageCount"
                      >
                        <p style={{ fontSize: "1.3rem", fontWeight: "500" }}>
                          Rows per page : 100
                        </p>
                      </div>
                      <div
                        style={{
                          backgroundColor: `${COLORS.white4}`,
                          margin: "auto 0 auto 0",
                          padding: ".5rem",
                        }}
                        className="pageCount"
                      >
                        <p style={{ fontSize: "1.3rem", fontWeight: "500" }}>
                          {`Showing : ${
                            // searchResult?.length < 1
                            positions?.length < 1
                              ? 0
                              : `${
                                  pageNumber > 0 ? pageNumber * 100 + 1 : 1
                                } - ${usersPerpageCount}`
                          }
                    of ${positions?.length}`}
                          {/* of ${vouchers?.resultLength}`} */}
                        </p>
                      </div>
                    </div>
                  </PaginationContainer>
                </div>
              </div>
            </Container>
          </Mainbody>
        </DashboardContent>
      </DashboardContainer>
    </>
  );
};

export default Position;

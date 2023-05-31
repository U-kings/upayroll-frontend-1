// import React, { useState, useEffect } from "react";
// import { SideNav, Header } from "../../components";
// import {
//   DashboardContainer,
//   DashboardContent,
//   Mainbody,
//   Container,
// } from "../../styles/library";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { useDispatch, useSelector } from "react-redux";
// import { useHistory } from "react-router-dom";
// import { Comfirm, LoadingSpinner, Successful } from "../../modals";
// import {
//   adminCreateStaffLevel,
//   adminGetAllStaffLevels,
//   adminUpdateStaffLevel,
// } from "../../actions/stafflevel";
// import {
//   ADMIN_CREATE_STAFFLEVEL_RESET,
//   ADMIN_GET_ALL_STAFFLEVEL_RESET,
//   ADMIN_UPDATE_STAFFLEVEL_RESET,
// } from "../../types/stafflevel";
// import { logoutAdmin } from "../../actions/auth";

// const StaffLevel = () => {
//   // hsitory init
//   const history = useHistory();
//   // dispatch init
//   const dispatch = useDispatch();
//   // redux state
//   const {
//     isLoading: loadingStafflevel,
//     staffLevels,
//     error: getStaffLevelError,
//   } = useSelector((state) => state.adminGetAllStafflevel);
//   const {
//     success: createStaffLevelSuccess,
//     isLoading: createStaffLevelLoading,
//   } = useSelector((state) => state.adminCreateStafflevel);

//   const {
//     isLoading: updateStaffLevelLoading,
//     success: updateStaffLevelSuccess,
//     error: updateStaffLevelError,
//   } = useSelector((state) => state.adminUpdateStafflevel);

//   const { isLoading: deleteStaffLevelLoading } = useSelector(
//     (state) => state.adminDeleteStafflevel
//   );
//   const { adminInfo } = useSelector((state) => state.adminLoginStatus);

//   const sfl = "active";

//   // func state
//   const [isOpen4, setIsOpen4] = useState(false);
//   const [isOpen7, setIsOpen7] = useState(false);
//   const [formData, setFormData] = useState({
//     name: "",
//     salary: 0,
//   });
//   const { name, salary } = formData;
//   const [staffLevelId, setStaffLevelId] = useState(null);
//   const [userRole] = useState(adminInfo?.user?.role || "");

//   const onSelect = (id) => {
//     let findPos;
//     if (staffLevels?.length > 0) {
//       findPos = staffLevels.find((el) => String(el?.id) === String(id));
//       if (findPos) {
//         setFormData({
//           name: findPos?.name,
//           salary: findPos?.salary,
//           id: findPos?.id,
//         });
//       }
//     }
//   };

//   const onCancel = () => {
//     setFormData({ name: "", salary: 0 });
//   };

//   const popup4 = (id) => {
//     if (id) {
//       setStaffLevelId(id);
//     }
//     setIsOpen4(!isOpen4);
//   };

//   const popup7 = () => {
//     if (updateStaffLevelSuccess && !updateStaffLevelError) {
//       dispatch({ type: ADMIN_UPDATE_STAFFLEVEL_RESET });
//       setFormData({ name: "", salary: 0 });
//     }
//     setIsOpen7(false);
//   };

//   const onSave = (e) => {
//     e.preventDefault();
//     if (formData?.id) {
//       dispatch(adminUpdateStaffLevel({ name, salary }, formData?.id));
//     } else {
//       dispatch(adminCreateStaffLevel({ name, salary }));
//     }
//   };

//   // useEffects
//   useEffect(() => {
//     if (!adminInfo?.isAuthenticated && !adminInfo?.user?.name) {
//       history.push("/");
//     } else {
//       dispatch(adminGetAllStaffLevels());
//     }
//     if (
//       userRole === "Internal Auditor" ||
//       userRole === "CEO" ||
//       userRole === "Accountant"
//     ) {
//     }
//     if (createStaffLevelSuccess) {
//       dispatch({ type: ADMIN_CREATE_STAFFLEVEL_RESET });
//       setFormData({ name: "", salary: 0 });
//     }
//   }, [dispatch, adminInfo, userRole, history, createStaffLevelSuccess]);

//   useEffect(() => {
//     if (getStaffLevelError === "no token was passed") {
//       dispatch(logoutAdmin("no token was passed"));
//       dispatch({ type: ADMIN_GET_ALL_STAFFLEVEL_RESET });
//     }
//   }, [dispatch, getStaffLevelError]);

//   return (
//     <>
//       {loadingStafflevel && <LoadingSpinner toggle={toggle} />}
//       {loadingStafflevel && <LoadingSpinner toggle={toggle} />}
//       {staffLevelId && (
//         <Comfirm toggle={toggle}
//           isOpen4={isOpen4}
//           popup4={popup4}
//           setIsOpen4={setIsOpen4}
//           staffLevelId={staffLevelId}
//           setStaffLevelId={setStaffLevelId}
//         />
//       )}
//       <Successful
//         isOpen7={isOpen7 && updateStaffLevelSuccess && !updateStaffLevelError}
//         setIsOpen7={setIsOpen7}
//         popup7={popup7}
//         message="staffLevel updated successfully!"
//       />
//       <DashboardContainer>
//         <DashboardContent>
//           <SideNav userRole={userRole} sfl={sfl} />
//           <Mainbody>
//             <Header text="Salary Structure" userRole={userRole} />
//             <Container>
//               {/* <h1>Salary Structure</h1> */}
//               <div className="container__content">
//                 <div className="form__content">
//                   <form className="global__form" onSubmit={onSave}>
//                     <div className="label__group">
//                       <label>Name</label>
//                       <input
//                         type="text"
//                         name="name"
//                         value={name}
//                         onChange={(e) =>
//                           setFormData({
//                             ...formData,
//                             [e.target.name]: e.target.value,
//                           })
//                         }
//                         placeholder="Enter Staff Level"
//                       />
//                     </div>
//                     <div className="label__group">
//                       <label>Salary</label>
//                       <input
//                         type="number"
//                         name="salary"
//                         value={salary}
//                         onChange={(e) =>
//                           setFormData({
//                             ...formData,
//                             [e.target.name]: e.target.valueAsNumber,
//                           })
//                         }
//                         placeholder="Salary"
//                       />
//                     </div>
//                     <div className="form__button">
//                       <input
//                         className={
//                           !formData.name ||
//                           !formData.salary ||
//                           deleteStaffLevelLoading ||
//                           updateStaffLevelLoading ||
//                           createStaffLevelLoading
//                             ? "disabled__btn"
//                             : "save__btn"
//                         }
//                         type="submit"
//                         disabled={
//                           !formData.name ||
//                           !formData.salary ||
//                           deleteStaffLevelLoading ||
//                           updateStaffLevelLoading ||
//                           createStaffLevelLoading
//                         }
//                         value={formData?.id ? "Edit" : "Save"}
//                       />
//                       <input
//                         className="cancel__btn margin__left"
//                         type="button"
//                         value="Cancel"
//                         disabled={
//                           deleteStaffLevelLoading ||
//                           updateStaffLevelLoading ||
//                           createStaffLevelLoading
//                         }
//                         onClick={onCancel}
//                       />
//                     </div>
//                   </form>
//                 </div>
//                 <div className="table__body">
//                   <div className="table__overflow">
//                     <table>
//                       <thead>
//                         <tr>
//                           <th>#</th>
//                           <th>Staff Level</th>
//                           <th>Salary</th>
//                           <th>Action</th>
//                         </tr>
//                       </thead>
//                       <tbody>
//                         {staffLevels?.map((staffLevel, indexes) => (
//                           <tr key={staffLevel?.id}>
//                             <td>{++indexes}</td>
//                             <td>{staffLevel?.name}</td>
//                             <td>{staffLevel?.salary}</td>
//                             <td>
//                               <div className="action__icons">
//                                 <div
//                                   className="icons"
//                                   onClick={(e) => onSelect(staffLevel?.id)}
//                                 >
//                                   {" "}
//                                   <FontAwesomeIcon
//                                     icon={["fas", "edit"]}
//                                   />{" "}
//                                 </div>
//                                 <div
//                                   className="icons"
//                                   onClick={(e) => popup4(staffLevel?.id)}
//                                 >
//                                   {" "}
//                                   <FontAwesomeIcon
//                                     icon={["fas", "trash-alt"]}
//                                   />{" "}
//                                 </div>
//                               </div>
//                             </td>
//                           </tr>
//                         ))}
//                       </tbody>
//                     </table>
//                   </div>
//                 </div>
//               </div>
//             </Container>
//           </Mainbody>
//         </DashboardContent>
//       </DashboardContainer>
//     </>
//   );
// };

// export default StaffLevel;

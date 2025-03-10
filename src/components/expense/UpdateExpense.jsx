// import React, { useState, useEffect } from "react";
// import {
//   RiAddLargeFill,
//   RiCalendar2Line,
//   RiMoneyRupeeCircleLine,
//   RiQuestionLine,
//   RiStickyNoteLine,
//   RiTimeLine,
// } from "@remixicon/react";
// import { toast, ToastContainer } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";
// import dayjs from "dayjs";
// import { getExpenseById, updateExpense } from "../../api/expenseApi";
// import utc from "dayjs/plugin/utc";
// dayjs.extend(utc);
// const token = localStorage.getItem("token");

// const UpdateExpense = async ({ onExpenseUpdated, id }) => {
//   const [showModal, setShowModal] = useState(false);

//   let initialData;
//   try {
//     const { data } = await getExpenseById(id, token);
//     if (data?.status) {
//       initialData = data.data;
//     }
//   } catch (error) {
//     console.error("Error fetching expense:", error);
//   }

//   const [formData, setFormData] = useState({
//     time: dayjs.utc(initialData.dateTime).local().format("hh:mm"),
//     date: dayjs.utc(initialData.dateTime).local().format("YYYY-MM-DD"),
//     amount: initialData.amount,
//     categoryId: initialData.categoryId,
//     description: initialData.description,
//   });

//   const handleChange = (e) => {
//     setFormData({
//       ...formData,
//       [e.target.name]: e.target.value,
//     });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     const token = localStorage.getItem("token");

//     try {
//       const { data } = await updateExpense({ expenseData: formData, token });

//       if (data?.status) {
//         toast.success("Expense Updated Successfully!");
//         setFormData({
//           time: "",
//           date: "",
//           amount: "",
//           categoryId: "",
//           description: "",
//         });
//         onExpenseUpdated();
//         setShowModal(false);
//       } else {
//         toast.error(data?.message || "Error Adding Expense.");
//       }
//     } catch (error) {
//       toast.error(error?.response?.data?.message || "Something went wrong.");
//     }
//   };

//   const today = dayjs().format("YYYY-MM-DD");

//   return (
//     <>
//       {showModal && (
//         <>
//           <div
//             className="modal-backdrop fade show"
//             onClick={() => setShowModal(false)}
//           ></div>

//           <div
//             className="modal fade show animate__animated animate__fadeIn animate__fastUp animate__faster"
//             id="addModel"
//             tabIndex="-1"
//             aria-labelledby="addModelLabel"
//             aria-hidden={!showModal}
//             style={{ display: "block" }}
//           >
//             <div className="modal-dialog modal-fullscreen-lg-down">
//               <div className="modal-content">
//                 <div className="modal-header">
//                   <h5 className="modal-title" id="addModelLabel">
//                     Edit Expense
//                   </h5>
//                   <button
//                     type="button"
//                     className="btn-close"
//                     onClick={() => setShowModal(false)}
//                     aria-label="Close"
//                   ></button>
//                 </div>
//                 <div className="modal-body">
//                   <form id="expenseForm" onSubmit={handleSubmit}>
//                     <div className="input-group flex-nowrap mb-2">
//                       <span className="input-group-text">
//                         <RiTimeLine />
//                       </span>
//                       <input
//                         type="time"
//                         name="time"
//                         value={formData.time}
//                         onChange={handleChange}
//                         className="form-control"
//                         aria-label="time"
//                         required
//                       />
//                     </div>
//                     <div className="input-group flex-nowrap mb-2">
//                       <span className="input-group-text">
//                         <RiCalendar2Line />
//                       </span>
//                       <input
//                         type="date"
//                         name="date"
//                         value={formData.date}
//                         onChange={handleChange}
//                         className="form-control"
//                         aria-label="date"
//                         max={today}
//                         required
//                       />
//                     </div>
//                     <div className="input-group flex-nowrap mb-2">
//                       <span className="input-group-text">
//                         <RiMoneyRupeeCircleLine />
//                       </span>
//                       <input
//                         type="number"
//                         name="amount"
//                         value={formData.amount}
//                         onChange={handleChange}
//                         className="form-control"
//                         aria-label="amount"
//                         required
//                       />
//                     </div>
//                     <div className="input-group flex-nowrap mb-2">
//                       <span className="input-group-text">
//                         <RiQuestionLine />
//                       </span>
//                       <select
//                         name="categoryId"
//                         value={formData.categoryId}
//                         onChange={handleChange}
//                         className="form-control custom-select rounded-1"
//                         aria-label="categoryId"
//                         required
//                       >
//                         <option value="">Select category</option>
//                         <option value="1">Food</option>
//                         <option value="2">Transport</option>
//                         <option value="3">Entertainment</option>
//                         <option value="4">Personal</option>
//                         <option value="5">Misc</option>
//                       </select>
//                     </div>
//                     <div className="input-group flex-nowrap mb-4">
//                       <span className="input-group-text">
//                         <RiStickyNoteLine />
//                       </span>
//                       <textarea
//                         name="description"
//                         value={formData.description}
//                         onChange={handleChange}
//                         className="form-control"
//                         placeholder="Add a description"
//                         aria-label="description"
//                       >
//                         {formData.description}
//                       </textarea>
//                     </div>
//                     <div className="modal-footer">
//                       <button type="submit" className="btn btn-primary">
//                         Update Expense
//                       </button>
//                     </div>
//                   </form>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </>
//       )}
//     </>
//   );
// };

// export default UpdateExpense;

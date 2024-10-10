import React, { useState } from "react";
import { EmployeeBreadcrumb } from "../../../components/Breadcrumbs/Breadcrumb";
import { MOWrapper } from "../../../components/Wrapper";
import { addEmployee } from "../../../lib/repository/EmployeeRepository";
import { useNavigate } from "react-router-dom";

const AddEmployee: React.FC = () => {
  const inputField = {
    nama_karyawan: "",
    gaji_karyawan: "",
    bonus_gaji_karyawan: "",
  };

  const navigate = useNavigate();

  const [input, setInput] = useState(inputField);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    // e.preventDefault();
    await addEmployee(input);
    navigate("/mo/employee");
  };

  const handleEditConfirmation = () => {
    const modal = document.getElementById("edit_modal") as HTMLDialogElement;
    if (modal) {
      modal.showModal();

      // const confirmEditBtn = document.getElementById('confirm_edit') as HTMLButtonElement;
      // confirmEditBtn.addEventListener('click', () => {
      //   handleEdit(id);
      //   modal.close();
      // });

      const cancelEditBtn = document.getElementById(
        "cancel_edit"
      ) as HTMLButtonElement;
      cancelEditBtn.addEventListener("click", () => {
        modal.close();
      });
    }
  };

  const handleCancelClick = () => {
    navigate("/mo/employee");
  };

  return (
    <MOWrapper>
      <EmployeeBreadcrumb pageName="Add New Employee" />
      <div className="bg-white shadow-default p-6">
        <form
          className="flex flex-col gap-6"
          onSubmit={(e) => {
            e.preventDefault();
            handleEditConfirmation();
          }}
        >
          <div className="flex flex-wrap items-center justify-center gap-6">
            <label className="font-medium text-gray-800 w-full max-w-xs">
              Employee Name
            </label>
            <input
              type="text"
              placeholder="Enter Employee Name"
              className="input w-full max-w-md"
              name="nama_karyawan"
              onChange={handleChange}
              required
            />
          </div>

          <div className="flex flex-wrap items-center justify-center gap-6">
            <label className="font-medium text-gray-800 w-full max-w-xs">
              Salary
            </label>
            <input
              type="number"
              placeholder="Enter Salary"
              className="input w-full max-w-md"
              min="0"
              name="gaji_karyawan"
              onChange={handleChange}
              required
            />
          </div>

          <div className="flex flex-wrap items-center justify-center gap-6">
            <label className="font-medium text-gray-800 w-full max-w-xs">
              Bonus Salary
            </label>
            <input
              type="number"
              placeholder="Enter Bonus Salary"
              className="input w-full max-w-md"
              min="0"
              name="bonus_gaji_karyawan"
              onChange={handleChange}
              required
            />
          </div>

          <div className="flex justify-end gap-3 mt-10">
            <button className="btn btn-active" onClick={handleCancelClick}>
              Cancel
            </button>
            <button className="btn btn-primary" type="submit">
              Add Employee
            </button>
          </div>
        </form>
        <dialog id="edit_modal" className="modal" hidden>
          <div className="modal-box">
            <h3 className="font-bold text-lg">Confirmation</h3>
            <p className="py-4">Are you sure you want to add this employee?</p>
            <div className="flex justify-end">
              <form method="dialog" className="flex space-between gap-3">
                <button id="cancel_edit">Cancel</button>
                <button
                  id="confirm_edit"
                  className="btn btn-primary"
                  onClick={() => handleSubmit()}
                >
                  Add
                </button>
              </form>
            </div>
          </div>
        </dialog>
      </div>
    </MOWrapper>
  );
};

export default AddEmployee;

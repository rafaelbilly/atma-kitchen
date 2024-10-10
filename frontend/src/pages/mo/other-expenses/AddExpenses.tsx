import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { OtherExpensesBreadcrumb } from "../../../components/Breadcrumbs/Breadcrumb";
import { MOWrapper } from "../../../components/Wrapper";
import { addOtherExpenses } from "../../../lib/repository/OtherExpensesRepository";

const AddOtherExpenses: React.FC = () => {
  const inputField = {
    id_pengeluaran_lain_lain: "",
    nama_pengeluaran: "",
    tanggal_pengeluaran: "",
    total_pengeluaran: "",
  };

  const navigate = useNavigate();

  const [input, setInput] = useState(inputField);
  const [selectedDate, setSelectedDate] = useState<string>("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedDate(e.target.value);
  };

  const handleSubmit = async () => {
    const newExpense = {
      ...input,
      tanggal_pengeluaran: selectedDate,
    };
    await addOtherExpenses(newExpense);
    navigate("/mo/other-expenses");
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
    navigate("/mo/other-expenses");
  };

  return (
    <MOWrapper>
      <OtherExpensesBreadcrumb pageName="Add New Other Expenses" />
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
              Expense Name
            </label>
            <input
              type="text"
              placeholder="Enter Expense Name"
              className="input w-full max-w-md"
              name="nama_pengeluaran"
              onChange={handleChange}
              required
            />
          </div>

          <div className="flex flex-wrap items-center justify-center gap-6">
            <label className="font-medium text-gray-800 w-full max-w-xs">
              Select Date
            </label>
            <input
              type="date"
              className="input w-full max-w-md"
              name="tanggal_pengeluaran"
              value={selectedDate}
              onChange={handleDateChange}
              required
            />
          </div>

          <div className="flex flex-wrap items-center justify-center gap-6">
            <label className="font-medium text-gray-800 w-full max-w-xs">
              Total
            </label>
            <input
              type="number"
              placeholder="Enter Total Other Expense"
              className="input w-full max-w-md"
              name="total_pengeluaran"
              onChange={handleChange}
              min="0"
              required
            />
          </div>

          <div className="flex justify-end gap-3 mt-10">
            <button className="btn btn-active" onClick={handleCancelClick}>
              Cancel
            </button>
            <button className="btn btn-primary" type="submit">
              Add Other Expense
            </button>
          </div>
        </form>
        <dialog id="edit_modal" className="modal" hidden>
          <div className="modal-box">
            <h3 className="font-bold text-lg">Confirmation</h3>
            <p className="py-4">
              Are you sure you want to add this other expense?
            </p>
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

export default AddOtherExpenses;

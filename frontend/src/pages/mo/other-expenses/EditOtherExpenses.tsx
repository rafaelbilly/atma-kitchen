import React, { useState, useEffect } from "react";
import { OtherExpensesBreadcrumb } from "../../../components/Breadcrumbs/Breadcrumb";
import { MOWrapper } from "../../../components/Wrapper";
import { IOtherExpenses } from "../../../lib/interfaces/IOtherExpenses";
import { useParams } from "react-router-dom";

import { useNavigate } from "react-router-dom";
import {
  editOtherExpenses,
  getOtherExpensesById,
} from "../../../lib/repository/OtherExpensesRepository";

const EditOtherExpenses = () => {
  // API CALL
  const { id } = useParams<{ id: string }>();
  const { data, error, isLoading } = getOtherExpensesById(id!);
  console.log(data);
  const navigate = useNavigate();

  const [input, setInput] = useState<IOtherExpenses>({
    id_pengeluaran_lain_lain: "",
    tanggal_pengeluaran: "",
    nama_pengeluaran: "",
    total_pengeluaran: "",
  });

  useEffect(() => {
    if (data) {
      console.log(data);

      const dateParts = data.tanggal_pengeluaran.split(" ");
      const dateOnly = dateParts[0];
      const inputField: IOtherExpenses = {
        id_pengeluaran_lain_lain: data.id_pengeluaran_lain_lain ?? "",
        tanggal_pengeluaran: dateOnly,
        nama_pengeluaran: data.nama_pengeluaran ?? "",
        total_pengeluaran: data.total_pengeluaran ?? "",
      };
      setInput(inputField);
    }
  }, [data]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    await editOtherExpenses(input, data.id_pengeluaran_lain_lain);
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
      <OtherExpensesBreadcrumb pageName="Edit Other Expense" />
      {isLoading && (
        <div className="w-full mt-64 flex justify-center items-center">
          <span className="loading loading-dots loading-md"></span>
        </div>
      )}
      {error && <div>Error</div>}
      {data && (
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
                value={input.nama_pengeluaran}
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
                onChange={handleChange}
                value={input.tanggal_pengeluaran}
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
                value={input.total_pengeluaran}
                required
              />
            </div>

            <div className="flex justify-end gap-3 mt-10">
              <button className="btn btn-active" onClick={handleCancelClick}>
                Cancel
              </button>
              <button className="btn btn-primary" type="submit">
                Save Changes
              </button>
            </div>
          </form>
          <dialog id="edit_modal" className="modal" hidden>
            <div className="modal-box">
              <h3 className="font-bold text-lg">Confirmation</h3>
              <p className="py-4">
                Are you sure you want to edit this expense?
              </p>
              <div className="flex justify-end">
                <form method="dialog" className="flex space-between gap-3">
                  <button id="cancel_edit">Cancel</button>
                  <button
                    id="confirm_edit"
                    className="btn btn-primary"
                    onClick={() => handleSubmit()}
                  >
                    Edit
                  </button>
                </form>
              </div>
            </div>
          </dialog>
        </div>
      )}
    </MOWrapper>
  );
};

export default EditOtherExpenses;

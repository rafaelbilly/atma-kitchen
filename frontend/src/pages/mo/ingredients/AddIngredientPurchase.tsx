import React, { useState } from "react";
import { IngredientPurchaseBreadcrumb } from "../../../components/Breadcrumbs/Breadcrumb";
import { MOWrapper } from "../../../components/Wrapper";
import { addIngredientPurchase } from "../../../lib/repository/IngredientPurchaseRepository";
import { useNavigate } from "react-router-dom";
import { getAllIngredients } from "../../../lib/repository/IngredientsRepository";

const AddIngredientPurchase: React.FC = () => {
  const { data, error, isLoading } = getAllIngredients();

  const inputField = {
    id_pembelian_bahan_baku: "",
    tanggal_pembelian: "",
    jumlah_pembelian: "",
    harga_beli: "",
    id_bahan_baku: "",
  };

  const navigate = useNavigate();

  const [input, setInput] = useState(inputField);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    // e.preventDefault();
    await addIngredientPurchase(input);
    navigate("/mo/ingredient-purchase");
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
    navigate("/mo/ingredient-purchase");
  };

  return (
    <MOWrapper>
      <IngredientPurchaseBreadcrumb pageName="Add New Ingredient Purchase" />
      <div className="bg-white shadow-default p-6">
        {isLoading && (
          <div className="w-full mt-64 flex justify-center items-center">
            <span className="loading loading-dots loading-md"></span>
          </div>
        )}
        {error && <div>Error</div>}
        {data && (
          <form
            className="flex flex-col gap-6"
            onSubmit={(e) => {
              e.preventDefault();
              handleEditConfirmation();
            }}
          >
            <div className="flex flex-wrap items-center justify-center gap-6">
              <label className="font-medium text-gray-800 w-full max-w-xs">
                Date Of Purchase
              </label>
              <input
                type="date"
                placeholder="Enter Partner Name"
                className="input w-full max-w-md"
                name="tanggal_pembelian"
                onChange={handleChange}
                required
              />
            </div>

            <div className="flex flex-wrap items-center justify-center gap-6">
              <label className="font-medium text-gray-800 w-full max-w-xs">
                Purchase Quantity
              </label>
              <input
                type="number"
                placeholder="Enter Purchase Quantity"
                className="input w-full max-w-md"
                name="jumlah_pembelian"
                min="0"
                onChange={handleChange}
                required
              />
            </div>

            <div className="flex flex-wrap items-center justify-center gap-6">
              <label className="font-medium text-gray-800 w-full max-w-xs">
                Purchase Price
              </label>
              <input
                type="number"
                placeholder="Enter Purchase Price"
                className="input w-full max-w-md"
                name="harga_beli"
                min="0"
                onChange={handleChange}
                required
              />
            </div>

            <div className="flex flex-wrap items-center justify-center gap-6">
              <label className="font-medium text-gray-800 w-full max-w-xs">
                Ingredient
              </label>
              <select
                className="select w-full max-w-md"
                name="id_bahan_baku"
                value={input.id_bahan_baku}
                onChange={handleSelectChange}
                required
              >
                <option value="">Select Ingredient</option>
                {data && data.length > 0 ? (
                  data.map((ingredient) => (
                    <option
                      key={ingredient.id_bahan_baku}
                      value={ingredient.id_bahan_baku}
                    >
                      {ingredient.nama_bahan_baku}
                    </option>
                  ))
                ) : (
                  <option value="">No Ingredient Available</option>
                )}
              </select>
            </div>

            <div className="flex justify-end gap-3 mt-10">
              <button className="btn btn-active" onClick={handleCancelClick}>
                Cancel
              </button>
              <button className="btn btn-primary" type="submit">
                Add Ingredient Purchase
              </button>
            </div>
          </form>
        )}
        <dialog id="edit_modal" className="modal" hidden>
          <div className="modal-box">
            <h3 className="font-bold text-lg">Confirmation</h3>
            <p className="py-4">
              Are you sure you want to add this ingredient purchase?
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

export default AddIngredientPurchase;

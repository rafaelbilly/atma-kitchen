import React, { useState, useEffect } from "react";
import { IngredientPurchaseBreadcrumb } from "../../../components/Breadcrumbs/Breadcrumb";
import { MOWrapper } from "../../../components/Wrapper";
import {
  editIngredientPurchase,
  getIngredientPurchaseById,
} from "../../../lib/repository/IngredientPurchaseRepository";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import { IIngredientPurchase } from "../../../lib/interfaces/IIngredientPurchase";
import { IIngredients } from "../../../lib/interfaces/IIngredients";
import { getAllIngredients } from "../../../lib/repository/IngredientsRepository";

const EditIngredientPurchase: React.FC = () => {
  // API CALL
  const { id } = useParams<{ id: string }>();
  const { data, error, isLoading } = getIngredientPurchaseById(id!);
  const { data: ingredientsData } = getAllIngredients();
  const navigate = useNavigate();
  console.log(data);

  const [input, setInput] = useState<IIngredientPurchase>({
    id_pembelian_bahan_baku: "",
    tanggal_pembelian: "",
    jumlah_pembelian: 0,
    harga_beli: 0,
    bahan_baku: {} as IIngredients,
  });

  useEffect(() => {
    if (data) {
      console.log(data);

      const dateParts = data.tanggal_pembelian.split(" ");
      const dateOnly = dateParts[0];
      const inputField: IIngredientPurchase = {
        id_pembelian_bahan_baku: data.id_pembelian_bahan_baku ?? "",
        tanggal_pembelian: dateOnly,
        jumlah_pembelian: data.jumlah_pembelian ?? "",
        harga_beli: data.harga_beli ?? "",
        bahan_baku: data.bahan_baku,
      };
      setInput(inputField);
    }
  }, [data]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    // e.preventDefault();
    await editIngredientPurchase(input, data.id_pembelian_bahan_baku);
    navigate("/mo/ingredient-purchase");
  };

  const handleEditConfirmation = () => {
    const modal = document.getElementById("edit_modal") as HTMLDialogElement;
    if (modal) {
      modal.showModal();

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
      <IngredientPurchaseBreadcrumb pageName="Edit Ingredient Purchase" />
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
                Ingredient
              </label>
              <select
                className="select w-full max-w-md"
                name="id_bahan_baku"
                value={input.bahan_baku.id_bahan_baku}
                onChange={handleSelectChange}
                disabled
              >
                <option value="">Select Ingredient</option>
                {ingredientsData && ingredientsData.length > 0 ? (
                  ingredientsData.map((ingredients: IIngredients) => (
                    <option
                      key={ingredients.id_bahan_baku}
                      value={ingredients.id_bahan_baku}
                    >
                      {ingredients.nama_bahan_baku}
                    </option>
                  ))
                ) : (
                  <option value="">No Ingredient Available</option>
                )}
              </select>
            </div>

            <div className="flex flex-wrap items-center justify-center gap-6">
              <label className="font-medium text-gray-800 w-full max-w-xs">
                Date Of Purchase
              </label>
              <input
                type="date"
                className="input w-full max-w-md"
                name="tanggal_pembelian"
                onChange={handleChange}
                value={input.tanggal_pembelian}
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
                value={input.jumlah_pembelian}
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
                value={input.harga_beli}
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
        )}

        <dialog id="edit_modal" className="modal" hidden>
          <div className="modal-box">
            <h3 className="font-bold text-lg">Confirmation</h3>
            <p className="py-4">
              Are you sure you want to edit this ingredient purchase?
            </p>
            <div className="flex justify-end">
              <form method="dialog" className="flex space-between gap-3">
                <button id="cancel_edit">Cancel</button>
                <button
                  id="confirm_edit"
                  className="btn btn-primary"
                  onClick={() => handleSubmit()}
                >
                  Save
                </button>
              </form>
            </div>
          </div>
        </dialog>
      </div>
    </MOWrapper>
  );
};

export default EditIngredientPurchase;

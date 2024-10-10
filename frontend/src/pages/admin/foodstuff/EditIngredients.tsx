import React, { useState, useEffect } from "react";
import { IngredientsBreadcrumb } from "../../../components/Breadcrumbs/Breadcrumb";
import { AdminWrapper } from "../../../components/Wrapper";
import { IIngredients } from "../../../lib/interfaces/IIngredients";
import {
  editIngredients,
  getIngredientsById,
} from "../../../lib/repository/IngredientsRepository";
import { useParams, useNavigate } from "react-router-dom";

const EditIngredients = () => {
  // API CALL
  const { id } = useParams<{ id: string }>();
  const { data, error, isLoading } = getIngredientsById(id!);

  const [input, setInput] = useState<IIngredients>({
    id_bahan_baku: "",
    nama_bahan_baku: "",
    satuan: "",
    stok: 0,
    min_stok: 0,
  });

  useEffect(() => {
    if (data) {
      const inputField: IIngredients = {
        id_bahan_baku: data.id_bahan_baku ?? "",
        nama_bahan_baku: data.nama_bahan_baku ?? "",
        satuan: data.satuan ?? "",
        stok: data.stok ?? "",
        min_stok: data.min_stok ?? "",
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
    await editIngredients(input, data.id_bahan_baku);
    navigate("/admin/ingredients");
  };

  const navigate = useNavigate();

  const handleCancelClick = () => {
    navigate("/admin/ingredients");
  };

  const handleEditConfirmation = () => {
    const modal = document.getElementById("edit_modal") as HTMLDialogElement;
    if (modal) {
      modal.showModal();

      //   const confirmEditBtn = document.getElementById(
      //     "confirm_edit"
      //   ) as HTMLButtonElement;
      //   confirmEditBtn.addEventListener("click", async () => {
      //     await handleSubmit();
      //     modal.close();
      //   });

      const cancelEditBtn = document.getElementById(
        "cancel_edit"
      ) as HTMLButtonElement;
      cancelEditBtn.addEventListener("click", () => {
        modal.close();
      });
    }
  };

  return (
    <AdminWrapper>
      <IngredientsBreadcrumb pageName="Edit Ingredients" />
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
                Ingredients Name
              </label>
              <input
                type="text"
                className="input w-full max-w-md"
                name="nama_bahan_baku"
                onChange={handleChange}
                value={input.nama_bahan_baku}
                required
              />
            </div>

            <div className="flex flex-wrap items-center justify-center gap-6">
              <label className="font-medium text-gray-800 w-full max-w-xs">
                Units
              </label>
              <select
                className="select w-full max-w-md"
                name="satuan"
                value={input.satuan}
                onChange={handleSelectChange}
                required
              >
                <option value="">Select Units</option>
                <option value="kg">Kg</option>
                <option value="ml">Ml</option>
                <option value="gr">Gram</option>
                <option value="buah">Buah</option>
                <option value="butir">Butir</option>
              </select>
            </div>

            <div className="flex flex-wrap items-center justify-center gap-6">
              <label className="font-medium text-gray-800 w-full max-w-xs">
                Stocks
              </label>
              <input
                type="number"
                className="input w-full max-w-md"
                name="stok"
                onChange={handleChange}
                value={input.stok}
                min="0"
                required
              />
            </div>

            <div className="flex flex-wrap items-center justify-center gap-6">
              <label className="font-medium text-gray-800 w-full max-w-xs">
                Minimal Stocks
              </label>
              <input
                type="number"
                className="input w-full max-w-md"
                name="min_stok"
                onChange={handleChange}
                value={input.min_stok}
                min="0"
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
                Are you sure you want to edit this ingredient?
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
    </AdminWrapper>
  );
};

export default EditIngredients;

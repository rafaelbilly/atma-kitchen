import React, { useState } from "react";
import { ProductBreadcrumb } from "../../../components/Breadcrumbs/Breadcrumb";
import { AdminWrapper } from "../../../components/Wrapper";
import { addProducts } from "../../../lib/repository/ProductRepository";
import { useNavigate } from "react-router-dom";
import { getAllPartner } from "../../../lib/repository/PartnerRepository";

const AddConsignment = () => {
  const { data, error, isLoading } = getAllPartner();

  const navigate = useNavigate();
  const inputField = {
    nama_produk: "",
    harga: "",
    limit_produksi: "",
    jenis_produk: "",
    foto: "",
    deskripsi: "",
    id_penitip: "",
  };

  const [input, setInput] = useState(inputField);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  const handleEditConfirmation = () => {
    const modal = document.getElementById(
      "confirmation_modal"
    ) as HTMLDialogElement;
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

  const handleSubmit = async () => {
    const formData = new FormData();
    formData.append("foto", selectedFile as File);
    formData.append("nama_produk", input.nama_produk);
    formData.append("harga", input.harga);
    formData.append("limit_produksi", input.limit_produksi);
    formData.append("jenis_produk", input.jenis_produk);
    formData.append("deskripsi", input.deskripsi);
    formData.append("id_penitip", input.id_penitip);
    await addProducts(formData);
    navigate("/admin-products");
  };

  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files && files.length > 0) {
      const uploadedFile = files[0];
      setSelectedFile(uploadedFile);
    }
  };

  return (
    <AdminWrapper>
      <ProductBreadcrumb pageName="Add New Product" />
      <div className="bg-white shadow-default p-6 grid grid-cols-1 gap-9 sm:grid-cols-2">
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
            <div className="flex items-center justify-center w-full">
              <label
                htmlFor="dropzone-file"
                className="flex flex-col items-center justify-center w-full h-72 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50"
              >
                <div className="flex flex-col items-center justify-center pt-5 pb-6">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="lucide lucide-cloud-upload"
                  >
                    <path d="M4 14.899A7 7 0 1 1 15.71 8h1.79a4.5 4.5 0 0 1 2.5 8.242" />
                    <path d="M12 12v9" />
                    <path d="m16 16-4-4-4 4" />
                  </svg>
                  <p className="mb-2 text-sm text-gray-500">
                    <span className="font-semibold">
                      {selectedFile ? selectedFile.name : "Click to upload"}
                    </span>
                  </p>
                </div>
                <input
                  id="dropzone-file"
                  type="file"
                  className="hidden"
                  onChange={handleFileUpload}
                />
              </label>
            </div>

            <label className="font-medium text-gray-800">Product Name</label>
            <input
              type="text"
              placeholder="Enter Product Name"
              className="input w-full max-w-md"
              name="nama_produk"
              onChange={handleChange}
              required
            />

            <label className="font-medium text-gray-800">Category</label>
            <select
              className="select w-full max-w-md"
              name="jenis_produk"
              value={input.jenis_produk}
              onChange={handleSelectChange}
              required
            >
              <option value="">Select Category</option>
              <option value="Cake">Cake</option>
              <option value="Roti">Bread</option>
              <option value="Minuman">Drinks</option>
              <option value="Snack">Snack</option>
            </select>

            <label className="font-medium text-gray-800">Partner Name</label>
            <select
              className="select w-full max-w-md"
              name="id_penitip"
              value={input.id_penitip}
              onChange={handleSelectChange}
              required
            >
              <option value="">Select Partner</option>
              {data && data.length > 0 ? (
                data.map((partner) => (
                  <option key={partner.id_penitip} value={partner.id_penitip}>
                    {partner.nama_penitip}
                  </option>
                ))
              ) : (
                <option value="">No Partners Available</option>
              )}
            </select>

            <label className="font-medium text-gray-800">Price</label>
            <input
              type="number"
              placeholder="Enter Price"
              className="input w-full max-w-md"
              name="harga"
              onChange={handleChange}
              min="0"
              required
            />

            <label className="font-medium text-gray-800">
              Production Limit
            </label>
            <input
              type="number"
              placeholder="Enter Production Limit"
              className="input w-full max-w-md"
              name="limit_produksi"
              onChange={handleChange}
              min="0"
              required
            />

            <label className="font-medium text-gray-800">Description</label>
            <input
              onChange={handleChange}
              placeholder="Enter Description"
              className="textarea w-full max-w-md"
              name="deskripsi"
              required
            ></input>

            <div className="flex justify-end gap-3 mx-12">
              <button className="btn btn-active">Cancel</button>
              <button className="btn btn-primary" type="submit">
                Add Product
              </button>
            </div>
          </form>
        )}

        <dialog id="confirmation_modal" className="modal" hidden>
          <div className="modal-box">
            <h3 className="font-bold text-lg">Confirmation</h3>
            <p className="py-4">Are you sure you want to add this product?</p>
            <div className="flex justify-end">
              <form method="dialog" className="flex space-between gap-3">
                <button id="cancel_edit">Cancel</button>
                <button
                  id="confirm_edit"
                  className="btn btn-primary"
                  onClick={async () => await handleSubmit()}
                >
                  Add
                </button>
              </form>
            </div>
          </div>
        </dialog>
      </div>
    </AdminWrapper>
  );
};

export default AddConsignment;

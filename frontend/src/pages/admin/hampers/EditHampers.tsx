import { Trash2 } from "lucide-react";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "sonner";
import { HampersBreadcrumb } from "../../../components/Breadcrumbs/Breadcrumb";
import { AdminWrapper } from "../../../components/Wrapper";
import { IProduct } from "../../../lib/interfaces/IProducts";
import {
  editHampers,
  getHampersById,
} from "../../../lib/repository/HampersRepository";
import {
  getAllProcuts,
  uploadPicture,
} from "../../../lib/repository/ProductRepository";

const EditHampers: React.FC = () => {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();

  const {
    data: hampersData,
    // error: hampersError,
    isLoading: hampersLoading,
  } = getHampersById(id!);

  const { data, isLoading } = getAllProcuts();

  const [hampersItems, setHampersItems] = useState<IProduct[]>([]);
  const [products, setProducts] = useState<IProduct[]>([]);

  useEffect(() => {
    if (data) {
      setProducts(data);
    }
    if (!hampersLoading) {
      const firstMap = hampersData.detail_hampers.map((item: any) => item);
      const secondMap = firstMap.map((item: any) => item.items) as IProduct[];
      setHampersItems(secondMap);
    }
  }, [data, hampersData]);

  const inputField = {
    nama_hampers: "",
    harga: "",
    deskripsi: "",
    limit_produksi: "",
    id_kemasan: 7,
  };

  const [input, setInput] = useState(inputField);

  useEffect(() => {
    if (!hampersLoading) {
      setInput({
        ...input,
        nama_hampers: hampersData.nama_produk,
        harga: hampersData.harga,
        deskripsi: hampersData.deskripsi,
        limit_produksi: hampersData.limit_produksi,
        id_kemasan: hampersData.id_kemasan,
      });
    }
  }, [hampersData]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  const addItems = (item: IProduct) => {
    setHampersItems((prevValues) => [item, ...prevValues!]);

    setProducts((prevValues) =>
      prevValues.filter((product) => product.id_produk !== item.id_produk)
    );
  };

  const removeItems = (item: IProduct) => {
    setProducts((prevValues) => [item, ...prevValues!]);

    setHampersItems((prevValues) =>
      prevValues.filter((product) => product.id_produk !== item.id_produk)
    );
  };

  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files && files.length > 0) {
      const uploadedFile = files[0];
      setSelectedFile(uploadedFile);
    }
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
    toast.info("Updating Hampers...");
    let url = hampersData.foto;
    if (selectedFile !== null) {
      const formData = new FormData();
      formData.append("image", selectedFile! as File);
      url = await uploadPicture(formData);
    }
    const newHampers = {
      nama_hampers: input.nama_hampers,
      harga: input.harga,
      limit_produksi: input.limit_produksi,
      id_kemasan: 7,
      deskripsi: input.deskripsi,
      foto: url,
      items: hampersItems.map((item) => item.id_produk),
    };
    await editHampers(id!, newHampers);

    navigate("/admin/hampers");
  };

  return (
    <AdminWrapper>
      <HampersBreadcrumb pageName="Edit Hampers" />
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleEditConfirmation();
        }}
      >
        <div className="bg-white shadow-default p-6 grid grid-cols-1 gap-9 sm:grid-cols-3">
          <div className="flex flex-col gap-6">
            <div className="flex items-center justify-center w-full">
              <label
                htmlFor="dropzone-file"
                className="flex flex-col items-center justify-center w-full h-80 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50"
              >
                <div className="flex flex-col items-center justify-center pt-5 pb-6">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
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
          </div>

          <div className="flex flex-col gap-6">
            <label className="font-medium text-gray-800">Hampers Name</label>
            <input
              required
              type="text"
              placeholder="Enter Hampers Name"
              className="input w-full max-w-md"
              name="nama_hampers"
              onChange={handleChange}
              value={input.nama_hampers}
            />

            <label className="font-medium text-gray-800">Price</label>
            <input
              required
              type="number"
              placeholder="Enter Price"
              className="input w-full max-w-md"
              name="harga"
              onChange={handleChange}
              value={input.harga}
            />
          </div>
          <div className="flex flex-col gap-6">
            <label className="font-medium text-gray-800">
              Production Limit
            </label>
            <input
              required
              type="number"
              placeholder="Enter Minimal Stocks"
              className="input w-full max-w-md"
              name="limit_produksi"
              onChange={handleChange}
              value={input.limit_produksi}
            />

            <label className="font-medium text-gray-800">Description</label>
            <input
              required
              placeholder="Enter Description"
              className="textarea w-full max-w-md"
              name="deskripsi"
              onChange={handleChange}
              value={input.deskripsi}
            ></input>
          </div>
        </div>

        {!isLoading && (
          <div className="grid grid-cols-1 gap-12 sm:grid-cols-2">
            <div className="flex flex-col gap-12">
              <div className="rounded-sm border border-stroke bg-white shadow-default">
                <div className="border-b border-stroke py-4 px-7 flex items-center">
                  <h3 className="font-bold text-black">Hampers Items</h3>
                </div>
                <div className="h-72 overflow-y-auto">
                  {hampersItems.length === 0 && (
                    <div className="p-7 py-4">
                      <h3 className="text-black text-center">
                        No Hampers Items Added Yet
                      </h3>
                    </div>
                  )}
                  {hampersItems &&
                    hampersItems!.map((product) => (
                      <div className="px-7 py-4">
                        <div className="flex justify-between items-center">
                          <p>{product.nama_produk}</p>
                          <a
                            className="btn btn-error btn-sm"
                            onClick={() => {
                              removeItems(product);
                            }}
                          >
                            <Trash2 className="text-white" size={14} />
                          </a>
                        </div>
                      </div>
                    ))}
                </div>
              </div>
            </div>
            <div className="flex flex-col gap-9">
              <div className="rounded-sm border border-stroke bg-white shadow-default">
                <div className="border-b border-stroke py-4 px-7">
                  <h3 className="font-bold text-black">Product List</h3>
                </div>
                <form action="#">
                  <div className="p-7 py-4">
                    <ul className="divide-y divide-gray-200 h-72 overflow-y-auto">
                      {products!.map((product) => (
                        <li key={product.id_produk} className="py-2">
                          <div className="flex items-center justify-between">
                            <div>
                              <h4 className="text-base font-medium">
                                {product.nama_produk}
                              </h4>
                            </div>
                            <button
                              className="btn btn-primary btn-sm"
                              onClick={() => {
                                addItems(product);
                              }}
                            >
                              Add To Hampers
                            </button>
                          </div>
                        </li>
                      ))}
                    </ul>
                  </div>
                </form>
              </div>
            </div>
          </div>
        )}
        <div className="flex flex-row-reverse mt-16">
          <button className="btn btn-primary" type="submit">
            Edit Hampers
          </button>
        </div>
      </form>

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
    </AdminWrapper>
  );
};

export default EditHampers;

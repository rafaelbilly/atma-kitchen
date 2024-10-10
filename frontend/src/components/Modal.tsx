import { TriangleAlert } from "lucide-react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { mutate } from "swr";
import { IPayment } from "../lib/interfaces/IPayment";
import { IRecipe } from "../lib/interfaces/IRecipe";
import { ITransaction } from "../lib/interfaces/ITransaction";
import {
  confirmTransaction,
  payTransaction,
} from "../lib/repository/PaymentRepository";
import { getRecipesByTransactions } from "../lib/repository/RecipeRepository";
import {
  updateDeliveryRange,
  updateTransactionAfterReady,
  updateTransactionConfirmed,
  updateTransactionOnProcess,
  updateTransactionReady,
  updateTransactionReject,
} from "../lib/repository/TransactionRepository";
import { currencyConverter, dateConverter } from "../lib/utils/converter";
import { addIngredientUse } from "../lib/repository/IngridientUse";

type InputRangeModalProps = {
  data: ITransaction;
};

export const InputRangeModal = ({ data }: InputRangeModalProps) => {
  const [range, setRange] = useState<number | null>(null);

  const [fee, setFee] = useState<number>(10000);

  const [isError, setIsError] = useState<boolean>(false);

  const dialog = document.getElementById(
    "confirmation_modal_range_modal"
  )! as HTMLDialogElement;

  useEffect(() => {
    if (range !== null) {
      if (range < 5) {
        setFee(10000);
      } else if (range >= 5 && range < 10) {
        setFee(15000);
      } else if (range >= 10 && range < 15) {
        setFee(20000);
      } else if (range >= 5) {
        setFee(25000);
      }
    } else {
      setFee(0);
    }
  }, [range]);

  const handleModalConfirmation = () => {
    if (range === null) {
      setIsError(true);
      return;
    }
    setTimeout(() => {
      dialog.showModal();
    }, 300); //
  };

  const handleSubmit = () => {
    dialog.close();
    const dialog2 = document.getElementById(
      "range_modal"
    )! as HTMLDialogElement;
    dialog2.close();
    setTimeout(async () => {
      await updateDeliveryRange(data.id_transaksi, range!, fee);
      mutate(`${import.meta.env.VITE_BASE_API}/transaksi-admin`);
    }, 300); //
  };

  return (
    <dialog id="range_modal" className="modal">
      <div className="modal-box w-1/2">
        <form method="dialog">
          {/* if there is a button in form, it will close the modal */}
          <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
            ✕
          </button>
        </form>
        <h3 className="font-bold text-lg mb-4 text-center">Input Range</h3>
        <div className="grid grid-cols-7">
          <p className="col-span-2">Transaction ID</p>
          <p className="col-span-5">: {data.id_transaksi}</p>
          <p className="col-span-2">Order Date</p>
          <p className="col-span-5">
            : {dateConverter(data.tanggal_nota_dibuat)}
          </p>
          <p className="col-span-2">Due Date</p>
          <p className="col-span-5">: {dateConverter(data.tanggal_ambil)}</p>
          <p className="col-span-2">Customer</p>
          <p className="col-span-5">: {data.customer.nama_customer}</p>
          <p className="col-span-2">Orders</p>
          <p className="col-span-5">:</p>
          {data.detail_transaksi.map((item) => (
            <p className="col-span-6 col-start-1 ml-3">
              - {item.produk.nama_produk} | {item.jumlah_item} pcs
            </p>
          ))}

          <p className="col-span-2 mt-4">Total</p>
          <p className="col-span-5 mt-4">: {currencyConverter(data.total)}</p>
          <p className="col-span-2 font-bold">Address</p>
          <p className="col-span-5 font-bold">
            :{" "}
            {data.pengiriman.alamat_tujuan
              ? data.pengiriman.alamat_tujuan
              : "-"}
          </p>
        </div>

        <hr className="border-t-2 my-2" />
        <div className="grid grid-cols-7">
          <p className="col-span-2 mb-2">Delivery Fee</p>
          <p className="col-span-5 mb-2">: {currencyConverter(fee)}</p>
        </div>

        <label
          className={`input input-bordered ${isError && `border-error`
            } flex items-center gap-2`}
        >
          <input
            type="number"
            className="grow"
            placeholder="Enter range by given address"
            onChange={(e) => setRange(parseFloat(e.target.value))}
          />
          km
        </label>
        {isError && (
          <div className="flex justify-end">
            <span className="text-error">Must fill this field.</span>
          </div>
        )}
        <div className="flex justify-end mt-6">
          <button
            className="btn btn-primary w-1/4"
            onClick={() => handleModalConfirmation()}
          >
            Save
          </button>
        </div>
      </div>
      <ConfirmationModal onClick={handleSubmit} uniqueId="range_modal" />
    </dialog>
  );
};

type ConfirmationModalProps = {
  onClick: () => void;
  text?: string;
  uniqueId: string;
};

export const ConfirmationModal = ({
  onClick,
  text,
  uniqueId,
}: ConfirmationModalProps) => {
  return (
    <dialog id={`confirmation_modal_${uniqueId}`} className="modal">
      <div className="modal-box w-1/4">
        <h3 className="font-bold text-lg mb-4 text-center">Confirmation</h3>
        <p className="text-center">
          {text ??
            "This action will update the data. Are you sure want to continue?"}
        </p>
        <div className="flex justify-between mx-16 mt-4">
          <form method="dialog">
            <button className="btn bg-gray-100">Cancel</button>
          </form>
          <button className="btn btn-primary w-1/2" onClick={() => onClick()}>
            Continue
          </button>
        </div>
      </div>
    </dialog>
  );
};

type PayModalProps = {
  data: IPayment;
};

export const PayModal: React.FC<PayModalProps> = ({ data }) => {
  const dialog2 = document.getElementById(
    "confirmation_modal_pay_modal"
  )! as HTMLDialogElement;
  const navigate = useNavigate();
  const handleSubmit = async () => {
    const dialog = document.getElementById("pay_modal")! as HTMLDialogElement;

    const formData = new FormData();
    formData.append("bukti_pembayaran", selectedFile as File);
    await payTransaction(formData, data.id_pembayaran);
    dialog2.close();
    dialog.close();
    setTimeout(() => {
      navigate("/u/transactions");
    }, 300);
  };

  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const handleModalConfirmation = () => {
    setTimeout(() => {
      dialog2.showModal();
    }, 300); //
  };

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files && files.length > 0) {
      const uploadedFile = files[0];
      setSelectedFile(uploadedFile);
    }
  };

  return (
    <>
      <dialog id="pay_modal" className="modal">
        <div className="modal-box w-1/4">
          <h3 className="font-bold text-lg mb-4 text-center">
            Upload Transfer Receipt
          </h3>
          <label
            htmlFor="dropzone-file"
            className="flex flex-col items-center justify-center w-full h-40 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50"
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
              name="bukti_pembayaran"
              onChange={handleFileUpload}
              required
            />
          </label>
          <div className="flex justify-between mx-16 mt-4">
            <form method="dialog">
              <button className="btn bg-gray-100">Cancel</button>
            </form>
            <button
              className="btn btn-primary w-1/2"
              onClick={() => handleModalConfirmation()}
            >
              Pay
            </button>
          </div>
        </div>
      </dialog>
      <ConfirmationModal onClick={handleSubmit} uniqueId="pay_modal" />
    </>
  );
};

type InputTotalPaymentModalProps = {
  data: ITransaction;
};

export const InputPaymentModal = ({ data }: InputTotalPaymentModalProps) => {
  const [amount, setAmount] = useState<number | null>(NaN);

  const [tips, setTips] = useState<number>(0);

  const [isNull, setIsNull] = useState<boolean>(false);
  const [isInvalid, setIsInvalid] = useState<boolean>(false);

  const dialog = document.getElementById(
    "confirmation_modal_total_payment_modal"
  )! as HTMLDialogElement;

  const handleModalConfirmation = () => {
    if (Number.isNaN(amount)) {
      setIsNull(true);
      return;
    } else {
      setIsNull(false);
    }
    if (!isNull && !isInvalid) {
      setTimeout(() => {
        dialog.showModal();
      }, 300); //
    }
  };

  useEffect(() => {
    if (amount !== null) {
      if (amount > data.total) setTips(amount - data.total);
      else setTips(0);
    } else {
      setTips(0);
    }

    if (!Number.isNaN(amount)) {
      setIsNull(false);
    }
    if (amount! < data.total) {
      setIsInvalid(true);
      return;
    } else {
      setIsInvalid(false);
    }
  }, [amount]);

  const handleSubmit = () => {
    dialog.close();
    const dialog2 = document.getElementById(
      "total_payment_modal"
    )! as HTMLDialogElement;
    dialog2.close();
    const updateData = {
      total_pembayaran: amount!,
      tip: tips,
    };

    setTimeout(async () => {
      await confirmTransaction(updateData, data.pembayaran.id_pembayaran);
      mutate(`${import.meta.env.VITE_BASE_API}/transaksi-admin/todo`);
    }, 300); //
  };

  return (
    <dialog id="total_payment_modal" className="modal">
      <div className="modal-box w-1/2">
        <form method="dialog">
          {/* if there is a button in form, it will close the modal */}
          <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
            ✕
          </button>
        </form>
        <h3 className="font-bold text-lg mb-4 text-center">
          Input Total Payment
        </h3>
        <div className="grid grid-cols-7">
          <p className="col-span-2">Transaction ID</p>
          <p className="col-span-5">: {data.id_transaksi}</p>
          <p className="col-span-2">Order Date</p>
          <p className="col-span-5">
            : {dateConverter(data.tanggal_nota_dibuat)}
          </p>
          <p className="col-span-2">Due Date</p>
          <p className="col-span-5">: {dateConverter(data.tanggal_ambil)}</p>
          <p className="col-span-2">Customer</p>
          <p className="col-span-5">: {data.customer.nama_customer}</p>
          <p className="col-span-2">Orders</p>
          <p className="col-span-5">:</p>
          {data.detail_transaksi.map((item) => (
            <p className="col-span-6 col-start-1 ml-3">
              - {item.produk.nama_produk} | {item.jumlah_item} pcs
            </p>
          ))}
          <hr className="border-t-2 my-2 col-span-7" />
          {data.pembayaran.jenis_pembayaran === "Cash" ? (
            <>
              <p className="col-span-2 mt-4">Payment Method</p>
              <div className="col-span-5 mt-4 flex items-start">: Cash</div>
            </>
          ) : (
            <>
              <p className="col-span-2 mt-4">Payment Receipt</p>
              <div className="col-span-5 mt-4 flex items-start">
                :
                <img
                  className="w-72 object-cover mx-auto "
                  src={data.pembayaran.bukti_pembayaran}
                  alt={data.pembayaran.id_pembayaran}
                />
              </div>
            </>
          )}
          <p className="col-span-2 mt-4 font-bold">Total</p>
          <p className="col-span-5 mt-4 font-bold">
            : {currencyConverter(data.total)}
          </p>
        </div>

        <div className="grid grid-cols-7">
          <p className="col-span-2 mb-2">Tips</p>
          <p className="col-span-5 mb-2">: {currencyConverter(tips)}</p>
        </div>
        <label className="form-control w-full max-w-xs">
          <div className="label">
            <span
              className={`label-text ${isNull || (isInvalid && `text-error`)}`}
            >
              Paid Amount
            </span>
          </div>
          <label
            className={`input input-bordered ${isNull && `border-error`
              } flex items-center gap-2`}
          >
            <p className={`${isNull || (isInvalid && `text-error`)}`}>Rp</p>
            <input
              type="number"
              className="grow"
              placeholder="Enter Paid Amount"
              onChange={(e) => setAmount(parseFloat(e.target.value))}
            />
          </label>
        </label>

        {isNull && (
          <div className="flex justify-start">
            <span className="text-error">Must fill this field.</span>
          </div>
        )}
        {isInvalid && (
          <div className="flex justify-start">
            <span className="text-error">Enter the correct amount.</span>
          </div>
        )}
        <div className="flex justify-end mt-6">
          <button
            className="btn btn-primary w-1/4"
            onClick={() => handleModalConfirmation()}
          >
            Save
          </button>
        </div>
      </div>
      <ConfirmationModal
        onClick={handleSubmit}
        uniqueId="total_payment_modal"
      />
    </dialog>
  );
};

type ConfirmMOModalProps = {
  data: ITransaction;
};

export const ConfirmMOModal = ({ data }: ConfirmMOModalProps) => {
  const { data: recipe, isLoading: recipeLoading } = getRecipesByTransactions(
    data.id_transaksi
  );

  const dialog = document.getElementById(
    "confirmation_mo_modal"
  )! as HTMLDialogElement;

  let runningOutIngredients: IRecipe[];

  runningOutIngredients = recipe?.filter((item) => {
    return isIngredientRunOut(item.bahan_baku.stok, item.jumlah_bahan);
  });

  const handleModalConfirmation = () => {
    const confirmModal = document.getElementById(
      "confirmation_modal_confirm_confirmation_mo_modal"
    )! as HTMLDialogElement;
    setTimeout(() => {
      confirmModal.showModal();
    }, 300); //
  };

  const handleModalReject = () => {
    const confirmModal = document.getElementById(
      "confirmation_modal_reject_confirmation_mo_modal"
    )! as HTMLDialogElement;
    setTimeout(() => {
      confirmModal.showModal();
    }, 300); //
  };

  const handleConfirmSubmit = () => {
    dialog.close();
    const dialog2 = document.getElementById(
      "confirmation_modal_confirm_confirmation_mo_modal"
    )! as HTMLDialogElement;
    dialog2.close();

    setTimeout(async () => {
      await updateTransactionConfirmed(data.id_transaksi);
      mutate(`${import.meta.env.VITE_BASE_API}/transaksi-mo/todo`);
    }, 300); //
  };

  const handleRejectSubmit = () => {
    dialog.close();
    const dialog2 = document.getElementById(
      "confirmation_modal_reject_confirmation_mo_modal"
    )! as HTMLDialogElement;
    dialog2.close();

    setTimeout(async () => {
      await updateTransactionReject(data.id_transaksi);
      mutate(`${import.meta.env.VITE_BASE_API}/transaksi-mo/todo`);
    }, 300); //
  };

  function isIngredientRunOut(stock: number, needed: number): boolean {
    return stock < needed;
  }

  return (
    <dialog id="confirmation_mo_modal" className="modal">
      <div className="modal-box w-1/2">
        <form method="dialog">
          <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
            ✕
          </button>
        </form>
        <h3 className="font-bold text-lg mb-4 text-center">
          Required Ingredients
        </h3>
        <div className="grid grid-cols-7">
          <p className="col-span-2">Transaction ID</p>
          <p className="col-span-5">: {data.id_transaksi}</p>
          <p className="col-span-2">Order Date</p>
          <p className="col-span-5">
            : {dateConverter(data.tanggal_nota_dibuat)}
          </p>
          <p className="col-span-2">Due Date</p>
          <p className="col-span-5">: {dateConverter(data.tanggal_ambil)}</p>
          <p className="col-span-2">Customer</p>
          <p className="col-span-5">: {data.customer.nama_customer}</p>
          <p className="col-span-2">Orders</p>
          <p className="col-span-5">:</p>
          {data.detail_transaksi.map((item) => (
            <p className="col-span-6 col-start-1 ml-3">
              - {item.produk.nama_produk} | {item.jumlah_item} pcs
            </p>
          ))}
          <hr className="border-t-2 my-2 col-span-7" />
          <div className="col-span-7">
            {recipeLoading ? (
              <span className="loading loading-dots loading-md"></span>
            ) : (
              <>
                <span className="font-bold">Detail Ingredients</span>
                {recipe?.map((item) => (
                  <p className="col-span-6 col-start-1 ml-3">
                    - {item.bahan_baku.nama_bahan_baku} | {item.jumlah_bahan}{" "}
                    {item.bahan_baku.satuan}
                  </p>
                ))}
              </>
            )}
          </div>
          {!recipeLoading && runningOutIngredients.length > 0 && (
            <div className="col-span-7 mt-4">
              <div className="flex items-center">
                <span className="font-semibold text-warning">
                  Insufficient Ingredients
                </span>
                <TriangleAlert className="text-warning ml-1" size={16} />
              </div>
              {runningOutIngredients?.map((item) => (
                <p className="col-span-6 col-start-1 ml-3">
                  {`- ${item.bahan_baku.nama_bahan_baku} in stock ${item.bahan_baku.stok} ${item.bahan_baku.satuan}`}
                </p>
              ))}
            </div>
          )}
        </div>
        {!recipeLoading && (
          <div className="flex justify-evenly mt-6">
            <button
              className="btn w-1/3 border-1 border-red-200 bg-transparent text-red-400 hover:bg-red-200 hover:text-white"
              onClick={() => handleModalReject()}
            >
              Reject
            </button>
            <button
              className={`btn w-1/3 ${runningOutIngredients.length > 0
                ? `btn-disabled`
                : `btn-primary`
                }`}
              onClick={() => handleModalConfirmation()}
            >
              Confirm
            </button>
          </div>
        )}
      </div>
      <ConfirmationModal
        onClick={handleConfirmSubmit}
        uniqueId="confirm_confirmation_mo_modal"
        text="Are you sure want to confirm this transaction?"
      />
      <ConfirmationModal
        onClick={handleRejectSubmit}
        uniqueId="reject_confirmation_mo_modal"
        text="Are you sure want to reject this transaction?"
      />
    </dialog>
  );
};

export const ConfirmProcessMOModal = ({ data }: ConfirmMOModalProps) => {
  const { data: recipe, isLoading: recipeLoading } = getRecipesByTransactions(
    data.id_transaksi
  );

  const dialog = document.getElementById(
    "confirmation_mo_modal"
  )! as HTMLDialogElement;

  let runningOutIngredients: IRecipe[];

  runningOutIngredients = recipe?.filter((item) => {
    return isIngredientRunOut(item.bahan_baku.stok, item.jumlah_bahan);
  });

  const handleModalConfirmation = () => {
    const confirmModal = document.getElementById(
      "confirmation_modal_confirm_confirmation_mo_modal"
    )! as HTMLDialogElement;
    setTimeout(() => {
      confirmModal.showModal();
    }, 300); //
  };

  const handleConfirmSubmit = () => {
    dialog.close();
    const dialog2 = document.getElementById(
      "confirmation_modal_confirm_confirmation_mo_modal"
    )! as HTMLDialogElement;
    dialog2.close();

    setTimeout(async () => {
      await updateTransactionOnProcess(data.id_transaksi);
      const body = {
        bahan_baku: recipe,
      };
      await addIngredientUse(body);
      mutate(`${import.meta.env.VITE_BASE_API}/transaksi-mo/on-process-today`);
    }, 300); //
  };

  function isIngredientRunOut(stock: number, needed: number): boolean {
    return stock < needed;
  }

  return (
    <dialog id="confirmation_mo_modal" className="modal">
      <div className="modal-box w-1/2">
        <form method="dialog">
          <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
            ✕
          </button>
        </form>
        <h3 className="font-bold text-lg mb-4 text-center">
          Required Ingredients
        </h3>
        <div className="grid grid-cols-7">
          <p className="col-span-2">Transaction ID</p>
          <p className="col-span-5">: {data.id_transaksi}</p>
          <p className="col-span-2">Order Date</p>
          <p className="col-span-5">
            : {dateConverter(data.tanggal_nota_dibuat)}
          </p>
          <p className="col-span-2">Due Date</p>
          <p className="col-span-5">: {dateConverter(data.tanggal_ambil)}</p>
          <p className="col-span-2">Customer</p>
          <p className="col-span-5">: {data.customer.nama_customer}</p>
          <p className="col-span-2">Orders</p>
          <p className="col-span-5">:</p>
          {data.detail_transaksi.map((item) => (
            <p className="col-span-6 col-start-1 ml-3">
              - {item.produk.nama_produk} | {item.jumlah_item} pcs
            </p>
          ))}
          <hr className="border-t-2 my-2 col-span-7" />
          <div className="col-span-7">
            {recipeLoading ? (
              <span className="loading loading-dots loading-md"></span>
            ) : (
              <>
                <span className="font-bold">Detail Ingredients</span>
                {recipe?.map((item) => (
                  <p className="col-span-6 col-start-1 ml-3">
                    - {item.bahan_baku.nama_bahan_baku} | {item.jumlah_bahan}{" "}
                    {item.bahan_baku.satuan}
                  </p>
                ))}
              </>
            )}
          </div>
          {!recipeLoading && runningOutIngredients.length > 0 && (
            <div className="col-span-7 mt-4">
              <div className="flex items-center">
                <span className="font-semibold text-warning">
                  Insufficient Ingredients
                </span>
                <TriangleAlert className="text-warning ml-1" size={16} />
              </div>
              {runningOutIngredients?.map((item) => (
                <p className="col-span-6 col-start-1 ml-3">
                  {`- ${item.bahan_baku.nama_bahan_baku} in stock ${item.bahan_baku.stok} ${item.bahan_baku.satuan}`}
                </p>
              ))}
            </div>
          )}
        </div>
        {!recipeLoading && (
          <div className="flex justify-evenly mt-6">
            <button
              className={`btn w-1/3 ${
                runningOutIngredients.length > 0
                  ? `btn-disabled`
                  : `btn-primary`
              }`}
              onClick={() => handleModalConfirmation()}
            >
              Process Order
            </button>
          </div>
        )}
      </div>
      <ConfirmationModal
        onClick={handleConfirmSubmit}
        uniqueId="confirm_confirmation_mo_modal"
        text="Are you sure want to confirm this transaction?"
      />
    </dialog>
  );
};

type DetailTransactionModalProps = {
  data: ITransaction;
};

export const DetailTransactionModal = ({
  data,
}: DetailTransactionModalProps) => {
  const handleModalConfirmation = () => {
    setTimeout(() => {
      const dialog = document.getElementById(
        "confirmation_modal_detail_transaction_modal"
      )! as HTMLDialogElement;
      dialog.showModal();
    }, 350); //
  };

  const handleSubmit = () => {
    const dialog = document.getElementById(
      "confirmation_modal_detail_transaction_modal"
    )! as HTMLDialogElement;
    dialog.close();
    const dialog2 = document.getElementById(
      "detail_transaction_modal"
    )! as HTMLDialogElement;
    dialog2.close();

    setTimeout(async () => {
      await updateTransactionReady(
        data.id_transaksi,
        data.customer.id_customer,
        data.jenis_pengiriman
      );
    }, 400); //
  };

  return (
    <>
      <dialog id="detail_transaction_modal" className="modal">
        <div className="modal-box w-1/2">
          <form method="dialog">
            {/* if there is a button in form, it will close the modal */}
            <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
              ✕
            </button>
          </form>
          <h3 className="font-bold text-lg mb-4 text-center">
            Transaction Details
          </h3>
          <div className="grid grid-cols-7">
            <p className="col-span-2 mb-4">Transaction ID</p>
            <p className="col-span-5 mb-4">: {data.id_transaksi}</p>
            <p className="col-span-2">Order Date</p>
            <p className="col-span-5">
              : {dateConverter(data.tanggal_nota_dibuat)}
            </p>
            <p className="col-span-2">Due Date</p>
            <p className="col-span-5">: {dateConverter(data.tanggal_ambil)}</p>
            <p className="col-span-2">Paid Date</p>
            <p className="col-span-5">
              : {dateConverter(data.pembayaran.tanggal_pembayaran)}
            </p>
            <p className="col-span-2">Confirm Date</p>
            <p className="col-span-5">
              : {dateConverter(data.pembayaran.tanggal_pembayaran_valid)}
            </p>
            <p className="col-span-2 mt-4">Customer</p>
            <p className="col-span-5 mt-4">: {data.customer.nama_customer}</p>
            <p className="col-span-2 ">Total</p>
            <p className="col-span-5 ">: {currencyConverter(data.total)}</p>
            <p className="col-span-2">Orders</p>
            <p className="col-span-5">:</p>
            {data.detail_transaksi.map((item) => (
              <p className="col-span-6 col-start-1 ml-3">
                - {item.produk.nama_produk} | {item.jumlah_item} pcs
              </p>
            ))}
          </div>
          <button
            className="btn btn-primary w-full mt-4"
            onClick={handleModalConfirmation}
          >
            Confirm
          </button>
        </div>
      </dialog>
      <ConfirmationModal
        onClick={handleSubmit}
        text="Are you sure want to update this transaction to ready?"
        uniqueId="detail_transaction_modal"
      />
    </>
  );
};

type ReadyDetailTransactionModalProps = {
  data: ITransaction;
};

export const ReadyDetailTransactionModal = ({
  data,
}: ReadyDetailTransactionModalProps) => {
  const handleModalConfirmation = () => {
    setTimeout(() => {
      const dialog = document.getElementById(
        "confirmation_modal_detail_transaction_ready_modal"
      )! as HTMLDialogElement;
      dialog.showModal();
    }, 350); //
  };

  const handleSubmit = () => {
    const dialog = document.getElementById(
      "confirmation_modal_detail_transaction_ready_modal"
    )! as HTMLDialogElement;
    dialog.close();
    const dialog2 = document.getElementById(
      "detail_transaction_ready_modal"
    )! as HTMLDialogElement;
    dialog2.close();

    setTimeout(async () => {
      await updateTransactionAfterReady(data.id_transaksi);
    }, 400); //
  };

  return (
    <>
      <dialog id="detail_transaction_ready_modal" className="modal">
        <div className="modal-box w-1/2">
          <form method="dialog">
            {/* if there is a button in form, it will close the modal */}
            <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
              ✕
            </button>
          </form>
          <h3 className="font-bold text-lg mb-4 text-center">
            Transaction Details
          </h3>
          <div className="grid grid-cols-7">
            <p className="col-span-2 mb-4">Transaction ID</p>
            <p className="col-span-5 mb-4">: {data.id_transaksi}</p>
            <p className="col-span-2">Order Date</p>
            <p className="col-span-5">
              : {dateConverter(data.tanggal_nota_dibuat)}
            </p>
            <p className="col-span-2">Due Date</p>
            <p className="col-span-5">: {dateConverter(data.tanggal_ambil)}</p>
            <p className="col-span-2 mt-4">Customer</p>
            <p className="col-span-5 mt-4">: {data.customer.nama_customer}</p>
            <p className="col-span-2">Phone</p>
            <p className="col-span-5">: {data.customer.no_telp}</p>

            <p className="col-span-2 mt-4">Delivery Method</p>
            <p className="col-span-5 mt-4">: {data.jenis_pengiriman}</p>
            {data.jenis_pengiriman === "Delivery" && (
              <>
                <p className="col-span-2">Delivery Range</p>
                <p className="col-span-5">
                  {`: ${data.pengiriman.jarak_pengiriman} km`}
                </p>
                <p className="col-span-2">Delivery Address</p>
                <p className="col-span-5">
                  {`: ${data.pengiriman.alamat_tujuan}`}
                </p>
              </>
            )}

            <p className="col-span-2 mt-4">Total</p>
            <p className="col-span-5 mt-4">: {currencyConverter(data.total)}</p>
            <p className="col-span-2 mt-4">Orders</p>
            <p className="col-span-5 mt-4">:</p>
            {data.detail_transaksi.map((item) => (
              <p className="col-span-6 col-start-1 ml-3">
                - {item.produk.nama_produk} | {item.jumlah_item} pcs
              </p>
            ))}
          </div>
          <button
            className="btn btn-primary w-full mt-4"
            onClick={handleModalConfirmation}
          >
            Confirm
          </button>
        </div>
      </dialog>
      <ConfirmationModal
        onClick={handleSubmit}
        text="Are you sure want to confirm this transaction?"
        uniqueId="detail_transaction_ready_modal"
      />
    </>
  );
};

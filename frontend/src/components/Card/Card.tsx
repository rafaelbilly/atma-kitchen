import { Box, Check, Truck } from "lucide-react";
import React, { useRef } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import ReactToPrint from "react-to-print";
import { IHampers } from "../../lib/interfaces/IHampers";
import { IProduct } from "../../lib/interfaces/IProducts";
import { ITransaction } from "../../lib/interfaces/ITransaction";
import { deleteHampers } from "../../lib/repository/HampersRepository";
import { deleteProduct } from "../../lib/repository/ProductRepository";
import { updateTransactionCompleted } from "../../lib/repository/TransactionRepository";
import { currencyConverter, dateConverter } from "../../lib/utils/converter";
import { TransactionStatusBadge } from "../Badge";
import { ProductWithImageList } from "../List/List";
import { ConfirmationModal, PayModal } from "../Modal";
import Invoice from "../invoice/Invoice";

type CardProductProps = {
  product: IProduct;
};

type CardHampersProps = {
  hampers: IHampers;
};

export const CardProduct: React.FC<CardProductProps> = ({ product }) => {
  const navigate = useNavigate();
  const location = useLocation();

  const handleEdit = () => {
    if (location.pathname.includes("admin/products")) {
      navigate(`/admin/products/edit/${product.id_produk}`);
    }
  };

  const handleDelete = (id: string) => {
    const modal = document.getElementById("my_modal_3") as HTMLDialogElement;
    if (modal) {
      modal.showModal();

      const confirmDeleteBtn = document.getElementById(
        "confirm_delete"
      ) as HTMLButtonElement;
      confirmDeleteBtn.addEventListener("click", () => {
        deleteProduct(id);
        console.log(`Deleting product with ID ${id}`);
        modal.close();
      });

      const cancelDeleteBtn = document.getElementById(
        "cancel_delete"
      ) as HTMLButtonElement;
      cancelDeleteBtn.addEventListener("click", () => {
        modal.close();
      });
    }
  };

  return (
    <div className="bg-white shadow-md rounded-lg overflow-hidden cursor-pointer">
      <div className="flex justify-center items-center">
        <img
          className="h-50 aspect-square object-cover "
          src={product.foto}
          alt={product.nama_produk}
        />
      </div>
      <div className="p-4">
        <h3 className="text-lg text-black font-medium">
          {product.nama_produk}
        </h3>
        <p className="text-gray-600">{currencyConverter(product.harga)}</p>
        <hr />
        <div className="flex justify-end p-1">
          <div className="dropdown dropdown-top dropdown-end">
            <div tabIndex={0} role="button" className="btn btn-sm m-1">
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
                className="lucide lucide-ellipsis"
              >
                <circle cx="12" cy="12" r="1" />
                <circle cx="19" cy="12" r="1" />
                <circle cx="5" cy="12" r="1" />
              </svg>
            </div>
            <ul
              tabIndex={0}
              className="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-52"
            >
              <li>
                <button onClick={handleEdit}>Edit</button>
              </li>
              <li>
                <a onClick={() => handleDelete(product.id_produk)}>Delete</a>
              </li>
            </ul>

            <dialog id="my_modal_3" className="modal" hidden>
              <div className="modal-box">
                <h3 className="font-bold text-lg">Confirmation</h3>
                <p className="py-4">
                  Are you sure you want to delete this products?
                </p>
                <div className="flex justify-end">
                  <form method="dialog" className="flex space-between gap-3">
                    <button id="cancel_delete">Cancel</button>
                    <button id="confirm_delete" className="btn btn-primary">
                      Delete
                    </button>
                  </form>
                </div>
              </div>
            </dialog>
          </div>
        </div>
      </div>
    </div>
  );
};

export const CardHampers = (props: CardHampersProps) => {
  const navigate = useNavigate();

  const handleEdit = () => {
    navigate(`/admin/hampers/edit/${props.hampers.hampers.id_produk}`);
  };

  const handleDelete = (id: string) => {
    const modal = document.getElementById(
      "delete_modal_hampers"
    ) as HTMLDialogElement;
    if (modal) {
      modal.showModal();

      const confirmDeleteBtn = document.getElementById(
        "confirm_delete"
      ) as HTMLButtonElement;
      confirmDeleteBtn.addEventListener("click", () => {
        deleteHampers(id);
        modal.close();
      });

      const cancelDeleteBtn = document.getElementById(
        "cancel_delete"
      ) as HTMLButtonElement;
      cancelDeleteBtn.addEventListener("click", () => {
        modal.close();
      });
    }
  };
  return (
    <div className="bg-white shadow-md rounded-lg overflow-hidden">
      <img
        className="w-full h-50 object-cover"
        src={props.hampers.hampers.foto}
        alt={props.hampers.hampers.nama_produk}
      />
      <div className="p-4">
        <h3 className="text-lg font-medium">
          {props.hampers.hampers.nama_produk}
        </h3>
        <p className="text-gray-600 mb-4">
          {currencyConverter(props.hampers.hampers.harga)}
        </p>
        <hr />
        <div className="flex justify-end p-1">
          <div className="dropdown dropdown-top dropdown-end">
            <div tabIndex={0} role="button" className="btn btn-sm m-1">
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
                className="lucide lucide-ellipsis"
              >
                <circle cx="12" cy="12" r="1" />
                <circle cx="19" cy="12" r="1" />
                <circle cx="5" cy="12" r="1" />
              </svg>
            </div>
            <ul
              tabIndex={0}
              className="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-52"
            >
              <li>
                <a onClick={() => handleEdit()}>Edit</a>
              </li>
              <li>
                <a
                  onClick={() => handleDelete(props.hampers.hampers.id_produk)}
                >
                  Delete
                </a>
              </li>
            </ul>

            <dialog id="delete_modal_hampers" className="modal" hidden>
              <div className="modal-box">
                <h3 className="font-bold text-lg">Confirmation</h3>
                <p className="py-4">
                  Are you sure you want to delete this products?
                </p>
                <div className="flex justify-end">
                  <form method="dialog" className="flex space-between gap-3">
                    <button id="cancel_delete">Cancel</button>
                    <button id="confirm_delete" className="btn btn-primary">
                      Delete
                    </button>
                  </form>
                </div>
              </div>
            </dialog>
          </div>
        </div>
      </div>
    </div>
  );
};

export const CardRecipe: React.FC<CardProductProps> = ({ product }) => {
  const navigate = useNavigate();

  const handleDetailRecipe = () => {
    navigate(`/admin/recipe/details/${product.id_produk}`);
  };

  return (
    <div
      className="bg-white shadow-md rounded-lg overflow-hidden"
      onClick={handleDetailRecipe}
      style={{ cursor: "pointer" }}
    >
      <img
        className="w-full h-50 object-cover"
        src={product.foto}
        alt={product.nama_produk}
      />
      <div className="p-4">
        <h3 className="text-lg font-medium">{product.nama_produk}</h3>
        <p className="text-gray-600 mb-4">{product.deskripsi}</p>
      </div>
    </div>
  );
};

type CardTransactionProps = {
  transaction: ITransaction;
};
export const CardTransaction: React.FC<CardTransactionProps> = ({
  transaction,
}) => {
  return (
    <div className="bg-white shadow-md rounded-lg overflow-hidden">
      <div className="h-40 overflow-auto px-4 pt-4">
        {transaction.detail_transaksi.map((transactionDetail) => (
          <h3 className="text-lg font-medium mb-4">
            {transactionDetail.produk.nama_produk}
          </h3>
        ))}
      </div>
      <hr />
      <div className="p-4">
        <p className="text-gray-600 mb-4">{transaction.tanggal_nota_dibuat}</p>
        <p className="text-gray-600 mb-4">{transaction.jenis_pengiriman}</p>
        {transaction.status_transaksi === "Diterima" ? (
          <div className="badge badge-info">{transaction.status_transaksi}</div>
        ) : transaction.status_transaksi === "Ditolak" ? (
          <div className="badge badge-error">
            {transaction.status_transaksi}
          </div>
        ) : transaction.status_transaksi === "Diproses" ? (
          <div className="badge badge-warning">
            {transaction.status_transaksi}
          </div>
        ) : transaction.status_transaksi === "Selesai" ? (
          <div className="badge badge-success">
            {transaction.status_transaksi}
          </div>
        ) : (
          <div className="badge badge-default">
            {transaction.status_transaksi}
          </div>
        )}
      </div>
    </div>
  );
};

export const CardHistory = (props: CardTransactionProps) => {
  const navigate = useNavigate();

  const handleDetailOrder = () => {
    navigate(`/details-order/${props.transaction.id_transaksi}`);
  };

  return (
    <div className="card mt-5 w-full bg-base-100 relative">
      <div className="card-body border p-4">
        <div className="flex gap-2 items-center">
          <TransactionStatusBadge status={props.transaction.status_transaksi} />
          <p className="text-gray-500">
            {dateConverter(props.transaction.tanggal_nota_dibuat)}
          </p>
          <p className="text-right text-gray-500">
            {props.transaction.id_transaksi}
          </p>
        </div>
        <hr className="my-1 border-t-[1px] border-primary" />
        <div className="flex items-center">
          <div className="flex items-center">
            <Box size={16} className="text-primary mr-1" />
            <p className="">
              {props.transaction.detail_transaksi.length} items |
            </p>
          </div>
          <div className="flex items-center ml-1">
            <Truck size={16} className="text-secondary mr-1" />
            <p>{props.transaction.jenis_pengiriman}</p>
          </div>
        </div>
        <div>
          {props.transaction.detail_transaksi?.slice(0, 3).map((item) => (
            <ProductWithImageList detailTransaction={item} />
          ))}
        </div>
        {props.transaction.detail_transaksi.length > 3 && (
          <p className="text-center text-sm text-gray-500">
            And {props.transaction.detail_transaksi.length - 3} others..
          </p>
        )}
        <div className="mt-4 flex justify-between items-center">
          <div>
            <p className="text-gray-500 text-sm">Total Purchases</p>
            <h2 className="text-xl font-bold">
              {currencyConverter(props.transaction.total)}
            </h2>
          </div>
          <button
            className="btn btn-sm btn-primary px-6"
            onClick={() => handleDetailOrder()}
          >
            Details
          </button>
        </div>
      </div>
    </div>
  );
};

export const OrderDetailsCard = (props: CardTransactionProps) => {
  const navigate = useNavigate();
  const handleOpenModal = () => {
    const dialog = document.getElementById(
      "pay_modal"
    ) as HTMLDialogElement | null;

    if (dialog) {
      dialog.showModal();
    }
  };

  const openConfirmationModal = () => {
    const dialog = document.getElementById(
      "confirmation_modal_detail_transaction"
    ) as HTMLDialogElement;

    dialog.showModal();
  };

  const handleSubmit = async (id: string) => {
    await updateTransactionCompleted(id);
    const dialog = document.getElementById(
      "confirmation_modal_detail_transaction"
    ) as HTMLDialogElement;
    dialog.close();
    navigate("/u/transactions");
  };

  const componentRef = useRef<HTMLDivElement>(null);

  return (
    <>
      <div className="card mt-5 w-full bg-base-100 relative">
        <div className="card-body border p-4">
          <div className="flex gap-2 items-center justify-between">
            <TransactionStatusBadge
              status={props.transaction.status_transaksi}
            />
            {props.transaction.status_transaksi === "Delivered" && (
              <button
                className="btn btn-primary btn-sm"
                onClick={openConfirmationModal}
              >
                <div className="flex">
                  <span>Mark as Done</span>
                  <Check size={16} className="ml-1" />
                </div>
              </button>
            )}
          </div>
          <hr className="my-1 border-t-[1px]" />
          <div className="flex justify-between items-center">
            <p className="text-left text-gray-500">Order ID</p>
            <p className="text-right text-gray-500">
              {props.transaction.id_transaksi}
            </p>
          </div>
          <div className="flex justify-between items-center">
            <p className="text-left text-gray-500">Order Date</p>
            <p className="text-right text-gray-500">
              {props.transaction.tanggal_nota_dibuat}
            </p>
          </div>
          <div className="flex items-center mt-4">
            <h3 className="text-lg font-bold">Product Details</h3>
          </div>
          <div>
            {props.transaction.detail_transaksi?.slice(0, 3).map((item) => (
              <ProductWithImageList detailTransaction={item} />
            ))}
          </div>
          <div className="mt-4">
            <h3 className="text-lg font-bold">Point</h3>
            <div className="flex justify-between items-center">
              <p className="text-left text-gray-500">Points Earned</p>
              <p className="text-right text-gray-500">
                {props.transaction.poin_diperoleh}
              </p>
            </div>
          </div>
          {props.transaction && props.transaction.pengiriman && (
            <div className="mt-4">
              <h3 className="text-lg font-bold">Delivery Information</h3>
              <div className="flex justify-between items-center">
                <p className="text-left text-gray-500">Courier Name</p>
                <p className="text-right text-gray-500">
                  {props.transaction.pengiriman.kurir}
                </p>
              </div>
              <div className="flex justify-between items-center">
                <p className="text-left text-gray-500">Destination Address</p>
                <p className="text-right text-gray-500">
                  {props.transaction.pengiriman.alamat_tujuan ?? "-"}
                </p>
              </div>
              <div className="flex justify-between items-center">
                <p className="text-left text-gray-500">Distance</p>
                <p className="text-right text-gray-500">
                  {props.transaction.pengiriman.jarak_pengiriman} Km
                </p>
              </div>
            </div>
          )}
          <div className="mt-4">
            <h3 className="text-lg font-bold">Payment Details</h3>
            <div className="flex justify-between items-center">
              <p className="text-left text-gray-500">Payment Method</p>
              <p className="text-right text-gray-500">
                {props.transaction.pembayaran.jenis_pembayaran}
              </p>
            </div>
            <div className="flex justify-between items-center">
              <p className="text-left text-gray-500">Total Order</p>
              <p className="text-right text-gray-500">
                {currencyConverter(
                  props.transaction.detail_transaksi.reduce(
                    (total, item) =>
                      total + item.produk.harga * item.jumlah_item,
                    0
                  )
                )}
              </p>
            </div>
            {props.transaction && props.transaction.pengiriman && (
              <div className="flex justify-between items-center">
                <p className="text-left text-gray-500">Delivery Cost</p>
                <p className="text-right text-gray-500">
                  {currencyConverter(
                    props.transaction.pengiriman.biaya_pengiriman
                  )}
                </p>
              </div>
            )}
            <div className="flex justify-between items-center">
              <p className="text-left text-gray-500">Poin Used</p>
              <p className="text-right text-gray-500">
                {props.transaction.poin_digunakan} points ( -{" "}
                {currencyConverter(props.transaction.poin_digunakan * 100)})
              </p>
            </div>
            <hr className="my-1 border-t-[1px]" />
            <div className="flex justify-between items-center">
              <p className="text-left  font-bold">Total</p>
              <p className="text-right text-gray-500">
                {currencyConverter(props.transaction.total)}
              </p>
            </div>
            {props.transaction &&
              props.transaction.pembayaran.bukti_pembayaran && (
                <div className="flex justify-between items-center">
                  <p className="text-left text-gray-500">Tip</p>
                  <p className="text-right text-gray-500">
                    {currencyConverter(props.transaction.pembayaran.tip)}
                  </p>
                </div>
              )}
          </div>
          <div className="mt-4 flex justify-between items-center">
            {props.transaction &&
              props.transaction.status_transaksi === "Unpaid" && (
                <div>
                  <button
                    className="btn btn-sm btn-primary flex items-center"
                    onClick={handleOpenModal}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="18"
                      height="18"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="lucide lucide-badge-dollar-sign"
                    >
                      <path d="M3.85 8.62a4 4 0 0 1 4.78-4.77 4 4 0 0 1 6.74 0 4 4 0 0 1 4.78 4.78 4 4 0 0 1 0 6.74 4 4 0 0 1-4.77 4.78 4 4 0 0 1-6.75 0 4 4 0 0 1-4.78-4.77 4 4 0 0 1 0-6.76Z" />
                      <path d="M16 8h-6a2 2 0 1 0 0 4h4a2 2 0 1 1 0 4H8" />
                      <path d="M12 18V6" />
                    </svg>
                    Pay Bills
                  </button>
                </div>
              )}
            <div>
              <ReactToPrint
                trigger={() => (
                  <button className="btn btn-sm btn-primary flex items-center">
                    {" "}
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="18"
                      height="18"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="lucide lucide-printer mr-2"
                    >
                      <path d="M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2" />
                      <path d="M6 9V3a1 1 0 0 1 1-1h10a1 1 0 0 1 1 1v6" />
                      <rect x="6" y="14" width="12" height="8" rx="1" />
                    </svg>
                    Print Invoice
                  </button>
                )}
                content={() => componentRef.current}
              />
            </div>
          </div>
        </div>
        <PayModal data={props.transaction.pembayaran} />

        <div className="hidden">
          <Invoice ref={componentRef} data={props.transaction} />
        </div>
      </div>
      <ConfirmationModal
        uniqueId="detail_transaction"
        onClick={() => handleSubmit(props.transaction.id_transaksi)}
        text="Are you sure you want to mark this transaction as done?"
      />
    </>
  );
};

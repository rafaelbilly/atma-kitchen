import { Info } from "lucide-react";
import { useState } from "react";
import { ProductWithImageListCart } from "../../../components/List/List";
import { NavWrapper } from "../../../components/Wrapper";
import { getAddress } from "../../../lib/repository/AddressRepository";
import { getCart } from "../../../lib/repository/CartRepository";
import { getProfileCustomer } from "../../../lib/repository/ProfileRepository";
import { currencyConverter, dateConverter } from "../../../lib/utils/converter";
import { toast } from "sonner";
import { addTransaction } from "../../../lib/repository/TransactionRepository";
import { useNavigate } from "react-router-dom";
import { ConfirmationModal } from "../../../components/Modal";

export default function Checkout() {
  const navigate = useNavigate();
  const { data, isLoading } = getAddress();
  const [selectedAddress, setSelectedAddress] = useState(0);
  const { data: cartData, isLoading: cartIsLoading } = getCart(
    localStorage.getItem("cartDate") || new Date().toISOString()
  );
  const { data: customerData, isLoading: customerIsLoading } =
    getProfileCustomer();
  const [isDelivery, setIsDelivery] = useState(true);
  const [points, setPoints] = useState<number>(0);
  const [paymentMethod, setPaymentMethod] = useState<string>("");

  const handleModalConfirmation = () => {
    if (selectedAddress === 0 && isDelivery) {
      toast.info("Please select an address");
      return;
    }
    if (points > customerData.poin) {
      toast.info("You don't have enough points to use");
      return;
    }
    if (paymentMethod === "") {
      toast.info("Please select a payment method");
      return;
    }
    setTimeout(() => {
      const dialog = document.getElementById(
        "confirmation_modal_checkout"
      )! as HTMLDialogElement;
      dialog.showModal();
    }, 300); //
  };

  const handleCheckout = async () => {
    const dataSend = {
      tanggal_ambil:
        localStorage.getItem("cartDate") || new Date().toISOString(),
      poin_digunakan: points,
      jenis_pengiriman: isDelivery ? "Delivery" : "Pickup",
      id_customer: customerData.id_customer,
      jenis_pembayaran: paymentMethod,
      alamat_tujuan: data.find(
        (address) => address.id_alamat === selectedAddress
      )?.alamat,
    };
    await addTransaction(dataSend);
    const dialog = document.getElementById(
      "confirmation_modal_checkout"
    )! as HTMLDialogElement;
    dialog.close();
    navigate("/u/transactions");
  };

  return (
    <NavWrapper>
      <div className="pt-24">
        <h2 className="font-serif text-3xl font-bold">Confirm Order</h2>
        <div className="grid grid-cols-12 gap-4 mt-4">
          <div className="col-span-8">
            {isLoading ? (
              <>
                <div className="skeleton h-40 w-full"></div>
              </>
            ) : (
              <>
                <div className="bg-gray-100 px-8 py-4 rounded-lg h-fit">
                  <div className="flex gap-4 items-center">
                    <h5 className="text-xl font-bold text-primary">
                      {isDelivery ? "Delivery" : "Pickup"}
                    </h5>
                    <input
                      type="checkbox"
                      className="toggle toggle-md toggle-primary"
                      onClick={() => setIsDelivery(!isDelivery)}
                    />
                  </div>
                  <div className="flex mt-1">
                    <Info className="text-gray-400 mr-2" size={16} />
                    <p className="text-xs text-gray-400">
                      You can switch the button to change the delivery method
                    </p>
                  </div>
                  <div className={`${isDelivery ? "block" : "hidden"} `}>
                    <h6 className="font-bold mt-4">Address Label :</h6>
                    <select
                      className="select select-bordered w-full max-w-xs "
                      value={selectedAddress}
                      onChange={(e) =>
                        setSelectedAddress(Number(e.target.value))
                      }
                    >
                      <option value={0}>Select an address</option>
                      {data.map((address) => (
                        <option
                          key={address.id_alamat}
                          value={address.id_alamat}
                        >
                          {address.label_alamat}
                        </option>
                      ))}
                    </select>
                    {selectedAddress !== 0 && (
                      <>
                        <h6 className="font-bold mt-4">Detail Address :</h6>
                        <p>
                          {
                            data.find(
                              (address) => address.id_alamat === selectedAddress
                            )?.alamat
                          }
                        </p>
                      </>
                    )}
                  </div>
                </div>
              </>
            )}

            {cartIsLoading ? (
              <div className="skeleton h-80 w-full mt-4"></div>
            ) : (
              <div className="bg-gray-100 px-8 py-4 rounded-lg h-fit mt-4">
                <h5 className="text-xl font-bold text-primary mb-4">
                  Order Details
                </h5>
                {cartData.map((cart) => (
                  <ProductWithImageListCart
                    carts={cart}
                    key={cart.id_keranjang}
                  />
                ))}
              </div>
            )}
          </div>
          <div className="col-span-4">
            {cartIsLoading || customerIsLoading ? (
              <div className="skeleton h-[500px] w-full"></div>
            ) : (
              <>
                <div className="bg-gray-100 px-8 py-4">
                  <h5 className="text-xl font-bold text-primary">
                    Order Summary
                  </h5>
                  <div className="flex justify-between mt-2">
                    <p className="">Due Date</p>
                    <p className="">
                      {dateConverter(
                        localStorage.getItem("cartDate") ||
                          new Date().toISOString()
                      )}
                    </p>
                  </div>
                  <div className="flex justify-between mt-2">
                    <p className="">Total Item</p>
                    <p className="">{cartData.length}</p>
                  </div>

                  <hr className="my-2" />
                  <div className="flex justify-between mt-2">
                    <p className="">Total</p>
                    <p className="">
                      {currencyConverter(
                        cartData.reduce(
                          (acc, cart) =>
                            acc +
                            cart.jumlah_item_keranjang * cart.produk.harga,
                          0
                        )
                      )}
                    </p>
                  </div>
                  <div className="flex mt-1">
                    <Info className="text-gray-400 mr-2" size={30} />
                    <p className="text-xs text-gray-400">
                      This amount is not your final payment. The final amount
                      will be determined once we have the range information.
                    </p>
                  </div>
                  <hr className="my-2" />
                  <h5 className="text-xl font-bold ">Points</h5>
                  <div className="flex justify-between mt-2">
                    <p className="">Points in posessions</p>
                    <p className="text-secondary text-sm">
                      {customerData.poin} points
                    </p>
                  </div>
                  <div className="flex justify-between items-center">
                    <p className="">Use Poin</p>
                    <input
                      type="number"
                      className="input input-bordered input-sm max-w-xs w-1/3"
                      placeholder="Enter points"
                      value={points}
                      onChange={(e) => setPoints(Number(e.target.value))}
                    />
                  </div>
                  <div className="flex mt-1">
                    <Info className="text-gray-400 mr-2" size={16} />
                    <p className="text-xs text-gray-400">
                      You can use your points to reduce the total amount of your
                      order. 1 point is equal to Rp100
                    </p>
                  </div>
                  <hr className="my-2" />
                  <h5 className="text-xl font-bold ">Payment Method</h5>
                  <div className="flex justify-between mt-2 items-center">
                    <p className="">Method</p>
                    <select
                      className="select select-bordered select-sm max-w-xs "
                      value={paymentMethod}
                      onChange={(e) => setPaymentMethod(e.target.value)}
                    >
                      <option value="">Select an Method</option>
                      <option value="Transfer">Bank Transfer</option>
                      <option value="Cash">Cash</option>
                    </select>
                  </div>
                  <button
                    className="btn btn-primary mt-8 w-full"
                    onClick={handleModalConfirmation}
                  >
                    Checkout
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      </div>

      <ConfirmationModal
        onClick={handleCheckout}
        uniqueId="checkout"
        text="Are you sure want to checkout this cart?"
      />
    </NavWrapper>
  );
}

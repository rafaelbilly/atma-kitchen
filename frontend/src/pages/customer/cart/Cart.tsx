import { NavWrapper } from "../../../components/Wrapper";
import {
  currencyConverter,
  dateConverterISO,
} from "../../../lib/utils/converter";
import { CartTable } from "../../../components/Table/Table";
import {
  decrementCart,
  deleteCart,
  getCart,
  incrementCart,
} from "../../../lib/repository/CartRepository";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export const Cart = () => {
  const navigate = useNavigate();
  const dateNow = new Date();

  const currentDate = dateConverterISO(dateNow.toISOString());
  const nextMonth = dateConverterISO(
    new Date(dateNow.setMonth(dateNow.getMonth() + 1)).toISOString()
  );
  const [date, setDate] = useState(
    localStorage.getItem("cartDate") || currentDate
  );

  const { data, isLoading, isValidating } = getCart(date);

  return (
    <NavWrapper>
      <div className="pt-32">
        <input
          type="date"
          className="border-2 border-primary rounded bg-primary-lighter px-4 py-2"
          min={currentDate}
          max={nextMonth}
          value={date}
          onChange={(e) => setDate(e.target.value)}
        />
        {isLoading || isValidating ? (
          <div className="w-full py-16 flex justify-center items-center">
            <span className="loading loading-dots loading-md"></span>
          </div>
        ) : data.length > 0 ? (
          <CartTable
            cartData={data}
            onAdd={incrementCart}
            onMinus={decrementCart}
            onRemove={deleteCart}
          />
        ) : (
          <div className="w-full py-16 flex justify-center items-center">
            <p className="text-center text-gray-400">
              There is no item in cart
            </p>
          </div>
        )}
      </div>
      {!isLoading && !isValidating && data.length > 0 && (
        <div className="flex justify-end items-center mb-4">
          <span className="text-xl font-bold font-serif mr-4">Total</span>
          <span className="">
            {currencyConverter(
              data.reduce(
                (total, item) =>
                  total + item.produk.harga * item.jumlah_item_keranjang,
                0
              )
            )}
          </span>
          <button
            className="btn btn-primary ml-4"
            onClick={() => {
              localStorage.setItem("cartDate", date);
              navigate("/u/checkout");
            }}
          >
            Checkout
          </button>
        </div>
      )}
    </NavWrapper>
  );
};

import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "sonner";
import { NavWrapper } from "../../../components/Wrapper";
import { IProduct } from "../../../lib/interfaces/IProducts";
import { addCart } from "../../../lib/repository/CartRepository";
import {
  getProductsById,
  getRandomProducts,
} from "../../../lib/repository/ProductRepository";
import {
  currencyConverter,
  dateConverterISO,
} from "../../../lib/utils/converter";

export default function DetailProduct() {
  const [date, setDate] = React.useState(
    dateConverterISO(new Date().toISOString())
  );
  const isLogin = localStorage.getItem("token");
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const { data, isValidating, isLoading } = getProductsById(id!, date);
  const { data: randomProducts } = getRandomProducts();
  const today = new Date();
  const nextMonth = new Date(
    today.getFullYear(),
    today.getMonth() + 1,
    today.getDate()
  );
  const todayStr = dateConverterISO(today.toISOString());
  const nextMonthStr = dateConverterISO(nextMonth.toISOString());

  const handleCardClick = (id: string) => {
    navigate(`/detail-product/${id}`);
  };

  const [qty, setQty] = useState(0);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setDate(e.target.value);
  };

  const handleSubmit = async () => {
    if (qty > data.stok || qty < 1) {
      toast.error("Cannot purchase more than available stock!");
      return;
    }
    addCart(data.id_produk, qty, date);
  };

  return (
    <NavWrapper>
      {isLoading || isValidating ? (
        <div className="w-full py-96 flex justify-center items-center">
          <span className="loading loading-dots loading-md"></span>
        </div>
      ) : (
        <aside className="mt-20">
          <div className="flex flex-row px-40">
            <div className="w-1/2 p-4 pt-5">
              <img
                src={data.foto}
                alt={data.nama_produk}
                className="w-full max-h-full"
              />
            </div>
            <div className="w-1/2 p-4 pt-5 ml-10">
              <h1 className="text-4xl font-serif font-bold mb-4">
                {data.nama_produk}
              </h1>
              <p className="text-xl text-secondary font-bold mb-4">
                {currencyConverter(data.harga)}
              </p>
              <p className="text-base mb-4">{data.deskripsi}</p>
              <div>
                {data.nama_produk?.toLowerCase().includes("paket") && (
                  <>
                    <h3 className="text-lg font-semibold mb-2">Includes:</h3>
                    {data.items?.map((item: IProduct) => (
                      <div
                        className="card card-side cursor-pointer"
                        key={item.id_produk}
                        onClick={() => handleCardClick(item.id_produk)}
                      >
                        <figure className="max-w-16">
                          <img src={item.foto} alt={item.nama_produk} />
                        </figure>
                        <div className="card-body p-5">
                          <h2 className="card-title text-lg">
                            {item.nama_produk}
                          </h2>
                        </div>
                      </div>
                    ))}
                  </>
                )}
              </div>

              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  handleSubmit();
                }}
              >
                <input
                  type="date"
                  className="input input-bordered w-full max-w-xs mb-4 mt-4"
                  max={nextMonthStr}
                  min={todayStr}
                  onChange={handleChange}
                  value={date}
                />
                <div className="flex flex-row items-center mb-4">
                  <input
                    type="number"
                    placeholder="Input the purchase amount"
                    className="input input-bordered w-full max-w-xs"
                    value={qty}
                    onChange={(e) => setQty(parseInt(e.target.value))}
                    required
                  />
                  <p className="text-center ms-5">Stok: {data.stok}</p>
                </div>
                <div className="flex space-x-4 mt-10">
                  {isLogin && (
                    <button
                      className="btn btn-primary btn-xs sm:btn-sm md:btn-md lg:btn-lg"
                      type="submit"
                    >
                      Add to Cart
                    </button>
                  )}
                </div>
              </form>
            </div>
          </div>
          <div className="flex justify-center my-20 mx-44">
            <hr className="w-full border-t-1 border-black" />
          </div>
          <div className="w-full px-44 my-20">
            <h1 className="text-4xl font-serif font-bold mb-10 text-center">
              Products That You Might Like
            </h1>
            <div className="grid grid-cols-4 gap-6">
              {randomProducts?.slice(0, 4).map((product) => (
                <div
                  className="card bg-base-100 cursor-pointer"
                  key={product.id_produk}
                  onClick={() => handleCardClick(product.id_produk)}
                >
                  <figure>
                    <img src={product.foto} alt={product.nama_produk} />
                  </figure>
                  <div className="card-body text-center bg-white">
                    <h2 className="card-title justify-center">
                      {product.nama_produk}
                    </h2>
                    <p>{currencyConverter(product.harga)}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </aside>
      )}
    </NavWrapper>
  );
}

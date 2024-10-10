import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { NavWrapper } from "../../../components/Wrapper";
import {
  getAllProcuts,
  getTopProducts,
} from "../../../lib/repository/ProductRepository";
import { currencyConverter } from "../../../lib/utils/converter";

export default function ListProduct() {
  const navigate = useNavigate();
  const { data: products, isLoading } = getAllProcuts();
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [search, setSearch] = React.useState("");

  const { data: topProducts, isLoading: topProductsLoading } = getTopProducts();

  const filteredProducts = products?.filter(
    (product) =>
      (!selectedCategory || product.jenis_produk === selectedCategory) &&
      product.nama_produk.toLowerCase().includes(search.toLowerCase())
  );

  const handleCategoryClick = (category: string) => {
    setSelectedCategory(category);
  };

  const handleCardClick = (id: string) => {
    navigate(`/detail-product/${id}`);
  };

  return (
    <NavWrapper>
      <aside className="flex flex-row max-w-7xl py-20">
        <div className="w-1/4 p-4 pt-3">
          <div className="card p-4">
            <label className="input input-bordered flex items-center gap-2 mb-4 w-full">
              <input
                type="text"
                className="grow"
                placeholder="Search"
                onChange={(e) => setSearch(e.target.value)}
              />
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 16 16"
                fill="currentColor"
                className="w-4 h-4 opacity-70"
              >
                <path
                  fillRule="evenodd"
                  d="M9.965 11.026a5 5 0 1 1 1.06-1.06l2.755 2.754a.75.75 0 1 1-1.06 1.06l-2.755-2.754ZM10.5 7a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0Z"
                  clipRule="evenodd"
                />
              </svg>
            </label>
          </div>
          <div className="card">
            <div className="card-body">
              <h3 className="pb-2 text-lg font-bold">Category Product</h3>
              <div className="pb-2">
                <div className="flex flex-wrap gap-2">
                  <button
                    className={`btn ${
                      selectedCategory === "Cake"
                        ? "btn-primary"
                        : "border-t-secondary-light"
                    }`}
                    onClick={() => handleCategoryClick("Cake")}
                  >
                    Cake
                  </button>
                  <button
                    className={`btn ${
                      selectedCategory === "Bread"
                        ? "btn-primary"
                        : "border-t-secondary-light"
                    }`}
                    onClick={() => handleCategoryClick("Roti")}
                  >
                    Bread
                  </button>
                  <button
                    className={`btn ${
                      selectedCategory === "Drink"
                        ? "btn-primary"
                        : "border-t-secondary-light"
                    }`}
                    onClick={() => handleCategoryClick("Minuman")}
                  >
                    Drink
                  </button>
                  <button
                    className={`btn ${
                      selectedCategory === "Snack"
                        ? "btn-primary"
                        : "border-t-secondary-light"
                    }`}
                    onClick={() => handleCategoryClick("Snack")}
                  >
                    Snack
                  </button>
                  <button
                    className={`btn ${
                      selectedCategory === "Hampers"
                        ? "btn-primary"
                        : "border-t-secondary-light"
                    }`}
                    onClick={() => handleCategoryClick("Hampers")}
                  >
                    Hampers
                  </button>
                </div>
              </div>
            </div>
          </div>

          <div>
            {!topProductsLoading &&
              topProducts?.map((product) => (
                <div
                  className="card card-side cursor-pointer"
                  key={product.id_produk}
                  onClick={() => handleCardClick(product.id_produk)}
                >
                  <figure className="ml-8 max-w-16">
                    <img src={product.foto} alt={product.nama_produk} />
                  </figure>
                  <div className="card-body">
                    <h2 className="card-title text-lg">
                      {product.nama_produk}
                    </h2>
                    <p className="text-secondary-dark">
                      {currencyConverter(product.harga)}
                    </p>
                  </div>
                </div>
              ))}
          </div>
        </div>

        <div className="w-3/4 p-4">
          <div className="grid grid-cols-3 gap-5">
            {isLoading ? (
              <span className="col-span-3 loading loading-dots loading-md mx-auto mt-64"></span>
            ) : (
              filteredProducts.map((product, index) => (
                <div
                  className="card bg-base-100 cursor-pointer"
                  key={index}
                  onClick={() => handleCardClick(product.id_produk)}
                >
                  <figure>
                    <img src={product.foto} alt={product.nama_produk} />
                  </figure>
                  <div className="card-body text-center bg-white">
                    <h2 className="card-title justify-center">
                      {product.nama_produk}
                    </h2>
                    <p className="text-secondary-dark">
                      {currencyConverter(product.harga)}
                    </p>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </aside>
    </NavWrapper>
  );
}

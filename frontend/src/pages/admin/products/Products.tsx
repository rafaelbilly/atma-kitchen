import React, { useState } from "react";
import { Link } from "react-router-dom";
import { CardProduct } from "../../../components/Card/Card";
import { AdminWrapper } from "../../../components/Wrapper";
import { IProduct } from "../../../lib/interfaces/IProducts";
import { getAllProcuts } from "../../../lib/repository/ProductRepository";

const Products: React.FC = () => {
  //API CALL
  const { data, error, isLoading } = getAllProcuts();

  const [search, setSearch] = React.useState("");

  const dataFiltered = data?.filter((item: IProduct) => {
    return item.nama_produk.toLowerCase().includes(search.toLowerCase());
  });

  const [selectedTab, setSelectedTab] = useState<string>("all");

  const filteredProducts = dataFiltered?.filter((item) => {
    if (selectedTab === "my") {
      return item.id_penitip === null;
    } else if (selectedTab === "consignment") {
      return item.id_penitip !== null;
    }
    return true;
  });

  const AddProductButton = () => {
    if (selectedTab === "my") {
      return (
        <div className="flex justify-center mt-8 mb-4">
          <Link to="/admin/products/add">
            <button className="btn btn-primary">Add My Product</button>
          </Link>
        </div>
      );
    } else if (selectedTab === "consignment") {
      return (
        <div className="flex justify-center mt-8 mb-4">
          <Link to="/admin/consignment/add">
            <button className="btn btn-primary">Add Consignment Product</button>
          </Link>
        </div>
      );
    }
    return null;
  };

  return (
    <>
      <AdminWrapper>
        <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <h2 className="text-title-xl font-serif font-bold text-black">
            Atma Kitchen Products
          </h2>
        </div>

        <div className="flex justify-between">
          <label className="input input-bordered flex items-center gap-2 w-1/3 mb-4">
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

          <div className="flex justify-end mb-3">
            <div role="tablist" className="tabs tabs-boxed">
              <button
                role="tab"
                className={`tab ${selectedTab === "all" ? "tab-active" : ""}`}
                onClick={() => setSelectedTab("all")}
              >
                All Products
              </button>
              <button
                role="tab"
                className={`tab ${selectedTab === "my" ? "tab-active" : ""}`}
                onClick={() => setSelectedTab("my")}
              >
                My Products
              </button>
              <button
                role="tab"
                className={`tab ${
                  selectedTab === "consignment" ? "tab-active" : ""
                }`}
                onClick={() => setSelectedTab("consignment")}
              >
                Consignment
              </button>
            </div>
          </div>
        </div>
        {isLoading && (
          <div className="w-full mt-64 flex justify-center items-center">
            <span className="loading loading-dots loading-md"></span>
          </div>
        )}
        {error && <div>Error</div>}
        {data && (
          <div className="rounded-sm border border-stroke bg-white shadow-default">
            <div className="flex flex-wrap items-center">
              {filteredProducts.map((product) => (
                <div
                  key={product.id_produk}
                  className="w-full sm:w-1/2 md:w-1/4 p-4"
                >
                  <CardProduct product={product} />
                </div>
              ))}
            </div>
          </div>
        )}
        {AddProductButton()}
      </AdminWrapper>
    </>
  );
};

export default Products;

import React from "react";
import { Link } from "react-router-dom";
import { CardHampers } from "../../../components/Card/Card";
import { AdminWrapper } from "../../../components/Wrapper";
import { IHampers } from "../../../lib/interfaces/IHampers";
import { getAllHampers } from "../../../lib/repository/HampersRepository";

const Hampers: React.FC = () => {
  //API CALL
  const { data, error, isLoading } = getAllHampers();

  const [search, setSearch] = React.useState("");

  const dataFiltered = data?.filter((item: IHampers) => {
    return item.hampers.nama_produk
      .toLowerCase()
      .includes(search.toLowerCase());
  });

  return (
    <>
      <AdminWrapper>
        <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <h2 className="text-title-xl font-serif font-bold text-black">
            Atma Kitchen Hampers
          </h2>
        </div>

        <div className="flex mt-4 mb-4 justify-between">
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
          <Link to="/admin/hampers/add">
            <button className="btn btn-primary">Add New Hampers</button>
          </Link>
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
              {dataFiltered.map((hampers) => (
                <div
                  key={hampers.hampers.id_produk}
                  className="w-full sm:w-1/2 md:w-1/4 p-4"
                >
                  <CardHampers hampers={hampers} />
                </div>
              ))}
            </div>
          </div>
        )}
      </AdminWrapper>
    </>
  );
};

export default Hampers;

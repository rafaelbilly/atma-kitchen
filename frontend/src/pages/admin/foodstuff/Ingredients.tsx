import React from "react";
import { AdminWrapper } from "../../../components/Wrapper";
import { IngredientsTable } from "../../../components/Table/Table";
import { getAllIngredients } from "../../../lib/repository/IngredientsRepository";
import { IIngredients } from "../../../lib/interfaces/IIngredients";
import { useNavigate } from "react-router-dom";

const Ingredients: React.FC = () => {
  //API CALL
  const { data, error, isLoading } = getAllIngredients();
  const [search, setSearch] = React.useState("");

  const dataFiltered = data?.filter((item: IIngredients) => {
    return item.nama_bahan_baku.toLowerCase().includes(search.toLowerCase());
  });

  const navigate = useNavigate();

  return (
    <>
      <AdminWrapper>
        <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <h2 className="text-title-xl font-serif font-bold text-black">
            Atma Kitchen Ingredients
          </h2>
        </div>
        <div className="flex justify-between ">
          <label className="input input-bordered flex items-center gap-2 w-1/3">
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
          <a
            className="btn btn-primary mb-4"
            onClick={() => navigate("/admin/ingredients/add")}
          >
            Add New Ingredients
          </a>
        </div>
        {isLoading && (
          <div className="w-full mt-64 flex justify-center items-center">
            <span className="loading loading-dots loading-md"></span>
          </div>
        )}
        {error && <div>Error</div>}
        {data && (
          <div className="rounded-sm border border-stroke bg-white shadow-default p-4 overflow-x-auto">
            <IngredientsTable ingredientsData={dataFiltered} />
          </div>
        )}
      </AdminWrapper>
    </>
  );
};

export default Ingredients;

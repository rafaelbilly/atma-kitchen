import { useEffect, useRef } from "react";
import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";
import "react-datepicker/dist/react-datepicker.css";
import ReactToPrint from "react-to-print";
import { OwnerWrapper } from "../../../components/Wrapper";
import { getAllIngredients } from "../../../lib/repository/IngredientsRepository";

const IngredientsStockOwner: React.FC = () => {
  //data handling
  const { data, isLoading, isValidating } = getAllIngredients();

  const componentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const style = document.createElement("style");
    style.innerHTML = `
        @media print {
            .no-print {
                display: none !important;
            }
        }
    `;
    document.head.appendChild(style);
    return () => {
      document.head.removeChild(style);
    };
  }, []);

  return (
    <OwnerWrapper>
      <div ref={componentRef}>
        <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <h2 className="text-title-xl font-serif font-bold text-black">
            Ingredients Stock
          </h2>
        </div>
        <div className="card w-full bg-white shadow-xl border col-span-3 px-8 py-4 min-h-40">
          <div className="flex items-center w-fit">
            <div>
              <span className="text-gray-400 text-sm">Periode</span>
            </div>
          </div>
          <div className="mt-2">
            <span className="text-gray-500">
              Tanggal Cetak: {new Date().toLocaleDateString("id-ID")}
            </span>
          </div>
          <ReactToPrint
            trigger={() => (
              <button className="btn mt-3 ml-auto flex items-center btn-primary no-print">
                {" "}
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="22"
                  height="22"
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
              </button>
            )}
            content={() => componentRef.current}
          />

          <div className="mt-4">
            {isLoading || isValidating ? (
              <div className="flex mt-4">
                <span className="loading loading-dots loading-md mx-auto"></span>
              </div>
            ) : data?.length === 0 ? (
              <div className="flex mt-4">
                <span className="mx-auto text-center text-gray-400">
                  No data available
                </span>
              </div>
            ) : (
              <>
                <div className="overflow-x-auto rounded-md">
                  <table className="table table-zebra">
                    {/* head */}
                    <thead className="bg-primary-lighter">
                      <tr className="text-black text-bas">
                        <th>No</th>
                        <th>Name</th>
                        <th>Unit</th>
                        <th>Stock</th>
                      </tr>
                    </thead>
                    <tbody>
                      {data?.map((item, index) => (
                        <tr key={index}>
                          <td>{index + 1}</td>
                          <td>{item.nama_bahan_baku}</td>
                          <td>{item.satuan}</td>
                          <td>{item.stok}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </>
            )}
          </div>
        </div>

        <div className="mt-4 grid grid-cols-12 gap-4 md:mt-6 md:gap-6 2xl:mt-7.5 2xl:gap-7.5"></div>
      </div>
    </OwnerWrapper>
  );
};

export default IngredientsStockOwner;

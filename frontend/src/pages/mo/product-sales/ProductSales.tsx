import { useEffect, useRef, useState } from "react";
import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import ReactToPrint from "react-to-print";
import { MOWrapper } from "../../../components/Wrapper";
import { getProductSales } from "../../../lib/repository/ReportRepository";
import { currencyConverter } from "../../../lib/utils/converter";

const ProductSales: React.FC = () => {
  const [selectedYear] = useState(new Date().getFullYear().toString());
  const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth() + 1);
  //data handling
  const { data, isLoading, isValidating } = getProductSales(
    selectedMonth,
    parseInt(selectedYear)
  );

  const componentRef = useRef<HTMLDivElement>(null);

  const handleDateChange = (date: Date) => {
    setStartDate(date);
    setSelectedMonth(date.getMonth() + 1);
  };

  const [startDate, setStartDate] = useState<Date>(new Date());

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
    <MOWrapper>
      <div ref={componentRef}>
        <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <h2 className="text-title-xl font-serif font-bold text-black">
            Product Sales Report
          </h2>
        </div>

        <div className="card w-full bg-white shadow-xl border col-span-3 px-8 py-4 min-h-40">
          <div className="flex items-center w-fit">
            <div>
              <span className="text-gray-400 text-sm">Periode</span>
            </div>
          </div>
          <div
            style={{
              border: "1px solid #ccc",
              borderRadius: "10px",
              padding: "2px",
              width: "fit-content",
            }}
          >
            <DatePicker
              selected={startDate}
              onChange={handleDateChange}
              dateFormat="MM/yyyy"
              showMonthYearPicker
            />
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
                        <th>Product</th>
                        <th>Quantity</th>
                        <th>Price</th>
                        <th>Amount of Money</th>
                      </tr>
                    </thead>
                    <tbody>
                      {data?.map((item, index) => (
                        <tr key={index}>
                          <td>{index + 1}</td>
                          <td>{item.product_name}</td>
                          <td>{item.qty}</td>
                          <td>{currencyConverter(item.price)}</td>
                          <td>{currencyConverter(item.total)}</td>
                        </tr>
                      ))}
                    </tbody>
                    <tfoot>
                      <tr>
                        <td
                          colSpan={4}
                          className="text-right text-black text-sm"
                        >
                          Total:
                        </td>
                        <td className="text-black text-bas text-sm">
                          {currencyConverter(
                            data.reduce((acc, item) => acc + item.total, 0)
                          )}
                        </td>
                      </tr>
                    </tfoot>
                  </table>
                </div>
              </>
            )}
          </div>
        </div>
      </div>

      <div className="mt-4 grid grid-cols-12 gap-4 md:mt-6 md:gap-6 2xl:mt-7.5 2xl:gap-7.5"></div>
    </MOWrapper>
  );
};

export default ProductSales;

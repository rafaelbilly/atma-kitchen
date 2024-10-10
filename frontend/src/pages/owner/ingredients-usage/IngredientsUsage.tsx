import { endOfMonth, startOfMonth } from "date-fns";
import { Calendar, CircleX, Pencil, Printer } from "lucide-react";
import React, { useEffect, useRef, useState } from "react";
import { DateRangePicker } from "react-date-range";
import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";
import { OwnerWrapper } from "../../../components/Wrapper";
import { getIngredientsUsage } from "../../../lib/repository/ReportRepository";
import {
  dateConverter,
  dateConverterISO,
  dateConverterSimple,
} from "../../../lib/utils/converter";

import ReactToPrint from "react-to-print";

const IngredientsUsageOwner: React.FC = () => {
  const [selectedDate, setSelectedDate] = useState([
    {
      startDate: startOfMonth(new Date()),
      endDate: endOfMonth(new Date()),
      key: "selection",
    },
  ]);

  const [dateShow, setDateShow] = useState([
    {
      startDate: selectedDate[0].startDate,
      endDate: selectedDate[0].endDate,
    },
  ]);

  const modal = document.getElementById("date_modal") as HTMLDialogElement;

  const handleSaveDate = () => {
    setDateShow([
      {
        startDate: selectedDate[0].startDate,
        endDate: selectedDate[0].endDate,
      },
    ]);
    modal.close();
  };

  const handleDateModal = () => {
    modal.showModal();
  };

  //data handling
  const { data, isLoading, isValidating } = getIngredientsUsage(
    dateConverterISO(dateShow[0].startDate.toISOString()),
    dateConverterISO(dateShow[0].endDate.toISOString())
  );

  const componentRef = useRef<HTMLDivElement>(null);

  const currentDate = new Date();

  useEffect(() => {
    const style = document.createElement("style");
    style.innerHTML = `
            @media print {
                .no-print {
                    display: none !important;
                }
                .print-this {
                    display: block !important;
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
            Ingredients Usage Report
          </h2>
        </div>
        <div className="card w-2/3 bg-white shadow-xl border col-span-3 px-8 py-4 min-h-40">
          <div className="flex items-center justify-between w-full">
            <div className="flex items-center w-fit">
              <div>
                <span className="text-gray-400 text-sm">Periode</span>
                <div className="flex items-center">
                  <Calendar size={16} />
                  <span className="text-lg font-bold ml-2">{`${dateConverterSimple(
                    dateShow[0].startDate.toISOString()
                  )} - ${dateConverterSimple(
                    dateShow[0].endDate.toISOString()
                  )}`}</span>
                </div>
              </div>
              <div
                className="hover:cursor-pointer hover:bg-primary-lighter rounded-full transition-all p-1"
                onClick={handleDateModal}
              >
                <Pencil size={16} className=" text-primary" />
              </div>
            </div>
            <ReactToPrint
              trigger={() => (
                <button className="btn btn-primary no-print btn-sm">
                  <Printer size={16} />
                </button>
              )}
              content={() => componentRef.current}
            />
          </div>

          <div className="mt-4 print-this hidden">
            <p className="text-gray-400 text-sm">Print Date</p>
            <p className="text-md font-bold">
              {dateConverter(currentDate.toLocaleDateString())}
            </p>
          </div>

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
                        <th></th>
                        <th>Ingredient</th>
                        <th>Usage</th>
                      </tr>
                    </thead>
                    <tbody>
                      {data?.map((item, index) => (
                        <tr key={index}>
                          <th>{index + 1}</th>
                          <td>{item.bahan_baku.nama_bahan_baku}</td>
                          <td>{`${item.jumlah_penggunaan} ${item.bahan_baku.satuan}`}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </>
            )}
          </div>
        </div>
      </div>

      <div className="mt-4 grid grid-cols-12 gap-4 md:mt-6 md:gap-6 2xl:mt-7.5 2xl:gap-7.5"></div>

      <dialog id={`date_modal`} className="modal">
        <div className="border rounded-lg px-4 bg-white">
          <form method="dialog" className="flex justify-end">
            {/* if there is a button in form, it will close the modal */}
            <button className="btn btn-sm btn-circle btn-ghost my-4">
              <CircleX />
            </button>
          </form>
          <div className="flex flex-col gap-4 p-4 items-center">
            <DateRangePicker
              onChange={(item) =>
                setSelectedDate([
                  {
                    startDate: item.selection.startDate || new Date(),
                    endDate: item.selection.endDate || new Date(),
                    key: "selection",
                  },
                ])
              }
              moveRangeOnFirstSelection={false}
              months={2}
              ranges={selectedDate}
              direction="horizontal"
            />
            <button className="btn btn-primary w-1/2" onClick={handleSaveDate}>
              Save
            </button>
          </div>
        </div>
      </dialog>
    </OwnerWrapper>
  );
};

export default IngredientsUsageOwner;

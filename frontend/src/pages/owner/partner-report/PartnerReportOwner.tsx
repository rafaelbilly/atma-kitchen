import React, { useEffect, useRef, useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import ReactToPrint from "react-to-print";
import { PartnerReportTable } from "../../../components/Table/Table";
import { OwnerWrapper } from "../../../components/Wrapper";
import { getAllPartnerReport } from "../../../lib/repository/PartnerReport";

const PartnerReportOwner: React.FC = () => {
  const [selectedYear] = useState(new Date().getFullYear().toString());
  const [selectedMonth, setSelectedMonth] = useState<string>("");

  const { data, isLoading, isValidating } = getAllPartnerReport(
    selectedYear,
    selectedMonth
  );

  const handleDateChange = (date: Date) => {
    setStartDate(date);
    setSelectedMonth((date.getMonth() + 1).toString());
  };

  const [startDate, setStartDate] = useState<Date>(new Date());

  const getCurrentDate = () => {
    const date = new Date();
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  };

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
      <div ref={componentRef} className="ml-3 mr-3">
        <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <h2 className="text-title-xl font-serif font-bold text-black">
            Atma Kitchen Partner Report
          </h2>
        </div>
        <div className="flex items-center mb-5">
          <span className="mr-2">Interval:</span>
          <div
            style={{
              border: "1px solid #ccc",
              borderRadius: "5px",
              padding: "2px",
            }}
          >
            <DatePicker
              selected={startDate}
              onChange={handleDateChange}
              dateFormat="MM/yyyy"
              showMonthYearPicker
            />
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
        </div>
        <p className="mb-4">Tanggal Cetak : {getCurrentDate()}</p>
        {!isLoading && !isValidating ? (
          data.length > 0 ? (
            <div className="rounded-sm border border-stroke bg-white shadow-default p-4 overflow-x-auto">
              {data.map((item) => {
                return (
                  <div key={item.id_penitip}>
                    <h3>ID Penitip : {item.id_penitip}</h3>
                    <h3>Nama Penitip : {item.nama_penitip}</h3>
                    <PartnerReportTable partnerReportData={item.products} />
                  </div>
                );
              })}
            </div>
          ) : (
            <div className="w-full py-8 flex justify-center items-center">
              <p className="text-center text-gray-400">There is no data</p>
            </div>
          )
        ) : (
          <div className="w-full py-8 flex justify-center items-center">
            <span className="loading loading-dots loading-md"></span>
          </div>
        )}
      </div>
    </OwnerWrapper>
  );
};

export default PartnerReportOwner;

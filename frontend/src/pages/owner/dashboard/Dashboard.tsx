import React, { useEffect, useRef, useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import ReactToPrint from "react-to-print";
import Chart from "../../../components/Chart/Chart";
import {
  AttendanceReportTable,
  IncomeReportTable,
  SalesReportTable,
} from "../../../components/Table/Table";
import { OwnerWrapper } from "../../../components/Wrapper";
import { getAllAttendanceReport } from "../../../lib/repository/AttendanceRepository";
import { getAllIncomeExpenseReport } from "../../../lib/repository/IncomeExpenseReport";
import { getAllSalesReport } from "../../../lib/repository/SalesReportRepository";

const DashboardOwner: React.FC = () => {
  const [selectedYear, setSelectedYear] = useState(
    new Date().getFullYear().toString()
  );
  const [selectedMonth, setSelectedMonth] = useState(
    (new Date().getMonth() + 1).toString()
  );

  const { data: incomeData, isLoading: incomeIsLoading } =
    getAllIncomeExpenseReport(selectedYear, selectedMonth);

  const { data: attendanceData, isLoading: attendanceIsLoading } =
    getAllAttendanceReport(selectedYear, selectedMonth);

  const { data, error, isLoading } = getAllSalesReport(selectedYear);

  const handleYearChange = (date: Date) => {
    setSelectedYear(date.getFullYear().toString());
  };

  const handleDateChange = (date: Date) => {
    setStartDate(date);
    setSelectedMonth((date.getMonth() + 1).toString());
  };

  const [startDate, setStartDate] = useState<Date>(new Date());

  const renderYearContent = (year: number) => {
    const tooltipText = `Tooltip for year: ${year}`;
    return <span title={tooltipText}>{year}</span>;
  };

  const componentRef = useRef<HTMLDivElement>(null);
  const componentRef2 = useRef<HTMLDivElement>(null);
  const componentRef3 = useRef<HTMLDivElement>(null);

  const getCurrentDate = () => {
    const date = new Date();
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  };

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
    <>
      <OwnerWrapper>
        <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <h2 className="text-title-xl font-serif font-bold text-black">
            Atma Kitchen Owner Dashboard
          </h2>
        </div>
        <div className=" gap-4 md:grid-cols-2 md:gap-6 xl:grid-cols-12 2xl:gap-7.5">
          <div className="card w-full bg-white shadow-xl border col-span-7">
            {isLoading && (
              <div className="w-full my-16 flex justify-center items-center">
                <span className="loading loading-dots loading-md"></span>
              </div>
            )}
            {error && <div>Error</div>}
            {data && (
              <div ref={componentRef}>
                <div className="card-body p-0">
                  <div className="p-4 flex justify-between items-center">
                    <div>
                      <h2 className="card-title text-xl font-bold">
                        Sales Report
                      </h2>
                      <div className="flex items-center mt-2">
                        <span className="mr-2">Year:</span>
                        <div
                          style={{
                            border: "1px solid #ccc",
                            borderRadius: "5px",
                            padding: "2px",
                          }}
                        >
                          <DatePicker
                            selected={new Date(parseInt(selectedYear), 0)}
                            onChange={handleYearChange}
                            dateFormat="yyyy"
                            showYearPicker
                            renderCustomHeader={({ date }) => (
                              <div>
                                <span>{date.getFullYear()}</span>
                              </div>
                            )}
                            renderYearContent={renderYearContent}
                          />
                        </div>
                      </div>
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
                  <p className="ml-5">Tanggal Cetak : {getCurrentDate()}</p>
                  <div className="flex flex-col bg-white shadow-md rounded-lg p-4">
                    <div className="flex flex-row gap-5">
                      <div className="w-1/2 p-2">
                        <SalesReportTable salesReportData={data} />
                      </div>
                      <div className="w-full p-2">
                        <Chart data={data} />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
        <div className="gap-4 mt-5 md:grid-cols-2 md:gap-6 xl:grid-cols-12 2xl:gap-7.5">
          <div className="card w-full bg-white shadow-xl border col-span-7">
            <div className="card-body p-0">
              <div ref={componentRef3}>
                <div className="p-4">
                  <h2 className="card-title text-xl font-bold p-2">
                    Attendance Report
                  </h2>
                  {attendanceIsLoading && (
                    <div className="w-full my-16 flex justify-center items-center">
                      <span className="loading loading-dots loading-md"></span>
                    </div>
                  )}
                  {error && <div>Error</div>}
                  {attendanceData && (
                    <div className="flex flex-col mt-2">
                      <div className="flex items-center">
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
                                <rect
                                  x="6"
                                  y="14"
                                  width="12"
                                  height="8"
                                  rx="1"
                                />
                              </svg>
                            </button>
                          )}
                          content={() => componentRef3.current}
                        />
                      </div>
                      <p className="py-2">Tanggal Cetak : {getCurrentDate()}</p>
                      <div className="mt-4">
                        <AttendanceReportTable
                          attendanceReportData={attendanceData}
                        />
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="gap-4 mt-5 md:grid-cols-2 md:gap-6 xl:grid-cols-12 2xl:gap-7.5">
          <div className="card w-full bg-white shadow-xl border col-span-7">
            <div ref={componentRef2}>
              <div className="card-body p-0">
                <div className="p-4 ">
                  <h2 className="card-title text-xl font-bold">
                    Income and Expense Report
                  </h2>
                  {incomeIsLoading && (
                    <div className="w-full my-16 flex justify-center items-center">
                      <span className="loading loading-dots loading-md"></span>
                    </div>
                  )}
                  {error && <div>Error</div>}
                  {incomeData && (
                    <div className="flex flex-col mt-2">
                      <div className="flex items-center">
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
                                <rect
                                  x="6"
                                  y="14"
                                  width="12"
                                  height="8"
                                  rx="1"
                                />
                              </svg>
                            </button>
                          )}
                          content={() => componentRef2.current}
                        />
                      </div>
                      <p className="py-2">Tanggal Cetak : {getCurrentDate()}</p>
                      <div className="mt-4">
                        <IncomeReportTable
                          incomeExpenseReportData={incomeData}
                        />
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </OwnerWrapper>
    </>
  );
};

export default DashboardOwner;

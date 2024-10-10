import React from "react";
import { MORejectTable } from "../../../components/Table/Table";
import { MOWrapper } from "../../../components/Wrapper";
import { getTransactionRejectedByMO } from "../../../lib/repository/TransactionRepository";

const RejectOrder: React.FC = () => {
  const {
    data: taskData,
    isLoading: taskIsLoading,
    isValidating: taskIsValidating,
  } = getTransactionRejectedByMO();

  const handleOpenModalTodo = (index: number) => {
    switch (taskData[index].status_transaksi) {
      case "Payment Valid":
        setTimeout(() => {
          const dialog = document.getElementById(
            "confirmation_mo_modal"
          )! as HTMLDialogElement;
          dialog.showModal();
        }, 300);
        break;
    }
  };

  return (
    <MOWrapper>
      <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <h2 className="text-title-xl font-serif font-bold text-black">
          Order Task
        </h2>
      </div>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-6 xl:grid-cols-12 2xl:gap-7.5">
        <div className="card w-full bg-white shadow-xl border col-span-7">
          <div className="card-body p-0">
            <h2 className="card-title text-xl p-4 font-bol d">My Task</h2>
            {!taskIsLoading && !taskIsValidating ? (
              taskData.length > 0 ? (
                <MORejectTable data={taskData} onClick={handleOpenModalTodo} />
              ) : (
                <div className="w-full py-8 flex justify-center items-center">
                  <p className="text-center text-gray-400">
                    There is no task available
                  </p>
                </div>
              )
            ) : (
              <div className="w-full py-8 flex justify-center items-center">
                <span className="loading loading-dots loading-md"></span>
              </div>
            )}
          </div>
        </div>
      </div>
    </MOWrapper>
  );
};

export default RejectOrder;

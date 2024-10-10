import React, { useState } from "react";
// import CardDataStats from '../../components/CardDataStats';
import {
  DetailTransactionModal,
  InputPaymentModal,
  InputRangeModal,
  ReadyDetailTransactionModal,
} from "../../../components/Modal";
import {
  AdminOnProcessTable,
  AdminTaskTable,
} from "../../../components/Table/Table";
import { AdminWrapper } from "../../../components/Wrapper";
import {
  getAllTransactionAdminToDo,
  getOnProcessTransaction,
  getTransactionReady,
} from "../../../lib/repository/TransactionRepository";

const Dashboard: React.FC = () => {
  const {
    data: taskData,
    isLoading: taskIsLoading,
    isValidating: taskIsValidating,
  } = getAllTransactionAdminToDo();

  const {
    data: onProcessData,
    isLoading: onProcessIsLoading,
    isValidating: onProcessIsValidating,
  } = getOnProcessTransaction();

  const {
    data: readyData,
    isLoading: readyIsLoading,
    isValidating: readyIsValidating,
  } = getTransactionReady();

  const [selectedTask, setSelectedTask] = useState<number | null>(null);

  const handleOpenModalTodo = (index: number) => {
    setSelectedTask(index);

    switch (taskData[index].status_transaksi) {
      case "Inputing Range":
        setTimeout(() => {
          const dialog = document.getElementById(
            "range_modal"
          )! as HTMLDialogElement;
          dialog.showModal();
        }, 300); //
        break;

      case "Paid":
        setTimeout(() => {
          const dialog = document.getElementById(
            "total_payment_modal"
          )! as HTMLDialogElement;
          dialog.showModal();
        }, 300); //
        break;
    }
  };

  const handleOpenModalOnProcess = (index: number) => {
    setSelectedTask(index);

    switch (onProcessData[index].status_transaksi) {
      case "On Process":
        setTimeout(() => {
          const dialog = document.getElementById(
            "detail_transaction_modal"
          )! as HTMLDialogElement;
          dialog.showModal();
        }, 300); //
        break;
    }
  };

  const handleOpenModalReady = (index: number) => {
    setSelectedTask(index);

    setTimeout(() => {
      const dialog = document.getElementById(
        "detail_transaction_ready_modal"
      )! as HTMLDialogElement;
      dialog.showModal();
    }, 300); //
  };

  const renderModal = (data: any, status: string) => {
    const selectedData = data;
    switch (status) {
      case "Inputing Range":
        return <InputRangeModal data={selectedData} />;
      case "Paid":
        return <InputPaymentModal data={selectedData} />;
      case "On Process":
        return <DetailTransactionModal data={selectedData} />;
      case "Ready":
        return <ReadyDetailTransactionModal data={selectedData} />;
      default:
        return null;
    }
  };

  return (
    <AdminWrapper>
      <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <h2 className="text-title-xl font-serif font-bold text-black">
          Admin Dashboard
        </h2>
      </div>
      <div className="flex w-full">
        <div className="flex-col w-7/12 mr-4">
          <div className="card bg-white shadow-xl border w-full">
            <div className="card-body p-0">
              <h2 className="card-title text-xl p-4 font-bold">My Task</h2>
              {!taskIsLoading && !taskIsValidating ? (
                taskData.length > 0 ? (
                  <AdminTaskTable
                    data={taskData}
                    onClick={handleOpenModalTodo}
                  />
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
          <div className="card bg-white shadow-xl border w-full mt-4">
            <div className="card-body p-0">
              <h2 className="card-title text-xl p-4 font-bold">Order Ready</h2>
              {!readyIsLoading && !readyIsValidating ? (
                readyData.length > 0 ? (
                  <AdminTaskTable
                    data={readyData}
                    onClick={handleOpenModalReady}
                    bgColor="bg-primary-lighter"
                    isReady={true}
                  />
                ) : (
                  <div className="w-full py-8 flex justify-center items-center">
                    <p className="text-center text-gray-400">
                      There is no order that is ready
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
        <div className="flex-col w-5/12">
          <div className="card w-full bg-white shadow-xl border h-fit">
            <div className="card-body p-0">
              <h2 className="card-title text-xl p-4 font-bol d">
                On Process Order
              </h2>
              {!onProcessIsLoading && !onProcessIsValidating ? (
                onProcessData.length > 0 ? (
                  <AdminOnProcessTable
                    data={onProcessData}
                    onClick={handleOpenModalOnProcess}
                  />
                ) : (
                  <div className="w-full py-8 flex justify-center items-center">
                    <p className="text-center text-gray-400">
                      There is no order that is being processed
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
      </div>

      {selectedTask !== null &&
        (taskData[selectedTask!] !== undefined
          ? renderModal(
            taskData[selectedTask!],
            taskData[selectedTask!].status_transaksi
          )
          : null)}
      {selectedTask !== null &&
        (onProcessData[selectedTask!] !== undefined
          ? renderModal(
            onProcessData[selectedTask!],
            onProcessData[selectedTask!].status_transaksi
          )
          : null)}
      {selectedTask !== null &&
        (readyData[selectedTask!] !== undefined
          ? renderModal(
              readyData[selectedTask!],
              readyData[selectedTask!].status_transaksi
            )
          : null)}
    </AdminWrapper>
  );
};

export default Dashboard;

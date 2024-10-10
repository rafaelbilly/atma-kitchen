import React, { useState } from "react";
import { MOWrapper } from "../../../components/Wrapper";
import { getTransactionForMOTodo } from "../../../lib/repository/TransactionRepository";
import { MOTaskTable } from "../../../components/Table/Table";
import { ConfirmMOModal } from "../../../components/Modal";

const TaskOrder: React.FC = () => {
  const {
    data: taskData,
    isLoading: taskIsLoading,
    isValidating: taskIsValidating,
  } = getTransactionForMOTodo();

  const [selectedTask, setSelectedTask] = useState<number | null>(null);

  const handleOpenModalTodo = (index: number) => {
    setSelectedTask(index);

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

  const renderModal = (data: any[], status: string) => {
    if (data.length > 0) {
      const selectedData = data[selectedTask!];
      switch (status) {
        case "Payment Valid":
          return <ConfirmMOModal data={selectedData} />;
        default:
          return null;
      }
    }
    return null;
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
                <MOTaskTable data={taskData} onClick={handleOpenModalTodo} />
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
        {/* <div className="col-span-5">
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
                </div> */}
      </div>
      {selectedTask !== null &&
        (taskData[selectedTask!] !== undefined
          ? renderModal(taskData, taskData[selectedTask].status_transaksi)
          : null)}
    </MOWrapper>
  );
};

export default TaskOrder;

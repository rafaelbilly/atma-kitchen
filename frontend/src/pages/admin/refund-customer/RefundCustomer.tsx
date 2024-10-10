import React, { useState } from "react";
import { mutate } from "swr";
import { ConfirmationModal } from "../../../components/Modal";
import { AdminRefundTable } from "../../../components/Table/Table";
import { AdminWrapper } from "../../../components/Wrapper";
import {
  confirmWithdraw,
  getWithdrawForAdminTodo,
} from "../../../lib/repository/RefundRepository";

const RefundCustomer: React.FC = () => {
  const {
    data: taskData,
    isLoading: taskIsLoading,
    isValidating: taskIsValidating,
  } = getWithdrawForAdminTodo();

  const [selectedTask, setSelectedTask] = useState<number | null>(null);

  const handleOpenModalTodo = (index: number) => {
    setSelectedTask(index);

    switch (taskData[index].status_pengembalian) {
      case "Waiting Confirmation":
        setTimeout(() => {
          const dialog = document.getElementById(
            `confirmation_modal_refund`
          )! as HTMLDialogElement;
          dialog.showModal();
        }, 300);
        break;
    }
  };

  const handleSubmit = () => {
    setTimeout(async () => {
      await confirmWithdraw(taskData[selectedTask!].id_pengembalian_dana);
      mutate(`${import.meta.env.VITE_BASE_API}/pengembalian-dana-admin`);
    }, 300);
  };

  const renderModal = (status: string) => {
    switch (status) {
      case "Waiting Confirmation":
        return <ConfirmationModal onClick={handleSubmit} uniqueId="refund" />;
      default:
        return null;
    }

    return null;
  };

  return (
    <AdminWrapper>
      <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <h2 className="text-title-xl font-serif font-bold text-black">
          Atma Kitchen Refund Customer
        </h2>
      </div>
      <div className=" gap-4 md:grid-cols-2 md:gap-6 xl:grid-cols-12 2xl:gap-7.5">
        <div className="card w-full bg-white shadow-xl border col-span-7">
          <div className="card-body p-0">
            <h2 className="card-title text-xl p-4 font-bol d">Refund Task</h2>
            {!taskIsLoading && !taskIsValidating ? (
              taskData.length > 0 ? (
                <AdminRefundTable
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
      </div>

      {selectedTask !== null &&
        (taskData[selectedTask!] !== undefined
          ? renderModal(taskData[selectedTask!].status_pengembalian)
          : null)}
    </AdminWrapper>
  );
};

export default RefundCustomer;

import { CancelledOrderTable } from "../../../components/Table/Table";
import { AdminWrapper } from "../../../components/Wrapper";
import {
  cancelledOrders,
  getTransactionCancelled,
} from "../../../lib/repository/TransactionRepository";

export default function CancelledOrder() {
  const { data, isLoading, isValidating } = getTransactionCancelled();

  const handlerOnClick = async () => {
    await cancelledOrders();
  };
  return (
    <AdminWrapper>
      <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <h2 className="text-title-xl font-serif font-bold text-black">
          Atma Kitchen Cancelled Orders
        </h2>
      </div>
      <div className=" gap-4 md:grid-cols-2 md:gap-6 xl:grid-cols-12 2xl:gap-7.5">
        <div className="card w-full bg-white shadow-xl border col-span-7">
          <div className="card-body p-0 px-4">
            <div className="flex justify-between items-center ">
              <h2 className="card-title text-xl p-4 font-bol d">
                Cancelled Orders
              </h2>
              <button
                className="btn btn-primary btn-sm"
                onClick={handlerOnClick}
              >
                Cancelled Orders
              </button>
            </div>
            {!isLoading && !isValidating ? (
              data.length > 0 ? (
                <CancelledOrderTable data={data} />
              ) : (
                <div className="w-full py-8 flex justify-center items-center">
                  <p className="text-center text-gray-400">
                    There is no cancelled order
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
    </AdminWrapper>
  );
}

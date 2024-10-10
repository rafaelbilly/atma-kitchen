import { ICart } from "../../lib/interfaces/ICart";
import { IRoles } from "../../lib/interfaces/IRoles";
import { ITransactionDetails } from "../../lib/interfaces/ITransactionDetails";
import { currencyConverter } from "../../lib/utils/converter";

type RolesListProps = {
  rolesData: IRoles[];
};

export const JobTitleList: React.FC<RolesListProps> = ({ rolesData }) => {
  return (
    <div className="rounded-sm border border-stroke bg-white shadow-default">
      <div className="p-4">
        <ul className="divide-y divide-gray-200">
          {rolesData.map((roles) => (
            <li key={roles.id_role} className="py-2">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="text-base font-medium">{roles.nama_role}</h4>
                </div>
                <div className="dropdown dropdown-top dropdown-end">
                  <div tabIndex={0} role="button" className="btn btn-sm m-1">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      stroke-width="2"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      className="lucide lucide-ellipsis"
                    >
                      <circle cx="12" cy="12" r="1" />
                      <circle cx="19" cy="12" r="1" />
                      <circle cx="5" cy="12" r="1" />
                    </svg>
                  </div>
                  <ul
                    tabIndex={0}
                    className="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-52"
                  >
                    <li>
                      <a href="/mo/job-title/edit">Edit</a>
                    </li>
                    <li>
                      <a>Delete</a>
                    </li>
                  </ul>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

type ProductWithImageListProps = {
  detailTransaction: ITransactionDetails;
};

export const ProductWithImageList = ({
  detailTransaction,
}: ProductWithImageListProps) => {
  return (
    <div className="flex">
      <img
        className="w-20 h-20 object-cover rounded-md mr-4"
        src={detailTransaction.produk.foto}
        alt={detailTransaction.produk.nama_produk}
      />
      <div className="flex flex-col my-auto">
        <h6 className="font-bold text-xl">
          {detailTransaction.produk.nama_produk}
        </h6>
        <p className="text-gray-500">
          {detailTransaction.jumlah_item} pcs x{" "}
          {currencyConverter(detailTransaction.harga_satuan)}
        </p>
      </div>
    </div>
  );
};

type ProductWithImageListPropsCart = {
  carts: ICart;
};

export const ProductWithImageListCart = ({
  carts,
}: ProductWithImageListPropsCart) => {
  return (
    <div className="flex border border-gray-200 rounded-md py-2 px-4 my-2">
      <img
        className="w-20 h-20 object-cover rounded-md mr-4"
        src={carts.produk.foto}
        alt={carts.produk.nama_produk}
      />
      <div className="flex flex-col my-auto">
        <h6 className="font-bold text-xl">{carts.produk.nama_produk}</h6>
        <p className="text-gray-500">
          {carts.jumlah_item_keranjang} pcs x{" "}
          {currencyConverter(carts.produk.harga)}
        </p>
      </div>
      <p className="my-auto ml-auto font-bold text-gray-600 text-lg">
        {currencyConverter(carts.jumlah_item_keranjang * carts.produk.harga)}
      </p>
    </div>
  );
};

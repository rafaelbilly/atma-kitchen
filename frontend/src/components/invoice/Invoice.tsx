import React, { forwardRef } from 'react';
import { ITransaction } from '../../lib/interfaces/ITransaction';
import Logo from "../../assets/images/logo-bakery.png";
import { currencyConverter } from '../../lib/utils/converter';

type InvoiceProps = {
    data: ITransaction
};

const Invoice = forwardRef((props: InvoiceProps, ref: React.ForwardedRef<HTMLDivElement>) => {

    return (
        <div ref={ref}>
            <div className="max-w-7xl py-10 mx-auto my-20 px-4 bg-white rounded shadow-sm" id="invoice">
                <div className="grid grid-cols-2 items-center">
                    <div>
                        <img
                            src={Logo}
                            alt="atma-kitchen"
                            height="100"
                            width="100"
                        />
                    </div>
                    <div className="text-right">
                        <p>Atma Kitchen</p>
                        <p className="text-gray-500 text-sm">atmakitchen@gmail.com</p>
                        <p className="text-gray-500 text-sm mt-1">+621234123412</p>
                        <p className="text-gray-500 text-sm mt-1">Babarsari, Yogyakarta</p>
                    </div>
                </div>

                <div className="grid grid-cols-2 items-center mt-8">
                    <div>
                        <p className="font-bold text-gray-800">Bill to :</p>
                        <p className="text-gray-500">
                            {props.data.customer.nama_customer}
                            <br />
                            {props.data.pengiriman && (
                                <>
                                    {props.data.pengiriman.alamat_tujuan}
                                </>
                            )}
                        </p>
                        <p className="text-gray-500">{props.data.customer.no_telp}</p>
                    </div>
                    <div className="text-right">
                        <p>
                            Invoice number :
                            <span className="text-gray-500"> {props.data.id_transaksi}</span>
                        </p>
                        <p>
                            Invoice date : <span className="text-gray-500">{props.data.tanggal_nota_dibuat}</span>
                            <br />
                            Due date : <span className="text-gray-500">{props.data.tanggal_diambil}</span>
                        </p>
                    </div>
                </div>

                <div className="-mx-4 mt-8 flow-root sm:mx-0">
                    <table className="min-w-full">
                        <colgroup>
                            <col className="w-full sm:w-1/2" />
                            <col className="sm:w-1/6" />
                            <col className="sm:w-1/6" />
                            <col className="sm:w-1/6" />
                        </colgroup>
                        <thead className="border-b border-gray-300 text-gray-900">
                            <tr>
                                <th
                                    scope="col"
                                    className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-0"
                                >
                                    Items
                                </th>
                                <th
                                    scope="col"
                                    className="hidden px-3 py-3.5 text-right text-sm font-semibold text-gray-900 sm:table-cell"
                                >
                                    Quantity
                                </th>
                                <th
                                    scope="col"
                                    className="hidden px-3 py-3.5 text-right text-sm font-semibold text-gray-900 sm:table-cell"
                                >
                                    Price
                                </th>
                                <th
                                    scope="col"
                                    className="py-3.5 pl-3 pr-4 text-right text-sm font-semibold text-gray-900 sm:pr-0"
                                >
                                    Amount
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {props.data.detail_transaksi.map((item) => (
                                <tr className="border-b border-gray-200">
                                    <td className="max-w-0 py-5 pl-4 pr-3 text-sm sm:pl-0">
                                        <div className="font-medium text-gray-900">{item.produk.nama_produk}</div>
                                    </td>
                                    <td className="hidden px-3 py-5 text-right text-sm text-gray-500 sm:table-cell">
                                        {item.jumlah_item}
                                    </td>
                                    <td className="hidden px-3 py-5 text-right text-sm text-gray-500 sm:table-cell">
                                        {currencyConverter(item.produk.harga)}
                                    </td>
                                    <td className="py-5 pl-3 pr-4 text-right text-sm text-gray-500 sm:pr-0">
                                        {currencyConverter(item.harga_satuan * item.jumlah_item)}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                        <tfoot>
                            <br />
                            <tr>
                                <th
                                    scope="row"
                                    colSpan={3}
                                    className="hidden pl-4 pr-3 pt-4 text-right text-sm font-normal text-gray-500 sm:table-cell sm:pl-0"
                                >
                                    Total Poin Used
                                </th>
                                <td className="pl-3 pr-6 pt-4 text-right text-sm text-gray-500 sm:pr-0">
                                    {props.data.poin_digunakan}
                                </td>
                            </tr>
                            <tr>
                                <th
                                    scope="row"
                                    colSpan={3}
                                    className="hidden pl-4 pr-3 pt-4 text-right text-sm font-normal text-gray-500 sm:table-cell sm:pl-0"
                                >
                                    Total Poin Earned
                                </th>
                                <td className="pl-3 pr-6 pt-4 text-right text-sm text-gray-500 sm:pr-0">
                                    {props.data.poin_diperoleh}
                                </td>
                            </tr>
                            <br />
                            <tr>
                                <th
                                    scope="row"
                                    colSpan={3}
                                    className="hidden pl-4 pr-3 pt-6 text-right text-sm font-normal text-gray-500 sm:table-cell sm:pl-0"
                                >
                                    Subtotal
                                </th>
                                <td className="pl-3 pr-6 pt-6 text-right text-sm text-gray-500 sm:pr-0">
                                    {currencyConverter
                                        (props.data.detail_transaksi.reduce((total, item) => total + (item.harga_satuan * item.jumlah_item), 0))}
                                </td>
                            </tr>
                            {props.data.pengiriman && (
                                <tr>
                                    <th
                                        scope="row"
                                        colSpan={3}
                                        className="hidden pl-4 pr-3 pt-4 text-right text-sm font-normal text-gray-500 sm:table-cell sm:pl-0"
                                    >
                                        Delivery Cost
                                    </th>
                                    <td className="pl-3 pr-6 pt-4 text-right text-sm text-gray-500 sm:pr-0">
                                        {currencyConverter(props.data.pengiriman.biaya_pengiriman)}
                                    </td>
                                </tr>
                            )}
                            {props.data.poin_digunakan > 0 && (
                                <tr>
                                    <th
                                        scope="row"
                                        colSpan={3}
                                        className="hidden pl-4 pr-3 pt-4 text-right text-sm font-normal text-gray-500 sm:table-cell sm:pl-0"
                                    >
                                        Discount
                                    </th>
                                    <td className="pl-3 pr-6 pt-4 text-right text-sm text-gray-500 sm:pr-0">
                                        - {
                                            currencyConverter(props.data.poin_digunakan * 100)
                                        }
                                    </td>
                                </tr>
                            )}
                            <tr>
                                <th
                                    scope="row"
                                    colSpan={3}
                                    className="hidden pl-4 pr-3 pt-4 text-right text-sm font-semibold text-gray-900 sm:table-cell sm:pl-0"
                                >
                                    Total
                                </th>
                                <td className="pl-3 pr-4 pt-4 text-right text-sm font-semibold text-gray-900 sm:pr-0">
                                    {currencyConverter(props.data.total)}
                                </td>
                            </tr>
                        </tfoot>
                    </table>
                </div>

                <div className="border-t-2 pt-4 text-xs text-gray-500 text-center mt-16">
                    Please pay the invoice before the due date. You can pay the invoice by logging in to your account from our client portal.
                </div>
            </div>
        </div>
    );
});

export default Invoice;
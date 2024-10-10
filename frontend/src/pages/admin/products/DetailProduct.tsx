// import React, { useState } from 'react';
// import { Link } from 'react-router-dom';
import { ProductBreadcrumb } from '../../../components/Breadcrumbs/Breadcrumb';
import { AdminWrapper } from '../../../components/Wrapper';

const DetailProduct: React.FC = () => {
    return (
        <AdminWrapper>
            <ProductBreadcrumb pageName="Detail Product" />
            <div className="bg-white shadow-default p-6 grid grid-cols-1 gap-9 sm:grid-cols-2">
                <div className="flex flex-col gap-6">
                    <div className="flex items-center justify-center w-full">
                        <label className="flex flex-col items-center justify-center w-full h-72 border-2 border-gray-300 border-dashed rounded-lg bg-gray-50">
                            <div className="flex flex-col items-center justify-center pt-5 pb-6">
                                {/* <img
                                    className="w-full h-50 object-cover"
                                    src={product.foto}
                                    alt={product.nama_produk}
                                /> */}
                            </div>
                        </label>
                    </div>
                </div>

                <form className="flex flex-col gap-6">
                    <label className="font-medium text-gray-800">Product Name</label>
                    <input type="text" placeholder="" className="input w-full max-w-md" />

                    <label className="font-medium text-gray-800">Ingredients</label>
                    <input type="text" placeholder="" className="input w-full max-w-md" />
                </form>
            </div>
        </AdminWrapper>
    );
};

export default DetailProduct;

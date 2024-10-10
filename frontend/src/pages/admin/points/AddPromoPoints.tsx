// import React, { useState } from 'react';
// import { Link } from 'react-router-dom';
import { PromoBreadcrumb } from '../../../components/Breadcrumbs/Breadcrumb';
import { AdminWrapper } from '../../../components/Wrapper';

const AddPromoPoints: React.FC = () => {
    return (
        <AdminWrapper>
            <PromoBreadcrumb pageName="Add New Promo Points" />
            <div className="bg-white shadow-default p-6">
                <form className="flex flex-col gap-6">
                    <label className="font-medium text-gray-800">Ingredients Name</label>
                    <input type="text" placeholder="Enter Ingredients Name" className="input w-full max-w-md" />

                    <label className="font-medium text-gray-800">Items</label>
                    <select className="select w-full max-w-md">
                        <option value="">Select Units</option>
                        <option value="Cake">Kg</option>
                        <option value="Bread">Ml</option>
                        <option value="Drinks">Gram</option>
                    </select>

                    <label className="font-medium text-gray-800">Stocks</label>
                    <input type="number" placeholder="Enter Stocks" className="input w-full max-w-md" />

                    <div className="flex justify-end gap-3 mx-12">
                        <button className="btn btn-active">Cancel</button>
                        <button className="btn btn-primary">Add Ingredients</button>
                    </div>
                </form>
            </div>
        </AdminWrapper>
    );
};

export default AddPromoPoints;

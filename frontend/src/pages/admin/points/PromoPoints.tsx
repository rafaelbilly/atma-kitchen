import React from 'react';
// import { Link } from 'react-router-dom';
import { AdminWrapper } from '../../../components/Wrapper';

const PromoPoints: React.FC = () => {
    return (
        <AdminWrapper>
            <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                <h2 className="text-title-xl font-serif font-bold text-black">
                    Atma Kitchen Promo Points
                </h2>
            </div>
            <div className="flex justify-end">
                <a href="/add-points" className="btn btn-primary mb-4">Add New Promo Points</a>
            </div>
            <div className="rounded-sm border border-stroke bg-white shadow-default p-4 overflow-x-auto">

            </div>
        </AdminWrapper>
    );
};

export default PromoPoints;

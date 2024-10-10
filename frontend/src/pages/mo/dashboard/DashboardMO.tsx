import React from 'react';
import { MOWrapper } from '../../../components/Wrapper';
import { getLowIngredients } from '../../../lib/repository/IngredientsRepository';
import { LowIngredientsTable } from '../../../components/Table/Table';

const DashboardMO: React.FC = () => {
    const { data, isLoading, isValidating } = getLowIngredients();

    return (
        <MOWrapper>
            <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                <h2 className="text-title-xl font-serif font-bold text-black">
                    Manager Operasional Dashboard
                </h2>
            </div>
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-6 xl:grid-cols-6 2xl:gap-7.5">
                <div className="card w-full bg-white shadow-xl border col-span-3">
                    <div className="card-body p-0">
                        <h2 className="card-title text-xl p-4 font-bol d">Low Ingredients</h2>
                        {!isLoading && !isValidating ? (
                            data.length > 0 ? (
                                <LowIngredientsTable ingredientsData={data} />
                            ) : (
                                <div className="w-full py-8 flex justify-center items-center">
                                    <p className="text-center text-gray-400">
                                        There is no low ingredients
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

            <div className="mt-4 grid grid-cols-12 gap-4 md:mt-6 md:gap-6 2xl:mt-7.5 2xl:gap-7.5">

            </div>
        </MOWrapper>
    );
};

export default DashboardMO;

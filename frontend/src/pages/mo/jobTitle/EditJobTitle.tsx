// import React, { useState } from 'react';
import { JobBreadcrumb } from '../../../components/Breadcrumbs/Breadcrumb';
import { MOWrapper } from '../../../components/Wrapper';

const EditJobTitle: React.FC = () => {
    return (
        <MOWrapper>
            <JobBreadcrumb pageName="Edit Job Title" />
            <div className="bg-white shadow-default p-6">
                <form className="flex flex-col gap-6">
                    <div className="flex flex-wrap items-center justify-center gap-6">
                        <label className="font-medium text-gray-800 w-full max-w-xs">Name</label>
                        <input type="text" placeholder="Enter Name" className="input w-full max-w-md" />
                    </div>

                    <div className="flex flex-wrap items-center justify-center gap-6">
                        <label className="font-medium text-gray-800 w-full max-w-xs">Job Title</label>
                        <input type="text" placeholder="Enter Job Title" className="input w-full max-w-md" />
                    </div>

                    <div className="flex justify-end gap-3 mt-10">
                        <button className="btn btn-active">Cancel</button>
                        <button className="btn btn-primary">Add Job</button>
                    </div>
                </form>
            </div>
        </MOWrapper>
    );
};

export default EditJobTitle;

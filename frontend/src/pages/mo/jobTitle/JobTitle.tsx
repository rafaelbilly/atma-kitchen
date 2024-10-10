import React from "react";
import { MOWrapper } from "../../../components/Wrapper";
import { getAllRoles } from "../../../lib/repository/RolesRepository";
import { JobTitleList } from "../../../components/List/List";

const JobTitle: React.FC = () => {
  //API CALL
  const { data, error, isLoading } = getAllRoles();
  console.log(data);
  return (
    <>
      <MOWrapper>
        <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <h2 className="text-title-xl font-serif font-bold text-black">
            Atma Kitchen Job Title
          </h2>
        </div>

        <div className="flex justify-end">
          <a href="/mo/job-title/add" className="btn btn-primary mb-4">
            Add New Job Title
          </a>
        </div>

        {isLoading && (
          <div className="w-full mt-64 flex justify-center items-center">
            <span className="loading loading-dots loading-md"></span>
          </div>
        )}
        {error && <div>Error</div>}
        {data &&
          <JobTitleList rolesData={data} />}
      </MOWrapper>
    </>
  );
};

export default JobTitle;

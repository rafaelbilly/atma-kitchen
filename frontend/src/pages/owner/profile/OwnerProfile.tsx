import React, { useEffect, useState } from "react";
import { OwnerWrapper } from "../../../components/Wrapper";
import { IProfile } from "../../../lib/interfaces/IProfile";
import {
  changePassword,
  getProfile,
} from "../../../lib/repository/ProfileRepository";

const OwnerProfile: React.FC = () => {
  // API CALL
  const { data, error, isLoading } = getProfile();

  const [input, setInput] = useState<IProfile>({
    id_user: "",
    username: "",
    email: "",
    old_password: "",
    new_password: "",
  });

  useEffect(() => {
    if (data) {
      const inputField: IProfile = {
        id_user: data.id_user ?? "",
        username: data.username ?? "",
        email: data.email ?? "",
        old_password: data.old_password ?? "",
        new_password: data.new_password ?? "",
      };
      setInput(inputField);
    }
  }, [data]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    await changePassword(input);
  };

  return (
    <OwnerWrapper>
      <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <h2 className="text-title-xl font-serif font-bold text-black">
          Profile
        </h2>
      </div>
      {isLoading && (
        <div className="w-full mt-64 flex justify-center items-center">
          <span className="loading loading-dots loading-md"></span>
        </div>
      )}
      {error && <div>Error</div>}
      {data && (
        <div className="grid grid-cols-5 gap-8">
          <div className="col-span-5 xl:col-span-3">
            <div className="rounded-sm border border-stroke bg-white shadow-default p-4 overflow-x-auto">
              <div className="border-b border-stroke py-4 px-7">
                <h3 className="font-medium text-black">Personal Information</h3>
              </div>
              <div className="p-7">
                <form onSubmit={handleSubmit}>
                  <div className="mb-5 flex flex-col gap-5 sm:flex-row">
                    <div className="w-full">
                      <label className="mb-3 block text-sm font-medium text-black">
                        Username
                      </label>
                      <div className="relative">
                        <input
                          className="w-full rounded border border-stroke bg-gray py-3 pl-5 pr-4.5 text-black focus:border-primary focus-visible:outline-none"
                          type="text"
                          name="username"
                          onChange={handleChange}
                          value={input.username}
                          required
                        />
                      </div>
                    </div>
                  </div>

                  <div className="mb-5">
                    <label className="mb-3 block text-sm font-medium text-black">
                      Email Address
                    </label>
                    <div className="relative">
                      <input
                        className="w-full rounded border border-stroke bg-gray py-3 pl-5 pr-4.5 text-black focus:border-primary focus-visible:outline-none"
                        type="email"
                        name="email"
                        onChange={handleChange}
                        value={input.email}
                        disabled
                      />
                    </div>
                  </div>

                  <div className="mb-5">
                    <label className="mb-3 block text-sm font-medium text-black">
                      Current Password
                    </label>
                    <input
                      className="w-full rounded border border-stroke bg-gray py-3 pl-5 px-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark"
                      type="password"
                      name="old_password"
                      value={input.old_password}
                      onChange={handleChange}
                      required
                    />
                  </div>

                  <div className="mb-5">
                    <label className="mb-3 block text-sm font-medium text-black">
                      New Password
                    </label>
                    <input
                      className="w-full rounded border border-stroke bg-gray py-3 pl-5 px-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark"
                      type="password"
                      name="new_password"
                      value={input.new_password}
                      onChange={handleChange}
                      required
                    />
                  </div>

                  <div className="flex justify-end gap-5">
                    <button
                      className="flex justify-center rounded border border-stroke py-2 px-6 font-medium text-black hover:shadow-1"
                      type="reset"
                    >
                      Cancel
                    </button>
                    <button
                      className="flex justify-center rounded bg-primary py-2 px-6 font-medium text-white hover:bg-opacity-90"
                      type="submit"
                    >
                      Save
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>

          <div className="col-span-5 xl:col-span-2">
            <div className="rounded-sm border border-stroke bg-white shadow-default">
              <div className="border-b border-stroke py-4 px-7">
                <h3 className="font-medium text-black">Your Photo</h3>
              </div>
              <div className="p-7">
                <form action="#">
                  <div className="mb-4 flex items-center gap-3"></div>

                  {/* <div className="flex justify-end gap-4">
                                        <button
                                            className="flex justify-center rounded border border-stroke py-2 px-6 font-medium text-black hover:shadow-1 dark:border-strokedark dark:text-white"
                                            type="submit"
                                        >
                                            Cancel
                                        </button>
                                        <button
                                            className="flex justify-center rounded bg-primary py-2 px-6 font-medium text-white hover:bg-opacity-90"
                                            type="submit"
                                        >
                                            Save
                                        </button>
                                    </div> */}
                </form>
              </div>
            </div>
          </div>
        </div>
      )}
    </OwnerWrapper>
  );
};

export default OwnerProfile;

import { NavWrapper } from "../../../components/Wrapper";

export default function AddressList() {
  return (
    <NavWrapper>
      <div className="bg-white w-full flex flex-col gap-5 px-3 md:px-16 lg:px-28 md:flex-row">
        <aside className="hidden py-4 md:w-1/3 lg:w-1/4 md:block">
          <div className="sticky flex flex-col gap-2 p-4 text-sm border-r border-indigo-100 top-12 border">
            <div className="flex items-center justify-between">
              <div className="flex flex-col items-center space-y-5 sm:flex-row sm:space-y-0">
                <img
                  className="object-cover w-40 h-14 p-1 rounded-full"
                  src="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fGZhY2V8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=500&q=60"
                  alt="Bordered avatar"
                />
              </div>
              <div className="flex flex-col">
                <h2 className="pl-3 text-xl font-semibold">Username</h2>
                <h6 className="pl-3 text-sm font-semibold">20 points</h6>
              </div>
            </div>
            <a
              href="#"
              className="flex items-center px-3 py-2.5 font-bold bg-white text-lg"
            >
              Settings
            </a>
            <a
              href="#"
              className="flex items-center px-3 py-2.5 font-semibold text-lg"
            >
              Order
            </a>
            <a
              href="#"
              className="flex items-center px-3 py-2.5 font-semibold text-lg"
            >
              History
            </a>
          </div>
        </aside>
        <main className="w-full min-h-screen gap py-4 md:w-2/3 lg:w-3/4">
          <div className="p-2 md:p-4 border">
            <div className="w-full px-3 pb-8 sm:max-w-xl sm:rounded-lg">
              <h2 className="pl-2 flex items-center text-2xl font-serif font-semibold sm:text-xl">
                <a href="/u/profile" className="text-primary">
                  Personal Profile
                </a>
                <span className="mx-2"></span>
                <a href="/address-list" className="text-primary">
                  Address List
                </a>
              </h2>
              <div className="grid max-w-2xl mx-auto mt-8">
                <form className="flex items-center max-w-sm">
                  <label htmlFor="simple-search" className="sr-only">
                    Search
                  </label>
                  <div className="relative w-full">
                    <input
                      type="text"
                      id="simple-search"
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full ps-3 p-2.5"
                      placeholder="Search address..."
                      required
                    />
                  </div>
                  <button
                    type="submit"
                    className="p-2.5 ms-2 text-sm font-medium text-white bg-primary rounded-lg border border-primary hover:bg-primary-dark focus:ring-4 focus:outline-none focus:ring-primary-light"
                  >
                    <svg
                      className="w-4 h-4"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 20 20"
                    >
                      <path
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                      />
                    </svg>
                    <span className="sr-only">Search</span>
                  </button>
                  <button className="p-2.5 ms-8 text-sm font-medium text-white bg-primary rounded-lg border border-primary hover:bg-primary-dark focus:ring-4 focus:outline-none focus:ring-primary-light">
                    Add Address
                  </button>
                </form>
                <div className="card mt-5 w-full bg-base-100 relative">
                  <div className="card-body border relative">
                    <div className="badge badge-lg badge-warning">Home</div>
                    <div className="absolute top-6 right-3 flex gap-2">
                      <button className="bg-primary btn-sm text-white px-4 py-1 rounded-lg">
                        Edit
                      </button>
                      <button className="bg-red-500 btn-sm text-white px-4 py-1 rounded-md">
                        Delete
                      </button>
                    </div>
                    <hr className="my-4 border-t-2 border-gray-300" />
                    <div className="text-center">
                      <p>Jalan Cermai No 10</p>
                    </div>
                  </div>
                </div>
                <div className="card mt-5 w-full bg-base-100 relative">
                  <div className="card-body border relative">
                    <div className="badge badge-lg badge-warning">Home</div>
                    <div className="absolute top-6 right-3 flex gap-2">
                      <button className="bg-primary btn-sm text-white px-4 py-1 rounded-lg">
                        Edit
                      </button>
                      <button className="bg-red-500 btn-sm text-white px-4 py-1 rounded-md">
                        Delete
                      </button>
                    </div>
                    <hr className="my-4 border-t-2 border-gray-300" />
                    <div className="text-center">
                      <p>Jalan Cermai No 10</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </NavWrapper>
  );
}

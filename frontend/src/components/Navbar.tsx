import { Menu, ShoppingBasket } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export function Navbar() {
  const navigate = useNavigate();
  const { pathname } = location;
  const [profileUrl, setProfileUrl] = useState(
    localStorage.getItem("profile_url")
  );
  const [token, setToken] = useState(localStorage.getItem("token"));

  const handleLogout = () => {
    localStorage.removeItem("profile_url");
    localStorage.removeItem("token");

    setProfileUrl(null);
    setToken(null);

    navigate("/login");
  };

  return (
    <div className="navbar bg-white px-24 font-serif mx-auto fixed top-0 left-0 right-0 z-10 shadow-md">
      <div className="navbar-start">
        <div className="dropdown lg:block hidden">
          {token != null ? (
            <a
              tabIndex={0}
              role="button"
              className={`btn btn-ghost btn-circle ${
                pathname.includes("cart")
                  ? "text-primary bg-primary-lighter"
                  : "text-black"
              }`}
              onClick={() => navigate("/u/cart")}
            >
              <ShoppingBasket size={36} />
            </a>
          ) : null}
        </div>
        <div className="dropdown lg:hidden">
          <div tabIndex={0} role="button" className="btn btn-ghost btn-circle">
            <Menu size={20} />
          </div>
        </div>
      </div>
      <div className="navbar-center gap-5 xl:gap-10 xl:text-lg cursor-pointer">
        <a
          className={`font-bold text-black hidden lg:block ${
            !pathname.includes("about") &&
            !pathname.includes("invoice") &&
            !pathname.includes("how-to-order") &&
            !pathname.includes("login") &&
            !pathname.includes("register") &&
            !pathname.includes("profile") &&
            !pathname.includes("cart") &&
            !pathname.includes("history") &&
            !pathname.includes("product")
              ? "border-b-2 border-primary"
              : ""
          }`}
          onClick={() => navigate("/")}
        >
          HOME
        </a>
        <a
          className={`font-bold text-black hidden lg:block ${
            pathname.includes("about") ? "border-b-2 border-primary" : ""
          }`}
          onClick={() => navigate("/about")}
        >
          ABOUT US
        </a>
        <h1 className="text-4xl lg:text-5xl font-bold text-primary ">
          ATMA KITCHEN
        </h1>
        <a
          className={`font-bold text-black hidden lg:block ${
            pathname.includes("product") ? "border-b-2 border-primary" : ""
          }`}
          onClick={() => navigate("/list-products")}
        >
          SHOP
        </a>
        <a
          className={`font-bold text-black hidden lg:block ${
            pathname.includes("how-to-order") ? "border-b-2 border-primary" : ""
          }`}
          onClick={() => navigate("/how-to-order")}
        >
          HOW TO ORDER
        </a>
      </div>
      <div className="navbar-end">
        {profileUrl != null ? (
          <div className="dropdown dropdown-bottom dropdown-end">
            <div tabIndex={0}>
              <img
                src={profileUrl}
                className="w-14 h-14 object-cover rounded-full cursor-pointer"
              />
            </div>
            <ul
              tabIndex={0}
              className="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-52"
            >
              <li onClick={() => navigate("/u/profile")}>
                <a className="text-lg">Profile</a>
              </li>
              <li>
                <a className="text-lg text-red-600" onClick={handleLogout}>
                  Logout
                </a>
              </li>
            </ul>
          </div>
        ) : (
          <>
            <button
              className="btn btn-primary font-sans hidden lg:block"
              onClick={() => navigate("/login")}
            >
              Login/SignUp
            </button>
            <button
              className="btn btn-sm btn-primary font-sans lg:hidden text-xs"
              onClick={() => navigate("/login")}
            >
              Login/SignUp
            </button>
          </>
        )}
      </div>
    </div>
  );
}

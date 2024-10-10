import images from "../../../assets/images/graehsgi.png";
import { FormLogin } from "../../../components/Form";
import { NavWrapper } from "../../../components/Wrapper";

export default function Login() {
  return (
    <NavWrapper>
      <div className="flex h-screen max-w-7xl flex-col-2 px-4 mt-16 xl:px-0 mx-auto">
        <div className="hidden lg:flex items-center justify-center flex-1 my-auto">
          <img
            src={images}
            alt="Image"
            className="w-full h-full object-cover"
          />
        </div>
        <div className="w-full lg:w-1/2 flex justify-center flex-col px-4 lg:pl-32">
          <h3 className="text-2xl font-serif font-semibold mb-2 md:text-4xl xl:text-5xl">
            Login
          </h3>
          <p className="text-xs mb-2 font-medium mt-2 md:text-sm xl:text-base">
            Welcome Back! Please enter your details.
          </p>

          <div className="w-full flex flex-col pt-16">
            <FormLogin />
          </div>
        </div>
      </div>
    </NavWrapper>
  );
}

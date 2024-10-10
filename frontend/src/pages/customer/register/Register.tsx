import { FormRegister } from "../../../components/Form";
import images from "../../../assets/images/f9idlhrn.png";
import { NavWrapper } from "../../../components/Wrapper";

export default function Register() {
  return (
    <NavWrapper>
      <div className="flex h-screen max-w-7xl flex-col-2 px-4 mt-16 xl:px-0 mx-auto">
        <div className="hidden lg:flex items-center justify-center flex-1 my-auto">
          <img
            src={images}
            alt="Image"
            className="w-full h-full object-cover p-10"
          />
        </div>
        <div className="w-full lg:w-1/2 flex justify-center flex-col px-4 lg:pl-32">
          <h3 className="text-2xl font-serif font-semibold mb-2 md:text-4xl xl:text-5xl">
            Create Account
          </h3>
          <p className="text-xs mb-2 font-medium mt-2 md:text-sm xl:text-base">
            Enter your information to create an account.
          </p>

          <div className="w-full flex flex-col pt-7">
            <FormRegister />
          </div>
        </div>
      </div>
    </NavWrapper>
  );
}

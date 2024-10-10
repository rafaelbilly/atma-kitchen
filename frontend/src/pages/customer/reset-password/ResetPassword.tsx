import { InputForm } from "../../../components/Input";
import { Label } from "../../../components/Label";

export default function ResetPassword() {
  return (
    <section>
      <div className="flex flex-col items-center justify-center px-8 py-40 mx-auto xl:px-60 md:h-screen lg:py-0 max-w-7xl ">
        <h1 className="text-2xl font-bold font-cormorant md:text-4xl lg:text-5xl">
          Reset Password
        </h1>
        <p className="py-6 text-gray-500 text-xs text-center md:text-sm xl:text-base">
          There is nothing to worry about, we'll send you a message to help you
          reset your password.
        </p>
        <div className="form-control w-full mt-9 px-4 md:px-20">
          <Label children="Email Address"></Label>
          <InputForm type="email" name="email" placeholder="Enter your email address" />
        </div>
        <div className="form-control w-full mt-9 px-4 md:px-20">
          <Label children="New Password"></Label>
          <InputForm type="password" name="password" placeholder="Enter your new password" />
        </div>
        <div className="form-control w-full mt-9 px-4 md:px-20">
          <Label children="Confirm Password"></Label>
          <InputForm type="password" name="reset-password" placeholder="Re-enter your new password" />
        </div>
        <div className="form-control mt-16 w-full px-4 md:px-20">
          <button className="btn btn-sm btn-primary font font-semibold text-xs md:btn-md md:text-sm xl:text-base">
            Reset Password
          </button>
        </div>
      </div>
    </section>
  );
}

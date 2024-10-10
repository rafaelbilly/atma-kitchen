import { useNavigate } from "react-router-dom";
import { InputForm } from "../../../components/Input";
import { Label } from "../../../components/Label";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { send } from "../../../lib/repository/AuthRepository";
import { ValidationSendEmail } from "../../../components/Validation";

export default function ForgotPassword() {
  const navigate = useNavigate();
  const inputField = {
    email: "",
  };

  const [input, setInput] = useState(inputField);
  const [errors, setErrors] = useState(inputField);
  const [isMounted, setIsMounted] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setErrors(await ValidationSendEmail(input));
  };

  const sendEmail = async () => {
    try {
      if(input.email === "") {
        return;
      }
      toast.info("Sending Email...");
      const registerResponse = await send(input);
      console.log(registerResponse);

      if (registerResponse?.status.toString().startsWith("20")) {
        toast.success(
          "Sending Email Success! Check your email to change your password."
        );
        navigate("/login");
      }else{
        setTimeout(() => {
          toast.error("Sending Email Failed! Because email doesn't verified yet.");
        }, 2000);
      }
    } catch (error) {
      console.error("Sending email failed:", error);
    }
  };

  useEffect(() => {
    if (isMounted) {
      const isNoError = !errors.email;
      if (isNoError) {
        sendEmail();
      }
    } else {
      setIsMounted(true);
    }
  }, [errors, isMounted]);

  return (
    <section>
      <div className="flex flex-col items-center justify-center px-8 py-60 mx-auto xl:px-60 md:h-screen lg:py-0 max-w-7xl ">
        <h1 className="text-2xl font-serif font-bold md:text-4xl lg:text-6xl">
          Forgotten Your Password?
        </h1>
        <p className="py-6 text-gray-500 text-xs text-center md:text-sm xl:text-base">
          There is nothing to worry about, we'll send you a message to help you
          reset your password.
        </p>
        <form action="" onSubmit={handleSubmit} className="w-full">
          <div className="form-control w-full mt-9 px-4 md:px-20">
            <Label children="Email Address"></Label>
            <InputForm
              type="email"
              name="email"
              placeholder="Enter your email address"
              onChange={handleChange}
            />
            {errors.email && <p style={{ color: "red" }}>{errors.email}</p>}
          </div>
          <div className="form-control mt-16 w-full px-4 md:px-20">
            <button
              type="submit"
              className="btn btn-sm btn-primary font font-semibold text-xs md:btn-md md:text-sm  xl:text-base"
            >
              Sent Reset Link
            </button>
          </div>
        </form>
      </div>
    </section>
  );
}

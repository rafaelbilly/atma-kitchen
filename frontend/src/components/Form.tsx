import { Label } from "./Label";
import { InputForm } from "./Input";
import { useEffect, useState } from "react";
import { login, register } from "../lib/repository/AuthRepository";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { ValidationLogin, ValidationRegister } from "./Validation";

export const FormLogin = () => {
  const navigate = useNavigate();
  const inputField = {
    username: " ",
    password: "",
  };

  const [input, setInput] = useState(inputField);
  const [errors, setErrors] = useState(inputField);
  const [isMounted, setIsMounted] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  const handleLogin = async () => {
    const loginResponse = await login(input);
    if (loginResponse && loginResponse.status === 200) {
      toast.success("Login Success!");
      localStorage.setItem("token", loginResponse.data.data.token);
      localStorage.setItem("role_id", loginResponse.data.data.user.id_role);
      localStorage.setItem(
        "profile_url",
        loginResponse.data.data.user.url_foto
      );
      switch (loginResponse.data.data.user.id_role) {
        case 1:
          navigate("/owner/dashboard");
          break;
        case 2:
          navigate("/admin/dashboard");
          break;
        case 3:
          navigate("/mo/dashboard");
          break;
        case 4:
          localStorage.setItem(
            "customer_id",
            JSON.stringify(loginResponse.data.data.user)
          );
          navigate("/list-products");
          break;
        default:
          navigate("/");
          break;
      }
    }
  };
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      setErrors(await ValidationLogin(input));
    } catch (error) {
      toast.error("Login failed, Invalid username or password");
    }
  };

  useEffect(() => {
    if (isMounted) {
      const isNoError = !errors.username && !errors.password;
      if (isNoError) {
        handleLogin();
      }
    } else {
      setIsMounted(true);
    }
  }, [errors, isMounted]);

  return (
    <form className="card" onSubmit={handleSubmit}>
      <div className="form-control">
        <Label children="Username"></Label>
        <InputForm
          name="username"
          onChange={handleChange}
          type="text"
          placeholder="Enter your username"
        />
        {errors.username && <p style={{ color: "red" }}>{errors.username}</p>}
      </div>
      <div className="form-control mt-16">
        <Label children="Password"></Label>
        <InputForm
          name="password"
          onChange={handleChange}
          type="password"
          placeholder="Enter your password"
        />
        {errors.password && <p style={{ color: "red" }}>{errors.password}</p>}
        <label className="label-text px-0 text-end pt-2">
          <a
            href="/forgot-password"
            className="label-text link link-hover text-xs text-primary xl:text-base"
          >
            Forgot password?
          </a>
        </label>
      </div>
      <div className="form-control mt-16">
        <button
          type="submit"
          className="btn btn-sm btn-primary font font-semibold text-xs md:btn-md md:text-sm xl:btn-lg xl:text-base"
        >
          Login
        </button>
        <p className="label-text mt-4 text-center text-xs xl:text-base">
          Don't have an account ?{" "}
          <a
            href="/register"
            className="label-text link link-hover font-bold text-xs text-primary xl:text-base"
          >
            Sign Up
          </a>
        </p>
      </div>
    </form>
  );
};

export const FormRegister = () => {
  const navigate = useNavigate();
  const inputField = {
    name: " ",
    email: "",
    username: "",
    password: "",
    phone: "",
    address: "",
    addressLabel: "",
    birthDate: "",
    gender: "",
  };

  const [input, setInput] = useState(inputField);
  const [errors, setErrors] = useState(inputField);
  const [isMounted, setIsMounted] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setErrors(await ValidationRegister(input));
  };

  const registerUser = async () => {
    try {
      toast.info("Registering...");
      const registerResponse = await register(input);
      if (registerResponse && registerResponse.status === 200) {
        toast.success("Register Success! check your email to verify");
        navigate("/login");
      }
    } catch (error) {
      console.error("Registration failed:", error);
    }
  };

  useEffect(() => {
    console.log(isMounted);
    if (isMounted) {
      const isNoError =
        !errors.name &&
        !errors.email &&
        !errors.username &&
        !errors.password &&
        !errors.phone &&
        !errors.address &&
        !errors.addressLabel &&
        !errors.birthDate &&
        !errors.gender;

      if (isNoError) {
        registerUser();
      }
    } else {
      setIsMounted(true);
    }
  }, [errors, isMounted]);

  return (
    <form className="card over" onSubmit={handleSubmit}>
      <div
        className="scroll-auto"
        style={{ height: "300px", overflowY: "auto" }}
      >
        <div className="form-control mt-5">
          <Label children="Full Name"></Label>
          <InputForm
            type="text"
            placeholder="Enter your full name"
            name="name"
            onChange={handleChange}
          />
          {errors.name && <p style={{ color: "red" }}>{errors.name}</p>}
        </div>
        <div className="form-control mt-10">
          <Label children="Email Address"></Label>
          <InputForm
            type="email"
            placeholder="Enter your email address"
            name="email"
            onChange={handleChange}
          />
          {errors.email && <p style={{ color: "red" }}>{errors.email}</p>}
        </div>
        <div className="form-control mt-10">
          <Label children="Username"></Label>
          <InputForm
            type="text"
            placeholder="Enter your username"
            name="username"
            onChange={handleChange}
          />
          {errors.username && <p style={{ color: "red" }}>{errors.username}</p>}
        </div>
        <div className="form-control mt-10">
          <Label children="Password"></Label>
          <InputForm
            type="password"
            placeholder="Enter your password"
            name="password"
            onChange={handleChange}
          />
          {errors.password && <p style={{ color: "red" }}>{errors.password}</p>}
        </div>
        <div className="form-control mt-10">
          <Label children="Phone Number"></Label>
          <InputForm
            type="number"
            placeholder="Enter your phone number"
            name="phone"
            onChange={handleChange}
          />
          {errors.phone && <p style={{ color: "red" }}>{errors.phone}</p>}
        </div>
        <div className="form-control mt-10">
          <Label children="Address"></Label>
          <InputForm
            type="text"
            placeholder="Enter your address"
            name="address"
            onChange={handleChange}
          />
          {errors.address && <p style={{ color: "red" }}>{errors.address}</p>}
        </div>
        <div className="form-control mt-10">
          <Label children="Address Label"></Label>
          <InputForm
            type="text"
            placeholder="Enter your address label"
            name="addressLabel"
            onChange={handleChange}
          />
          {errors.addressLabel && (
            <p style={{ color: "red" }}>{errors.addressLabel}</p>
          )}
        </div>
        <div className="form-control mt-10">
          <Label children="Date of Birth"></Label>
          <InputForm
            type="date"
            placeholder=""
            name="birthDate"
            onChange={handleChange}
          />
          {errors.birthDate && (
            <p style={{ color: "red" }}>{errors.birthDate}</p>
          )}
        </div>
        <div className="form-control mt-10">
          <Label children="Gender"></Label>
          <InputForm
            type="text"
            placeholder="Enter your gender"
            name="gender"
            onChange={handleChange}
          />
          {errors.gender && <p style={{ color: "red" }}>{errors.gender}</p>}
        </div>
      </div>
      <div className="form-control mt-16">
        <button className="btn btn-sm btn-primary font font-semibold text-xs md:btn-md md:text-sm xl:btn-lg xl:text-base">
          Create Account
        </button>
        <p className="label-text mt-4 text-center text-xs xl:text-base">
          Already have an account ?{" "}
          <a
            href="/login
            
            "
            className="label-text link link-hover font-bold text-xs text-primary xl:text-base"
          >
            Sign In
          </a>
        </p>
      </div>
    </form>
  );
};
